import { ShieldCheck, Database, Network, Mail, Headphones } from 'lucide-react'

export default function About() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-[28px] bg-[#FF5C34] px-6 py-10 text-white sm:px-10 lg:px-12">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D7EFFF]">Institutional overview</p>
        <h1 className="display-font mt-4 max-w-4xl text-5xl text-[#D7EFFF] sm:text-7xl">Built for the next campus.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/90">The Student Management System gives academic teams one clear operational view of enrollment, student profiles, departments, and performance—without adding unnecessary complexity.</p>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <article className="card p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-[#FF5C34]">Our mission</p><h2 className="mt-3 text-2xl font-black">Make every academic record useful.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">We turn fragmented student information into fast, dependable workflows. Advisors spend less time searching and more time supporting individual learning journeys.</p><div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#D7EFFF] p-4"><p className="text-2xl font-black">01</p><p className="mt-2 text-sm font-black">Central records</p></div><div className="rounded-2xl bg-[#F8FAFC] p-4"><p className="text-2xl font-black text-[#FF5C34]">02</p><p className="mt-2 text-sm font-black">Fast workflows</p></div><div className="rounded-2xl bg-[#F8FAFC] p-4"><p className="text-2xl font-black text-[#FF5C34]">03</p><p className="mt-2 text-sm font-black">Clear insights</p></div></div></article>
        <article className="rounded-[22px] bg-[#111827] p-6 text-white sm:p-8"><p className="text-xs font-black uppercase tracking-widest text-[#D7EFFF]">Core modules</p><div className="mt-5 space-y-3">{[['Student registry','Complete enrollment profiles'],['Academic analytics','GPA and attendance signals'],['Department control','Cross-campus distribution']].map(([title,copy]) => <div key={title} className="rounded-2xl border border-white/10 p-4"><p className="text-sm font-black">{title}</p><p className="mt-1 text-xs text-slate-400">{copy}</p></div>)}</div></article>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-3">
        {[{icon: ShieldCheck,title:'Role-ready access',copy:'Clear permissions and profile controls.'},{icon: Database,title:'Local-first data',copy:'Persistent browser storage with instant updates.'},{icon: Network,title:'Connected modules',copy:'Shared state across every dashboard view.'}].map(({icon: Icon,title,copy}) => <article key={title} className="lift card p-5"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#D7EFFF]"><Icon size={20} /></span><h3 className="mt-5 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p></article>)}
      </section>

      <section className="mt-5 flex flex-col justify-between gap-5 rounded-[24px] border border-[#E2E8F0] bg-white p-6 sm:flex-row sm:items-center"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#FF5C34] text-white"><Headphones size={21} /></span><div><p className="text-xs font-black uppercase tracking-widest text-[#FF5C34]">Support desk</p><p className="mt-1 font-black">Need a hand with student records?</p></div></div><a href="mailto:support@sms.campus.edu" className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#D7EFFF] px-5 text-sm font-black text-[#111827]"><Mail size={16} /> support@sms.campus.edu</a></section>
    </div>
  )
}
