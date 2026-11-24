import { useState } from 'react'
import { Menu, Search, Bell, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ onMenuClick }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const submitSearch = (event) => {
    event.preventDefault()
    navigate(`/students${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[76px] border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
      <div className="flex h-full items-center gap-3 px-4 sm:px-6 lg:px-7">
        <button type="button" onClick={onMenuClick} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] lg:hidden" aria-label="Open navigation">
          <Menu size={20} />
        </button>
        <div className="flex min-w-fit items-center gap-2.5 lg:w-[221px]">
          <div className="grid h-10 w-10 -skew-x-12 place-items-center rounded-lg bg-[#FF5C34] text-white">
            <span className="skew-x-12 text-xl font-black">S</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#FF5C34]">Student</p>
            <p className="text-sm font-black uppercase leading-4">Management</p>
          </div>
        </div>

        <form onSubmit={submitSearch} className="mx-auto flex h-11 w-full max-w-[520px] items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4">
          <Search size={17} className="shrink-0 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400" placeholder="Search students..." aria-label="Search students" />
          <span className="hidden rounded-md border border-[#E2E8F0] bg-white px-2 py-1 text-[10px] font-bold text-slate-400 md:block">ENTER</span>
        </form>

        <div className="flex min-w-fit items-center gap-2">
          <button type="button" className="focus-ring relative grid h-10 w-10 place-items-center rounded-full border border-[#E2E8F0] bg-white" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full border-2 border-white bg-[#FF5C34]" />
          </button>
          <button type="button" className="focus-ring hidden items-center gap-2 rounded-full border border-[#E2E8F0] p-1 pr-2 sm:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D7EFFF] text-xs font-black text-[#111827]">AK</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </header>
  )
}
