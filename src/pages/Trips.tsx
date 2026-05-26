import PageHeader from '../components/ui/PageHeader'
import { useAdventures } from '../context/AdventureContext'

export default function Trips() {
  const { adventures } = useAdventures()
  const grouped = adventures.reduce<Record<string, typeof adventures>>((groups, adventure) => {
    const key = adventure.state || adventure.country || 'Unsorted'
    groups[key] = [...(groups[key] || []), adventure]
    return groups
  }, {})

  return (
    <>
      <PageHeader eyebrow="collections" title="Trip collections" description="Starter grouping by state or country. Later, turn this into custom road trips with ordered stops and route lines." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([place, items]) => (
          <article key={place} className="scrapbook-card bg-paper p-5">
            <div className="grid grid-cols-3 gap-2">
              {items.slice(0, 3).map((item) => <img key={item.id} src={item.coverPhoto || item.photos[0]} alt="" className="h-28 rounded-2xl border-2 border-ink object-cover" />)}
            </div>
            <h2 className="mt-5 text-3xl font-black">{place}</h2>
            <p className="mt-2 font-bold text-ink/70">{items.length} stops · {items.reduce((sum, item) => sum + item.miles, 0).toFixed(1)} miles</p>
          </article>
        ))}
      </div>
    </>
  )
}
