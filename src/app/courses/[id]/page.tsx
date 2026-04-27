'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockCourses, mockReviews, getReviewsByCourseId } from '@/data/mock';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Tabs } from '@/components/ui/Tabs';
import { formatCurrency, formatDate, formatDuration, getCourseDuration } from '@/lib/utils';
import { features } from '@/config/features';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const course = mockCourses.find(c => c.id === params.id);
  const reviews = course ? getReviewsByCourseId(course.id) : [];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalDuration = getCourseDuration(course);
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    // Mock purchase
    alert('Course enrolled successfully! (Mock payment)');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
    { id: 'instructor', label: 'Instructor' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex gap-2 mb-4">
                <Badge variant="info">{course.category}</Badge>
                <Badge variant="default" className="capitalize">{course.level}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-slate-300 mb-6">{course.shortDescription}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Rating rating={course.rating} showValue />
                  <span className="text-slate-300">({course.reviewCount} reviews)</span>
                </div>
                <div className="text-slate-300">
                  <span className="font-medium text-white">{course.studentCount.toLocaleString()}</span> students
                </div>
                <div className="text-slate-300">
                  {formatDuration(totalDuration)} total
                </div>
                <div className="text-slate-300">
                  {totalLessons} lessons
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <Avatar src={course.instructor?.avatar} name={course.instructor?.name} size="lg" />
                <div>
                  <p className="text-sm text-slate-400">Created by</p>
                  <p className="font-medium">{course.instructor?.name}</p>
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white/10 backdrop-blur border border-white/20">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="text-3xl font-bold mb-4">
                  {formatCurrency(course.price)}
                </div>

                <Button onClick={handleEnroll} className="w-full mb-3" size="lg">
                  {isAuthenticated ? 'Enroll Now' : 'Sign in to Enroll'}
                </Button>

                {features.enableChat && (
                  <Link href={`/chat?course=${course.id}`} className="block">
                    <Button variant="outline" className="w-full">
                      Ask a Question
                    </Button>
                  </Link>
                )}

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDuration(totalDuration)} of content
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {course.modules.length} modules
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Full lifetime access
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                    Certificate of completion
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About this course</h2>
              <p className="text-slate-600 whitespace-pre-line">{course.description}</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What you&apos;ll learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Build real-world projects', 'Master modern technologies', 'Best practices and patterns', 'Deployment and scaling'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map(tag => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Course Content</h2>
                <p className="text-slate-600">{course.modules.length} modules • {totalLessons} lessons • {formatDuration(totalDuration)}</p>
              </div>

              <div className="space-y-3">
                {course.modules.map(module => (
                  <div key={module.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className={`w-5 h-5 text-slate-500 transition-transform ${expandedModule === module.id ? 'rotate-90' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="font-medium text-slate-900">{module.title}</span>
                      </div>
                      <span className="text-sm text-slate-500">{module.lessons.length} lessons</span>
                    </button>

                    {expandedModule === module.id && (
                      <div className="border-t border-slate-200">
                        {module.lessons.map(lesson => (
                          <div key={lesson.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                            <div className="flex items-center gap-3">
                              {lesson.isPreview ? (
                                <Badge variant="success">Free</Badge>
                              ) : (
                                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                </svg>
                              )}
                              <span className="text-slate-700">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-slate-500">{lesson.duration}min</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900">{course.rating}</div>
                  <Rating rating={course.rating} className="mt-2" />
                  <p className="text-sm text-slate-500 mt-1">{course.reviewCount} reviews</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map(stars => {
                    const count = Math.floor(Math.random() * 50) + 10;
                    const percentage = (count / course.reviewCount) * 100;
                    return (
                      <div key={stars} className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-600 w-8">{stars} ★</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="text-sm text-slate-500 w-12">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <div key={review.id} className="border-b border-slate-200 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar src={review.user?.avatar} name={review.user?.name} size="md" />
                        <div>
                          <p className="font-medium text-slate-900">{review.user?.name}</p>
                          <p className="text-sm text-slate-500">{formatDate(review.createdAt)}</p>
                        </div>
                        <Rating rating={review.rating} size="sm" className="ml-auto" />
                      </div>
                      <p className="text-slate-600">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-8">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          )}

          {/* Instructor Tab */}
          {activeTab === 'instructor' && (
            <div className="max-w-3xl">
              <div className="flex items-start gap-6">
                <Avatar src={course.instructor?.avatar} name={course.instructor?.name} size="xl" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{course.instructor?.name}</h2>
                  <p className="text-primary font-medium mb-2">Instructor</p>
                  <p className="text-slate-600">{course.instructor?.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}