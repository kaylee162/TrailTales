import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, MapPinned, Sparkles, BarChart3 } from 'lucide-react'
import hero from '../assets/hero.png'

const features = [
  { icon: MapPinned, title: 'Pin every place', text: 'Drop scrapbook-style markers for hikes, beaches, parks, cities, and road trips.' },
  { icon: Camera, title: 'Keep the photos', text: 'Build polaroid galleries with cover photos, little captions, and favorite moments.' },
  { icon: BarChart3, title: 'Track your stats', text: 'See miles traveled, places visited, park count, and category breakdowns.' },
  { icon: Sparkles, title: 'Make a wrapped', text: 'Turn your year into a cute recap with your biggest trips and best memories.' },
]

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden px-5 py-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-black"><span className="grid h-11 w-11 place-items-center rounded-full border-3 border-ink bg-sun shadow-hard-sm"><MapPinned /></span>TrailTales</Link>
        <Link to="/dashboard" className="rounded-full border-2 border-ink bg-forest px-5 py-3 font-black text-white shadow-hard-sm">Open journal</Link>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="mb-4 inline-flex rounded-full border-2 border-ink bg-sun px-4 py-2 text-sm font-black uppercase tracking-[0.2em] shadow-hard-xs">travel scrapbook app</p>
          <h1 className="font-display text-6xl font-black leading-[0.95] md:text-8xl">Log the places you never want to forget.</h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-9 text-ink/75">A cozy adventure journal for trips, hikes, maps, photos, stats, and favorite little moments.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/adventures/new" className="rounded-2xl border-3 border-ink bg-coral px-7 py-4 text-lg font-black text-white shadow-hard transition hover:-translate-y-1">Start logging</Link>
            <Link to="/adventures" className="rounded-2xl border-3 border-ink bg-paper px-7 py-4 text-lg font-black shadow-hard transition hover:-translate-y-1">Explore demo</Link>
          </div>
        </motion.div>

        <motion.div className="relative" initial={{ opacity: 0, rotate: 3, scale: 0.95 }} animate={{ opacity: 1, rotate: -1, scale: 1 }} transition={{ duration: 0.6 }}>
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border-3 border-ink bg-sun shadow-hard-sm" />
          <div className="scrapbook-card map-grid relative p-4">
            <img src={hero} alt="Adventure journal map collage" className="h-[420px] w-full rounded-3xl object-cover" />
            <div className="polaroid absolute -bottom-8 left-8 w-44 rotate-[-6deg]"><div className="h-28 rounded-xl bg-sky" /><p className="mt-3 text-center font-display text-2xl">Blue Ridge</p></div>
            <div className="sticker absolute right-8 top-8 px-4 py-2 text-sm font-black">42 miles logged</div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 pb-14 md:grid-cols-4">
        {features.map((feature) => <div key={feature.title} className="scrapbook-card bg-paper p-5"><feature.icon className="mb-4" /><h3 className="text-xl font-black">{feature.title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-ink/70">{feature.text}</p></div>)}
      </section>
    </main>
  )
}
