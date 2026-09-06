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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #F7F3EC, #FFFFFF, #F7F3EC)' }}>
      <div style={{ width: '100%', maxWidth: 440, padding: '1.5rem' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E5DDD1', borderRadius: 20, padding: '2.5rem', boxShadow: '0 25px 50px rgba(0,0,0,.4)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.75rem', marginBottom: '.25rem' }}>
              <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #332E28, #E8DCC8)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#fff', fontWeight: 700 }}>A</div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #6B5845, #E8DCC8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AcademiaConnect</h1>
            </div>
            <p style={{ color: '#6B6258', fontSize: '.875rem' }}>Academia-Industry Collaboration Portal</p>
          </div>

          <div style={{ display: 'flex', background: '#E5DDD1', borderRadius: 10, padding: '.25rem', marginBottom: '1.5rem' }}>
            <button onClick={() => { setMode('login'); setError(''); }} style={{ flex: 1, padding: '.5rem', border: 'none', borderRadius: 8, background: mode === 'login' ? '#F7F3EC' : 'transparent', color: mode === 'login' ? '#332E28' : '#6B6258', fontWeight: 600, fontSize: '.875rem', cursor: 'pointer' }}>Sign In</button>
            <button onClick={() => { setMode('signup'); setError(''); }} style={{ flex: 1, padding: '.5rem', border: 'none', borderRadius: 8, background: mode === 'signup' ? '#F7F3EC' : 'transparent', color: mode === 'signup' ? '#332E28' : '#6B6258', fontWeight: 600, fontSize: '.875rem', cursor: 'pointer' }}>Sign Up</button>
          </div>

          {error && <div style={{ background: 'rgba(168, 84, 72,.1)', border: '1px solid rgba(168, 84, 72,.3)', color: '#A85448', padding: '.625rem 1rem', borderRadius: 10, fontSize: '.8125rem', marginBottom: '1rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 600, color: '#6B6258', marginBottom: '.375rem' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required
                style={{ width: '100%', padding: '.625rem 1rem', background: '#E5DDD1', border: '1px solid #E5DDD1', borderRadius: 10, color: '#332E28', fontSize: '.875rem', outline: 'none', transition: 'border-color 0.2s ease' }} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 600, color: '#6B6258', marginBottom: '.375rem' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required
                style={{ width: '100%', padding: '.625rem 1rem', background: '#E5DDD1', border: '1px solid #E5DDD1', borderRadius: 10, color: '#332E28', fontSize: '.875rem', outline: 'none', transition: 'border-color 0.2s ease' }} />
            </div>

            {mode === 'signup' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 600, color: '#6B6258', marginBottom: '.375rem' }}>Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required
                  style={{ width: '100%', padding: '.625rem 1rem', background: '#E5DDD1', border: '1px solid #E5DDD1', borderRadius: 10, color: '#332E28', fontSize: '.875rem', outline: 'none', transition: 'border-color 0.2s ease' }} />
              </div>
            )}

            <div style={{ fontSize: '.75rem', fontWeight: 600, color: '#6B6258', marginBottom: '.5rem' }}>Select your role</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '.75rem', marginBottom: '1.5rem' }}>
              {ROLES.map(r => (
                <div key={r.id} onClick={() => { setRole(r.id); fillDemo(r.id); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '.625rem', padding: '.75rem', background: '#E5DDD1', border: `2px solid ${role === r.id ? '#332E28' : '#E5DDD1'}`, borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  <div style={{ fontSize: '1.125rem' }}>{r.icon}</div>
                  <div>
                    <div style={{ fontSize: '.8125rem', fontWeight: 600 }}>{r.label}</div>
                    <div style={{ fontSize: '.6875rem', color: '#6B6258' }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" disabled={submitting || !role}
              style={{ width: '100%', padding: '.75rem', background: role ? '#E8DCC8' : '#E5DDD1', color: role ? '#332E28' : '#6B6258', border: 'none', borderRadius: 10, fontSize: '.9375rem', fontWeight: 600, cursor: role ? 'pointer' : 'not-allowed', opacity: submitting ? .6 : 1 }}>
              {submitting ? <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(51,46,40,0.3)', borderTopColor: '#332E28', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: 8, verticalAlign: 'middle' }}></span>Please wait...</> : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', background: 'rgba(51, 46, 40,.08)', border: '1px solid rgba(51, 46, 40,.2)', borderRadius: 10, padding: '.75rem 1rem' }}>
            <div style={{ fontSize: '.75rem', fontWeight: 600, color: '#6B5845', marginBottom: '.5rem' }}>Demo Credentials (click a role above)</div>
            {Object.entries(DEMO).map(([r, c]) => (
              <div key={r} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.6875rem', padding: '.2rem 0', borderBottom: '1px solid rgba(51, 46, 40,.1)' }}>
                <span style={{ color: '#6B6258', textTransform: 'capitalize' }}>{r}</span>
                <span style={{ color: '#6B6258', fontFamily: 'monospace' }}>{c.email} / {c.pass}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
