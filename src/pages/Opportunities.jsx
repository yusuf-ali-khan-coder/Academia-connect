import { useState } from 'react'
import { useApp } from '../App'
import { students, opportunities, industries } from '../data/mockData'

const Opportunities = () => {
  const { userRole, currentUser } = useApp()
  const user = currentUser || students[0]
  const [selectedType, setSelectedType] = useState('all')
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [showMatchDetails, setShowMatchDetails] = useState(false)

  const filteredOpportunities = selectedType === 'all' 
    ? opportunities 
    : opportunities.filter(o => o.type.toLowerCase() === selectedType)

  const calculateMatch = (opportunity) => {
    let totalWeight = 0
    let matchedWeight = 0
    const details = []

    opportunity.requiredSkills.forEach((req) => {
      totalWeight += req.weight
      const userSkill = (user.skills || []).find(s => s.name === req.name)
      if (userSkill) {
        const levelMap = { beginner: 25, intermediate: 50, advanced: 75, expert: 100 }
        const score = levelMap[userSkill.level] || 0
        const contribution = (score / 100) * req.weight
        matchedWeight += contribution
        details.push({
          skill: req.name,
          status: score >= 75 ? 'met' : score >= 50 ? 'partial' : 'gap',
          score,
          required: req.required
        })
      } else {
        details.push({
          skill: req.name,
          status: 'gap',
          score: 0,
          required: req.required
        })
      }
    })

    return {
      score: Math.round((matchedWeight / totalWeight) * 100),
      details
    }
  }

  if (userRole === 'industry') return <IndustryOpportunitiesView />

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Opportunities</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Discover internships, jobs, and projects matched to your skills
          </p>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab ${selectedType === 'all' ? 'active' : ''}`} onClick={() => setSelectedType('all')}>All</button>
        <button className={`tab ${selectedType === 'internship' ? 'active' : ''}`} onClick={() => setSelectedType('internship')}>Internships</button>
        <button className={`tab ${selectedType === 'full-time' ? 'active' : ''}`} onClick={() => setSelectedType('full-time')}>Full-time</button>
        <button className={`tab ${selectedType === 'apprenticeship' ? 'active' : ''}`} onClick={() => setSelectedType('apprenticeship')}>Apprenticeships</button>
      </div>

      <div className="grid-2">
        <div style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {filteredOpportunities.length === 0 && (
            <div className="empty-state" style={{ padding: '3rem' }}>
              <div className="empty-icon">🔍</div>
              <div className="empty-title">No opportunities found</div>
              <div className="empty-desc">Try changing the filter to see more results</div>
            </div>
          )}
          {filteredOpportunities.map((opp) => {
            const match = calculateMatch(opp)
            return (
              <div 
                key={opp.id} 
                className="opportunity-card" 
                style={{ marginBottom: '1rem', cursor: 'pointer' }}
                onClick={() => setSelectedOpportunity(opp)}
              >
                <div className="opportunity-header">
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                    <div className="company-logo">{industries.find(i => i.id === opp.companyId)?.logo || opp.company[0]}</div>
                    <div>
                      <div className="opportunity-title">{opp.title}</div>
                      <div className="opportunity-company">{opp.company}</div>
                    </div>
                  </div>
                  <div className={`match-score`}>
                    <div className={`score-circle ${match.score >= 70 ? 'high' : match.score >= 50 ? 'medium' : 'low'}`}>
                      {match.score}%
                    </div>
                  </div>
                </div>
                <div className="opportunity-meta">
                  <span>📍 {opp.location}</span>
                  <span>⏱️ {opp.duration}</span>
                  <span>💰 {opp.stipend}</span>
                </div>
                <div className="opportunity-skills">
                  {opp.requiredSkills.slice(0, 4).map((skill, idx) => {
                    const userSkill = (user.skills || []).find(s => s.name === skill.name)
                    return (
                      <span 
                        key={idx} 
                        className="skill-tag"
                        style={{ 
                          borderColor: userSkill ? 'var(--success)' : skill.required ? 'var(--danger)' : 'var(--border)',
                          color: userSkill ? 'var(--success)' : skill.required ? 'var(--danger)' : 'var(--text-secondary)'
                        }}
                      >
                        {skill.name}
                        {userSkill && ' ✓'}
                        {!userSkill && skill.required && ' !'}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div>
          {selectedOpportunity ? (
            <div className="card" style={{ position: 'sticky', top: '5rem' }}>
              {(() => {
                const match = calculateMatch(selectedOpportunity)
                return (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{selectedOpportunity.title}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>{selectedOpportunity.company}</p>
                      </div>
                      <div className={`score-circle ${match.score >= 70 ? 'high' : match.score >= 50 ? 'medium' : 'low'}`} style={{ width: '64px', height: '64px', fontSize: '1.125rem' }}>
                        {match.score}%
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-primary">{selectedOpportunity.type}</span>
                      <span className="badge badge-secondary">📍 {selectedOpportunity.location}</span>
                      <span className="badge badge-success">💰 {selectedOpportunity.stipend}</span>
                    </div>

                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                      {selectedOpportunity.description}
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Skill Match Breakdown</h4>
                      {match.details.map((detail, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem', 
                          padding: '0.625rem',
                          background: 'var(--bg-tertiary)',
                          borderRadius: 'var(--radius)',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ 
                            width: '24px', 
                            height: '24px', 
                            borderRadius: 'var(--radius-full)',
                            background: detail.status === 'met' ? 'var(--success)' : detail.status === 'partial' ? 'var(--warning)' : 'var(--danger)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem'
                          }}>
                            {detail.status === 'met' ? '✓' : detail.status === 'partial' ? '~' : '✗'}
                          </span>
                          <span style={{ flex: 1, fontSize: '0.875rem' }}>{detail.skill}</span>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            color: detail.status === 'met' ? 'var(--success)' : detail.status === 'partial' ? 'var(--warning)' : 'var(--danger)'
                          }}>
                            {detail.status === 'met' ? 'Meets requirement' : detail.status === 'partial' ? 'Partially meets' : 'Skill gap'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Eligibility</h4>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <span>Min CGPA: {selectedOpportunity.eligibility.minCGPA}</span>
                        <span>•</span>
                        <span>{selectedOpportunity.eligibility.year}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button className="btn btn-primary" style={{ flex: 1 }}>Apply Now</button>
                      <button className="btn btn-secondary">Save</button>
                    </div>
                  </>
                )
              })()}
            </div>
          ) : (
            <div className="card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '400px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👈</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Select an Opportunity</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Click on an opportunity to see detailed match analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const IndustryOpportunitiesView = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newOpp, setNewOpp] = useState({
    title: '', type: 'Internship', location: '', duration: '', stipend: '',
    description: '', minCGPA: '', year: ''
  })

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Manage Opportunities</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Create and manage your job postings</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>+ Create Opportunity</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Applicants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.filter(o => o.companyId === 1).map((opp) => (
                <tr key={opp.id}>
                  <td style={{ fontWeight: 600 }}>{opp.title}</td>
                  <td><span className="badge badge-primary">{opp.type}</span></td>
                  <td>{opp.location}</td>
                  <td>{opp.applicants}</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <button className="btn btn-sm btn-secondary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Create New Opportunity</div>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" placeholder="e.g., Data Analyst Intern" value={newOpp.title} onChange={(e) => setNewOpp({...newOpp, title: e.target.value})} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={newOpp.type} onChange={(e) => setNewOpp({...newOpp, type: e.target.value})}>
                    <option>Internship</option>
                    <option>Full-time</option>
                    <option>Apprenticeship</option>
                    <option>Live Project</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input className="form-input" placeholder="e.g., Bangalore (Hybrid)" value={newOpp.location} onChange={(e) => setNewOpp({...newOpp, location: e.target.value})} />
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input className="form-input" placeholder="e.g., 6 months" value={newOpp.duration} onChange={(e) => setNewOpp({...newOpp, duration: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Stipend/Salary</label>
                  <input className="form-input" placeholder="e.g., ₹25,000/month" value={newOpp.stipend} onChange={(e) => setNewOpp({...newOpp, stipend: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" placeholder="Describe the role and responsibilities..." value={newOpp.description} onChange={(e) => setNewOpp({...newOpp, description: e.target.value})} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Minimum CGPA</label>
                  <input className="form-input" type="number" step="0.1" placeholder="e.g., 7.0" value={newOpp.minCGPA} onChange={(e) => setNewOpp({...newOpp, minCGPA: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Eligible Years</label>
                  <input className="form-input" placeholder="e.g., 3rd or 4th year" value={newOpp.year} onChange={(e) => setNewOpp({...newOpp, year: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowCreateModal(false)}>Create Opportunity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Opportunities
