import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { winstonConfig } from './common/logger/winston.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    rawBody: true, // Enable raw body for Stripe webhooks
    logger: WinstonModule.createLogger(winstonConfig),
  });

  // Security middleware - configured for HTTP support and Swagger UI
  // Disable CSP for Swagger UI to work properly
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disable CSP to allow Swagger UI assets
      crossOriginOpenerPolicy: false, // Disable for HTTP (requires HTTPS)
      crossOriginEmbedderPolicy: false, // Disable for HTTP (requires HTTPS)
    }),
  );

  // CORS configuration
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger/OpenAPI documentation setup
  const config = new DocumentBuilder()
    .setTitle('Car Wash API')
    .setDescription('RESTful API for Car Wash Management System')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('services', 'Service management endpoints')
    .addTag('bookings', 'Booking management endpoints')
    .addTag('payments', 'Payment processing endpoints')
    .addTag('app', 'Application health check')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  const demoMode = process.env.DEMO_MODE === 'true';
  const nodeEnv = process.env.NODE_ENV || 'development';

  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api`);
  logger.log(`🌍 Environment: ${nodeEnv}`);
  if (demoMode) {
    logger.warn(`⚠️  DEMO MODE ENABLED - Payments will be simulated`);
  }
  logger.log(`🔒 Rate limiting: 100 requests per minute`);
  logger.log(`📝 Logs: Check logs/ directory for application logs`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start application', error);
  process.exit(1);
});
