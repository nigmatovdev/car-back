# API Documentation Index

This directory contains detailed documentation for each API module in the Car Wash Management System.

## Available Documentation

### 1. [Authentication API](./API_AUTH.md)
Complete guide for user authentication, registration, login, and token management.

**Key Features:**
- User registration
- Login with JWT tokens
- Token refresh mechanism
- Current user information

### 2. [Users API](./API_USERS.md)
User profile management and administration endpoints.

**Key Features:**
- View and update user profiles
- Admin user management
- Role-based access control

### 3. [Services API](./API_SERVICES.md)
Car wash service management for administrators.

**Key Features:**
- Create, read, update, delete services
- Service activation/deactivation
- Public service listings

### 4. [Bookings API](./API_BOOKINGS.md)
Booking system with automatic washer assignment and status management.

**Key Features:**
- Create bookings with auto-assignment
- Status flow management
- Role-based access control
- Payment integration

### 5. [Payments API](./API_PAYMENTS.md)
Stripe payment processing integration.

**Key Features:**
- Create payment intents
- Webhook handling
- Payment status tracking
- Automatic payment record updates

## Quick Start

1. **Start the server:**
   ```bash
   npm run start:dev
   ```

2. **Access Swagger UI:**
   ```
   http://localhost:3000/api
   ```

3. **Read module-specific docs:**
   - Click on the links above for detailed documentation
   - Each document includes examples, error codes, and best practices

## API Base URLs

- **Authentication**: `http://localhost:3000/auth`
- **Users**: `http://localhost:3000/users`
- **Services**: `http://localhost:3000/services`
- **Bookings**: `http://localhost:3000/bookings`

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <access-token>
```

Get your token by:
1. Registering: `POST /auth/register`
2. Logging in: `POST /auth/login`

## Common Patterns

### Error Responses
All APIs follow consistent error response format:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Error type"
}
```

### Pagination
Currently, list endpoints return all results. Pagination may be added in future versions.

### Filtering
Some endpoints support query parameters for filtering:
- `includeInactive`: Include inactive items (admin only)
- `hardDelete`: Permanently delete (admin only)

## Testing

### Interactive Testing
- **Swagger UI**: http://localhost:3000/api
- **Postman**: Import endpoints from Swagger
- **cURL**: Examples provided in each API doc

### Automated Testing
```bash
node scripts/test-api.js
```

## Support

For issues or questions:
1. Check the specific API documentation
2. Review Swagger UI for interactive testing
3. Check the main [README.md](../README.md) for setup instructions

## Version

Current API Version: **1.0**

All endpoints are stable and ready for production use.

