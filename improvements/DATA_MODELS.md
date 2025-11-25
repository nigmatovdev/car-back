# Data Models & API Integration

## 📊 Flutter Data Models

### User Model

```dart
class UserModel {
  final String id;
  final String email;
  final String? name;
  final String role; // CUSTOMER, WASHER, ADMIN
  final DateTime createdAt;
  final DateTime updatedAt;

  UserModel({
    required this.id,
    required this.email,
    this.name,
    required this.role,
    required this.createdAt,
    required this.updatedAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      name: json['name'],
      role: json['role'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'role': role,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
```

**API Endpoints:**
- `GET /users/me` - Get current user
- `PATCH /users/me` - Update user profile
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID (admin only)

---

### Service Model

```dart
class ServiceModel {
  final String id;
  final String title;
  final String? description;
  final double price;
  final int durationMin;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  ServiceModel({
    required this.id,
    required this.title,
    this.description,
    required this.price,
    required this.durationMin,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory ServiceModel.fromJson(Map<String, dynamic> json) {
    return ServiceModel(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      price: (json['price'] as num).toDouble(),
      durationMin: json['durationMin'],
      isActive: json['isActive'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'price': price,
      'durationMin': durationMin,
      'isActive': isActive,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
```

**API Endpoints:**
- `GET /services` - Get all services
- `GET /services/:id` - Get service by ID
- `POST /services` - Create service (admin only)
- `PATCH /services/:id` - Update service (admin only)
- `DELETE /services/:id` - Delete service (admin only)

---

### Booking Model

```dart
enum BookingStatus {
  pending,
  assigned,
  enRoute,
  arrived,
  inProgress,
  completed,
  cancelled;

  static BookingStatus fromString(String status) {
    return BookingStatus.values.firstWhere(
      (e) => e.name == status.toLowerCase(),
      orElse: () => BookingStatus.pending,
    );
  }

  String toApiString() {
    return name.toUpperCase();
  }
}

class BookingModel {
  final String id;
  final String userId;
  final String serviceId;
  final String? washerId;
  final double latitude;
  final double longitude;
  final DateTime date;
  final String time;
  final BookingStatus status;
  final DateTime createdAt;
  final DateTime updatedAt;
  
  // Relations
  final ServiceModel? service;
  final UserModel? user;
  final UserModel? washer;
  final PaymentModel? payment;

  BookingModel({
    required this.id,
    required this.userId,
    required this.serviceId,
    this.washerId,
    required this.latitude,
    required this.longitude,
    required this.date,
    required this.time,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    this.service,
    this.user,
    this.washer,
    this.payment,
  });

  factory BookingModel.fromJson(Map<String, dynamic> json) {
    return BookingModel(
      id: json['id'],
      userId: json['userId'],
      serviceId: json['serviceId'],
      washerId: json['washerId'],
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      date: DateTime.parse(json['date']),
      time: json['time'],
      status: BookingStatus.fromString(json['status']),
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      service: json['service'] != null 
          ? ServiceModel.fromJson(json['service']) 
          : null,
      user: json['user'] != null 
          ? UserModel.fromJson(json['user']) 
          : null,
      washer: json['washer'] != null 
          ? UserModel.fromJson(json['washer']) 
          : null,
      payment: json['payment'] != null 
          ? PaymentModel.fromJson(json['payment']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'serviceId': serviceId,
      'washerId': washerId,
      'latitude': latitude,
      'longitude': longitude,
      'date': date.toIso8601String(),
      'time': time,
      'status': status.toApiString(),
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
```

**API Endpoints:**
- `POST /bookings` - Create booking
- `GET /bookings/me` - Get user bookings
- `GET /bookings` - Get all bookings (admin only)
- `GET /bookings/:id` - Get booking by ID
- `PATCH /bookings/:id/status` - Update booking status (washer/admin)

---

### Payment Model

