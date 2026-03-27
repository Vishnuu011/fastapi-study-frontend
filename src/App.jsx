import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BlogDetail from './pages/BlogDetail';
import ProtectedRoute from './routes/ProtectedRoute';

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-xs text-amber-warm uppercase tracking-[0.2em] mb-3">404</p>
        <h1 className="font-display text-5xl font-bold text-ink mb-4">Page not found</h1>
        <p className="font-body text-ink-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn-primary text-sm">← Back home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream-deep bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-ink flex items-center justify-center">
              <span className="text-cream font-display text-xs font-bold italic">I</span>
            </div>
            <span className="font-body text-sm text-ink-muted">The Inkwell</span>
          </div>
          <p className="font-mono text-xs text-ink-muted/50 tracking-wide">
            © {new Date().getFullYear()} · Built with FastAPI &amp; React
          </p>
        </div>
      </footer>
    </div>
  );
}
