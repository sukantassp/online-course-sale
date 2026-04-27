import { NextRequest, NextResponse } from 'next/server';
import { mockCourses, mockReviews, getReviewsByCourseId } from '@/data/mock';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');

    // Get single course by ID
    if (id) {
      const course = mockCourses.find(c => c.id === id);
      if (!course) {
        return NextResponse.json(
          { success: false, error: 'Course not found' },
          { status: 404 }
        );
      }
      const reviews = getReviewsByCourseId(id);
      return NextResponse.json({
        success: true,
        data: { course, reviews },
      });
    }

    // Filter courses
    let courses = [...mockCourses];

    if (category) {
      courses = courses.filter(c => c.category === category);
    }

    if (level) {
      courses = courses.filter(c => c.level === level);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      courses = courses.filter(
        c =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower) ||
          c.tags.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    return NextResponse.json({
      success: true,
      data: { courses, total: courses.length },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, shortDescription, thumbnail, price, category, level, tags, instructorId } = body;

    // Validate required fields
    if (!title || !description || !price || !category || !instructorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new course (mock)
    const newCourse = {
      id: `course-${Date.now()}`,
      title,
      description,
      shortDescription: shortDescription || description.slice(0, 100),
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      price: parseFloat(price),
      category,
      level: level || 'beginner',
      rating: 0,
      reviewCount: 0,
      studentCount: 0,
      instructorId,
      modules: [],
      tags: tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: { course: newCourse },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}