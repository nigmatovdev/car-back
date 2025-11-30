# Booking Assignment to Car Washer - Detailed Explanation

## Overview

When a customer creates a booking, the system **automatically assigns the closest available car washer** based on their GPS location. This happens in real-time during booking creation.

## Step-by-Step Process

### 1. Customer Creates Booking

When a customer creates a booking via `POST /bookings`, they provide:
- `serviceId`: The car wash service they want
- `latitude`: Their location latitude (e.g., 40.7128)
- `longitude`: Their location longitude (e.g., -74.0060)
- `date`: Booking date
- `time`: Booking time

**Example Request:**
```json
{
  "serviceId": "550e8400-e29b-41d4-a716-446655440000",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-12-25",
  "time": "14:30"
}
```

### 2. System Finds All Available Washers

The system queries the `WasherLocation` table to get all washers who have:
- A `WASHER` or `ADMIN` role
- Active location data (GPS coordinates) in the `WasherLocation` table

**Database Query:**
```typescript
const washerLocations = await this.prisma.washerLocation.findMany({
  include: {
    washer: {
      select: {
        id: true,
        role: true,
      },
    },
  },
});
```

**Important:** Only washers with location data are considered. If a washer hasn't shared their location yet, they won't be assigned.

### 3. Calculate Distance to Each Washer

For each washer with location data, the system calculates the distance from the booking location using the **Haversine Formula**.

#### Haversine Formula Explained

The Haversine formula calculates the **great-circle distance** between two points on a sphere (Earth) using their latitudes and longitudes.

**Formula Steps:**
1. Convert latitude/longitude differences to radians
2. Calculate the distance using spherical trigonometry
3. Return distance in kilometers

**Code Implementation:**
```typescript
private calculateDistance(
  lat1: number,  // Customer latitude
  lon1: number,  // Customer longitude
  lat2: number,  // Washer latitude
  lon2: number,  // Washer longitude
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = this.toRad(lat2 - lat1);
  const dLon = this.toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) *
      Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}
```

**Example Calculation:**
- Customer location: `40.7128, -74.0060` (New York)
- Washer 1 location: `40.7580, -73.9855` (Distance: ~5.2 km)
- Washer 2 location: `40.6892, -74.0445` (Distance: ~8.1 km)
- **Result:** Washer 1 is closer (5.2 km < 8.1 km)

### 4. Select Closest Washer

The system compares all calculated distances and selects the washer with the **minimum distance**.

**Code Logic:**
```typescript
let closestWasherId: string | null = null;
let minDistance = Infinity;

for (const location of washerLocations) {
  const distance = this.calculateDistance(
    latitude,      // Customer location
    longitude,
    location.latitude.toNumber(),   // Washer location
    location.longitude.toNumber(),
  );

  if (distance < minDistance) {
    minDistance = distance;
    closestWasherId = location.washerId;
  }
}
```

### 5. Create Booking with Assignment

The booking is created with:
- **If washer found:** `washerId` is set, status = `ASSIGNED`
- **If no washer found:** `washerId` is `null`, status = `PENDING`

