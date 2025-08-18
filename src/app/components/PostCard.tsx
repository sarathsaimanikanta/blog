'use client';

import { deletePost } from '@/actions/blogActions';
import { BlogPost } from '@/lib/mockData';
import { useState, useTransition } from 'react';
import { PencilIcon, TrashIcon, UserIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface PostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
}

export default function PostCard({ post, onEdit }: PostCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    startTransition(async () => {
      try {
        await deletePost(post.id);
      } catch (error) {
        alert('Failed to delete post. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  return (
    <article className="card p-6 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatRelativeTime(post.createdAt)}</span>
            </div>
            {post.updatedAt !== post.createdAt && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span className="italic text-amber-600">Updated {formatRelativeTime(post.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Preview */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed line-clamp-3">
          {post.content}
        </p>
        {post.content.length > 200 && (
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 transition-colors">
            Read more...
          </button>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(post)}
            disabled={isDeleting || isPending}
            className="btn-warning text-sm flex items-center gap-2"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting || isPending}
            className="btn-danger text-sm flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              <>
                <TrashIcon className="h-4 w-4" />
                Delete
              </>
            )}
          </button>
        </div>
        
        {/* Reading time estimate */}
        <div className="text-xs text-gray-500">
          {Math.ceil(post.content.split(' ').length / 200)} min read
        </div>
      </div>
    </article>
  );
}
