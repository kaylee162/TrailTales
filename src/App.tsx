import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdventureProvider } from './context/AdventureContext'
import AppLayout from './components/layout/AppLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Adventures from './pages/Adventures'
import AdventureDetail from './pages/AdventureDetail'
import AdventureForm from './pages/AdventureForm'
import MapView from './pages/MapView'
import Stats from './pages/Stats'
import Trips from './pages/Trips'
import Wrapped from './pages/Wrapped'
import Settings from './pages/Settings'

function App() {
  return (
    <AdventureProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adventures" element={<Adventures />} />
            <Route path="/adventures/new" element={<AdventureForm />} />
            <Route path="/adventures/:id" element={<AdventureDetail />} />
            <Route path="/adventures/:id/edit" element={<AdventureForm />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/wrapped" element={<Wrapped />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdventureProvider>
  )
}

export default App
