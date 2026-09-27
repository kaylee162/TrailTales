import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BarChart3, Compass, Home, Layers, Map as MapIcon, MoreHorizontal, Plus, Settings, Sparkles, X } from 'lucide-react'

const leftTabs = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'Adventures', path: '/adventures', icon: Compass },
]

const rightTabs = [{ label: 'Map', path: '/map', icon: MapIcon }]

const moreLinks = [
  { label: 'Stats', path: '/stats', icon: BarChart3 },
  { label: 'Trip collections', path: '/trips', icon: Layers },
  { label: 'Adventure wrapped', path: '/wrapped', icon: Sparkles },
  { label: 'Profile settings', path: '/settings', icon: Settings },
]

const tabClass = (isActive: boolean) =>
  `flex min-h-12 flex-col items-center justify-center gap-1 text-[11px] ${isActive ? 'font-bold text-spruce' : 'font-semibold text-muted'}`

function ActiveDot({ active }: { active: boolean }) {
  return <span className={`h-1 w-1 rounded-full ${active ? 'bg-blaze' : 'bg-transparent'}`} />
}

// Bottom tab bar for phones; hidden from md up, where the top navbar takes over.
export default function MobileTabBar() {
  const [moreOpen, setMoreOpen] = useState(false)
  const { pathname } = useLocation()
  const onMoreRoute = moreLinks.some((link) => pathname.startsWith(link.path))

  const renderTab = (tab: (typeof leftTabs)[number]) => (
    <NavLink key={tab.path} to={tab.path} onClick={() => setMoreOpen(false)} className={({ isActive }: { isActive: boolean }) => tabClass(isActive)}>
      {({ isActive }: { isActive: boolean }) => (
        <>
          <tab.icon size={22} strokeWidth={isActive ? 2.3 : 1.9} />
          {tab.label}
          <ActiveDot active={isActive} />
        </>
      )}
    </NavLink>
  )

  return (
    <>
      {moreOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMoreOpen(false)}
          className="fixed inset-0 z-[1090] bg-ink/30 backdrop-blur-[2px] md:hidden"
        />
      )}

      <nav className="fixed inset-x-0 bottom-0 z-[1095] border-t border-stone bg-parchment/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" aria-label="Main">
        {moreOpen && (
          <div className="absolute inset-x-3 bottom-[calc(100%+0.75rem)] overflow-hidden rounded-2xl border border-stone bg-parchment p-2 shadow-lift">
            <div className="flex items-center justify-between px-3 pb-1 pt-2">
              <p className="eyebrow">More</p>
              <button type="button" onClick={() => setMoreOpen(false)} className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-sand" aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            {moreLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMoreOpen(false)}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex min-h-12 items-center gap-3 rounded-xl px-3 font-semibold ${isActive ? 'bg-spruce text-bone' : 'text-ink hover:bg-sand'}`
                }
              >
                <link.icon size={19} strokeWidth={1.9} />
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

        <div className="mx-auto grid h-[68px] max-w-md grid-cols-5 items-center px-2">
          {leftTabs.map(renderTab)}

          <Link
            to="/adventures/new"
            onClick={() => setMoreOpen(false)}
            className="-mt-7 grid h-14 w-14 place-items-center justify-self-center rounded-full border-4 border-bone bg-blaze text-white shadow-[0_10px_24px_rgba(194,82,27,0.35)] transition-colors hover:bg-blaze-dark"
            aria-label="Log an adventure"
          >
            <Plus size={24} strokeWidth={2.4} />
          </Link>

          {rightTabs.map(renderTab)}

          <button type="button" onClick={() => setMoreOpen((open) => !open)} className={tabClass(moreOpen || onMoreRoute)} aria-expanded={moreOpen}>
            <MoreHorizontal size={22} strokeWidth={moreOpen || onMoreRoute ? 2.3 : 1.9} />
            More
            <ActiveDot active={onMoreRoute} />
          </button>
        </div>
      </nav>
    </>
  )
}
