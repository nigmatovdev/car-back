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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bookings_service_1 = require("./bookings.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_status_dto_1 = require("./dto/update-booking-status.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const washer_guard_1 = require("../auth/guards/washer.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
let BookingsController = class BookingsController {
    bookingsService;
    constructor(bookingsService) {
        this.bookingsService = bookingsService;
    }
    create(req, createBookingDto) {
        return this.bookingsService.create(req.user.userId, createBookingDto);
    }
    findMyBookings(req) {
        return this.bookingsService.findMyBookings(req.user.userId);
    }
    findAll(req) {
        return this.bookingsService.findAll(req.user.role);
    }
    findOne(req, id) {
        return this.bookingsService.findOne(id, req.user.userId, req.user.role);
    }
    updateStatus(req, id, updateStatusDto) {
        return this.bookingsService.updateStatus(id, req.user.userId, req.user.role, updateStatusDto);
    }
    cancel(req, id) {
        return this.bookingsService.cancel(id, req.user.userId, req.user.role);
    }
    findAvailableBookings(req) {
        return this.bookingsService.findAvailableBookings(req.user.role);
    }
    acceptBooking(req, id) {
        return this.bookingsService.acceptBooking(id, req.user.userId, req.user.role);
    }
    remove(req, id) {
        return this.bookingsService.remove(id, req.user.userId, req.user.role);
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new booking' }),
    (0, swagger_1.ApiBody)({ type: create_booking_dto_1.CreateBookingDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Booking successfully created',
        schema: {
            example: {
                id: 'uuid',
                userId: 'uuid',
                serviceId: 'uuid',
                washerId: 'uuid',
                latitude: 40.7128,
                longitude: -74.0060,
                date: '2024-12-25T00:00:00.000Z',
                time: '14:30',
                status: 'ASSIGNED',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
                service: {
                    id: 'uuid',
                    title: 'Basic Car Wash',
                    description: 'Exterior wash and dry',
                    price: 25.99,
                    durationMin: 30,
                },
                user: {
                    id: 'uuid',
                    email: 'user@example.com',
                },
                washer: {
                    id: 'uuid',
                    email: 'washer@example.com',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input or service not active' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user bookings' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User bookings retrieved successfully',
        schema: {
            example: [
                {
                    id: 'uuid',
                    userId: 'uuid',
                    serviceId: 'uuid',
                    washerId: 'uuid',
                    latitude: 40.7128,
                    longitude: -74.0060,
                    date: '2024-12-25T00:00:00.000Z',
                    time: '14:30',
                    status: 'ASSIGNED',
                    createdAt: '2024-01-01T00:00:00.000Z',
                    updatedAt: '2024-01-01T00:00:00.000Z',
                    service: {
                        id: 'uuid',
                        title: 'Basic Car Wash',
                        price: 25.99,
                    },
                    payment: {
                        id: 'uuid',
                        amount: 25.99,
                        status: 'UNPAID',
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findMyBookings", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bookings (Admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All bookings retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Admin access required' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)(washer_guard_1.WasherGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update booking status (Washer only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: update_booking_status_dto_1.UpdateBookingStatusDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking status updated successfully',
        schema: {
            example: {
                id: 'uuid',
                status: 'EN_ROUTE',
                message: 'Status updated successfully',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid status transition' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Only assigned washer can update status' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_booking_status_dto_1.UpdateBookingStatusDto]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a booking (Owner only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking cancelled successfully',
        schema: {
            example: {
                id: 'uuid',
                userId: 'uuid',
                serviceId: 'uuid',
                washerId: 'uuid',
                latitude: 40.7128,
                longitude: -74.0060,
                date: '2024-12-25T00:00:00.000Z',
                time: '14:30',
                status: 'CANCELLED',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
                service: {
                    id: 'uuid',
                    title: 'Basic Car Wash',
                    description: 'Exterior wash and dry',
                    price: 25.99,
                    durationMin: 30,
                },
                user: {
                    id: 'uuid',
                    email: 'user@example.com',
                },
                washer: {
                    id: 'uuid',
                    email: 'washer@example.com',
                },
                payment: {
                    id: 'uuid',
                    amount: 25.99,
                    status: 'FAILED',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Booking cannot be cancelled (already cancelled or completed)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Only the booking owner can cancel this booking' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, common_1.UseGuards)(washer_guard_1.WasherGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get available bookings (Washer only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Available bookings retrieved successfully',
        schema: {
            example: [
                {
                    id: 'uuid',
                    userId: 'uuid',
                    serviceId: 'uuid',
                    washerId: null,
                    latitude: 40.7128,
                    longitude: -74.0060,
                    date: '2024-12-25T00:00:00.000Z',
                    time: '14:30',
                    status: 'PENDING',
                    createdAt: '2024-01-01T00:00:00.000Z',
                    updatedAt: '2024-01-01T00:00:00.000Z',
                    service: {
                        id: 'uuid',
                        title: 'Basic Car Wash',
                        description: 'Exterior wash and dry',
                        price: 25.99,
                        durationMin: 30,
                    },
                    user: {
                        id: 'uuid',
                        email: 'user@example.com',
                        firstName: 'John',
                        lastName: 'Doe',
                        phone: '+1234567890',
                        address: '123 Main St',
                    },
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Only washers can view available bookings' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "findAvailableBookings", null);
__decorate([
    (0, common_1.Patch)(':id/accept'),
    (0, common_1.UseGuards)(washer_guard_1.WasherGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Accept a booking (Washer only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking accepted successfully',
        schema: {
            example: {
                id: 'uuid',
                userId: 'uuid',
                serviceId: 'uuid',
                washerId: 'uuid',
                latitude: 40.7128,
                longitude: -74.0060,
                date: '2024-12-25T00:00:00.000Z',
                time: '14:30',
                status: 'ASSIGNED',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T12:00:00.000Z',
                service: {
                    id: 'uuid',
                    title: 'Basic Car Wash',
                    description: 'Exterior wash and dry',
                    price: 25.99,
                    durationMin: 30,
                },
                user: {
                    id: 'uuid',
                    email: 'user@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    phone: '+1234567890',
                    address: '123 Main St',
                },
                washer: {
                    id: 'uuid',
                    email: 'washer@example.com',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    phone: '+0987654321',
                },
                payment: {
                    id: 'uuid',
                    amount: 25.99,
                    status: 'UNPAID',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Booking is not available or already assigned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Only washers can accept bookings' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "acceptBooking", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a booking (Owner only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking deleted successfully',
        schema: {
            example: {
                message: 'Booking deleted successfully',
                id: 'uuid',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete a completed booking' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Only the booking owner can delete this booking' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BookingsController.prototype, "remove", null);
exports.BookingsController = BookingsController = __decorate([
    (0, swagger_1.ApiTags)('bookings'),
    (0, common_1.Controller)('bookings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [bookings_service_1.BookingsService])
], BookingsController);
//# sourceMappingURL=bookings.controller.js.map