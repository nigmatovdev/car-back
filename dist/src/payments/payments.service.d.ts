import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
export declare class PaymentsService {
    private prisma;
    private configService;
    private stripe?;
    private isDemoMode;
    constructor(prisma: PrismaService, configService: ConfigService);
    createPaymentIntent(userId: string, bookingId: string): Promise<{
        clientSecret: string;
        paymentIntentId: string;
        demoMode: boolean;
    } | {
        clientSecret: string | null;
        paymentIntentId: string;
        demoMode?: undefined;
    }>;
    handleWebhook(event: Stripe.Event): Promise<void>;
    private handlePaymentSuccess;
    private handlePaymentFailed;
    confirmDemoPayment(userId: string, bookingId: string): Promise<{
        message: string;
        payment: {
            id: string;
            bookingId: string;
            amount: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            paymentDate: Date | null;
        };
    }>;
    getPaymentByBookingId(bookingId: string, userId?: string, userRole?: string): Promise<{
        amount: number;
        booking: {
            service: {
                price: number;
                id: string;
                title: string;
            };
            user: {
                id: string;
                email: string;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            serviceId: string;
            washerId: string | null;
            latitude: import("@prisma/client-runtime-utils").Decimal;
            longitude: import("@prisma/client-runtime-utils").Decimal;
            date: Date;
            time: string;
            status: import(".prisma/client").$Enums.BookingStatus;
        };
        user: {
            id: string;
            email: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        bookingId: string;
        paymentDate: Date | null;
        stripePaymentIntentId: string | null;
    }>;
}
