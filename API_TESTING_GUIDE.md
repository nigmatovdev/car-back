# API Testing Guide

## Prerequisites

1. **Database Setup**: Make sure you have PostgreSQL running and configured
2. **Environment Variables**: Create a `.env` file with the following:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/carwash?schema=public"
   JWT_SECRET="your-secret-key-change-this-in-production"
   JWT_REFRESH_SECRET="your-refresh-secret-key-change-this-in-production"
   JWT_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"
   PORT=3000
   ```

3. **Run Database Migrations**:
   ```bash
   npx prisma migrate dev
   ```

## Running the Server

### Development Mode (with hot reload)
```bash
npm run start:dev
```

The server will start on `http://localhost:3000` (or the PORT specified in .env)

### Production Mode
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Health Check
**GET** `/`
- No authentication required
- Returns: Simple hello message

### 2. Register User
**POST** `/auth/register`
- No authentication required
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "role": "CUSTOMER"  // Optional: CUSTOMER, WASHER, or ADMIN (default: CUSTOMER)
  }
  ```
- Response:
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "CUSTOMER",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-jwt-token"
  }
  ```

### 3. Login
**POST** `/auth/login`
- No authentication required
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "CUSTOMER"
    },
    "accessToken": "jwt-token",
    "refreshToken": "refresh-jwt-token"
  }
  ```

### 4. Refresh Token
**POST** `/auth/refresh`
- Requires: Bearer token (refresh token) in Authorization header
- Request Body:
  ```json
  {
    "refreshToken": "refresh-jwt-token"
  }
  ```
- Response:
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "CUSTOMER"
    },
    "accessToken": "new-jwt-token",
    "refreshToken": "new-refresh-jwt-token"
  }
  ```

### 5. Get Current User
**GET** `/auth/me`
- Requires: Bearer token (access token) in Authorization header
- Response:
  ```json
  {
    "id": "uuid",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

## User Management Endpoints

### 6. Get Current User Profile
**GET** `/users/me`
- Requires: Bearer token (access token) in Authorization header
- Response:
  ```json
  {
    "id": "uuid",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

### 7. Update Current User Profile
**PATCH** `/users/me`
- Requires: Bearer token (access token) in Authorization header
- Request Body (all fields optional):
  ```json
  {
    "email": "newemail@example.com",
    "password": "newpassword123"
  }
  ```
- Note: Regular users cannot change their role. Only admins can change roles.
- Response:
  ```json
  {
    "id": "uuid",
    "email": "newemail@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

### 8. Get All Users (Admin Only)
**GET** `/users`
- Requires: Bearer token with ADMIN role
- Response:
  ```json
  [
    {
      "id": "uuid",
      "email": "user1@example.com",
      "role": "CUSTOMER",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "uuid",
      "email": "user2@example.com",
      "role": "WASHER",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

### 9. Get User by ID (Admin Only)
**GET** `/users/:id`
- Requires: Bearer token with ADMIN role
- Response:
  ```json
  {
    "id": "uuid",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

## Testing with cURL

### 1. Health Check
```bash
curl http://localhost:3000/
```

### 2. Register User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "role": "CUSTOMER"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `accessToken` and `refreshToken` from the response.

### 4. Get Current User (Protected Route)
```bash
# Replace YOUR_ACCESS_TOKEN with the token from login/register
curl http://localhost:3000/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 5. Refresh Token
```bash
# Replace YOUR_REFRESH_TOKEN with the refresh token from login/register
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_REFRESH_TOKEN" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### 6. Get Current User Profile
```bash
# Replace YOUR_ACCESS_TOKEN with the token from login/register
curl http://localhost:3000/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 7. Update Current User Profile
```bash
# Replace YOUR_ACCESS_TOKEN with the token from login/register
curl -X PATCH http://localhost:3000/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "email": "newemail@example.com"
  }'
```

### 8. Get All Users (Admin Only)
```bash
# Replace ADMIN_TOKEN with an admin user's access token
curl http://localhost:3000/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 9. Get User by ID (Admin Only)
```bash
# Replace ADMIN_TOKEN and USER_ID
curl http://localhost:3000/users/USER_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Testing with PowerShell (Windows)

### 1. Register User
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
    role = "CUSTOMER"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

### 2. Login
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

# Save tokens
$accessToken = $response.accessToken
$refreshToken = $response.refreshToken
```

### 3. Get Current User
```powershell
$headers = @{
    Authorization = "Bearer $accessToken"
}

Invoke-RestMethod -Uri "http://localhost:3000/auth/me" `
    -Method GET `
    -Headers $headers
```

## Testing with Postman

1. **Import Collection**: Create a new collection in Postman
2. **Set Base URL**: Create an environment variable `baseUrl` = `http://localhost:3000`
3. **Create Requests**:
   - Register: `POST {{baseUrl}}/auth/register`
   - Login: `POST {{baseUrl}}/auth/login`
   - Get Me: `GET {{baseUrl}}/auth/me` (add Bearer token in Authorization tab)
   - Refresh: `POST {{baseUrl}}/auth/refresh` (add Bearer token in Authorization tab)

## Testing with the Test Script

Run the automated test script:
```bash
node scripts/test-api.js
```

This will test all endpoints automatically.

## Common Issues

1. **Database Connection Error**: Make sure PostgreSQL is running and DATABASE_URL is correct
2. **401 Unauthorized**: Check that your token is valid and not expired
3. **400 Bad Request**: Check that request body matches the DTO requirements
4. **Port Already in Use**: Change PORT in .env or kill the process using port 3000

## User Roles

- **CUSTOMER**: Default role for regular users
- **WASHER**: For car wash service providers
- **ADMIN**: For administrators

