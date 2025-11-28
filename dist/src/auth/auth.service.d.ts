import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
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
        };
    }>;
    login(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            phone: any;
            avatar: any;
            address: any;
            role: any;
            isActive: any;
        };
    }>;
    validateUser(email: string, password: string): Promise<any>;
    validateRefreshToken(userId: string, refreshToken: string): Promise<any>;
    refresh(userId: string, email: string, role: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            avatar: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.Role;
            isActive: boolean;
        };
    }>;
    me(userId: string): Promise<{
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
    private generateTokens;
    private updateRefreshToken;
}
