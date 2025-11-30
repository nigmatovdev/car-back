import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';
interface RequestWithUser extends Request {
    user: {
        userId: string;
        email: string;
        role: string;
    };
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    login(req: RequestWithUser): Promise<{
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
    refresh(req: RequestWithUser, refreshDto: RefreshDto): Promise<{
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
    getAuthStatus(req: RequestWithUser): {
        authenticated: boolean;
        email: string;
        role: string;
        userId: string;
    };
    me(req: RequestWithUser): Promise<{
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
export {};
