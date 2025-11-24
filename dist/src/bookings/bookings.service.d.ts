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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        washerId: string | null;
        date: Date;
        time: string;
        status: import(".prisma/client").$Enums.BookingStatus;
    }[]>;
}
