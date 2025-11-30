import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WasherGuard } from '../auth/guards/washer.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@ApiTags('bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({
    status: 201,
    description: 'Booking successfully created',
    schema: {
      example: {
        id: 'uuid',
        userId: 'uuid',
        serviceId: 'uuid',
        washerId: 'uuid',
        latitude: 40.7128,
        longitude: -74.0060,
        date: '2024-12-25T00:00:00.000Z',
        time: '14:30',
        status: 'ASSIGNED',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        service: {
          id: 'uuid',
          title: 'Basic Car Wash',
          description: 'Exterior wash and dry',
          price: 25.99,
          durationMin: 30,
        },
        user: {
          id: 'uuid',
          email: 'user@example.com',
        },
        washer: {
          id: 'uuid',
          email: 'washer@example.com',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input or service not active' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  create(@Request() req: RequestWithUser, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(req.user.userId, createBookingDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user bookings' })
  @ApiResponse({
    status: 200,
    description: 'User bookings retrieved successfully',
    schema: {
      example: [
        {
          id: 'uuid',
          userId: 'uuid',
          serviceId: 'uuid',
          washerId: 'uuid',
          latitude: 40.7128,
          longitude: -74.0060,
          date: '2024-12-25T00:00:00.000Z',
          time: '14:30',
          status: 'ASSIGNED',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          service: {
            id: 'uuid',
            title: 'Basic Car Wash',
            price: 25.99,
          },
          payment: {
            id: 'uuid',
            amount: 25.99,
            status: 'UNPAID',
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findMyBookings(@Request() req: RequestWithUser) {
    return this.bookingsService.findMyBookings(req.user.userId);
  }

  @Get()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all bookings (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'All bookings retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  findAll(@Request() req: RequestWithUser) {
    return this.bookingsService.findAll(req.user.role);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Booking retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.bookingsService.findOne(id, req.user.userId, req.user.role);
  }

  @Patch(':id/status')
  @UseGuards(WasherGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update booking status (Washer only)' })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiBody({ type: UpdateBookingStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Booking status updated successfully',
    schema: {
      example: {
        id: 'uuid',
        status: 'EN_ROUTE',
        message: 'Status updated successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Only assigned washer can update status' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  updateStatus(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(
      id,
      req.user.userId,
      req.user.role,
      updateStatusDto,
    );
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a booking (Owner only)' })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Booking cancelled successfully',
    schema: {
      example: {
        id: 'uuid',
        userId: 'uuid',
        serviceId: 'uuid',
        washerId: 'uuid',
        latitude: 40.7128,
        longitude: -74.0060,
        date: '2024-12-25T00:00:00.000Z',
        time: '14:30',
        status: 'CANCELLED',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        service: {
          id: 'uuid',
          title: 'Basic Car Wash',
          description: 'Exterior wash and dry',
          price: 25.99,
          durationMin: 30,
        },
        user: {
          id: 'uuid',
          email: 'user@example.com',
        },
        washer: {
          id: 'uuid',
          email: 'washer@example.com',
        },
        payment: {
          id: 'uuid',
          amount: 25.99,
          status: 'FAILED',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Booking cannot be cancelled (already cancelled or completed)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Only the booking owner can cancel this booking' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  cancel(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.bookingsService.cancel(id, req.user.userId, req.user.role);
  }

  @Get('available')
  @UseGuards(WasherGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get available bookings (Washer only)' })
  @ApiResponse({
    status: 200,
    description: 'Available bookings retrieved successfully',
    schema: {
      example: [
        {
          id: 'uuid',
          userId: 'uuid',
          serviceId: 'uuid',
          washerId: null,
          latitude: 40.7128,
          longitude: -74.0060,
          date: '2024-12-25T00:00:00.000Z',
          time: '14:30',
          status: 'PENDING',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          service: {
            id: 'uuid',
            title: 'Basic Car Wash',
            description: 'Exterior wash and dry',
            price: 25.99,
            durationMin: 30,
          },
          user: {
            id: 'uuid',
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567890',
            address: '123 Main St',
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Only washers can view available bookings' })
  findAvailableBookings(@Request() req: RequestWithUser) {
    return this.bookingsService.findAvailableBookings(req.user.role);
  }

  @Patch(':id/accept')
  @UseGuards(WasherGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept a booking (Washer only)' })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Booking accepted successfully',
    schema: {
      example: {
        id: 'uuid',
        userId: 'uuid',
        serviceId: 'uuid',
        washerId: 'uuid',
        latitude: 40.7128,
        longitude: -74.0060,
        date: '2024-12-25T00:00:00.000Z',
        time: '14:30',
        status: 'ASSIGNED',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
        service: {
          id: 'uuid',
          title: 'Basic Car Wash',
          description: 'Exterior wash and dry',
          price: 25.99,
          durationMin: 30,
        },
        user: {
          id: 'uuid',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
          address: '123 Main St',
        },
        washer: {
          id: 'uuid',
          email: 'washer@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          phone: '+0987654321',
        },
        payment: {
          id: 'uuid',
          amount: 25.99,
          status: 'UNPAID',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Booking is not available or already assigned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Only washers can accept bookings' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  acceptBooking(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.bookingsService.acceptBooking(id, req.user.userId, req.user.role);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a booking (Owner only)' })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Booking deleted successfully',
    schema: {
      example: {
        message: 'Booking deleted successfully',
        id: 'uuid',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Cannot delete a completed booking' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Only the booking owner can delete this booking' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.bookingsService.remove(id, req.user.userId, req.user.role);
  }
}

