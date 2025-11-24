# Users API Documentation

## Overview

The Users API provides endpoints for user profile management. Users can view and update their own profiles, while administrators have access to view and manage all users in the system.

## Base URL

```
http://localhost:3000/users
```

## Authentication

All endpoints require JWT authentication. Include the access token in the Authorization header:

```
Authorization: Bearer <access-token>
```

## Endpoints

### 1. Get Current User Profile

Get the profile of the currently authenticated user.

**Endpoint:** `GET /users/me`

**Authentication:** Required

**Role Required:** Any authenticated user

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
curl http://localhost:3000/users/me \
  -H "Authorization: Bearer <access-token>"
```

**Example (JavaScript):**
```javascript
const response = await fetch('http://localhost:3000/users/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
const user = await response.json();
```

---

### 2. Update Current User Profile

Update the profile of the currently authenticated user.

**Endpoint:** `PATCH /users/me`

**Authentication:** Required

**Role Required:** Any authenticated user (cannot change role unless admin)

**Request Body (all fields optional):**
```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Validation Rules:**
- `email`: Must be a valid email address (if provided)
- `password`: Minimum 6 characters (if provided)
- `role`: Only admins can change roles (ignored for regular users)

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "newemail@example.com",
  "role": "CUSTOMER",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Email already in use
- `404 Not Found`: User not found

**Example (cURL):**
```bash
curl -X PATCH http://localhost:3000/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -d '{
    "email": "newemail@example.com"
  }'
```

**Example (Update Password):**
```bash
curl -X PATCH http://localhost:3000/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -d '{
    "password": "newsecurepassword123"
  }'
```

---

### 3. Get All Users (Admin Only)

Get a list of all users in the system.

**Endpoint:** `GET /users`

**Authentication:** Required

**Role Required:** ADMIN

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user1@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "email": "washer@example.com",
    "role": "WASHER",
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Admin access required

**Example (cURL):**
```bash
curl http://localhost:3000/users \
  -H "Authorization: Bearer <admin-access-token>"
```

---

### 4. Get User by ID (Admin Only)

Get detailed information about a specific user by their ID.

**Endpoint:** `GET /users/:id`

**Authentication:** Required

**Role Required:** ADMIN

**Path Parameters:**
- `id` (string, required): User UUID

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
- `403 Forbidden`: Admin access required
- `404 Not Found`: User not found

**Example (cURL):**
```bash
curl http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer <admin-access-token>"
```

---

## Security Features

### Password Security
- Passwords are **never** returned in API responses
- Passwords are hashed using bcrypt before storage
- Minimum password length: 6 characters
- Password updates require re-authentication (via token)

### Data Sanitization
All responses exclude sensitive information:
- `password`: Never included
- `refreshToken`: Never included

### Role-Based Access Control
- **Regular Users**: Can only view/update their own profile
- **Admins**: Can view all users and change user roles

## User Roles

- **CUSTOMER**: Default role for regular users
- **WASHER**: Service providers
- **ADMIN**: System administrators

## Common Use Cases

### Update Email Address
```bash
PATCH /users/me
{
  "email": "newemail@example.com"
}
```

### Change Password
```bash
PATCH /users/me
{
  "password": "newsecurepassword123"
}
```

### Admin: View All Users
```bash
GET /users
Authorization: Bearer <admin-token>
```

### Admin: View Specific User
```bash
GET /users/{userId}
Authorization: Bearer <admin-token>
```

## Error Handling

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Request successful |
| `400 Bad Request` | Validation error or invalid input |
| `401 Unauthorized` | Missing or invalid authentication token |
| `403 Forbidden` | Insufficient permissions (e.g., not admin) |
| `404 Not Found` | User not found |

## Best Practices

1. **Always validate email uniqueness**: The system checks for duplicate emails
2. **Use strong passwords**: Encourage users to use strong passwords
3. **Handle errors gracefully**: Check response status codes
4. **Store tokens securely**: Never expose tokens in client-side code
5. **Update profile incrementally**: Only send fields that need updating

## Testing

Test endpoints using:
- Swagger UI: http://localhost:3000/api
- cURL commands (examples above)
- Postman/Insomnia collections
- Automated test scripts

## Related APIs

- [Authentication API](./API_AUTH.md) - For login and token management
- [Bookings API](./API_BOOKINGS.md) - User bookings
- [Services API](./API_SERVICES.md) - Available services

