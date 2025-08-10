# Sign-In API Integration Guide

## Overview

This document explains how to integrate the sign-in API into your Next.js project following atomic design principles.

## 🏗️ Architecture

### Atomic Design Structure

```
src/
├── lib/                    # API configuration & HTTP client (Atoms)
├── types/                  # TypeScript interfaces (Atoms)
├── utils/                  # Validation utilities (Molecules)
├── services/               # Authentication service (Molecules)
├── context/                # Auth context & state management (Organisms)
├── hooks/                  # Protected route hooks (Organisms)
└── components/
    └── organisms/forms/auth/  # SignInForm with API integration
```

## 🔧 Setup

### 1. Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

### 2. API Configuration

The API is configured in `src/lib/api-config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api',
  ENDPOINTS: {
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
    USER_PROFILE: '/user/profile',
    // ... more endpoints
  }
};
```

## 🚀 Usage

### Basic Sign-In

```tsx
import { useAuth } from '@/context/AuthContext';

function SignInComponent() {
  const { signIn, isLoading, error } = useAuth();

  const handleSignIn = async (credentials) => {
    try {
      await signIn(credentials);
      // User is now authenticated
    } catch (error) {
      // Handle error
    }
  };
}
```

### Protected Routes

```tsx
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

function DashboardPage() {
  const { isLoading } = useProtectedRoute({ requireAuth: true });

  if (isLoading) return <div>Loading...</div>;
  
  return <div>Protected Dashboard Content</div>;
}
```

### Authentication State

```tsx
import { useAuth } from '@/context/AuthContext';

function AppHeader() {
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </header>
  );
}
```

## 🔐 API Endpoints

### Mock API Endpoints (Development)

For development and testing, mock API endpoints are provided:

#### POST `/api/auth/signin`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123",
  "rememberMe": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin"
    },
    "token": "jwt-token",
    "refreshToken": "refresh-token",
    "expiresIn": 3600
  }
}
```

#### GET `/api/user/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

## 🧪 Testing

### Test Credentials

For the mock API, use these credentials:

- **Email:** `admin@example.com`
- **Password:** `password123`

### Form Validation

The form includes comprehensive validation:

- **Email:** Must be a valid email format
- **Password:** Required, minimum 8 characters
- **Real-time validation:** Errors clear as user types
- **Server error handling:** API errors are displayed

## 🔧 Customization

### Custom API Backend

To integrate with your own API:

1. Update `API_CONFIG.BASE_URL` in `.env.local`
2. Modify API response format in `src/services/auth.ts` if needed
3. Update TypeScript interfaces in `src/types/auth.ts`

### Form Validation

Customize validation rules in `src/utils/validation.ts`:

```typescript
export function validatePassword(password: string): string | undefined {
  // Add your custom password rules
  if (password.length < 12) {
    return 'Password must be at least 12 characters';
  }
  // ... more rules
}
```

### Styling

The form uses Tailwind CSS classes and can be customized by:

1. Modifying component classes in `SignInForm.tsx`
2. Updating atomic components (Button, Input, etc.)
3. Adding custom CSS classes

## 🔄 State Management

### Authentication Flow

1. **Initial Load:** Check for stored token
2. **Sign In:** Validate → API call → Store token → Update state
3. **Protected Routes:** Check auth state → Redirect if needed
4. **Token Refresh:** Automatic token refresh on expiry
5. **Sign Out:** Clear token → Update state → Redirect

### Error Handling

- **Network errors:** Timeout handling with retry logic
- **Validation errors:** Field-specific error messages
- **API errors:** Server error display
- **Token expiry:** Automatic refresh or redirect to sign-in

## 📱 Mobile Responsiveness

The sign-in form is fully responsive:

- **Mobile:** Single column layout
- **Tablet:** Responsive spacing and touch targets
- **Desktop:** Optimized layout with proper spacing

## 🌐 Internationalization

To add i18n support:

1. Use next-intl or react-i18next
2. Extract text strings from components
3. Add translation files for validation messages
4. Update error message display logic

## 🔒 Security Best Practices

1. **HTTPS:** Always use HTTPS in production
2. **Token Storage:** Tokens stored in localStorage (consider httpOnly cookies for production)
3. **CSRF Protection:** Implement CSRF tokens for state-changing operations
4. **Input Validation:** Both client and server-side validation
5. **Rate Limiting:** Implement on your API server

## 🚀 Production Deployment

1. Set environment variables for production API
2. Configure proper CORS settings
3. Set up SSL/TLS certificates
4. Implement proper logging and monitoring
5. Set up error tracking (Sentry, etc.)

---

## 🎯 Quick Start

1. **Copy `.env.example` to `.env.local`**
2. **Start the development server:** `npm run dev`
3. **Navigate to:** `http://localhost:3002/signin`
4. **Test with:** `admin@example.com` / `password123`

Your sign-in API integration is now complete and ready for development!
