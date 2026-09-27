import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PageHeader from '../components/ui/PageHeader'
import { MapPinned } from 'lucide-react'
import { categoryLabels } from '../lib/constants'
import CategoryIcon from '../components/ui/CategoryIcon'
import { useAdventures } from '../context/AdventureContext'
import { FALLBACK_ADVENTURE_PHOTO } from '../lib/placeholders'

const scrapbookPin = new Icon({
  iconUrl:
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
      <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 39s13-12.2 13-24A13 13 0 1 0 8 15c0 11.8 13 24 13 24Z" fill="#c2521b" stroke="#16211b" stroke-width="2"/>
        <circle cx="21" cy="15" r="5" fill="#f2ede3"/>
      </svg>
    `),
  iconSize: [42, 42],
  iconAnchor: [21, 42],
})

export default function MapView() {
  const { adventures } = useAdventures()
  const adventuresWithPins = adventures.filter(
    (adventure) => typeof adventure.latitude === 'number' && typeof adventure.longitude === 'number',
  )

  const [activeId, setActiveId] = useState(adventuresWithPins[0]?.id)
  const active = adventures.find((adventure) => adventure.id === activeId)

  const mapCenter = useMemo<[number, number]>(() => {
    const firstPinned = adventuresWithPins[0]

    if (typeof firstPinned?.latitude === 'number' && typeof firstPinned.longitude === 'number') {
      return [firstPinned.latitude, firstPinned.longitude]
    }

    return [32.8, -83.5]
  }, [adventuresWithPins])

  return (
    <>
      <PageHeader
        eyebrow="map view"
        title="Pinned memories"
        description="Every saved adventure with coordinates becomes a scrapbook pin on your travel map."
      />

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-2xl border border-stone bg-parchment p-2">
          <MapContainer
            center={mapCenter}
            zoom={adventuresWithPins.length ? 6 : 5}
            scrollWheelZoom
            className="travel-map h-[360px] w-full rounded-xl md:h-[590px]"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {adventuresWithPins.map((adventure) => (
              <Marker
                key={adventure.id}
                position={[adventure.latitude!, adventure.longitude!]}
                icon={scrapbookPin}
                eventHandlers={{
                  click: () => setActiveId(adventure.id),
                }}
              >
                <Popup>
                  <div className="max-w-[220px]">
                    <p className="font-display text-base font-semibold">{adventure.title}</p>
                    <p className="!my-1 text-muted">{adventure.location}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <aside className="panel self-start overflow-hidden">
          {active ? (
            <>
              <img
                src={active.coverPhoto || active.photos[0] || FALLBACK_ADVENTURE_PHOTO}
                alt={active.title}
                className="h-44 w-full object-cover sm:h-56"
              />

              <div className="p-5 sm:p-6">
              <p className="chip chip-spruce">
                <CategoryIcon category={active.category} size={14} strokeWidth={2} />
                {categoryLabels[active.category]} · pinned stop
              </p>

              <h2 className="mt-4 font-display text-[26px] font-medium leading-tight sm:text-3xl">{active.title}</h2>
              <p className="mt-2 text-sm font-medium text-muted">{active.location}</p>
              <p className="mt-4 leading-relaxed text-body">{active.description}</p>

              <Link
                to={`/adventures/${active.id}`}
                className="btn btn-primary mt-6 w-full sm:w-auto"
              >
                Open page
              </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center p-8 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-spruce text-bone"><MapPinned size={26} /></span>
              <p className="mt-4 font-display text-2xl font-medium">No map pins yet.</p>
              <p className="mt-2 text-sm text-muted">
                Add or edit an adventure and choose a location.
              </p>
            </div>
          )}
        </aside>
      </section>
    </>
  )
}