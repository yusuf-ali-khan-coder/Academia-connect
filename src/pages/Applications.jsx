import { useState } from 'react'
import { useApp } from '../App'
import { students, opportunities } from '../data/mockData'

const Applications = () => {
  const { userRole, currentUser } = useApp()
  const user = currentUser || students[0]
  const [activeTab, setActiveTab] = useState('all')

  const applications = (user.applications || []).map(app => ({
    ...app,
    opportunity: opportunities.find(o => o.id === app.opportunityId)
  })).filter(app => app.opportunity)

  const filteredApps = activeTab === 'all' 
    ? applications 
    : applications.filter(app => app.status === activeTab)

  const statusCounts = {
    all: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    interview: applications.filter(a => a.status === 'interview').length,
    selected: applications.filter(a => a.status === 'selected').length,
  }

  if (userRole === 'industry') return <IndustryApplicationsView />

  return (
    <div className="page-content fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Applications Tracker</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Track and manage all your internship and job applications
        </p>
      </div>

      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon primary">📋</div>
          <div className="stat-value">{statusCounts.all}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon secondary">⏳</div>
          <div className="stat-value">{statusCounts.applied + statusCounts.shortlisted}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">🎤</div>
          <div className="stat-value">{statusCounts.interview}</div>
          <div className="stat-label">Interviews</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">✅</div>
          <div className="stat-value">{statusCounts.selected}</div>
          <div className="stat-label">Selected</div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
          All ({statusCounts.all})
        </button>
        <button className={`tab ${activeTab === 'applied' ? 'active' : ''}`} onClick={() => setActiveTab('applied')}>
          Applied ({statusCounts.applied})
        </button>
        <button className={`tab ${activeTab === 'shortlisted' ? 'active' : ''}`} onClick={() => setActiveTab('shortlisted')}>
          Shortlisted ({statusCounts.shortlisted})
        </button>
        <button className={`tab ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => setActiveTab('interview')}>
          Interview ({statusCounts.interview})
        </button>
        <button className={`tab ${activeTab === 'selected' ? 'active' : ''}`} onClick={() => setActiveTab('selected')}>
          Selected ({statusCounts.selected})
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Opportunity</th>
                <th>Company</th>
                <th>Type</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{app.opportunity.title}</td>
                  <td>{app.opportunity.company}</td>
                  <td><span className="badge badge-primary">{app.opportunity.type}</span></td>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-secondary">View Details</button>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <div className="empty-state" style={{ padding: '3rem' }}>
                      <div className="empty-icon">📋</div>
                      <div className="empty-title">No applications yet</div>
                      <div className="empty-desc">Browse opportunities to submit your first application</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {applications.some(a => a.status === 'interview') && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div className="card-header">
            <div className="card-title">Upcoming Interviews</div>
          </div>
          {applications.filter(a => a.status === 'interview').map((app, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}>
                  🎤
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{app.opportunity.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{app.opportunity.company}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, color: 'var(--primary-light)' }}>Interview Scheduled</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Check your email for details</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const IndustryApplicationsView = () => {
  const allApplications = [
    { id: 1, student: 'Priya Sharma', opportunity: 'Data Analyst Intern', university: 'IIT Delhi', cgpa: 8.7, matchScore: 85, status: 'shortlisted', appliedDate: '2025-09-02' },
    { id: 2, student: 'Rahul Verma', opportunity: 'React Developer Intern', university: 'BITS Pilani', cgpa: 8.2, matchScore: 78, status: 'applied', appliedDate: '2025-09-03' },
    { id: 3, student: 'Ananya Patel', opportunity: 'ML Research Intern', university: 'NIT Trichy', cgpa: 9.1, matchScore: 92, status: 'interview', appliedDate: '2025-09-01' },
    { id: 4, student: 'Amit Singh', opportunity: 'Data Analyst Intern', university: 'DTU', cgpa: 7.8, matchScore: 72, status: 'applied', appliedDate: '2025-09-04' },
    { id: 5, student: 'Neha Gupta', opportunity: 'React Developer Intern', university: 'IIIT Delhi', cgpa: 8.5, matchScore: 88, status: 'selected', appliedDate: '2025-08-28' },
  ]

  return (
    <div className="page-content fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Applications Received</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Review and manage candidate applications</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Position</th>
                <th>University</th>
                <th>CGPA</th>
                <th>Match Score</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allApplications.map((app) => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 600 }}>{app.student}</td>
                  <td>{app.opportunity}</td>
                  <td>{app.university}</td>
                  <td>{app.cgpa}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="progress-bar" style={{ width: '60px' }}>
                        <div className={`progress-fill ${app.matchScore >= 80 ? 'success' : app.matchScore >= 60 ? 'primary' : 'warning'}`} style={{ width: `${app.matchScore}%` }} />
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{app.matchScore}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(app.status)}`}>{app.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-sm btn-primary">Review</button>
                      {app.status !== 'selected' && <button className="btn btn-sm btn-success">Shortlist</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function getStatusBadgeClass(status) {
  const classes = {
    applied: 'badge-primary',
    shortlisted: 'badge-warning',
    interview: 'badge-secondary',
    selected: 'badge-success',
    rejected: 'badge-danger'
  }
  return classes[status] || 'badge-primary'
}

export default Applications
