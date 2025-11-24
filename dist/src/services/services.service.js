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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ServicesService = class ServicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createServiceDto) {
        const existingService = await this.prisma.service.findFirst({
            where: {
                title: createServiceDto.title,
            },
        });
        if (existingService) {
            throw new common_1.ConflictException('Service with this title already exists');
        }
        const service = await this.prisma.service.create({
            data: {
                title: createServiceDto.title,
                description: createServiceDto.description,
                price: new client_1.Prisma.Decimal(createServiceDto.price),
                durationMin: createServiceDto.durationMin ?? 30,
                isActive: createServiceDto.isActive ?? true,
            },
        });
        return {
            ...service,
            price: service.price.toNumber(),
        };
    }
    async findAll(includeInactive = false) {
        const where = includeInactive
            ? {}
            : { isActive: true };
        const services = await this.prisma.service.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return services.map((service) => ({
            ...service,
            price: service.price.toNumber(),
        }));
    }
    async findOne(id) {
        const service = await this.prisma.service.findUnique({
            where: { id },
        });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return {
            ...service,
            price: service.price.toNumber(),
        };
    }
    async update(id, updateServiceDto) {
        const existingService = await this.prisma.service.findUnique({
            where: { id },
        });
        if (!existingService) {
            throw new common_1.NotFoundException('Service not found');
        }
        if (updateServiceDto.title && updateServiceDto.title !== existingService.title) {
            const titleExists = await this.prisma.service.findFirst({
                where: {
                    title: updateServiceDto.title,
                    NOT: { id },
                },
            });
            if (titleExists) {
                throw new common_1.ConflictException('Service with this title already exists');
            }
        }
        const updateData = {};
        if (updateServiceDto.title !== undefined) {
            updateData.title = updateServiceDto.title;
        }
        if (updateServiceDto.description !== undefined) {
            updateData.description = updateServiceDto.description;
        }
        if (updateServiceDto.price !== undefined) {
            updateData.price = new client_1.Prisma.Decimal(updateServiceDto.price);
        }
        if (updateServiceDto.durationMin !== undefined) {
            updateData.durationMin = updateServiceDto.durationMin;
        }
        if (updateServiceDto.isActive !== undefined) {
            updateData.isActive = updateServiceDto.isActive;
        }
        const updatedService = await this.prisma.service.update({
            where: { id },
            data: updateData,
        });
        return {
            ...updatedService,
            price: updatedService.price.toNumber(),
        };
    }
    async remove(id, hardDelete = false) {
        const service = await this.prisma.service.findUnique({
            where: { id },
        });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        if (hardDelete) {
            await this.prisma.service.delete({
                where: { id },
            });
            return { message: 'Service permanently deleted' };
        }
        else {
            const updatedService = await this.prisma.service.update({
                where: { id },
                data: { isActive: false },
            });
            return {
                ...updatedService,
                price: updatedService.price.toNumber(),
                message: 'Service deactivated',
            };
        }
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map