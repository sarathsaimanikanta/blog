'use client';

import { BlogPost } from '@/lib/mockData';
import { useState } from 'react';
import PostCard from './PostCard';
import PostForm from './PostForm';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface PostListProps {
  posts: BlogPost[];
}

export default function PostList({ posts }: PostListProps) {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  if (editingPost) {
    return (
      <div className="space-y-6">
        <PostForm 
          post={editingPost} 
          onCancel={() => setEditingPost(null)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <DocumentTextIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            Create your first blog post using the form on the left to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard 
                post={post} 
                onEdit={setEditingPost}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
