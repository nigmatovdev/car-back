# Payments API Documentation

## Overview

The Payments API integrates with Stripe to handle payment processing for bookings. It supports creating payment intents, handling webhooks, and retrieving payment information.

## Base URL

```
http://localhost:3000/payments
```

## Authentication

- **Payment Intent & Get Payment**: Require JWT authentication
- **Webhook**: No authentication (uses Stripe signature verification)

## Prerequisites

### Environment Variables

Add these to your `.env` file:

```env
# For production/real payments
STRIPE_SECRET_KEY=sk_test_...  # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_... # Your Stripe webhook signing secret

# For demo/testing (optional)
DEMO_MODE=true  # Set to 'true' to enable demo mode (no real Stripe calls)
```

**Demo Mode:**
- Set `DEMO_MODE=true` in your `.env` file
- No Stripe API keys required
- Payment intents return fake client secrets
- Use `POST /payments/demo/confirm` to simulate successful payments
- Perfect for demos, testing, and development without Stripe setup

### Stripe Setup

1. **Get API Keys**: 
   - Sign up at https://stripe.com
   - Get your secret key from Dashboard → Developers → API keys
   - Use test keys for development (`sk_test_...`)

2. **Configure Webhook**:
   - Go to Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.com/payments/webhook`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the webhook signing secret

## Endpoints

### 1. Create Payment Intent

Create a Stripe payment intent for a booking. Returns a client secret for client-side payment confirmation.

**Endpoint:** `POST /payments/intent`

**Authentication:** Required

**Request Body:**
```json
{
  "bookingId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Validation Rules:**
- `bookingId` (UUID, required): Valid booking ID that belongs to the user

**Response (201 Created):**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx",
  "demoMode": false  // Only present in demo mode
}
```

**Demo Mode Response:**
When `DEMO_MODE=true`, the response includes a `demoMode: true` flag:
```json
{
  "clientSecret": "pi_demo_1234567890_secret_demo",
  "paymentIntentId": "pi_demo_1234567890",
  "demoMode": true
}
```

**How It Works:**
1. Verifies booking exists and belongs to user
2. Gets service price from booking
3. Creates Stripe Payment Intent
4. Stores payment intent ID in payment record
5. Returns client secret for frontend

**Error Responses:**
- `400 Bad Request`: Payment already completed
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Booking doesn't belong to user
- `404 Not Found`: Booking not found

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/payments/intent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user-token>" \
  -d '{
    "bookingId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Frontend Integration (JavaScript):**
```javascript
// 1. Create payment intent
const response = await fetch('http://localhost:3000/payments/intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    bookingId: 'booking-id'
  })
});

const { clientSecret } = await response.json();

// 2. Confirm payment with Stripe.js
const stripe = Stripe('pk_test_...');
const { error } = await stripe.confirmPayment({
  clientSecret,
  confirmParams: {
    return_url: 'https://your-app.com/success',
  },
});
```

---

### 2. Stripe Webhook

Handle Stripe webhook events. This endpoint processes payment success/failure events from Stripe.

**Endpoint:** `POST /payments/webhook`

**Authentication:** Not required (uses Stripe signature verification)

**Request Headers:**
```
stripe-signature: <stripe-signature-header>
```

**Request Body:** Raw JSON from Stripe (automatically handled)

**Webhook Events Handled:**
- `payment_intent.succeeded`: Updates payment status to PAID
- `payment_intent.payment_failed`: Updates payment status to FAILED

**Response (200 OK):**
```json
{
  "received": true
}
```

**Error Responses:**
- `400 Bad Request`: Invalid webhook signature

**What Happens on Payment Success:**
1. Webhook verifies signature
2. Extracts booking ID from payment intent metadata
3. Updates payment record:
   - Status: `UNPAID` → `PAID`
   - Sets `paymentDate` to current timestamp
4. Payment is now marked as completed

**Stripe Webhook Configuration:**
```
URL: https://your-domain.com/payments/webhook
Events:
  - payment_intent.succeeded
  - payment_intent.payment_failed
```

**Testing Webhooks Locally:**
Use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/payments/webhook
```

This will give you a webhook signing secret to use in development.

**Example (Stripe CLI):**
```bash
stripe trigger payment_intent.succeeded
```

---

### 3. Confirm Demo Payment (Demo Mode Only)

Simulate a successful payment for testing/demo purposes. Only works when `DEMO_MODE=true`.

**Endpoint:** `POST /payments/demo/confirm`

**Authentication:** Required

