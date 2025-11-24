import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-11-17.clover',
    });
  }

  async createPaymentIntent(userId: string, bookingId: string) {
    // Verify booking exists and belongs to user
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        payment: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only create payment for your own bookings');
    }

    // Check if payment already exists
    if (booking.payment) {
      // If payment already has an intent, return existing client secret
      if (booking.payment.stripePaymentIntentId) {
        try {
          const existingIntent = await this.stripe.paymentIntents.retrieve(
            booking.payment.stripePaymentIntentId,
          );
          return {
            clientSecret: existingIntent.client_secret,
            paymentIntentId: existingIntent.id,
          };
        } catch (error) {
          // If intent doesn't exist, create a new one
        }
      }

      // If payment exists but is already paid, throw error
      if (booking.payment.status === PaymentStatus.PAID) {
        throw new BadRequestException('Payment already completed');
      }
    }

    // Convert amount to cents (Stripe uses smallest currency unit)
    const amountInCents = Math.round(booking.service.price.toNumber() * 100);

    // Create Stripe Payment Intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd', // Change to your currency
      metadata: {
        bookingId,
        userId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update or create payment record
    if (booking.payment) {
      await this.prisma.payment.update({
        where: { bookingId },
        data: {
          stripePaymentIntentId: paymentIntent.id,
        },
      });
    } else {
      // Payment should already exist from booking creation, but create if it doesn't
      await this.prisma.payment.upsert({
        where: { bookingId },
        update: {
          stripePaymentIntentId: paymentIntent.id,
        },
        create: {
          bookingId,
          userId,
          amount: booking.service.price,
          stripePaymentIntentId: paymentIntent.id,
        },
      });
    }

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    const bookingId = paymentIntent.metadata.bookingId;

    if (!bookingId) {
      console.error('No bookingId in payment intent metadata');
      return;
    }

    // Update payment record
    const payment = await this.prisma.payment.update({
      where: { bookingId },
      data: {
        status: PaymentStatus.PAID,
        paymentDate: new Date(),
      },
    });

    // Note: Booking doesn't have a "PAID" status in BookingStatus enum
    // The payment status is tracked separately in the Payment model
    // If you need to mark booking as paid, you might want to add a field or use a different approach

    console.log(`Payment succeeded for booking ${bookingId}`);
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    const bookingId = paymentIntent.metadata.bookingId;

    if (!bookingId) {
      console.error('No bookingId in payment intent metadata');
      return;
    }

    // Update payment record
    await this.prisma.payment.update({
      where: { bookingId },
      data: {
        status: PaymentStatus.FAILED,
      },
    });

    console.log(`Payment failed for booking ${bookingId}`);
  }

  async getPaymentByBookingId(bookingId: string, userId?: string, userRole?: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { bookingId },
      include: {
        booking: {
          include: {
            service: {
              select: {
                id: true,
                title: true,
                price: true,
              },
            },
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Check access: user can see their own payments, admin can see all
    if (userRole !== 'ADMIN' && payment.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return {
      ...payment,
      amount: payment.amount.toNumber(),
      booking: {
        ...payment.booking,
        service: {
          ...payment.booking.service,
          price: payment.booking.service.price.toNumber(),
        },
      },
    };
  }
}

