# Location Tracking API (WebSocket)

## Overview

The Location Tracking API uses WebSockets to provide real-time GPS tracking of washers. Washers can send their location updates, and users with active bookings receive real-time location updates.

## WebSocket Connection

### Connection URL

```
ws://localhost:3000/ws/location
```

### Authentication

All WebSocket connections require JWT authentication. The token can be provided in two ways:

1. **Authorization Header (Recommended):**
   ```
   Authorization: Bearer <your-jwt-token>
   ```

2. **Query Parameter:**
   ```
   ws://localhost:3000/ws/location?token=<your-jwt-token>
   ```

3. **Auth Object (Socket.IO):**
   ```javascript
   socket.auth = { token: '<your-jwt-token>' }
   ```

### Connection Events

#### On Connect

When a client successfully connects:
- **Washers/Admins**: Receive `location:current` event with their current location (if exists)
- **All Users**: Connection is tracked for receiving location updates

#### On Disconnect

Connection is automatically cleaned up when client disconnects.

## Events

### Client → Server Events

#### `washer:updateLocation`

Send GPS location update (Washers/Admins only).

**Payload:**
```json
{
  "lat": 40.7128,
  "lng": -74.0060
}
```

**Validation:**
- `lat`: Number, required, between -90 and 90
- `lng`: Number, required, between -180 and 180

**Response:**
```json
{
  "success": true,
  "location": {
    "id": "uuid",
    "washerId": "uuid",
    "lat": 40.7128,
    "lng": -74.0060,
    "updatedAt": "2024-01-01T12:00:00.000Z",
    "washer": {
      "id": "uuid",
      "email": "washer@example.com"
    }
  }
}
```

**Error Response:**
```json
{
  "error": "Only washers can update location"
}
```

**What Happens:**
1. Location is saved/updated in `WasherLocation` table
2. System finds all active bookings for this washer (status: ASSIGNED, EN_ROUTE, ARRIVED, IN_PROGRESS)
3. Location update is emitted to all users who have active bookings with this washer
4. Washer receives confirmation

---

### Server → Client Events

#### `location:current`

Sent to washer/admin on connection if they have a saved location.

**Payload:**
```json
{
  "id": "uuid",
  "washerId": "uuid",
  "lat": 40.7128,
  "lng": -74.0060,
  "updatedAt": "2024-01-01T12:00:00.000Z",
  "washer": {
    "id": "uuid",
    "email": "washer@example.com"
  }
}
```

---

#### `washer:locationUpdated`

Confirmation sent to washer after successful location update.

**Payload:**
```json
{
  "success": true,
  "location": {
    "id": "uuid",
    "washerId": "uuid",
    "lat": 40.7128,
    "lng": -74.0060,
    "updatedAt": "2024-01-01T12:00:00.000Z",
    "washer": {
      "id": "uuid",
      "email": "washer@example.com"
    }
  }
}
```

---

#### `user:locationUpdate`

Real-time location update sent to users who have active bookings with the washer.

**Payload:**
```json
{
  "bookingId": "uuid",
  "washerId": "uuid",
  "washer": {
    "id": "uuid",
    "email": "washer@example.com"
  },
  "lat": 40.7128,
  "lng": -74.0060,
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

**When Received:**
- User has an active booking (status: ASSIGNED, EN_ROUTE, ARRIVED, IN_PROGRESS)
- Booking is assigned to the washer who sent the location update
- User is connected to the WebSocket

---

## Client Implementation Examples

### JavaScript/TypeScript (Socket.IO Client)

#### Washer App (Sending Location Updates)

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/ws/location', {
  auth: {
    token: 'your-jwt-token-here'
  },
  transports: ['websocket']
});

// Listen for connection
socket.on('connect', () => {
  console.log('Connected to location service');
  
  // Listen for current location
  socket.on('location:current', (location) => {
    console.log('Current location:', location);
  });
  
  // Listen for update confirmation
  socket.on('washer:locationUpdated', (response) => {
    console.log('Location updated:', response);
  });
});

// Send location update
function sendLocation(lat, lng) {
  socket.emit('washer:updateLocation', {
    lat: lat,
    lng: lng
  });
}

// Example: Send location every 5 seconds
setInterval(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      sendLocation(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }
}, 5000);
```

#### User App (Receiving Location Updates)

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/ws/location', {
  auth: {
    token: 'your-jwt-token-here'
  },
  transports: ['websocket']
});

// Listen for connection
socket.on('connect', () => {
  console.log('Connected to location service');
});

// Listen for washer location updates
socket.on('user:locationUpdate', (update) => {
  console.log('Washer location update:', update);
  
  // Update map marker
  updateMapMarker(update.bookingId, {
    lat: update.lat,
    lng: update.lng,
    washer: update.washer
  });
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from location service');
});
```

### React Hook Example

```typescript
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface LocationUpdate {
  bookingId: string;
  washerId: string;
  lat: number;
  lng: number;
  updatedAt: string;
}

