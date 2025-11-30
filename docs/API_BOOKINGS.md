# Bookings API Documentation

## Overview

The Bookings API manages car wash service bookings. It includes automatic washer assignment based on proximity, status flow management, and role-based access control. Bookings automatically create payment records with prices from the selected service.

## Base URL

```
http://localhost:3000/bookings
```

## Authentication

All endpoints require JWT authentication. Include the access token:
```
Authorization: Bearer <access-token>
```

## Booking Status Flow

Bookings follow a strict status flow:

```
PENDING → ASSIGNED → EN_ROUTE → ARRIVED → IN_PROGRESS → COMPLETED
   ↓         ↓          ↓          ↓            ↓
CANCELLED  CANCELLED  CANCELLED  CANCELLED  CANCELLED
```

**Status Transitions:**
- `PENDING` → `ASSIGNED` or `CANCELLED`
- `ASSIGNED` → `EN_ROUTE` or `CANCELLED`
- `EN_ROUTE` → `ARRIVED` or `CANCELLED`
- `ARRIVED` → `IN_PROGRESS` or `CANCELLED`
- `IN_PROGRESS` → `COMPLETED` or `CANCELLED`
- `COMPLETED` / `CANCELLED` are terminal states (no further transitions)

## Automatic Washer Assignment

When a booking is created:
1. System finds all available washers with location data
2. Calculates distance using Haversine formula
3. Auto-assigns the closest washer
4. Sets status to `ASSIGNED` if washer found, `PENDING` if none available

## Endpoints

### 1. Create Booking

Create a new booking. Automatically assigns closest washer and creates payment record.

**Endpoint:** `POST /bookings`

**Authentication:** Required

**Role Required:** Any authenticated user

**Request Body:**
```json
{
  "serviceId": "550e8400-e29b-41d4-a716-446655440000",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-12-25",
  "time": "14:30"
}
```

**Validation Rules:**
- `serviceId` (UUID, required): Valid service ID
- `latitude` (number, required): Latitude (-90 to 90)
- `longitude` (number, required): Longitude (-180 to 180)
- `date` (date string, required): Booking date (ISO format: YYYY-MM-DD)
- `time` (string, required): Booking time (format: HH:mm)

**Response (201 Created):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "serviceId": "660e8400-e29b-41d4-a716-446655440001",
  "washerId": "880e8400-e29b-41d4-a716-446655440003",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-12-25T00:00:00.000Z",
  "time": "14:30",
  "status": "ASSIGNED",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "service": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Basic Car Wash",
    "description": "Exterior wash and dry",
    "price": 25.99,
    "durationMin": 30
  },
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  },
  "washer": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "email": "washer@example.com"
  }
}
```

**Note:** If no washer is available, `washerId` and `washer` will be `null`, and `status` will be `PENDING`.

**Error Responses:**
- `400 Bad Request`: Validation error or service not active
- `401 Unauthorized`: Invalid or expired token
- `404 Not Found`: Service not found

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user-token>" \
  -d '{
    "serviceId": "550e8400-e29b-41d4-a716-446655440000",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "date": "2024-12-25",
    "time": "14:30"
  }'
```

---

### 2. Get My Bookings

Get all bookings for the currently authenticated user.

**Endpoint:** `GET /bookings/me`

**Authentication:** Required

**Role Required:** Any authenticated user

**Response (200 OK):**
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "serviceId": "660e8400-e29b-41d4-a716-446655440001",
    "washerId": "880e8400-e29b-41d4-a716-446655440003",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "date": "2024-12-25T00:00:00.000Z",
    "time": "14:30",
    "status": "ASSIGNED",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "service": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "title": "Basic Car Wash",
      "description": "Exterior wash and dry",
      "price": 25.99,
      "durationMin": 30
    },
    "washer": {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "email": "washer@example.com"
    },
    "payment": {
      "id": "990e8400-e29b-41d4-a716-446655440004",
      "amount": 25.99,
      "status": "UNPAID"
    }
  }
]
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token

**Example (cURL):**
```bash
curl http://localhost:3000/bookings/me \
  -H "Authorization: Bearer <user-token>"
```

---

### 3. Get All Bookings (Admin Only)

Get all bookings in the system.

**Endpoint:** `GET /bookings`

**Authentication:** Required

**Role Required:** ADMIN

