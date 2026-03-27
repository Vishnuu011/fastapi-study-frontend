import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogs } from '../api/axiosClient';

function formatDate(ds) {
  return new Date(ds).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function estimateReadTime(content) {
  const words = content?.split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError('');
      try {
        // The API doesn't expose GET /blogs/:id, so we paginate until we find it
        let found = null;
        let skip = 0;
        const limit = 50;

        while (true) {
          const res = await getBlogs(skip, limit);
          found = res.data.items.find((b) => b.id === parseInt(id, 10));
          if (found || !res.data.has_more) break;
          skip += limit;
        }

        if (found) setBlog(found);
        else setError('Story not found. It may have been removed.');
      } catch {
        setError('Failed to load story. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-xs text-ink-muted tracking-widest uppercase">Loading story</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-12 h-12 bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="section-label mb-2">Something went wrong</p>
        <p className="font-body text-ink-muted mb-6">{error}</p>
        <Link to="/" className="btn-secondary text-sm">← Back to stories</Link>
      </div>
    );
  }

  const readTime = estimateReadTime(blog.content);
  const paragraphs = blog.content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero area */}
      <div className="border-b border-cream-deep bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-10 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-body text-sm text-ink-muted hover:text-ink transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All stories
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="section-label">{formatDate(blog.created_at)}</span>
            <span className="text-cream-deep">·</span>
            <span className="font-mono text-xs text-ink-muted">{readTime} min read</span>
            {blog.updated_at !== blog.created_at && (
              <>
                <span className="text-cream-deep">·</span>
                <span className="font-mono text-xs text-ink-muted/60">
                  Updated {formatDate(blog.updated_at)}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-[1.15] tracking-tight">
            {blog.title}
          </h1>

          {/* Slug */}
          <div className="mt-5 flex items-center gap-2">
            <div className="w-5 h-px bg-amber-warm" />
            <span className="font-mono text-xs text-ink-muted/50 tracking-wide">/{blog.slug}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-12 animate-fade-up"
        style={{ animationDelay: '0.15s', animationFillMode: 'forwards', opacity: 0 }}
      >
        {paragraphs.length > 0 ? (
          <div className="space-y-5">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-body text-ink/85 leading-[1.9] text-[1.0625rem]"
              >
                {para.trim()}
              </p>
            ))}
          </div>
        ) : (
          <p className="font-body text-ink/85 leading-[1.9] text-[1.0625rem] whitespace-pre-wrap">
            {blog.content}
          </p>
        )}

        {/* Footer */}
        <div className="mt-14 pt-8 border-t border-cream-deep flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cream-dark flex items-center justify-center">
              <svg className="w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-xs text-ink-muted/50 uppercase tracking-widest">Author</p>
              <p className="font-body text-sm text-ink font-medium">{blog.author_id}</p>
            </div>
          </div>
          <Link to="/" className="btn-ghost text-sm">
            ← More stories
          </Link>
        </div>
      </div>
    </div>
  );
}
