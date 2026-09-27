import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Edit, MapPin, Route, Smile, Star, Trash2 } from 'lucide-react'
import { useAdventures } from '../context/AdventureContext'
import { categoryLabels } from '../lib/constants'
import { FALLBACK_ADVENTURE_PHOTO } from '../lib/placeholders'
import CategoryIcon from '../components/ui/CategoryIcon'

export default function AdventureDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getAdventureById, deleteAdventure } = useAdventures()
  const adventure = id ? getAdventureById(id) : undefined

  if (!adventure) {
    return <div className="panel px-8 py-14 text-center"><h1 className="font-display text-4xl font-medium">Adventure not found</h1><Link className="text-link mt-4" to="/adventures">Back to adventures</Link></div>
  }

  const photo = adventure.coverPhoto || adventure.photos[0] || FALLBACK_ADVENTURE_PHOTO

  const handleDelete = () => {
    if (!confirm('Delete this adventure page?')) return
    const didDelete = deleteAdventure(adventure.id)
    if (didDelete) navigate('/adventures')
  }

  return (
    <article>
      <Link to="/adventures" className="text-link mb-4 min-h-11 md:mb-6"><ArrowLeft size={18} /> Back to adventures</Link>

      <section className="relative isolate overflow-hidden rounded-2xl bg-ink text-bone">
        <img src={photo} alt={adventure.title} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(14,24,19,0.88)_0%,rgba(14,24,19,0.35)_55%,rgba(14,24,19,0.05)_100%)]" />
        <div className="flex min-h-[400px] flex-col justify-end gap-4 p-5 md:min-h-[420px] md:gap-5 md:p-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="chip chip-dark"><CategoryIcon category={adventure.category} size={14} strokeWidth={2} />{categoryLabels[adventure.category]}</span>
            {adventure.isFavorite && <span className="chip chip-blaze"><Star size={13} fill="currentColor" strokeWidth={0} /> Favorite</span>}
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-[40px] font-medium leading-none tracking-[-0.02em] sm:text-5xl md:text-7xl">{adventure.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-[15px] text-bone/85 md:mt-4 md:text-lg"><MapPin size={20} className="shrink-0" /> {adventure.location}</p>
            </div>
            <div className="flex gap-2.5">
              <Link to={`/adventures/${adventure.id}/edit`} className="btn btn-light-outline flex-1 md:flex-none"><Edit size={17} /> Edit</Link>
              <button onClick={handleDelete} className="btn btn-icon border-bone/40 bg-bone/10 text-bone hover:bg-danger hover:text-white" aria-label="Delete adventure"><Trash2 size={17} /></button>
            </div>
          </div>
        </div>
      </section>

      <div className="stat-band my-5 md:my-8">
        <Mini icon={<Calendar size={16} />} label="Date" value={new Date(adventure.date).toLocaleDateString()} />
        <Mini icon={<Route size={16} />} label="Miles" value={`${adventure.miles} mi`} />
        <Mini icon={<Star size={16} />} label="Rating" value={`${adventure.rating}/5`} />
        <Mini icon={<Smile size={16} />} label="Mood" value={adventure.mood} />
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="panel p-5 md:p-8">
          <p className="eyebrow">Field notes</p>
          <h2 className="mt-2 font-display text-[28px] font-medium md:text-4xl">Journal entry</h2>
          <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-body md:mt-5 md:text-lg md:leading-8">{adventure.journal}</p>
          {adventure.favoriteMoment && (
            <div className="mt-8 border-t border-stone pt-6">
              <p className="eyebrow">Favorite moment</p>
              <p className="mt-3 font-display text-xl italic leading-snug md:text-2xl">“{adventure.favoriteMoment}”</p>
            </div>
          )}
        </div>
        <div>
          <h2 className="mb-3 font-display text-[28px] font-medium md:mb-4 md:text-4xl">Photos</h2>
          <div className="grid grid-cols-2 gap-3">{(adventure.photos.length ? adventure.photos : [photo]).map((photo) => <img key={photo} src={photo} alt="Adventure memory" className="aspect-[4/3] w-full rounded-xl object-cover" />)}</div>
        </div>
      </div>
    </article>
  )
}

function Mini({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div><p className="data-label flex items-center gap-2 tracking-[0.12em]"><span className="text-blaze">{icon}</span>{label}</p><p className="font-display text-[22px] font-medium leading-tight md:text-3xl">{value || '—'}</p></div>
}
