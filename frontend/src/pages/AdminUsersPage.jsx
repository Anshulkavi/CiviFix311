import { useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/dateFormatter';

const ROLE_COLORS = { admin: 'bg-purple-100 text-purple-800', field_officer: 'bg-blue-100 text-blue-800', dept_head: 'bg-teal-100 text-teal-800', citizen: 'bg-slate-100 text-slate-800' };
const ROLE_LABELS = { admin: 'Admin', field_officer: 'Officer', dept_head: 'Dept Head', citizen: 'Citizen' };

const DUMMY_USERS = [
  { id: 'demo-1', first_name: 'Arun', last_name: 'Mehta', username: 'arun_admin', role: 'admin', department: { name: 'Administration' }, phone: '+91 98765 43210', date_joined: '2024-01-15', _demo: true },
  { id: 'demo-2', first_name: 'Rajesh', last_name: 'Verma', username: 'rajesh_officer', role: 'field_officer', department: { name: 'Public Works' }, phone: '+91 98765 43211', date_joined: '2024-03-22', _demo: true },
  { id: 'demo-3', first_name: 'Priya', last_name: 'Sharma', username: 'priya_head', role: 'dept_head', department: { name: 'Sanitation' }, phone: '+91 98765 43212', date_joined: '2024-02-10', _demo: true },
  { id: 'demo-4', first_name: 'Animesh', last_name: 'Kapoor', username: 'animesh_k', role: 'citizen', department: null, phone: '+91 98765 43213', date_joined: '2025-06-05', _demo: true },
  { id: 'demo-5', first_name: 'Sunita', last_name: 'Patel', username: 'sunita_officer', role: 'field_officer', department: { name: 'Water Department' }, phone: '+91 98765 43214', date_joined: '2024-07-19', _demo: true },
  { id: 'demo-6', first_name: 'Mohit', last_name: 'Joshi', username: 'mohit_citizen', role: 'citizen', department: null, phone: '+91 98765 43215', date_joined: '2025-09-11', _demo: true },
  { id: 'demo-7', first_name: 'Kavita', last_name: 'Rao', username: 'kavita_head', role: 'dept_head', department: { name: 'Electrical' }, phone: '+91 98765 43216', date_joined: '2024-04-30', _demo: true },
  { id: 'demo-8', first_name: 'Vikram', last_name: 'Singh', username: 'vikram_officer', role: 'field_officer', department: { name: 'Drainage' }, phone: '+91 98765 43217', date_joined: '2024-08-14', _demo: true },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (search) params.search = search;
      const { data } = await authAPI.getUsers(params);
      const list = data.results || data;
      if (Array.isArray(list)) setUsers([...list, ...DUMMY_USERS]);
    } catch { /* keep dummy data */ }
    setLoading(false);
  }, [roleFilter, search]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="flex items-center justify-between px-6 py-6 bg-white border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">User Management</h2>
          <p className="text-sm text-slate-500">{users.length} users</p>
        </div>
      </header>

      <section className="p-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg focus:ring-primary focus:border-primary" placeholder="Search users..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2">
            {['', 'admin', 'dept_head', 'field_officer', 'citizen'].map((r) => (
              <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${roleFilter === r ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {r ? ROLE_LABELS[r] : 'All'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16"><span className="material-symbols-outlined animate-spin text-3xl text-brand-navy">progress_activity</span></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">User</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Department</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Phone</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className={`hover:bg-slate-50 transition-colors ${u._demo ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center text-white text-xs font-bold">
                            {(u.first_name?.[0] || u.username?.[0] || '?').toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{u.first_name} {u.last_name}</p>
                            <p className="text-xs text-slate-500">@{u.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[u.role] || 'bg-slate-100 text-slate-800'}`}>
                          {ROLE_LABELS[u.role] || u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{u.department_name || u.department?.name || '—'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{u.phone || '—'}</td>
                      <td className="px-6 py-4"><span className="font-mono text-xs text-slate-400">{formatDate(u.date_joined)}</span></td>
                    </tr>
                  ))}
                  {users.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No users found</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
