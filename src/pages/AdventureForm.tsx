import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import { adventureCategories, categoryLabels } from '../lib/constants'
import { compressImage } from '../lib/imageUtils'
import { useAdventures } from '../context/AdventureContext'
import type { Adventure, AdventureCategory } from '../types/adventure'
import LocationPicker from '../components/forms/LocationPicker'

const blank: Omit<Adventure, 'id'> = {
  title: '', location: '', date: new Date().toISOString().slice(0, 10), category: 'hike', description: '', journal: '', miles: 0, rating: 5, mood: '', tags: [], favoriteMoment: '', isFavorite: false, isPark: false, state: '', country: 'United States', latitude: undefined, longitude: undefined, coverPhoto: '', photos: [],
}

export default function AdventureForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addAdventure, updateAdventure, getAdventureById } = useAdventures()
  const existing = id ? getAdventureById(id) : undefined
  const [form, setForm] = useState<Omit<Adventure, 'id'>>(existing ? { ...existing } : blank)
  const [tagText, setTagText] = useState(existing?.tags.join(', ') ?? '')

  const update = <K extends keyof Omit<Adventure, 'id'>>(key: K, value: Omit<Adventure, 'id'>[K]) => setForm((current) => ({ ...current, [key]: value }))

  const handlePhotos = async (files: FileList | null) => {
    const selectedFiles = Array.from(files ?? [])

    if (!selectedFiles.length) return

    try {
        const compressedPhotos = await Promise.all(
        selectedFiles.map((file) => compressImage(file)),
        )

        setForm((current) => ({
        ...current,
        photos: [...current.photos, ...compressedPhotos].slice(0, 6),
        coverPhoto:
            current.coverPhoto || compressedPhotos[0] || current.coverPhoto,
        }))
    } catch {
        alert('One of those photos could not be uploaded. Try a smaller image.')
    }
    }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const cleaned = { ...form, tags: tagText.split(',').map((tag) => tag.trim()).filter(Boolean), photos: form.photos.length ? form.photos : form.coverPhoto ? [form.coverPhoto] : [] }
    if (existing && id) { updateAdventure(id, cleaned); navigate(`/adventures/${id}`) }
    else { const newId = addAdventure(cleaned); navigate(`/adventures/${newId}`) }
  }

  return (
    <>
      <PageHeader eyebrow={existing ? 'edit page' : 'new page'} title={existing ? 'Update adventure' : 'Add an adventure'} description="Fill in the memory, pin, stats, and photo scraps for this journal page." />
      <form onSubmit={handleSubmit} className="scrapbook-card grid gap-6 bg-paper p-6 lg:grid-cols-2">
        <Field label="Title"><input required value={form.title} onChange={(e) => update('title', e.target.value)} /></Field>
        <Field label="Date"><input type="date" required value={form.date} onChange={(e) => update('date', e.target.value)} /></Field>
        <Field label="Category"><select value={form.category} onChange={(e) => update('category', e.target.value as AdventureCategory)}>{adventureCategories.map((cat) => <option key={cat} value={cat}>{categoryLabels[cat]}</option>)}</select></Field>
        <Field label="State / region"><input value={form.state ?? ''} onChange={(e) => update('state', e.target.value)} /></Field>
        <Field label="Country"><input value={form.country ?? ''} onChange={(e) => update('country', e.target.value)} /></Field>
        <LocationPicker
          location={form.location}
          latitude={form.latitude}
          longitude={form.longitude}
          state={form.state}
          country={form.country}
          onPick={(picked) => setForm((current) => ({ ...current, ...picked }))}
        />
        <Field label="Miles"><input type="number" min="0" step="0.1" value={form.miles} onChange={(e) => update('miles', Number(e.target.value))} /></Field>
        <Field label="Rating"><input type="number" min="1" max="5" value={form.rating} onChange={(e) => update('rating', Number(e.target.value))} /></Field>
        <Field label="Mood"><input value={form.mood} onChange={(e) => update('mood', e.target.value)} placeholder="Peaceful, chaotic, inspired..." /></Field>
        <Field label="Tags"><input value={tagText} onChange={(e) => setTagText(e.target.value)} placeholder="mountains, spring, roadtrip" /></Field>
        <Field label="Short description" wide><textarea required value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} /></Field>
        <Field label="Journal story" wide><textarea required value={form.journal} onChange={(e) => update('journal', e.target.value)} rows={7} /></Field>
        <Field label="Favorite moment" wide><input value={form.favoriteMoment} onChange={(e) => update('favoriteMoment', e.target.value)} /></Field>
        <Field label="Photo upload" wide><input type="file" accept="image/*" multiple onChange={(e) => handlePhotos(e.target.files)} /><p className="mt-2 text-sm font-bold text-ink/60">Photos are saved locally in your browser for now.</p></Field>
        <div className="flex flex-wrap gap-6 lg:col-span-2"><label className="flex items-center gap-3 font-black"><input type="checkbox" checked={form.isFavorite} onChange={(e) => update('isFavorite', e.target.checked)} /> Favorite</label><label className="flex items-center gap-3 font-black"><input type="checkbox" checked={form.isPark} onChange={(e) => update('isPark', e.target.checked)} /> National/state park</label></div>
        {form.photos.length > 0 && <div className="grid grid-cols-3 gap-3 lg:col-span-2">{form.photos.map((photo) => <button type="button" key={photo} onClick={() => update('coverPhoto', photo)} className={`rounded-2xl border-3 ${form.coverPhoto === photo ? 'border-coral' : 'border-ink'}`}><img src={photo} alt="Uploaded preview" className="h-32 w-full rounded-xl object-cover" /></button>)}</div>}
        <button className="rounded-2xl border-3 border-ink bg-coral px-7 py-4 text-lg font-black text-white shadow-hard lg:col-span-2">Save adventure</button>
      </form>
    </>
  )
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={`block ${wide ? 'lg:col-span-2' : ''}`}><span className="mb-2 block font-black">{label}</span><div className="form-field">{children}</div></label>
}
