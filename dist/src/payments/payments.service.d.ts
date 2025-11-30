import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
import { Prisma } from '@prisma/client';
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
            userId: string;
            serviceId: string;
            washerId: string | null;
            latitude: Prisma.Decimal;
            longitude: Prisma.Decimal;
            date: Date;
            time: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        user: {
            id: string;
            email: string;
        };
        id: string;
        userId: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        stripePaymentIntentId: string | null;
        paymentDate: Date | null;
    }>;
    topUpCredit(userId: string, amount: number): Promise<{
        message: string;
        previousBalance: any;
        addedAmount: number;
        newBalance: any;
        demoMode: boolean;
    }>;
    payWithCredit(userId: string, bookingId: string): Promise<{
        message: string;
        payment: {
            amount: number;
            booking: {
                service: {
                    price: number;
                    id: string;
                    title: string;
                };
                id: string;
                userId: string;
                serviceId: string;
                washerId: string | null;
                latitude: Prisma.Decimal;
                longitude: Prisma.Decimal;
                date: Date;
                time: string;
                status: import(".prisma/client").$Enums.BookingStatus;
                createdAt: Date;
                updatedAt: Date;
            };
            id: string;
            userId: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            stripePaymentIntentId: string | null;
            paymentDate: Date | null;
        };
        creditBalance: {
            previousBalance: any;
            deductedAmount: number;
            newBalance: any;
        };
        demoMode: boolean;
    }>;
}
