import { Module } from '@nestjs/common';
import { LocationGateway } from './location.gateway';
import { LocationService } from './location.service';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LocationGateway, LocationService, WsJwtGuard],
  exports: [LocationService],
})
export class LocationModule {}


