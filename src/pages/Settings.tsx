import PageHeader from '../components/ui/PageHeader'

export default function Settings() {
  return <><PageHeader eyebrow="settings" title="Profile settings" description="Placeholder account controls until Supabase auth is connected." /><section className="panel form-field max-w-2xl p-6 md:p-8"><label className="block"><span className="field-label">Display name</span><input placeholder="Kaylee" /></label><label className="mt-5 block"><span className="field-label">Theme note</span><textarea rows={4} placeholder="Warm scrapbook, national park passport, travel journal..." /></label><button className="btn btn-dark mt-6">Save settings</button></section></>
}
