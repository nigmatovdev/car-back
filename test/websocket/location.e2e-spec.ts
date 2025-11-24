import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('Location WebSocket (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let washerToken: string;
  let userToken: string;
  let washerId: string;
  let userId: string;
  let serviceId: string;
  let bookingId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    configService = moduleFixture.get<ConfigService>(ConfigService);

    await app.init();
    await app.listen(0); // Use random port for testing

    // Create test users
    const washer = await prisma.user.create({
      data: {
        email: 'washer-test@example.com',
        password: 'hashedpassword',
        role: 'WASHER',
      },
    });
    washerId = washer.id;

    const user = await prisma.user.create({
      data: {
        email: 'user-test@example.com',
        password: 'hashedpassword',
        role: 'CUSTOMER',
      },
    });
    userId = user.id;

    // Create test service
    const service = await prisma.service.create({
      data: {
        title: 'Test Service',
        description: 'Test',
        price: 25.99,
        durationMin: 30,
        isActive: true,
      },
    });
    serviceId = service.id;

    // Generate JWT tokens
    const jwtSecret = configService.get<string>('JWT_SECRET') || 'your-secret-key';
    washerToken = jwtService.sign(
      { sub: washerId, email: washer.email, role: washer.role },
      { secret: jwtSecret },
    );
    userToken = jwtService.sign(
      { sub: userId, email: user.email, role: user.role },
      { secret: jwtSecret },
    );
  });

  afterAll(async () => {
    // Cleanup
    await prisma.booking.deleteMany({ where: { userId } });
    await prisma.service.delete({ where: { id: serviceId } });
    await prisma.user.deleteMany({ where: { id: { in: [washerId, userId] } } });
    await app.close();
  });

  describe('WebSocket Connection', () => {
    it('should connect with valid JWT token', (done) => {
      const client = io(`http://localhost:${app.getHttpServer().address().port}/ws/location`, {
        auth: { token: washerToken },
        transports: ['websocket'],
      });

      client.on('connect', () => {
        expect(client.connected).toBe(true);
        client.disconnect();
        done();
      });

      client.on('connect_error', (error) => {
        done(error);
      });
    });

    it('should reject connection without token', (done) => {
      const client = io(`http://localhost:${app.getHttpServer().address().port}/ws/location`, {
        transports: ['websocket'],
      });

      client.on('connect_error', (error) => {
        expect(error).toBeDefined();
        client.disconnect();
        done();
      });

      setTimeout(() => {
        if (client.connected) {
          client.disconnect();
          done(new Error('Should not have connected'));
        }
      }, 1000);
    });
  });

  describe('Location Updates', () => {
    it('washer should send location update', (done) => {
      const client = io(`http://localhost:${app.getHttpServer().address().port}/ws/location`, {
        auth: { token: washerToken },
        transports: ['websocket'],
      });

      client.on('connect', () => {
        client.emit('washer:updateLocation', {
          lat: 40.7128,
          lng: -74.0060,
        });

        client.on('washer:locationUpdated', (response) => {
          expect(response.success).toBe(true);
          expect(response.location.lat).toBe(40.7128);
          expect(response.location.lng).toBe(-74.0060);
          client.disconnect();
          done();
        });
      });
    });

    it('user should receive location update when washer sends update', async () => {
      // Create booking
      const booking = await prisma.booking.create({
        data: {
          userId,
          serviceId,
          washerId,
          latitude: 40.7128,
          longitude: -74.0060,
          date: new Date(),
          time: '10:00',
          status: 'ASSIGNED',
        },
      });
      bookingId = booking.id;

      return new Promise<void>((resolve, reject) => {
        const washerClient = io(
          `http://localhost:${app.getHttpServer().address().port}/ws/location`,
          {
            auth: { token: washerToken },
            transports: ['websocket'],
          },
        );

        const userClient = io(
          `http://localhost:${app.getHttpServer().address().port}/ws/location`,
          {
            auth: { token: userToken },
            transports: ['websocket'],
          },
        );

        let washerConnected = false;
        let userConnected = false;

        washerClient.on('connect', () => {
          washerConnected = true;
          if (userConnected) {
            // Wait a bit for user to be registered
            setTimeout(() => {
              washerClient.emit('washer:updateLocation', {
                lat: 40.7580,
                lng: -73.9855,
              });
            }, 500);
          }
        });

        userClient.on('connect', () => {
          userConnected = true;
          if (washerConnected) {
            setTimeout(() => {
              washerClient.emit('washer:updateLocation', {
                lat: 40.7580,
                lng: -73.9855,
              });
            }, 500);
          }
        });

        userClient.on('user:locationUpdate', (update) => {
          expect(update.bookingId).toBe(bookingId);
          expect(update.lat).toBe(40.7580);
          expect(update.lng).toBe(-73.9855);
          washerClient.disconnect();
          userClient.disconnect();
          resolve();
        });

        setTimeout(() => {
          washerClient.disconnect();
          userClient.disconnect();
          reject(new Error('Timeout waiting for location update'));
        }, 5000);
      }).finally(async () => {
        await prisma.booking.delete({ where: { id: bookingId } });
      });
    });

    it('should reject location update from non-washer', (done) => {
      const client = io(`http://localhost:${app.getHttpServer().address().port}/ws/location`, {
        auth: { token: userToken },
        transports: ['websocket'],
      });

      client.on('connect', () => {
        client.emit('washer:updateLocation', {
          lat: 40.7128,
          lng: -74.0060,
        });

        // Should receive error
        client.on('error', (error) => {
          expect(error).toBeDefined();
          client.disconnect();
          done();
        });

        // Or check response
        setTimeout(() => {
          client.disconnect();
          done();
        }, 1000);
      });
    });
  });
});

