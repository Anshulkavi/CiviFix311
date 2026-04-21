import { format, formatDistance, formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Format date as "Jan 15, 2025"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch (error) {
    return dateString;
  }
};

/**
 * Format date and time as "Jan 15, 2025 2:30 PM"
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  try {
    return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
  } catch (error) {
    return dateString;
  }
};

/**
 * Format as relative time "2 hours ago"
 */
export const formatRelative = (dateString) => {
  if (!dateString) return '—';
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch (error) {
    return dateString;
  }
};

/**
 * Format distance between two dates "2 days"
 */
export const formatDateDistance = (startDate, endDate) => {
  if (!startDate || !endDate) return '—';
  try {
    return formatDistance(parseISO(startDate), parseISO(endDate));
  } catch (error) {
    return '—';
  }
};

/**
 * Format as short date "01/15/2025"
 */
export const formatShortDate = (dateString) => {
  if (!dateString) return '—';
  try {
    return format(parseISO(dateString), 'MM/dd/yyyy');
  } catch (error) {
    return dateString;
  }
};
