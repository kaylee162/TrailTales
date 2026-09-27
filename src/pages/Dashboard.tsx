import { Link } from 'react-router-dom'
import { ArrowRight, Camera, MapPin, MapPinned, Plus, Route, Trees } from 'lucide-react'
import AdventureCard from '../components/ui/AdventureCard'
import PageHeader from '../components/ui/PageHeader'
import TopoLines from '../components/ui/TopoLines'
import { useAdventures } from '../context/AdventureContext'
import { getAdventureStats } from '../lib/stats'
import { FALLBACK_ADVENTURE_PHOTO } from '../lib/placeholders'

export default function Dashboard() {
  const { adventures } = useAdventures()
  const stats = getAdventureStats(adventures)
  const recent = adventures.slice(0, 3)
  const favorite = stats.favorite

  return (
    <>
      <PageHeader eyebrow="your trail hub" title="Welcome back, explorer" description="Your newest entries, favorite stops, and trail stats in one place." action={<Link to="/adventures/new" className="btn btn-dark btn-lg"><Plus size={18} /> Add adventure</Link>} />

      <section className="stat-band">
        <Stat icon={<MapPin size={16} />} label="Adventures" value={stats.totalAdventures} />
        <Stat icon={<Route size={16} />} label="Miles" value={stats.totalMiles.toFixed(1)} />
        <Stat icon={<Camera size={16} />} label="Photos" value={stats.totalPhotos} />
        <Stat icon={<Trees size={16} />} label="Parks" value={stats.parksVisited} />
      </section>

      <section className="mt-9 grid items-start gap-8 md:mt-12 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <div className="mb-5 flex items-baseline justify-between"><h2 className="font-display text-[28px] font-medium tracking-[-0.01em] md:text-[34px]">Recent entries</h2><Link to="/adventures" className="text-link">View all <ArrowRight size={16} /></Link></div>
          {recent.length ? (
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {recent.map((adventure) => <AdventureCard key={adventure.id} adventure={adventure} />)}
            </div>
          ) : (
            <div className="panel flex flex-col items-center px-8 py-14 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-spruce text-bone"><MapPinned size={26} /></span>
              <h3 className="mt-5 font-display text-3xl font-medium">No adventures yet</h3>
              <p className="mt-2 text-muted">Start with one trip, hike, park, or favorite local spot.</p>
              <Link to="/adventures/new" className="btn btn-primary mt-6">Add your first adventure</Link>
            </div>
          )}
        </div>

        <aside className="panel-dark lg:mt-[68px]">
          <TopoLines className="-bottom-52 -right-60 w-[600px]" color="#b9c27e" opacity={0.2} />
          {favorite ? (
            <>
              <img src={favorite.coverPhoto || favorite.photos[0] || FALLBACK_ADVENTURE_PHOTO} alt="" className="h-44 w-full object-cover sm:h-64" />
              <div className="relative flex flex-col gap-3 p-5 sm:gap-4 sm:p-7">
                <p className="eyebrow eyebrow-light">Favorite memory</p>
                <h3 className="font-display text-[26px] font-medium leading-tight sm:text-[32px]">{favorite.title}</h3>
                {favorite.favoriteMoment && <p className="font-display text-lg italic leading-normal text-bone/90 sm:text-xl">“{favorite.favoriteMoment}”</p>}
                <div className="flex items-center justify-between gap-4 border-t border-bone/20 pt-4">
                  <span className="font-mono text-xs text-bone/70">
                    {typeof favorite.latitude === 'number' && typeof favorite.longitude === 'number'
                      ? `${favorite.latitude.toFixed(4)}° · ${favorite.longitude.toFixed(4)}°`
                      : favorite.location}
                  </span>
                  <Link to={`/adventures/${favorite.id}`} className="shrink-0 font-semibold text-peach hover:text-bone">Open entry</Link>
                </div>
              </div>
            </>
          ) : (
            <div className="relative p-7">
              <p className="eyebrow eyebrow-light">Favorite memory</p>
              <p className="mt-4 text-bone/80">No adventures yet.</p>
            </div>
          )}
        </aside>
      </section>
    </>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return <div><p className="data-label flex items-center gap-2 tracking-[0.12em]"><span className="text-blaze">{icon}</span>{label}</p><strong>{value}</strong></div>
}
