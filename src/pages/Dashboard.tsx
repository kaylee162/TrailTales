import { Link } from 'react-router-dom'
import { Camera, MapPinned, Plus, Route, Star } from 'lucide-react'
import AdventureCard from '../components/ui/AdventureCard'
import PageHeader from '../components/ui/PageHeader'
import { useAdventures } from '../context/AdventureContext'
import { getAdventureStats } from '../lib/stats'

export default function Dashboard() {
  const { adventures } = useAdventures()
  const stats = getAdventureStats(adventures)
  const recent = adventures.slice(0, 3)

  return (
    <>
      <PageHeader eyebrow="your travel hub" title="Welcome back, explorer" description="Keep your newest memories, favorite stops, and travel stats in one cozy scrapbook dashboard." action={<Link to="/adventures/new" className="inline-flex items-center gap-2 rounded-2xl border-3 border-ink bg-coral px-5 py-3 font-black text-white shadow-hard-sm"><Plus size={18} /> Add adventure</Link>} />

      <section className="grid gap-5 md:grid-cols-4">
        <Stat icon={<MapPinned />} label="Adventures" value={stats.totalAdventures} />
        <Stat icon={<Route />} label="Miles" value={stats.totalMiles.toFixed(1)} />
        <Stat icon={<Camera />} label="Photos" value={stats.totalPhotos} />
        <Stat icon={<Star />} label="Parks" value={stats.parksVisited} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <div className="mb-4 flex items-center justify-between"><h2 className="text-3xl font-black">Recent pages</h2><Link to="/adventures" className="font-black text-coral">View all</Link></div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{recent.map((adventure) => <AdventureCard key={adventure.id} adventure={adventure} />)}</div>
        </div>
        <aside className="scrapbook-card map-grid p-6">
          <p className="sticker mb-4 inline-flex px-3 py-1 text-sm font-black">favorite memory</p>
          {stats.favorite ? <><img src={stats.favorite.coverPhoto || stats.favorite.photos[0]} alt="" className="h-56 w-full rounded-3xl border-3 border-ink object-cover" /><h3 className="mt-5 text-3xl font-black">{stats.favorite.title}</h3><p className="mt-2 font-semibold text-ink/70">{stats.favorite.favoriteMoment}</p></> : <p>No adventures yet.</p>}
        </aside>
      </section>
    </>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return <div className="scrapbook-card bg-paper p-5"><div className="mb-3 grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-sun shadow-hard-xs">{icon}</div><p className="text-3xl font-black">{value}</p><p className="font-bold text-ink/65">{label}</p></div>
}
