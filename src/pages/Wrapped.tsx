import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Camera, Heart, MapPinned, Mountain, Sparkles, Star } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { useAdventures } from '../context/AdventureContext'
import { categoryEmoji, categoryLabels } from '../lib/constants'
import { FALLBACK_ADVENTURE_PHOTO } from '../lib/placeholders'
import type { Adventure } from '../types/adventure'

type WrappedMode = 'year' | 'month'

type WrappedPeriod = {
  key: string
  label: string
  shortLabel: string
  year: number
  month?: number
}

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
const monthShortFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })
const yearFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric' })
const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function Wrapped() {
  const { adventures } = useAdventures()
  const [mode, setMode] = useState<WrappedMode>('year')

  const periods = useMemo(() => buildWrappedPeriods(adventures, mode), [adventures, mode])
  const [selectedPeriodKey, setSelectedPeriodKey] = useState<string | null>(null)

  const activePeriod = useMemo(() => {
    if (!periods.length) return null
    return periods.find((period) => period.key === selectedPeriodKey) ?? periods[0]
  }, [periods, selectedPeriodKey])

  const recap = useMemo(
    () => (activePeriod ? buildWrappedRecap(adventures, activePeriod) : null),
    [adventures, activePeriod],
  )

  const hasAdventures = adventures.length > 0

  return (
    <>
      <PageHeader
        eyebrow="trail recap"
        title="Adventure wrapped"
        description="Auto-generated monthly and yearly recaps from the adventures you have already logged."
      />

      <section className="wrapped-shell">
        <div className="wrapped-toolbar">
          <div className="wrapped-mode-toggle" aria-label="Wrapped timeframe">
            <button type="button" className={mode === 'year' ? 'active' : ''} onClick={() => setMode('year')}>
              Yearly
            </button>
            <button type="button" className={mode === 'month' ? 'active' : ''} onClick={() => setMode('month')}>
              Monthly
            </button>
          </div>

          <label className="wrapped-period-select">
            <span>Show me</span>
            <select
              value={activePeriod?.key ?? ''}
              disabled={!periods.length}
              onChange={(event) => setSelectedPeriodKey(event.target.value)}
            >
              {periods.map((period) => (
                <option key={period.key} value={period.key}>
                  {period.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {hasAdventures && recap && activePeriod ? (
          <WrappedRecap recap={recap} period={activePeriod} mode={mode} />
        ) : (
          <EmptyWrapped />
        )}
      </section>
    </>
  )
}

function WrappedRecap({ recap, period, mode }: { recap: WrappedRecapData; period: WrappedPeriod; mode: WrappedMode }) {
  const coverPhoto = recap.topAdventure?.coverPhoto || recap.topAdventure?.photos?.[0] || FALLBACK_ADVENTURE_PHOTO

  return (
    <div className="wrapped-grid">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="wrapped-hero-card scrapbook-card"
      >
        <div className="wrapped-hero-copy">
          <p className="wrapped-kicker">{mode === 'year' ? 'Year in review' : 'Month in review'}</p>
          <h2>{period.label}</h2>
          <p>{recap.summaryLine}</p>
        </div>
        <div className="wrapped-polaroid">
          <img src={coverPhoto} alt={recap.topAdventure?.title ?? 'Adventure wrapped cover'} />
          <span>{recap.topAdventure?.title ?? 'Start logging to unlock this'}</span>
        </div>
      </motion.article>

      <div className="wrapped-stat-grid">
        <WrappedStat icon={<MapPinned size={24} />} label="Adventures" value={recap.totalAdventures} />
        <WrappedStat icon={<Mountain size={24} />} label="Miles" value={recap.totalMiles.toFixed(1)} />
        <WrappedStat icon={<Camera size={24} />} label="Photos" value={recap.totalPhotos} />
        <WrappedStat icon={<Star size={24} />} label="Avg rating" value={recap.averageRating ? `${recap.averageRating.toFixed(1)}★` : 'n/a'} />
      </div>

      <WrappedHighlight
        title="Biggest adventure"
        icon={<Sparkles size={24} />}
        value={recap.topAdventure?.title ?? 'No adventure yet'}
        text={
          recap.topAdventure
            ? `${recap.topAdventure.location} • ${recap.topAdventure.miles || 0} miles • ${dateFormatter.format(parseAdventureDate(recap.topAdventure.date) ?? new Date())}`
            : 'Log an adventure to unlock your top trip.'
        }
      />

      <WrappedHighlight
        title="Favorite moment"
        icon={<Heart size={24} />}
        value={recap.favoriteMoment || 'No favorite moment yet'}
        text={recap.favoriteAdventure ? `From ${recap.favoriteAdventure.title}` : 'Add a favorite moment while logging an adventure.'}
      />

      <WrappedHighlight
        title="Most logged vibe"
        icon={<Calendar size={24} />}
        value={recap.topCategory ? `${categoryEmoji[recap.topCategory]} ${categoryLabels[recap.topCategory]}` : 'No category yet'}
        text={recap.topCategory ? `${recap.categoryCount} adventure${recap.categoryCount === 1 ? '' : 's'} in this category.` : 'Categories will appear here once you log more trips.'}
      />

      <article className="wrapped-memory-strip scrapbook-card">
        <div>
          <p className="wrapped-kicker">Memory strip</p>
          <h3>Top snapshots</h3>
        </div>
        <div className="wrapped-photo-row">
          {recap.snapshotAdventures.map((adventure) => (
            <div key={adventure.id} className="wrapped-mini-photo">
              <img src={adventure.coverPhoto || adventure.photos?.[0] || FALLBACK_ADVENTURE_PHOTO} alt={adventure.title} />
              <span>{adventure.title}</span>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

function WrappedStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="wrapped-stat-card">
      <span>{icon}</span>
      <strong>{value}</strong>
      <p>{label}</p>
    </motion.article>
  )
}

function WrappedHighlight({ title, icon, value, text }: { title: string; icon: React.ReactNode; value: string; text: string }) {
  return (
    <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="wrapped-highlight scrapbook-card">
      <div className="wrapped-highlight-icon">{icon}</div>
      <p className="wrapped-kicker">{title}</p>
      <h3>{value}</h3>
      <p>{text}</p>
    </motion.article>
  )
}

function EmptyWrapped() {
  return (
    <article className="wrapped-empty scrapbook-card">
      <Sparkles size={44} />
      <h2>Your wrapped is waiting for its first adventure.</h2>
      <p>Once you log a few trips, this page will automatically make monthly and yearly recaps with your miles, photos, favorite moments, and top adventure style.</p>
    </article>
  )
}

type WrappedRecapData = {
  totalAdventures: number
  totalMiles: number
  totalPhotos: number
  averageRating: number
  topAdventure?: Adventure
  favoriteAdventure?: Adventure
  favoriteMoment: string
  topCategory?: Adventure['category']
  categoryCount: number
  snapshotAdventures: Adventure[]
  summaryLine: string
}

function buildWrappedPeriods(adventures: Adventure[], mode: WrappedMode): WrappedPeriod[] {
  const periodMap = new Map<string, WrappedPeriod>()

  adventures.forEach((adventure) => {
    const date = parseAdventureDate(adventure.date)
    if (!date) return

    const year = date.getFullYear()
    const month = date.getMonth()
    const key = mode === 'year' ? `${year}` : `${year}-${String(month + 1).padStart(2, '0')}`

    if (!periodMap.has(key)) {
      periodMap.set(key, {
        key,
        label: mode === 'year' ? yearFormatter.format(date) : monthFormatter.format(date),
        shortLabel: mode === 'year' ? `${year}` : monthShortFormatter.format(date),
        year,
        month: mode === 'month' ? month : undefined,
      })
    }
  })

  return [...periodMap.values()].sort((a, b) => b.key.localeCompare(a.key))
}

function buildWrappedRecap(adventures: Adventure[], period: WrappedPeriod): WrappedRecapData {
  const periodAdventures = adventures
    .filter((adventure) => isAdventureInPeriod(adventure, period))
    .sort((a, b) => Number(parseAdventureDate(b.date)) - Number(parseAdventureDate(a.date)))

  const totalAdventures = periodAdventures.length
  const totalMiles = periodAdventures.reduce((sum, adventure) => sum + Number(adventure.miles || 0), 0)
  const totalPhotos = periodAdventures.reduce((sum, adventure) => sum + (adventure.photos?.length ?? 0), 0)
  const ratedAdventures = periodAdventures.filter((adventure) => Number(adventure.rating) > 0)
  const averageRating = ratedAdventures.length
    ? ratedAdventures.reduce((sum, adventure) => sum + Number(adventure.rating || 0), 0) / ratedAdventures.length
    : 0

  const topAdventure = [...periodAdventures].sort((a, b) => Number(b.miles || 0) - Number(a.miles || 0))[0]
  const favoriteAdventure = periodAdventures.find((adventure) => adventure.isFavorite) ?? periodAdventures.find((adventure) => adventure.favoriteMoment)
  const categoryCounts = periodAdventures.reduce<Partial<Record<Adventure['category'], number>>>((counts, adventure) => {
    counts[adventure.category] = (counts[adventure.category] ?? 0) + 1
    return counts
  }, {})
  const [topCategory, categoryCount = 0] = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0] ?? []
  const snapshotAdventures = periodAdventures.slice(0, 4)

  return {
    totalAdventures,
    totalMiles,
    totalPhotos,
    averageRating,
    topAdventure,
    favoriteAdventure,
    favoriteMoment: favoriteAdventure?.favoriteMoment ?? '',
    topCategory: topCategory as Adventure['category'] | undefined,
    categoryCount,
    snapshotAdventures: snapshotAdventures.length ? snapshotAdventures : periodAdventures,
    summaryLine: buildSummaryLine(totalAdventures, totalMiles, totalPhotos),
  }
}

function buildSummaryLine(totalAdventures: number, totalMiles: number, totalPhotos: number) {
  if (!totalAdventures) return 'No adventures landed in this timeframe yet. Try another month or year.'
  if (totalAdventures === 1) return `One adventure, ${totalMiles.toFixed(1)} miles, and ${totalPhotos} photo${totalPhotos === 1 ? '' : 's'} saved.`
  return `${totalAdventures} adventures, ${totalMiles.toFixed(1)} miles, and ${totalPhotos} photos saved into your travel scrapbook.`
}

function isAdventureInPeriod(adventure: Adventure, period: WrappedPeriod) {
  const date = parseAdventureDate(adventure.date)
  if (!date) return false
  const sameYear = date.getFullYear() === period.year
  if (period.month === undefined) return sameYear
  return sameYear && date.getMonth() === period.month
}

function parseAdventureDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}
