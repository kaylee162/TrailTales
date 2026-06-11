import { useState } from 'react'
import type { ChangeEvent, DragEvent, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertCircle, ImagePlus, Trash2, GripVertical, Star } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { adventureCategories, categoryLabels } from '../lib/constants'
import { compressImage } from '../lib/imageUtils'
import { useAdventures } from '../context/AdventureContext'
import type { Adventure, AdventureCategory } from '../types/adventure'
import LocationPicker from '../components/forms/LocationPicker'

const blank: Omit<Adventure, 'id'> = {
  title: '',
  location: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'hike',
  description: '',
  journal: '',
  miles: 0,
  rating: 5,
  mood: '',
  tags: [],
  favoriteMoment: '',
  isFavorite: false,
  isPark: false,
  state: '',
  country: 'United States',
  latitude: undefined,
  longitude: undefined,
  coverPhoto: '',
  photos: [],
}

export default function AdventureForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addAdventure, updateAdventure, getAdventureById } = useAdventures()
  const existing = id ? getAdventureById(id) : undefined
  const startingPhotos = existing?.photos.length
    ? existing.photos
    : existing?.coverPhoto
      ? [existing.coverPhoto]
      : []
  const [form, setForm] = useState<Omit<Adventure, 'id'>>(
    existing
      ? { ...existing, photos: startingPhotos, coverPhoto: startingPhotos[0] ?? '' }
      : blank,
  )
  const [tagText, setTagText] = useState(existing?.tags.join(', ') ?? '')
  const [isDraggingUpload, setIsDraggingUpload] = useState(false)
  const [draggedPhotoIndex, setDraggedPhotoIndex] = useState<number | null>(null)
  const [saveError, setSaveError] = useState('')

  const update = <K extends keyof Omit<Adventure, 'id'>>(
    key: K,
    value: Omit<Adventure, 'id'>[K],
  ) => setForm((current) => ({ ...current, [key]: value }))

  const addPhotos = async (files: FileList | File[]) => {
    const selectedFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))

    if (!selectedFiles.length) return

    const openSlots = 8 - form.photos.length

    if (openSlots <= 0) {
      alert('You can save up to 8 photos per adventure. Delete one before adding another.')
      return
    }

    try {
      const compressedPhotos = await Promise.all(
        selectedFiles.slice(0, openSlots).map((file) => compressImage(file)),
      )

      setForm((current) => {
        const photos = [...current.photos, ...compressedPhotos].slice(0, 8)

        return {
          ...current,
          photos,
          coverPhoto: photos[0] ?? '',
        }
      })
    } catch {
      alert('One of those photos could not be uploaded. Try a smaller image.')
    }
  }

  const handlePhotoInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) addPhotos(event.target.files)
    event.target.value = ''
  }

  const handleUploadDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDraggingUpload(false)
    addPhotos(Array.from(event.dataTransfer.files))
  }

  const deletePhoto = (photoIndex: number) => {
    setForm((current) => {
      const photos = current.photos.filter((_, index) => index !== photoIndex)

      return {
        ...current,
        photos,
        coverPhoto: photos[0] ?? '',
      }
    })
  }

  const movePhoto = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return

    setForm((current) => {
      const photos = [...current.photos]
      const [movedPhoto] = photos.splice(fromIndex, 1)
      photos.splice(toIndex, 0, movedPhoto)

      return {
        ...current,
        photos,
        coverPhoto: photos[0] ?? '',
      }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSaveError('')

    const cleanedPhotos = form.photos.length
      ? form.photos
      : form.coverPhoto
        ? [form.coverPhoto]
        : []

    const cleaned = {
      ...form,
      title: form.title.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      journal: form.journal.trim(),
      favoriteMoment: form.favoriteMoment.trim(),
      mood: form.mood.trim(),
      state: form.state?.trim(),
      country: form.country?.trim(),
      miles: Math.max(0, Number(form.miles) || 0),
      rating: Math.min(5, Math.max(1, Number(form.rating) || 1)),
      tags: tagText
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      photos: cleanedPhotos,
      coverPhoto: cleanedPhotos[0] ?? '',
    }

    if (existing && id) {
      const didSave = updateAdventure(id, cleaned)

      if (didSave) {
        navigate(`/adventures/${id}`)
      } else {
        setSaveError('Your changes were not saved. Try removing a few photos or using smaller photos.')
      }
    } else {
      const newId = addAdventure(cleaned)

      if (newId) {
        navigate(`/adventures/${newId}`)
      } else {
        setSaveError('This adventure was not saved. Try removing a few photos or using smaller photos.')
      }
    }
  }

  return (
    <>
      <PageHeader
        eyebrow={existing ? 'edit page' : 'new page'}
        title={existing ? 'Update adventure' : 'Add an adventure'}
        description="Fill in the memory, pin, stats, and photo scraps for this journal page."
      />

      <form onSubmit={handleSubmit} className="scrapbook-card grid gap-6 bg-paper p-6 lg:grid-cols-2">
        {saveError && (
          <div className="flex items-start gap-3 rounded-2xl border-2 border-ink bg-sun/35 p-4 font-bold text-ink lg:col-span-2">
            <AlertCircle className="mt-0.5 shrink-0 text-coral" size={20} />
            <p>{saveError}</p>
          </div>
        )}
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

        <section className="lg:col-span-2">
          <div className="mb-2 flex items-end justify-between gap-3">
            <div>
              <p className="font-black">Photo scraps</p>
              <p className="text-sm font-bold text-ink/60">Drag images here or browse. The first photo is always the cover image.</p>
            </div>
            <p className="rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-black shadow-hard-xs">{form.photos.length}/8 photos</p>
          </div>

          <label
            onDragOver={(event) => {
              event.preventDefault()
              setIsDraggingUpload(true)
            }}
            onDragLeave={() => setIsDraggingUpload(false)}
            onDrop={handleUploadDrop}
            className={`photo-dropzone ${isDraggingUpload ? 'photo-dropzone-active' : ''}`}
          >
            <input className="sr-only" type="file" accept="image/*" multiple onChange={handlePhotoInput} />
            <span className="photo-dropzone-icon"><ImagePlus size={34} /></span>
            <span className="text-2xl font-black">Drop adventure photos here</span>
            <span className="max-w-md text-center text-sm font-bold text-ink/60">or click to browse. Photos are compressed and saved locally in this browser.</span>
          </label>

          {form.photos.length > 0 && (
            <div className="photo-sort-board mt-5">
              {form.photos.map((photo, index) => (
                <article
                  key={`${photo}-${index}`}
                  draggable
                  onDragStart={() => setDraggedPhotoIndex(index)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    if (draggedPhotoIndex !== null) movePhoto(draggedPhotoIndex, index)
                    setDraggedPhotoIndex(null)
                  }}
                  onDragEnd={() => setDraggedPhotoIndex(null)}
                  className={`photo-sort-card ${index === 0 ? 'photo-cover-card' : ''}`}
                >
                  <img src={photo} alt={`Uploaded adventure ${index + 1}`} />
                  <div className="photo-sort-toolbar">
                    <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-paper px-2 py-1 text-xs font-black shadow-hard-xs">
                      {index === 0 ? <Star size={13} fill="currentColor" /> : <GripVertical size={13} />}
                      {index === 0 ? 'Cover' : `Photo ${index + 1}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => deletePhoto(index)}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-coral text-white shadow-hard-xs"
                      aria-label="Delete photo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-wrap gap-6 lg:col-span-2"><label className="flex items-center gap-3 font-black"><input type="checkbox" checked={form.isFavorite} onChange={(e) => update('isFavorite', e.target.checked)} /> Favorite</label><label className="flex items-center gap-3 font-black"><input type="checkbox" checked={form.isPark} onChange={(e) => update('isPark', e.target.checked)} /> National/state park</label></div>
        <button className="rounded-2xl border-3 border-ink bg-coral px-7 py-4 text-lg font-black text-white shadow-hard lg:col-span-2">Save adventure</button>
      </form>
    </>
  )
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={`block ${wide ? 'lg:col-span-2' : ''}`}><span className="mb-2 block font-black">{label}</span><div className="form-field">{children}</div></label>
}
