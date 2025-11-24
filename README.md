# Car Wash Management System - Backend API

A comprehensive RESTful API for managing a car wash service platform built with NestJS, Prisma, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Role-based access control (CUSTOMER, WASHER, ADMIN)
  - Token refresh mechanism

- **User Management**
  - Profile management
  - Admin user management
  - Secure password handling

- **API Documentation**
  - Interactive Swagger/OpenAPI documentation
  - Comprehensive endpoint documentation

## 📋 Prerequisites

- Node.js (v20.19.5 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-back
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/carwash?schema=public"
   JWT_SECRET="your-secret-key-change-this-in-production"
   JWT_REFRESH_SECRET="your-refresh-secret-key-change-this-in-production"
   JWT_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"
   PORT=3000
   
   # Payments (Stripe) - Optional for demo mode
   DEMO_MODE=true  # Set to 'true' for demo/testing (no Stripe keys needed)
   # STRIPE_SECRET_KEY=sk_test_...  # Only needed if DEMO_MODE=false
   # STRIPE_WEBHOOK_SECRET=whsec_...  # Only needed if DEMO_MODE=false
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

### Production Mode
```bash
npm run build
npm run start:prod
```

## 📚 API Documentation

Once the server is running, access the interactive API documentation at:

**Swagger UI**: http://localhost:3000/api

The Swagger documentation provides:
- Complete API endpoint list
- Request/response schemas
- Authentication testing
- Interactive API testing

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register or login to get an access token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your-access-token>
   ```

## 📡 API Endpoints

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/refresh` | Refresh access token | Yes (Refresh Token) |
| GET | `/auth/me` | Get current user | Yes |

### User Management (`/users`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/users/me` | Get current user profile | Yes | Any |
| PATCH | `/users/me` | Update current user profile | Yes | Any |
| GET | `/users` | Get all users | Yes | ADMIN |
| GET | `/users/:id` | Get user by ID | Yes | ADMIN |

### Services Management (`/services`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| POST | `/services` | Create a new service | Yes | ADMIN |
| GET | `/services` | Get all services | No | - |
| GET | `/services/:id` | Get service by ID | No | - |
| PATCH | `/services/:id` | Update service | Yes | ADMIN |
| DELETE | `/services/:id` | Delete service (soft/hard) | Yes | ADMIN |

### Bookings Management (`/bookings`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| POST | `/bookings` | Create a new booking | Yes | Any |
| GET | `/bookings/me` | Get current user bookings | Yes | Any |
| GET | `/bookings` | Get all bookings | Yes | ADMIN |
| GET | `/bookings/:id` | Get booking by ID | Yes | Owner/Washer/Admin |
| PATCH | `/bookings/:id/status` | Update booking status | Yes | WASHER/ADMIN |

### Payments (`/payments`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| POST | `/payments/intent` | Create Stripe payment intent | Yes | Any |
| POST | `/payments/demo/confirm` | Confirm demo payment (demo mode only) | Yes | Any |
| POST | `/payments/webhook` | Stripe webhook handler | No | - |
| GET | `/payments/:bookingId` | Get payment by booking ID | Yes | Owner/Admin |

**Demo Mode:** Set `DEMO_MODE=true` in `.env` to enable fake transactions for testing/demo. No Stripe keys required.

### Application

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Health check | No |

## 🧪 Testing

### Automated Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

### Manual API Testing
```bash
# Run the automated test script
node scripts/test-api.js
```

See `API_TESTING_GUIDE.md` for detailed testing instructions.

## 📁 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data transfer objects
│   ├── guards/          # Authentication guards
│   ├── strategies/      # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/               # User management module
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── prisma/              # Prisma service
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.module.ts        # Root module
└── main.ts              # Application entry point

prisma/
└── schema.prisma        # Database schema
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Input validation with class-validator
- SQL injection protection via Prisma
- Password never returned in API responses

## 🗄️ Database

The application uses PostgreSQL with Prisma ORM. The database schema includes:

- **Users**: User accounts with roles
- **Services**: Car wash services
- **Bookings**: Service bookings
- **Payments**: Payment records
- **WasherLocation**: Washer location tracking

## 🛠️ Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens | Yes |
| `JWT_EXPIRES_IN` | Access token expiration time | No (default: 15m) |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration time | No (default: 7d) |
| `DEMO_MODE` | Enable demo mode for fake transactions | No (default: false) |
| `STRIPE_SECRET_KEY` | Stripe secret API key | Yes (if DEMO_MODE=false) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes (if DEMO_MODE=false) |
| `PORT` | Server port | No (default: 3000) |

## 👥 User Roles

- **CUSTOMER**: Regular users who can book services
- **WASHER**: Service providers who can accept bookings
- **ADMIN**: Administrators with full access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For issues and questions:
- Check the API documentation at `/api`
- Review `API_TESTING_GUIDE.md` for testing examples
- Check `QUICK_START.md` for setup instructions

## 🔄 Prisma 7 Notes

This project uses Prisma 7, which requires:
- Driver adapters for database connections
- Explicit environment variable loading
- Prisma config file (`prisma.config.ts`)

See the Prisma 7 migration guide for more details.
