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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payments_service_1 = require("./payments.service");
const create_payment_intent_dto_1 = require("./dto/create-payment-intent.dto");
const confirm_demo_payment_dto_1 = require("./dto/confirm-demo-payment.dto");
const top_up_credit_dto_1 = require("./dto/top-up-credit.dto");
const pay_with_credit_dto_1 = require("./dto/pay-with-credit.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("@nestjs/config");
let PaymentsController = class PaymentsController {
    paymentsService;
    configService;
    stripe;
    constructor(paymentsService, configService) {
        this.paymentsService = paymentsService;
        this.configService = configService;
        const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
        if (stripeSecretKey) {
            this.stripe = new stripe_1.default(stripeSecretKey, {
                apiVersion: '2025-11-17.clover',
            });
        }
    }
    createPaymentIntent(req, createPaymentIntentDto) {
        return this.paymentsService.createPaymentIntent(req.user.userId, createPaymentIntentDto.bookingId);
    }
    async handleWebhook(req, signature) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        if (!webhookSecret) {
            console.error('STRIPE_WEBHOOK_SECRET is not configured');
            return { received: false, error: 'Webhook secret not configured' };
        }
        if (!this.stripe) {
            const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
            if (stripeSecretKey) {
                this.stripe = new stripe_1.default(stripeSecretKey, {
                    apiVersion: '2025-11-17.clover',
                });
            }
            else {
                return { received: false, error: 'Stripe not configured' };
            }
        }
        if (!req.rawBody) {
            return { received: false, error: 'Raw body is required for webhook verification' };
        }
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
        }
        catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            return { received: false, error: `Webhook Error: ${err.message}` };
        }
        await this.paymentsService.handleWebhook(event);
        return { received: true };
    }
    async confirmDemoPayment(req, confirmDemoPaymentDto) {
        return this.paymentsService.confirmDemoPayment(req.user.userId, confirmDemoPaymentDto.bookingId);
    }
    topUpCredit(req, topUpCreditDto) {
        return this.paymentsService.topUpCredit(req.user.userId, topUpCreditDto.amount);
    }
    payWithCredit(req, payWithCreditDto) {
        return this.paymentsService.payWithCredit(req.user.userId, payWithCreditDto.bookingId);
    }
    getPaymentByBookingId(req, bookingId) {
        return this.paymentsService.getPaymentByBookingId(bookingId, req.user.userId, req.user.role);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('intent'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create Stripe payment intent' }),
    (0, swagger_1.ApiBody)({ type: create_payment_intent_dto_1.CreatePaymentIntentDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Payment intent created successfully',
        schema: {
            example: {
                clientSecret: 'pi_xxx_secret_xxx',
                paymentIntentId: 'pi_xxx',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Payment already completed' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_payment_intent_dto_1.CreatePaymentIntentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "createPaymentIntent", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Stripe webhook endpoint' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Webhook processed successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid webhook signature' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handleWebhook", null);
__decorate([
    (0, common_1.Post)('demo/confirm'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm demo payment (for testing/demo only)' }),
    (0, swagger_1.ApiBody)({ type: confirm_demo_payment_dto_1.ConfirmDemoPaymentDto }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Payment already completed' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, confirm_demo_payment_dto_1.ConfirmDemoPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "confirmDemoPayment", null);
__decorate([
    (0, common_1.Post)('top-up'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Top up credit balance (Demo mode supported)' }),
    (0, swagger_1.ApiBody)({ type: top_up_credit_dto_1.TopUpCreditDto }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid amount' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, top_up_credit_dto_1.TopUpCreditDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "topUpCredit", null);
__decorate([
    (0, common_1.Post)('pay-with-credit'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Pay for booking using credit balance' }),
    (0, swagger_1.ApiBody)({ type: pay_with_credit_dto_1.PayWithCreditDto }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Insufficient credit balance or booking already paid' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking or payment not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pay_with_credit_dto_1.PayWithCreditDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "payWithCredit", null);
__decorate([
    (0, common_1.Get)(':bookingId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment by booking ID' }),
    (0, swagger_1.ApiParam)({ name: 'bookingId', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getPaymentByBookingId", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('payments'),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService,
        config_1.ConfigService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map