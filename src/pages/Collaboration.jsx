import { useState } from 'react'
import { useApp } from '../App'
import { collaborations } from '../data/mockData'

const Collaboration = () => {
  const { userRole } = useApp()
  const [activeTab, setActiveTab] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredCollabs = activeTab === 'all' 
    ? collaborations 
    : collaborations.filter(c => c.type === activeTab)

  const typeCounts = {
    all: collaborations.length,
    lecture: collaborations.filter(c => c.type === 'lecture').length,
    workshop: collaborations.filter(c => c.type === 'workshop').length,
    mentorship: collaborations.filter(c => c.type === 'mentorship').length,
    project: collaborations.filter(c => c.type === 'project').length,
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Academia-Industry Collaboration
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Connect through guest lectures, workshops, mentorships, and live projects
          </p>
        </div>
        {userRole === 'industry' && (
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            + Create Collaboration
          </button>
        )}
      </div>

      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon primary">🎤</div>
          <div className="stat-value">{typeCounts.lecture}</div>
          <div className="stat-label">Guest Lectures</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon secondary">🛠️</div>
          <div className="stat-value">{typeCounts.workshop}</div>
          <div className="stat-label">Workshops</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">🤝</div>
          <div className="stat-value">{typeCounts.mentorship}</div>
          <div className="stat-label">Mentorships</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">🚀</div>
          <div className="stat-value">{typeCounts.project}</div>
          <div className="stat-label">Live Projects</div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
          All ({typeCounts.all})
        </button>
        <button className={`tab ${activeTab === 'lecture' ? 'active' : ''}`} onClick={() => setActiveTab('lecture')}>
          Lectures ({typeCounts.lecture})
        </button>
        <button className={`tab ${activeTab === 'workshop' ? 'active' : ''}`} onClick={() => setActiveTab('workshop')}>
          Workshops ({typeCounts.workshop})
        </button>
        <button className={`tab ${activeTab === 'mentorship' ? 'active' : ''}`} onClick={() => setActiveTab('mentorship')}>
          Mentorships ({typeCounts.mentorship})
        </button>
        <button className={`tab ${activeTab === 'project' ? 'active' : ''}`} onClick={() => setActiveTab('project')}>
          Projects ({typeCounts.project})
        </button>
      </div>

      <div className="grid-2">
        {filteredCollabs.length === 0 && (
          <div className="empty-state" style={{ padding: '3rem', gridColumn: '1 / -1' }}>
            <div className="empty-icon">🤝</div>
            <div className="empty-title">No collaborations found</div>
            <div className="empty-desc">Check back for new collaboration opportunities</div>
          </div>
        )}
        {filteredCollabs.map((collab) => (
          <div key={collab.id} className="collab-card">
            <span className={`collab-type ${collab.type}`}>
              {collab.type === 'lecture' ? '🎤' : collab.type === 'workshop' ? '🛠️' : collab.type === 'mentorship' ? '🤝' : '🚀'}
              {' '}{collab.type}
            </span>
            <h3>{collab.title}</h3>
            <p>Organized by {collab.organization}</p>
            <div className="collab-meta">
              <span>📅 {new Date(collab.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              {collab.time && <span>🕐 {collab.time}</span>}
              <span>📍 {collab.mode}</span>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  {collab.registered}/{collab.seats} registered
                </div>
                <div className="progress-bar" style={{ width: '150px' }}>
                  <div 
                    className={`progress-fill ${collab.registered >= collab.seats ? 'danger' : 'primary'}`}
                    style={{ width: `${(collab.registered / collab.seats) * 100}%` }}
                  />
                </div>
              </div>
              <button 
                className={`btn btn-sm ${collab.registered >= collab.seats ? 'btn-secondary' : 'btn-primary'}`}
                disabled={collab.registered >= collab.seats}
              >
                {collab.registered >= collab.seats ? 'Full' : 'Register'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div className="card-title">Collaboration Benefits</div>
        </div>
        <div className="grid-3">
          <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>For Students</h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Gain industry exposure, learn from experts, and build professional networks
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>For Industry</h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Access fresh talent, scout candidates early, and shape curriculum relevance
            </p>
          </div>
          <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏫</div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>For Institutions</h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Strengthen industry ties, improve placement rates, and enhance curriculum
            </p>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Create Collaboration</div>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" placeholder="e.g., Workshop on Cloud Computing" />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select">
                    <option>Guest Lecture</option>
                    <option>Workshop</option>
                    <option>Mentorship Program</option>
                    <option>Live Project</option>
                    <option>Faculty Development Program</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Mode</label>
                  <select className="form-select">
                    <option>Online</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input className="form-input" type="date" />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input className="form-input" type="time" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Max Seats</label>
                <input className="form-input" type="number" placeholder="e.g., 50" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" placeholder="Describe the collaboration..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowCreateModal(false)}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Collaboration
