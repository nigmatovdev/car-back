import { Role } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    role?: Role;
}
