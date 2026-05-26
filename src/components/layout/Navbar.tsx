import { Link, NavLink } from 'react-router-dom'
import { MapPinned, Plus } from 'lucide-react'

const links = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Adventures', path: '/adventures' },
  { label: 'Map', path: '/map' },
  { label: 'Stats', path: '/stats' },
  { label: 'Wrapped', path: '/wrapped' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b-4 border-ink bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
          <span className="grid h-11 w-11 place-items-center rounded-full border-3 border-ink bg-sun shadow-hard-sm">
            <MapPinned size={23} />
          </span>
          TrailTales
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-full border-2 border-ink px-4 py-2 text-sm font-bold shadow-hard-xs transition hover:-translate-y-0.5 ${
                  isActive ? 'bg-coral text-white' : 'bg-paper'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link to="/adventures/new" className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-forest px-4 py-2 text-sm font-bold text-white shadow-hard-xs transition hover:-translate-y-0.5">
            <Plus size={16} /> Add
          </Link>
        </div>
      </div>
    </nav>
  )
}