**Request Body:**
```json
{
  "bookingId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Validation Rules:**
- `bookingId` (UUID, required): Valid booking ID that belongs to the user

**Response (200 OK):**
```json
{
  "message": "Payment confirmed successfully (Demo Mode)",
  "payment": {
    "id": "990e8400-e29b-41d4-a716-446655440004",
    "bookingId": "770e8400-e29b-41d4-a716-446655440002",
    "amount": 25.99,
    "status": "PAID",
    "paymentDate": "2024-01-01T12:00:00.000Z"
  }
}
```

**How It Works:**
1. Verifies booking exists and belongs to user
2. Checks payment exists and is not already paid
3. Updates payment status to `PAID`
4. Sets `paymentDate` to current timestamp
5. Returns confirmation message

**Error Responses:**
- `400 Bad Request`: Payment already completed
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Booking doesn't belong to user
- `404 Not Found`: Booking or payment not found

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/payments/demo/confirm \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user-token>" \
  -d '{
    "bookingId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Demo Mode Workflow:**
1. Create booking (payment record created with `UNPAID` status)
2. Create payment intent → Returns fake client secret with `demoMode: true`
3. Confirm demo payment → `POST /payments/demo/confirm`
4. Payment status updated to `PAID`

---

### 4. Get Payment by Booking ID

Get payment information for a specific booking.

**Endpoint:** `GET /payments/:bookingId`

**Authentication:** Required

**Access Control:**
- Users can view payments for their own bookings
- Admins can view any payment

**Path Parameters:**
- `bookingId` (string, required): Booking UUID

**Response (200 OK):**
```json
{
  "id": "990e8400-e29b-41d4-a716-446655440004",
  "bookingId": "770e8400-e29b-41d4-a716-446655440002",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 25.99,
  "status": "PAID",
  "stripePaymentIntentId": "pi_xxx",
  "paymentDate": "2024-01-01T12:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z",
  "booking": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "service": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "title": "Basic Car Wash",
      "price": 25.99
    },
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com"
    }
  },
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: Access denied (not owner or admin)
- `404 Not Found`: Payment not found

**Example (cURL):**
```bash
curl http://localhost:3000/payments/770e8400-e29b-41d4-a716-446655440002 \
  -H "Authorization: Bearer <user-token>"
```

---

## Payment Status Flow

```
UNPAID → (Payment Intent Created) → (Stripe Processing) → PAID
   ↓
FAILED (if payment fails)
```

**Payment Statuses:**
- `UNPAID`: Initial status, payment not yet completed
- `PENDING`: Payment is being processed (optional, not currently used)
- `PAID`: Payment successfully completed
- `FAILED`: Payment failed

## Payment Model

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique payment identifier |
| `bookingId` | UUID | Associated booking ID |
| `userId` | UUID | User who made the payment |
| `amount` | Decimal | Payment amount (from service price) |
| `status` | Enum | Payment status (UNPAID, PENDING, PAID, FAILED) |
| `stripePaymentIntentId` | String (nullable) | Stripe payment intent ID |
| `paymentDate` | DateTime (nullable) | When payment was completed |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

## Integration Flow

### Complete Payment Flow

1. **User creates booking** → Payment record created with `UNPAID` status
2. **User requests payment intent** → `POST /payments/intent`
3. **Frontend confirms payment** → Uses Stripe.js with client secret
4. **Stripe processes payment** → Sends webhook to `/payments/webhook`
5. **Webhook updates payment** → Status changes to `PAID`
6. **User checks payment status** → `GET /payments/:bookingId`

## Security Features

### Webhook Signature Verification
- All webhooks are verified using Stripe's signature
- Prevents unauthorized webhook calls
- Uses `STRIPE_WEBHOOK_SECRET` for verification

### Access Control
- Users can only create payment intents for their own bookings
- Users can only view their own payments
- Admins have full access

### Amount Validation
- Payment amount comes directly from service price
- Prevents price manipulation
- Amount is set when booking is created

## Error Handling

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Request successful |
| `201 Created` | Payment intent created successfully |
| `400 Bad Request` | Validation error or payment already completed |
| `401 Unauthorized` | Missing or invalid authentication token |
| `403 Forbidden` | Insufficient permissions |
| `404 Not Found` | Booking or payment not found |

## Testing

### Test Mode

Use Stripe test mode for development:
- Test API keys: `sk_test_...` and `pk_test_...`
- Test card numbers: https://stripe.com/docs/testing
- Test webhooks: Use Stripe CLI

### Test Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
Requires 3D Secure: 4000 0025 0000 3155
```

### Testing Webhooks Locally

1. **Install Stripe CLI:**
   ```bash
   # Windows
   scoop install stripe
   
   # Mac
   brew install stripe/stripe-cli/stripe
   ```

2. **Login:**
   ```bash
   stripe login
   ```

3. **Forward webhooks:**
   ```bash
   stripe listen --forward-to localhost:3000/payments/webhook
   ```

4. **Test payment:**
   ```bash
   stripe trigger payment_intent.succeeded
   ```

## Best Practices

1. **Always verify webhook signatures** in production
2. **Use idempotency keys** for payment intents (optional, for retries)
3. **Handle payment failures gracefully** on frontend
4. **Store payment intent IDs** for reconciliation
5. **Monitor webhook events** in Stripe Dashboard
6. **Use HTTPS** in production for webhook endpoint
7. **Test with Stripe test mode** before going live

## Common Use Cases

### Create and Process Payment
```javascript
// 1. Create payment intent
const { clientSecret } = await createPaymentIntent(bookingId);

// 2. Confirm with Stripe
await stripe.confirmPayment({ clientSecret });

// 3. Check payment status
const payment = await getPayment(bookingId);
```

### Handle Payment Success (Webhook)
```typescript
// Automatically handled by webhook endpoint
// Payment status updated to PAID
// paymentDate set to current timestamp
```

### Check Payment Status
```bash
GET /payments/{bookingId}
```

## Related APIs

- [Bookings API](./API_BOOKINGS.md) - Bookings create payment records
- [Services API](./API_SERVICES.md) - Service prices used for payments
- [Authentication API](./API_AUTH.md) - For authentication

## Stripe Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Payment Intents Guide](https://stripe.com/docs/payments/payment-intents)
- [Webhooks Guide](https://stripe.com/docs/webhooks)
- [Testing Guide](https://stripe.com/docs/testing)

