import { NextRequest, NextResponse } from 'next/server';
import { mockUsers, mockCourses } from '@/data/mock';
import { generateToken, verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name, role } = body;

    if (action === 'login') {
      // Find user by email
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = generateToken(user);
      
      return NextResponse.json({
        success: true,
        data: { user, token },
      });
    }

    if (action === 'register') {
      // Check if user exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'Email already exists' },
          { status: 400 }
        );
      }

      // Create new user (mock)
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: role || 'student',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4F46E5&color=fff`,
        createdAt: new Date().toISOString(),
      };

      const token = generateToken(newUser);
      
      return NextResponse.json({
        success: true,
        data: { user: newUser, token },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = mockUsers.find(u => u.id === decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}