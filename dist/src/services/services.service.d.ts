import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createServiceDto: CreateServiceDto): Promise<{
        price: number;
        description: string | null;
        title: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
    }>;
    findAll(includeInactive?: boolean): Promise<{
        price: number;
        description: string | null;
        title: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
    }[]>;
    findOne(id: string): Promise<{
        price: number;
        description: string | null;
        title: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
    }>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        price: number;
        description: string | null;
        title: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
    }>;
    remove(id: string, hardDelete?: boolean): Promise<{
        message: string;
    } | {
        price: number;
        message: string;
        description: string | null;
        title: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
    }>;
}
