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
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
        };
        id: string;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
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
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
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
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
    }[]>;
    findAvailableBookings(req: RequestWithUser): Promise<{
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
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
        };
        id: string;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
    }[]>;
    findWasherActiveBookings(req: RequestWithUser): Promise<{
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
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
        };
        id: string;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
    }[]>;
    findWasherOrderHistory(req: RequestWithUser): Promise<{
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
            paymentDate: Date | null;
        } | null;
        user: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
        };
        id: string;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
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
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
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
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
    }>;
    cancel(req: RequestWithUser, id: string): Promise<{
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
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
    }>;
    acceptBooking(req: RequestWithUser, id: string): Promise<{
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
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
        };
        washer: {
            id: string;
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
        } | null;
        id: string;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
    }>;
    remove(req: RequestWithUser, id: string): Promise<{
        message: string;
        id: string;
    }>;
}
export {};
