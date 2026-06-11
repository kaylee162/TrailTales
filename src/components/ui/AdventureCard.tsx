import { Link } from 'react-router-dom'
import { Calendar, MapPin, Star } from 'lucide-react'
import type { Adventure } from '../../types/adventure'
import { categoryEmoji, categoryLabels } from '../../lib/constants'

type AdventureCardProps = { adventure: Adventure }

export default function AdventureCard({ adventure }: AdventureCardProps) {
  const photo = adventure.coverPhoto || adventure.photos[0] || 'https://via.placeholder.com/400x300?text=Adventure'

  return (
    <article className="scrapbook-card overflow-hidden transition hover:-translate-y-1">
      <div className="relative">
        <img src={photo} alt={adventure.title} className="h-52 w-full object-cover" />
        <div className="sticker absolute left-4 top-4 px-3 py-1 text-xs font-black uppercase">
          {categoryEmoji[adventure.category]} {categoryLabels[adventure.category]}
        </div>
        {adventure.isFavorite && (
          <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-sun shadow-hard-xs">
            <Star size={18} fill="currentColor" />
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-2xl font-black">{adventure.title}</h3>
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink/70"><MapPin size={16} />{adventure.location}</p>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-ink/75">{adventure.description}</p>
        <div className="flex flex-wrap gap-2">
          {adventure.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full border-2 border-ink bg-sky/50 px-3 py-1 text-xs font-bold">#{tag}</span>)}
        </div>
        <div className="flex items-center justify-between border-t-2 border-dashed border-ink/30 pt-4">
          <span className="flex items-center gap-2 text-sm font-bold"><Calendar size={16} />{new Date(adventure.date).toLocaleDateString()}</span>
          <Link to={`/adventures/${adventure.id}`} className="rounded-full border-2 border-ink bg-coral px-4 py-2 text-sm font-black text-white shadow-hard-xs">View</Link>
        </div>
      </div>
    </article>
  )
}
