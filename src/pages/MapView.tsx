import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PageHeader from '../components/ui/PageHeader'
import { categoryEmoji } from '../lib/constants'
import { useAdventures } from '../context/AdventureContext'

const scrapbookPin = new Icon({
  iconUrl:
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
      <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 39s13-12.2 13-24A13 13 0 1 0 8 15c0 11.8 13 24 13 24Z" fill="#f27c68" stroke="#2f241d" stroke-width="3"/>
        <circle cx="21" cy="15" r="5" fill="#fff7df" stroke="#2f241d" stroke-width="2"/>
      </svg>
    `),
  iconSize: [42, 42],
  iconAnchor: [21, 42],
})

export default function MapView() {
  const { adventures } = useAdventures()
  const adventuresWithPins = adventures.filter(
    (adventure) => adventure.latitude && adventure.longitude,
  )

  const [activeId, setActiveId] = useState(adventuresWithPins[0]?.id)
  const active = adventures.find((adventure) => adventure.id === activeId)

  const mapCenter = useMemo<[number, number]>(() => {
    const firstPinned = adventuresWithPins[0]

    if (firstPinned?.latitude && firstPinned?.longitude) {
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
        <div className="scrapbook-card overflow-hidden bg-mapblue p-3">
          <MapContainer
            center={mapCenter}
            zoom={adventuresWithPins.length ? 6 : 5}
            scrollWheelZoom
            className="h-[590px] w-full rounded-[2rem] border-3 border-ink"
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
                    <p className="font-black">
                      {categoryEmoji[adventure.category]} {adventure.title}
                    </p>
                    <p>{adventure.location}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <aside className="scrapbook-card bg-paper p-5">
          {active ? (
            <>
              <img
                src={active.coverPhoto || active.photos[0]}
                alt={active.title}
                className="h-56 w-full rounded-3xl border-3 border-ink object-cover"
              />

              <p className="sticker mt-5 inline-flex px-3 py-1 text-sm font-black">
                {categoryEmoji[active.category]} pinned stop
              </p>

              <h2 className="mt-4 text-3xl font-black">{active.title}</h2>
              <p className="mt-2 font-bold text-ink/70">{active.location}</p>
              <p className="mt-4 leading-7 text-ink/75">{active.description}</p>

              <Link
                to={`/adventures/${active.id}`}
                className="mt-6 inline-block rounded-2xl border-2 border-ink bg-coral px-5 py-3 font-black text-white shadow-hard-xs"
              >
                Open page
              </Link>
            </>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-ink/40 bg-white/70 p-6 text-center">
              <p className="text-4xl">🗺️</p>
              <p className="mt-3 font-black">No map pins yet.</p>
              <p className="mt-2 text-sm font-bold text-ink/60">
                Add or edit an adventure and choose a location.
              </p>
            </div>
          )}
        </aside>
      </section>
    </>
  )
}