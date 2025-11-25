# Flutter Mobile App - Complete Structure & Design Guide

## 📱 Application Overview

**App Name:** CarWash Pro  
**Platform:** Flutter (iOS & Android)  
**Architecture:** Clean Architecture with Provider/Bloc  
**State Management:** Provider or Riverpod  
**Backend API:** NestJS REST API + WebSocket

---

## 🏗️ Project Structure

```
lib/
├── main.dart
├── app.dart
├── core/
│   ├── constants/
│   │   ├── app_constants.dart
│   │   ├── api_constants.dart
│   │   └── route_constants.dart
│   ├── theme/
│   │   ├── app_theme.dart
│   │   ├── colors.dart
│   │   └── text_styles.dart
│   ├── utils/
│   │   ├── validators.dart
│   │   ├── formatters.dart
│   │   └── helpers.dart
│   ├── network/
│   │   ├── api_client.dart
│   │   ├── websocket_client.dart
│   │   └── interceptors.dart
│   ├── storage/
│   │   ├── local_storage.dart
│   │   └── secure_storage.dart
│   └── models/
│       ├── user_model.dart
│       ├── service_model.dart
│       ├── booking_model.dart
│       └── payment_model.dart
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   └── datasources/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   └── usecases/
│   │   └── presentation/
│   │       ├── pages/
│   │       ├── widgets/
│   │       └── providers/
│   ├── home/
│   ├── services/
│   ├── bookings/
│   ├── payments/
│   ├── profile/
│   ├── location/
│   └── admin/
├── shared/
│   ├── widgets/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── inputs/
│   │   └── dialogs/
│   └── services/
│       ├── location_service.dart
│       ├── notification_service.dart
│       └── payment_service.dart
└── routes/
    ├── app_router.dart
    └── route_guards.dart
```

---

## 📄 Pages & Screens

### 1. Authentication Flow

#### 1.1 Splash Screen (`splash_page.dart`)
**Purpose:** Initial app loading, check authentication status

**Features:**
- App logo animation
- Check if user is logged in
- Navigate to home or login

**Data Needed:**
- App version
- User authentication status

---

#### 1.2 Onboarding Screen (`onboarding_page.dart`)
**Purpose:** First-time user introduction

**Features:**
- 3-4 slides explaining app features
- Skip button
- Next/Previous navigation
- Done button to proceed to login

**Content:**
- Slide 1: "Book Car Wash Services"
- Slide 2: "Track Your Washer in Real-Time"
- Slide 3: "Easy Payment & Booking Management"

---

#### 1.3 Login Screen (`login_page.dart`)
**Purpose:** User authentication

**UI Elements:**
- Email input field
- Password input field
- "Forgot Password?" link
- "Login" button
- "Don't have an account? Sign Up" link
- Social login buttons (optional)

**Validation:**
- Email format
- Password minimum 6 characters
- Show loading state during login

**API Endpoint:** `POST /auth/login`

**Navigation:**
- Success → Home
- Error → Show error message

---

#### 1.4 Register Screen (`register_page.dart`)
**Purpose:** New user registration

**UI Elements:**
- Full name input
- Email input
- Password input
- Confirm password input
- Role selector (Customer/Washer) - optional
- Terms & Conditions checkbox
- "Sign Up" button
- "Already have an account? Login" link

**Validation:**
- All fields required
- Email format
- Password match
- Password strength (min 6 chars)
- Terms acceptance

**API Endpoint:** `POST /auth/register`

**Navigation:**
- Success → Verify email (if needed) or Home
- Error → Show error message

---

#### 1.5 Forgot Password Screen (`forgot_password_page.dart`)
**Purpose:** Password reset

**UI Elements:**
- Email input
- "Send Reset Link" button
- Back to login link

**API Endpoint:** `POST /auth/forgot-password` (if implemented)

---

### 2. Home Flow

