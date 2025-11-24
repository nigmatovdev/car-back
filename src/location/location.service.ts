import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async updateWasherLocation(washerId: string, locationDto: UpdateLocationDto) {
    // Verify user is a washer
    const washer = await this.prisma.user.findUnique({
      where: { id: washerId },
      select: { id: true, role: true },
    });

    if (!washer) {
      throw new NotFoundException('Washer not found');
    }

    if (washer.role !== 'WASHER' && washer.role !== 'ADMIN') {
      throw new ForbiddenException('Only washers can update location');
    }

    // Upsert location (create or update)
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

  async getWasherLocation(washerId: string) {
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

  async getBookingsForWasher(washerId: string) {
    // Get active bookings for this washer
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
}

