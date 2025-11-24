import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
interface RequestWithUser extends Request {
    user: {
        userId: string;
        email: string;
        role: string;
    };
}
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(req: RequestWithUser, createBookingDto: CreateBookingDto): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            id: string;
            title: string;
            description: string | null;
            durationMin: number;
        };
        user: {
            id: string;
            email: string;
        };
        washer: {
            id: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            refreshToken: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
    }>;
    findMyBookings(req: RequestWithUser): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            id: string;
            title: string;
            description: string | null;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        washer: {
            id: string;
            email: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
    }[]>;
    findAll(req: RequestWithUser): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            id: string;
            title: string;
            description: string | null;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        user: {
            id: string;
            email: string;
        };
        washer: {
            id: string;
            email: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
    }[]>;
    findOne(req: RequestWithUser, id: string): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            id: string;
            title: string;
            description: string | null;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        user: {
            id: string;
            email: string;
        };
        washer: {
            id: string;
            email: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
    }>;
    updateStatus(req: RequestWithUser, id: string, updateStatusDto: UpdateBookingStatusDto): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            id: string;
            title: string;
            description: string | null;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        user: {
            id: string;
            email: string;
        };
        washer: {
            id: string;
            email: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
    }>;
}
export {};
