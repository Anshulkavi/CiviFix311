import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationsAPI } from '../services/api';
import toast from 'react-hot-toast';

const TYPE_ICONS = {
  submitted: 'check_circle',
  status: 'update',
  assigned: 'person_add',
  escalated: 'priority_high',
  resolved: 'task_alt',
};

const TYPE_COLORS = {
  submitted: 'bg-green-50 text-green-600',
  status: 'bg-blue-50 text-blue-600',
  assigned: 'bg-purple-50 text-purple-600',
  escalated: 'bg-red-50 text-red-600',
  resolved: 'bg-teal-50 text-teal-600',
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(''); // '' = all, or specific type
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await notificationsAPI.list();
      const list = data.results || data;
      setNotifications(Array.isArray(list) ? list : []);
    } catch (err) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const { data } = await notificationsAPI.unreadCount();
      setUnreadCount(data.unread || 0);
    } catch {
      // Silently fail
    }
  };

  useEffect(() => {
    loadNotifications();
    loadUnreadCount();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadNotifications();
      loadUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkRead = async (notificationId) => {
    try {
      await notificationsAPI.markRead(notificationId);
      setNotifications(prev => prev.map(n =>
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
      toast.success('Marked as read');
    } catch (err) {
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsAPI.markRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (err) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      handleMarkRead(notification.id);
    }
    if (notification.complaint_id) {
      navigate(`/complaints/${notification.complaint_id}`);
    }
  };

  const filteredNotifications = filter
    ? notifications.filter(n => n.type === filter)
    : notifications;

  const types = ['submitted', 'status', 'assigned', 'escalated', 'resolved'];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 bg-white border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Notifications</h2>
          <p className="text-sm text-slate-500">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors font-medium text-sm"
          >
            <span className="material-symbols-outlined text-lg">done_all</span>
            Mark all as read
          </button>
        )}
      </header>

      {/* Filters */}
      <section className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              filter === '' ? 'bg-brand-navy text-white' : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors capitalize ${
                filter === type ? 'bg-brand-navy text-white' : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Notifications List */}
      <section className="flex-1 overflow-y-auto px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="material-symbols-outlined animate-spin text-3xl text-brand-navy">progress_activity</span>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-400">notifications_off</span>
            </div>
            <p className="text-lg font-semibold text-slate-600 mb-1">No notifications</p>
            <p className="text-sm text-slate-400">
              {filter ? `No ${filter} notifications found` : 'You\'re all caught up!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-w-4xl">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`bg-white rounded-xl border shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                  notif.is_read ? 'border-slate-200 opacity-60' : 'border-primary/30 ring-2 ring-primary/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${TYPE_COLORS[notif.type] || 'bg-slate-50 text-slate-600'}`}>
                    <span className="material-symbols-outlined text-lg">
                      {TYPE_ICONS[notif.type] || 'notifications'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-slate-800 text-sm">{notif.title}</h3>
                      {!notif.is_read && (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{notif.message}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="capitalize">{notif.type}</span>
                      <span>•</span>
                      <span>{new Date(notif.created_at).toLocaleString()}</span>
                      {notif.complaint_id && (
                        <>
                          <span>•</span>
                          <span className="font-mono">ID: {notif.complaint_id}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mark Read Button */}
                  {!notif.is_read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkRead(notif.id);
                      }}
                      className="shrink-0 p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <span className="material-symbols-outlined text-lg">done</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
