import { useState, useEffect } from 'react';

export default function BlogForm({ onSubmit, initialData = null, onCancel, loading = false }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    else if (title.length > 100) errs.title = 'Title must be under 100 characters';
    if (!content.trim()) errs.content = 'Content is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    await onSubmit({ title: title.trim(), content: content.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })); }}
          placeholder="A compelling title for your story"
          maxLength={100}
          className={`input-field font-display text-lg ${errors.title ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
          disabled={loading}
        />
        <div className="flex items-center justify-between">
          {errors.title ? (
            <p className="text-red-600 text-xs font-mono">{errors.title}</p>
          ) : <span />}
          <span className="font-mono text-xs text-ink-muted/50 ml-auto">{title.length}/100</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <label className="section-label">Content</label>
        <textarea
          value={content}
          onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: '' })); }}
          placeholder="Tell your story here…"
          rows={10}
          className={`input-field resize-y min-h-[200px] font-body leading-relaxed ${errors.content ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
          disabled={loading}
        />
        {errors.content && <p className="text-red-600 text-xs font-mono">{errors.content}</p>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
              {isEditing ? 'Saving…' : 'Publishing…'}
            </>
          ) : (
            isEditing ? 'Save changes' : 'Publish story'
          )}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={loading} className="btn-secondary disabled:opacity-50">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
