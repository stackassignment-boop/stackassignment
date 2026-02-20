'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  category: string | null;
  createdAt: string;
  viewCount: number;
  author: {
    name: string | null;
  };
}

interface BlogPageProps {
  onNavigate?: (page: string, params?: Record<string, string>) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?limit=20');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-indigo-500 to-purple-600',
      'from-blue-500 to-cyan-600',
      'from-emerald-500 to-teal-600',
      'from-pink-500 to-rose-600',
      'from-amber-500 to-orange-600',
      'from-violet-500 to-purple-600',
    ];
    return gradients[index % gradients.length];
  };

  const handleBlogClick = (slug: string) => {
    if (onNavigate) {
      onNavigate('blog-detail', { slug });
    }
  };

  if (loading) {
    return (
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="animate-pulse h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded-lg w-96 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6 bg-white rounded-b-2xl">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Writing Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Practical tips, guides, referencing help, study strategies and updates for students
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No Blog Posts Yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Check back soon for new articles!</p>
          </div>
        ) : (
          <>
            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {blogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleBlogClick(blog.slug)}
                >
                  {/* Header image */}
                  {blog.featuredImage ? (
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${blog.featuredImage})` }}
                    />
                  ) : (
                    <div className={`h-48 bg-gradient-to-br ${getGradient(index)}`} />
                  )}

                  {/* Content */}
                  <div className="p-6 md:p-7">
                    <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                      {blog.category || 'General'} • {formatDate(blog.createdAt)}
                    </div>
                    <h2 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">
                      {blog.excerpt || 'Click to read more...'}
                    </p>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                      Read full article →
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {blogs.length >= 20 && (
              <div className="text-center mt-12 md:mt-16">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition shadow-md">
                  Load More Articles
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
