# Services API Documentation

## Overview

The Services API manages car wash services. Services can be created, viewed, updated, and deleted. Regular users can view active services, while administrators have full CRUD access.

## Base URL

```
http://localhost:3000/services
```

## Authentication

- **Public Endpoints**: `GET /services`, `GET /services/:id` (no authentication required)
- **Admin Endpoints**: `POST /services`, `PATCH /services/:id`, `DELETE /services/:id` (require admin authentication)

For admin endpoints, include the access token:
```
Authorization: Bearer <admin-access-token>
```

## Endpoints

### 1. Create Service (Admin Only)

Create a new car wash service.

**Endpoint:** `POST /services`

**Authentication:** Required (Admin)

**Role Required:** ADMIN

**Request Body:**
```json
{
  "title": "Basic Car Wash",
  "description": "Exterior wash and dry",
  "price": 25.99,
  "durationMin": 30,
  "isActive": true
}
```

**Validation Rules:**
- `title` (string, required): Service title
- `description` (string, optional): Service description
- `price` (number, required): Service price (min: 0, max 2 decimal places)
- `durationMin` (number, optional): Duration in minutes (1-480, default: 30)
- `isActive` (boolean, optional): Whether service is active (default: true)

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Basic Car Wash",
  "description": "Exterior wash and dry",
  "price": 25.99,
  "durationMin": 30,
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Admin access required
- `409 Conflict`: Service with this title already exists

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "title": "Premium Car Wash",
    "description": "Full service with wax and interior cleaning",
    "price": 49.99,
    "durationMin": 60,
    "isActive": true
  }'
```

---

### 2. Get All Services

Get a list of all active services (or all services if admin).

**Endpoint:** `GET /services`

**Authentication:** Not required (optional query parameter for admins)

**Query Parameters:**
- `includeInactive` (boolean, optional): Include inactive services (admin only, default: false)

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Basic Car Wash",
    "description": "Exterior wash and dry",
    "price": 25.99,
    "durationMin": 30,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Premium Car Wash",
    "description": "Full service with wax",
    "price": 49.99,
    "durationMin": 60,
    "isActive": true,
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
]
```

**Example (cURL - Public):**
```bash
curl http://localhost:3000/services
```

**Example (cURL - Admin with inactive):**
```bash
curl "http://localhost:3000/services?includeInactive=true" \
  -H "Authorization: Bearer <admin-token>"
```

---

### 3. Get Service by ID

Get detailed information about a specific service.

**Endpoint:** `GET /services/:id`

**Authentication:** Not required

**Path Parameters:**
- `id` (string, required): Service UUID

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Basic Car Wash",
  "description": "Exterior wash and dry",
  "price": 25.99,
  "durationMin": 30,
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404 Not Found`: Service not found

**Example (cURL):**
```bash
curl http://localhost:3000/services/550e8400-e29b-41d4-a716-446655440000
```

---

### 4. Update Service (Admin Only)

Update an existing service.

**Endpoint:** `PATCH /services/:id`

**Authentication:** Required (Admin)

**Role Required:** ADMIN

**Path Parameters:**
- `id` (string, required): Service UUID

**Request Body (all fields optional):**
```json
{
  "title": "Updated Service Title",
  "description": "Updated description",
  "price": 29.99,
  "durationMin": 45,
  "isActive": false
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated Service Title",
  "description": "Updated description",
  "price": 29.99,
  "durationMin": 45,
  "isActive": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Admin access required
- `404 Not Found`: Service not found
- `409 Conflict`: Service with this title already exists

**Example (cURL):**
```bash
curl -X PATCH http://localhost:3000/services/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "price": 29.99,
    "isActive": false
  }'
```

---

### 5. Delete Service (Admin Only)

Delete a service (soft delete by default, hard delete optional).

**Endpoint:** `DELETE /services/:id`

**Authentication:** Required (Admin)

**Role Required:** ADMIN

**Path Parameters:**
- `id` (string, required): Service UUID

**Query Parameters:**
- `hardDelete` (boolean, optional): Permanently delete service (default: false)

**Soft Delete Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Basic Car Wash",
  "isActive": false,
  "message": "Service deactivated"
}
```

**Hard Delete Response (200 OK):**
```json
{
  "message": "Service permanently deleted"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Admin access required
- `404 Not Found`: Service not found

**Example (cURL - Soft Delete):**
```bash
curl -X DELETE http://localhost:3000/services/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer <admin-token>"
```

**Example (cURL - Hard Delete):**
```bash
curl -X DELETE "http://localhost:3000/services/550e8400-e29b-41d4-a716-446655440000?hardDelete=true" \
  -H "Authorization: Bearer <admin-token>"
```

---

## Service Model

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Auto | Unique service identifier |
| `title` | String | Yes | Service name |
| `description` | String | No | Service description |
| `price` | Decimal | Yes | Service price (2 decimal places) |
| `durationMin` | Integer | No | Duration in minutes (1-480, default: 30) |
| `isActive` | Boolean | No | Whether service is active (default: true) |
| `createdAt` | DateTime | Auto | Creation timestamp |
| `updatedAt` | DateTime | Auto | Last update timestamp |

### Delete Behavior

- **Soft Delete** (default): Sets `isActive: false`. Service remains in database but hidden from public listings.
- **Hard Delete**: Permanently removes service from database. **Warning**: This will cascade delete related bookings.

## Common Use Cases

### Create a New Service
```bash
POST /services
{
  "title": "Express Wash",
  "description": "Quick 15-minute wash",
  "price": 15.99,
  "durationMin": 15
}
```

### Update Service Price
```bash
PATCH /services/{id}
{
  "price": 27.99
}
```

### Deactivate Service (Soft Delete)
```bash
DELETE /services/{id}
```

### Reactivate Service
```bash
PATCH /services/{id}
{
  "isActive": true
}
```

## Error Handling

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Request successful |
| `201 Created` | Service created successfully |
| `400 Bad Request` | Validation error or invalid input |
| `401 Unauthorized` | Missing or invalid authentication token |
| `403 Forbidden` | Insufficient permissions (not admin) |
| `404 Not Found` | Service not found |
| `409 Conflict` | Service with this title already exists |

## Best Practices

1. **Use Soft Delete**: Prefer soft delete to maintain data integrity
2. **Validate Prices**: Ensure prices are reasonable and positive
3. **Set Duration**: Always set appropriate duration for scheduling
4. **Unique Titles**: Service titles should be unique for clarity
5. **Active Status**: Deactivate services instead of deleting when temporarily unavailable

## Testing

Test endpoints using:
- Swagger UI: http://localhost:3000/api
- cURL commands (examples above)
- Postman/Insomnia collections

## Related APIs

- [Bookings API](./API_BOOKINGS.md) - Services are used when creating bookings
- [Users API](./API_USERS.md) - Admin user management
- [Authentication API](./API_AUTH.md) - For admin authentication

