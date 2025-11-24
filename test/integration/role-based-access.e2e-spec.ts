import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Role-Based Access Control (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let customerToken: string;
  let washerToken: string;
  let adminToken: string;
  let customerId: string;
  let washerId: string;
  let adminId: string;
  let serviceId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();

    // Create test users
    const customer = await prisma.user.create({
      data: {
        email: 'customer-rbac@example.com',
        password: 'hashedpassword',
        role: 'CUSTOMER',
      },
    });
    customerId = customer.id;

    const washer = await prisma.user.create({
      data: {
        email: 'washer-rbac@example.com',
        password: 'hashedpassword',
        role: 'WASHER',
      },
    });
    washerId = washer.id;

    const admin = await prisma.user.create({
      data: {
        email: 'admin-rbac@example.com',
        password: 'hashedpassword',
        role: 'ADMIN',
      },
    });
    adminId = admin.id;

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

    // Generate tokens (simplified - use actual JWT generation)
    customerToken = 'customer-token';
    washerToken = 'washer-token';
    adminToken = 'admin-token';
  });

  afterAll(async () => {
    await prisma.service.delete({ where: { id: serviceId } });
    await prisma.user.deleteMany({
      where: { id: { in: [customerId, washerId, adminId] } },
    });
    await app.close();
  });

  describe('Service Endpoints', () => {
    it('should allow admin to create service', async () => {
      const response = await request(app.getHttpServer())
        .post('/services')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'New Service',
          description: 'Test',
          price: 30.99,
          durationMin: 45,
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
    });

    it('should deny customer from creating service', async () => {
      await request(app.getHttpServer())
        .post('/services')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          title: 'New Service',
          description: 'Test',
          price: 30.99,
          durationMin: 45,
        })
        .expect(403);
    });

    it('should allow all users to view services', async () => {
      await request(app.getHttpServer())
        .get('/services')
        .set('Authorization', `Bearer ${customerToken}`)
        .expect(200);
    });
  });

  describe('User Endpoints', () => {
    it('should allow admin to view all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should deny customer from viewing all users', async () => {
      await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${customerToken}`)
        .expect(403);
    });
  });

  describe('Booking Status Updates', () => {
    let bookingId: string;

    beforeAll(async () => {
      const booking = await prisma.booking.create({
        data: {
          userId: customerId,
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
    });

    it('should allow washer to update booking status', async () => {
      await request(app.getHttpServer())
        .patch(`/bookings/${bookingId}/status`)
        .set('Authorization', `Bearer ${washerToken}`)
        .send({
          status: 'EN_ROUTE',
        })
        .expect(200);
    });

    it('should deny customer from updating booking status', async () => {
      await request(app.getHttpServer())
        .patch(`/bookings/${bookingId}/status`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          status: 'COMPLETED',
        })
        .expect(403);
    });
  });
});

