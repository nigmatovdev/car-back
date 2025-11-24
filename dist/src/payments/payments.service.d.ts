import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
export declare class PaymentsService {
    private prisma;
    private configService;
    private stripe;
    constructor(prisma: PrismaService, configService: ConfigService);
    createPaymentIntent(userId: string, bookingId: string): Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
    }>;
    handleWebhook(event: Stripe.Event): Promise<void>;
    private handlePaymentSuccess;
    private handlePaymentFailed;
    getPaymentByBookingId(bookingId: string, userId?: string, userRole?: string): Promise<{
        amount: number;
        booking: {
            service: {
                price: number;
                title: string;
                id: string;
            };
            user: {
                email: string;
                id: string;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            latitude: import("@prisma/client-runtime-utils").Decimal;
            longitude: import("@prisma/client-runtime-utils").Decimal;
            date: Date;
            time: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            userId: string;
            washerId: string | null;
            serviceId: string;
        };
        user: {
            email: string;
            id: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: string;
        stripePaymentIntentId: string | null;
        paymentDate: Date | null;
        bookingId: string;
    }>;
}
