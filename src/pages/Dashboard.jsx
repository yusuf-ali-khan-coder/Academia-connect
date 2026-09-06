import { useApp } from '../App'
import { students, opportunities, collaborations, institutionData } from '../data/mockData'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const { userRole, currentUser } = useApp()

  const mockUser = students[0]
  const user = currentUser ? {
    ...mockUser,
    ...currentUser,
    skills: (currentUser.skills && currentUser.skills.length > 0)
      ? currentUser.skills.map(s => ({
          name: s.skillName || s.name,
          assessmentScore: s.score || s.assessmentScore,
          level: s.level || (s.score >= 80 ? 'expert' : s.score >= 60 ? 'advanced' : s.score >= 40 ? 'intermediate' : 'beginner'),
          verified: true
        }))
      : mockUser.skills,
    applications: currentUser.applications || mockUser.applications,
    certifications: currentUser.certifications || mockUser.certifications,
    projects: currentUser.projects || mockUser.projects,
    internships: currentUser.internships || mockUser.internships,
  } : (userRole === 'institution' ? institutionData : mockUser)

  if (userRole === 'institution') return <InstitutionDashboardView />
  if (userRole === 'industry') return <IndustryDashboardView />
  return <StudentDashboardView user={user} />
}

const StudentDashboardView = ({ user }) => {
  const skillData = user.skills.map(s => ({
    name: s.name,
    score: s.assessmentScore,
    level: s.level
  }))

  const matchData = [
    { name: 'Data Analyst Intern', score: 85 },
    { name: 'ML Apprentice', score: 72 },
    { name: 'BI Analyst', score: 68 },
    { name: 'Full Stack Dev', score: 45 },
  ]

  const recentApplications = user.applications.map(app => ({
    ...app,
    opportunity: opportunities.find(o => o.id === app.opportunityId)
  }))

  return (
    <div className="page-content fade-in">
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon primary">📊</div>
          <div className="stat-value">{user.skills.length}</div>
          <div className="stat-label">Skills Profiled</div>
          <div className="stat-change positive">↑ 2 new this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon secondary">🎯</div>
          <div className="stat-value">85%</div>
          <div className="stat-label">Top Match Score</div>
          <div className="stat-change positive">↑ Data Analyst Intern</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">📋</div>
          <div className="stat-value">{user.applications.length}</div>
          <div className="stat-label">Active Applications</div>
          <div className="stat-change positive">1 interview scheduled</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">🏆</div>
          <div className="stat-value">{user.certifications.length}</div>
          <div className="stat-label">Certifications</div>
          <div className="stat-change positive">↑ 1 recently added</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Skill Proficiency Overview</div>
              <div className="card-subtitle">Your assessment scores across skills</div>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Opportunity Matches</div>
              <div className="card-subtitle">Compatibility scores for matched opportunities</div>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={matchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="score" stroke="#06b6d4" fill="rgba(6, 182, 212, 0.2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Applications</div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Opportunity</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app, idx) => (
                  <tr key={idx}>
                    <td>{app.opportunity?.title || 'N/A'}</td>
                    <td>{app.opportunity?.company || 'N/A'}</td>
                    <td>
                      <span className={`badge badge-${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Skill Gap Alerts</div>
          </div>
          {user.skills.filter(s => s.level === 'beginner' || s.assessmentScore < 50).map((skill, idx) => (
            <div key={idx} className="skill-gap-item">
              <div className="skill-info">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-status">Score: {skill.assessmentScore}% • {skill.level}</div>
              </div>
              <span className="skill-priority high">Priority Gap</span>
            </div>
          ))}
          {user.skills.filter(s => s.level === 'beginner' || s.assessmentScore < 50).length === 0 && (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <div className="empty-icon">✅</div>
              <div className="empty-title">All caught up!</div>
              <div className="empty-desc">No critical skill gaps detected</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const IndustryDashboardView = () => {
  const applicantData = [
    { month: 'Jul', applicants: 45 },
    { month: 'Aug', applicants: 62 },
    { month: 'Sep', applicants: 38 },
  ]

  const talentData = [
    { name: 'Python', talent: 85 },
    { name: 'SQL', talent: 72 },
    { name: 'React', talent: 78 },
    { name: 'ML', talent: 65 },
    { name: 'Java', talent: 80 },
  ]

  return (
    <div className="page-content fade-in">
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon primary">📋</div>
          <div className="stat-value">8</div>
          <div className="stat-label">Active Postings</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon secondary">👥</div>
          <div className="stat-value">145</div>
          <div className="stat-label">Total Applicants</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">✅</div>
          <div className="stat-value">28</div>
          <div className="stat-label">Shortlisted</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">🤝</div>
          <div className="stat-value">6</div>
          <div className="stat-label">Collaborations</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Applicant Trends</div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicantData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="applicants" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Available Talent by Skill</div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={talentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="talent" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

const InstitutionDashboardView = () => {
  const data = institutionData

  const placementData = [
    { month: 'Jul', placed: 120 },
    { month: 'Aug', placed: 180 },
    { month: 'Sep', placed: 95 },
  ]

  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

  return (
    <div className="page-content fade-in">
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon primary">👥</div>
          <div className="stat-value">{data.totalStudents.toLocaleString()}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon secondary">📊</div>
          <div className="stat-value">{data.placedStudents.toLocaleString()}</div>
          <div className="stat-label">Placed Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">🏢</div>
          <div className="stat-value">{data.placementStats.companiesVisited}</div>
          <div className="stat-label">Companies Visited</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">💰</div>
          <div className="stat-value">{data.placementStats.avgPackage}</div>
          <div className="stat-label">Avg Package</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Top Skill Gaps Among Students</div>
          </div>
          {data.topSkillGaps.map((gap, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{gap.skill}</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {gap.gapStudents} students ({gap.percentage}%)
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${gap.percentage > 45 ? 'danger' : 'warning'}`}
                  style={{ width: `${gap.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Industry Skill Demand</div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.industryDemand} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis type="category" dataKey="skill" stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="demand" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Activities</div>
        </div>
        <div className="timeline">
          {data.recentActivities.map((activity, idx) => (
            <div key={idx} className={`timeline-item ${idx === 0 ? '' : 'completed'}`}>
              <div className="timeline-date">{activity.time}</div>
              <div className="timeline-title">{activity.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getStatusColor(status) {
  const colors = {
    applied: 'primary',
    shortlisted: 'warning',
    interview: 'secondary',
    selected: 'success',
    rejected: 'danger'
  }
  return colors[status] || 'primary'
}

export default Dashboard
