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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) *
                Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    toRad(degrees) {
        return (degrees * Math.PI) / 180;
    }
    async findClosestWasher(latitude, longitude) {
        const washerLocations = await this.prisma.washerLocation.findMany({
            include: {
                washer: {
                    select: {
                        id: true,
                        role: true,
                    },
                },
            },
        });
        if (washerLocations.length === 0) {
            return null;
        }
        let closestWasherId = null;
        let minDistance = Infinity;
        for (const location of washerLocations) {
            const distance = this.calculateDistance(latitude, longitude, location.latitude.toNumber(), location.longitude.toNumber());
            if (distance < minDistance) {
                minDistance = distance;
                closestWasherId = location.washerId;
            }
        }
        return closestWasherId;
    }
    validateStatusTransition(currentStatus, newStatus) {
        const validTransitions = {
            PENDING: ['ASSIGNED', 'CANCELLED'],
            ASSIGNED: ['EN_ROUTE', 'CANCELLED'],
            EN_ROUTE: ['ARRIVED', 'CANCELLED'],
            ARRIVED: ['IN_PROGRESS', 'CANCELLED'],
            IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
            COMPLETED: [],
            CANCELLED: [],
        };
        return validTransitions[currentStatus]?.includes(newStatus) ?? false;
    }
    async create(userId, createBookingDto) {
        const service = await this.prisma.service.findUnique({
            where: { id: createBookingDto.serviceId },
        });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        if (!service.isActive) {
            throw new common_1.BadRequestException('Service is not active');
        }
        const booking = await this.prisma.booking.create({
            data: {
                userId,
                serviceId: createBookingDto.serviceId,
                washerId: null,
                latitude: new client_1.Prisma.Decimal(createBookingDto.latitude),
                longitude: new client_1.Prisma.Decimal(createBookingDto.longitude),
                date: new Date(createBookingDto.date),
                time: createBookingDto.time,
                status: client_1.BookingStatus.PENDING,
            },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                    },
                },
            },
        });
        await this.prisma.payment.create({
            data: {
                bookingId: booking.id,
                userId,
                amount: service.price,
            },
        });
        return {
            ...booking,
            latitude: booking.latitude.toNumber(),
            longitude: booking.longitude.toNumber(),
            service: {
                ...booking.service,
                price: booking.service.price.toNumber(),
            },
        };
    }
    async findMyBookings(userId) {
        const bookings = await this.prisma.booking.findMany({
            where: { userId },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                washer: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return bookings.map((booking) => ({
            ...booking,
            latitude: booking.latitude.toNumber(),
            longitude: booking.longitude.toNumber(),
            service: {
                ...booking.service,
                price: booking.service.price.toNumber(),
            },
            payment: booking.payment
                ? {
                    ...booking.payment,
                    amount: booking.payment.amount.toNumber(),
                }
                : null,
        }));
    }
    async findOne(id, userId, userRole) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                washer: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    },
                },
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userRole !== 'ADMIN') {
            if (userId !== booking.userId && userId !== booking.washerId) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        return {
            ...booking,
            latitude: booking.latitude.toNumber(),
            longitude: booking.longitude.toNumber(),
            service: {
                ...booking.service,
                price: booking.service.price.toNumber(),
            },
            payment: booking.payment
                ? {
                    ...booking.payment,
                    amount: booking.payment.amount.toNumber(),
                }
                : null,
        };
    }
    async updateStatus(id, userId, userRole, updateStatusDto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userRole !== 'ADMIN' && booking.washerId !== userId) {
            throw new common_1.ForbiddenException('Only the assigned washer can update status');
        }
        if (!this.validateStatusTransition(booking.status, updateStatusDto.status)) {
            throw new common_1.BadRequestException(`Invalid status transition from ${booking.status} to ${updateStatusDto.status}`);
        }
        const updatedBooking = await this.prisma.booking.update({
            where: { id },
            data: {
                status: updateStatusDto.status,
            },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                washer: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    },
                },
            },
        });
        return {
            ...updatedBooking,
            latitude: updatedBooking.latitude.toNumber(),
            longitude: updatedBooking.longitude.toNumber(),
            service: {
                ...updatedBooking.service,
                price: updatedBooking.service.price.toNumber(),
            },
            payment: updatedBooking.payment
                ? {
                    ...updatedBooking.payment,
                    amount: updatedBooking.payment.amount.toNumber(),
                }
                : null,
        };
    }
    async findAll(userRole) {
        if (userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Admin access required');
        }
        const bookings = await this.prisma.booking.findMany({
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                washer: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return bookings.map((booking) => ({
            ...booking,
            latitude: booking.latitude.toNumber(),
            longitude: booking.longitude.toNumber(),
            service: {
                ...booking.service,
                price: booking.service.price.toNumber(),
            },
            payment: booking.payment
                ? {
                    ...booking.payment,
                    amount: booking.payment.amount.toNumber(),
                }
                : null,
        }));
    }
    async cancel(id, userId, userRole) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                payment: true,
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userRole !== 'ADMIN' && booking.userId !== userId) {
            throw new common_1.ForbiddenException('Only the booking owner can cancel this booking');
        }
        if (booking.status === client_1.BookingStatus.CANCELLED) {
            throw new common_1.BadRequestException('Booking is already cancelled');
        }
        if (booking.status === client_1.BookingStatus.COMPLETED) {
            throw new common_1.BadRequestException('Cannot cancel a completed booking');
        }
        const updatedBooking = await this.prisma.booking.update({
            where: { id },
            data: {
                status: client_1.BookingStatus.CANCELLED,
            },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                washer: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    },
                },
            },
        });
        if (booking.payment && booking.payment.status === client_1.PaymentStatus.PAID) {
            await this.prisma.payment.update({
                where: { bookingId: id },
                data: {
                    status: client_1.PaymentStatus.FAILED,
                },
            });
        }
        return {
            ...updatedBooking,
            latitude: updatedBooking.latitude.toNumber(),
            longitude: updatedBooking.longitude.toNumber(),
            service: {
                ...updatedBooking.service,
                price: updatedBooking.service.price.toNumber(),
            },
            payment: updatedBooking.payment
                ? {
                    ...updatedBooking.payment,
                    amount: updatedBooking.payment.amount.toNumber(),
                }
                : null,
        };
    }
    async findAvailableBookings(userRole) {
        if (userRole !== 'WASHER' && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only washers can view available bookings');
        }
        const bookings = await this.prisma.booking.findMany({
            where: {
                status: client_1.BookingStatus.PENDING,
            },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        address: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return bookings.map((booking) => ({
            ...booking,
            latitude: booking.latitude.toNumber(),
            longitude: booking.longitude.toNumber(),
            service: {
                ...booking.service,
                price: booking.service.price.toNumber(),
            },
        }));
    }
    async acceptBooking(bookingId, washerId, userRole) {
        if (userRole !== 'WASHER' && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only washers can accept bookings');
        }
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.status !== client_1.BookingStatus.PENDING) {
            throw new common_1.BadRequestException(`Booking is not available. Current status: ${booking.status}`);
        }
        if (booking.washerId) {
            throw new common_1.BadRequestException('Booking is already assigned to another washer');
        }
        const updatedBooking = await this.prisma.booking.update({
            where: { id: bookingId },
            data: {
                washerId,
                status: client_1.BookingStatus.ASSIGNED,
            },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        address: true,
                    },
                },
                washer: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    },
                },
            },
        });
        return {
            ...updatedBooking,
            latitude: updatedBooking.latitude.toNumber(),
            longitude: updatedBooking.longitude.toNumber(),
            service: {
                ...updatedBooking.service,
                price: updatedBooking.service.price.toNumber(),
            },
            payment: updatedBooking.payment
                ? {
                    ...updatedBooking.payment,
                    amount: updatedBooking.payment.amount.toNumber(),
                }
                : null,
        };
    }
    async findWasherActiveBookings(washerId, userRole) {
        if (userRole !== 'WASHER' && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only washers can view their active bookings');
        }
        const bookings = await this.prisma.booking.findMany({
            where: {
                washerId,
                status: {
                    in: [
                        client_1.BookingStatus.ASSIGNED,
                        client_1.BookingStatus.EN_ROUTE,
                        client_1.BookingStatus.ARRIVED,
                        client_1.BookingStatus.IN_PROGRESS,
                    ],
                },
            },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        address: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return bookings.map((booking) => ({
            ...booking,
            latitude: booking.latitude.toNumber(),
            longitude: booking.longitude.toNumber(),
            service: {
                ...booking.service,
                price: booking.service.price.toNumber(),
            },
            payment: booking.payment
                ? {
                    ...booking.payment,
                    amount: booking.payment.amount.toNumber(),
                }
                : null,
        }));
    }
    async findWasherOrderHistory(washerId, userRole) {
        if (userRole !== 'WASHER' && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only washers can view their order history');
        }
        const bookings = await this.prisma.booking.findMany({
            where: {
                washerId,
                status: client_1.BookingStatus.COMPLETED,
            },
            include: {
                service: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        price: true,
                        durationMin: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        address: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                        paymentDate: true,
                    },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
        return bookings.map((booking) => ({
            ...booking,
            latitude: booking.latitude.toNumber(),
            longitude: booking.longitude.toNumber(),
            service: {
                ...booking.service,
                price: booking.service.price.toNumber(),
            },
            payment: booking.payment
                ? {
                    ...booking.payment,
                    amount: booking.payment.amount.toNumber(),
                }
                : null,
        }));
    }
    async remove(id, userId, userRole) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                payment: true,
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userRole !== 'ADMIN' && booking.userId !== userId) {
            throw new common_1.ForbiddenException('Only the booking owner can delete this booking');
        }
        if (booking.status === client_1.BookingStatus.COMPLETED) {
            throw new common_1.BadRequestException('Cannot delete a completed booking');
        }
        if (booking.payment && booking.payment.status === client_1.PaymentStatus.PAID) {
        }
        await this.prisma.booking.delete({
            where: { id },
        });
        return {
            message: 'Booking deleted successfully',
            id,
        };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map