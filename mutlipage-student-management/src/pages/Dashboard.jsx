import { ArrowUpRight, Users, BookOpen, CalendarCheck, UserPlus, Plus, Download, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStudents } from '../context/StudentContext'

export default function Dashboard() {
  const { students } = useStudents()
  const active = students.filter((student) => student.status === 'Active').length
  const attendance = students.length ? Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / students.length) : 0
  const metrics = [
    { label: 'Total Students', value: students.length, change: '+8.2%', icon: Users, sky: true },
    { label: 'Active Courses', value: 32, change: '+4.1%', icon: BookOpen },
    { label: 'Attendance Rate', value: `${attendance}%`, change: '+2.8%', icon: CalendarCheck, sky: true },
    { label: 'New Admissions', value: 18, change: '+12%', icon: UserPlus },
  ]
  const departments = ['AI & ML', 'Computer Science', 'Electrical', 'Mechanical', 'Civil'].map((department) => ({
    department,
    count: students.filter((student) => student.department === department).length,
  }))

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF5C34]">Executive overview</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Campus Dashboard</h1></div>
        <button type="button" className="flex h-11 items-center gap-2 self-start rounded-full border border-[#E2E8F0] bg-white px-5 text-sm font-bold"><Download size={16} /> Export report</button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, change, icon: Icon, sky }) => (
          <article key={label} className={`lift relative min-h-[158px] overflow-hidden rounded-[22px] p-5 ${sky ? 'bg-[#D7EFFF]' : 'bg-[#FF5C34] text-white'}`}>
            <div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-full ${sky ? 'bg-white' : 'bg-white/15'}`}><Icon size={18} /></span><span className={`rounded-full px-2.5 py-1 text-xs font-black ${sky ? 'bg-white text-[#111827]' : 'bg-[#D7EFFF] text-[#111827]'}`}>{change}</span></div>
            <p className="mt-5 text-sm font-bold opacity-75">{label}</p><p className="mt-1 text-4xl font-black">{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <article className="card p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-[#FF5C34]">Distribution</p><h2 className="mt-1 text-xl font-black">Students by department</h2></div><BarChart3 size={22} className="text-slate-400" /></div>
          <div className="space-y-5">
            {departments.map(({ department, count }) => (
              <div key={department}><div className="mb-2 flex items-center justify-between text-sm"><span className="font-bold">{department}</span><span className="font-black text-slate-500">{count}</span></div><div className="h-3 overflow-hidden rounded-full bg-[#F1F5F9]"><div className="h-full rounded-full bg-[#FF5C34]" style={{ width: `${students.length ? Math.max(8, (count / students.length) * 100) : 0}%` }} /></div></div>
            ))}
          </div>
        </article>

        <article className="rounded-[22px] bg-[#111827] p-5 text-white sm:p-6">
          <p className="text-xs font-black uppercase tracking-widest text-[#D7EFFF]">Quick actions</p>
          <div className="mt-5 space-y-3">
            <Link to="/students" onClick={() => window.setTimeout(() => window.dispatchEvent(new CustomEvent('sms:add-student')), 50)} className="flex h-14 items-center justify-between rounded-2xl bg-[#FF5C34] px-4 text-sm font-black"><span className="flex items-center gap-3"><Plus size={18} /> Add student</span><ArrowUpRight size={18} /></Link>
            <Link to="/students" className="flex h-14 items-center justify-between rounded-2xl border border-white/15 px-4 text-sm font-black hover:bg-white/5"><span>View directory</span><ArrowUpRight size={18} /></Link>
            <Link to="/about" className="flex h-14 items-center justify-between rounded-2xl border border-white/15 px-4 text-sm font-black hover:bg-white/5"><span>System support</span><ArrowUpRight size={18} /></Link>
          </div>
          <p className="mt-6 text-xs text-slate-400">{active} active profiles in the system</p>
        </article>
      </section>

      <section className="card mt-5 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-5 sm:px-6"><div><p className="text-xs font-black uppercase tracking-widest text-[#FF5C34]">Latest activity</p><h2 className="mt-1 text-xl font-black">Recent enrollments</h2></div><Link to="/students" className="text-sm font-black text-[#FF5C34]">View all →</Link></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-[#F8FAFC] text-xs uppercase text-slate-500"><tr><th className="px-6 py-3">Student</th><th className="px-6 py-3">Department</th><th className="px-6 py-3">Roll number</th><th className="px-6 py-3">Status</th></tr></thead><tbody>{[...students].sort((a, b) => b.admissionDate.localeCompare(a.admissionDate)).slice(0, 5).map((student) => (
          <tr key={student.id} className="border-t border-[#E2E8F0]"><td className="px-6 py-4"><Link to={`/students/${student.id}`} className="font-bold hover:text-[#FF5C34]">{student.name}</Link></td><td className="px-6 py-4 text-slate-600">{student.department}</td><td className="px-6 py-4 font-mono text-xs">{student.rollNumber}</td><td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${student.status === 'Active' ? 'bg-[#D7EFFF] text-[#111827]' : 'bg-slate-100 text-slate-600'}`}>{student.status}</span></td></tr>
        ))}</tbody></table></div>
      </section>
    </div>
  )
}
