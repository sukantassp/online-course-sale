'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/features/CourseCard';
import { Badge } from '@/components/ui/Badge';
import { mockCourses } from '@/data/mock';
import { features } from '@/config/features';

export default function HomePage() {
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <Badge variant="info" className="mb-4">Interactive Learning Platform</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build Your Career
              <span className="text-secondary"> in Education</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              EduVerse is the only platform where you can interact with instructors, 
              ask questions, and join live sessions BEFORE purchasing any course.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses">
                <Button size="lg">Explore Courses</Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className='text-secondary border-secondary'>Become an Instructor</Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div>
                <div className="text-3xl font-bold text-secondary">6+</div>
                <div className="text-slate-400">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">10K+</div>
                <div className="text-slate-400">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-slate-400">Instructors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">4.8</div>
                <div className="text-slate-400">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose EduVerse?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our unique approach to online education sets us apart from traditional platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pre-purchase Interaction */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Pre-Purchase Interaction</h3>
              <p className="text-slate-600">
                Chat with instructors and ask questions before buying. Experience the teaching style firsthand.
              </p>
            </div>

            {/* Real-time Chat */}
            {features.enableChat && (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Real-time Chat</h3>
                <p className="text-slate-600">
                  Connect with instructors and fellow students through our WebSocket-powered chat system.
                </p>
              </div>
            )}

            {/* Live Sessions */}
            {features.enableLiveSession && (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Live Video Sessions</h3>
                <p className="text-slate-600">
                  Join live Q&A sessions and workshops. Even preview them before purchasing a course.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-background">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Featured Courses
              </h2>
              <p className="text-slate-600">Handpicked courses to kickstart your learning journey</p>
            </div>
            <Link href="/courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on EduVerse. 
            Interact before you buy - experience the difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary">Sign Up Free</Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="border-white text-secondary hover:bg-white hover:text-secondary">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}