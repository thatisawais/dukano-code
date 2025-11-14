# Next.js 14 Authentication System

A complete, production-ready authentication system for Next.js 14 with App Router, featuring JWT-based authentication, secure HTTP-only cookies, and automatic token refresh.

## 🚀 Features

- ✅ **Next.js 14 App Router** - Modern Next.js architecture
- ✅ **TypeScript** - Full type safety
- ✅ **Redux Toolkit** - Global state management for auth
- ✅ **JWT Authentication** - Access token + Refresh token
- ✅ **Secure Cookies** - HTTP-only cookies for refresh tokens
- ✅ **Prisma ORM** - Type-safe database queries
- ✅ **PostgreSQL** - Production-ready database
- ✅ **bcrypt** - Secure password hashing
- ✅ **Route Protection** - Middleware + HOC protection
- ✅ **Auto Token Refresh** - Seamless token renewal
- ✅ **Clean Architecture** - Scalable folder structure

## 📁 Project Structure

```
dukano-code/
├── app/
│   ├── api/auth/           # Authentication API routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── refresh/
│   │   ├── logout/
│   │   └── me/
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── dashboard/          # Protected dashboard
│   └── layout.tsx          # Root layout with providers
├── components/
│   └── auth/
│       ├── AuthProvider.tsx    # Auto-refresh token logic
│       └── withAuth.tsx        # HOC for protected components
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── jwt.ts              # JWT utility functions
│   └── redux/
│       ├── store.ts        # Redux store configuration
│       ├── hooks.ts        # Typed Redux hooks
│       ├── provider.tsx    # Redux Provider component
│       └── features/
│           └── authSlice.ts    # Auth state management
├── prisma/
│   └── schema.prisma       # Database schema
├── middleware.ts           # Route protection middleware
└── .env.local             # Environment variables
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dukano_db?schema=public"

# JWT Secrets (Generate strong random strings for production)
JWT_ACCESS_SECRET="your-super-secret-access-token-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-token-key-change-this-in-production"

# JWT Expiration Times
JWT_ACCESS_EXPIRATION="15m"  # 15 minutes
JWT_REFRESH_EXPIRATION="7d"  # 7 days

# Application
NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Set Up PostgreSQL Database

Install PostgreSQL if not already installed:

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 4. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE dukano_db;

# Create user (optional)
CREATE USER dukano_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dukano_db TO dukano_user;

# Exit
\q
```

### 5. Initialize Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

### 6. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Flow

### Registration Flow

1. User submits signup form (`/signup`)
2. API validates input and checks for existing user
3. Password is hashed with bcrypt (12 rounds)
4. User is created in database
5. Access token (15min) and refresh token (7 days) are generated
6. Refresh token is stored in database
7. Access token is sent in response body
8. Refresh token is set as HTTP-only cookie
9. User data and access token are stored in Redux
10. User is redirected to dashboard

### Login Flow

1. User submits login form (`/login`)
2. API validates credentials
3. Password is verified with bcrypt
4. Access token and refresh token are generated
5. Refresh token is stored in database
6. Access token is sent in response body
7. Refresh token is set as HTTP-only cookie
8. User data and access token are stored in Redux
9. User is redirected to dashboard

### Auto Token Refresh

The `AuthProvider` component automatically:
- Attempts to refresh token on app mount
- Sets up interval to refresh token every 14 minutes
- Keeps user logged in as long as refresh token is valid

### Logout Flow

1. User clicks logout
2. API deletes refresh token from database
3. HTTP-only cookie is cleared
4. Redux state is cleared
5. User is redirected to login page

## 🛡️ Security Features

### Password Security
- Passwords hashed with bcrypt (12 rounds)
- Minimum 6 characters required
- Never stored in plain text

### Token Security
- **Access Token**: Short-lived (15 minutes), stored in Redux
- **Refresh Token**: Long-lived (7 days), stored in HTTP-only cookie
- Tokens signed with separate secrets
- Refresh tokens stored in database for revocation

### Cookie Security
- HTTP-only flag (prevents XSS attacks)
- Secure flag in production (HTTPS only)
- SameSite: Lax (prevents CSRF attacks)

### Route Protection
- **Middleware**: Server-side route protection
- **withAuth HOC**: Client-side component protection
- Automatic redirects for unauthorized access

## 📡 API Endpoints

### POST `/api/auth/register`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST `/api/auth/login`
Authenticate a user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST `/api/auth/refresh`
Refresh access token using refresh token from cookie.

**Response:**
```json
{
  "message": "Token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### POST `/api/auth/logout`
Logout user and invalidate refresh token.

**Response:**
```json
{
  "message": "Logout successful"
}
```

### GET `/api/auth/me`
Get current authenticated user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🎯 Usage Examples

### Protected Page (Server Component)

Protected by middleware automatically:

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Protected Dashboard</h1>
    </div>
  );
}
```

### Protected Component (Client Component)

```tsx
'use client';

import { withAuth } from '@/components/auth/withAuth';
import { useAppSelector } from '@/lib/redux/hooks';

function ProfileComponent() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}

export default withAuth(ProfileComponent);
```

### Making Authenticated API Calls

```tsx
'use client';

import { useAppSelector } from '@/lib/redux/hooks';

export function useAuthFetch() {
  const { accessToken } = useAppSelector((state) => state.auth);

  const authFetch = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return authFetch;
}
```

### Logout Functionality

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/redux/hooks';
import { logout } from '@/lib/redux/features/authSlice';

export function LogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      dispatch(logout());
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
```

## 🔧 Customization

### Modify Token Expiration

Edit `.env.local`:

```bash
JWT_ACCESS_EXPIRATION="30m"  # 30 minutes
JWT_REFRESH_EXPIRATION="30d" # 30 days
```

### Add Protected Routes

Edit `middleware.ts`:

```typescript
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/admin',  // Add your route
];
```

### Add User Roles

Edit `prisma/schema.prisma`:

```prisma
enum Role {
  USER
  ADMIN
  MODERATOR
  SUPER_ADMIN  // Add your role
}
```

Then run:
```bash
npx prisma migrate dev --name add_super_admin_role
```

## 🧪 Testing

### Test User Registration

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Test User Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Token Refresh

```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Cookie: refreshToken=<your_refresh_token>"
```

## 🚀 Production Deployment

### 1. Update Environment Variables

Set strong secrets:

```bash
JWT_ACCESS_SECRET="$(openssl rand -base64 32)"
JWT_REFRESH_SECRET="$(openssl rand -base64 32)"
```

### 2. Update Database URL

Use production PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://user:password@your-db-host:5432/production_db?schema=public"
```

### 3. Run Migrations

```bash
npx prisma migrate deploy
```

### 4. Build Application

```bash
npm run build
```

### 5. Start Production Server

```bash
npm start
```

## 📚 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Styling**: Tailwind CSS

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify connection string in .env.local
DATABASE_URL="postgresql://..."
```

### Prisma Client Not Found

```bash
# Regenerate Prisma Client
npx prisma generate
```

### Token Refresh Not Working

- Check that HTTP-only cookie is being set
- Verify `JWT_REFRESH_SECRET` is consistent
- Check browser DevTools > Application > Cookies

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for the Next.js community**
