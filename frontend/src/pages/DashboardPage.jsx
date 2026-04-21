import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyticsAPI, complaintsAPI, authAPI } from '../services/api';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const STATUS_COLORS = { pending: '#facc15', in_progress: '#3b82f6', resolved: '#14b8a6', escalated: '#ef4444', closed: '#64748b' };

const STAT_META = [
  { key: 'total', label: 'Total', borderColor: 'border-brand-navy', iconColor: 'text-brand-navy' },
  { key: 'pending', label: 'Pending', borderColor: 'border-brand-orange', iconColor: 'text-brand-orange' },
  { key: 'in_progress', label: 'In Progress', borderColor: 'border-blue-500', iconColor: 'text-blue-500' },
  { key: 'resolved', label: 'Resolved', borderColor: 'border-teal-500', iconColor: 'text-teal-500' },
  { key: 'escalated', label: 'Escalated', borderColor: 'border-red-500', iconColor: 'text-red-500' },
  { key: 'resolution_rate', label: 'Res. Rate', borderColor: 'border-purple-500', iconColor: 'text-purple-500', suffix: '%' },
];

const DUMMY_SUMMARY = { total: 1247, pending: 89, in_progress: 156, resolved: 934, escalated: 68, resolution_rate: 74.9 };
const DUMMY_TREND = [
  { date: '2026-02-28', count: 18 }, { date: '2026-03-01', count: 24 }, { date: '2026-03-02', count: 15 },
  { date: '2026-03-03', count: 31 }, { date: '2026-03-04', count: 22 }, { date: '2026-03-05', count: 28 },
  { date: '2026-03-06', count: 19 }, { date: '2026-03-07', count: 35 }, { date: '2026-03-08', count: 27 },
  { date: '2026-03-09', count: 14 }, { date: '2026-03-10', count: 21 }, { date: '2026-03-11', count: 33 },
  { date: '2026-03-12', count: 26 }, { date: '2026-03-13', count: 29 },
];
const DUMMY_STATUS = [
  { status: 'pending', count: 89 }, { status: 'in_progress', count: 156 },
  { status: 'resolved', count: 934 }, { status: 'escalated', count: 68 },
];
const DUMMY_RECENT = [
  { id: 'demo-1', complaint_id: 'CFC-2026-001', title: 'Pothole on MG Road near High Court', status: 'in_progress', priority: 'high', created_at: '2026-03-13', _demo: true },
  { id: 'demo-2', complaint_id: 'CFC-2026-002', title: 'Street light not working — Sapna Sangeeta', status: 'pending', priority: 'medium', created_at: '2026-03-12', _demo: true },
  { id: 'demo-3', complaint_id: 'CFC-2026-003', title: 'Garbage overflow near Rajwada Square', status: 'resolved', priority: 'urgent', created_at: '2026-03-11', _demo: true },
  { id: 'demo-4', complaint_id: 'CFC-2026-004', title: 'Broken water pipeline — Vijay Nagar', status: 'escalated', priority: 'high', created_at: '2026-03-10', _demo: true },
  { id: 'demo-5', complaint_id: 'CFC-2026-005', title: 'Open drainage cover on AB Road', status: 'in_progress', priority: 'medium', created_at: '2026-03-09', _demo: true },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(DUMMY_SUMMARY);
  const [trend, setTrend] = useState(DUMMY_TREND);
  const [statusData, setStatusData] = useState(DUMMY_STATUS);
  const [recent, setRecent] = useState(DUMMY_RECENT);
  const [loading, setLoading] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [sumRes, trendRes, statusRes, recentRes] = await Promise.all([
          analyticsAPI.summary(),
          analyticsAPI.trend({ days: 14 }),
          analyticsAPI.statusBreakdown(),
          complaintsAPI.list({ page_size: 5, ordering: '-created_at' }),
        ]);
        const s = sumRes.data;
        if (s && typeof s === 'object' && typeof s.total === 'number' && s.total > 0) setSummary(s);
        if (Array.isArray(trendRes.data) && trendRes.data.length) setTrend(trendRes.data);
        if (Array.isArray(statusRes.data) && statusRes.data.length) setStatusData(statusRes.data);
        const list = recentRes.data?.results || recentRes.data || [];
        if (Array.isArray(list) && list.length) setRecent([...list, ...DUMMY_RECENT]);
      } catch { /* keep dummy data */ }
    };
    load();
  }, []);

  useEffect(() => {
    if (user?.role !== 'admin') return;

    const fetchPendingCount = async () => {
      try {
        const { data } = await authAPI.getApprovalCount();
        setPendingCount(data.count || 0);
      } catch {
        // Silent fail
      }
    };

    fetchPendingCount();
  }, [user]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const statusBadge = (s) => {
    const map = {
      pending: 'bg-amber-100 text-amber-700',
      in_progress: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700',
      escalated: 'bg-red-100 text-red-700',
      closed: 'bg-slate-100 text-slate-700',
    };
    return map[s] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">{greeting()}, {user?.first_name || user?.username}</h1>
        <p className="text-slate-500">Here's what's happening today at a glance.</p>
      </header>

      {/* Pending Approvals Banner (Admin Only) */}
      {user?.role === 'admin' && pendingCount > 0 && (
        <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600 text-2xl">schedule</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-900">
                  {pendingCount} {pendingCount === 1 ? 'User' : 'Users'} Waiting for Approval
                </h3>
                <p className="text-sm text-orange-700">
                  Field Officers and Department Heads need your approval to access the system.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/approvals')}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold text-sm shadow-sm"
            >
              Review Now
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Stat Cards */}
      {summary && (
        <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {STAT_META.map((s, i) => (
            <div key={s.key} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${s.borderColor}`} style={{ animation: 'fadeUp 0.3s ease both', animationDelay: `${i * 0.04}s` }}>
              <p className="text-xs font-semibold text-slate-400 uppercase">{s.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{summary[s.key] != null ? `${summary[s.key]}${s.suffix || ''}` : '—'}</h3>
            </div>
          ))}
        </section>
      )}

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4">14-Day Complaint Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B1D51" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0B1D51" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(d) => d?.slice(5)} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#0B1D51" fill="url(#trendGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
          <h4 className="font-bold text-slate-800 w-full mb-4">Status Distribution</h4>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={50} outerRadius={75}>
                {statusData.map((d, i) => <Cell key={i} fill={STATUS_COLORS[d.status] || '#94a3b8'} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-full space-y-1 mt-2">
            {statusData.map((d) => (
              <div key={d.status} className="flex justify-between text-xs">
                <span className="flex items-center"><span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: STATUS_COLORS[d.status] || '#94a3b8' }} />{d.status?.replace('_', ' ')}</span>
                <span className="font-bold">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Complaints */}
      <section className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h4 className="font-bold text-slate-800">Recent Complaints</h4>
          <button className="text-sm font-semibold text-brand-orange hover:underline" onClick={() => navigate('/complaints')}>View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">ID</th>
                <th className="px-6 py-4 font-bold">Title</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Priority</th>
                <th className="px-6 py-4 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recent.map((c) => (
                <tr key={c.id} className={`hover:bg-slate-50 transition-colors ${c._demo ? 'opacity-70' : 'cursor-pointer'}`} onClick={() => !c._demo && navigate(`/complaints/${c.id}`)}>
                  <td className="px-6 py-4 font-mono text-[11px] font-bold text-blue-600 bg-blue-50 rounded">{c.complaint_id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{c.title}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 ${statusBadge(c.status)} rounded-full text-[10px] font-bold uppercase`}>{c.status?.replace('_', ' ')}</span></td>
                  <td className="px-6 py-4 capitalize text-slate-600">{c.priority}</td>
                  <td className="px-6 py-4 text-slate-500">{c.created_at?.slice(0, 10)}</td>
                </tr>
              ))}
              {recent.length === 0 && <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No complaints yet</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
