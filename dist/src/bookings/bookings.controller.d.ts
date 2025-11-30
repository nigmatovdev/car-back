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
            description: string | null;
            title: string;
            id: string;
            durationMin: number;
        };
        user: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            id: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        date: Date;
        time: string;
        userId: string;
        washerId: string | null;
        serviceId: string;
    }>;
    findMyBookings(req: RequestWithUser): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            description: string | null;
            title: string;
            id: string;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        washer: {
            email: string;
            id: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        date: Date;
        time: string;
        userId: string;
        washerId: string | null;
        serviceId: string;
    }[]>;
    findAll(req: RequestWithUser): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            description: string | null;
            title: string;
            id: string;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        user: {
            email: string;
            id: string;
        };
        washer: {
            email: string;
            id: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        date: Date;
        time: string;
        userId: string;
        washerId: string | null;
        serviceId: string;
    }[]>;
    findOne(req: RequestWithUser, id: string): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            description: string | null;
            title: string;
            id: string;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        user: {
            email: string;
            id: string;
        };
        washer: {
            email: string;
            id: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        date: Date;
        time: string;
        userId: string;
        washerId: string | null;
        serviceId: string;
    }>;
    updateStatus(req: RequestWithUser, id: string, updateStatusDto: UpdateBookingStatusDto): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            description: string | null;
            title: string;
            id: string;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        user: {
            email: string;
            id: string;
        };
        washer: {
            email: string;
            id: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        date: Date;
        time: string;
        userId: string;
        washerId: string | null;
        serviceId: string;
    }>;
    cancel(req: RequestWithUser, id: string): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            description: string | null;
            title: string;
            id: string;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        user: {
            email: string;
            id: string;
        };
        washer: {
            email: string;
            id: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        date: Date;
        time: string;
        userId: string;
        washerId: string | null;
        serviceId: string;
    }>;
    findAvailableBookings(req: RequestWithUser): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            description: string | null;
            title: string;
            id: string;
            durationMin: number;
        };
        user: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            id: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        date: Date;
        time: string;
        userId: string;
        washerId: string | null;
        serviceId: string;
    }[]>;
    acceptBooking(req: RequestWithUser, id: string): Promise<{
        latitude: number;
        longitude: number;
        service: {
            price: number;
            description: string | null;
            title: string;
            id: string;
            durationMin: number;
        };
        payment: {
            amount: number;
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
        } | null;
        user: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            id: string;
        };
        washer: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            id: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        date: Date;
        time: string;
        userId: string;
        washerId: string | null;
        serviceId: string;
    }>;
    remove(req: RequestWithUser, id: string): Promise<{
        message: string;
        id: string;
    }>;
}
export {};
