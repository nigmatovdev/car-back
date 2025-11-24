import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LocationService } from './location.service';
import { WsJwtGuard } from './guards/ws-jwt.guard';
interface SocketWithUser extends Socket {
    data: {
        user?: {
            userId: string;
            email: string;
            role: string;
        };
    };
}
export declare class LocationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private locationService;
    private wsJwtGuard;
    server: Server;
    private readonly logger;
    private washerConnections;
    private userConnections;
    constructor(locationService: LocationService, wsJwtGuard: WsJwtGuard);
    handleConnection(client: SocketWithUser): Promise<void>;
    handleDisconnect(client: SocketWithUser): void;
    handleLocationUpdate(updateLocationDto: any, client: SocketWithUser): Promise<{
        error: string;
        details: import("class-validator").ValidationError[];
        success?: undefined;
        location?: undefined;
    } | {
        success: boolean;
        location: {
            id: string;
            washerId: string;
            lat: number;
            lng: number;
            updatedAt: Date;
            washer: {
                id: string;
                email: string;
            };
        };
        error?: undefined;
        details?: undefined;
    } | {
        error: any;
        details?: undefined;
        success?: undefined;
        location?: undefined;
    }>;
    emitLocationUpdateToUser(userId: string, locationData: any): void;
}
export {};
