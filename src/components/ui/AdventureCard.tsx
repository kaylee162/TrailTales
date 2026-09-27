import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import type { Adventure } from '../../types/adventure'
import { categoryLabels } from '../../lib/constants'
import CategoryIcon from './CategoryIcon'

type AdventureCardProps = { adventure: Adventure }

export default function AdventureCard({ adventure }: AdventureCardProps) {
  const photo = adventure.coverPhoto || adventure.photos[0] || 'https://via.placeholder.com/400x300?text=Adventure'
  const date = new Date(adventure.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <article className="panel group flex flex-col overflow-hidden transition-shadow hover:shadow-soft">
      <div className="relative h-48 overflow-hidden bg-sand sm:h-56">
        <img src={photo} alt={adventure.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="chip chip-dark absolute left-3.5 top-3.5">
          <CategoryIcon category={adventure.category} size={14} strokeWidth={2} />
          {categoryLabels[adventure.category]}
        </span>
        {adventure.isFavorite && (
          <span className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full bg-blaze text-white" title="Favorite">
            <Star size={15} fill="currentColor" strokeWidth={0} />
            <span className="sr-only">Favorite</span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <p className="data-label">
          {date}
          {adventure.miles ? ` · ${adventure.miles} mi` : ''}
        </p>
        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight">{adventure.title}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-muted"><MapPin size={15} className="shrink-0" /><span className="line-clamp-1">{adventure.location}</span></p>
        </div>
        <p className="line-clamp-2 text-[15px] leading-relaxed text-body">{adventure.description}</p>
        {adventure.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {adventure.tags.slice(0, 3).map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-stone pt-4">
          <span className="text-sm font-semibold text-moss">{adventure.mood}</span>
          <Link to={`/adventures/${adventure.id}`} className="text-link min-h-11">Open entry <ArrowRight size={16} /></Link>
        </div>
      </div>
    </article>
  )
}
