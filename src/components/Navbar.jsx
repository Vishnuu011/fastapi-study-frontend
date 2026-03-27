import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `font-body text-sm font-medium transition-colors duration-150 ${
      isActive(path)
        ? 'text-amber-warm border-b border-amber-warm pb-0.5'
        : 'text-ink-muted hover:text-ink'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-cream-deep">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-7 h-7 bg-ink flex items-center justify-center">
              <span className="text-cream font-display text-sm font-bold italic">V</span>
            </div>
            <span className="font-display text-lg font-semibold text-ink tracking-tight group-hover:text-amber-warm transition-colors">
              The Vishnu Tech World
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={navLinkClass('/')}>Stories</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className={navLinkClass('/dashboard')}>Dashboard</Link>
            )}
          </div>

          {/* Auth Actions — Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-pale border border-amber-warm/30 flex items-center justify-center">
                    <span className="font-mono text-xs text-amber-warm font-medium uppercase">
                      {user?.email?.[0]}
                    </span>
                  </div>
                  <span className="font-body text-sm text-ink-muted truncate max-w-[140px]">
                    {user?.email}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn-ghost text-sm py-1.5 px-3">
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm py-2 px-4">Sign in</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">Get started</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-ink-muted hover:text-ink transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-cream-deep space-y-1 animate-fade-in">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block px-2 py-2.5 font-body text-sm text-ink hover:text-amber-warm transition-colors">
              Stories
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-2 py-2.5 font-body text-sm text-ink hover:text-amber-warm transition-colors">
                Dashboard
              </Link>
            )}
            <div className="pt-2 border-t border-cream-deep flex flex-col gap-2">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="text-left px-2 py-2.5 font-body text-sm text-ink-muted hover:text-ink transition-colors">
                  Sign out ({user?.email})
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-2 py-2.5 font-body text-sm text-ink hover:text-amber-warm transition-colors">
                    Sign in
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm text-center mt-1">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
