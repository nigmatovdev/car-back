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
    findMyBookings(userId: string): Promise<{
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
    findOne(id: string, userId?: string, userRole?: string): Promise<{
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
    updateStatus(id: string, userId: string, userRole: string, updateStatusDto: UpdateBookingStatusDto): Promise<{
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
    findAll(userRole: string): Promise<{
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
    cancel(id: string, userId: string, userRole: string): Promise<{
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
    findAvailableBookings(userRole: string): Promise<{
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
    acceptBooking(bookingId: string, washerId: string, userRole: string): Promise<{
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
    remove(id: string, userId: string, userRole: string): Promise<{
        message: string;
        id: string;
    }>;
}
