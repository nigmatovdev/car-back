import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      example: {
        user: {
          id: 'uuid',
          email: 'user@example.com',
          role: 'CUSTOMER',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        accessToken: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
      },
    },
  })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    schema: {
      example: {
        user: {
          id: 'uuid',
          email: 'user@example.com',
          role: 'CUSTOMER',
        },
        accessToken: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: RefreshDto })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    schema: {
      example: {
        user: {
          id: 'uuid',
          email: 'user@example.com',
          role: 'CUSTOMER',
        },
        accessToken: 'new-jwt-access-token',
        refreshToken: 'new-jwt-refresh-token',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Request() req: RequestWithUser, @Body() refreshDto: RefreshDto) {
    // Validate the refresh token matches what's in DB
    const user = await this.authService.validateRefreshToken(req.user.userId, refreshDto.refreshToken);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this.authService.refresh(req.user.userId, req.user.email, req.user.role);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'User information retrieved successfully',
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
  async me(@Request() req: RequestWithUser) {
    return this.authService.me(req.user.userId);
  }
}

