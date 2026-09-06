import { useState } from 'react'
import { institutionData, students } from '../data/mockData'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const InstitutionDashboard = () => {
  const data = institutionData
  const [activeTab, setActiveTab] = useState('overview')

  const COLORS = ['#1e3a8a', '#6366f1', '#10b981', '#f59e0b', '#ef4444']

  const departmentData = [
    { name: 'Computer Science', placed: 280, total: 400 },
    { name: 'Electronics', placed: 180, total: 320 },
    { name: 'Mechanical', placed: 120, total: 280 },
    { name: 'Civil', placed: 80, total: 200 },
    { name: 'IT', placed: 220, total: 350 },
  ]

  const skillDemandTrend = [
    { month: 'Jan', python: 70, sql: 65, react: 60 },
    { month: 'Feb', python: 72, sql: 68, react: 63 },
    { month: 'Mar', python: 75, sql: 70, react: 67 },
    { month: 'Apr', python: 78, sql: 73, react: 70 },
    { month: 'May', python: 80, sql: 75, react: 72 },
    { month: 'Jun', python: 82, sql: 76, react: 74 },
    { month: 'Jul', python: 85, sql: 78, react: 76 },
    { month: 'Aug', python: 85, sql: 78, react: 78 },
  ]

  const placementPieData = [
    { name: 'Placed', value: data.placedStudents },
    { name: 'In Process', value: data.internshipsOngoing },
    { name: 'Not Yet', value: data.totalStudents - data.placedStudents - data.internshipsOngoing },
  ]

  return (
    <div className="page-content fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          {data.name} - Dashboard
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Comprehensive insights into student skill development and placement readiness
        </p>
      </div>

      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-icon primary">👥</div>
          <div className="stat-value">{data.totalStudents.toLocaleString()}</div>
          <div className="stat-label">Total Students</div>
          <div className="stat-change positive">{data.activeStudents} active on platform</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">✅</div>
          <div className="stat-value">{data.placedStudents.toLocaleString()}</div>
          <div className="stat-label">Placed Students</div>
          <div className="stat-change positive">{Math.round(data.placedStudents/data.totalStudents*100)}% placement rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon secondary">💼</div>
          <div className="stat-value">{data.placementStats.totalOffers.toLocaleString()}</div>
          <div className="stat-label">Total Offers</div>
          <div className="stat-change positive">↑ 15% from last year</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">💰</div>
          <div className="stat-value">{data.placementStats.avgPackage}</div>
          <div className="stat-label">Avg Package</div>
          <div className="stat-change positive">Highest: {data.placementStats.highestPackage}</div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skill Analysis</button>
        <button className={`tab ${activeTab === 'placements' ? 'active' : ''}`} onClick={() => setActiveTab('placements')}>Placements</button>
        <button className={`tab ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>Student Insights</button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Placement Status</div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={placementPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {placementPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Department-wise Placements</div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#475569" fontSize={11} />
                  <YAxis stroke="#475569" />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="placed" fill="#10b981" name="Placed" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" fill="#1e3a8a" name="Total" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Top Skill Gaps</div>
              <div className="card-subtitle">Skills where students need improvement</div>
            </div>
            {data.topSkillGaps.map((gap, idx) => (
              <div key={idx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <span style={{ fontWeight: 600 }}>{gap.skill}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {gap.gapStudents} students ({gap.percentage}%)
                  </span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${gap.percentage > 45 ? 'danger' : 'warning'}`} style={{ width: `${gap.percentage}%` }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Recommendation: Conduct {gap.skill} workshop
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Industry Skill Demand Trend</div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={skillDemandTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="python" stroke="#1e3a8a" strokeWidth={2} name="Python" />
                  <Line type="monotone" dataKey="sql" stroke="#6366f1" strokeWidth={2} name="SQL" />
                  <Line type="monotone" dataKey="react" stroke="#10b981" strokeWidth={2} name="React" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'placements' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Campus Drives</div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Roles</th>
                  <th>Students Applied</th>
                  <th>Students Selected</th>
                  <th>Avg Package</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>TechCorp India</td>
                  <td>Data Analyst, Full Stack Dev</td>
                  <td>280</td>
                  <td>45</td>
                  <td>12 LPA</td>
                  <td>Sep 2025</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>CloudNine Technologies</td>
                  <td>Frontend Dev, Backend Dev</td>
                  <td>195</td>
                  <td>32</td>
                  <td>14 LPA</td>
                  <td>Aug 2025</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>InnovateLabs</td>
                  <td>ML Engineer, Data Scientist</td>
                  <td>120</td>
                  <td>18</td>
                  <td>18 LPA</td>
                  <td>Aug 2025</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>DataFlow Analytics</td>
                  <td>BI Analyst, Data Analyst</td>
                  <td>150</td>
                  <td>25</td>
                  <td>10 LPA</td>
                  <td>Jul 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Top Students Ready for Placement</div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department</th>
                  <th>CGPA</th>
                  <th>Skills Verified</th>
                  <th>Internships</th>
                  <th>Readiness</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                    <td>{student.degree.split(' in ')[1]}</td>
                    <td>{student.cgpa}</td>
                    <td>{student.skills.filter(s => s.verified).length}/{student.skills.length}</td>
                    <td>{student.internships.length}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="progress-bar" style={{ width: '80px' }}>
                          <div className="progress-fill success" style={{ width: `${Math.min(100, student.cgpa * 10 + student.skills.filter(s => s.verified).length * 5)}%` }} />
                        </div>
                        <span style={{ fontSize: '0.875rem' }}>
                          {Math.min(100, Math.round(student.cgpa * 10 + student.skills.filter(s => s.verified).length * 5))}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default InstitutionDashboard
