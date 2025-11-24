import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = this.extractTokenFromSocket(client);

    if (!token) {
      client.disconnect();
      return false;
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET') || 'your-secret-key';
      const payload = await this.jwtService.verifyAsync(token, { secret });
      
      // Attach user info to socket data
      client.data.user = {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      return true;
    } catch (error) {
      client.disconnect();
      return false;
    }
  }

  private extractTokenFromSocket(client: Socket): string | null {
    // Try to get token from auth header (Bearer token)
    const authHeader = client.handshake.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Try to get token from query params
    const token = client.handshake.auth?.token || client.handshake.query?.token;
    if (token && typeof token === 'string') {
      return token;
    }

    return null;
  }
}

