import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import toast from 'react-hot-toast';

const STATUS_BADGE = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
  escalated: 'bg-red-100 text-red-800',
  closed: 'bg-slate-100 text-slate-800',
};
const PRIORITY_DOT = { low: 'bg-green-500', medium: 'bg-orange-500', high: 'bg-red-500', urgent: 'bg-red-700' };

const DUMMY_COMPLAINTS = [
  { id: 'demo-1', complaint_id: 'CFC-2026-001', title: 'Pothole on MG Road near High Court', category_name: 'Roads & Potholes', address: 'MG Road, Near High Court, Indore', status: 'in_progress', priority: 'high', upvote_count: 24, has_upvoted: false, created_at: '2026-03-13', _demo: true },
  { id: 'demo-2', complaint_id: 'CFC-2026-002', title: 'Street light not working — Sapna Sangeeta', category_name: 'Street Lighting', address: 'Sapna Sangeeta Square, Indore', status: 'pending', priority: 'medium', upvote_count: 8, has_upvoted: false, created_at: '2026-03-12', _demo: true },
  { id: 'demo-3', complaint_id: 'CFC-2026-003', title: 'Garbage overflow near Rajwada Square', category_name: 'Garbage & Sanitation', address: 'Rajwada Square, Indore', status: 'resolved', priority: 'urgent', upvote_count: 67, has_upvoted: true, created_at: '2026-03-11', _demo: true },
  { id: 'demo-4', complaint_id: 'CFC-2026-004', title: 'Broken water pipeline — Vijay Nagar', category_name: 'Water Supply', address: 'Scheme No. 54, Vijay Nagar', status: 'escalated', priority: 'high', upvote_count: 112, has_upvoted: false, created_at: '2026-03-10', _demo: true },
  { id: 'demo-5', complaint_id: 'CFC-2026-005', title: 'Open drainage cover on AB Road', category_name: 'Drainage Issue', address: 'AB Road, Near Treasure Island', status: 'in_progress', priority: 'medium', upvote_count: 15, has_upvoted: false, created_at: '2026-03-09', _demo: true },
  { id: 'demo-6', complaint_id: 'CFC-2026-006', title: 'Damaged park bench in Nehru Park', category_name: 'Parks & Gardens', address: 'Nehru Park, Palasia', status: 'pending', priority: 'low', upvote_count: 3, has_upvoted: false, created_at: '2026-03-08', _demo: true },
  { id: 'demo-7', complaint_id: 'CFC-2026-007', title: 'Traffic signal malfunction — Bhawarkuan', category_name: 'Traffic & Signals', address: 'Bhawarkuan Square, Indore', status: 'in_progress', priority: 'urgent', upvote_count: 45, has_upvoted: true, created_at: '2026-03-07', _demo: true },
  { id: 'demo-8', complaint_id: 'CFC-2026-008', title: 'Illegal encroachment blocking footpath', category_name: 'Encroachment', address: 'Chhoti Gwaltoli, Indore', status: 'pending', priority: 'medium', upvote_count: 19, has_upvoted: false, created_at: '2026-03-06', _demo: true },
];

export default function ComplaintsPage() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(DUMMY_COMPLAINTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, ordering: '-created_at' };
      if (search) params.search = search;
      if (status) params.status = status;
      if (priority) params.priority = priority;
      const { data } = await complaintsAPI.list(params);
      const list = data.results || data;
      if (Array.isArray(list)) setComplaints([...list, ...DUMMY_COMPLAINTS]);
      setTotalPages(data.count ? Math.ceil(data.count / 20) : 1);
    } catch { /* keep dummy data */ }
    setLoading(false);
  }, [page, search, status, priority]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleUpvote = async (e, id) => {
    e.stopPropagation();
    try {
      const { data } = await complaintsAPI.upvote(id);
      const cnt = data.upvote_count ?? data.count;
      const voted = data.has_upvoted ?? data.upvoted;
      setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, upvote_count: cnt, has_upvoted: voted } : c));
    } catch { toast.error('Upvote failed'); }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="flex items-center justify-between px-6 py-6 bg-white border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Complaints</h2>
        <button onClick={() => navigate('/complaints/new')} className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-md shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Complaint</span>
        </button>
      </header>

      <section className="p-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg focus:ring-primary focus:border-primary" placeholder="Search complaints..." type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <select className="bg-slate-50 border-slate-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-primary" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              <option value="">Status: All</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
              <option value="closed">Closed</option>
            </select>
            <select className="bg-slate-50 border-slate-200 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-primary" value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }}>
              <option value="">Priority: All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="urgent">Urgent</option>
            </select>
            <button onClick={fetch} className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16"><span className="material-symbols-outlined animate-spin text-3xl text-brand-navy">progress_activity</span></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Complaint</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Priority</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Upvotes</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {complaints.map((c) => (
                    <tr key={c.id} className={`hover:bg-slate-50 transition-colors ${c._demo ? 'opacity-60' : 'cursor-pointer'}`} onClick={() => !c._demo && navigate(`/complaints/${c.id}`)}>
                      <td className="px-6 py-4"><span className="font-mono text-[11px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100">{c.complaint_id}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800">{c.title}</span>
                          <span className="text-xs text-slate-500">{c.category_name || c.category?.name} • {c.address?.slice(0, 30)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[c.status] || ''}`}>{c.status?.replace('_', ' ')}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${PRIORITY_DOT[c.priority] || 'bg-slate-300'}`} />
                          <span className="text-sm capitalize">{c.priority}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={(e) => !c._demo && handleUpvote(e, c.id)} className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold transition-all ${c.has_upvoted ? 'bg-primary/10 text-primary' : 'bg-slate-100 hover:bg-primary/10 hover:text-primary'}`}>
                          <span>▲</span> {c.upvote_count || 0}
                        </button>
                      </td>
                      <td className="px-6 py-4"><span className="font-mono text-xs text-slate-400">{c.created_at?.slice(0, 10)}</span></td>
                    </tr>
                  ))}
                  {complaints.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No complaints found</td></tr>}
                </tbody>
              </table>
            </div>
          )}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span> Prev
              </button>
              <span className="text-sm text-slate-500 font-medium">Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                Next <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
