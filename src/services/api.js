// api.js — centralised API service (replaces localStorage blogStore)

const API_URL = 'https://blog-web-server-t82k.vercel.app/api';

// ── Helper ────────────────────────────────────────────────────────────────────
const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerUser = async ({ username, email, password }) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return handleResponse(res);
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

// ── Blogs ─────────────────────────────────────────────────────────────────────
export const getBlogs = async () => {
  const res = await fetch(`${API_URL}/blogs`);
  return handleResponse(res);
};

export const getBlogById = async (id) => {
  const res = await fetch(`${API_URL}/blogs/${id}`);
  return handleResponse(res);
};

export const createBlog = async ({ title, body, author }, token) => {
  const res = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ title, body, author }),
  });
  return handleResponse(res);
};

export const deleteBlog = async (id, token) => {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  return handleResponse(res);
};
