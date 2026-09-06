import { useState } from 'react'
import { useApp } from '../App'
import { students, careerPaths, learningResources } from '../data/mockData'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts'

const CareerAnalysis = () => {
  const { currentUser, setCurrentUser } = useApp()
  const user = currentUser || students[0]
  const [selectedCareer, setSelectedCareer] = useState(user?.careerGoal || 'Data Analyst')

  const careerData = careerPaths[selectedCareer] || careerPaths[user?.careerGoal] || careerPaths['Data Analyst']
  const skillGaps = (careerData?.requiredSkills || []).map((req) => {
    const userSkill = (user.skills || []).find(s => s.name === req.name)
    const currentLevel = userSkill ? getLevelValue(userSkill.level) : 0
    const requiredLevel = getLevelValue(req.level)
    const gap = requiredLevel - currentLevel
    return {
      ...req,
      currentLevel,
      requiredLevel,
      gap,
      hasSkill: !!userSkill,
      userScore: userSkill?.assessmentScore || 0
    }
  })

  const radarData = (careerData?.requiredSkills || []).map((req) => {
    const userSkill = (user.skills || []).find(s => s.name === req.name)
    return {
      skill: req.name,
      required: getLevelValue(req.level) * 20,
      current: userSkill ? getLevelValue(userSkill.level) * 20 : 0
    }
  })

  const recommendedResources = learningResources.filter(resource => 
    resource.skills.some(skill => 
      skillGaps.some(gap => gap.name === skill && gap.gap > 0)
    )
  ).slice(0, 4)

  const overallMatch = Math.round(
    skillGaps.reduce((acc, gap) => {
      const match = gap.hasSkill ? Math.min(100, (gap.currentLevel / gap.requiredLevel) * 100) : 0
      return acc + match * (gap.importance === 'High' ? 0.4 : 0.2)
    }, 0) / skillGaps.filter(g => g.importance === 'High').length * 0.4 + 
    skillGaps.reduce((acc, gap) => {
      const match = gap.hasSkill ? Math.min(100, (gap.currentLevel / gap.requiredLevel) * 100) : 0
      return acc + match * (gap.importance === 'Medium' ? 0.2 : 0)
    }, 0) / skillGaps.filter(g => g.importance === 'Medium').length * 0.2
  )

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Career & Skill-Gap Analysis</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Compare your skills with industry requirements for your dream career
          </p>
        </div>
        <select 
          className="form-select" 
          style={{ width: '250px' }}
          value={selectedCareer}
          onChange={(e) => setSelectedCareer(e.target.value)}
        >
          {Object.keys(careerPaths).map(career => (
            <option key={career} value={career}>{career}</option>
          ))}
        </select>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(11, 31, 58, 0.1), rgba(29, 78, 216, 0.1))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{careerData.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{careerData.description}</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Avg Salary</div>
                <div style={{ fontWeight: 600 }}>{careerData.avgSalary}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Growth Rate</div>
                <div style={{ fontWeight: 600, color: 'var(--success)' }}>{careerData.growthRate}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Your Match</div>
                <div style={{ fontWeight: 600, color: overallMatch >= 70 ? 'var(--success)' : overallMatch >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
                  {overallMatch}%
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '300px', height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#D9E2EC" />
                <PolarAngleAxis dataKey="skill" stroke="#475569" fontSize={11} />
                <PolarRadiusAxis stroke="#D9E2EC" fontSize={10} />
                <Radar name="Required" dataKey="required" stroke="#DC2626" fill="rgba(220, 38, 38, 0.1)" />
                <Radar name="Your Level" dataKey="current" stroke="#16A34A" fill="rgba(22, 163, 74, 0.2)" />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Skill Gap Analysis</div>
          </div>
          {skillGaps.map((gap, idx) => (
            <div key={idx} className="skill-gap-item">
              <div className="skill-info" style={{ flex: 1 }}>
                <div className="skill-name">{gap.name}</div>
                <div className="skill-status">
                  {gap.hasSkill ? `Your level: ${getLevelLabel(gap.currentLevel)}` : 'Not started'}
                  {' → '}
                  Required: {gap.requiredLevel > 0 ? getLevelLabel(gap.requiredLevel) : 'N/A'}
                </div>
                <div className="progress-bar" style={{ marginTop: '0.5rem' }}>
                  <div 
                    className={`progress-fill ${gap.gap <= 0 ? 'success' : gap.gap <= 1 ? 'warning' : 'danger'}`}
                    style={{ width: `${gap.hasSkill ? (gap.currentLevel / gap.requiredLevel) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`skill-priority ${gap.gap <= 0 ? 'low' : gap.gap <= 1 ? 'medium' : 'high'}`}>
                  {gap.gap <= 0 ? 'Met' : gap.gap <= 1 ? 'Minor Gap' : 'Major Gap'}
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Weight: {gap.weight}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Recommended Learning</div>
          </div>
          {recommendedResources.length > 0 ? recommendedResources.map((resource, idx) => (
            <div key={idx} style={{ 
              padding: '1rem', 
              background: 'var(--bg-tertiary)', 
              borderRadius: 'var(--radius-lg)',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{resource.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{resource.provider} • {resource.duration}</div>
                </div>
                <span className={`badge ${resource.type === 'Course' ? 'badge-primary' : resource.type === 'Workshop' ? 'badge-secondary' : 'badge-success'}`}>
                  {resource.type}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {resource.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
                    {skill}
                    {skillGaps.some(g => g.name === skill && g.gap > 0) && (
                      <span style={{ color: 'var(--danger)' }}>• Gap</span>
                    )}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--warning)' }}>★</span>
                  <span style={{ fontSize: '0.875rem' }}>{resource.rating}</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>• {resource.price}</span>
                </div>
                <button className="btn btn-sm btn-outline">Enroll Now</button>
              </div>
            </div>
          )) : (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <div className="empty-icon">🎯</div>
              <div className="empty-title">Great job!</div>
              <div className="empty-desc">You have all the required skills for this career path</div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Related Career Paths</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {careerData.relatedRoles.map((role, idx) => (
            <button 
              key={idx} 
              className="btn btn-secondary"
              onClick={() => setSelectedCareer(role)}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function getLevelValue(level) {
  const values = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 }
  return values[level] || 0
}

function getLevelLabel(value) {
  const labels = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced', 4: 'Expert' }
  return labels[value] || 'Unknown'
}

export default CareerAnalysis
