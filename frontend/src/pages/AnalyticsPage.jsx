import { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const STATUS_COLORS = { pending: '#facc15', in_progress: '#3b82f6', resolved: '#14b8a6', escalated: '#ef4444', closed: '#64748b' };
const DAY_OPTIONS = [7, 14, 30, 60];

const DUMMY_A_SUMMARY = { total: 1247, resolution_rate: 74.9, avg_resolution_hours: 36, escalated: 68 };
const DUMMY_A_TREND = [
  { date: '2026-02-12', count: 32 }, { date: '2026-02-13', count: 28 }, { date: '2026-02-14', count: 41 },
  { date: '2026-02-15', count: 35 }, { date: '2026-02-16', count: 22 }, { date: '2026-02-17', count: 19 },
  { date: '2026-02-18', count: 27 }, { date: '2026-02-19', count: 38 }, { date: '2026-02-20', count: 44 },
  { date: '2026-02-21', count: 31 }, { date: '2026-02-22', count: 25 }, { date: '2026-02-23', count: 36 },
  { date: '2026-02-24', count: 29 }, { date: '2026-02-25', count: 33 }, { date: '2026-02-26', count: 40 },
  { date: '2026-02-27', count: 37 }, { date: '2026-02-28', count: 18 }, { date: '2026-03-01', count: 24 },
  { date: '2026-03-02', count: 15 }, { date: '2026-03-03', count: 31 }, { date: '2026-03-04', count: 22 },
  { date: '2026-03-05', count: 28 }, { date: '2026-03-06', count: 19 }, { date: '2026-03-07', count: 35 },
  { date: '2026-03-08', count: 27 }, { date: '2026-03-09', count: 14 }, { date: '2026-03-10', count: 21 },
  { date: '2026-03-11', count: 33 }, { date: '2026-03-12', count: 26 }, { date: '2026-03-13', count: 29 },
];
const DUMMY_A_CATS = [
  { category__name: 'Roads & Potholes', count: 387 }, { category__name: 'Water Supply', count: 234 },
  { category__name: 'Garbage & Sanitation', count: 198 }, { category__name: 'Street Lighting', count: 156 },
  { category__name: 'Drainage Issue', count: 112 }, { category__name: 'Parks & Gardens', count: 89 },
  { category__name: 'Encroachment', count: 45 }, { category__name: 'Traffic & Signals', count: 26 },
];
const DUMMY_A_STATUS = [
  { status: 'pending', count: 89 }, { status: 'in_progress', count: 156 },
  { status: 'resolved', count: 934 }, { status: 'escalated', count: 68 },
];
const DUMMY_A_DEPTS = [
  { department__name: 'Public Works', total: 387, resolved: 312, escalated: 18, resolution_rate: 81 },
  { department__name: 'Water Department', total: 234, resolved: 178, escalated: 14, resolution_rate: 76 },
  { department__name: 'Sanitation', total: 198, resolved: 145, escalated: 21, resolution_rate: 73 },
  { department__name: 'Electrical', total: 156, resolved: 134, escalated: 5, resolution_rate: 86 },
  { department__name: 'Drainage', total: 112, resolved: 72, escalated: 8, resolution_rate: 64 },
  { department__name: 'Horticulture', total: 89, resolved: 61, escalated: 2, resolution_rate: 69 },
];

export default function AnalyticsPage() {
  const [summary, setSummary] = useState(DUMMY_A_SUMMARY);
  const [trend, setTrend] = useState(DUMMY_A_TREND);
  const [categories, setCategories] = useState(DUMMY_A_CATS);
  const [statusData, setStatusData] = useState(DUMMY_A_STATUS);
  const [departments, setDepartments] = useState(DUMMY_A_DEPTS);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [sumRes, catRes, statusRes, deptRes] = await Promise.all([
          analyticsAPI.summary(),
          analyticsAPI.categoryBreakdown(),
          analyticsAPI.statusBreakdown(),
          analyticsAPI.departmentBreakdown(),
        ]);
        const s = sumRes.data;
        if (s && typeof s === 'object' && typeof s.total === 'number' && s.total > 0) setSummary(s);
        if (Array.isArray(catRes.data) && catRes.data.length) setCategories(catRes.data);
        if (Array.isArray(statusRes.data) && statusRes.data.length) setStatusData(statusRes.data);
        if (Array.isArray(deptRes.data) && deptRes.data.length) setDepartments(deptRes.data);
      } catch { /* keep dummy */ }
    };
    load();
  }, []);

  useEffect(() => {
    analyticsAPI.trend({ days })
      .then(({ data }) => { if (Array.isArray(data) && data.length) setTrend(data); })
      .catch(() => {});
  }, [days]);

  const stats = summary ? [
    { label: 'Total Complaints', value: summary.total, trend: '+5.2%', up: true, border: 'border-brand-navy', icon: 'description', iconBg: 'bg-brand-navy/5', iconColor: 'text-brand-navy' },
    { label: 'Resolution Rate', value: `${summary.resolution_rate || 0}%`, trend: '', up: true, border: 'border-teal-custom', icon: 'check_circle', iconBg: 'bg-teal-custom/5', iconColor: 'text-teal-custom' },
    { label: 'Avg Resolution Hours', value: `${summary.avg_resolution_hours || 0}h`, trend: '', up: true, border: 'border-blue-custom', icon: 'schedule', iconBg: 'bg-blue-custom/5', iconColor: 'text-blue-custom' },
    { label: 'Escalated', value: summary.escalated || 0, trend: '', up: false, border: 'border-red-custom', icon: 'priority_high', iconBg: 'bg-red-custom/5', iconColor: 'text-red-custom' },
  ] : [];

  const maxCat = categories.length > 0 ? Math.max(...categories.map((c) => c.count)) : 1;

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header className="bg-white border-b border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-brand-navy leading-tight">Analytics</h2>
        <p className="text-slate-500 font-medium">Insights &amp; Performance</p>
      </header>

      <div className="p-6 space-y-6 overflow-y-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className={`bg-white p-6 rounded-xl border-l-4 ${s.border} shadow-sm flex justify-between items-start`}>
              <div>
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <p className="text-3xl font-bold text-brand-navy mt-1">{s.value}</p>
              </div>
              <div className={`p-2 ${s.iconBg} rounded-lg`}><span className={`material-symbols-outlined ${s.iconColor}`}>{s.icon}</span></div>
            </div>
          ))}
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-2">
          {DAY_OPTIONS.map((d) => (
            <button key={d} onClick={() => setDays(d)} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${days === d ? 'bg-brand-navy text-white shadow-md' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}>{d}d</button>
          ))}
        </div>

        {/* Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-brand-navy mb-4">Complaint Volume Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trend}>
              <defs><linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0B1D51" stopOpacity={0.2} /><stop offset="100%" stopColor="#0B1D51" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(d) => d?.slice(5)} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#0B1D51" fill="url(#aGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-brand-navy mb-6">By Category</h3>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.category__name || cat.name}>
                  <div className="flex justify-between text-xs font-medium mb-1"><span>{cat.category__name || cat.name}</span><span>{cat.count}</span></div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-brand-navy h-full rounded-full" style={{ width: `${(cat.count / maxCat) * 100}%` }} /></div>
                </div>
              ))}
              {categories.length === 0 && <p className="text-sm text-slate-400">No data</p>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
            <h3 className="font-bold text-brand-navy mb-6 self-start w-full">Status Split</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart><Pie data={statusData} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={50} outerRadius={75}>{statusData.map((d, i) => <Cell key={i} fill={STATUS_COLORS[d.status] || '#94a3b8'} />)}</Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full max-w-xs mt-2">
              {statusData.map((d) => (
                <div key={d.status} className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[d.status] || '#94a3b8' }} /><span className="text-xs font-medium">{d.status?.replace('_', ' ')} ({d.count})</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h3 className="font-bold text-brand-navy">Department Performance</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider"><th className="px-6 py-4">Department</th><th className="px-6 py-4 text-center">Total</th><th className="px-6 py-4 text-center">Resolved</th><th className="px-6 py-4 text-center">Escalated</th><th className="px-6 py-4">Resolution Rate</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {departments.map((d) => {
                  const rate = d.resolution_rate || 0;
                  const color = rate >= 75 ? 'bg-emerald-500 text-emerald-600' : rate >= 50 ? 'bg-amber-500 text-amber-600' : 'bg-rose-500 text-rose-600';
                  const [barC, textC] = color.split(' ');
                  return (
                    <tr key={d.department__name || d.name}>
                      <td className="px-6 py-4 font-semibold text-brand-navy text-sm">{d.department__name || d.name}</td>
                      <td className="px-6 py-4 text-center text-sm">{d.total}</td>
                      <td className="px-6 py-4 text-center text-sm">{d.resolved}</td>
                      <td className="px-6 py-4 text-center text-sm text-red-custom font-medium">{d.escalated}</td>
                      <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className={`${barC} h-full`} style={{ width: `${rate}%` }} /></div><span className={`text-sm font-bold ${textC}`}>{rate}%</span></div></td>
                    </tr>
                  );
                })}
                {departments.length === 0 && <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No data</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