#### 2.1 Home Screen (`home_page.dart`)
**Purpose:** Main dashboard

**Sections:**
1. **Header**
   - User greeting
   - Profile picture/avatar
   - Notifications icon

2. **Quick Actions**
   - "Book Now" button (primary CTA)
   - "My Bookings" button
   - "Track Washer" button (if active booking)

3. **Active Booking Card** (if exists)
   - Service name
   - Washer name
   - Booking time
   - Status badge
   - "View Details" button
   - Real-time location map (mini)

4. **Available Services** (horizontal scroll)
   - Service cards with:
     - Service image/icon
     - Service name
     - Price
     - Duration
     - "Book" button

5. **Recent Bookings** (if any)
   - List of last 3 bookings
   - Status indicators

**API Endpoints:**
- `GET /services` - Fetch services
- `GET /bookings/me` - Fetch user bookings
- `GET /users/me` - Fetch user info

**State Management:**
- Services list
- Active booking
- User info

---

### 3. Services Flow

#### 3.1 Services List Screen (`services_list_page.dart`)
**Purpose:** Browse all available services

**UI Elements:**
- Search bar
- Filter buttons (Price, Duration, Category)
- Service grid/list view toggle
- Service cards:
  - Service image
  - Title
  - Description (truncated)
  - Price
  - Duration
  - "Book Now" button

**Features:**
- Pull to refresh
- Infinite scroll (pagination)
- Search functionality
- Filter by price range
- Filter by duration

**API Endpoint:** `GET /services`

---

#### 3.2 Service Details Screen (`service_details_page.dart`)
**Purpose:** View service details and book

**UI Elements:**
- Service image carousel
- Service title
- Price (large, prominent)
- Duration
- Full description
- Features list
- "Book This Service" button (fixed bottom)

**Features:**
- Image gallery
- Share service
- Add to favorites (if implemented)

**API Endpoint:** `GET /services/:id`

---

### 4. Booking Flow

#### 4.1 Create Booking Screen (`create_booking_page.dart`)
**Purpose:** Create new booking

**Steps (Multi-step form):**

**Step 1: Select Service**
- Service selection (if not from service details)
- Service summary card

**Step 2: Select Date & Time**
- Calendar picker
- Available time slots
- Selected date/time display

**Step 3: Select Location**
- Map view
- Current location button
- Search address
- Manual location picker
- Address confirmation

**Step 4: Review & Confirm**
- Booking summary:
  - Service details
  - Date & time
  - Location (address)
  - Total price
- "Confirm Booking" button

**API Endpoints:**
- `POST /bookings` - Create booking

**Navigation:**
- Success → Booking Confirmation Screen
- Error → Show error, allow retry

---

#### 4.2 Booking Confirmation Screen (`booking_confirmation_page.dart`)
**Purpose:** Show booking success

**UI Elements:**
- Success icon/animation
- Booking ID
- Service details
- Date & time
- Location
- Estimated washer arrival time
- "View Booking" button
- "Go Home" button

**Features:**
- Share booking details
- Add to calendar

---

#### 4.3 My Bookings Screen (`my_bookings_page.dart`)
**Purpose:** List all user bookings

**UI Elements:**
- Tab bar:
  - All
  - Upcoming
  - In Progress
  - Completed
  - Cancelled
- Booking cards:
  - Service name
  - Date & time
  - Status badge
  - Washer name (if assigned)
  - Price
  - "View Details" button

**Features:**
- Pull to refresh
- Filter by status
- Sort by date
- Empty state message

**API Endpoint:** `GET /bookings/me`

---

#### 4.4 Booking Details Screen (`booking_details_page.dart`)
**Purpose:** View booking details

**Sections:**

1. **Header**
   - Booking ID
   - Status badge
   - Share button

2. **Service Info**
   - Service image
   - Service name
   - Price
   - Duration

3. **Booking Details**
   - Date
   - Time
   - Location (address)
   - Map view