export function useLocationTracking(token: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [location, setLocation] = useState<LocationUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3000/ws/location', {
      auth: { token },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('user:locationUpdate', (update: LocationUpdate) => {
      setLocation(update);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token]);

  return { socket, location, isConnected };
}
```

---

## Data Model

### WasherLocation

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique location record ID |
| `washerId` | UUID | Washer user ID (unique) |
| `latitude` | Decimal(10,8) | GPS latitude |
| `longitude` | Decimal(11,8) | GPS longitude |
| `updatedAt` | DateTime | Last update timestamp |

**Relations:**
- `washer`: User (one-to-one)

---

## Flow Diagram

```
┌─────────┐                    ┌──────────┐                    ┌─────────┐
│ Washer  │                    │  Server  │                    │  User   │
└────┬────┘                    └────┬─────┘                    └────┬────┘
     │                               │                               │
     │ 1. Connect (JWT)              │                               │
     ├──────────────────────────────>│                               │
     │                               │                               │
     │ 2. location:current          │                               │
     │<──────────────────────────────│                               │
     │                               │                               │
     │ 3. Connect (JWT)              │                               │
     │                               │<──────────────────────────────┤
     │                               │                               │
     │ 4. washer:updateLocation      │                               │
     │    { lat, lng }               │                               │
     ├──────────────────────────────>│                               │
     │                               │                               │
     │                               │ 5. Save to DB                 │
     │                               │    Find active bookings       │
     │                               │                               │
     │ 6. washer:locationUpdated     │                               │
     │<──────────────────────────────│                               │
     │                               │                               │
     │                               │ 7. user:locationUpdate        │
     │                               ├──────────────────────────────>│
     │                               │                               │
```

---

## Security

### Authentication
- All connections require valid JWT token
- Token is verified on connection
- Unauthorized connections are rejected

### Authorization
- Only users with role `WASHER` or `ADMIN` can send location updates
- Users can only receive location updates for their own bookings
- Location updates are only sent to users with active bookings

### Data Validation
- GPS coordinates are validated (lat: -90 to 90, lng: -180 to 180)
- Invalid data is rejected with error message

---

## Error Handling

### Connection Errors

**Authentication Failed:**
- Connection is rejected
- Client is disconnected
- Check JWT token validity

**Invalid Token:**
- Connection is rejected
- Ensure token is not expired

### Message Errors

**Invalid Location Data:**
```json
{
  "error": "Invalid location data",
  "details": [...validation errors...]
}
```

**Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**Permission Denied:**
```json
{
  "error": "Only washers can update location"
}
```

---

## Best Practices

1. **Reconnection Handling:**
   - Implement automatic reconnection with exponential backoff
   - Re-authenticate on reconnection

2. **Location Update Frequency:**
   - Update location every 5-10 seconds for active bookings
   - Reduce frequency when washer is stationary
   - Stop updates when booking is completed

3. **Battery Optimization:**
   - Use GPS accuracy settings appropriately
   - Consider using network location when high accuracy isn't needed

4. **Error Handling:**
   - Always handle connection errors
   - Show user-friendly error messages
   - Log errors for debugging

5. **Privacy:**
   - Only track location during active bookings
   - Clear location data when booking is completed
   - Inform users about location tracking

---

## Testing

### Using Socket.IO Client

```bash
npm install socket.io-client
```

```javascript
const io = require('socket.io-client');

const socket = io('http://localhost:3000/ws/location', {
  auth: {
    token: 'your-jwt-token'
  }
});

socket.on('connect', () => {
  console.log('Connected!');
  
  // Send location update
  socket.emit('washer:updateLocation', {
    lat: 40.7128,
    lng: -74.0060
  });
});

socket.on('washer:locationUpdated', (data) => {
  console.log('Location updated:', data);
});

socket.on('user:locationUpdate', (data) => {
  console.log('Received location update:', data);
});
```

### Using WebSocket Testing Tools

- **Postman**: Supports WebSocket connections
- **Insomnia**: WebSocket client
- **wscat**: Command-line WebSocket client
  ```bash
  npm install -g wscat
  wscat -c "ws://localhost:3000/ws/location?token=your-token"
  ```

---

## Related APIs

- [Bookings API](./API_BOOKINGS.md) - Bookings are used to determine which users receive location updates
- [Authentication API](./API_AUTH.md) - JWT tokens for WebSocket authentication
- [Users API](./API_USERS.md) - User management

---

## Troubleshooting

### Connection Issues

**Problem:** Connection rejected
- **Solution:** Check JWT token is valid and not expired
- **Solution:** Ensure token is sent in auth header or query parameter

**Problem:** No location updates received
- **Solution:** Verify user has active booking with the washer
- **Solution:** Check booking status is ASSIGNED, EN_ROUTE, ARRIVED, or IN_PROGRESS
- **Solution:** Ensure user is connected to WebSocket

### Location Update Issues

**Problem:** "Only washers can update location" error
- **Solution:** Verify user role is WASHER or ADMIN
- **Solution:** Check JWT token contains correct role

**Problem:** Invalid location data error
- **Solution:** Ensure lat is between -90 and 90
- **Solution:** Ensure lng is between -180 and 180
- **Solution:** Check data types (numbers, not strings)

---

## Production Considerations

1. **CORS Configuration:**
   - Update CORS origin in `location.gateway.ts` to your frontend domain
   - Don't use `origin: '*'` in production

2. **Rate Limiting:**
   - Consider implementing rate limiting for location updates
   - Prevent abuse of location update endpoint

3. **Connection Limits:**
   - Monitor WebSocket connections
   - Implement connection limits per user

4. **Scalability:**
   - For multiple servers, use Redis adapter for Socket.IO
   - Ensure location updates work across server instances

5. **Monitoring:**
   - Log connection/disconnection events
   - Monitor location update frequency
   - Track WebSocket connection errors

