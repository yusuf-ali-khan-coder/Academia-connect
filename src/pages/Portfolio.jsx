import { useState } from 'react'
import { useApp } from '../App'
import { students } from '../data/mockData'

const Portfolio = () => {
  const { currentUser } = useApp()
  const user = currentUser || students[0]
  const [activeSection, setActiveSection] = useState('all')

  const verifiedSkills = (user.skills || []).filter(s => s.verified)
  const topSkills = [...(user.skills || [])].sort((a, b) => b.assessmentScore - a.assessmentScore).slice(0, 5)

  return (
    <div className="page-content fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Digital Portfolio</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your verified achievements and capabilities in one place
        </p>
      </div>

      <div className="profile-header" style={{ marginBottom: '2rem' }}>
        <div className="profile-avatar">{user.avatar}</div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h2>{user.name}</h2>
          <p>{user.degree} • {user.university}</p>
          <p style={{ color: 'var(--primary-light)' }}>🎯 {user.careerGoal}</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="stat-num">{verifiedSkills.length}</div>
              <div className="stat-text">Verified Skills</div>
            </div>
            <div className="profile-stat">
              <div className="stat-num">{user.certifications?.length || 0}</div>
              <div className="stat-text">Certifications</div>
            </div>
            <div className="profile-stat">
              <div className="stat-num">{user.projects?.length || 0}</div>
              <div className="stat-text">Projects</div>
            </div>
            <div className="profile-stat">
              <div className="stat-num">{user.internships?.length || 0}</div>
              <div className="stat-text">Experience</div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary">📤 Share Portfolio</button>
      </div>

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab ${activeSection === 'all' ? 'active' : ''}`} onClick={() => setActiveSection('all')}>All</button>
        <button className={`tab ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setActiveSection('skills')}>Skills</button>
        <button className={`tab ${activeSection === 'certifications' ? 'active' : ''}`} onClick={() => setActiveSection('certifications')}>Certifications</button>
        <button className={`tab ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setActiveSection('projects')}>Projects</button>
        <button className={`tab ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => setActiveSection('experience')}>Experience</button>
      </div>

      {(activeSection === 'all' || activeSection === 'skills') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <div className="card-title">Verified Skills</div>
            <span className="badge badge-success">{verifiedSkills.length} verified</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {topSkills.length === 0 && (
              <div className="empty-state" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
                <div className="empty-icon">🎯</div>
                <div className="empty-title">No skills added yet</div>
                <div className="empty-desc">Complete skill assessments to build your profile</div>
              </div>
            )}
            {topSkills.map((skill, idx) => (
              <div key={idx} style={{ 
                padding: '1rem', 
                background: 'var(--bg-tertiary)', 
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${skill.verified ? 'var(--success)' : 'var(--border)'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 600 }}>{skill.name}</div>
                  {skill.verified && <span style={{ color: 'var(--success)', fontSize: '0.875rem' }}>✓ Verified</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div 
                      className={`progress-fill ${skill.assessmentScore >= 80 ? 'success' : skill.assessmentScore >= 60 ? 'primary' : 'warning'}`}
                      style={{ width: `${skill.assessmentScore}%` }}
                    />
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{skill.assessmentScore}%</span>
                </div>
                <span className={`skill-level ${skill.level}`} style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem' }}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeSection === 'all' || activeSection === 'certifications') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <div className="card-title">Certifications & Achievements</div>
          </div>
          <div className="grid-3">
            {!(user.certifications?.length || user.achievements?.length) && (
              <div className="empty-state" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
                <div className="empty-icon">📜</div>
                <div className="empty-title">No certifications yet</div>
                <div className="empty-desc">Add certifications to showcase your achievements</div>
              </div>
            )}
            {(user.certifications || []).map((cert, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-icon">📜</div>
                <h4>{cert.name}</h4>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-date">
                  {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {cert.verified && <span style={{ color: 'var(--success)', marginLeft: '0.5rem' }}>✓ Verified</span>}
                </div>
              </div>
            ))}
            {(user.achievements || []).map((achievement, idx) => (
              <div key={idx} className="cert-card">
                <div className="cert-icon">🏆</div>
                <h4>{achievement}</h4>
                <div className="cert-issuer">Achievement</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeSection === 'all' || activeSection === 'projects') && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <div className="card-title">Projects</div>
          </div>
          <div className="grid-2">
            {!(user.projects || []).length && (
              <div className="empty-state" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
                <div className="empty-icon">💻</div>
                <div className="empty-title">No projects yet</div>
                <div className="empty-desc">Add projects to demonstrate your skills</div>
              </div>
            )}
            {(user.projects || []).map((project, idx) => (
              <div key={idx} style={{ 
                padding: '1.25rem', 
                background: 'var(--bg-tertiary)', 
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{project.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {(project.skills || []).map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeSection === 'all' || activeSection === 'experience') && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Experience</div>
          </div>
          <div className="timeline">
            {!(user.internships || []).length && (
              <div className="empty-state" style={{ padding: '2rem' }}>
                <div className="empty-icon">💼</div>
                <div className="empty-title">No experience yet</div>
                <div className="empty-desc">Add internships and work experience</div>
              </div>
            )}
            {(user.internships || []).map((internship, idx) => (
              <div key={idx} className={`timeline-item ${internship.status === 'completed' ? 'completed' : 'pending'}`}>
                <div className="timeline-date">
                  {new Date(internship.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {' '}
                  {new Date(internship.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <div className="timeline-title">{internship.role}</div>
                <div className="timeline-desc">
                  {internship.company} • {internship.duration} • 
                  <span style={{ color: internship.status === 'completed' ? 'var(--success)' : 'var(--warning)' }}>
                    {' '}{internship.status}
                  </span>
                </div>
                {internship.feedback && (
                  <div style={{ 
                    marginTop: '0.75rem', 
                    padding: '0.75rem', 
                    background: 'var(--bg-primary)', 
                    borderRadius: 'var(--radius)',
                    fontSize: '0.8125rem',
                    fontStyle: 'italic',
                    color: 'var(--text-secondary)'
                  }}>
                    "{internship.feedback}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio
