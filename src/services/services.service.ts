import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    // Check if service with same title already exists
    const existingService = await this.prisma.service.findFirst({
      where: {
        title: createServiceDto.title,
      },
    });

    if (existingService) {
      throw new ConflictException('Service with this title already exists');
    }

    const service = await this.prisma.service.create({
      data: {
        title: createServiceDto.title,
        description: createServiceDto.description,
        price: new Prisma.Decimal(createServiceDto.price),
        durationMin: createServiceDto.durationMin ?? 30,
        isActive: createServiceDto.isActive ?? true,
      },
    });

    return {
      ...service,
      price: service.price.toNumber(),
    };
  }

  async findAll(includeInactive: boolean = false) {
    const where: Prisma.ServiceWhereInput = includeInactive
      ? {}
      : { isActive: true };

    const services = await this.prisma.service.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return services.map((service) => ({
      ...service,
      price: service.price.toNumber(),
    }));
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return {
      ...service,
      price: service.price.toNumber(),
    };
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    // Check if service exists
    const existingService = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      throw new NotFoundException('Service not found');
    }

    // Check if title is being updated and if it conflicts with another service
    if (updateServiceDto.title && updateServiceDto.title !== existingService.title) {
      const titleExists = await this.prisma.service.findFirst({
        where: {
          title: updateServiceDto.title,
          NOT: { id },
        },
      });

      if (titleExists) {
        throw new ConflictException('Service with this title already exists');
      }
    }

    const updateData: Prisma.ServiceUpdateInput = {};

    if (updateServiceDto.title !== undefined) {
      updateData.title = updateServiceDto.title;
    }

    if (updateServiceDto.description !== undefined) {
      updateData.description = updateServiceDto.description;
    }

    if (updateServiceDto.price !== undefined) {
      updateData.price = new Prisma.Decimal(updateServiceDto.price);
    }

    if (updateServiceDto.durationMin !== undefined) {
      updateData.durationMin = updateServiceDto.durationMin;
    }

    if (updateServiceDto.isActive !== undefined) {
      updateData.isActive = updateServiceDto.isActive;
    }

    const updatedService = await this.prisma.service.update({
      where: { id },
      data: updateData,
    });

    return {
      ...updatedService,
      price: updatedService.price.toNumber(),
    };
  }

  async remove(id: string, hardDelete: boolean = false) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (hardDelete) {
      // Hard delete - permanently remove from database
      await this.prisma.service.delete({
        where: { id },
      });
      return { message: 'Service permanently deleted' };
    } else {
      // Soft delete - mark as inactive
      const updatedService = await this.prisma.service.update({
        where: { id },
        data: { isActive: false },
      });
      return {
        ...updatedService,
        price: updatedService.price.toNumber(),
        message: 'Service deactivated',
      };
    }
  }
}

