import { getPosts } from '@/actions/blogActions';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Blog Manager
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create, edit, and manage your blog posts with ease
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Post Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <PlusIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Create Post</h2>
              </div>
              <PostForm />
            </div>
          </div>
          
          {/* Posts List Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DocumentTextIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Recent Posts
                  </h2>
                  <p className="text-sm text-gray-600">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  Live from MongoDB Atlas
                </div>
              </div>
            </div>
            <PostList posts={posts} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            Built with Next.js 14 & Payload CMS • Powered by MongoDB Atlas
          </p>
        </div>
      </footer>
    </div>
  );
}
