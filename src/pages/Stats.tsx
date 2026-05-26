import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageHeader from '../components/ui/PageHeader'
import { useAdventures } from '../context/AdventureContext'
import { categoryLabels } from '../lib/constants'
import { getAdventureStats } from '../lib/stats'

export default function Stats() {
  const { adventures } = useAdventures()
  const stats = getAdventureStats(adventures)
  const categoryData = Object.entries(stats.categoryCounts).map(([name, value]) => ({ name: categoryLabels[name as keyof typeof categoryLabels], value }))
  const yearData = Object.entries(stats.yearlyCounts).map(([name, value]) => ({ name, value }))
  return <><PageHeader eyebrow="field notes" title="Adventure stats" description="A cute data page for miles, places, parks, photos, and yearly counts." /><section className="grid gap-5 md:grid-cols-5"><Stat label="Adventures" value={stats.totalAdventures} /><Stat label="Miles" value={stats.totalMiles.toFixed(1)} /><Stat label="States" value={stats.statesVisited} /><Stat label="Countries" value={stats.countriesVisited} /><Stat label="Parks" value={stats.parksVisited} /></section><Chart title="Category breakdown" data={categoryData} /><Chart title="Yearly adventure count" data={yearData} /></>
}
function Stat({ label, value }: { label: string; value: string | number }) { return <div className="scrapbook-card bg-paper p-5 text-center"><p className="font-display text-5xl font-black">{value}</p><p className="font-black text-ink/65">{label}</p></div> }
function Chart({ title, data }: { title: string; data: { name: string; value: number }[] }) { return <section className="scrapbook-card mt-8 bg-paper p-6"><h2 className="mb-5 text-3xl font-black">{title}</h2><div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="4 4" /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="#f27c68" /></BarChart></ResponsiveContainer></div></section> }
