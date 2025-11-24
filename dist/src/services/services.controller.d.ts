import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): Promise<{
        price: number;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
        isActive: boolean;
    }>;
    findAll(includeInactive?: string): Promise<{
        price: number;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        price: number;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
        isActive: boolean;
    }>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        price: number;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
        isActive: boolean;
    }>;
    remove(id: string, hardDelete?: string): Promise<{
        message: string;
    } | {
        price: number;
        message: string;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        durationMin: number;
        isActive: boolean;
    }>;
}
