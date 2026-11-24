import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import StudentDetails from './pages/StudentDetails'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { StudentProvider } from './context/StudentContext'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
      <StudentProvider>
        <div className="min-h-screen bg-[#F8FAFC]">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="pt-[76px] lg:ml-[248px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </StudentProvider>
    </BrowserRouter>
  )
}

export default App
