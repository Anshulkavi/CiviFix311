import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

const NAV_ITEMS = {
  citizen: [
    { to: '/dashboard', icon: 'dashboard', label: 'Overview' },
    { to: '/notifications', icon: 'notifications', label: 'Notifications' },
    { to: '/complaints', icon: 'assignment', label: 'My Complaints' },
    { to: '/complaints/new', icon: 'add_circle', label: 'New Complaint' },
    { to: '/map', icon: 'map', label: 'Live Map' },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ],
  field_officer: [
    { to: '/dashboard', icon: 'dashboard', label: 'Overview' },
    { to: '/notifications', icon: 'notifications', label: 'Notifications' },
    { to: '/complaints', icon: 'assignment', label: 'Assigned Tasks' },
    { to: '/map', icon: 'map', label: 'Live Map' },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ],
  dept_head: [
    { to: '/dashboard', icon: 'dashboard', label: 'Overview' },
    { to: '/notifications', icon: 'notifications', label: 'Notifications' },
    { to: '/complaints', icon: 'assignment', label: 'Complaints' },
    { to: '/analytics', icon: 'analytics', label: 'Analytics' },
    { to: '/map', icon: 'map', label: 'Live Map' },
    { to: '/admin/users', icon: 'group', label: 'Users' },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ],
  admin: [
    { to: '/dashboard', icon: 'dashboard', label: 'Overview' },
    { to: '/notifications', icon: 'notifications', label: 'Notifications' },
    { to: '/complaints', icon: 'assignment', label: 'All Complaints' },
    { to: '/analytics', icon: 'analytics', label: 'Analytics' },
    { to: '/map', icon: 'map', label: 'Live Map' },
    { to: '/admin/users', icon: 'group', label: 'Manage Users' },
    { to: '/admin/approvals', icon: 'schedule', label: 'Approvals', badge: true },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ],
};

const ROLE_LABELS = {
  citizen: 'Citizen',
  field_officer: 'Officer',
  dept_head: 'Dept Head',
  admin: 'Admin',
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const items = NAV_ITEMS[user?.role] || NAV_ITEMS.citizen;

  // Fetch pending approvals count for admin
  useEffect(() => {
    if (user?.role !== 'admin') return;

    const fetchPendingCount = async () => {
      try {
        const { data } = await authAPI.getApprovalCount();
        setPendingCount(data.count || 0);
      } catch (err) {
        // Silent fail
      }
    };

    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 60000); // Poll every 60 seconds

    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = (user?.first_name?.[0] || user?.username?.[0] || '?').toUpperCase();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy text-white flex-shrink-0 flex flex-col hidden lg:flex">
        {/* Logo */}
        <div className="p-6 flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-brand-orange w-10 h-10 flex items-center justify-center rounded font-bold text-lg">
            CF
          </div>
          <span className="text-xl font-bold tracking-tight">
            CivicFix <span className="font-normal text-slate-300">311</span>
          </span>
        </div>

        {/* User Chip */}
        <div className="px-6 py-4 border-b border-slate-700/50">
          <div className="flex items-center space-x-3 bg-slate-800/50 p-3 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center font-bold text-sm">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">
                {user?.first_name || user?.username || 'User'}
              </p>
              <span className="text-[10px] uppercase tracking-wider bg-brand-orange px-1.5 py-0.5 rounded font-bold">
                {ROLE_LABELS[user?.role] || 'User'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow py-6">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-6 py-3 border-l-4 transition-all ${
                      isActive
                        ? 'border-brand-orange bg-slate-800/30 text-white font-medium'
                        : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/20'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <span className="material-symbols-outlined w-5 h-5 mr-3 text-[20px]">
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                  {item.badge && pendingCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {pendingCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign Out */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Sign Out
          </button>
          <p className="text-slate-500 text-xs mt-4 text-center">© 2024 CivicFix v2.4</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-grow flex flex-col overflow-y-auto">
        <header className="lg:hidden bg-brand-navy text-white p-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-orange w-8 h-8 flex items-center justify-center rounded font-bold text-sm">
              CF
            </div>
            <span className="font-bold">CivicFix</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </header>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <nav className="fixed top-0 left-0 w-72 h-full bg-brand-navy z-50 transform transition-transform lg:hidden overflow-y-auto">
              {/* Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                <div className="flex items-center space-x-2">
                  <div className="bg-brand-orange w-8 h-8 flex items-center justify-center rounded font-bold text-sm">
                    CF
                  </div>
                  <span className="font-bold text-white">CivicFix</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-2"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* User Chip */}
              <div className="px-4 py-4 border-b border-slate-700/50">
                <div className="flex items-center space-x-3 bg-slate-800/50 p-3 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center font-bold text-sm text-white">
                    {initials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold truncate text-white">
                      {user?.first_name || user?.username || 'User'}
                    </p>
                    <span className="text-[10px] uppercase tracking-wider bg-brand-orange px-1.5 py-0.5 rounded font-bold text-white">
                      {ROLE_LABELS[user?.role] || 'User'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <ul className="py-4 space-y-1">
                {items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      end={item.to === '/dashboard'}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 border-l-4 transition-all ${
                          isActive
                            ? 'border-brand-orange bg-slate-800/30 text-white font-medium'
                            : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/20'
                        }`
                      }
                    >
                      <div className="flex items-center">
                        <span className="material-symbols-outlined w-5 h-5 mr-3 text-[20px]">
                          {item.icon}
                        </span>
                        {item.label}
                      </div>
                      {item.badge && pendingCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                          {pendingCount}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Sign Out */}
              <div className="p-4 absolute bottom-0 left-0 right-0 bg-brand-navy border-t border-slate-700/50">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-slate-400 hover:text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </div>
            </nav>
          </>
        )}

        <main className="flex-grow bg-brand-bg">{children}</main>
      </div>
    </div>
  );
}
