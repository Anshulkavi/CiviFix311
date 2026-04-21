import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { formatRelative } from '../utils/dateFormatter';

const ROLE_ICONS = {
  field_officer: '👮',
  dept_head: '🏢'
};

const ROLE_LABELS = {
  field_officer: 'Field Officer',
  dept_head: 'Dept Head'
};

export default function AdminApprovalsPage() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectModal, setRejectModal] = useState(null); // { user: {...}, show: boolean }
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const loadApprovals = async () => {
    setLoading(true);
    try {
      const { data } = await authAPI.getPendingApprovals();
      const list = data.results || data;
      setApprovals(Array.isArray(list) ? list : []);
    } catch (err) {
      toast.error('Failed to load pending approvals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovals();
  }, []);

  const handleApprove = async (user) => {
    if (actionLoading) return;

    setActionLoading(true);
    try {
      await authAPI.approveUser(user.id);
      toast.success(`${user.first_name} ${user.last_name} approve ho gaya!`);

      // Remove from list with animation
      setApprovals(prev => prev.filter(u => u.id !== user.id));
    } catch (err) {
      toast.error('Failed to approve user');
    } finally {
      setActionLoading(false);
    }
  };

  const openRejectModal = (user) => {
    setRejectModal({ user, show: true });
    setRejectReason('');
  };

  const closeRejectModal = () => {
    setRejectModal(null);
    setRejectReason('');
  };

  const confirmReject = async () => {
    if (!rejectModal || actionLoading) return;

    setActionLoading(true);
    try {
      await authAPI.rejectUser(rejectModal.user.id, rejectReason);
      toast.success('Request reject kar diya');

      // Remove from list
      setApprovals(prev => prev.filter(u => u.id !== rejectModal.user.id));
      closeRejectModal();
    } catch (err) {
      toast.error('Failed to reject user');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 bg-white border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-brand-navy">Pending Approvals</h2>
            {approvals.length > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {approvals.length}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Field Officers and Department Heads waiting for approval
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 overflow-y-auto px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="material-symbols-outlined animate-spin text-3xl text-brand-navy">
              progress_activity
            </span>
          </div>
        ) : approvals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 text-4xl">
              ✅
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Sab clear hai!</h3>
            <p className="text-slate-500">Koi pending approval nahi.</p>
          </div>
        ) : (
          <div className="max-w-4xl space-y-4">
            {approvals.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* User Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {(user.first_name?.[0] || user.username?.[0] || '?').toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {user.first_name} {user.last_name}
                        </h3>
                        <span className="text-xs text-slate-400">
                          {formatRelative(user.date_joined || user.created_at)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600 mb-3">
                        <span>@{user.username}</span>
                        <span>•</span>
                        <span>{user.email}</span>
                        {user.phone && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">phone</span>
                              {user.phone}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div>
                          <span className="text-xs text-slate-500 font-semibold">Role:</span>
                          <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <span>{ROLE_ICONS[user.role]}</span>
                            <span>{ROLE_LABELS[user.role] || user.role}</span>
                          </span>
                        </div>

                        {user.department_name && (
                          <div>
                            <span className="text-xs text-slate-500 font-semibold">Dept:</span>
                            <span className="ml-2 text-sm text-slate-700">{user.department_name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleApprove(user)}
                      disabled={actionLoading}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Approve
                    </button>

                    <button
                      onClick={() => openRejectModal(user)}
                      disabled={actionLoading}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-sm">cancel</span>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reject Modal */}
      {rejectModal?.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Reject {rejectModal.user.first_name} {rejectModal.user.last_name}?
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              User will be notified that their registration was rejected.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Reason (optional):
              </label>
              <textarea
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                rows={3}
                placeholder="Enter rejection reason..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeRejectModal}
                disabled={actionLoading}
                className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50"
              >
                {actionLoading ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
