import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocationService } from './location.service';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@ApiTags('location')
@Controller('location')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('websocket-info')
  @ApiOperation({
    summary: 'Get WebSocket connection information',
    description:
      'Returns information about connecting to the WebSocket location tracking service. ' +
      'For detailed WebSocket API documentation, see docs/API_LOCATION.md',
  })
  @ApiResponse({
    status: 200,
    description: 'WebSocket connection information',
    schema: {
      example: {
        websocketUrl: 'ws://localhost:3000/ws/location',
        namespace: '/ws/location',
        authentication: {
          method: 'JWT Token',
          header: 'Authorization: Bearer <token>',
          queryParam: '?token=<token>',
          socketAuth: 'socket.auth = { token: "<token>" }',
        },
        events: {
          clientToServer: [
            {
              event: 'washer:updateLocation',
              description: 'Send GPS location update (Washers/Admins only)',
              payload: { lat: 40.7128, lng: -74.0060 },
            },
          ],
          serverToClient: [
            {
              event: 'location:current',
              description: 'Sent to washer on connection with current location',
            },
            {
              event: 'washer:locationUpdated',
              description: 'Confirmation sent to washer after location update',
            },
            {
              event: 'user:locationUpdate',
              description: 'Real-time location update sent to users with active bookings',
            },
          ],
        },
        documentation: 'See docs/API_LOCATION.md for complete WebSocket API documentation',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getWebSocketInfo(@Request() req: RequestWithUser) {
    return {
      websocketUrl: `${process.env.WS_URL || 'ws://localhost:3000'}/ws/location`,
      namespace: '/ws/location',
      authentication: {
        method: 'JWT Token',
        header: 'Authorization: Bearer <token>',
        queryParam: '?token=<token>',
        socketAuth: 'socket.auth = { token: "<token>" }',
      },
      events: {
        clientToServer: [
          {
            event: 'washer:updateLocation',
            description: 'Send GPS location update (Washers/Admins only)',
            payload: { lat: 40.7128, lng: -74.0060 },
          },
        ],
        serverToClient: [
          {
            event: 'location:current',
            description: 'Sent to washer on connection with current location',
          },
          {
            event: 'washer:locationUpdated',
            description: 'Confirmation sent to washer after location update',
          },
          {
            event: 'user:locationUpdate',
            description: 'Real-time location update sent to users with active bookings',
          },
        ],
      },
      documentation: 'See docs/API_LOCATION.md for complete WebSocket API documentation',
      exampleCode: {
        javascript: `
// Washer App - Send Location Updates
import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000/ws/location', {
  auth: { token: 'your-jwt-token' },
  transports: ['websocket']
});

socket.on('connect', () => {
  socket.emit('washer:updateLocation', {
    lat: 40.7128,
    lng: -74.0060
  });
});

socket.on('washer:locationUpdated', (data) => {
  console.log('Location updated:', data);
});

// User App - Receive Location Updates
socket.on('user:locationUpdate', (update) => {
  console.log('Washer location:', update);
});
        `.trim(),
      },
    };
  }
}

