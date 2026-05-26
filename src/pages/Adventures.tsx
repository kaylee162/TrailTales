import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import AdventureCard from '../components/ui/AdventureCard'
import PageHeader from '../components/ui/PageHeader'
import { adventureCategories, categoryLabels } from '../lib/constants'
import { useAdventures } from '../context/AdventureContext'
import type { AdventureCategory } from '../types/adventure'

type SortMode = 'newest' | 'oldest' | 'miles' | 'favorites'

export default function Adventures() {
  const { adventures } = useAdventures()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<AdventureCategory | 'all'>('all')
  const [sort, setSort] = useState<SortMode>('newest')

  const filtered = useMemo(() => {
    return [...adventures]
      .filter((adventure) => category === 'all' || adventure.category === category)
      .filter((adventure) => `${adventure.title} ${adventure.location} ${adventure.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime()
        if (sort === 'miles') return b.miles - a.miles
        if (sort === 'favorites') return Number(b.isFavorite) - Number(a.isFavorite)
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  }, [adventures, category, query, sort])

  return (
    <>
      <PageHeader eyebrow="all entries" title="Adventure pages" description="Search, filter, and sort every trip in your journal." action={<Link to="/adventures/new" className="inline-flex items-center gap-2 rounded-2xl border-3 border-ink bg-coral px-5 py-3 font-black text-white shadow-hard-sm"><Plus size={18} /> New adventure</Link>} />

      <section className="scrapbook-card mb-8 grid gap-4 bg-paper p-5 md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-white px-4 py-3 font-bold"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, places, tags..." className="w-full bg-transparent outline-none" /></label>
        <select value={category} onChange={(event) => setCategory(event.target.value as AdventureCategory | 'all')} className="rounded-2xl border-2 border-ink bg-white px-4 py-3 font-bold">
          <option value="all">All categories</option>
          {adventureCategories.map((item) => <option key={item} value={item}>{categoryLabels[item]}</option>)}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="rounded-2xl border-2 border-ink bg-white px-4 py-3 font-bold">
          <option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="miles">Most miles</option><option value="favorites">Favorites first</option>
        </select>
      </section>

      {filtered.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((adventure) => <AdventureCard key={adventure.id} adventure={adventure} />)}</div> : <div className="scrapbook-card p-10 text-center"><h2 className="text-3xl font-black">No matching adventures</h2><p className="mt-2 font-semibold text-ink/70">Try clearing your filters or add a new entry.</p></div>}
    </>
  )
}
