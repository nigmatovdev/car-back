# Quick Start Guide

## 1. Setup Environment

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/carwash?schema=public"
JWT_SECRET="your-secret-key-change-this-in-production"
JWT_REFRESH_SECRET="your-refresh-secret-key-change-this-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=3000
```

**Important**: Replace the database credentials with your actual PostgreSQL credentials.

## 2. Install Dependencies

```bash
npm install
```

## 3. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database if you have seed data
# npx prisma db seed
```

## 4. Start the Server

### Development Mode (Recommended)
```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

### Production Mode
```bash
npm run build
npm run start:prod
```

## 5. Test the API

### Option 1: Automated Test Script
```bash
node scripts/test-api.js
```

### Option 2: Manual Testing with cURL

**Health Check:**
```bash
curl http://localhost:3000/
```

**Register a User:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Option 3: Use Postman or Insomnia

Import the endpoints from `API_TESTING_GUIDE.md`

## Available Endpoints

- `GET /` - Health check
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (requires Bearer token)
- `POST /auth/refresh` - Refresh access token (requires Bearer token)

## Troubleshooting

### Port Already in Use
Change the `PORT` in `.env` or kill the process:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### Database Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env` is correct
- Ensure database exists: `createdb carwash`

### Prisma Client Errors
```bash
npx prisma generate
npm run build
```

## Next Steps

- Read `API_TESTING_GUIDE.md` for detailed API documentation
- Check `src/` directory for available modules
- Add more endpoints as needed

