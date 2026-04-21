import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const STATUS_BADGE = {
  pending: 'bg-amber-100 text-amber-700', in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700', escalated: 'bg-red-100 text-red-700', closed: 'bg-slate-100 text-slate-700',
};
const TIMELINE_COLORS = {
  pending: 'bg-slate-400', in_progress: 'bg-blue-500', resolved: 'bg-green-500',
  escalated: 'bg-red-500', closed: 'bg-slate-600', rejected: 'bg-red-800',
};

const DUMMY_COMPLAINT = {
  id: 1, complaint_id: 'CFC-2026-001', title: 'Pothole on MG Road near High Court',
  description: 'There is a severe pothole approximately 3 feet wide and 1 foot deep on MG Road near the High Court junction. Multiple vehicles have been damaged and it poses a serious safety hazard, especially during nighttime. The pothole appeared after the recent heavy rains and has been expanding. Immediate repair is needed before it causes an accident.',
  status: 'in_progress', priority: 'high', is_escalated: false,
  category: { id: 1, name: 'Roads & Potholes' },
  department: { id: 1, name: 'Public Works' },
  citizen: { id: 1, first_name: 'Animesh', last_name: 'Kapoor', username: 'animesh_k' },
  assigned_to: { id: 2, first_name: 'Rajesh', last_name: 'Verma' },
  address: 'MG Road, Near High Court Junction, Indore', ward: '14',
  latitude: '22.7196', longitude: '75.8577',
  upvote_count: 24, has_upvoted: false,
  created_at: '2026-03-10T09:30:00Z', sla_deadline: '2026-03-13T09:30:00Z', is_sla_breached: false,
  before_photo: null, after_photo: null,
  history: [
    { new_status: 'pending', note: 'Complaint submitted by citizen', changed_at: '2026-03-10T09:30:00Z' },
    { new_status: 'in_progress', note: 'Assigned to Zonal Officer — repair crew dispatched', changed_at: '2026-03-11T14:15:00Z' },
  ],
};

