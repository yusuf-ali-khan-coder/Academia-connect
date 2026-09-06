import { useState } from 'react'
import { useApp } from '../App'
import { students, assessmentQuestions } from '../data/mockData'

const SkillAssessment = () => {
  const { currentUser, setCurrentUser } = useApp()
  const user = currentUser || students[0]
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [assessmentComplete, setAssessmentComplete] = useState(false)
  const [score, setScore] = useState(0)

  const availableSkills = [
    { id: 'python', name: 'Python', icon: '🐍', questions: assessmentQuestions.python },
    { id: 'sql', name: 'SQL', icon: '🗄️', questions: assessmentQuestions.sql },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', questions: assessmentQuestions.javascript },
  ]

  const startAssessment = (skill) => {
    setSelectedSkill(skill)
    setCurrentQuestion(0)
    setAnswers({})
    setAssessmentComplete(false)
    setScore(0)
  }

  const handleAnswer = (questionId, answerIdx) => {
    setAnswers({ ...answers, [questionId]: answerIdx })
  }

  const nextQuestion = () => {
    if (currentQuestion < selectedSkill.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScore()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    selectedSkill.questions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++
    })
    const finalScore = Math.round((correct / selectedSkill.questions.length) * 100)
    setScore(finalScore)
    setAssessmentComplete(true)

    const updatedSkills = (user.skills || []).map(s => {
      if (s.name.toLowerCase() === selectedSkill.name.toLowerCase()) {
        return { ...s, assessmentScore: finalScore, verified: true }
      }
      return s
    })
    if (typeof setCurrentUser === 'function') {
      setCurrentUser({ ...user, skills: updatedSkills })
    }
  }

  const retakeAssessment = () => {
    setSelectedSkill(null)
    setAssessmentComplete(false)
  }

  if (selectedSkill && !assessmentComplete) {
    const question = selectedSkill.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / selectedSkill.questions.length) * 100

    return (
      <div className="page-content fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={() => setSelectedSkill(null)}>← Back</button>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{selectedSkill.name} Assessment</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Question {currentQuestion + 1} of {selectedSkill.questions.length}
            </p>
          </div>
        </div>

        <div className="progress-bar" style={{ marginBottom: '2rem', height: '6px' }}>
          <div className="progress-fill primary" style={{ width: `${progress}%` }} />
        </div>

        <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
              Question {currentQuestion + 1}
            </span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '0.75rem' }}>
              {question.question}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(question.id, idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: answers[question.id] === idx ? 'rgba(11, 31, 58, 0.15)' : 'var(--bg-tertiary)',
                  border: `2px solid ${answers[question.id] === idx ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  transition: 'var(--transition)'
                }}
              >
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  background: answers[question.id] === idx ? 'var(--primary)' : 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={prevQuestion} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button 
              className="btn btn-primary" 
              onClick={nextQuestion}
              disabled={answers[question.id] === undefined}
            >
              {currentQuestion === selectedSkill.questions.length - 1 ? 'Submit Assessment' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (assessmentComplete) {
    return (
      <div className="page-content fade-in">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Assessment Complete!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{selectedSkill.name} Assessment</p>
          
          <div style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: 'var(--radius-full)', 
            border: `4px solid ${score >= 80 ? 'var(--success)' : score >= 60 ? 'var(--warning)' : 'var(--danger)'}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{score}%</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Score</span>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginBottom: '2rem',
            padding: '1rem',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>
                {Object.entries(answers).filter(([qId, a]) => {
                  const q = selectedSkill.questions.find(q => q.id === parseInt(qId))
                  return q && a === q.correct
                }).length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Correct</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)' }}>
                {selectedSkill.questions.length - Object.entries(answers).filter(([qId, a]) => {
                  const q = selectedSkill.questions.find(q => q.id === parseInt(qId))
                  return q && a === q.correct
                }).length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Incorrect</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={retakeAssessment}>Retake Assessment</button>
            <button className="btn btn-primary" onClick={() => setSelectedSkill(null)}>Back to Skills</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Skill Assessment Center</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Take assessments to verify your skills and strengthen your profile
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        {availableSkills.map((skill) => {
          const existingScore = (user.skills || []).find(s => s.name.toLowerCase() === skill.name.toLowerCase())
          return (
            <div key={skill.id} className="card" style={{ cursor: 'pointer' }} onClick={() => startAssessment(skill)}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{skill.icon}</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{skill.name}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {skill.questions.length} questions • ~{skill.questions.length * 2} min
              </p>
              {existingScore && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="progress-bar" style={{ flex: 1 }}>
                    <div className={`progress-fill ${existingScore.assessmentScore >= 80 ? 'success' : existingScore.assessmentScore >= 60 ? 'primary' : 'warning'}`} style={{ width: `${existingScore.assessmentScore}%` }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{existingScore.assessmentScore}%</span>
                </div>
              )}
              <button className="btn btn-primary" style={{ width: '100%' }}>
                {existingScore ? 'Retake Assessment' : 'Start Assessment'}
              </button>
            </div>
          )
        })}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Your Assessment History</div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Assessment</th>
                <th>Score</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!(user.assessments || []).length ? (
                <tr><td colSpan="4">
                  <div className="empty-state" style={{ padding: '2rem' }}>
                    <div className="empty-icon">📝</div>
                    <div className="empty-title">No assessments yet</div>
                    <div className="empty-desc">Take your first assessment above to build your profile</div>
                  </div>
                </td></tr>
              ) : (user.assessments || []).map((assessment, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{assessment.name}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="progress-bar" style={{ width: '80px' }}>
                        <div className={`progress-fill ${assessment.score >= 80 ? 'success' : assessment.score >= 60 ? 'primary' : 'warning'}`} style={{ width: `${assessment.score}%` }} />
                      </div>
                      <span>{assessment.score}%</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(assessment.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${assessment.score >= 60 ? 'badge-success' : 'badge-warning'}`}>
                      {assessment.score >= 80 ? 'Excellent' : assessment.score >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
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

export default SkillAssessment
