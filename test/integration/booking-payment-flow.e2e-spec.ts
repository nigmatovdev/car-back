import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Booking to Payment Flow (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let customerToken: string;
  let customerId: string;
  let serviceId: string;
  let bookingId: string;
  let paymentId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();

    // Create test customer
    const customer = await prisma.user.create({
      data: {
        email: 'customer-flow@example.com',
        password: 'hashedpassword',
        role: 'CUSTOMER',
      },
    });
    customerId = customer.id;

    // Create test service
    const service = await prisma.service.create({
      data: {
        title: 'Premium Wash',
        description: 'Full service wash',
        price: 49.99,
        durationMin: 60,
        isActive: true,
      },
    });
    serviceId = service.id;

    // Login to get token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'customer-flow@example.com',
        password: 'password123', // You'll need to hash this properly
      });

    // For testing, we'll create a token manually or use a test auth service
    // This is a simplified version - adjust based on your auth setup
    customerToken = 'test-token'; // Replace with actual token generation
  });

  afterAll(async () => {
    // Cleanup
    await prisma.payment.deleteMany({ where: { userId: customerId } });
    await prisma.booking.deleteMany({ where: { userId: customerId } });
    await prisma.service.delete({ where: { id: serviceId } });
    await prisma.user.delete({ where: { id: customerId } });
    await app.close();
  });

  describe('Complete Booking to Payment Flow', () => {
    it('should create a booking', async () => {
      const response = await request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          serviceId,
          latitude: 40.7128,
          longitude: -74.0060,
          date: new Date().toISOString(),
          time: '14:00',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('payment');
      bookingId = response.body.id;
      paymentId = response.body.payment.id;
    });

    it('should create payment intent', async () => {
      const response = await request(app.getHttpServer())
        .post('/payments/intent')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          bookingId,
        })
        .expect(201);

      expect(response.body).toHaveProperty('clientSecret');
      expect(response.body).toHaveProperty('paymentIntentId');
    });

    it('should confirm demo payment', async () => {
      const response = await request(app.getHttpServer())
        .post('/payments/demo/confirm')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          bookingId,
        })
        .expect(200);

      expect(response.body.payment.status).toBe('PAID');
    });

    it('should retrieve payment details', async () => {
      const response = await request(app.getHttpServer())
        .get(`/payments/${bookingId}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .expect(200);

      expect(response.body.status).toBe('PAID');
      expect(response.body.bookingId).toBe(bookingId);
    });
  });
});

