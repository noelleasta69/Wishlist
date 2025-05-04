import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-850 border-r border-gray-700 h-full px-4 py-6 space-y-4">
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 font-semibold' : ''
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 font-semibold' : ''
            }`
          }
        >
          Wishlists
        </NavLink>
      </nav>
    </aside>
  )
}