4. **Washer Info** (if assigned)
   - Washer name
   - Washer photo
   - Contact button
   - Rating (if completed)

5. **Payment Info**
   - Payment status
   - Amount
   - Payment method
   - "Pay Now" button (if unpaid)

6. **Timeline**
   - Booking created
   - Washer assigned
   - Washer en route
   - Washer arrived
   - Service in progress
   - Service completed

7. **Actions**
   - Cancel booking (if allowed)
   - Contact support
   - Rate service (if completed)

**API Endpoints:**
- `GET /bookings/:id`
- `PATCH /bookings/:id/status` (for washer)

**Real-time Updates:**
- WebSocket connection for status updates
- Location tracking (if washer is en route)

---

#### 4.5 Live Tracking Screen (`live_tracking_page.dart`)
**Purpose:** Real-time washer location tracking

**UI Elements:**
- Full-screen map
- Washer marker (animated)
- User location marker
- Route line (if available)
- ETA display
- Washer info card (bottom sheet):
  - Washer name
  - Washer photo
  - Current status
  - Estimated arrival time
  - Contact button
- Back button

**Features:**
- Real-time location updates via WebSocket
- Map auto-centering on washer location
- Route calculation (if available)
- ETA calculation
- Status updates

**WebSocket Events:**
- `user:locationUpdate` - Receive washer location
- Connection to `ws://your-domain.com/ws/location`

**State Management:**
- Current washer location
- User location
- Booking status
- ETA calculation

---

### 5. Payment Flow

#### 5.1 Payment Screen (`payment_page.dart`)
**Purpose:** Process payment for booking

**UI Elements:**
- Booking summary
- Total amount (large)
- Payment method selector:
  - Credit/Debit Card
  - Digital Wallet (if available)
- Card input form (if card selected):
  - Card number
  - Expiry date
  - CVV
  - Cardholder name
- "Pay Now" button
- Security badges

**Features:**
- Stripe integration
- Card validation
- Secure payment processing
- Payment confirmation

**API Endpoints:**
- `POST /payments/intent` - Create payment intent
- Stripe SDK for card processing

**Navigation:**
- Success → Payment Success Screen
- Error → Show error, allow retry

---

#### 5.2 Payment Success Screen (`payment_success_page.dart`)
**Purpose:** Confirm successful payment

**UI Elements:**
- Success icon/animation
- Payment confirmation
- Transaction ID
- Amount paid
- Payment date
- "View Booking" button
- "Go Home" button

**Features:**
- Receipt download (if available)
- Email receipt (if available)

---

### 6. Profile Flow

#### 6.1 Profile Screen (`profile_page.dart`)
**Purpose:** User profile management

**Sections:**

1. **Profile Header**
   - Profile picture
   - User name
   - Email
   - Edit button

2. **Menu Items**
   - My Bookings
   - Payment Methods
   - Addresses
   - Notifications
   - Settings
   - Help & Support
   - About
   - Logout

**API Endpoint:** `GET /users/me`

---

#### 6.2 Edit Profile Screen (`edit_profile_page.dart`)
**Purpose:** Update user information

**UI Elements:**
- Profile picture picker
- Name input
- Email input (read-only or editable)
- Phone number input
- "Save Changes" button

**Validation:**
- Name required
- Email format
- Phone format

**API Endpoint:** `PATCH /users/me`

---

#### 6.3 Settings Screen (`settings_page.dart`)
**Purpose:** App settings

**Sections:**
- Notifications
  - Push notifications toggle
  - Email notifications toggle
  - SMS notifications toggle
- Privacy
  - Location sharing
  - Data usage
- App
  - Language
  - Theme (Light/Dark)
  - Clear cache
- Account
  - Change password
  - Delete account

---

### 7. Washer Flow (For Washer Role)

#### 7.1 Washer Dashboard (`washer_dashboard_page.dart`)
**Purpose:** Washer's main screen

