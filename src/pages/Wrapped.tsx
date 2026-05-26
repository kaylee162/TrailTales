import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import { useAdventures } from '../context/AdventureContext'
import { getAdventureStats } from '../lib/stats'

export default function Wrapped() {
  const { adventures } = useAdventures()
  const stats = getAdventureStats(adventures)
  const biggest = [...adventures].sort((a, b) => b.miles - a.miles)[0]

  return (
    <>
      <PageHeader eyebrow="year in review" title="Adventure wrapped" description="A portfolio-worthy recap page with animated scrapbook cards." />
      <section className="grid gap-6 md:grid-cols-2">
        <WrappedCard title="You logged" value={`${stats.totalAdventures} adventures`} text="Tiny moments, big views, and lots of photo scraps." />
        <WrappedCard title="You traveled" value={`${stats.totalMiles.toFixed(1)} miles`} text="Boots, wheels, flights, trails, and wandering included." />
        <WrappedCard title="Your biggest trip" value={biggest?.title ?? 'No trips yet'} text={biggest ? `${biggest.miles} miles in ${biggest.location}` : 'Add an adventure to unlock this card.'} />
        <WrappedCard title="Your camera roll said" value={`${stats.totalPhotos} photos`} text="Future gallery feature loading soon." />
      </section>
    </>
  )
}

function WrappedCard({ title, value, text }: { title: string; value: string; text: string }) {
  return <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="scrapbook-card min-h-72 bg-coral p-8 text-white"><p className="font-black uppercase tracking-[0.24em]">{title}</p><h2 className="mt-5 font-display text-6xl font-black leading-none">{value}</h2><p className="mt-6 text-xl font-bold leading-8">{text}</p></motion.article>
}
