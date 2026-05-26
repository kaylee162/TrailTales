import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Edit, MapPin, Route, Star, Trash2 } from 'lucide-react'
import { useAdventures } from '../context/AdventureContext'
import { categoryEmoji, categoryLabels } from '../lib/constants'

export default function AdventureDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getAdventureById, deleteAdventure } = useAdventures()
  const adventure = id ? getAdventureById(id) : undefined

  if (!adventure) {
    return <div className="scrapbook-card p-10 text-center"><h1 className="text-4xl font-black">Adventure not found</h1><Link className="mt-4 inline-block font-black text-coral" to="/adventures">Back to adventures</Link></div>
  }

  const handleDelete = () => {
    if (!confirm('Delete this adventure page?')) return
    deleteAdventure(adventure.id)
    navigate('/adventures')
  }

  return (
    <article>
      <Link to="/adventures" className="mb-6 inline-flex items-center gap-2 font-black text-coral"><ArrowLeft size={18} /> Back to adventures</Link>
      <section className="scrapbook-card overflow-hidden bg-paper">
        <img src={adventure.coverPhoto || adventure.photos[0]} alt={adventure.title} className="h-[360px] w-full object-cover" />
        <div className="p-6 md:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="sticker px-4 py-2 text-sm font-black">{categoryEmoji[adventure.category]} {categoryLabels[adventure.category]}</span>
            {adventure.isFavorite && <span className="sticker bg-sun px-4 py-2 text-sm font-black"><Star size={16} className="inline" fill="currentColor" /> favorite</span>}
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div><h1 className="font-display text-5xl font-black md:text-7xl">{adventure.title}</h1><p className="mt-3 flex items-center gap-2 text-lg font-bold text-ink/70"><MapPin /> {adventure.location}</p></div>
            <div className="flex gap-3"><Link to={`/adventures/${adventure.id}/edit`} className="rounded-2xl border-2 border-ink bg-sun px-4 py-3 font-black shadow-hard-xs"><Edit size={18} /></Link><button onClick={handleDelete} className="rounded-2xl border-2 border-ink bg-red-500 px-4 py-3 font-black text-white shadow-hard-xs"><Trash2 size={18} /></button></div>
          </div>
          <div className="my-8 grid gap-4 md:grid-cols-4"><Mini icon={<Calendar />} label="Date" value={new Date(adventure.date).toLocaleDateString()} /><Mini icon={<Route />} label="Miles" value={`${adventure.miles} mi`} /><Mini icon={<Star />} label="Rating" value={`${adventure.rating}/5`} /><Mini icon={<MapPin />} label="Mood" value={adventure.mood} /></div>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]"><div className="rounded-3xl border-2 border-dashed border-ink/40 bg-white/65 p-6"><h2 className="font-display text-4xl font-black">Journal entry</h2><p className="mt-4 whitespace-pre-wrap text-lg leading-9 text-ink/75">{adventure.journal}</p><h3 className="mt-8 text-2xl font-black">Favorite moment</h3><p className="mt-2 font-semibold text-ink/75">{adventure.favoriteMoment}</p></div><div><h2 className="mb-4 font-display text-4xl font-black">Photo scraps</h2><div className="grid grid-cols-2 gap-4">{adventure.photos.map((photo) => <img key={photo} src={photo} alt="Adventure memory" className="polaroid h-44 w-full object-cover" />)}</div></div></div>
        </div>
      </section>
    </article>
  )
}

function Mini({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-3xl border-2 border-ink bg-white p-4 shadow-hard-xs"><div className="mb-2 text-coral">{icon}</div><p className="text-sm font-black uppercase tracking-widest text-ink/50">{label}</p><p className="text-xl font-black">{value}</p></div>
}