**Sections:**

1. **Stats Cards**
   - Today's bookings
   - Earnings today
   - Completed bookings
   - Rating

2. **Active Bookings**
   - List of assigned bookings
   - Status indicators
   - "Start Service" button

3. **Upcoming Bookings**
   - Today's schedule
   - Tomorrow's schedule

**API Endpoints:**
- `GET /bookings` (filtered for washer)
- Washer-specific stats

---

#### 7.2 Washer Booking Details (`washer_booking_details_page.dart`)
**Purpose:** Washer's view of booking

**Sections:**
- Customer info
- Service details
- Location (map)
- Status update buttons:
  - "En Route"
  - "Arrived"
  - "Start Service"
  - "Complete Service"
- Navigation to location
- Contact customer

**API Endpoints:**
- `PATCH /bookings/:id/status`
- Location updates via WebSocket

---

#### 7.3 Location Tracker (`washer_location_tracker_page.dart`)
**Purpose:** Washer location tracking

**Features:**
- Background location tracking
- Automatic location updates
- Manual location update button
- Battery optimization settings

**WebSocket:**
- Connect to `ws://your-domain.com/ws/location`
- Send location updates: `washer:updateLocation`
- Receive confirmations: `washer:locationUpdated`

---

### 8. Admin Flow (For Admin Role)

#### 8.1 Admin Dashboard (`admin_dashboard_page.dart`)
**Purpose:** Admin overview

**Sections:**
- Statistics cards:
  - Total users
  - Total bookings
  - Revenue
  - Active washers
- Charts:
  - Bookings over time
  - Revenue chart
  - Service popularity
- Quick actions:
  - Manage services
  - Manage users
  - View reports

---

#### 8.2 Admin Services Management (`admin_services_page.dart`)
**Purpose:** Manage services

**Features:**
- List all services
- Add new service
- Edit service
- Delete/Deactivate service
- Service analytics

**API Endpoints:**
- `GET /services`
- `POST /services`
- `PATCH /services/:id`
- `DELETE /services/:id`

---

#### 8.3 Admin Users Management (`admin_users_page.dart`)
**Purpose:** Manage users

**Features:**
- List all users
- Filter by role
- View user details
- Edit user
- Deactivate user

**API Endpoints:**
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`

---

## 🎨 Design System

### Colors

```dart
class AppColors {
  // Primary
  static const primary = Color(0xFF2196F3); // Blue
  static const primaryDark = Color(0xFF1976D2);
  static const primaryLight = Color(0xFFBBDEFB);
  
  // Secondary
  static const secondary = Color(0xFF4CAF50); // Green
  static const secondaryDark = Color(0xFF388E3C);
  
  // Accent
  static const accent = Color(0xFFFF9800); // Orange
  
  // Status Colors
  static const success = Color(0xFF4CAF50);
  static const error = Color(0xFFF44336);
  static const warning = Color(0xFFFF9800);
  static const info = Color(0xFF2196F3);
  
