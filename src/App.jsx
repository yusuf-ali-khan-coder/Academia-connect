import { useState, createContext, useContext, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import { students } from './data/mockData'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))
const SkillAssessment = lazy(() => import('./pages/SkillAssessment'))
const CareerAnalysis = lazy(() => import('./pages/CareerAnalysis'))
const Opportunities = lazy(() => import('./pages/Opportunities'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Applications = lazy(() => import('./pages/Applications'))
const InstitutionDashboard = lazy(() => import('./pages/InstitutionDashboard'))
const Collaboration = lazy(() => import('./pages/Collaboration'))

export const AppContext = createContext()
export const useApp = () => useContext(AppContext)

function formatUser(authUser) {
  if (!authUser) return null
  const defaultStudent = students[0]
  return {
    ...defaultStudent,
    ...authUser,
    skills: (authUser.skills && authUser.skills.length > 0)
      ? authUser.skills.map(s => ({
          name: s.skillName || s.name,
          assessmentScore: s.score !== undefined ? s.score : (s.assessmentScore || 70),
          score: s.score !== undefined ? s.score : (s.assessmentScore || 70),
          level: s.level || (s.score >= 80 ? 'expert' : s.score >= 60 ? 'advanced' : s.score >= 40 ? 'intermediate' : 'beginner'),
          verified: s.verified !== undefined ? s.verified : true
        }))
      : defaultStudent.skills,
    applications: (authUser.applications && authUser.applications.length > 0)
      ? authUser.applications
      : defaultStudent.applications,
    certifications: (authUser.certifications && authUser.certifications.length > 0)
      ? authUser.certifications
      : defaultStudent.certifications,
    projects: (authUser.projects && authUser.projects.length > 0)
      ? authUser.projects
      : defaultStudent.projects,
    internships: (authUser.internships && authUser.internships.length > 0)
      ? authUser.internships
      : defaultStudent.internships,
    careerGoal: authUser.careerGoal || defaultStudent.careerGoal,
  }
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="loading-state" style={{ height: '100vh' }}><div className="spinner"></div><p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading session...</p></div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

const LoadingFallback = () => (
  <div className="loading-state" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner"></div>
    <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading page...</p>
  </div>
)

function AppRoutes() {
  const { user, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [userOverrides, setUserOverrides] = useState({})
  const [lastUserId, setLastUserId] = useState(user?.id)

  if (user?.id !== lastUserId) {
    setLastUserId(user?.id)
    setUserOverrides({})
  }

  if (loading) return <LoadingFallback />

  const baseUser = formatUser(user)
  const currentUser = baseUser ? { ...baseUser, ...userOverrides } : null

  const setCurrentUser = (updated) => {
    if (typeof updated === 'function') {
      setUserOverrides(prev => updated({ ...baseUser, ...prev }))
    } else {
      setUserOverrides(prev => ({ ...prev, ...updated }))
    }
  }

  return (
    <AppContext.Provider value={{ userRole: user?.role, currentUser, setCurrentUser, currentPage, setCurrentPage }}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <TopBar />
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/assessment" element={<SkillAssessment />} />
                      <Route path="/career-analysis" element={<CareerAnalysis />} />
                      <Route path="/opportunities" element={<Opportunities />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/applications" element={<Applications />} />
                      <Route path="/institution" element={<InstitutionDashboard />} />
                      <Route path="/collaboration" element={<Collaboration />} />
                    </Routes>
                  </Suspense>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </AppContext.Provider>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
