import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    private calculateDistance;
    private toRad;
    private findClosestWasher;
    private validateStatusTransition;
    create(userId: string, createBookingDto: CreateBookingDto): Promise<{
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
    findMyBookings(userId: string): Promise<{
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
    findOne(id: string, userId?: string, userRole?: string): Promise<{
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
    updateStatus(id: string, userId: string, userRole: string, updateStatusDto: UpdateBookingStatusDto): Promise<{
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
    findAll(userRole: string): Promise<{
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
    cancel(id: string, userId: string, userRole: string): Promise<{
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
    findAvailableBookings(userRole: string): Promise<{
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
    acceptBooking(bookingId: string, washerId: string, userRole: string): Promise<{
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
    findWasherActiveBookings(washerId: string, userRole: string): Promise<{
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
    findWasherOrderHistory(washerId: string, userRole: string): Promise<{
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
    remove(id: string, userId: string, userRole: string): Promise<{
        message: string;
        id: string;
    }>;
}