**Response (200 OK):**
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "serviceId": "660e8400-e29b-41d4-a716-446655440001",
    "washerId": "880e8400-e29b-41d4-a716-446655440003",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "date": "2024-12-25T00:00:00.000Z",
    "time": "14:30",
    "status": "ASSIGNED",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "service": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "title": "Basic Car Wash",
      "price": 25.99
    },
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com"
    },
    "washer": {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "email": "washer@example.com"
    },
    "payment": {
      "id": "990e8400-e29b-41d4-a716-446655440004",
      "amount": 25.99,
      "status": "UNPAID"
    }
  }
]
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Admin access required

**Example (cURL):**
```bash
curl http://localhost:3000/bookings \
  -H "Authorization: Bearer <admin-token>"
```

---

### 4. Get Booking by ID

Get detailed information about a specific booking.

**Endpoint:** `GET /bookings/:id`

**Authentication:** Required

**Access Control:**
- Users can view their own bookings
- Washers can view bookings assigned to them
- Admins can view any booking

**Path Parameters:**
- `id` (string, required): Booking UUID

**Response (200 OK):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "serviceId": "660e8400-e29b-41d4-a716-446655440001",
  "washerId": "880e8400-e29b-41d4-a716-446655440003",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-12-25T00:00:00.000Z",
  "time": "14:30",
  "status": "ASSIGNED",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "service": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Basic Car Wash",
    "description": "Exterior wash and dry",
    "price": 25.99,
    "durationMin": 30
  },
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  },
  "washer": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "email": "washer@example.com"
  },
  "payment": {
    "id": "990e8400-e29b-41d4-a716-446655440004",
    "amount": 25.99,
    "status": "UNPAID"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Access denied (not owner, assigned washer, or admin)
- `404 Not Found`: Booking not found

**Example (cURL):**
```bash
curl http://localhost:3000/bookings/770e8400-e29b-41d4-a716-446655440002 \
  -H "Authorization: Bearer <user-token>"
```

---

### 5. Update Booking Status (Washer/Admin Only)

Update the status of a booking. Only the assigned washer or admin can update status.

**Endpoint:** `PATCH /bookings/:id/status`

**Authentication:** Required

**Role Required:** WASHER or ADMIN

**Path Parameters:**
- `id` (string, required): Booking UUID

**Request Body:**
```json
{
  "status": "EN_ROUTE"
}
```

**Validation:**
- Status must follow the valid transition flow
- Only assigned washer can update (unless admin)

**Response (200 OK):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "status": "EN_ROUTE",
  "updatedAt": "2024-01-01T12:00:00.000Z",
  "service": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Basic Car Wash",
    "price": 25.99
  },
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  },
  "washer": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "email": "washer@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid status transition
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Only assigned washer can update status
- `404 Not Found`: Booking not found

**Example (cURL - Washer):**
```bash
curl -X PATCH http://localhost:3000/bookings/770e8400-e29b-41d4-a716-446655440002/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <washer-token>" \
  -d '{
    "status": "EN_ROUTE"
  }'
```

**Example Status Flow:**
```bash
# 1. Booking created (status: ASSIGNED)
# 2. Washer starts journey
PATCH /bookings/{id}/status
{ "status": "EN_ROUTE" }

# 3. Washer arrives
PATCH /bookings/{id}/status
{ "status": "ARRIVED" }

# 4. Washer starts work
PATCH /bookings/{id}/status
{ "status": "IN_PROGRESS" }

# 5. Washer completes work
PATCH /bookings/{id}/status
{ "status": "COMPLETED" }
```

---

### 6. Cancel Booking (Owner/Admin Only)

Cancel a booking. Only the booking owner or admin can cancel a booking.

**Endpoint:** `PATCH /bookings/:id/cancel`

**Authentication:** Required

**Access Control:**
- Users can cancel their own bookings
- Admins can cancel any booking

**Path Parameters:**
- `id` (string, required): Booking UUID

**Response (200 OK):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "serviceId": "660e8400-e29b-41d4-a716-446655440001",
  "washerId": "880e8400-e29b-41d4-a716-446655440003",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-12-25T00:00:00.000Z",
  "time": "14:30",
  "status": "CANCELLED",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z",
  "service": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Basic Car Wash",
    "description": "Exterior wash and dry",
    "price": 25.99,
    "durationMin": 30
  },
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  },
  "washer": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "email": "washer@example.com"
  },
  "payment": {
    "id": "990e8400-e29b-41d4-a716-446655440004",
    "amount": 25.99,
    "status": "FAILED"
  }
}
```

**Cancellation Rules:**
- Cannot cancel a booking that is already `CANCELLED`
- Cannot cancel a booking that is `COMPLETED`
- If payment was `PAID`, payment status is updated to `FAILED` (refund handled separately via Stripe)

**Error Responses:**
- `400 Bad Request`: Booking cannot be cancelled (already cancelled or completed)
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Only the booking owner can cancel this booking
- `404 Not Found`: Booking not found

**Example (cURL - Owner):**
```bash
curl -X PATCH http://localhost:3000/bookings/770e8400-e29b-41d4-a716-446655440002/cancel \
  -H "Authorization: Bearer <user-token>"
