/**
 * Centralized constants for CivicFix 311
 */

// Complaint Priorities
export const PRIORITIES = [
  { value: 'low', label: 'Low', color: 'slate' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
];

export const PRIORITY_COLORS = {
  low: 'bg-slate-100 text-slate-700 border-slate-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  urgent: 'bg-red-100 text-red-700 border-red-200',
};

// Complaint Statuses
export const STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'in_progress', label: 'In Progress', color: 'blue' },
  { value: 'resolved', label: 'Resolved', color: 'green' },
  { value: 'closed', label: 'Closed', color: 'slate' },
  { value: 'escalated', label: 'Escalated', color: 'red' },
  { value: 'rejected', label: 'Rejected', color: 'gray' },
];

export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
  resolved: 'bg-green-100 text-green-700 border-green-200',
  closed: 'bg-slate-100 text-slate-700 border-slate-200',
  escalated: 'bg-red-100 text-red-700 border-red-200',
  rejected: 'bg-gray-100 text-gray-700 border-gray-200',
};

export const STATUS_LABELS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
  escalated: 'Escalated',
  rejected: 'Rejected',
};

// User Roles
export const ROLES = [
  { value: 'citizen', label: 'Citizen' },
  { value: 'field_officer', label: 'Field Officer' },
  { value: 'dept_head', label: 'Dept Head' },
  { value: 'admin', label: 'Admin' },
];

export const ROLE_LABELS = {
  citizen: 'Citizen',
  field_officer: 'Field Officer',
  dept_head: 'Dept Head',
  admin: 'Admin',
};

export const ROLE_COLORS = {
  citizen: 'bg-slate-100 text-slate-800',
  field_officer: 'bg-blue-100 text-blue-800',
  dept_head: 'bg-teal-100 text-teal-800',
  admin: 'bg-purple-100 text-purple-800',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  submitted: { icon: 'check_circle', color: 'bg-green-50 text-green-600' },
  status: { icon: 'update', color: 'bg-blue-50 text-blue-600' },
  assigned: { icon: 'person_add', color: 'bg-purple-50 text-purple-600' },
  escalated: { icon: 'priority_high', color: 'bg-red-50 text-red-600' },
  resolved: { icon: 'task_alt', color: 'bg-teal-50 text-teal-600' },
};

// Form validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  latitude: { min: -90, max: 90 },
  longitude: { min: -180, max: 180 },
};

// File upload constraints
export const FILE_CONSTRAINTS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
  acceptedExtensions: ['.jpg', '.jpeg', '.png'],
};

// Pagination
export const PAGINATION = {
  pageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
};
