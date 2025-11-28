import { Role } from '@prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    address?: string;
    role?: Role;
}
