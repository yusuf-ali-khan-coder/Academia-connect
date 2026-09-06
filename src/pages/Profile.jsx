import { useState } from 'react'
import { useApp } from '../App'
import { students } from '../data/mockData'

const Profile = () => {
  const { currentUser, setCurrentUser } = useApp()
  const user = currentUser || students[0]
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    university: user.university,
    degree: user.degree,
    year: user.year,
    cgpa: user.cgpa,
    careerGoal: user.careerGoal
  })

  const toggleEdit = () => {
    if (!isEditing) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        university: user.university || '',
        degree: user.degree || '',
        year: user.year || '',
        cgpa: user.cgpa || '',
        careerGoal: user.careerGoal || ''
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    if (typeof setCurrentUser === 'function') {
      setCurrentUser({ ...user, ...editData })
    }
    setIsEditing(false)
  }

  return (
    <div className="page-content fade-in">
      <div className="profile-header">
        <div className="profile-avatar">{user.avatar}</div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h2>{user.name}</h2>
          <p>{user.degree} • {user.university}</p>
          <p>Year {user.year} • CGPA: {user.cgpa} • Goal: {user.careerGoal}</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <div className="stat-num">{user.skills?.length || 0}</div>
              <div className="stat-text">Skills</div>
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
              <div className="stat-text">Internships</div>
            </div>
          </div>
        </div>
        <button className="btn btn-outline" onClick={toggleEdit}>
          {isEditing ? 'Cancel' : '✏️ Edit Profile'}
        </button>
      </div>

      {isEditing && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <div className="card-title">Edit Profile</div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                className="form-input" 
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                className="form-input" 
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">University</label>
              <input 
                className="form-input" 
                value={editData.university}
                onChange={(e) => setEditData({ ...editData, university: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Degree</label>
              <input 
                className="form-input" 
                value={editData.degree}
                onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <select 
                className="form-select"
                value={editData.year}
                onChange={(e) => setEditData({ ...editData, year: parseInt(e.target.value) })}
              >
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">CGPA</label>
              <input 
                className="form-input" 
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={editData.cgpa}
                onChange={(e) => setEditData({ ...editData, cgpa: parseFloat(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Career Goal</label>
              <select 
                className="form-select"
                value={editData.careerGoal}
                onChange={(e) => setEditData({ ...editData, careerGoal: e.target.value })}
              >
                <option>Data Analyst</option>
                <option>Full Stack Developer</option>
                <option>Machine Learning Engineer</option>
                <option>Data Scientist</option>
                <option>Software Engineer</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      )}

      <div className="tabs">
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
        <button className={`tab ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => setActiveTab('certifications')}>Certifications</button>
        <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
        <button className={`tab ${activeTab === 'internships' ? 'active' : ''}`} onClick={() => setActiveTab('internships')}>Internships</button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Skills Overview</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {!(user.skills || []).length && (
                <div className="empty-state" style={{ padding: '1rem', width: '100%' }}>
                  <div className="empty-icon">🎯</div>
                  <div className="empty-title">No skills profiled yet</div>
                  <div className="empty-desc">Take assessments to verify your skills</div>
                </div>
              )}
              {(user.skills || []).map((skill, idx) => (
                <div key={idx} className="skill-tag">
                  {skill.name}
                  <span className={`skill-level ${skill.level}`}>{skill.level}</span>
                  {skill.verified && <span title="Verified">✓</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Achievements</div>
            </div>
            {!(user.achievements || []).length && (
              <div className="empty-state" style={{ padding: '1rem' }}>
                <div className="empty-icon">🏆</div>
                <div className="empty-title">No achievements yet</div>
                <div className="empty-desc">Keep learning to earn achievements</div>
              </div>
            )}
            {(user.achievements || []).map((achievement, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.75rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '0.5rem'
              }}>
                <span>🏆</span>
                <span style={{ fontSize: '0.875rem' }}>{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">All Skills</div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Level</th>
                  <th>Score</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>
                {!(user.skills || []).length && (
                  <tr>
                    <td colSpan="4">
                      <div className="empty-state" style={{ padding: '2rem' }}>
                        <div className="empty-icon">📊</div>
                        <div className="empty-title">No skills data</div>
                        <div className="empty-desc">Complete assessments to see your skill profile</div>
                      </div>
                    </td>
                  </tr>
                )}
                {(user.skills || []).map((skill, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{skill.name}</td>
                    <td>
                      <span className={`skill-level ${skill.level}`} style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                        {skill.level}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="progress-bar" style={{ width: '100px' }}>
                          <div className={`progress-fill ${skill.assessmentScore >= 80 ? 'success' : skill.assessmentScore >= 60 ? 'primary' : skill.assessmentScore >= 40 ? 'warning' : 'danger'}`} style={{ width: `${skill.assessmentScore}%` }} />
                        </div>
                        <span style={{ fontSize: '0.875rem' }}>{skill.assessmentScore}%</span>
                      </div>
                    </td>
                    <td>{skill.verified ? <span style={{ color: 'var(--success)' }}>✓ Verified</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'certifications' && (
        <div className="grid-3">
          {!(user.certifications || []).length && (
            <div className="empty-state" style={{ padding: '3rem', gridColumn: '1 / -1' }}>
              <div className="empty-icon">📜</div>
              <div className="empty-title">No certifications added</div>
              <div className="empty-desc">Upload your certifications to showcase them</div>
            </div>
          )}
          {(user.certifications || []).map((cert, idx) => (
            <div key={idx} className="cert-card">
              <div className="cert-icon">📜</div>
              <h4>{cert.name}</h4>
              <div className="cert-issuer">{cert.issuer}</div>
              <div className="cert-date">
                Issued: {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                {cert.verified && <span style={{ color: 'var(--success)', marginLeft: '0.5rem' }}>✓ Verified</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid-2">
          {!(user.projects || []).length && (
            <div className="empty-state" style={{ padding: '3rem', gridColumn: '1 / -1' }}>
              <div className="empty-icon">💻</div>
              <div className="empty-title">No projects added</div>
              <div className="empty-desc">Add your projects to strengthen your portfolio</div>
            </div>
          )}
          {(user.projects || []).map((project, idx) => (
            <div key={idx} className="card">
              <div className="card-header">
                <div className="card-title">{project.name}</div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{project.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {(project.skills || []).map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'internships' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Internship History</div>
          </div>
          <div className="timeline">
            {!(user.internships || []).length && (
              <div className="empty-state" style={{ padding: '3rem' }}>
                <div className="empty-icon">💼</div>
                <div className="empty-title">No internship records</div>
                <div className="empty-desc">Your internship history will appear here</div>
              </div>
            )}
            {(user.internships || []).map((internship, idx) => (
              <div key={idx} className={`timeline-item ${internship.status === 'completed' ? 'completed' : 'pending'}`}>
                <div className="timeline-date">{internship.startDate} - {internship.endDate}</div>
                <div className="timeline-title">{internship.role} at {internship.company}</div>
                <div className="timeline-desc">
                  Duration: {internship.duration} • Status: {internship.status}
                  {internship.feedback && <><br />Feedback: "{internship.feedback}"</>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
