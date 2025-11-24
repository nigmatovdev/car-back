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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_service_1 = require("./services.service");
const create_service_dto_1 = require("./dto/create-service.dto");
const update_service_dto_1 = require("./dto/update-service.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
let ServicesController = class ServicesController {
    servicesService;
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    create(createServiceDto) {
        return this.servicesService.create(createServiceDto);
    }
    findAll(includeInactive) {
        const includeInactiveBool = includeInactive === 'true';
        return this.servicesService.findAll(includeInactiveBool);
    }
    findOne(id) {
        return this.servicesService.findOne(id);
    }
    update(id, updateServiceDto) {
        return this.servicesService.update(id, updateServiceDto);
    }
    remove(id, hardDelete) {
        const hardDeleteBool = hardDelete === 'true';
        return this.servicesService.remove(id, hardDeleteBool);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new service (Admin only)' }),
    (0, swagger_1.ApiBody)({ type: create_service_dto_1.CreateServiceDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Service successfully created',
        schema: {
            example: {
                id: 'uuid',
                title: 'Basic Car Wash',
                description: 'Exterior wash and dry',
                price: 25.99,
                durationMin: 30,
                isActive: true,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Admin access required' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Service with this title already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active services' }),
    (0, swagger_1.ApiQuery)({
        name: 'includeInactive',
        required: false,
        type: Boolean,
        description: 'Include inactive services (admin only)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of services retrieved successfully',
        schema: {
            example: [
                {
                    id: 'uuid',
                    title: 'Basic Car Wash',
                    description: 'Exterior wash and dry',
                    price: 25.99,
                    durationMin: 30,
                    isActive: true,
                    createdAt: '2024-01-01T00:00:00.000Z',
                    updatedAt: '2024-01-01T00:00:00.000Z',
                },
            ],
        },
    }),
    __param(0, (0, common_1.Query)('includeInactive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get service by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Service ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service retrieved successfully',
        schema: {
            example: {
                id: 'uuid',
                title: 'Basic Car Wash',
                description: 'Exterior wash and dry',
                price: 25.99,
                durationMin: 30,
                isActive: true,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update service (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Service ID', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: update_service_dto_1.UpdateServiceDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service updated successfully',
        schema: {
            example: {
                id: 'uuid',
                title: 'Premium Car Wash',
                description: 'Full service wash with wax',
                price: 49.99,
                durationMin: 45,
                isActive: true,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Admin access required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Service with this title already exists' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete service (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Service ID', type: 'string' }),
    (0, swagger_1.ApiQuery)({
        name: 'hardDelete',
        required: false,
        type: Boolean,
        description: 'Permanently delete service (default: false - soft delete)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service deleted successfully',
        schema: {
            example: {
                id: 'uuid',
                title: 'Basic Car Wash',
                isActive: false,
                message: 'Service deactivated',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Admin access required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Service not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('hardDelete')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "remove", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)('services'),
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map