```

**Example (cURL - Admin):**
```bash
curl -X PATCH http://localhost:3000/bookings/770e8400-e29b-41d4-a716-446655440002/cancel \
  -H "Authorization: Bearer <admin-token>"
```

---

## Booking Model

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique booking identifier |
| `userId` | UUID | User who created the booking |
| `serviceId` | UUID | Service being booked |
| `washerId` | UUID (nullable) | Assigned washer (auto-assigned) |
| `latitude` | Decimal | Booking location latitude |
| `longitude` | Decimal | Booking location longitude |
| `date` | DateTime | Booking date |
| `time` | String | Booking time (HH:mm format) |
| `status` | Enum | Current booking status |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

### Relations

- **User**: The customer who created the booking
- **Service**: The car wash service being booked
- **Washer**: The assigned service provider (nullable)
- **Payment**: Associated payment record (auto-created)

## Automatic Features

### 1. Washer Assignment
- System automatically finds closest washer using Haversine distance formula
- Only washers with location data in `WasherLocation` table are considered
- If no washer available, booking status is set to `PENDING`

### 2. Payment Creation
- Payment record automatically created when booking is created
- Amount comes from the selected service price
- Payment status defaults to `UNPAID`

### 3. Status Management
- Initial status: `ASSIGNED` (if washer found) or `PENDING` (if not)
- Status transitions are validated to ensure proper flow
- Terminal states: `COMPLETED`, `CANCELLED`

## Access Control

| Endpoint | User | Washer | Admin |
|----------|------|--------|-------|
| `POST /bookings` | ✅ | ✅ | ✅ |
| `GET /bookings/me` | ✅ (own only) | ✅ (own only) | ✅ (own only) |
| `GET /bookings` | ❌ | ❌ | ✅ |
| `GET /bookings/:id` | ✅ (own only) | ✅ (assigned only) | ✅ (all) |
| `PATCH /bookings/:id/status` | ❌ | ✅ (assigned only) | ✅ (all) |
| `PATCH /bookings/:id/cancel` | ✅ (own only) | ❌ | ✅ (all) |

## Error Handling

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Request successful |
| `201 Created` | Booking created successfully |
| `400 Bad Request` | Validation error or invalid status transition |
| `401 Unauthorized` | Missing or invalid authentication token |
| `403 Forbidden` | Insufficient permissions |
| `404 Not Found` | Booking or service not found |

## Best Practices

1. **Provide Accurate Coordinates**: Ensure latitude/longitude are correct for proper washer assignment
2. **Follow Status Flow**: Always update status in the correct sequence
3. **Check Service Availability**: Verify service is active before creating booking
4. **Handle PENDING Status**: If booking is PENDING, system will need manual washer assignment
5. **Monitor Payment Status**: Track payment status separately from booking status

## Common Use Cases

### Create Booking
```bash
POST /bookings
{
  "serviceId": "...",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-12-25",
  "time": "14:30"
}
```

### Washer Updates Status
```bash
# Start journey
PATCH /bookings/{id}/status
{ "status": "EN_ROUTE" }

# Arrive at location
PATCH /bookings/{id}/status
{ "status": "ARRIVED" }

# Start work
PATCH /bookings/{id}/status
{ "status": "IN_PROGRESS" }

# Complete work
PATCH /bookings/{id}/status
{ "status": "COMPLETED" }
```

### User Views Their Bookings
```bash
GET /bookings/me
```

### User Cancels Their Booking
```bash
PATCH /bookings/{id}/cancel
```

### Admin Views All Bookings
```bash
GET /bookings
```

## Testing

Test endpoints using:
- Swagger UI: http://localhost:3000/api
- cURL commands (examples above)
- Postman/Insomnia collections

## Related APIs

- [Services API](./API_SERVICES.md) - Services used in bookings
- [Users API](./API_USERS.md) - User management
- [Authentication API](./API_AUTH.md) - For authentication

