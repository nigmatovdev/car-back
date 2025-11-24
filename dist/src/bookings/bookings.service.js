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
        const closestWasherId = await this.findClosestWasher(createBookingDto.latitude, createBookingDto.longitude);
        const booking = await this.prisma.booking.create({
            data: {
                userId,
                serviceId: createBookingDto.serviceId,
                washerId: closestWasherId,
                latitude: new client_1.Prisma.Decimal(createBookingDto.latitude),
                longitude: new client_1.Prisma.Decimal(createBookingDto.longitude),
                date: new Date(createBookingDto.date),
                time: createBookingDto.time,
                status: closestWasherId ? client_1.BookingStatus.ASSIGNED : client_1.BookingStatus.PENDING,
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
                washer: closestWasherId
                    ? {
                        select: {
                            id: true,
                            email: true,
                        },
                    }
                    : false,
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
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map