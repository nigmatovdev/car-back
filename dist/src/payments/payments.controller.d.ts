import { RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { ConfirmDemoPaymentDto } from './dto/confirm-demo-payment.dto';
import { TopUpCreditDto } from './dto/top-up-credit.dto';
import { PayWithCreditDto } from './dto/pay-with-credit.dto';
import { ConfigService } from '@nestjs/config';
interface RequestWithUser extends Request {
    user: {
        userId: string;
        email: string;
        role: string;
    };
}
export declare class PaymentsController {
    private paymentsService;
    private configService;
    private stripe;
    constructor(paymentsService: PaymentsService, configService: ConfigService);
    createPaymentIntent(req: RequestWithUser, createPaymentIntentDto: CreatePaymentIntentDto): Promise<{
        clientSecret: string;
        paymentIntentId: string;
        demoMode: boolean;
    } | {
        clientSecret: string | null;
        paymentIntentId: string;
        demoMode?: undefined;
    }>;
    handleWebhook(req: RawBodyRequest<Request>, signature: string): Promise<{
        received: boolean;
        error: string;
    } | {
        received: boolean;
        error?: undefined;
    }>;
    confirmDemoPayment(req: RequestWithUser, confirmDemoPaymentDto: ConfirmDemoPaymentDto): Promise<{
        message: string;
        payment: {
            id: string;
            bookingId: string;
            amount: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            paymentDate: Date | null;
        };
    }>;
    topUpCredit(req: RequestWithUser, topUpCreditDto: TopUpCreditDto): Promise<{
        message: string;
        previousBalance: any;
        addedAmount: number;
        newBalance: any;
        demoMode: boolean;
    }>;
    payWithCredit(req: RequestWithUser, payWithCreditDto: PayWithCreditDto): Promise<{
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
                latitude: import("@prisma/client-runtime-utils").Decimal;
                longitude: import("@prisma/client-runtime-utils").Decimal;
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
    getPaymentByBookingId(req: RequestWithUser, bookingId: string): Promise<{
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
            latitude: import("@prisma/client-runtime-utils").Decimal;
            longitude: import("@prisma/client-runtime-utils").Decimal;
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
}
export {};
