const defaultApiUrl = import.meta.env.DEV
  ? 'http://localhost:3001/api'
  : 'https://academia-connect-backend-5t19.onrender.com/api';

let rawUrl = (import.meta.env.VITE_API_URL || defaultApiUrl).trim();

// Strip surrounding quotes if present
rawUrl = rawUrl.replace(/^["']|["']$/g, '').trim();

// Automatically strip accidental 'VITE_API_URL=' prefix if user entered 'KEY=VALUE' in Vercel
if (rawUrl.startsWith('VITE_API_URL=')) {
  rawUrl = rawUrl.substring('VITE_API_URL='.length).trim();
}

// Strip surrounding quotes again if inner was quoted
rawUrl = rawUrl.replace(/^["']|["']$/g, '').trim();

// If empty or does not start with http/https, fall back to default production backend
if (!rawUrl || (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://'))) {
  rawUrl = defaultApiUrl;
}

const trimmedUrl = rawUrl.replace(/\/+$/, '');
const BASE = trimmedUrl.endsWith('/api') ? trimmedUrl : `${trimmedUrl}/api`;

let accessToken = null;
let refreshToken = null;

function setTokens(access, refresh) {
  accessToken = access;
  refreshToken = refresh;
}

function clearTokens() {
  accessToken = null;
  refreshToken = null;
}

async function request(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

  let res = await fetch(`${BASE}${endpoint}`, { ...options, headers });

  if (res.status === 401 && refreshToken) {
    try {
      const refreshRes = await fetch(`${BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setTokens(data.access, data.refresh);
        headers['Authorization'] = `Bearer ${data.access}`;
        res = await fetch(`${BASE}${endpoint}`, { ...options, headers });
      } else {
        clearTokens();
        window.location.reload();
      }
    } catch {
      clearTokens();
      window.location.reload();
    }
  }

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try {
      const err = await res.json();
      errMsg = err.error || err.message || errMsg;
    } catch {
      try {
        const text = await res.text();
        if (text && text.length < 150 && !text.includes('<html') && !text.includes('<!DOCTYPE')) {
          errMsg = text;
        }
      } catch {}
    }
    throw new Error(errMsg);
  }
  return res.json();
}

export const api = {
  setTokens,
  clearTokens,

  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  signup: (data) => request('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),

  getMe: () => request('/users/me'),
  updateMe: (data) => request('/users/me', { method: 'PUT', body: JSON.stringify(data) }),
  getMySkills: () => request('/users/me/skills'),
  saveSkill: (data) => request('/users/me/skills', { method: 'POST', body: JSON.stringify(data) }),

  getOpportunities: (params) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/opportunities${q}`);
  },
  getOpportunity: (id) => request(`/opportunities/${id}`),
  createOpportunity: (data) => request('/opportunities', { method: 'POST', body: JSON.stringify(data) }),

  getApplications: () => request('/applications'),
  apply: (data) => request('/applications', { method: 'POST', body: JSON.stringify(data) }),
  updateAppStatus: (id, status) => request(`/applications/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  getDocuments: () => request('/documents'),
  uploadDocument: (formData) => fetch(`${BASE}/documents`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    body: formData,
  }).then(r => r.json()),
  deleteDocument: (id) => request(`/documents/${id}`, { method: 'DELETE' }),

  getEvents: () => request('/events'),
  createEvent: (data) => request('/events', { method: 'POST', body: JSON.stringify(data) }),
  registerEvent: (id) => request(`/events/${id}/register`, { method: 'POST' }),

  getAssessments: () => request('/assessments'),
  submitAssessment: (data) => request('/assessments/submit', { method: 'POST', body: JSON.stringify(data) }),

  getPrograms: () => request('/programs'),
  createProgram: (data) => request('/programs', { method: 'POST', body: JSON.stringify(data) }),

  getChallenges: () => request('/challenges'),
  createChallenge: (data) => request('/challenges', { method: 'POST', body: JSON.stringify(data) }),
  registerChallenge: (id, data) => request(`/challenges/${id}/register`, { method: 'POST', body: JSON.stringify(data || {}) }),

  health: () => request('/health'),
};
