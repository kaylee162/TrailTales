# TrailTales 🌿🗺️

TrailTales is a scrapbook-inspired adventure journal built with React, TypeScript, and Tailwind CSS. The app lets users log hikes, trips, parks, and memories through an interactive map and cozy travel-journal aesthetic.

Designed to feel like a mix between a national park passport book, a travel scrapbook, and a modern dashboard.

---

## Features

### Adventure Logging

* Create, edit, and delete adventures
* Upload and preview photos
* Add descriptions, favorite moments, miles traveled, tags, and categories
* Save locations with an interactive map picker

### Interactive Map

* OpenStreetMap + Leaflet integration
* Search for locations like “Tybee Island” or “Yosemite”
* Custom scrapbook-style map pins
* Clickable adventure markers

### Dashboard + Stats

* Quick travel statistics
* Adventure counts
* Miles traveled
* States and countries visited
* Favorite memories
* Recent adventures

### Scrapbook UI

* Warm outdoors-inspired color palette
* Polaroid-style photo cards
* Sticker-inspired UI elements
* Rounded paper/card layouts
* Animated transitions with Framer Motion

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* React Router

### Maps

* React Leaflet
* OpenStreetMap
* Nominatim Geocoding API

### Data

* LocalStorage (temporary)
* Planned migration to Supabase backend + storage

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/yourusername/trailtales.git
cd trailtales
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Location Search

This project uses:

* OpenStreetMap
* Leaflet
* Nominatim Geocoding

No API key or credit card is required.

---

## Photo Storage

Currently, uploaded photos are compressed and stored locally using browser localStorage.

Future versions will migrate image uploads to Supabase Storage for better scalability.

---

## Planned Features

* Adventure Wrapped yearly recap
* Timeline view
* Trip collections + routes
* Achievement badges
* Search + advanced filtering
* Mobile optimization
* Supabase authentication + cloud storage
* Shareable adventure pages

---

## Design Direction

The visual inspiration for TrailTales comes from:

* Travel journals
* Scrapbooks
* National park passport books
* Vintage outdoor posters
* Cozy map interfaces

The goal was to create something playful and memorable rather than a traditional “resume-style” travel tracker.

---

## License

Kaylee Henry  
Georgia Institute of Technology  
This project is for educational and portfolio purposes.
