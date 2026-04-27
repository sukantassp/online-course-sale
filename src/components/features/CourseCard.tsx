import React from 'react';
import Link from 'next/link';
import { Course } from '@/types';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { formatCurrency, formatDuration, getCourseDuration } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const totalDuration = getCourseDuration(course);

  return (
    <Link href={`/courses/${course.id}`}>
      <Card hover className="overflow-hidden h-full">
        {/* Thumbnail */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="default">{course.category}</Badge>
          </div>
          {course.modules[0]?.lessons.some(l => l.isPreview) && (
            <div className="absolute top-3 right-3">
              <Badge variant="success">Free Preview</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">
            {course.shortDescription}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar src={course.instructor?.avatar} name={course.instructor?.name} size="sm" />
            <span className="text-sm text-slate-600">{course.instructor?.name}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rating rating={course.rating} size="sm" showValue />
              <span className="text-xs text-slate-500">({course.reviewCount})</span>
            </div>
            <div className="text-sm text-slate-500">
              {formatDuration(totalDuration)}
            </div>
          </div>

          {/* Price & Students */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(course.price)}
            </span>
            <span className="text-sm text-slate-500">
              {course.studentCount.toLocaleString()} students
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default CourseCard;