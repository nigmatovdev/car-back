"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const stripe_1 = __importDefault(require("stripe"));
const client_1 = require("@prisma/client");
let PaymentsService = class PaymentsService {
    prisma;
    configService;
    stripe;
    isDemoMode;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.isDemoMode = this.configService.get('DEMO_MODE') === 'true';
        if (!this.isDemoMode) {
            const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
            if (!stripeSecretKey) {
                throw new Error('STRIPE_SECRET_KEY is not configured');
            }
            this.stripe = new stripe_1.default(stripeSecretKey, {
                apiVersion: '2025-11-17.clover',
            });
        }
    }
    async createPaymentIntent(userId, bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                service: true,
                payment: true,
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId !== userId) {
            throw new common_1.ForbiddenException('You can only create payment for your own bookings');
        }
        if (booking.payment?.status === client_1.PaymentStatus.PAID) {
            throw new common_1.BadRequestException('Payment already completed');
        }
        if (this.isDemoMode) {
            const fakePaymentIntentId = `pi_demo_${Date.now()}`;
            const fakeClientSecret = `${fakePaymentIntentId}_secret_demo`;
            if (booking.payment) {
                await this.prisma.payment.update({
                    where: { bookingId },
                    data: {
                        stripePaymentIntentId: fakePaymentIntentId,
                    },
                });
            }
            else {
                await this.prisma.payment.upsert({
                    where: { bookingId },
                    update: {
                        stripePaymentIntentId: fakePaymentIntentId,
                    },
                    create: {
                        bookingId,
                        userId,
                        amount: booking.service.price,
                        stripePaymentIntentId: fakePaymentIntentId,
                    },
                });
            }
            return {
                clientSecret: fakeClientSecret,
                paymentIntentId: fakePaymentIntentId,
                demoMode: true,
            };
        }
        if (!this.stripe) {
            throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY or enable DEMO_MODE.');
        }
        if (booking.payment?.stripePaymentIntentId) {
            try {
                const existingIntent = await this.stripe.paymentIntents.retrieve(booking.payment.stripePaymentIntentId);
                return {
                    clientSecret: existingIntent.client_secret,
                    paymentIntentId: existingIntent.id,
                };
            }
            catch (error) {
            }
        }
        const amountInCents = Math.round(booking.service.price.toNumber() * 100);
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            metadata: {
                bookingId,
                userId,
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });
        if (booking.payment) {
            await this.prisma.payment.update({
                where: { bookingId },
                data: {
                    stripePaymentIntentId: paymentIntent.id,
                },
            });
        }
        else {
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
    async handleWebhook(event) {
        switch (event.type) {
            case 'payment_intent.succeeded':
                await this.handlePaymentSuccess(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await this.handlePaymentFailed(event.data.object);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    }
    async handlePaymentSuccess(paymentIntent) {
        const bookingId = paymentIntent.metadata.bookingId;
        if (!bookingId) {
            console.error('No bookingId in payment intent metadata');
            return;
        }
        const payment = await this.prisma.payment.update({
            where: { bookingId },
            data: {
                status: client_1.PaymentStatus.PAID,
                paymentDate: new Date(),
            },
        });
        console.log(`Payment succeeded for booking ${bookingId}`);
    }
    async handlePaymentFailed(paymentIntent) {
        const bookingId = paymentIntent.metadata.bookingId;
        if (!bookingId) {
            console.error('No bookingId in payment intent metadata');
            return;
        }
        await this.prisma.payment.update({
            where: { bookingId },
            data: {
                status: client_1.PaymentStatus.FAILED,
            },
        });
        console.log(`Payment failed for booking ${bookingId}`);
    }
    async confirmDemoPayment(userId, bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                payment: true,
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId !== userId) {
            throw new common_1.ForbiddenException('You can only confirm payment for your own bookings');
        }
        if (!booking.payment) {
            throw new common_1.NotFoundException('Payment not found for this booking');
        }
        if (booking.payment.status === client_1.PaymentStatus.PAID) {
            throw new common_1.BadRequestException('Payment already completed');
        }
        const payment = await this.prisma.payment.update({
            where: { bookingId },
            data: {
                status: client_1.PaymentStatus.PAID,
                paymentDate: new Date(),
            },
        });
        return {
            message: 'Payment confirmed successfully (Demo Mode)',
            payment: {
                id: payment.id,
                bookingId: payment.bookingId,
                amount: payment.amount.toNumber(),
                status: payment.status,
                paymentDate: payment.paymentDate,
            },
        };
    }
    async getPaymentByBookingId(bookingId, userId, userRole) {
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
            throw new common_1.NotFoundException('Payment not found');
        }
        if (userRole !== 'ADMIN' && payment.userId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
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
    async topUpCredit(userId, amount) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                creditBalance: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                creditBalance: {
                    increment: new client_1.Prisma.Decimal(amount),
                },
            },
            select: {
                id: true,
                email: true,
                creditBalance: true,
            },
        });
        return {
            message: 'Credit balance topped up successfully',
            previousBalance: user.creditBalance.toNumber(),
            addedAmount: amount,
            newBalance: updatedUser.creditBalance.toNumber(),
            demoMode: this.isDemoMode,
        };
    }
    async payWithCredit(userId, bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                payment: true,
                service: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                    },
                },
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId !== userId) {
            throw new common_1.ForbiddenException('You can only pay for your own bookings');
        }
        if (!booking.payment) {
            throw new common_1.NotFoundException('Payment record not found for this booking');
        }
        if (booking.payment.status === client_1.PaymentStatus.PAID) {
            throw new common_1.BadRequestException('Booking is already paid');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                creditBalance: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const paymentAmount = booking.payment.amount.toNumber();
        const currentBalance = user.creditBalance.toNumber();
        if (currentBalance < paymentAmount) {
            throw new common_1.BadRequestException(`Insufficient credit balance. Required: ${paymentAmount}, Available: ${currentBalance}`);
        }
        const [updatedUser, updatedPayment] = await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    creditBalance: {
                        decrement: new client_1.Prisma.Decimal(paymentAmount),
                    },
                },
                select: {
                    id: true,
                    email: true,
                    creditBalance: true,
                },
            }),
            this.prisma.payment.update({
                where: { bookingId },
                data: {
                    status: client_1.PaymentStatus.PAID,
                    paymentDate: new Date(),
                },
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
                        },
                    },
                },
            }),
        ]);
        return {
            message: 'Payment successful using credit balance',
            payment: {
                ...updatedPayment,
                amount: updatedPayment.amount.toNumber(),
                booking: {
                    ...updatedPayment.booking,
                    service: {
                        ...updatedPayment.booking.service,
                        price: updatedPayment.booking.service.price.toNumber(),
                    },
                },
            },
            creditBalance: {
                previousBalance: currentBalance,
                deductedAmount: paymentAmount,
                newBalance: updatedUser.creditBalance.toNumber(),
            },
            demoMode: this.isDemoMode,
        };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map