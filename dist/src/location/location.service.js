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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LocationService = class LocationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateWasherLocation(washerId, locationDto) {
        const washer = await this.prisma.user.findUnique({
            where: { id: washerId },
            select: { id: true, role: true },
        });
        if (!washer) {
            throw new common_1.NotFoundException('Washer not found');
        }
        if (washer.role !== 'WASHER' && washer.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only washers can update location');
        }
        const location = await this.prisma.washerLocation.upsert({
            where: { washerId },
            update: {
                latitude: locationDto.lat,
                longitude: locationDto.lng,
            },
            create: {
                washerId,
                latitude: locationDto.lat,
                longitude: locationDto.lng,
            },
            include: {
                washer: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
        return {
            id: location.id,
            washerId: location.washerId,
            lat: location.latitude.toNumber(),
            lng: location.longitude.toNumber(),
            updatedAt: location.updatedAt,
            washer: location.washer,
        };
    }
    async getWasherLocation(washerId) {
        const location = await this.prisma.washerLocation.findUnique({
            where: { washerId },
            include: {
                washer: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
        if (!location) {
            return null;
        }
        return {
            id: location.id,
            washerId: location.washerId,
            lat: location.latitude.toNumber(),
            lng: location.longitude.toNumber(),
            updatedAt: location.updatedAt,
            washer: location.washer,
        };
    }
    async getBookingsForWasher(washerId) {
        const bookings = await this.prisma.booking.findMany({
            where: {
                washerId,
                status: {
                    in: ['ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'],
                },
            },
            select: {
                id: true,
                userId: true,
                status: true,
            },
        });
        return bookings;
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationService);
//# sourceMappingURL=location.service.js.map