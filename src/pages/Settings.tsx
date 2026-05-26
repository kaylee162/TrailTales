import PageHeader from '../components/ui/PageHeader'

export default function Settings() {
  return <><PageHeader eyebrow="settings" title="Profile settings" description="Placeholder account controls until Supabase auth is connected." /><section className="scrapbook-card max-w-2xl bg-paper p-6"><label className="block"><span className="mb-2 block font-black">Display name</span><input className="w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 font-bold" placeholder="Kaylee" /></label><label className="mt-5 block"><span className="mb-2 block font-black">Theme note</span><textarea className="w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 font-bold" rows={4} placeholder="Warm scrapbook, national park passport, travel journal..." /></label><button className="mt-5 rounded-2xl border-3 border-ink bg-sun px-6 py-3 font-black shadow-hard-sm">Save settings</button></section></>
}