export default function ComplaintDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(DUMMY_COMPLAINT);
  const [loading, setLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(DUMMY_COMPLAINT.status);
  const [note, setNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [confirming, setConfirming] = useState(false);

  const load = async () => {
    try {
      const { data } = await complaintsAPI.get(id);
      setComplaint(data);
      setUpdateStatus(data.status);
    } catch { /* keep dummy data */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const handleStatusUpdate = async () => {
    if (!updateStatus) return;
    setUpdating(true);
    try {
      const fd = new FormData();
      fd.append('status', updateStatus);
      if (note) fd.append('note', note);
      await complaintsAPI.updateStatus(id, fd);
      toast.success('Status updated');
      setNote('');
      load();
    } catch (err) { toast.error(err.response?.data?.detail || 'Update failed'); }
    setUpdating(false);
  };

  const handleConfirm = async () => {
    if (!rating) return toast.error('Please select a rating');
    setConfirming(true);
    try {
      await complaintsAPI.confirmResolution(id, { rating, feedback });
      toast.success('Resolution confirmed!');
      load();
    } catch (err) { toast.error(err.response?.data?.detail || 'Confirmation failed'); }
    setConfirming(false);
  };

  const handleUpvote = async () => {
    try {
      const { data } = await complaintsAPI.upvote(id);
      setComplaint((prev) => ({
        ...prev,
        upvote_count: data.upvote_count ?? data.count,
        has_upvoted: data.has_upvoted ?? data.upvoted,
      }));
    } catch { toast.error('Upvote failed'); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><span className="material-symbols-outlined animate-spin text-4xl text-brand-navy">progress_activity</span></div>;
  if (!complaint) return <div className="p-8 text-center text-slate-500">Complaint not found</div>;

  const c = complaint;
  const isOfficer = ['field_officer', 'dept_head', 'admin'].includes(user?.role);
  const isCitizenOwner = user?.id === c.citizen?.id && c.status === 'resolved';

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mb-6">
        <Link to="/complaints" className="flex items-center gap-2 text-brand-navy font-semibold hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span><span>Back to Complaints</span>
        </Link>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-xs font-bold mb-2">{c.complaint_id}</div>
            <h1 className="text-2xl font-bold text-brand-navy">{c.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${STATUS_BADGE[c.status] || 'bg-slate-100 text-slate-700'}`}>
              <span className="material-symbols-outlined text-[14px]">schedule</span> {c.status?.replace('_', ' ')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">warning</span> {c.priority}
            </span>
            {c.is_escalated && <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider"><span className="material-symbols-outlined text-[14px]">priority_high</span> ESCALATED</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-slate-100">
          {[{ l: 'Submitted', v: c.created_at?.slice(0, 10) }, { l: 'Category', v: c.category?.name }, { l: 'Department', v: c.department?.name }, { l: 'Ward', v: c.ward || '—' }].map((item) => (
            <div key={item.l}><p className="text-xs text-slate-500 uppercase font-bold tracking-tight mb-1">{item.l}</p><p className="text-sm font-semibold">{item.v || '—'}</p></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left */}
        <div className="lg:w-[65%] space-y-6">
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-4 text-brand-navy flex items-center gap-2"><span className="material-symbols-outlined text-primary">description</span> Description</h3>
            <p className="text-slate-600 leading-relaxed">{c.description}</p>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-4 text-brand-navy flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> Location</h3>
            <div className="grid grid-cols-2 gap-4">
              {[{ l: 'Address', v: c.address }, { l: 'Ward', v: c.ward }, { l: 'Coordinates', v: c.latitude && c.longitude ? `${c.latitude}, ${c.longitude}` : '—' }].map((item) => (
                <div key={item.l}><p className="text-xs text-slate-500 uppercase font-bold mb-1">{item.l}</p><p className="text-sm font-semibold">{item.v || '—'}</p></div>
              ))}
            </div>
          </section>

          {(c.before_photo || c.after_photo) && (
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-4 text-brand-navy flex items-center gap-2"><span className="material-symbols-outlined text-primary">photo_library</span> Photos</h3>
              <div className="grid grid-cols-2 gap-4">
                {c.before_photo && <div className="space-y-2"><div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200"><img className="w-full h-full object-cover" src={c.before_photo} alt="Before" /></div><p className="text-center text-xs font-bold text-slate-500 uppercase">Before</p></div>}
                {c.after_photo ? <div className="space-y-2"><div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200"><img className="w-full h-full object-cover" src={c.after_photo} alt="After" /></div><p className="text-center text-xs font-bold text-slate-500 uppercase">After</p></div> : <div className="space-y-2"><div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-dashed border-slate-400 flex items-center justify-center"><span className="material-symbols-outlined text-slate-400 text-3xl">add_a_photo</span></div><p className="text-center text-xs font-bold text-slate-500 uppercase">After (Pending)</p></div>}
              </div>
            </section>
          )}

          {c.history?.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6 text-brand-navy flex items-center gap-2"><span className="material-symbols-outlined text-primary">history</span> Status History</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-slate-200">
                {c.history.map((h, i) => (
                  <div key={i} className="relative pl-8">
                    <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-4 border-white ${TIMELINE_COLORS[h.new_status] || 'bg-slate-400'}`} />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                      <div><p className="text-sm font-bold text-brand-navy capitalize">{h.new_status?.replace('_', ' ')}</p>{h.note && <p className="text-sm text-slate-600">{h.note}</p>}</div>
                      <p className="text-xs text-slate-500 shrink-0">{new Date(h.changed_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right */}
        <div className="lg:w-[35%] space-y-6">
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-4 text-brand-navy">Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50"><span className="text-sm text-slate-500">Citizen</span><span className="text-sm font-bold text-brand-navy">{c.citizen?.first_name || c.citizen?.username || '—'}</span></div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50"><span className="text-sm text-slate-500">Officer</span><span className="text-sm font-bold text-brand-navy">{c.assigned_to?.first_name || 'Unassigned'}</span></div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50"><span className="text-sm text-slate-500">Upvotes</span>
                <button onClick={handleUpvote} className={`flex items-center gap-1 text-sm font-bold ${c.has_upvoted ? 'text-primary' : 'text-brand-navy'}`}>
                  <span className="material-symbols-outlined text-sm">thumb_up</span> {c.upvote_count || 0}
                </button>
              </div>
              {c.sla_deadline && <div className="flex justify-between items-center py-2"><span className="text-sm text-slate-500">SLA Deadline</span><span className={`text-sm font-bold ${c.is_sla_breached ? 'text-red-600' : 'text-brand-navy'}`}>{new Date(c.sla_deadline).toLocaleDateString()}</span></div>}
            </div>
          </section>

          {isOfficer && (
            <section className="bg-brand-navy rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">admin_panel_settings</span> Update Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Status</label>
                  <select className="w-full bg-white/10 border-white/20 rounded-lg text-sm focus:ring-primary focus:border-primary" value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}>
                    {['pending', 'in_progress', 'resolved', 'rejected'].map((s) => <option key={s} className="text-slate-900" value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Note</label>
                  <textarea className="w-full bg-white/10 border-white/20 rounded-lg text-sm h-24 p-3 focus:ring-primary focus:border-primary" placeholder="Enter progress notes..." value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <button onClick={handleStatusUpdate} disabled={updating} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-50">
                  {updating ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </section>
          )}

          {isCitizenOwner && (
            <section className="bg-white rounded-xl shadow-sm border-2 border-teal-500/30 p-6">
              <h3 className="text-lg font-bold mb-4 text-brand-navy flex items-center gap-2"><span className="material-symbols-outlined text-teal-600">verified</span> Confirm Resolution</h3>
              <p className="text-xs text-slate-500 mb-4">Rate the resolution quality.</p>
              <div className="space-y-4">
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} onClick={() => setRating(s)} className={`material-symbols-outlined cursor-pointer hover:text-primary ${s <= rating ? 'text-primary fill-1' : 'text-slate-300'}`}>star</span>
                  ))}
                </div>
                <textarea className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm h-24 p-3 focus:ring-teal-500 focus:border-teal-500" placeholder="Your feedback..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                <button onClick={handleConfirm} disabled={confirming} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-teal-600/20 disabled:opacity-50">
                  {confirming ? 'Confirming...' : 'Confirm & Close'}
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
