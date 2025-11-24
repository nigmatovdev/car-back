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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
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
  async me(@Request() req: RequestWithUser) {
    return this.authService.me(req.user.userId);
  }
}

