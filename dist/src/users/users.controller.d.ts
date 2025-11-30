import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
interface RequestWithUser extends Request {
    user: {
        userId: string;
        email: string;
        role: string;
    };
}
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getCurrentUser(req: RequestWithUser): Promise<{
        creditBalance: any;
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatar: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCurrentUser(req: RequestWithUser, updateUserDto: UpdateUserDto): Promise<{
        creditBalance: any;
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatar: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        creditBalance: any;
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatar: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        creditBalance: any;
        id: string;
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        avatar: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