```dart
enum PaymentStatus {
  unpaid,
  pending,
  paid,
  failed;

  static PaymentStatus fromString(String status) {
    return PaymentStatus.values.firstWhere(
      (e) => e.name == status.toLowerCase(),
      orElse: () => PaymentStatus.unpaid,
    );
  }

  String toApiString() {
    return name.toUpperCase();
  }
}

class PaymentModel {
  final String id;
  final String bookingId;
  final String userId;
  final double amount;
  final PaymentStatus status;
  final String? stripePaymentIntentId;
  final DateTime? paymentDate;
  final DateTime createdAt;
  final DateTime updatedAt;

  PaymentModel({
    required this.id,
    required this.bookingId,
    required this.userId,
    required this.amount,
    required this.status,
    this.stripePaymentIntentId,
    this.paymentDate,
    required this.createdAt,
    required this.updatedAt,
  });

  factory PaymentModel.fromJson(Map<String, dynamic> json) {
    return PaymentModel(
      id: json['id'],
      bookingId: json['bookingId'],
      userId: json['userId'],
      amount: (json['amount'] as num).toDouble(),
      status: PaymentStatus.fromString(json['status']),
      stripePaymentIntentId: json['stripePaymentIntentId'],
      paymentDate: json['paymentDate'] != null 
          ? DateTime.parse(json['paymentDate']) 
          : null,
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'bookingId': bookingId,
      'userId': userId,
      'amount': amount,
      'status': status.toApiString(),
      'stripePaymentIntentId': stripePaymentIntentId,
      'paymentDate': paymentDate?.toIso8601String(),
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
```

**API Endpoints:**
- `POST /payments/intent` - Create payment intent
- `POST /payments/demo/confirm` - Confirm demo payment
- `GET /payments/:bookingId` - Get payment by booking ID
- `POST /payments/webhook` - Stripe webhook (server-side)

---

### Location Model

```dart
class WasherLocationModel {
  final String id;
  final String washerId;
  final double latitude;
  final double longitude;
  final DateTime updatedAt;
  final UserModel? washer;

  WasherLocationModel({
    required this.id,
    required this.washerId,
    required this.latitude,
    required this.longitude,
    required this.updatedAt,
    this.washer,
  });

  factory WasherLocationModel.fromJson(Map<String, dynamic> json) {
    return WasherLocationModel(
      id: json['id'],
      washerId: json['washerId'],
      latitude: (json['lat'] as num).toDouble(),
      longitude: (json['lng'] as num).toDouble(),
      updatedAt: DateTime.parse(json['updatedAt']),
      washer: json['washer'] != null 
          ? UserModel.fromJson(json['washer']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'washerId': washerId,
      'lat': latitude,
      'lng': longitude,
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}
```

**WebSocket Events:**
- `washer:updateLocation` - Send location update
- `user:locationUpdate` - Receive location update
- `location:current` - Current location on connect
- `washer:locationUpdated` - Location update confirmation

---

### Authentication Models

```dart
class LoginRequest {
  final String email;
  final String password;

  LoginRequest({
    required this.email,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
    };
  }
}

class RegisterRequest {
  final String email;
  final String password;
  final String? role;

  RegisterRequest({
    required this.email,
    required this.password,
    this.role,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
      'role': role,
    };
  }
}

class AuthResponse {
  final String accessToken;
  final String refreshToken;
  final UserModel user;

  AuthResponse({
    required this.accessToken,
    required this.refreshToken,
    required this.user,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      accessToken: json['accessToken'],
      refreshToken: json['refreshToken'],
      user: UserModel.fromJson(json['user']),
    );
  }
}
```

**API Endpoints:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user

---

## 🔌 API Client Implementation

### Base API Client