**Code:**
```typescript
const booking = await this.prisma.booking.create({
  data: {
    userId,
    serviceId: createBookingDto.serviceId,
    washerId: closestWasherId, // Auto-assigned closest washer
    latitude: new Prisma.Decimal(createBookingDto.latitude),
    longitude: new Prisma.Decimal(createBookingDto.longitude),
    date: new Date(createBookingDto.date),
    time: createBookingDto.time,
    status: closestWasherId 
      ? BookingStatus.ASSIGNED   // Washer found → ASSIGNED
      : BookingStatus.PENDING,    // No washer → PENDING
  },
});
```

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Customer Creates Booking                                    │
│  POST /bookings                                              │
│  { latitude, longitude, serviceId, date, time }            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  System Queries WasherLocation Table                        │
│  - Gets all washers with GPS coordinates                   │
│  - Includes washer role validation                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Calculate Distance to Each Washer                         │
│  Using Haversine Formula                                    │
│  - Customer: (lat1, lon1)                                   │
│  - Washer 1: (lat2, lon2) → Distance: 5.2 km               │
│  - Washer 2: (lat3, lon3) → Distance: 8.1 km               │
│  - Washer 3: (lat4, lon4) → Distance: 12.5 km              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Select Closest Washer                                      │
│  - Compare all distances                                    │
│  - Find minimum distance                                    │
│  - Result: Washer 1 (5.2 km)                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Create Booking                                             │
│  - washerId: "washer-1-id"                                  │
│  - status: "ASSIGNED"                                       │
│  - Payment record created                                   │
└─────────────────────────────────────────────────────────────┘
```

## Scenarios

### Scenario 1: Washer Found ✅

**Input:**
- Customer location: `40.7128, -74.0060`
- Available washers: 3 washers with locations

**Process:**
1. Calculate distances: 5.2 km, 8.1 km, 12.5 km
2. Select closest: Washer at 5.2 km
3. Create booking with `washerId` and status `ASSIGNED`

**Result:**
```json
{
  "id": "booking-id",
  "washerId": "washer-1-id",
  "status": "ASSIGNED",
  ...
}
```

### Scenario 2: No Washer Available ❌

**Input:**
- Customer location: `40.7128, -74.0060`
- Available washers: 0 (no washers have shared location)

**Process:**
1. Query returns empty array
2. No distance calculation
3. Create booking with `washerId = null` and status `PENDING`

**Result:**
```json
{
  "id": "booking-id",
  "washerId": null,
  "status": "PENDING",
  ...
}
```

**Note:** Admin can manually assign a washer later, or the booking will remain PENDING until a washer shares their location.

## Important Points

### 1. **Real-Time Location Required**
- Washers must have active location data in `WasherLocation` table
- Location is updated via WebSocket when washer shares GPS coordinates
- Only washers with recent location data are considered

### 2. **Distance Calculation**
- Uses Haversine formula (accurate for short to medium distances)
- Returns distance in kilometers
- Accounts for Earth's curvature

### 3. **Automatic Assignment**
- Happens **immediately** during booking creation
- No manual intervention required
- Fast and efficient (calculates all distances in milliseconds)

### 4. **Status Determination**
- `ASSIGNED`: Washer found and assigned
- `PENDING`: No washer available (needs manual assignment)

### 5. **No Availability Check**
- Currently, the system doesn't check if washer is:
  - Currently busy with another booking
  - Available at the requested time
  - Online/offline status
  
**Future Enhancement:** Could add availability checking based on:
- Current bookings
- Washer's schedule
- Online status

## Database Schema

### WasherLocation Table
```prisma
model WasherLocation {
  id        String   @id @default(uuid())
  washerId  String   @unique
  latitude  Decimal  @db.Decimal(10, 8)
  longitude Decimal  @db.Decimal(11, 8)
  updatedAt DateTime @updatedAt

  washer User @relation(fields: [washerId], references: [id], onDelete: Cascade)
}
```

### Booking Table
```prisma
model Booking {
  id         String        @id @default(uuid())
  userId     String
  serviceId  String
  washerId   String?       // Nullable - assigned automatically
  latitude   Decimal       @db.Decimal(10, 8)
  longitude  Decimal       @db.Decimal(11, 8)
  date       DateTime
  time       String
  status     BookingStatus @default(PENDING)  // ASSIGNED or PENDING
  ...
}
```

## Code Location

The assignment logic is in:
- **Service:** `src/bookings/bookings.service.ts`
  - `create()` method (lines 95-172)
  - `findClosestWasher()` method (lines 36-75)
  - `calculateDistance()` method (lines 12-29)

## Testing the Assignment

### Test Case 1: Washer Available
```bash
# 1. Create a washer with location
POST /auth/register
{
  "email": "washer@example.com",
  "password": "password123",
  "role": "WASHER"
}

# 2. Washer shares location via WebSocket
# (Location stored in WasherLocation table)

# 3. Customer creates booking
POST /bookings
{
  "serviceId": "...",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-12-25",
  "time": "14:30"
}

# Result: Booking created with washerId and status "ASSIGNED"
```

### Test Case 2: No Washer Available
```bash
# 1. No washers have shared location

# 2. Customer creates booking
POST /bookings
{
  "serviceId": "...",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "date": "2024-12-25",
  "time": "14:30"
}

# Result: Booking created with washerId = null and status "PENDING"
```

## Summary

The booking assignment process is **fully automatic** and happens in real-time:

1. ✅ Customer provides location coordinates
2. ✅ System finds all washers with GPS data
3. ✅ Calculates distance to each washer (Haversine formula)
4. ✅ Selects closest washer
5. ✅ Creates booking with assigned washer
6. ✅ Sets status to `ASSIGNED` (or `PENDING` if no washer)

This ensures customers get the **nearest available washer** automatically, improving service efficiency and customer experience.

