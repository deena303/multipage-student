import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus, Search, Eye, Pencil, Trash2, X, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStudents } from '../context/StudentContext'

const departments = ['All', 'AI & ML', 'Computer Science', 'Electrical', 'Mechanical', 'Civil']
const emptyStudent = { name: '', rollNumber: '', email: '', phone: '', department: 'AI & ML', year: '1st Year', gpa: 8.5, attendance: 90, status: 'Active', subjects: '' }

export default function Students() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents()
  const [params] = useSearchParams()
  const [search, setSearch] = useState(params.get('q') || '')
  const [department, setDepartment] = useState('All')
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyStudent)
  const navigate = useNavigate()

  useEffect(() => {
    const openModal = () => { setForm(emptyStudent); setModal('add') }
    window.addEventListener('sms:add-student', openModal)
    return () => window.removeEventListener('sms:add-student', openModal)
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return students.filter((student) => {
      const matchesDepartment = department === 'All' || student.department === department
      const matchesSearch = !term || [student.name, student.rollNumber, student.email].some((value) => value.toLowerCase().includes(term))
      return matchesDepartment && matchesSearch
    })
  }, [students, search, department])

  const openAdd = () => { setForm(emptyStudent); setModal('add') }
  const openEdit = (student) => { setForm({ ...student, subjects: student.subjects?.join(', ') || '' }); setModal(student.id) }
  const submit = (event) => {
    event.preventDefault()
    const payload = { ...form, gpa: Number(form.gpa), attendance: Number(form.attendance), subjects: typeof form.subjects === 'string' ? form.subjects.split(',').map((item) => item.trim()).filter(Boolean) : form.subjects }
    if (modal === 'add') addStudent({ ...payload, admissionDate: new Date().toISOString().slice(0, 10) })
    else updateStudent(modal, payload)
    setModal(null)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF5C34]">Student records</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Students Directory</h1></div>
        <button type="button" onClick={openAdd} className="flex h-12 items-center gap-2 self-start rounded-full bg-[#FF5C34] px-5 text-sm font-black text-white transition hover:-translate-y-0.5"><Plus size={18} /> Add Student</button>
      </div>
      <section className="card overflow-hidden">
        <div className="border-b border-[#E2E8F0] p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex h-11 max-w-md items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4"><Search size={17} className="text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" placeholder="Name, roll number, or email" /></div>
            <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 xl:pb-0">{departments.map((item) => <button type="button" key={item} onClick={() => setDepartment(item)} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-black ${department === item ? 'bg-[#111827] text-white' : 'border border-[#E2E8F0] bg-white text-slate-600'}`}>{item}</button>)}</div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead className="bg-[#F8FAFC] text-[11px] uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3.5">Student</th><th className="px-5 py-3.5">Roll / Department</th><th className="px-5 py-3.5">Year</th><th className="px-5 py-3.5">GPA</th><th className="px-5 py-3.5">Status</th><th className="px-5 py-3.5 text-right">Actions</th></tr></thead>
            <tbody>{filtered.map((student) => (
              <tr key={student.id} onClick={() => navigate(`/students/${student.id}`)} className="cursor-pointer border-t border-[#E2E8F0] text-sm transition hover:bg-[#F8FAFC]">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D7EFFF] text-xs font-black">{student.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div><p className="font-black">{student.name}</p><p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><Mail size={11} /> {student.email}</p></div></div></td>
                <td className="px-5 py-4"><p className="font-mono text-xs font-bold">{student.rollNumber}</p><p className="mt-1 text-xs text-slate-500">{student.department}</p></td>
                <td className="px-5 py-4 font-semibold">{student.year}</td><td className="px-5 py-4"><span className="font-black text-[#FF5C34]">{student.gpa.toFixed(1)}</span></td>
                <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${student.status === 'Active' ? 'bg-[#D7EFFF] text-[#111827]' : 'bg-slate-100 text-slate-600'}`}>{student.status}</span></td>
                <td className="px-5 py-4"><div onClick={(event) => event.stopPropagation()} className="flex justify-end gap-1"><button type="button" onClick={() => navigate(`/students/${student.id}`)} className="grid h-9 w-9 place-items-center rounded-full border border-[#E2E8F0]" title="View profile"><Eye size={16} /></button><button type="button" onClick={() => openEdit(student)} className="grid h-9 w-9 place-items-center rounded-full border border-[#E2E8F0]" title="Edit"><Pencil size={15} /></button><button type="button" onClick={() => setDeleteTarget(student)} className="grid h-9 w-9 place-items-center rounded-full border border-[#E2E8F0] text-[#FF5C34]" title="Delete"><Trash2 size={15} /></button></div></td>
              </tr>
            ))}</tbody>
          </table>
          {!filtered.length && <div className="p-10 text-center"><p className="font-black">No students found</p><p className="mt-1 text-sm text-slate-500">Adjust the search or department filter.</p></div>}
        </div>
        <div className="flex items-center justify-between border-t border-[#E2E8F0] px-5 py-4 text-xs font-bold text-slate-500"><span>{filtered.length} of {students.length} students</span><div className="flex gap-2"><button type="button" className="grid h-8 w-8 place-items-center rounded-full border border-[#E2E8F0]" aria-label="Previous page"><ChevronLeft size={15} /></button><button type="button" className="grid h-8 w-8 place-items-center rounded-full bg-[#111827] text-white" aria-label="Next page"><ChevronRight size={15} /></button></div></div>
      </section>

      {modal && <div className="fixed inset-0 z-[70] grid place-items-center bg-[#111827]/50 p-4"><form onSubmit={submit} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl sm:p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-[#FF5C34]">{modal === 'add' ? 'New record' : 'Update record'}</p><h2 className="mt-1 text-2xl font-black">{modal === 'add' ? 'Add Student' : 'Edit Student'}</h2></div><button type="button" onClick={() => setModal(null)} className="grid h-10 w-10 place-items-center rounded-full border border-[#E2E8F0]" aria-label="Close"><X size={18} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{[['name','Full Name','text'],['rollNumber','Roll Number','text'],['email','Email','email'],['phone','Phone','tel']].map(([key,label,type]) => <label key={key} className="text-xs font-bold">{label}<input required type={type} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3 text-sm outline-none focus:border-[#FF5C34]" /></label>)}</div><div className="mt-4 grid gap-4 sm:grid-cols-3"><label className="text-xs font-bold">Department<select value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3 text-sm">{departments.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-xs font-bold">Year<select value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3 text-sm">{['1st Year','2nd Year','3rd Year','4th Year'].map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-xs font-bold">Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3 text-sm">{['Active','On Leave','Inactive'].map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold">GPA<input required type="number" min="0" max="10" step="0.1" value={form.gpa} onChange={(event) => setForm({ ...form, gpa: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3 text-sm" /></label><label className="text-xs font-bold">Attendance %<input required type="number" min="0" max="100" value={form.attendance} onChange={(event) => setForm({ ...form, attendance: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3 text-sm" /></label></div><label className="mt-4 block text-xs font-bold">Enrolled subjects (comma separated)<input value={form.subjects} onChange={(event) => setForm({ ...form, subjects: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] px-3 text-sm" placeholder="Algorithms, Databases" /></label><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setModal(null)} className="h-11 rounded-full border border-[#E2E8F0] px-5 text-sm font-black">Cancel</button><button type="submit" className="h-11 rounded-full bg-[#D7EFFF] px-5 text-sm font-black text-[#111827]">{modal === 'add' ? 'Create student' : 'Save changes'}</button></div></form></div>}
      {deleteTarget && <div className="fixed inset-0 z-[70] grid place-items-center bg-[#111827]/50 p-4"><div className="w-full max-w-md rounded-[24px] bg-white p-7 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#FF5C34]/10 text-[#FF5C34]"><Trash2 size={24} /></span><h2 className="mt-4 text-xl font-black">Delete {deleteTarget.name}?</h2><p className="mt-2 text-sm leading-6 text-slate-500">This permanently removes the student profile and all of its records.</p><div className="mt-6 flex gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="h-11 flex-1 rounded-full border border-[#E2E8F0] text-sm font-black">Cancel</button><button type="button" onClick={() => { deleteStudent(deleteTarget.id); setDeleteTarget(null) }} className="h-11 flex-1 rounded-full bg-[#FF5C34] text-sm font-black text-white">Delete</button></div></div></div>}
    </div>
  )
}
