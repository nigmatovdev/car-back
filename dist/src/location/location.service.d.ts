import { PrismaService } from '../prisma/prisma.service';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationService {
    private prisma;
    constructor(prisma: PrismaService);
    updateWasherLocation(washerId: string, locationDto: UpdateLocationDto): Promise<{
        id: string;
        washerId: string;
        lat: number;
        lng: number;
        updatedAt: Date;
        washer: {
            email: string;
            id: string;
        };
    }>;
    getWasherLocation(washerId: string): Promise<{
        id: string;
        washerId: string;
        lat: number;
        lng: number;
        updatedAt: Date;
        washer: {
            email: string;
            id: string;
        };
    } | null>;
    getBookingsForWasher(washerId: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        userId: string;
    }[]>;
}
