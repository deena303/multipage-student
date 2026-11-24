import { ArrowLeft, Pencil, Mail, Phone, Calendar, Award, Activity, BookOpen } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useStudents } from '../context/StudentContext'

export default function StudentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { students, updateStudent } = useStudents()
  const student = students.find((item) => item.id === id)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)

  if (!student) {
    return <div className="p-8"><div className="card p-10 text-center"><h1 className="text-3xl font-black">Student not found</h1><p className="mt-2 text-slate-500">This profile may have been deleted or moved.</p><Link to="/students" className="mt-6 inline-flex rounded-full bg-[#FF5C34] px-5 py-3 text-sm font-black text-white">Back to directory</Link></div></div>
  }

  const openEdit = () => { setForm({ ...student, subjects: student.subjects.join(', ') }); setEditing(true) }
  const save = (event) => {
    event.preventEvent?.()
    event.preventDefault()
    updateStudent(id, { ...form, gpa: Number(form.gpa), attendance: Number(form.attendance), subjects: form.subjects.split(',').map((item) => item.trim()).filter(Boolean) })
    setEditing(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Link to="/students" className="mb-5 inline-flex items-center gap-2 text-sm font-black text-slate-600"><ArrowLeft size={17} /> Back to directory</Link>
      <section className="relative overflow-hidden rounded-[28px] bg-[#FF5C34] p-6 text-white sm:p-8 lg:p-10">
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border-[28px] border-[#D7EFFF]/20" />
        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center"><span className="grid h-24 w-24 shrink-0 place-items-center rounded-[26px] bg-[#D7EFFF] text-3xl font-black text-[#111827]">{student.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div><p className="mb-2 inline-block rounded-full border border-[#D7EFFF]/60 px-3 py-1 text-xs font-black text-[#D7EFFF]">{student.rollNumber}</p><h1 className="display-font text-4xl text-[#D7EFFF] sm:text-5xl">{student.name}</h1><p className="mt-2 text-sm font-bold">{student.department} · {student.year}</p></div></div>
          <button type="button" onClick={openEdit} className="flex h-12 items-center justify-center gap-2 self-start rounded-full bg-[#D7EFFF] px-5 text-sm font-black text-[#111827] transition hover:-translate-y-1 md:self-auto"><Pencil size={16} /> Edit Profile</button>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.35fr]">
        <article className="card p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-widest text-[#FF5C34]">Academic metrics</p>
          <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-[#D7EFFF] p-5"><Award size={19} className="mb-5" /><p className="text-xs font-bold text-slate-600">GPA</p><p className="mt-1 text-3xl font-black">{student.gpa.toFixed(1)}</p></div><div className="rounded-2xl bg-[#111827] p-5 text-white"><Activity size={19} className="mb-5 text-[#D7EFFF]" /><p className="text-xs font-bold text-slate-300">Attendance</p><p className="mt-1 text-3xl font-black">{student.attendance}%</p></div></div>
          <div className="mt-5 border-t border-[#E2E8F0] pt-5 space-y-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#F8FAFC]"><Mail size={16} /></span><div><p className="text-[11px] font-bold uppercase text-slate-400">Email</p><p className="text-sm font-bold">{student.email}</p></div></div><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#F8FAFC]"><Phone size={16} /></span><div><p className="text-[11px] font-bold uppercase text-slate-400">Phone</p><p className="text-sm font-bold">{student.phone}</p></div></div><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#F8FAFC]"><Calendar size={16} /></span><div><p className="text-[11px] font-bold uppercase text-slate-400">Admission date</p><p className="text-sm font-bold">{student.admissionDate}</p></div></div></div>
        </article>
        <article className="card p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-[#FF5C34]">Current semester</p><h2 className="mt-1 text-xl font-black">Enrolled subjects</h2></div><BookOpen size={22} className="text-slate-400" /></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{student.subjects.map((subject, index) => <div key={subject} className="flex min-h-20 items-center gap-3 rounded-2xl border border-[#E2E8F0] p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F8FAFC] text-xs font-black text-[#FF5C34]">{String(index + 1).padStart(2, '0')}</span><p className="text-sm font-black">{subject}</p></div>)}</div><div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F8FAFC] p-4"><div><p className="text-xs text-slate-500">Student status</p><p className="mt-1 font-black">{student.status}</p></div><span className={`h-3 w-3 rounded-full ${student.status === 'Active' ? 'bg-[#FF5C34]' : 'bg-slate-400'}`} /></div></article>
      </section>

      {editing && <div className="fixed inset-0 z-[70] grid place-items-center bg-[#111827]/50 p-4"><form onSubmit={save} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[24px] bg-white p-6"><div className="flex items-center justify-between"><h2 className="text-2xl font-black">Edit Profile</h2><button type="button" onClick={() => setEditing(false)} className="rounded-full border border-[#E2E8F0] px-4 py-2 text-sm font-black">Close</button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold">Full Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3" /></label><label className="text-xs font-bold">Roll Number<input value={form.rollNumber} onChange={(event) => setForm({ ...form, rollNumber: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3" /></label><label className="text-xs font-bold">Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3" /></label><label className="text-xs font-bold">Phone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3" /></label><label className="text-xs font-bold">GPA<input type="number" min="0" max="10" step="0.1" value={form.gpa} onChange={(event) => setForm({ ...form, gpa: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3" /></label><label className="text-xs font-bold">Attendance<input type="number" min="0" max="100" value={form.attendance} onChange={(event) => setForm({ ...form, attendance: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3" /></label></div><label className="mt-4 block text-xs font-bold">Subjects<input value={form.subjects} onChange={(event) => setForm({ ...form, subjects: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3" /></label><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => navigate('/students')} className="h-11 rounded-full border border-[#E2E8F0] px-5 text-sm font-black">Directory</button><button type="submit" className="h-11 rounded-full bg-[#D7EFFF] px-5 text-sm font-black text-[#111827]">Save profile</button></div></form></div>}
    </div>
  )
}
