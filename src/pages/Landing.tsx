import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Camera, Compass, MapPin, Plus } from 'lucide-react'
import background from '../assets/background.png'
import BrandMark from '../components/ui/BrandMark'
import TopoLines from '../components/ui/TopoLines'
import { useAdventures } from '../context/AdventureContext'
import { FALLBACK_ADVENTURE_PHOTO } from '../lib/placeholders'

const features = [
  { icon: MapPin, title: 'Pin every place', text: 'Drop a marker for every hike, beach, park, city and road trip, and watch your map fill in.' },
  { icon: Camera, title: 'Keep the photos', text: 'Build a gallery for each trip, pick a cover shot, and caption the moments worth remembering.' },
  { icon: BarChart3, title: 'Track your stats', text: 'Miles covered, places visited, parks checked off, and how your trips break down by type.' },
  { icon: Compass, title: 'Get your Wrapped', text: 'Turn a month or a year into a recap of your biggest trips and best memories.' },
]

export default function Landing() {
  const { adventures } = useAdventures()
  const latest = adventures[0]

  return (
    <main className="min-h-screen bg-bone">
      <section className="relative isolate overflow-hidden bg-ink text-bone">
        <img src={background} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_40%]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,24,19,0.86)_0%,rgba(14,24,19,0.55)_45%,rgba(14,24,19,0.1)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-[linear-gradient(0deg,rgba(14,24,19,0.8),rgba(14,24,19,0))]" />

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-8 pt-5 md:min-h-[92vh] md:px-10 md:py-7">
          <nav className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight md:gap-3 md:text-2xl"><BrandMark size="responsive" />TrailTales</Link>
            <div className="flex items-center gap-8">
              <Link to="/map" className="hidden text-[15px] font-medium text-bone/80 hover:text-bone md:inline">Map</Link>
              <Link to="/stats" className="hidden text-[15px] font-medium text-bone/80 hover:text-bone md:inline">Stats</Link>
              <Link to="/wrapped" className="hidden text-[15px] font-medium text-bone/80 hover:text-bone md:inline">Wrapped</Link>
              <Link to="/dashboard" className="btn btn-light-outline">Open journal</Link>
            </div>
          </nav>

          <div className="flex flex-1 flex-col justify-end gap-8 pt-16 md:gap-12 md:pb-8 md:pt-24 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              className="flex max-w-3xl flex-col gap-5 md:gap-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="eyebrow eyebrow-light flex items-center gap-3.5 text-[11px] md:text-[0.78rem]"><span className="hidden h-0.5 w-8 bg-lichen sm:block" />Field journal · N 34°51′ W 84°19′</p>
              <h1 className="font-display text-[50px] font-medium leading-none tracking-[-0.025em] sm:text-6xl md:text-8xl md:leading-[0.98]">
                Log the places you never want to <em className="italic text-peach">forget.</em>
              </h1>
              <p className="max-w-xl text-[17px] leading-relaxed text-bone/85 md:text-xl">A field journal for trips, hikes, maps, photos and stats. Pin where you went, keep what you saw, and see how far you've come.</p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3.5">
                <Link to="/adventures/new" className="btn btn-primary btn-lg">Start logging <ArrowRight size={18} /></Link>
                <Link to="/map" className="btn btn-light-outline btn-lg">Explore the map</Link>
              </div>
            </motion.div>

            {latest && (
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
                <Link to={`/adventures/${latest.id}`} className="flex w-full items-center gap-3.5 rounded-2xl bg-parchment p-3 text-ink shadow-lift transition-transform hover:-translate-y-0.5 sm:max-w-sm sm:gap-4 sm:p-3.5 lg:w-[360px]">
                  <img src={latest.coverPhoto || latest.photos[0] || FALLBACK_ADVENTURE_PHOTO} alt="" className="h-[72px] w-[72px] shrink-0 rounded-[10px] object-cover sm:h-[92px] sm:w-[92px]" />
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="eyebrow text-[11px]">Latest entry</span>
                    <span className="line-clamp-2 font-display text-lg font-semibold leading-tight sm:text-xl">{latest.title}</span>
                    <span className="data-label truncate">{[latest.miles ? `${latest.miles} mi` : '', latest.mood].filter(Boolean).join(' · ')}</span>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <TopoLines className="-right-56 -top-32 w-[900px]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:gap-16 md:px-10 md:py-28">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-20">
            <div className="flex max-w-3xl flex-col gap-4">
              <p className="eyebrow">What's in the pack</p>
              <h2 className="font-display text-[38px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl">Everything from the trail, kept in one place.</h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">Hikes, beaches, parks, cities and road trips all go in the same journal, with the map and the numbers built from what you log.</p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="flex flex-col gap-4 border-t-2 border-ink pt-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] text-muted">{String(index + 1).padStart(2, '0')}</span>
                  <feature.icon size={26} strokeWidth={1.8} className="text-blaze" />
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight md:text-[28px]">{feature.title}</h3>
                <p className="leading-relaxed text-muted">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="panel-dark flex flex-col gap-6 rounded-[20px] px-6 py-10 md:gap-10 md:rounded-3xl md:px-16 md:py-20 lg:flex-row lg:items-center lg:justify-between">
          <TopoLines className="-bottom-72 -left-48 w-[760px]" color="#b9c27e" opacity={0.18} />
          <div className="relative flex max-w-2xl flex-col gap-4">
            <p className="eyebrow eyebrow-light">Trailhead</p>
            <h2 className="font-display text-[34px] font-medium leading-[1.05] tracking-[-0.02em] md:text-[56px]">Your first entry is one trailhead away.</h2>
            <p className="text-base text-bone/80 md:text-lg">Start with one trip, hike, park, or favorite local spot.</p>
          </div>
          <Link to="/adventures/new" className="btn btn-primary btn-lg relative w-full sm:w-auto sm:self-start lg:self-center"><Plus size={18} /> Add an adventure</Link>
        </div>
      </section>

      <footer className="mx-auto mt-14 flex md:mt-24 max-w-7xl flex-col items-start justify-between gap-4 border-t border-stone px-5 py-8 sm:flex-row md:py-10 sm:items-center md:px-10">
        <span className="flex items-center gap-2.5 font-display text-xl font-semibold"><BrandMark tone="spruce" size="sm" />TrailTales</span>
        <span className="data-label">A field journal for the places you go</span>
      </footer>
    </main>
  )
}
