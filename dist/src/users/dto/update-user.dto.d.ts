import { Role } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    address?: string;
    role?: Role;
    isActive?: boolean;
}
