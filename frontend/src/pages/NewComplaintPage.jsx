import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { INDORE_WARDS } from '../constants/wards';
import { validateRequired, validateMinLength, validateLatitude, validateLongitude, validateFile } from '../utils/validators';

const PRIORITIES = ['low', 'medium', 'high', 'urgent'];

const DUMMY_CATEGORIES = [
  { id: 1, name: 'Roads & Potholes', department_name: 'Public Works' },
  { id: 2, name: 'Water Supply', department_name: 'Water Department' },
  { id: 3, name: 'Garbage & Sanitation', department_name: 'Sanitation' },
  { id: 4, name: 'Street Lighting', department_name: 'Electrical' },
  { id: 5, name: 'Drainage Issue', department_name: 'Drainage' },
  { id: 6, name: 'Parks & Gardens', department_name: 'Horticulture' },
  { id: 7, name: 'Encroachment', department_name: 'Anti-Encroachment' },
  { id: 8, name: 'Traffic & Signals', department_name: 'Traffic' },
];

export default function NewComplaintPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(DUMMY_CATEGORIES);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [ward, setWard] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    complaintsAPI.getCategories()
      .then(({ data }) => {
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (data && Array.isArray(data.results)) list = data.results;
        if (list.length > 0) setCategories(list);
      })
      .catch(() => {});
  }, []);

  const fillDemo = () => {
    setTitle('Severe pothole on MG Road near High Court');
    setCategory(categories[0]?.id || 1);
    setPriority('high');
    setDescription('There is a large pothole approximately 3 feet wide and 1 foot deep on MG Road near the High Court junction. Multiple vehicles have been damaged. The pothole appeared after recent heavy rains and poses a serious safety hazard especially at night. Immediate repair is urgently needed.');
    setAddress('MG Road, Near High Court Junction, Indore, MP');
    setWard('14');
    setLatitude('22.7196');
    setLongitude('75.8577');
    toast.success('Demo data filled!');
  };

  const autoDetect = () => {
    if (!navigator.geolocation) return toast.error('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLatitude(pos.coords.latitude.toFixed(6)); setLongitude(pos.coords.longitude.toFixed(6)); toast.success('Location detected'); },
      () => toast.error('Location access denied')
    );
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error('Max file size is 5MB');
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errors = [];

    const titleError = validateRequired(title, 'Title') || validateMinLength(title, 10, 'Title');
    if (titleError) errors.push(titleError);

    const categoryError = validateRequired(category, 'Category');
    if (categoryError) errors.push(categoryError);

    const descError = validateRequired(description, 'Description') || validateMinLength(description, 20, 'Description');
    if (descError) errors.push(descError);

    const latError = validateLatitude(latitude);
    if (latError) errors.push(latError);

    const lngError = validateLongitude(longitude);
    if (lngError) errors.push(lngError);

    const photoError = validateFile(photo);
    if (photoError) errors.push(photoError);

    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('category_id', category);
      fd.append('priority', priority);
      fd.append('description', description);
      if (address) fd.append('address', address);
      if (ward) fd.append('ward', ward);
      if (latitude) fd.append('latitude', latitude);
      if (longitude) fd.append('longitude', longitude);
      if (photo) fd.append('before_photo', photo);
      const { data } = await complaintsAPI.create(fd);
      toast.success('Complaint submitted!');
      navigate(`/complaints/${data.id}`);
    } catch (err) {
      const d = err.response?.data;
      let msg = 'Submission failed';
      if (d) {
        if (typeof d === 'string') msg = d;
        else if (d.detail) msg = d.detail;
        else msg = Object.entries(d).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ');
      }
      toast.error(msg);
    } finally { setLoading(false); }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[760px] mx-auto py-12 px-6 lg:px-0">
        <header className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-custom mb-2">New Complaint</h1>
            <p className="text-muted-custom text-lg">Report a civic issue — tracked and assigned automatically</p>
          </div>
          <button type="button" onClick={fillDemo} className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-sm font-bold transition-colors">
            <span className="material-symbols-outlined text-lg">science</span> Fill Demo
          </button>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Section 1 */}
          <section className="bg-white rounded-xl border border-border-custom shadow-sm p-6">
            <header className="mb-6"><span className="text-xs font-bold uppercase tracking-widest text-muted-custom">01 — Basic Information</span></header>
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-custom">Complaint Title *</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="e.g. Broken streetlight near MG Road" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-custom">Category *</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {(Array.isArray(categories) ? categories : []).map((cat) => <option key={cat.id} value={cat.id}>{cat.name}{cat.department_name ? ` (${cat.department_name})` : ''}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-custom">Priority</label>
                  <div className="flex items-center border border-border-custom rounded-lg overflow-hidden h-[45px]">
                    {PRIORITIES.map((p) => (
                      <button key={p} type="button" onClick={() => setPriority(p)} className={`flex-1 h-full text-xs font-bold border-r border-border-custom last:border-r-0 transition-colors uppercase ${priority === p ? (p === 'urgent' ? 'text-red-600 ring-2 ring-red-500 ring-inset bg-red-50' : 'bg-primary/10 text-primary') : (p === 'urgent' ? 'hover:bg-red-50 text-red-600' : 'hover:bg-slate-50')}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-custom">Detailed Description *</label>
                <textarea className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Provide more context about the issue..." rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-xl border border-border-custom shadow-sm p-6">
            <header className="mb-6"><span className="text-xs font-bold uppercase tracking-widest text-muted-custom">02 — Location</span></header>
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-custom">Full Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-custom text-xl">location_on</span>
                  <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Street name, landmark, area..." value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-custom">Ward</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer" value={ward} onChange={(e) => setWard(e.target.value)}>
                    <option value="">Select ward...</option>
                    {INDORE_WARDS.map((w) => <option key={w.value} value={w.value}>{w.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-custom">Latitude</label>
                  <input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-muted-custom" placeholder="22.7196" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-custom">Longitude</label>
                  <input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-muted-custom" placeholder="75.8577" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                </div>
                <button type="button" onClick={autoDetect} className="w-full flex items-center justify-center gap-2 h-[45px] text-primary font-bold hover:bg-primary/5 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-xl">my_location</span><span>Auto-detect</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-xl border border-border-custom shadow-sm p-6">
            <header className="mb-6"><span className="text-xs font-bold uppercase tracking-widest text-muted-custom">03 — Photo Evidence</span></header>
            <div className="space-y-6">
              <label className="border-2 border-dashed border-border-custom rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handlePhoto} />
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-3xl">photo_camera</span></div>
                <div className="text-center">
                  <p className="text-slate-custom font-bold text-lg mb-1">Choose photo</p>
                  <p className="text-sm text-muted-custom">Max 5MB · JPG or PNG</p>
                </div>
              </label>
              {preview && (
                <div className="flex flex-wrap gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border-custom">
                    <img className="w-full h-full object-cover" src={preview} alt="Preview" />
                    <button type="button" onClick={() => { setPhoto(null); setPreview(null); }} className="absolute top-1 right-1 bg-white/90 text-slate-900 rounded-full p-0.5 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="flex items-center justify-end gap-4 pt-4">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 font-bold text-slate-custom hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="px-8 py-3 bg-primary hover:bg-[#e8590c] text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
