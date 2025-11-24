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
var LocationGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
const update_location_dto_1 = require("./dto/update-location.dto");
const ws_jwt_guard_1 = require("./guards/ws-jwt.guard");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let LocationGateway = LocationGateway_1 = class LocationGateway {
    locationService;
    wsJwtGuard;
    server;
    logger = new common_1.Logger(LocationGateway_1.name);
    washerConnections = new Map();
    userConnections = new Map();
    constructor(locationService, wsJwtGuard) {
        this.locationService = locationService;
        this.wsJwtGuard = wsJwtGuard;
    }
    async handleConnection(client) {
        const context = {
            switchToWs: () => ({
                getClient: () => client,
            }),
        };
        const isAuthenticated = await this.wsJwtGuard.canActivate(context);
        if (!isAuthenticated) {
            this.logger.warn(`Connection rejected: Authentication failed`);
            client.disconnect();
            return;
        }
        const user = client.data.user;
        if (!user) {
            this.logger.warn(`Connection rejected: No user data`);
            client.disconnect();
            return;
        }
        this.logger.log(`Client connected: ${client.id} (User: ${user.email}, Role: ${user.role})`);
        if (user.role === 'WASHER' || user.role === 'ADMIN') {
            this.washerConnections.set(user.userId, client.id);
            this.logger.log(`Washer ${user.userId} connected (Socket: ${client.id})`);
        }
        if (!this.userConnections.has(user.userId)) {
            this.userConnections.set(user.userId, new Set());
        }
        this.userConnections.get(user.userId).add(client.id);
        if (user.role === 'WASHER' || user.role === 'ADMIN') {
            const currentLocation = await this.locationService.getWasherLocation(user.userId);
            if (currentLocation) {
                client.emit('location:current', currentLocation);
            }
        }
    }
    handleDisconnect(client) {
        const user = client.data.user;
        if (!user) {
            return;
        }
        this.logger.log(`Client disconnected: ${client.id} (User: ${user.email})`);
        if (this.washerConnections.get(user.userId) === client.id) {
            this.washerConnections.delete(user.userId);
            this.logger.log(`Washer ${user.userId} disconnected`);
        }
        const userSockets = this.userConnections.get(user.userId);
        if (userSockets) {
            userSockets.delete(client.id);
            if (userSockets.size === 0) {
                this.userConnections.delete(user.userId);
            }
        }
    }
    async handleLocationUpdate(updateLocationDto, client) {
        const dto = (0, class_transformer_1.plainToInstance)(update_location_dto_1.UpdateLocationDto, updateLocationDto);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            return { error: 'Invalid location data', details: errors };
        }
        const user = client.data.user;
        if (!user) {
            return { error: 'Unauthorized' };
        }
        if (user.role !== 'WASHER' && user.role !== 'ADMIN') {
            return { error: 'Only washers can update location' };
        }
        try {
            const location = await this.locationService.updateWasherLocation(user.userId, updateLocationDto);
            const bookings = await this.locationService.getBookingsForWasher(user.userId);
            const locationUpdate = {
                washerId: location.washerId,
                washer: location.washer,
                lat: location.lat,
                lng: location.lng,
                updatedAt: location.updatedAt,
            };
            for (const booking of bookings) {
                const userSockets = this.userConnections.get(booking.userId);
                if (userSockets) {
                    userSockets.forEach((socketId) => {
                        this.server.to(socketId).emit('user:locationUpdate', {
                            bookingId: booking.id,
                            ...locationUpdate,
                        });
                    });
                }
            }
            client.emit('washer:locationUpdated', {
                success: true,
                location,
            });
            this.logger.log(`Location updated for washer ${user.userId}: ${location.lat}, ${location.lng}`);
            return { success: true, location };
        }
        catch (error) {
            this.logger.error(`Error updating location: ${error.message}`);
            return { error: error.message };
        }
    }
    emitLocationUpdateToUser(userId, locationData) {
        const userSockets = this.userConnections.get(userId);
        if (userSockets) {
            userSockets.forEach((socketId) => {
                this.server.to(socketId).emit('user:locationUpdate', locationData);
            });
        }
    }
};
exports.LocationGateway = LocationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], LocationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('washer:updateLocation'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationGateway.prototype, "handleLocationUpdate", null);
exports.LocationGateway = LocationGateway = LocationGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/ws/location',
        cors: {
            origin: '*',
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [location_service_1.LocationService,
        ws_jwt_guard_1.WsJwtGuard])
], LocationGateway);
//# sourceMappingURL=location.gateway.js.map