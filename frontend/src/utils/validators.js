import { VALIDATION_PATTERNS, FILE_CONSTRAINTS } from '../constants';

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!VALIDATION_PATTERNS.email.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) return null; // Phone is optional
  if (!VALIDATION_PATTERNS.phone.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return null;
};

/**
 * Validate password confirmation
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

/**
 * Validate latitude
 */
export const validateLatitude = (lat) => {
  if (!lat) return null; // Optional field
  const num = parseFloat(lat);
  if (isNaN(num)) return 'Latitude must be a number';
  if (num < VALIDATION_PATTERNS.latitude.min || num > VALIDATION_PATTERNS.latitude.max) {
    return `Latitude must be between ${VALIDATION_PATTERNS.latitude.min} and ${VALIDATION_PATTERNS.latitude.max}`;
  }
  return null;
};

/**
 * Validate longitude
 */
export const validateLongitude = (lng) => {
  if (!lng) return null; // Optional field
  const num = parseFloat(lng);
  if (isNaN(num)) return 'Longitude must be a number';
  if (num < VALIDATION_PATTERNS.longitude.min || num > VALIDATION_PATTERNS.longitude.max) {
    return `Longitude must be between ${VALIDATION_PATTERNS.longitude.min} and ${VALIDATION_PATTERNS.longitude.max}`;
  }
  return null;
};

/**
 * Validate file upload
 */
export const validateFile = (file) => {
  if (!file) return null; // Optional

  if (file.size > FILE_CONSTRAINTS.maxSize) {
    return `File size must be less than ${FILE_CONSTRAINTS.maxSize / (1024 * 1024)}MB`;
  }

  if (!FILE_CONSTRAINTS.acceptedTypes.includes(file.type)) {
    return 'File must be JPG or PNG image';
  }

  return null;
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate minimum length
 */
export const validateMinLength = (value, minLength, fieldName) => {
  if (!value) return null; // If required, use validateRequired first
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (value, maxLength, fieldName) => {
  if (!value) return null;
  if (value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters`;
  }
  return null;
};
