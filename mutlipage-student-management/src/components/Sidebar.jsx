import { NavLink, useNavigate } from 'react-router-dom'
import { Home, LayoutDashboard, Users, CircleHelp, Plus, X } from 'lucide-react'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/students', label: 'Students Directory', icon: Users },
  { to: '/about', label: 'About', icon: CircleHelp },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  return (
    <>
      {open && <button type="button" aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-40 bg-[#111827]/30 lg:hidden" />}
      <aside className={`fixed bottom-0 left-0 top-[76px] z-50 w-[248px] border-r border-[#E2E8F0] bg-white px-4 pb-5 pt-6 transition-transform duration-300 lg:z-30 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2 lg:hidden">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Navigation</p>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-[#E2E8F0]" aria-label="Close navigation"><X size={18} /></button>
        </div>
        <nav className="mt-3 space-y-2 lg:mt-0">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} end={to === '/'} className={({ isActive }) => `flex h-12 items-center gap-3 rounded-full px-4 text-sm font-bold transition ${isActive ? 'bg-[#FF5C34] text-white' : 'text-[#111827] hover:bg-[#D7EFFF]'}`}>
              <Icon size={18} strokeWidth={2.2} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-5 left-4 right-4 border-t border-[#E2E8F0] pt-5">
          <button type="button" onClick={() => { navigate('/students'); onClose(); window.setTimeout(() => window.dispatchEvent(new CustomEvent('sms:add-student')), 50) }} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D7EFFF] text-sm font-black text-[#111827] transition hover:-translate-y-0.5">
            <Plus size={18} /> Add Student
          </button>
        </div>
      </aside>
    </>
  )
}
