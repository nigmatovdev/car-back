import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingStatus, PaymentStatus, Prisma } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  // Calculate distance between two coordinates using Haversine formula
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  // Find the closest available washer
  private async findClosestWasher(
    latitude: number,
    longitude: number,
  ): Promise<string | null> {
    // Get all washer locations
    const washerLocations = await this.prisma.washerLocation.findMany({
      include: {
        washer: {
          select: {
            id: true,
            role: true,
          },
        },
      },
    });

    if (washerLocations.length === 0) {
      return null;
    }

    // Calculate distances and find closest
    let closestWasherId: string | null = null;
    let minDistance = Infinity;

    for (const location of washerLocations) {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        location.latitude.toNumber(),
        location.longitude.toNumber(),
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestWasherId = location.washerId;
      }
    }

    return closestWasherId;
  }

  // Validate status transition
  private validateStatusTransition(
    currentStatus: BookingStatus,
    newStatus: BookingStatus,
  ): boolean {
    const validTransitions: Record<BookingStatus, BookingStatus[]> = {
      PENDING: ['ASSIGNED', 'CANCELLED'],
      ASSIGNED: ['EN_ROUTE', 'CANCELLED'],
      EN_ROUTE: ['ARRIVED', 'CANCELLED'],
      ARRIVED: ['IN_PROGRESS', 'CANCELLED'],
      IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
      COMPLETED: [], // Terminal state
      CANCELLED: [], // Terminal state
    };

    return validTransitions[currentStatus]?.includes(newStatus) ?? false;
  }

  async create(userId: string, createBookingDto: CreateBookingDto) {
    // Verify service exists and is active
    const service = await this.prisma.service.findUnique({
      where: { id: createBookingDto.serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (!service.isActive) {
      throw new BadRequestException('Service is not active');
    }

    // Find closest washer
    const closestWasherId = await this.findClosestWasher(
      createBookingDto.latitude,
      createBookingDto.longitude,
    );

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        serviceId: createBookingDto.serviceId,
        washerId: closestWasherId, // Auto-assign if available
        latitude: new Prisma.Decimal(createBookingDto.latitude),
        longitude: new Prisma.Decimal(createBookingDto.longitude),
        date: new Date(createBookingDto.date),
        time: createBookingDto.time,
        status: closestWasherId ? BookingStatus.ASSIGNED : BookingStatus.PENDING,
      },
      include: {
        service: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            durationMin: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        washer: closestWasherId
          ? {
              select: {
                id: true,
                email: true,
              },
            }
          : false,
      },
    });

    // Create payment record
    await this.prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId,
        amount: service.price,
      },
    });

    return {
      ...booking,
      latitude: booking.latitude.toNumber(),
      longitude: booking.longitude.toNumber(),
      service: {
        ...booking.service,
        price: booking.service.price.toNumber(),
      },
    };
  }

  async findMyBookings(userId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { userId },
      include: {
        service: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            durationMin: true,
          },
        },
        washer: {
          select: {
            id: true,
            email: true,
          },
        },
        payment: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return bookings.map((booking) => ({
      ...booking,
      latitude: booking.latitude.toNumber(),
      longitude: booking.longitude.toNumber(),
      service: {
        ...booking.service,
        price: booking.service.price.toNumber(),
      },
      payment: booking.payment
        ? {
            ...booking.payment,
            amount: booking.payment.amount.toNumber(),
          }
        : null,
    }));
  }

  async findOne(id: string, userId?: string, userRole?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        service: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            durationMin: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        washer: {
          select: {
            id: true,
            email: true,
          },
        },
        payment: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check access: user can see their own, washer can see assigned, admin can see all
    if (userRole !== 'ADMIN') {
      if (userId !== booking.userId && userId !== booking.washerId) {
        throw new ForbiddenException('Access denied');
      }
    }

    return {
      ...booking,
      latitude: booking.latitude.toNumber(),
      longitude: booking.longitude.toNumber(),
      service: {
        ...booking.service,
        price: booking.service.price.toNumber(),
      },
      payment: booking.payment
        ? {
            ...booking.payment,
            amount: booking.payment.amount.toNumber(),
          }
        : null,
    };
  }

  async updateStatus(
    id: string,
    userId: string,
    userRole: string,
    updateStatusDto: UpdateBookingStatusDto,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if user is the assigned washer or admin
    if (userRole !== 'ADMIN' && booking.washerId !== userId) {
      throw new ForbiddenException('Only the assigned washer can update status');
    }

    // Validate status transition
    if (!this.validateStatusTransition(booking.status, updateStatusDto.status)) {
      throw new BadRequestException(
        `Invalid status transition from ${booking.status} to ${updateStatusDto.status}`,
      );
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: {
        status: updateStatusDto.status,
      },
      include: {
        service: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            durationMin: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        washer: {
          select: {
            id: true,
            email: true,
          },
        },
        payment: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
        },
      },
    });

    return {
      ...updatedBooking,
      latitude: updatedBooking.latitude.toNumber(),
      longitude: updatedBooking.longitude.toNumber(),
      service: {
        ...updatedBooking.service,
        price: updatedBooking.service.price.toNumber(),
      },
      payment: updatedBooking.payment
        ? {
            ...updatedBooking.payment,
            amount: updatedBooking.payment.amount.toNumber(),
          }
        : null,
    };
  }

  async findAll(userRole: string) {
    // Only admins can view all bookings
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }

    const bookings = await this.prisma.booking.findMany({
      include: {
        service: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            durationMin: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        washer: {
          select: {
            id: true,
            email: true,
          },
        },
        payment: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return bookings.map((booking) => ({
      ...booking,
      latitude: booking.latitude.toNumber(),
      longitude: booking.longitude.toNumber(),
      service: {
        ...booking.service,
        price: booking.service.price.toNumber(),
      },
      payment: booking.payment
        ? {
            ...booking.payment,
            amount: booking.payment.amount.toNumber(),
          }
        : null,
    }));
  }

  async cancel(id: string, userId: string, userRole: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        payment: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if user is the booking owner or admin
    if (userRole !== 'ADMIN' && booking.userId !== userId) {
      throw new ForbiddenException('Only the booking owner can cancel this booking');
    }

    // Check if booking can be cancelled
    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel a completed booking');
    }

    // Update booking status to CANCELLED
    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CANCELLED,
      },
      include: {
        service: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            durationMin: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        washer: {
          select: {
            id: true,
            email: true,
          },
        },
        payment: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
        },
      },
    });

    // If payment was made, mark it as failed (refund would be handled separately via Stripe)
    if (booking.payment && booking.payment.status === PaymentStatus.PAID) {
      await this.prisma.payment.update({
        where: { bookingId: id },
        data: {
          status: PaymentStatus.FAILED, // Mark as failed for cancelled bookings (refund handled separately)
        },
      });
    }

    return {
      ...updatedBooking,
      latitude: updatedBooking.latitude.toNumber(),
      longitude: updatedBooking.longitude.toNumber(),
      service: {
        ...updatedBooking.service,
        price: updatedBooking.service.price.toNumber(),
      },
      payment: updatedBooking.payment
        ? {
            ...updatedBooking.payment,
            amount: updatedBooking.payment.amount.toNumber(),
          }
        : null,
    };
  }

  async remove(id: string, userId: string, userRole: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        payment: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if user is the booking owner or admin
    if (userRole !== 'ADMIN' && booking.userId !== userId) {
      throw new ForbiddenException('Only the booking owner can delete this booking');
    }

    // Prevent deletion of completed bookings (for record keeping)
    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cannot delete a completed booking');
    }

    // Warn if trying to delete a paid booking (payment will be deleted due to cascade)
    if (booking.payment && booking.payment.status === PaymentStatus.PAID) {
      // Still allow deletion, but log it (in production, you might want to handle refunds first)
      // For now, we'll allow it but the payment will be deleted due to cascade
    }

    // Delete booking (payment will be automatically deleted due to onDelete: Cascade)
    await this.prisma.booking.delete({
      where: { id },
    });

    return {
      message: 'Booking deleted successfully',
      id,
    };
  }
}

