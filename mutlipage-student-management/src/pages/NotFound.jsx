import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="grid min-h-[calc(100vh-76px)] place-items-center bg-[#FF5C34] p-6 text-center">
      <div><p className="display-font text-[150px] leading-[0.75] text-[#D7EFFF] sm:text-[220px]">404</p><h1 className="mt-8 text-2xl font-black text-white sm:text-4xl">This page left campus.</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/85">The route you requested does not exist. Return to the welcome screen or continue in the dashboard.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/" className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#D7EFFF] px-6 text-sm font-black text-[#111827]"><ArrowLeft size={17} /> Back home</Link><Link to="/dashboard" className="flex h-12 items-center justify-center rounded-full border border-[#D7EFFF] px-6 text-sm font-black text-[#D7EFFF]">Open dashboard</Link></div></div>
    </div>
  )
}
