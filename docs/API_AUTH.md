# Authentication API Documentation

## Overview

The Authentication API provides endpoints for user registration, login, token refresh, and user information retrieval. All authentication is handled using JWT (JSON Web Tokens) with access and refresh tokens.

## Base URL

```
http://localhost:3000/auth
```

## Authentication Flow

1. **Register** or **Login** to get access and refresh tokens
2. Use the **access token** in the `Authorization` header for protected endpoints
3. When the access token expires, use the **refresh token** to get new tokens
4. Access tokens expire in 15 minutes (configurable)
5. Refresh tokens expire in 7 days (configurable)

## Endpoints

### 1. Register User

Register a new user account.

**Endpoint:** `POST /auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "CUSTOMER"  // Optional: CUSTOMER, WASHER, or ADMIN (default: CUSTOMER)
}
```

**Validation Rules:**
- `email`: Must be a valid email address
- `password`: Minimum 6 characters
- `role`: Optional, must be one of: CUSTOMER, WASHER, ADMIN

**Response (201 Created):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `409 Conflict`: User with this email already exists
- `400 Bad Request`: Validation error

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "role": "CUSTOMER"
  }'
```

---

### 2. Login

Authenticate a user and receive access/refresh tokens.

**Endpoint:** `POST /auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "CUSTOMER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Validation error

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

### 3. Refresh Token

Get new access and refresh tokens using a valid refresh token.

**Endpoint:** `POST /auth/refresh`

**Authentication:** Required (Refresh Token in Authorization header)

**Request Headers:**
```
Authorization: Bearer <refresh-token>
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "CUSTOMER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired refresh token
- `400 Bad Request`: Validation error

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <refresh-token>" \
  -d '{
    "refreshToken": "<refresh-token>"
  }'
```

---

### 4. Get Current User

Get information about the currently authenticated user.

**Endpoint:** `GET /auth/me`

**Authentication:** Required (Access Token)

**Request Headers:**
```
Authorization: Bearer <access-token>
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "role": "CUSTOMER",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token
- `404 Not Found`: User not found

**Example (cURL):**
```bash
curl http://localhost:3000/auth/me \
  -H "Authorization: Bearer <access-token>"
```

---

## User Roles

The system supports three user roles:

- **CUSTOMER**: Regular users who can book services
- **WASHER**: Service providers who can accept and manage bookings
- **ADMIN**: Administrators with full system access

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt (10 rounds)
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: Access tokens expire in 15 minutes, refresh tokens in 7 days
- **Refresh Token Validation**: Refresh tokens are validated against database records

## Environment Variables

The following environment variables are used:

- `JWT_SECRET`: Secret key for signing access tokens
- `JWT_REFRESH_SECRET`: Secret key for signing refresh tokens
- `JWT_EXPIRES_IN`: Access token expiration time (default: "15m")
- `JWT_REFRESH_EXPIRES_IN`: Refresh token expiration time (default: "7d")

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Validation error or bad input
- `401 Unauthorized`: Authentication required or invalid credentials
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., email already exists)

## Best Practices

1. **Store tokens securely**: Never expose tokens in client-side code or logs
2. **Handle token expiration**: Implement automatic token refresh before expiration
3. **Use HTTPS**: Always use HTTPS in production to protect tokens
4. **Validate on client**: Validate email format and password strength on client before sending
5. **Error messages**: Don't reveal whether an email exists during login attempts (security best practice)

## Testing

You can test all endpoints using:
- Swagger UI: http://localhost:3000/api
- cURL commands (examples above)
- Postman/Insomnia
- Automated test script: `node scripts/test-api.js`

