import { useApp } from '../App'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { userRole } = useApp()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = {
    student: [
      { section: 'Main', items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
        { id: 'profile', label: 'My Profile', icon: '👤', path: '/profile' },
        { id: 'assessment', label: 'Skill Assessment', icon: '📝', path: '/assessment' },
      ]},
      { section: 'Career', items: [
        { id: 'career-analysis', label: 'Career Analysis', icon: '🎯', path: '/career-analysis' },
        { id: 'opportunities', label: 'Opportunities', icon: '💼', path: '/opportunities', badge: 12 },
        { id: 'applications', label: 'Applications', icon: '📋', path: '/applications', badge: 3 },
      ]},
      { section: 'Portfolio', items: [
        { id: 'portfolio', label: 'Digital Portfolio', icon: '🏆', path: '/portfolio' },
        { id: 'collaboration', label: 'Collaborations', icon: '🤝', path: '/collaboration' },
      ]}
    ],
    faculty: [
      { section: 'Teaching', items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
        { id: 'profile', label: 'My Profile', icon: '👤', path: '/profile' },
        { id: 'assessment', label: 'Student Assessments', icon: '📝', path: '/assessment' },
      ]},
      { section: 'Engagement', items: [
        { id: 'opportunities', label: 'Workshops & FDPs', icon: '🎓', path: '/opportunities' },
        { id: 'collaboration', label: 'Industry Connect', icon: '🤝', path: '/collaboration' },
        { id: 'portfolio', label: 'Research Projects', icon: '🔬', path: '/portfolio' },
      ]}
    ],
    industry: [
      { section: 'Recruitment', items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
        { id: 'opportunities', label: 'Post Opportunities', icon: '📝', path: '/opportunities' },
        { id: 'applications', label: 'Applications', icon: '📋', path: '/applications', badge: 28 },
      ]},
      { section: 'Engagement', items: [
        { id: 'collaboration', label: 'Collaborations', icon: '🤝', path: '/collaboration' },
        { id: 'portfolio', label: 'Browse Talent', icon: '🔍', path: '/portfolio' },
      ]}
    ],
    institution: [
      { section: 'Overview', items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
        { id: 'institution', label: 'Institution Analytics', icon: '🏫', path: '/institution' },
      ]},
      { section: 'Engagement', items: [
        { id: 'collaboration', label: 'Industry Partnerships', icon: '🤝', path: '/collaboration' },
        { id: 'applications', label: 'Placement Tracking', icon: '📋', path: '/applications' },
      ]}
    ]
  }

  const items = navItems[userRole] || navItems.student

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">A</div>
          <h1>AcademiaConnect</h1>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {items.map((section, idx) => (
          <div key={idx} className="nav-section">
            <div className="nav-section-title">{section.section}</div>
            {section.items.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="badge">{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, padding: '0 1.5rem' }}>
        <button className="nav-item" onClick={handleLogout} style={{ color: 'var(--danger)' }}>
          <span className="icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
