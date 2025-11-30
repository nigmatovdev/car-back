import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Headers,
  RawBodyRequest,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ConfirmDemoPaymentDto } from './dto/confirm-demo-payment.dto';
import { TopUpCreditDto } from './dto/top-up-credit.dto';
import { PayWithCreditDto } from './dto/pay-with-credit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  private stripe: Stripe;

  constructor(
    private paymentsService: PaymentsService,
    private configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (stripeSecretKey) {
      this.stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2025-11-17.clover',
      });
    }
  }

  @Post('intent')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Stripe payment intent' })
  @ApiBody({ type: CreatePaymentIntentDto })
  @ApiResponse({
    status: 201,
    description: 'Payment intent created successfully',
    schema: {
      example: {
        clientSecret: 'pi_xxx_secret_xxx',
        paymentIntentId: 'pi_xxx',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Payment already completed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  createPaymentIntent(
    @Request() req: RequestWithUser,
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    return this.paymentsService.createPaymentIntent(
      req.user.userId,
      createPaymentIntentDto.bookingId,
    );
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Webhook processed successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid webhook signature' })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured');
      return { received: false, error: 'Webhook secret not configured' };
    }

    if (!this.stripe) {
      const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
      if (stripeSecretKey) {
        this.stripe = new Stripe(stripeSecretKey, {
          apiVersion: '2025-11-17.clover',
        });
      } else {
        return { received: false, error: 'Stripe not configured' };
      }
    }

    if (!req.rawBody) {
      return { received: false, error: 'Raw body is required for webhook verification' };
    }

    let event: Stripe.Event;

    try {
      // Verify webhook signature
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        webhookSecret,
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return { received: false, error: `Webhook Error: ${err.message}` };
    }

    // Handle the event
    await this.paymentsService.handleWebhook(event);

    return { received: true };
  }

  @Post('demo/confirm')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm demo payment (for testing/demo only)' })
  @ApiBody({ type: ConfirmDemoPaymentDto })
  @ApiResponse({
    status: 200,
    description: 'Demo payment confirmed successfully',
    schema: {
      example: {
        message: 'Payment confirmed successfully',
        payment: {
          id: 'uuid',
          status: 'PAID',
          paymentDate: '2024-01-01T12:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Payment already completed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async confirmDemoPayment(
    @Request() req: RequestWithUser,
    @Body() confirmDemoPaymentDto: ConfirmDemoPaymentDto,
  ) {
    return this.paymentsService.confirmDemoPayment(
      req.user.userId,
      confirmDemoPaymentDto.bookingId,
    );
  }

  @Post('top-up')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Top up credit balance (Demo mode supported)' })
  @ApiBody({ type: TopUpCreditDto })
  @ApiResponse({
    status: 200,
    description: 'Credit balance topped up successfully',
    schema: {
      example: {
        message: 'Credit balance topped up successfully',
        previousBalance: 50.0,
        addedAmount: 100.0,
        newBalance: 150.0,
        demoMode: true,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid amount' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  topUpCredit(@Request() req: RequestWithUser, @Body() topUpCreditDto: TopUpCreditDto) {
    return this.paymentsService.topUpCredit(req.user.userId, topUpCreditDto.amount);
  }

  @Post('pay-with-credit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Pay for booking using credit balance' })
  @ApiBody({ type: PayWithCreditDto })
  @ApiResponse({
    status: 200,
    description: 'Payment successful using credit balance',
    schema: {
      example: {
        message: 'Payment successful using credit balance',
        payment: {
          id: 'uuid',
          bookingId: 'uuid',
          userId: 'uuid',
          amount: 25.99,
          status: 'PAID',
          paymentDate: '2024-01-01T12:00:00.000Z',
        },
        creditBalance: {
          previousBalance: 150.0,
          deductedAmount: 25.99,
          newBalance: 124.01,
        },
        demoMode: true,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Insufficient credit balance or booking already paid' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Booking or payment not found' })
  payWithCredit(@Request() req: RequestWithUser, @Body() payWithCreditDto: PayWithCreditDto) {
    return this.paymentsService.payWithCredit(req.user.userId, payWithCreditDto.bookingId);
  }

  @Get(':bookingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get payment by booking ID' })
  @ApiParam({ name: 'bookingId', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Payment retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        bookingId: 'uuid',
        userId: 'uuid',
        amount: 25.99,
        status: 'PAID',
        stripePaymentIntentId: 'pi_xxx',
        paymentDate: '2024-01-01T12:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
        booking: {
          id: 'uuid',
          service: {
            id: 'uuid',
            title: 'Basic Car Wash',
            price: 25.99,
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  getPaymentByBookingId(
    @Request() req: RequestWithUser,
    @Param('bookingId') bookingId: string,
  ) {
    return this.paymentsService.getPaymentByBookingId(
      bookingId,
      req.user.userId,
      req.user.role,
    );
  }
}

