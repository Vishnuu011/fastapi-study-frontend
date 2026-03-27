import axios from 'axios';

const BASE_URL = 'https://fastapi-study-ozgc.onrender.com';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor — attach JWT token from localStorage
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      // Let components handle redirect via AuthContext
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ────────────────────────────────────────────────────────────────

export const registerUser = (data) =>
  axiosClient.post('/api/v1/users/register', data);

export const loginUser = (data) =>
  axiosClient.post('/api/v1/users/login', data);

// ─── Blog API ─────────────────────────────────────────────────────────────────

export const getBlogs = (skip = 0, limit = 10) =>
  axiosClient.get('/api/v1/blogs/blogs', { params: { skip, limit } });

export const createBlog = (data) =>
  axiosClient.post('/api/v1/blogs/blogs', data);

export const updateBlog = (id, data) =>
  axiosClient.put(`/api/v1/blogs/blogs/${id}`, data);

export const deleteBlog = (id) =>
  axiosClient.delete(`/api/v1/blogs/blogs/${id}`);

export default axiosClient;
