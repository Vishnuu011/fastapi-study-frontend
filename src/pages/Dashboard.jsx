import { useState, useEffect, useCallback } from 'react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import BlogForm from '../components/BlogForm';

export default function Dashboard() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('list'); // 'list' | 'create' | 'edit'
  const [editTarget, setEditTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState('');
  const limit = 6;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchBlogs = useCallback(async (s = 0) => {
    setLoading(true);
    setError('');
    try {
      const res = await getBlogs(s, limit);
      setBlogs(res.data.items);
      setTotal(res.data.total);
    } catch {
      setError('Failed to load stories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(skip);
  }, [skip]);

  const handleCreate = async (data) => {
    setFormLoading(true);
    setFormError('');
    try {
      await createBlog(data);
      setMode('list');
      setSkip(0);
      await fetchBlogs(0);
      showToast('Story published successfully!');
    } catch (err) {
      setFormError(err.response?.data?.detail || 'Failed to create story.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    setFormLoading(true);
    setFormError('');
    try {
      await updateBlog(editTarget.id, data);
      setMode('list');
      setEditTarget(null);
      await fetchBlogs(skip);
      showToast('Story updated successfully!');
    } catch (err) {
      setFormError(err.response?.data?.detail || 'Failed to update story.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteBlog(deleteConfirm.id);
      setDeleteConfirm(null);
      await fetchBlogs(skip);
      showToast('Story deleted.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete story.');
      setDeleteConfirm(null);
    }
  };

  const startEdit = (blog) => {
    setEditTarget(blog);
    setMode('edit');
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelForm = () => {
    setMode('list');
    setEditTarget(null);
    setFormError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-ink text-cream px-5 py-3 font-body text-sm flex items-center gap-3 animate-slide-in shadow-lg">
          <svg className="w-4 h-4 text-amber-warm shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {toast}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-cream-deep p-6 max-w-sm w-full animate-fade-up shadow-xl" style={{ animationFillMode: 'forwards' }}>
            <div className="w-10 h-10 bg-red-50 border border-red-200 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold text-ink mb-1">Delete this story?</h3>
            <p className="font-body text-sm text-ink-muted mb-5">
              <span className="font-medium text-ink">"{deleteConfirm.title}"</span> will be permanently removed and cannot be recovered.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteConfirmed}
                className="flex-1 bg-red-600 text-white font-body text-sm font-medium py-2.5 hover:bg-red-700 transition-colors"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn-secondary text-sm justify-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-cream-deep">
        <div>
          <p className="section-label mb-1.5">Your workspace</p>
          <h1 className="font-display text-3xl font-bold text-ink">Dashboard</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-5 h-5 rounded-full bg-amber-pale border border-amber-warm/30 flex items-center justify-center">
              <span className="font-mono text-[10px] text-amber-warm font-medium uppercase">
                {user?.email?.[0]}
              </span>
            </div>
            <p className="font-body text-sm text-ink-muted">{user?.email}</p>
          </div>
        </div>
        {mode === 'list' && (
          <button
            onClick={() => { setMode('create'); setFormError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="btn-primary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New story
          </button>
        )}
      </div>

      {/* Create / Edit form */}
      {(mode === 'create' || mode === 'edit') && (
        <div className="mb-10 bg-white border border-cream-deep p-6 md:p-8 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-cream-dark">
            <div>
              <p className="section-label mb-1">
                {mode === 'create' ? 'New story' : 'Editing'}
              </p>
              <h2 className="font-display text-xl font-semibold text-ink">
                {mode === 'create' ? 'Write something new' : editTarget?.title}
              </h2>
            </div>
            <button
              onClick={cancelForm}
              className="p-2 text-ink-muted hover:text-ink transition-colors"
              title="Cancel"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {formError && (
            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 px-4 py-3">
              <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-body text-sm text-red-700">{formError}</p>
            </div>
          )}

          <BlogForm
            onSubmit={mode === 'create' ? handleCreate : handleUpdate}
            initialData={mode === 'edit' ? editTarget : null}
            onCancel={cancelForm}
            loading={formLoading}
          />
        </div>
      )}

      {/* Stories list */}
      {mode === 'list' && (
        <>
          {error && (
            <div className="bg-red-50 border border-red-200 px-4 py-3 mb-6 flex items-center gap-3">
              <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-body text-sm text-red-700">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card p-6 space-y-3 animate-pulse">
                  <div className="h-3 bg-cream-dark rounded w-1/3" />
                  <div className="h-5 bg-cream-dark rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-cream-dark rounded" />
                    <div className="h-3 bg-cream-dark rounded w-4/5" />
                  </div>
                  <div className="h-3 bg-cream-dark rounded w-1/4 mt-2" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-cream-deep">
              <div className="w-14 h-14 bg-cream-dark mx-auto mb-5 flex items-center justify-center">
                <svg className="w-7 h-7 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <p className="section-label mb-2">No stories yet</p>
              <p className="font-body text-ink-muted text-sm mb-6">
                Your published stories will appear here.
              </p>
              <button
                onClick={() => setMode('create')}
                className="btn-primary text-sm"
              >
                Write your first story
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <p className="font-mono text-xs text-ink-muted">
                  {total} {total === 1 ? 'story' : 'stories'} total
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {blogs.map((blog, i) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={i}
                    isOwner={true}
                    onEdit={startEdit}
                    onDelete={(b) => setDeleteConfirm(b)}
                  />
                ))}
              </div>

              {/* Simple prev/next pagination */}
              {total > limit && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream-deep">
                  <button
                    onClick={() => setSkip(Math.max(0, skip - limit))}
                    disabled={skip === 0}
                    className="btn-secondary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <span className="font-mono text-xs text-ink-muted">
                    Page {Math.floor(skip / limit) + 1} of {Math.ceil(total / limit)}
                  </span>
                  <button
                    onClick={() => setSkip(skip + limit)}
                    disabled={skip + limit >= total}
                    className="btn-secondary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
