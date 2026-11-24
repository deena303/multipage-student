import { ArrowRight, Users, GraduationCap, CalendarCheck, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStudents } from '../context/StudentContext'

export default function Home() {
  const { students } = useStudents()
  const departments = new Set(students.map((student) => student.department)).size
  const features = [
    { icon: Users, title: 'Student Directory', copy: 'Find, add, update, and manage every campus profile.', to: '/students' },
    { icon: GraduationCap, title: 'Academic Records', copy: 'Track grades, departments, subjects, and enrollment year.', to: '/dashboard' },
    { icon: CalendarCheck, title: 'Attendance Pulse', copy: 'Monitor participation and campus-wide presence trends.', to: '/dashboard' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="relative overflow-hidden rounded-[28px] bg-[#FF5C34] px-6 py-8 text-white sm:px-9 sm:py-10 lg:min-h-[430px] lg:px-12 lg:py-12">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[36px] border-[#D7EFFF]/25" />
        <div className="relative max-w-5xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#D7EFFF]"><span className="h-px w-10 bg-[#D7EFFF]" /> Campus operating system / 2026</p>
          <h1 className="display-font max-w-4xl text-[52px] leading-[0.88] text-[#D7EFFF] sm:text-[72px] lg:text-[92px]">Manage your campus pace.</h1>
          <div className="mt-8 flex flex-col items-start justify-between gap-7 border-t border-[#D7EFFF]/60 pt-7 sm:flex-row sm:items-end">
            <Link to="/dashboard" className="group flex h-13 items-center gap-6 rounded-full bg-[#D7EFFF] px-6 text-sm font-black text-[#111827] transition hover:-translate-y-1">
              OPEN DASHBOARD <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="grid grid-cols-2 divide-x divide-[#D7EFFF]/60">
              <div className="pr-6 sm:px-8"><p className="display-font text-4xl text-[#D7EFFF]">{students.length}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider">Total enrolled</p></div>
              <div className="pl-6 sm:px-8"><p className="display-font text-4xl text-[#D7EFFF]">{departments}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider">Departments</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {features.map(({ icon: Icon, title, copy, to }) => (
          <Link key={title} to={to} className="lift card group flex min-h-[180px] flex-col justify-between p-6">
            <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#D7EFFF] text-[#111827]"><Icon size={20} /></span><ArrowRight size={20} className="text-[#FF5C34] transition-transform group-hover:translate-x-1" /></div>
            <div className="mt-8"><h2 className="text-lg font-black">{title}</h2><p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">{copy}</p></div>
          </Link>
        ))}
      </section>

      <section className="mt-6 flex flex-col justify-between gap-5 rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#FF5C34] text-white"><BookOpen size={21} /></span><div><p className="text-xs font-black uppercase tracking-widest text-[#FF5C34]">Live system</p><p className="mt-1 font-bold">Academic records are synchronized</p></div></div>
        <Link to="/students" className="rounded-full border border-[#E2E8F0] px-5 py-3 text-sm font-black transition hover:border-[#FF5C34]">View directory →</Link>
      </section>
    </div>
  )
}
