import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh_token');

      if (refresh) {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/token/refresh/`,
            { refresh }
          );
          localStorage.setItem('access_token', data.access);
          if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return API(originalRequest);
        } catch {
          localStorage.clear();
          window.location.href = '/login';
        }
      } else {
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => API.post('/auth/login/', data),
  register: (data) => API.post('/auth/register/', data),
  getProfile: () => API.get('/auth/profile/'),
  updateProfile: (data) => API.patch('/auth/profile/', data),
  changePassword: (data) => API.post('/auth/change-password/', data),
  getUsers: (params) => API.get('/auth/users/', { params }),

  // Approval workflow
  getPendingApprovals: () => API.get('/auth/approvals/'),
  getApprovalCount: () => API.get('/auth/approvals/count/'),
  approveUser: (id) => API.post(`/auth/approvals/${id}/approve/`),
  rejectUser: (id, reason) => API.post(`/auth/approvals/${id}/reject/`, { reason }),

  // Departments (for registration)
  getDepartments: () => API.get('/auth/departments/'),
};

export const complaintsAPI = {
  list: (params) => API.get('/complaints/', { params }),
  create: (data) => API.post('/complaints/', data),
  get: (id) => API.get(`/complaints/${id}/`),
  update: (id, data) => API.patch(`/complaints/${id}/`, data),
  updateStatus: (id, data) => API.patch(`/complaints/${id}/status/`, data),
  upvote: (id) => API.post(`/complaints/${id}/upvote/`),
  confirmResolution: (id, data) => API.post(`/complaints/${id}/confirm/`, data),
  assign: (id, data) => API.patch(`/complaints/${id}/assign/`, data),
  getMapComplaints: (params) => API.get('/complaints/map/', { params }),
  getCategories: () => API.get('/complaints/categories/'),
  getDepartments: () => API.get('/complaints/departments/'),
};

export const notificationsAPI = {
  list: () => API.get('/notifications/'),
  unreadCount: () => API.get('/notifications/unread/'),
  markRead: (id) => API.post(id ? `/notifications/${id}/read/` : '/notifications/read/'),
};

export const analyticsAPI = {
  summary: () => API.get('/analytics/summary/'),
  trend: (params) => API.get('/analytics/trend/', { params }),
  categoryBreakdown: () => API.get('/analytics/categories/'),
  departmentBreakdown: () => API.get('/analytics/departments/'),
  wardHeatmap: () => API.get('/analytics/wards/'),
  statusBreakdown: () => API.get('/analytics/status/'),
};

export default API;
