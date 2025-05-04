import { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
// import Navbar from '../components/Navbar'
// import Sidebar from '../components/Sidebar'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
