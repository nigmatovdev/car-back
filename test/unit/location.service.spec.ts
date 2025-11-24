import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../../src/location/location.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('LocationService', () => {
  let service: LocationService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    washerLocation: {
      upsert: jest.fn(),
      findUnique: jest.fn(),
    },
    booking: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateWasherLocation', () => {
    const washerId = 'washer-123';
    const locationDto = { lat: 40.7128, lng: -74.0060 };

    it('should update location for valid washer', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: washerId,
        role: 'WASHER',
      });

      mockPrismaService.washerLocation.upsert.mockResolvedValue({
        id: 'location-123',
        washerId,
        latitude: { toNumber: () => 40.7128 },
        longitude: { toNumber: () => -74.0060 },
        updatedAt: new Date(),
        washer: { id: washerId, email: 'washer@example.com' },
      });

      const result = await service.updateWasherLocation(washerId, locationDto);

      expect(result.lat).toBe(40.7128);
      expect(result.lng).toBe(-74.0060);
      expect(mockPrismaService.washerLocation.upsert).toHaveBeenCalled();
    });

    it('should throw NotFoundException if washer not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.updateWasherLocation(washerId, locationDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not a washer', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: washerId,
        role: 'CUSTOMER',
      });

      await expect(
        service.updateWasherLocation(washerId, locationDto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getWasherLocation', () => {
    const washerId = 'washer-123';

    it('should return location if exists', async () => {
      mockPrismaService.washerLocation.findUnique.mockResolvedValue({
        id: 'location-123',
        washerId,
        latitude: { toNumber: () => 40.7128 },
        longitude: { toNumber: () => -74.0060 },
        updatedAt: new Date(),
        washer: { id: washerId, email: 'washer@example.com' },
      });

      const result = await service.getWasherLocation(washerId);

      expect(result).toBeDefined();
      expect(result.lat).toBe(40.7128);
    });

    it('should return null if location not found', async () => {
      mockPrismaService.washerLocation.findUnique.mockResolvedValue(null);

      const result = await service.getWasherLocation(washerId);

      expect(result).toBeNull();
    });
  });

  describe('getBookingsForWasher', () => {
    const washerId = 'washer-123';

    it('should return active bookings', async () => {
      const mockBookings = [
        { id: 'booking-1', userId: 'user-1', status: 'ASSIGNED' },
        { id: 'booking-2', userId: 'user-2', status: 'EN_ROUTE' },
      ];

      mockPrismaService.booking.findMany.mockResolvedValue(mockBookings);

      const result = await service.getBookingsForWasher(washerId);

      expect(result).toHaveLength(2);
      expect(mockPrismaService.booking.findMany).toHaveBeenCalledWith({
        where: {
          washerId,
          status: {
            in: ['ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'],
          },
        },
        select: {
          id: true,
          userId: true,
          status: true,
        },
      });
    });
  });
});

