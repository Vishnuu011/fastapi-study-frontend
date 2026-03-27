import { useState, useEffect } from 'react';
import { getBlogs } from '../api/axiosClient';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlogs = async (newSkip = skip) => {
    setLoading(true);
    setError('');
    try {
      const res = await getBlogs(newSkip, limit);
      setBlogs(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load stories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(skip);
    // scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [skip]);

  const handlePageChange = (newSkip) => setSkip(newSkip);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="border-b border-cream-deep bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <p className="section-label mb-4">Welcome to The Vishnu Tech World</p>
            <h1 className="page-title mb-6">
              Stories worth<br />
              <span className="italic text-amber-warm">reading twice.</span>
            </h1>
            <p className="font-body text-ink-muted text-lg leading-relaxed">
              A curated space for writers and readers. Discover thoughtful essays,
              personal narratives, and ideas that make you pause.
            </p>
          </div>

          {/* Stats bar */}
          {total > 0 && (
            <div className="mt-10 flex items-center gap-6 pt-8 border-t border-cream-dark animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}>
              <div>
                <p className="font-display text-2xl font-bold text-ink">{total}</p>
                <p className="font-mono text-xs text-ink-muted uppercase tracking-widest">Stories</p>
              </div>
              <div className="h-8 w-px bg-cream-deep" />
              <div>
                <p className="font-display text-2xl font-bold text-ink">{Math.ceil(total / limit)}</p>
                <p className="font-mono text-xs text-ink-muted uppercase tracking-widest">Pages</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-6 space-y-3 animate-pulse">
                <div className="h-3 bg-cream-dark rounded w-1/3" />
                <div className="h-5 bg-cream-dark rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-cream-dark rounded" />
                  <div className="h-3 bg-cream-dark rounded w-5/6" />
                  <div className="h-3 bg-cream-dark rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="font-mono text-xs text-red-500 uppercase tracking-widest mb-2">Error</p>
            <p className="font-body text-ink-muted">{error}</p>
            <button onClick={() => fetchBlogs()} className="btn-secondary mt-6 text-sm">
              Try again
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-cream-deep">
            <div className="w-12 h-12 bg-cream-dark mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="section-label mb-2">No stories yet</p>
            <p className="font-body text-ink-muted text-sm">Be the first to publish something.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {blogs.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} />
              ))}
            </div>

            <div className="border-t border-cream-deep pt-6">
              <Pagination skip={skip} limit={limit} total={total} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
