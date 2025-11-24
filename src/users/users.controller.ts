import {
  Controller,
  Get,
  Patch,
  Body,
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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        email: 'user@example.com',
        role: 'CUSTOMER',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getCurrentUser(@Request() req: RequestWithUser) {
    return this.usersService.getCurrentUser(req.user.userId);
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
    schema: {
      example: {
        id: 'uuid',
        email: 'newemail@example.com',
        role: 'CUSTOMER',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Email already in use' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateCurrentUser(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Regular users cannot change their role
    if (updateUserDto.role && req.user.role !== 'ADMIN') {
      delete updateUserDto.role;
    }

    return this.usersService.updateCurrentUser(req.user.userId, updateUserDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all users retrieved successfully',
    schema: {
      example: [
        {
          id: 'uuid',
          email: 'user1@example.com',
          role: 'CUSTOMER',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        email: 'user@example.com',
        role: 'CUSTOMER',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Admin access required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}