```dart
class ApiClient {
  static const String baseUrl = 'https://your-api-domain.com';
  
  late Dio _dio;
  final SecureStorage _storage = SecureStorage();

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
      },
    ));

    _dio.interceptors.add(AuthInterceptor());
    _dio.interceptors.add(LoggingInterceptor());
    _dio.interceptors.add(ErrorInterceptor());
  }

  // Auth methods
  Future<AuthResponse> login(LoginRequest request) async {
    final response = await _dio.post('/auth/login', data: request.toJson());
    return AuthResponse.fromJson(response.data);
  }

  Future<AuthResponse> register(RegisterRequest request) async {
    final response = await _dio.post('/auth/register', data: request.toJson());
    return AuthResponse.fromJson(response.data);
  }

  // Service methods
  Future<List<ServiceModel>> getServices() async {
    final response = await _dio.get('/services');
    return (response.data as List)
        .map((json) => ServiceModel.fromJson(json))
        .toList();
  }

  Future<ServiceModel> getService(String id) async {
    final response = await _dio.get('/services/$id');
    return ServiceModel.fromJson(response.data);
  }

  // Booking methods
  Future<BookingModel> createBooking(Map<String, dynamic> data) async {
    final response = await _dio.post('/bookings', data: data);
    return BookingModel.fromJson(response.data);
  }

  Future<List<BookingModel>> getMyBookings() async {
    final response = await _dio.get('/bookings/me');
    return (response.data as List)
        .map((json) => BookingModel.fromJson(json))
        .toList();
  }

  Future<BookingModel> getBooking(String id) async {
    final response = await _dio.get('/bookings/$id');
    return BookingModel.fromJson(response.data);
  }

  // Payment methods
  Future<Map<String, dynamic>> createPaymentIntent(String bookingId) async {
    final response = await _dio.post(
      '/payments/intent',
      data: {'bookingId': bookingId},
    );
    return response.data;
  }

  Future<PaymentModel> getPayment(String bookingId) async {
    final response = await _dio.get('/payments/$bookingId');
    return PaymentModel.fromJson(response.data);
  }

  // User methods
  Future<UserModel> getCurrentUser() async {
    final response = await _dio.get('/users/me');
    return UserModel.fromJson(response.data);
  }

  Future<UserModel> updateUser(Map<String, dynamic> data) async {
    final response = await _dio.patch('/users/me', data: data);
    return UserModel.fromJson(response.data);
  }
}
```

---

### WebSocket Client

```dart
class WebSocketClient {
  Socket? _socket;
  String? _token;
  final String wsUrl = 'wss://your-api-domain.com/ws/location';

  StreamController<WasherLocationModel>? _locationController;
  Stream<WasherLocationModel>? get locationStream => _locationController?.stream;

  Future<void> connect(String token) async {
    _token = token;
    _locationController = StreamController<WasherLocationModel>.broadcast();

    try {
      _socket = io(
        wsUrl,
        OptionBuilder()
            .setTransports(['websocket'])
            .setAuth({'token': token})
            .build(),
      );

      _socket!.onConnect((_) {
        print('WebSocket connected');
      });

      _socket!.onDisconnect((_) {
        print('WebSocket disconnected');
      });

      _socket!.on('user:locationUpdate', (data) {
        final location = WasherLocationModel.fromJson(data);
        _locationController?.add(location);
      });

      _socket!.on('location:current', (data) {
        final location = WasherLocationModel.fromJson(data);
        _locationController?.add(location);
      });

      _socket!.on('washer:locationUpdated', (data) {
        print('Location updated: $data');
      });

      _socket!.onError((error) {
        print('WebSocket error: $error');
      });
    } catch (e) {
      print('WebSocket connection error: $e');
    }
  }

  void sendLocationUpdate(double lat, double lng) {
    if (_socket != null && _socket!.connected) {
      _socket!.emit('washer:updateLocation', {
        'lat': lat,
        'lng': lng,
      });
    }
  }

  void disconnect() {
    _socket?.disconnect();
    _locationController?.close();
    _locationController = null;
  }
}
```

---

## 📱 State Management

### Provider Example

```dart
class BookingProvider extends ChangeNotifier {
  final ApiClient _apiClient = ApiClient();
  List<BookingModel> _bookings = [];
  BookingModel? _activeBooking;
  bool _isLoading = false;

  List<BookingModel> get bookings => _bookings;
  BookingModel? get activeBooking => _activeBooking;
  bool get isLoading => _isLoading;

  Future<void> loadBookings() async {
    _isLoading = true;
    notifyListeners();

    try {
      _bookings = await _apiClient.getMyBookings();
      _activeBooking = _bookings.firstWhere(
        (b) => [
          BookingStatus.assigned,
          BookingStatus.enRoute,
          BookingStatus.arrived,
          BookingStatus.inProgress,
        ].contains(b.status),
        orElse: () => null,
      );
    } catch (e) {
      print('Error loading bookings: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<BookingModel> createBooking({
    required String serviceId,
    required double latitude,
    required double longitude,
    required DateTime date,
    required String time,
  }) async {
    _isLoading = true;
    notifyListeners();

    try {
      final booking = await _apiClient.createBooking({
        'serviceId': serviceId,
        'latitude': latitude,
        'longitude': longitude,
        'date': date.toIso8601String(),
        'time': time,
      });

      _bookings.insert(0, booking);
      _activeBooking = booking;
      notifyListeners();
      return booking;
    } catch (e) {
      print('Error creating booking: $e');
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
```

