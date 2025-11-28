import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    private sanitizeUser;
    getCurrentUser(userId: string): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatar: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCurrentUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatar: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatar: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatar: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
