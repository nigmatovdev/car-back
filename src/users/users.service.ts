import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Helper to sanitize user data (remove password)
  private sanitizeUser(user: any) {
    if (!user) return null;
    const { password, refreshToken, ...sanitized } = user;
    return sanitized;
  }

  // Get current user's profile
  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        address: true,
        role: true,
        isActive: true,
        creditBalance: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      creditBalance: user.creditBalance.toNumber(),
    };
  }

  // Update current user's profile
  async updateCurrentUser(userId: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // If email is being updated, check if it's already taken
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new ForbiddenException('Email already in use');
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (updateUserDto.email) {
      updateData.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      // Hash the new password
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.firstName !== undefined) {
      updateData.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName !== undefined) {
      updateData.lastName = updateUserDto.lastName;
    }

    if (updateUserDto.phone !== undefined) {
      updateData.phone = updateUserDto.phone;
    }

    if (updateUserDto.avatar !== undefined) {
      updateData.avatar = updateUserDto.avatar;
    }

    if (updateUserDto.address !== undefined) {
      updateData.address = updateUserDto.address;
    }

    // Regular users cannot change their role or isActive
    // Only admins can change roles (handled in controller)
    if (updateUserDto.role) {
      updateData.role = updateUserDto.role;
    }

    if (updateUserDto.isActive !== undefined) {
      updateData.isActive = updateUserDto.isActive;
    }

    // Update user
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        address: true,
        role: true,
        isActive: true,
        creditBalance: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...updatedUser,
      creditBalance: updatedUser.creditBalance.toNumber(),
    };
  }

  // Get all users (admin only)
  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        address: true,
        role: true,
        isActive: true,
        creditBalance: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users.map((user) => ({
      ...user,
      creditBalance: user.creditBalance.toNumber(),
    }));
  }

  // Get user by ID (admin only)
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        address: true,
        role: true,
        isActive: true,
        creditBalance: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      creditBalance: user.creditBalance.toNumber(),
    };
  }
}

