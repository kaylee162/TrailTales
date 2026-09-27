import { Link, NavLink } from 'react-router-dom'
import { Plus } from 'lucide-react'
import BrandMark from '../ui/BrandMark'

const links = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Adventures', path: '/adventures' },
  { label: 'Map', path: '/map' },
  { label: 'Stats', path: '/stats' },
  { label: 'Wrapped', path: '/wrapped' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[1000] bg-spruce text-bone">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-x-8 px-5 md:h-[76px]">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight md:gap-3 md:text-[22px]">
          <BrandMark size="responsive" />
          TrailTales
        </Link>

        <div className="hidden h-full gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }: { isActive: boolean }) =>
                `flex h-full shrink-0 items-center border-b-[3px] pt-[3px] text-[15px] transition-colors ${
                  isActive ? 'border-blaze font-semibold text-bone' : 'border-transparent font-medium text-bone/70 hover:text-bone'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link to="/adventures/new" className="btn btn-primary hidden md:inline-flex">
          <Plus size={16} strokeWidth={2.4} /> Add
        </Link>
      </div>
    </nav>
  )
}
