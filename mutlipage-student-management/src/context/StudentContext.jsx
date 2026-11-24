/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const StudentContext = createContext(null)
const STORAGE_KEY = 'sms-students-v1'

const seedStudents = [
  { id: 'STU-1001', rollNumber: 'AI-24001', name: 'Aarav Mehta', email: 'aarav.mehta@campus.edu', phone: '+91 98765 41001', department: 'AI & ML', year: '3rd Year', gpa: 9.2, attendance: 94, status: 'Active', subjects: ['Machine Learning', 'Neural Networks', 'Python Systems', 'Data Mining'], admissionDate: '2024-08-12' },
  { id: 'STU-1002', rollNumber: 'CS-24018', name: 'Maya Kapoor', email: 'maya.kapoor@campus.edu', phone: '+91 98765 41002', department: 'Computer Science', year: '2nd Year', gpa: 8.8, attendance: 91, status: 'Active', subjects: ['Algorithms', 'Operating Systems', 'Database Systems', 'Web Engineering'], admissionDate: '2024-08-14' },
  { id: 'STU-1003', rollNumber: 'EE-24007', name: 'Kabir Sharma', email: 'kabir.sharma@campus.edu', phone: '+91 98765 41003', department: 'Electrical', year: '4th Year', gpa: 8.5, attendance: 88, status: 'Active', subjects: ['Power Systems', 'Control Theory', 'Embedded Systems', 'Smart Grids'], admissionDate: '2023-07-20' },
  { id: 'STU-1004', rollNumber: 'ME-24022', name: 'Isha Nair', email: 'isha.nair@campus.edu', phone: '+91 98765 41004', department: 'Mechanical', year: '2nd Year', gpa: 9.0, attendance: 96, status: 'Active', subjects: ['Thermodynamics', 'Fluid Mechanics', 'CAD Engineering', 'Materials Science'], admissionDate: '2024-08-12' },
  { id: 'STU-1005', rollNumber: 'CV-24011', name: 'Rohan Gupta', email: 'rohan.gupta@campus.edu', phone: '+91 98765 41005', department: 'Civil', year: '3rd Year', gpa: 7.9, attendance: 82, status: 'On Leave', subjects: ['Structural Analysis', 'Geotechnics', 'Construction Mgmt', 'Hydrology'], admissionDate: '2023-08-02' },
  { id: 'STU-1006', rollNumber: 'AI-24029', name: 'Zara Khan', email: 'zara.khan@campus.edu', phone: '+91 98765 41006', department: 'AI & ML', year: '1st Year', gpa: 9.4, attendance: 97, status: 'Active', subjects: ['Foundations of AI', 'Discrete Math', 'Programming', 'Statistics'], admissionDate: '2025-08-11' },
  { id: 'STU-1007', rollNumber: 'CS-24031', name: 'Devansh Rao', email: 'devansh.rao@campus.edu', phone: '+91 98765 41007', department: 'Computer Science', year: '1st Year', gpa: 8.6, attendance: 90, status: 'Active', subjects: ['Computer Fundamentals', 'C Programming', 'Digital Logic', 'Communication'], admissionDate: '2025-08-11' },
  { id: 'STU-1008', rollNumber: 'EE-24034', name: 'Ananya Bose', email: 'ananya.bose@campus.edu', phone: '+91 98765 41008', department: 'Electrical', year: '1st Year', gpa: 8.9, attendance: 93, status: 'Active', subjects: ['Circuit Analysis', 'Engineering Physics', 'Mathematics', 'Design Thinking'], admissionDate: '2025-08-13' },
  { id: 'STU-1009', rollNumber: 'ME-24036', name: 'Arjun Singh', email: 'arjun.singh@campus.edu', phone: '+91 98765 41009', department: 'Mechanical', year: '1st Year', gpa: 8.1, attendance: 86, status: 'Inactive', subjects: ['Engineering Drawing', 'Mechanics', 'Workshop Practice', 'Mathematics'], admissionDate: '2025-08-14' },
]

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : seedStudents
    } catch {
      return seedStudents
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  }, [students])

  const addStudent = (student) => {
    const nextNumber = Math.max(1000, ...students.map((item) => Number(item.id.replace('STU-', '')) || 1000)) + 1
    setStudents((current) => [{ ...student, id: `STU-${nextNumber}` }, ...current])
  }

  const updateStudent = (id, updates) => {
    setStudents((current) => current.map((item) => item.id === id ? { ...item, ...updates } : item))
  }

  const deleteStudent = (id) => setStudents((current) => current.filter((item) => item.id !== id))

  return (
    <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentContext)
  if (!context) throw new Error('useStudents must be used within StudentProvider')
  return context
}
