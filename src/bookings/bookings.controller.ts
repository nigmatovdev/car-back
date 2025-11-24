import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
}

