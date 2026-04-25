import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// All navigation links
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/cv', label: 'CV Analyzer' },
  { path: '/interview', label: 'Mock Interview' },
  { path: '/linkedin', label: 'LinkedIn' },
  { path: '/skills-gap', label: 'Skills Gap' },
  { path: '/roadmap', label: 'Roadmap' },
]

function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled
        ? 'glass-nav border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
        : 'bg-white/90 border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo / App name */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9f7aea" />
                  <stop offset="100%" stopColor="#fc8181" />
                </linearGradient>
              </defs>
              <polygon
                points="18,2 32,10 32,26 18,34 4,26 4,10"
                fill="#0d1b2e"
                stroke="url(#hexGrad)"
                strokeWidth="1.5"
              />
              <circle cx="18" cy="12" r="3" fill="#9f7aea" />
              <circle cx="11" cy="23" r="2.5" fill="#fc8181" />
              <circle cx="25" cy="23" r="2.5" fill="#9f7aea" />
              <line x1="18" y1="12" x2="11" y2="23" stroke="#9f7aea" strokeWidth="1" opacity="0.7" />
              <line x1="18" y1="12" x2="25" y2="23" stroke="#fc8181" strokeWidth="1" opacity="0.7" />
              <line x1="11" y1="23" x2="25" y2="23" stroke="#9f7aea" strokeWidth="0.8" opacity="0.4" />
            </svg>
            <span className="text-xl font-bold text-gray-900">
              JobBridge <span className="bg-gradient-to-r from-[#9f7aea] to-[#fc8181] bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  location.pathname === link.path
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              // X icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-slate-200 reveal-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                  location.pathname === link.path
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
