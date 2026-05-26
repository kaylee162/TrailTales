import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ChevronLeft, ChevronRight, MapPinned, Mountain, NotebookTabs } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { useAdventures } from '../context/AdventureContext'
import { categoryLabels } from '../lib/constants'
import { getAdventureStats } from '../lib/stats'

export default function Stats() {
  const { adventures } = useAdventures()
  const stats = getAdventureStats(adventures)
  const [page, setPage] = useState(0)

  const categoryData = Object.entries(stats.categoryCounts).map(([name, value]) => ({
    name: categoryLabels[name as keyof typeof categoryLabels],
    value,
  }))

  const yearData = Object.entries(stats.yearlyCounts).map(([name, value]) => ({ name, value }))

  const ratingData = useMemo(() => {
    return [1, 2, 3, 4, 5].map((rating) => ({
      name: `${rating}★`,
      value: adventures.filter((adventure) => Number(adventure.rating) === rating).length,
    }))
  }, [adventures])

  const notebookPages = [
    {
      tab: 'Overview',
      title: 'Trip ledger',
      subtitle: 'A quick scan of the field notes you have collected so far.',
      content: <OverviewPage stats={stats} />,
    },
    {
      tab: 'Types',
      title: 'Terrain breakdown',
      subtitle: 'See which kinds of adventures show up most in your journal.',
      content: <FieldChart title="Adventures by category" data={categoryData} type="bar" />,
    },
    {
      tab: 'Years',
      title: 'Timeline notes',
      subtitle: 'See how your adventure count changes from year to year.',
      content: <FieldChart title="Yearly adventure count" data={yearData} type="line" />,
    },
    {
      tab: 'Ratings',
      title: 'Memory quality check',
      subtitle: 'A little field scale for some of your favorite adventures and stops.',
      content: <FieldChart title="Rating spread" data={ratingData} type="bar" />,
    },
  ]

  const currentPage = notebookPages[page]

  return (
    <>
      <PageHeader
        eyebrow="field notes"
        title="Adventure stats"
        description="A scrapbook-style stats page to see your logged adventures at a glance."
      />

      <section className="field-notebook">
        <div className="notebook-tabs" aria-label="Stats pages">
          {notebookPages.map((notebookPage, index) => (
            <button
              key={notebookPage.tab}
              type="button"
              onClick={() => setPage(index)}
              className={page === index ? 'active' : ''}
            >
              {notebookPage.tab}
            </button>
          ))}
        </div>

        <article className="notebook-page notebook-page-left">
          <p className="handwritten-note">TrailTales Field Notes</p>
          <div className="rounded-3xl border-3 border-ink bg-sun/40 p-5 shadow-hard-sm">
            <NotebookTabs size={34} />
            <h2 className="mt-3 text-4xl font-black">{currentPage.title}</h2>
            <p className="mt-3 font-bold leading-7 text-ink/70">{currentPage.subtitle}</p>
          </div>

          <div className="mt-6 grid gap-4">
            <FieldNote icon={<MapPinned size={22} />} label="Places pinned" value={stats.totalAdventures} />
            <FieldNote icon={<Mountain size={22} />} label="Miles logged" value={stats.totalMiles.toFixed(1)} />
            <FieldNote icon={<NotebookTabs size={22} />} label="Photos saved" value={stats.totalPhotos} />
          </div>
        </article>

        <article className="notebook-page notebook-page-right">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-black shadow-hard-xs">
              Page {page + 1} / {notebookPages.length}
            </p>
            <p className="handwritten-note">logged stats</p>
          </div>

          {currentPage.content}

          <div className="mt-6 flex justify-between gap-3">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              className="notebook-nav-button"
            >
              <ChevronLeft size={18} /> Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(notebookPages.length - 1, current + 1))}
              disabled={page === notebookPages.length - 1}
              className="notebook-nav-button"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </article>
      </section>
    </>
  )
}

function OverviewPage({ stats }: { stats: ReturnType<typeof getAdventureStats> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Stat label="Adventures" value={stats.totalAdventures} />
      <Stat label="Miles" value={stats.totalMiles.toFixed(1)} />
      <Stat label="States" value={stats.statesVisited} />
      <Stat label="Countries" value={stats.countriesVisited} />
      <Stat label="Parks" value={stats.parksVisited} />
      <Stat label="Photos" value={stats.totalPhotos} />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="field-stat-card">
      <p className="font-display text-5xl font-black">{value}</p>
      <p className="font-black text-ink/65">{label}</p>
    </div>
  )
}

function FieldNote({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="field-note-row">
      <span>{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}

function FieldChart({ title, data, type }: { title: string; data: { name: string; value: number }[]; type: 'bar' | 'line' }) {
  const hasData = data.some((item) => item.value > 0)

  return (
    <section className="field-chart-card">
      <h3>{title}</h3>
      {hasData ? (
        <div className="h-82">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'bar' ? (
              <BarChart data={data} margin={{ top: 10, right: 18, left: -16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" tick={{ fontWeight: 700 }} />
                <YAxis allowDecimals={false} tick={{ fontWeight: 700 }} />
                <Bar dataKey="value" fill="#f27c68" radius={[10, 10, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 18, left: -16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" tick={{ fontWeight: 700 }} />
                <YAxis allowDecimals={false} tick={{ fontWeight: 700 }} />
                <Line type="monotone" dataKey="value" stroke="#f27c68" strokeWidth={4} dot={{ r: 6, fill: '#f7c95f', stroke: '#2f2a25', strokeWidth: 2 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="grid h-72 place-items-center rounded-3xl border-2 border-dashed border-ink/45 bg-white/60 p-6 text-center font-black text-ink/60">
          Add a few adventures and this page will fill itself in.
        </div>
      )}
    </section>
  )
}
