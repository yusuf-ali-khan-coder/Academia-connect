import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ROLES = [
  { id: 'student', label: 'Student', icon: '🎓', desc: 'Learning & Placement' },
  { id: 'faculty', label: 'Academician', icon: '👨‍🏫', desc: 'Mentor & Research' },
  { id: 'industry', label: 'Industry', icon: '🏢', desc: 'Hire & Train' },
  { id: 'institution', label: 'Institution', icon: '🏫', desc: 'Analytics & Reports' },
];

const DEMO = {
  student: { email: 'student@ac.in', pass: 'password123' },
  faculty: { email: 'prof@ac.in', pass: 'password123' },
  industry: { email: 'hr@techcorp.com', pass: 'password123' },
  institution: { email: 'admin@ac.in', pass: 'password123' },
};

export default function LoginPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!role) { setError('Please select a role'); return; }
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup({ email, password, name, role });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (r) => {
    setRole(r);
    setEmail(DEMO[r].email);
    setPassword(DEMO[r].pass);
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a, #1e293b, #0f172a)' }}>
      <div style={{ width: '100%', maxWidth: 440, padding: '1.5rem' }}>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 20, padding: '2.5rem', boxShadow: '0 25px 50px rgba(0,0,0,.4)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.75rem', marginBottom: '.25rem' }}>
              <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#fff', fontWeight: 700 }}>A</div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #818cf8, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AcademiaConnect</h1>
            </div>
            <p style={{ color: '#64748b', fontSize: '.875rem' }}>Academia-Industry Collaboration Portal</p>
          </div>

          <div style={{ display: 'flex', background: '#334155', borderRadius: 10, padding: '.25rem', marginBottom: '1.5rem' }}>
            <button onClick={() => { setMode('login'); setError(''); }} style={{ flex: 1, padding: '.5rem', border: 'none', borderRadius: 8, background: mode === 'login' ? '#0f172a' : 'transparent', color: mode === 'login' ? '#f8fafc' : '#64748b', fontWeight: 600, fontSize: '.875rem', cursor: 'pointer' }}>Sign In</button>
            <button onClick={() => { setMode('signup'); setError(''); }} style={{ flex: 1, padding: '.5rem', border: 'none', borderRadius: 8, background: mode === 'signup' ? '#0f172a' : 'transparent', color: mode === 'signup' ? '#f8fafc' : '#64748b', fontWeight: 600, fontSize: '.875rem', cursor: 'pointer' }}>Sign Up</button>
          </div>

          {error && <div style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', color: '#ef4444', padding: '.625rem 1rem', borderRadius: 10, fontSize: '.8125rem', marginBottom: '1rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '.375rem' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required
                style={{ width: '100%', padding: '.625rem 1rem', background: '#334155', border: '1px solid #334155', borderRadius: 10, color: '#f8fafc', fontSize: '.875rem', outline: 'none', transition: 'border-color 0.2s ease' }} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '.375rem' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required
                style={{ width: '100%', padding: '.625rem 1rem', background: '#334155', border: '1px solid #334155', borderRadius: 10, color: '#f8fafc', fontSize: '.875rem', outline: 'none', transition: 'border-color 0.2s ease' }} />
            </div>

            {mode === 'signup' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '.375rem' }}>Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required
                  style={{ width: '100%', padding: '.625rem 1rem', background: '#334155', border: '1px solid #334155', borderRadius: 10, color: '#f8fafc', fontSize: '.875rem', outline: 'none', transition: 'border-color 0.2s ease' }} />
              </div>
            )}

            <div style={{ fontSize: '.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '.5rem' }}>Select your role</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '.75rem', marginBottom: '1.5rem' }}>
              {ROLES.map(r => (
                <div key={r.id} onClick={() => { setRole(r.id); fillDemo(r.id); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '.625rem', padding: '.75rem', background: '#334155', border: `2px solid ${role === r.id ? '#6366f1' : '#334155'}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  <div style={{ fontSize: '1.125rem' }}>{r.icon}</div>
                  <div>
                    <div style={{ fontSize: '.8125rem', fontWeight: 600 }}>{r.label}</div>
                    <div style={{ fontSize: '.6875rem', color: '#64748b' }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" disabled={submitting || !role}
              style={{ width: '100%', padding: '.75rem', background: role ? '#6366f1' : '#334155', color: '#fff', border: 'none', borderRadius: 10, fontSize: '.9375rem', fontWeight: 600, cursor: role ? 'pointer' : 'not-allowed', opacity: submitting ? .6 : 1 }}>
              {submitting ? <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: 8, verticalAlign: 'middle' }}></span>Please wait...</> : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.2)', borderRadius: 10, padding: '.75rem 1rem' }}>
            <div style={{ fontSize: '.75rem', fontWeight: 600, color: '#818cf8', marginBottom: '.5rem' }}>Demo Credentials (click a role above)</div>
            {Object.entries(DEMO).map(([r, c]) => (
              <div key={r} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.6875rem', padding: '.2rem 0', borderBottom: '1px solid rgba(99,102,241,.1)' }}>
                <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{r}</span>
                <span style={{ color: '#64748b', fontFamily: 'monospace' }}>{c.email} / {c.pass}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
