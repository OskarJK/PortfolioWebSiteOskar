import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',           label: 'Home' },
  { to: '/projects',   label: 'Projects' },
  { to: '/experience', label: 'Experience' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors">
          Portfolio
        </Link>

        <ul className="flex items-center gap-1">
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
