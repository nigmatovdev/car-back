import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, ExecutionContext } from '@nestjs/common';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

interface SocketWithUser extends Socket {
  data: {
    user?: {
      userId: string;
      email: string;
      role: string;
    };
  };
}

@WebSocketGateway({
  namespace: '/ws/location',
  cors: {
    origin: '*', // Configure this properly in production
    credentials: true,
  },
})
export class LocationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(LocationGateway.name);
  private washerConnections = new Map<string, string>(); // washerId -> socketId
  private userConnections = new Map<string, Set<string>>(); // userId -> Set of socketIds

  constructor(
    private locationService: LocationService,
    private wsJwtGuard: WsJwtGuard,
  ) {}

  async handleConnection(client: SocketWithUser) {
    // Authenticate using WebSocket JWT guard
    const context = {
      switchToWs: () => ({
        getClient: () => client,
      }),
    } as any;

    const isAuthenticated = await this.wsJwtGuard.canActivate(context as ExecutionContext);
    
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

    // Track washer connections
    if (user.role === 'WASHER' || user.role === 'ADMIN') {
      this.washerConnections.set(user.userId, client.id);
      this.logger.log(`Washer ${user.userId} connected (Socket: ${client.id})`);
    }

    // Track user connections (for receiving location updates)
    if (!this.userConnections.has(user.userId)) {
      this.userConnections.set(user.userId, new Set());
    }
    this.userConnections.get(user.userId)!.add(client.id);

    // Send current location if washer
    if (user.role === 'WASHER' || user.role === 'ADMIN') {
      const currentLocation = await this.locationService.getWasherLocation(user.userId);
      if (currentLocation) {
        client.emit('location:current', currentLocation);
      }
    }
  }

  handleDisconnect(client: SocketWithUser) {
    const user = client.data.user;
    
    if (!user) {
      return;
    }

    this.logger.log(`Client disconnected: ${client.id} (User: ${user.email})`);

    // Remove washer connection
    if (this.washerConnections.get(user.userId) === client.id) {
      this.washerConnections.delete(user.userId);
      this.logger.log(`Washer ${user.userId} disconnected`);
    }

    // Remove user connection
    const userSockets = this.userConnections.get(user.userId);
    if (userSockets) {
      userSockets.delete(client.id);
      if (userSockets.size === 0) {
        this.userConnections.delete(user.userId);
      }
    }
  }

  @SubscribeMessage('washer:updateLocation')
  async handleLocationUpdate(
    @MessageBody() updateLocationDto: any,
    @ConnectedSocket() client: SocketWithUser,
  ) {
    // Validate DTO
    const dto = plainToInstance(UpdateLocationDto, updateLocationDto);
    const errors = await validate(dto);
    
    if (errors.length > 0) {
      return { error: 'Invalid location data', details: errors };
    }

    const user = client.data.user;

    if (!user) {
      return { error: 'Unauthorized' };
    }

    // Only washers can update location
    if (user.role !== 'WASHER' && user.role !== 'ADMIN') {
      return { error: 'Only washers can update location' };
    }

    try {
      // Update location in database
      const location = await this.locationService.updateWasherLocation(
        user.userId,
        updateLocationDto,
      );

      // Get active bookings for this washer
      const bookings = await this.locationService.getBookingsForWasher(user.userId);

      // Emit location update to all users who have bookings with this washer
      const locationUpdate = {
        washerId: location.washerId,
        washer: location.washer,
        lat: location.lat,
        lng: location.lng,
        updatedAt: location.updatedAt,
      };

      // Send to each user who has an active booking with this washer
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

      // Confirm to washer
      client.emit('washer:locationUpdated', {
        success: true,
        location,
      });

      this.logger.log(
        `Location updated for washer ${user.userId}: ${location.lat}, ${location.lng}`,
      );

      return { success: true, location };
    } catch (error) {
      this.logger.error(`Error updating location: ${error.message}`);
      return { error: error.message };
    }
  }

  // Helper method to emit location update to specific user
  emitLocationUpdateToUser(userId: string, locationData: any) {
    const userSockets = this.userConnections.get(userId);
    if (userSockets) {
      userSockets.forEach((socketId) => {
        this.server.to(socketId).emit('user:locationUpdate', locationData);
      });
    }
  }
}

