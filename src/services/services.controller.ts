import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
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
  ApiQuery,
} from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new service (Admin only)' })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    status: 201,
    description: 'Service successfully created',
    schema: {
      example: {
        id: 'uuid',
        title: 'Basic Car Wash',
        description: 'Exterior wash and dry',
        price: 25.99,
        durationMin: 30,
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  @ApiResponse({ status: 409, description: 'Service with this title already exists' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all active services' })
  @ApiQuery({
    name: 'includeInactive',
    required: false,
    type: Boolean,
    description: 'Include inactive services (admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of services retrieved successfully',
    schema: {
      example: [
        {
          id: 'uuid',
          title: 'Basic Car Wash',
          description: 'Exterior wash and dry',
          price: 25.99,
          durationMin: 30,
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    },
  })
  findAll(@Query('includeInactive') includeInactive?: string) {
    const includeInactiveBool = includeInactive === 'true';
    return this.servicesService.findAll(includeInactiveBool);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get service by ID' })
  @ApiParam({ name: 'id', description: 'Service ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Service retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        title: 'Basic Car Wash',
        description: 'Exterior wash and dry',
        price: 25.99,
        durationMin: 30,
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Service not found' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update service (Admin only)' })
  @ApiParam({ name: 'id', description: 'Service ID', type: 'string' })
  @ApiBody({ type: UpdateServiceDto })
  @ApiResponse({
    status: 200,
    description: 'Service updated successfully',
    schema: {
      example: {
        id: 'uuid',
        title: 'Premium Car Wash',
        description: 'Full service wash with wax',
        price: 49.99,
        durationMin: 45,
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  @ApiResponse({ status: 409, description: 'Service with this title already exists' })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete service (Admin only)' })
  @ApiParam({ name: 'id', description: 'Service ID', type: 'string' })
  @ApiQuery({
    name: 'hardDelete',
    required: false,
    type: Boolean,
    description: 'Permanently delete service (default: false - soft delete)',
  })
  @ApiResponse({
    status: 200,
    description: 'Service deleted successfully',
    schema: {
      example: {
        id: 'uuid',
        title: 'Basic Car Wash',
        isActive: false,
        message: 'Service deactivated',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  remove(
    @Param('id') id: string,
    @Query('hardDelete') hardDelete?: string,
  ) {
    const hardDeleteBool = hardDelete === 'true';
    return this.servicesService.remove(id, hardDeleteBool);
  }
}

