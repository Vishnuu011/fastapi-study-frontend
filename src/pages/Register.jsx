import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);

  if (isAuthenticated) { navigate('/'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError('');
    try {
      await register(email, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2200);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  const EyeIcon = ({ open }) => open ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-ink p-12">
        <div>
          <div className="w-8 h-8 bg-amber-warm flex items-center justify-center">
            <span className="text-cream font-display text-sm font-bold italic">I</span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            {['Write your story.', 'Share your voice.', 'Find your readers.'].map((line, i) => (
              <p key={i} className={`font-display text-2xl font-semibold leading-tight ${i === 1 ? 'text-amber-warm italic' : 'text-cream'}`}>
                {line}
              </p>
            ))}
          </div>
          <div className="w-10 h-px bg-amber-warm/40" />
          <p className="font-body text-sm text-cream/50 leading-relaxed">
            Join a community of writers who craft stories that endure.
          </p>
        </div>
        <div className="font-mono text-xs text-cream/30 tracking-widest uppercase">
          The Inkwell © {new Date().getFullYear()}
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <div className="mb-8">
            <p className="section-label mb-3">New here?</p>
            <h1 className="font-display text-3xl font-bold text-ink">Create your account</h1>
            <p className="font-body text-ink-muted mt-2 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-warm hover:underline font-medium">Sign in</Link>
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 px-5 py-6 text-center space-y-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display text-lg font-semibold text-green-800">Account created!</p>
              <p className="font-body text-sm text-green-600">Redirecting you to sign in…</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 px-4 py-3">
                  <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-body text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="section-label">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-field"
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="section-label">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="input-field pr-12"
                      autoComplete="new-password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                    >
                      <EyeIcon open={showPass} />
                    </button>
                  </div>
                  {/* Password strength indicator */}
                  {password && (
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3].map((level) => (
                        <div key={level} className={`h-0.5 flex-1 transition-colors ${
                          password.length >= level * 4
                            ? level === 1 ? 'bg-red-400' : level === 2 ? 'bg-amber-warm' : 'bg-green-500'
                            : 'bg-cream-deep'
                        }`} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="section-label">Confirm Password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat your password"
                    className={`input-field ${confirm && confirm !== password ? 'border-red-300' : confirm && confirm === password ? 'border-green-400' : ''}`}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                      Creating account…
                    </>
                  ) : 'Create account'}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-cream-deep">
                <p className="font-mono text-xs text-ink-muted/50 text-center tracking-wide">
                  By registering, you agree to write good things.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
