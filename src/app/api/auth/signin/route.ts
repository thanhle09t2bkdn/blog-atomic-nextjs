import { NextRequest, NextResponse } from 'next/server';

// Mock user data for development
const MOCK_USER = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
  avatar: '/images/user/user-01.png',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const MOCK_TOKEN = 'mock-jwt-token-for-development';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication logic
    if (email === 'admin@example.com' && password === 'password123') {
      return NextResponse.json({
        success: true,
        data: {
          user: MOCK_USER,
          token: MOCK_TOKEN,
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600,
        },
        message: 'Sign in successful',
      });
    }

    // Invalid credentials
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid email or password',
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
