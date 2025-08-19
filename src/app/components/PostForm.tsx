'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createPost, updatePost } from '@/actions/blogActions';
import { BlogPost } from '@/lib/mockData';
import { useEffect, useRef } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PostFormProps {
  post?: BlogPost;
  onCancel?: () => void;
}

// ---- Add this type block ----
type State =
  | { error: string; success?: undefined }
  | { success: string; error?: undefined };
// ----------------------------

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full relative"
    >
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {isEdit ? 'Updating...' : 'Creating...'}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <CheckCircleIcon className="h-4 w-4" />
          {isEdit ? 'Update Post' : 'Create Post'}
        </div>
      )}
    </button>
  );
}

export default function PostForm({ post, onCancel }: PostFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const action = post ? updatePost : createPost;

  // ---- Update these lines ----
  const initialState: State = { error: "" };
  const [state, formAction] = useFormState<State, FormData>(action, initialState);
  // ---------------------------

  // Reset form on success
  useEffect(() => {
    if (state.success && !post) {
      formRef.current?.reset();
    }
    if (state.success && onCancel) {
      onCancel();
    }
  }, [state.success, post, onCancel]);

  return (
    <div className="card p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {post ? 'Edit Post' : 'New Post'}
        </h3>
        <p className="text-sm text-gray-600">
          {post ? 'Update your existing blog post' : 'Share your thoughts with the world'}
        </p>
      </div>
      
      {/* Success Message */}
      {state.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center gap-3 animate-slide-up">
          <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
          <span className="text-sm font-medium">{state.success}</span>
        </div>
      )}
      
      {/* Error Message */}
      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-3 animate-slide-up">
          <XMarkIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
          <span className="text-sm font-medium">{state.error}</span>
        </div>
      )}
      
      <form ref={formRef} action={formAction} className="space-y-6">
        {post && <input type="hidden" name="id" value={post.id} />}
        
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={post?.title}
            required
            className="input-field"
            placeholder="Enter an engaging title..."
            maxLength={200}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="block text-sm font-semibold text-gray-700">
            Author *
          </label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={post?.author}
            required
            className="input-field"
            placeholder="Your name..."
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            defaultValue={post?.content}
            required
            className="textarea-field"
            placeholder="Write your story..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Share your thoughts, insights, and experiences
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <SubmitButton isEdit={!!post} />
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <XMarkIcon className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
