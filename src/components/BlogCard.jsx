import { Link } from 'react-router-dom';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function estimateReadTime(content) {
  const words = content?.split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogCard({ blog, index = 0, onEdit, onDelete, isOwner = false }) {
  const preview = blog.content?.slice(0, 180) + (blog.content?.length > 180 ? '…' : '');
  const readTime = estimateReadTime(blog.content);
  const delay = index < 6 ? `stagger-${Math.min(index + 1, 5)}` : '';

  return (
    <article
      className={`card p-6 flex flex-col gap-4 animate-fade-up opacity-0 ${delay}`}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Top meta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="section-label">{formatDate(blog.created_at)}</span>
          <span className="text-cream-deep">·</span>
          <span className="font-mono text-xs text-ink-muted">{readTime} min read</span>
        </div>
        {isOwner && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(blog)}
              className="p-1.5 text-ink-muted hover:text-amber-warm transition-colors"
              title="Edit blog"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(blog)}
              className="p-1.5 text-ink-muted hover:text-red-600 transition-colors"
              title="Delete blog"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <Link to={`/blog/${blog.id}`} className="group">
        <h2 className="font-display text-xl font-semibold text-ink leading-snug group-hover:text-amber-warm transition-colors">
          {blog.title}
        </h2>
      </Link>

      {/* Preview */}
      <p className="prose-content text-sm line-clamp-3">{preview}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-cream-dark">
        <span className="font-mono text-xs text-ink-muted/60 tracking-wide">/{blog.slug}</span>
        <Link
          to={`/blog/${blog.id}`}
          className="font-body text-xs font-medium text-amber-warm hover:text-amber-warm/70 transition-colors flex items-center gap-1"
        >
          Read more
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