  // Neutral
  static const background = Color(0xFFF5F5F5);
  static const surface = Color(0xFFFFFFFF);
  static const textPrimary = Color(0xFF212121);
  static const textSecondary = Color(0xFF757575);
  static const divider = Color(0xFFBDBDBD);
}
```

### Typography

```dart
class AppTextStyles {
  static const h1 = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );
  
  static const h2 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );
  
  static const body1 = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    color: AppColors.textPrimary,
  );
  
  static const body2 = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    color: AppColors.textSecondary,
  );
  
  static const button = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: Colors.white,
  );
}
```

### Components

#### Buttons
- Primary Button
- Secondary Button
- Outlined Button
- Text Button
- Icon Button

#### Cards
- Service Card
- Booking Card
- Stats Card

#### Inputs
- Text Field
- Password Field
- Date Picker
- Time Picker
- Location Picker

#### Dialogs
- Confirmation Dialog
- Error Dialog
- Success Dialog
- Loading Dialog

---

## 📦 Required Packages

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.1.1
  # OR
  flutter_riverpod: ^2.4.9
  
  # Networking
  dio: ^5.4.0
  socket_io_client: ^2.0.3
  
  # Storage
  shared_preferences: ^2.2.2
  flutter_secure_storage: ^9.0.0
  
  # Location
  geolocator: ^10.1.0
  google_maps_flutter: ^2.5.0
  geocoding: ^2.1.1
  
  # UI
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0
  flutter_animate: ^4.2.0
  
  # Forms
  flutter_form_builder: ^9.1.1
  form_builder_validators: ^9.1.0
  
  # Payments
  flutter_stripe: ^9.4.0
  
  # Utils
  intl: ^0.18.1
  uuid: ^4.2.1
  url_launcher: ^6.2.2
  share_plus: ^7.2.1
  
  # Permissions
  permission_handler: ^11.1.0
  
  # Notifications
  firebase_messaging: ^14.7.9
  flutter_local_notifications: ^16.3.0
```

---

## 🔌 API Integration

### API Client Setup

```dart
class ApiClient {
  static const String baseUrl = 'https://your-api-domain.com';
  static const String wsUrl = 'wss://your-api-domain.com/ws/location';
  
  late Dio _dio;
  late Socket _socket;
  
  // Initialize with interceptors
  // Add authentication token
  // Handle errors
}
```

### WebSocket Client

```dart
class WebSocketClient {
  Socket? _socket;
  String? _token;
  
  // Connect with JWT token
  // Listen to events
  // Send location updates
  // Handle reconnection
}
```

---

## 🔐 Authentication Flow

1. **Login/Register** → Get JWT tokens
2. **Store tokens** → Secure storage
3. **Add to requests** → Authorization header
4. **Token refresh** → Automatic refresh on expiry
5. **Logout** → Clear tokens and storage

---

## 📍 Location Services

### Permissions Required
- Location (Always/When in use)
- Background location (for washer)

### Features
- Get current location
- Search addresses
- Reverse geocoding
- Distance calculation
- Route calculation (optional)

---

## 🔔 Notifications

### Push Notifications
- Booking confirmed
- Washer assigned
- Washer en route
- Service started
- Service completed
- Payment received

### In-App Notifications
- Real-time status updates
- New messages (if chat implemented)

---

## 📱 Platform-Specific Features

### iOS
- Face ID / Touch ID for authentication
- Apple Pay integration
- iOS-specific UI components

### Android
- Fingerprint authentication
- Google Pay integration
- Material Design 3 components

---

## 🧪 Testing Strategy

### Unit Tests
- Models
- Services
- Utils
- Validators

### Widget Tests
- Individual widgets
- Form validation
- Button interactions

### Integration Tests
- Complete user flows
- API integration
- WebSocket connections

---

## 📊 Analytics & Monitoring

### Events to Track
- User registration
- Booking creation
- Payment completion
- Service completion
- App crashes
- Feature usage

### Tools
- Firebase Analytics
- Sentry for error tracking
- Mixpanel (optional)

---

## 🚀 Deployment

### Build Configuration
- iOS: App Store
- Android: Google Play Store

### Environment Variables
- API base URL
- WebSocket URL
- Stripe publishable key
- Firebase configuration

---

## 📝 Additional Notes

1. **Offline Support**: Cache services and bookings for offline viewing
2. **Image Caching**: Use cached_network_image for service images
3. **Error Handling**: Comprehensive error messages and retry mechanisms
4. **Loading States**: Show loading indicators for all async operations
5. **Empty States**: Friendly messages when no data available
6. **Accessibility**: Support for screen readers and accessibility features
7. **Internationalization**: Support multiple languages (if needed)

---

**Last Updated:** November 2025  
**Version:** 1.0

