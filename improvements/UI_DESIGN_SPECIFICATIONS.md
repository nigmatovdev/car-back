# UI Design Specifications

## 🎨 Design Principles

### 1. Material Design 3 (Android) / Cupertino (iOS)
- Follow platform-specific design guidelines
- Use native components where possible
- Maintain consistency across screens

### 2. Color Scheme
- **Primary:** Blue (#2196F3) - Trust, reliability
- **Secondary:** Green (#4CAF50) - Success, completion
- **Accent:** Orange (#FF9800) - Action, urgency
- **Background:** Light Gray (#F5F5F5) - Clean, modern
- **Surface:** White (#FFFFFF) - Cards, containers

### 3. Typography Hierarchy
- **H1:** 32px, Bold - Page titles
- **H2:** 24px, Bold - Section headers
- **H3:** 20px, Semi-bold - Card titles
- **Body 1:** 16px, Regular - Main content
- **Body 2:** 14px, Regular - Secondary content
- **Caption:** 12px, Regular - Labels, hints

### 4. Spacing System
- **XS:** 4px
- **S:** 8px
- **M:** 16px
- **L:** 24px
- **XL:** 32px
- **XXL:** 48px

---

## 📱 Screen Designs

### Login Screen

```
┌─────────────────────────┐
│                         │
│    [App Logo]           │
│    CarWash Pro          │
│                         │
│  ┌───────────────────┐  │
│  │ Email             │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ Password        👁 │  │
│  └───────────────────┘  │
│                         │
│  [Forgot Password?]     │
│                         │
│  ┌───────────────────┐  │
│  │    LOGIN          │  │
│  └───────────────────┘  │
│                         │
│  ───────── OR ───────── │
│                         │
│  [Google] [Apple]       │
│                         │
│  Don't have account?    │
│  [Sign Up]              │
│                         │
└─────────────────────────┘
```

**Key Elements:**
- Centered logo at top
- Email and password fields with icons
- Password visibility toggle
- Primary CTA button (full width)
- Social login options
- Sign up link at bottom

---

### Home Screen

```
┌─────────────────────────┐
│ 👤 [Name]        🔔     │ ← Header
├─────────────────────────┤
│                         │
│  ┌───────────────────┐  │
│  │  [Book Now]       │  │ ← Primary CTA
│  └───────────────────┘  │
│                         │
│  Active Booking         │
│  ┌───────────────────┐  │
│  │ 🚗 Premium Wash   │  │
│  │ Washer: John      │  │
│  │ Status: En Route  │  │
│  │ [View Details]    │  │
│  └───────────────────┘  │
│                         │
│  Available Services     │
│  ┌───┐ ┌───┐ ┌───┐     │
│  │ 🧼│ │ 🧽│ │ ✨│     │ ← Horizontal scroll
│  │$25│ │$35│ │$50│     │
│  └───┘ └───┘ └───┘     │
│                         │
│  Recent Bookings        │
│  ┌───────────────────┐  │
│  │ Premium Wash      │  │
│  │ Dec 15, 2:00 PM   │  │
│  │ ✓ Completed       │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

**Key Elements:**
- Top bar with user info and notifications
- Large primary CTA button
- Active booking card (if exists)
- Horizontal scrolling service cards
- Recent bookings list

---

### Service Details Screen

```
┌─────────────────────────┐
│ ← Back          [Share]  │
├─────────────────────────┤
│                         │
│  [Service Image]        │
│  (Full width, hero)     │
│                         │
│  Premium Car Wash       │ ← Title
│  $49.99                 │ ← Price
│                         │
│  ⏱ 60 minutes           │
│                         │
│  Description:           │
│  Full exterior wash,     │
│  interior vacuum,        │
│  tire shine, and more.   │
│                         │
│  Features:              │
│  ✓ Exterior Wash        │
│  ✓ Interior Vacuum      │
│  ✓ Tire Shine           │
│  ✓ Window Cleaning      │
│                         │
│                         │
│  ┌───────────────────┐  │
│  │  Book This Service │  │ ← Fixed bottom
│  └───────────────────┘  │
└─────────────────────────┘
```

**Key Elements:**
- Hero image at top
- Large price display
- Feature checklist
- Fixed bottom CTA button

---

### Create Booking Screen (Multi-step)

**Step 1: Select Service**
```
┌─────────────────────────┐
│ ← Back    Step 1 of 4   │
├─────────────────────────┤
│                         │
│  Select Service         │
│                         │
│  ┌───────────────────┐  │
│  │ 🧼 Basic Wash     │  │
│  │ $25.99           │  │
│  │ ⏱ 30 min         │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ 🧽 Premium Wash   │  │
│  │ $49.99           │  │
│  │ ⏱ 60 min         │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  Next             │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

**Step 2: Select Date & Time**
```
┌─────────────────────────┐
│ ← Back    Step 2 of 4   │
├─────────────────────────┤
│                         │
│  Select Date            │
│  [Calendar Widget]      │
│                         │
│  Select Time            │
│  ┌───┐ ┌───┐ ┌───┐     │
│  │9AM│ │10A│ │11A│     │
│  └───┘ └───┘ └───┘     │
│  ┌───┐ ┌───┐ ┌───┐     │
│  │2PM│ │3PM│ │4PM│     │
│  └───┘ └───┘ └───┘     │
│                         │
│  ┌───────────────────┐  │
│  │  Next             │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

**Step 3: Select Location**
```
┌─────────────────────────┐
│ ← Back    Step 3 of 4   │
├─────────────────────────┤
│                         │
│  [Map View]             │
│  (Full screen)          │
│                         │
│  ┌───────────────────┐  │
│  │ 📍 Current Location│  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ 🔍 Search Address │  │
│  └───────────────────┘  │
│                         │
│  Selected:              │
│  123 Main St, City      │
│                         │
│  ┌───────────────────┐  │
│  │  Next             │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

**Step 4: Review & Confirm**
```
┌─────────────────────────┐
│ ← Back    Step 4 of 4   │
├─────────────────────────┤
│                         │
│  Review Booking         │
│                         │
│  Service:                │
│  Premium Car Wash        │
│  $49.99                 │
│                         │
│  Date & Time:           │
│  Dec 20, 2024           │
│  2:00 PM                │
│                         │
│  Location:              │
│  123 Main St            │
│  City, State            │
│                         │
│  ───────────────────    │
│  Total: $49.99          │
│                         │
│  ┌───────────────────┐  │
│  │  Confirm Booking  │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

---

### Live Tracking Screen

```
┌─────────────────────────┐
│ ← Back                  │
├─────────────────────────┤
│                         │
│  [Full Screen Map]      │
│                         │
│  🚗 Washer Location     │
│  👤 Your Location       │
│  ─── Route Line ───     │
│                         │
│                         │
│                         │
│                         │
│  ┌───────────────────┐  │
│  │ 🚗 John Doe       │  │ ← Bottom sheet
│  │ En Route          │  │
│  │ ETA: 5 min        │  │
│  │ [Call] [Message]  │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

**Key Elements:**
- Full-screen map
- Animated markers
- Route visualization
- Bottom sheet with washer info
- ETA display

---

### Booking Details Screen

```
┌─────────────────────────┐
│ ← Back          [Share] │
├─────────────────────────┤
│                         │
│  Booking #12345         │
│  [Status Badge]         │
│                         │
│  Service                 │
│  ┌───────────────────┐  │
│  │ [Service Image]   │  │
│  │ Premium Wash      │  │
│  │ $49.99            │  │
│  └───────────────────┘  │
│                         │
│  Details                 │
│  📅 Dec 20, 2024        │
│  ⏰ 2:00 PM              │
│  📍 123 Main St         │
│                         │
│  Washer                  │
│  ┌───────────────────┐  │
│  │ [Photo] John Doe  │  │
│  │ ⭐ 4.8            │  │
│  │ [Contact]         │  │
│  └───────────────────┘  │
│                         │
│  Payment                 │
│  Status: Paid            │
│  Amount: $49.99          │
│                         │
│  Timeline                │
│  ✓ Booking Created      │
│  ✓ Washer Assigned      │
│  → En Route             │
│  ⏳ Arrived              │
│  ⏳ In Progress         │
│  ⏳ Completed           │
│                         │
└─────────────────────────┘
```

---

## 🎯 Component Specifications

### Buttons

**Primary Button:**
- Height: 56px
- Border radius: 12px
- Background: Primary color
- Text: White, 16px, Semi-bold
- Shadow: Elevation 2

**Secondary Button:**
- Height: 56px
- Border radius: 12px
- Background: Transparent
- Border: 2px, Primary color
- Text: Primary color, 16px, Semi-bold

**Icon Button:**
- Size: 48x48px
- Circular
- Icon: 24px
- Background: Surface color

---

### Cards

**Service Card:**
- Width: 160px
- Height: 200px
- Border radius: 16px
- Shadow: Elevation 1
- Image: Top, 120px height
- Content: Title, Price, Duration
- CTA: "Book" button

**Booking Card:**
- Full width minus padding
- Border radius: 12px
- Shadow: Elevation 1
- Padding: 16px
- Status badge: Top right
- Action button: Bottom

---

### Input Fields

**Text Field:**
- Height: 56px
- Border radius: 8px
- Border: 1px, Divider color
- Padding: 16px
- Label: Above field, 12px
- Hint: Below field, 12px, Secondary color

**Password Field:**
- Same as text field
- Toggle visibility icon: Right side

---

### Status Badges

**Colors:**
- Pending: Gray
- Assigned: Blue
- En Route: Orange
- Arrived: Purple
- In Progress: Yellow
- Completed: Green
- Cancelled: Red

**Style:**
- Height: 24px
- Border radius: 12px
- Padding: 4px 12px
- Text: 12px, Semi-bold, White

---

## 📐 Layout Guidelines

### Screen Margins
- Horizontal: 16px
- Vertical: 8px (between sections)

### Card Spacing
- Between cards: 12px
- Card padding: 16px

### Button Spacing
- Between buttons: 8px
- From edges: 16px

---

## 🌙 Dark Mode Support

### Color Adjustments
- Background: Dark gray (#121212)
- Surface: Darker gray (#1E1E1E)
- Text: Light gray (#FFFFFF)
- Primary: Lighter blue (#64B5F6)

### Implementation
- Use ThemeData for light/dark themes
- Support system preference
- Manual toggle in settings

---

## ♿ Accessibility

### Requirements
- Minimum touch target: 48x48px
- Color contrast: WCAG AA compliant
- Screen reader support
- Font scaling support
- High contrast mode support

### Implementation
- Semantic labels
- Focus indicators
- Keyboard navigation
- Voice over support

---

**Last Updated:** November 2025  
**Version:** 1.0

