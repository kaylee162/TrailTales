import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import MobileTabBar from './MobileTabBar'

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 pb-32 pt-7 md:pb-20 md:pt-14">
        <Outlet />
      </main>
      <MobileTabBar />
    </div>
  )
}
