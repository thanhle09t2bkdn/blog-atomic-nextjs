import { NextRequest, NextResponse } from 'next/server';

// Mock user data
const MOCK_USER = {
  id: '1',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
  avatar: '/images/user/user-01.png',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  try {
    // Check for authorization header
    const authorization = request.headers.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authorization token required',
        },
        { status: 401 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return user profile
    return NextResponse.json({
      success: true,
      data: MOCK_USER,
      message: 'User profile retrieved successfully',
    });
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
