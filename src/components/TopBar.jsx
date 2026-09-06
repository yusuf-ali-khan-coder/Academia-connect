import { useApp } from '../App'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/': 'Dashboard',
  '/profile': 'My Profile',
  '/assessment': 'Skill Assessment',
  '/career-analysis': 'Career & Skill-Gap Analysis',
  '/opportunities': 'Opportunities',
  '/portfolio': 'Digital Portfolio',
  '/applications': 'Applications Tracker',
  '/institution': 'Institution Dashboard',
  '/collaboration': 'Academia-Industry Collaboration'
}

const TopBar = () => {
  const { currentUser } = useApp()
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div>
          <div className="page-title">{title}</div>
          <div className="breadcrumb">
            <span>AcademiaConnect</span> / <span>{title}</span>
          </div>
        </div>
      </div>

      <div className="top-bar-right">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search opportunities, skills, companies..." />
        </div>
        
        <button className="icon-btn">
          🔔
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-avatar">
          {currentUser?.avatar || 'PS'}
        </div>
      </div>
    </div>
  )
}

export default TopBar
