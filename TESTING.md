# Testing Guide

This document provides information about testing the Car Wash Management System backend.

## Test Structure

```
test/
├── unit/                    # Unit tests
│   └── location.service.spec.ts
├── integration/             # Integration tests
│   ├── booking-payment-flow.e2e-spec.ts
│   └── role-based-access.e2e-spec.ts
└── websocket/               # WebSocket tests
    └── location.e2e-spec.ts
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Unit Tests Only

```bash
npm run test -- --testPathPattern=unit
```

### Run Integration Tests

```bash
npm run test:e2e
```

### Run Specific Test File

```bash
npm test -- location.service.spec.ts
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:cov
```

## Test Categories

### 1. Unit Tests

Unit tests test individual components in isolation.

**Location Service Test** (`test/unit/location.service.spec.ts`):
- Tests location update functionality
- Tests authorization checks
- Tests error handling

**Example:**
```bash
npm test -- location.service.spec.ts
```

### 2. Integration Tests

Integration tests test the interaction between multiple components.

**Booking to Payment Flow** (`test/integration/booking-payment-flow.e2e-spec.ts`):
- Tests complete booking creation
- Tests payment intent creation
- Tests payment confirmation
- Tests payment retrieval

**Role-Based Access Control** (`test/integration/role-based-access.e2e-spec.ts`):
- Tests admin-only endpoints
- Tests washer-only endpoints
- Tests customer restrictions

**Example:**
```bash
npm run test:e2e -- booking-payment-flow.e2e-spec.ts
```

### 3. WebSocket Tests

WebSocket tests verify real-time communication.

**Location WebSocket** (`test/websocket/location.e2e-spec.ts`):
- Tests WebSocket connection with JWT
- Tests location update sending
- Tests location update receiving
- Tests authorization for location updates

**Example:**
```bash
npm run test:e2e -- location.e2e-spec.ts
```

## Test Setup

### Prerequisites

1. **Test Database**: Use a separate test database
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/carwash_test?schema=public"
   ```

2. **Environment Variables**: Create `.env.test`
   ```env
   NODE_ENV=test
   JWT_SECRET=test-secret-key
   JWT_REFRESH_SECRET=test-refresh-secret
   ```

### Test Database Setup

Before running tests, ensure:
- Test database exists
- Migrations are run
- Test data is seeded (if needed)

```bash
# Create test database
createdb carwash_test

# Run migrations
npx prisma migrate deploy
```

## Writing Tests

### Unit Test Example

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../../src/location/location.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('LocationService', () => {
  let service: LocationService;
  let prisma: PrismaService;

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
  });

  it('should update location', async () => {
    // Test implementation
  });
});
```

### Integration Test Example

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Booking API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/bookings (POST)', () => {
    return request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', 'Bearer token')
      .send({ /* data */ })
      .expect(201);
  });
});
```

### WebSocket Test Example

```typescript
import { io, Socket } from 'socket.io-client';

describe('WebSocket Connection', () => {
  it('should connect with valid token', (done) => {
    const client = io('http://localhost:3000/ws/location', {
      auth: { token: 'valid-token' },
    });

    client.on('connect', () => {
      expect(client.connected).toBe(true);
      client.disconnect();
      done();
    });
  });
});
```

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical paths covered
- **E2E Tests**: Main user flows covered

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run test:cov
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Clean up test data after tests
3. **Mocking**: Mock external services (Stripe, etc.)
4. **Naming**: Use descriptive test names
5. **Structure**: Follow AAA pattern (Arrange, Act, Assert)

## Troubleshooting

### Tests Failing

1. Check database connection
2. Verify environment variables
3. Check test data setup
4. Review error messages in logs

### WebSocket Tests Not Working

1. Ensure server is running on test port
2. Check JWT token generation
3. Verify WebSocket namespace
4. Check connection timeout settings

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Supertest Documentation](https://github.com/visionmedia/supertest)