---

## 🔄 Data Flow

### Booking Creation Flow

```
1. User selects service
   ↓
2. User selects date/time
   ↓
3. User selects location
   ↓
4. Review booking details
   ↓
5. Create booking API call
   ↓
6. Receive booking with payment record
   ↓
7. Navigate to payment screen
   ↓
8. Create payment intent
   ↓
9. Process payment (Stripe)
   ↓
10. Confirm payment
   ↓
11. Navigate to booking details
```

### Location Tracking Flow

```
1. Washer connects to WebSocket
   ↓
2. Send location updates periodically
   ↓
3. Server stores location in database
   ↓
4. Server finds active bookings for washer
   ↓
5. Server emits location to booking users
   ↓
6. User receives location update
   ↓
7. Update map with new location
   ↓
8. Calculate and display ETA
```

---

## 💾 Local Storage

### Storage Keys

```dart
class StorageKeys {
  static const String accessToken = 'access_token';
  static const String refreshToken = 'refresh_token';
  static const String user = 'user';
  static const String onboardingCompleted = 'onboarding_completed';
  static const String fcmToken = 'fcm_token';
}
```

### Storage Service

```dart
class StorageService {
  final SecureStorage _secureStorage = SecureStorage();
  final SharedPreferences _prefs = SharedPreferences.getInstance();

  // Token storage
  Future<void> saveTokens(String accessToken, String refreshToken) async {
    await _secureStorage.write(
      key: StorageKeys.accessToken,
      value: accessToken,
    );
    await _secureStorage.write(
      key: StorageKeys.refreshToken,
      value: refreshToken,
    );
  }

  Future<String?> getAccessToken() async {
    return await _secureStorage.read(key: StorageKeys.accessToken);
  }

  Future<void> clearTokens() async {
    await _secureStorage.delete(key: StorageKeys.accessToken);
    await _secureStorage.delete(key: StorageKeys.refreshToken);
  }

  // User storage
  Future<void> saveUser(UserModel user) async {
    final prefs = await _prefs;
    await prefs.setString(StorageKeys.user, jsonEncode(user.toJson()));
  }

  Future<UserModel?> getUser() async {
    final prefs = await _prefs;
    final userJson = prefs.getString(StorageKeys.user);
    if (userJson != null) {
      return UserModel.fromJson(jsonDecode(userJson));
    }
    return null;
  }
}
```

---

## 🎯 Error Handling

### Error Models

```dart
class ApiError {
  final int? statusCode;
  final String message;
  final String? error;

  ApiError({
    this.statusCode,
    required this.message,
    this.error,
  });

  factory ApiError.fromJson(Map<String, dynamic> json) {
    return ApiError(
      statusCode: json['statusCode'],
      message: json['message'] ?? 'An error occurred',
      error: json['error'],
    );
  }
}
```

### Error Interceptor

```dart
class ErrorInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    ApiError apiError;

    if (err.response != null) {
      apiError = ApiError.fromJson(err.response!.data);
    } else {
      apiError = ApiError(
        message: err.message ?? 'Network error',
        statusCode: err.response?.statusCode,
      );
    }

    // Handle specific error codes
    switch (err.response?.statusCode) {
      case 401:
        // Unauthorized - redirect to login
        break;
      case 403:
        // Forbidden - show error message
        break;
      case 404:
        // Not found
        break;
      case 500:
        // Server error
        break;
    }

    handler.next(err);
  }
}
```

---

**Last Updated:** November 2025  
**Version:** 1.0

