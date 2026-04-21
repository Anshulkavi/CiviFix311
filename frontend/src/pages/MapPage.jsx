import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { complaintsAPI } from '../services/api';
import 'leaflet/dist/leaflet.css';

const STATUS_COLORS = { pending: '#facc15', in_progress: '#3b82f6', resolved: '#22c55e', escalated: '#ef4444' };
const CENTER = [22.7196, 75.8577];

const DUMMY_MAP = [
  { id: 'demo-1', complaint_id: 'CFC-2026-001', title: 'Pothole on MG Road', status: 'in_progress', priority: 'high', latitude: '22.7196', longitude: '75.8577', upvote_count: 24, _demo: true },
  { id: 'demo-2', complaint_id: 'CFC-2026-002', title: 'Street light not working', status: 'pending', priority: 'medium', latitude: '22.7253', longitude: '75.8655', upvote_count: 8, _demo: true },
  { id: 'demo-3', complaint_id: 'CFC-2026-003', title: 'Garbage overflow', status: 'resolved', priority: 'urgent', latitude: '22.7178', longitude: '75.8562', upvote_count: 67, _demo: true },
  { id: 'demo-4', complaint_id: 'CFC-2026-004', title: 'Broken water pipeline', status: 'escalated', priority: 'high', latitude: '22.7310', longitude: '75.8830', upvote_count: 112, _demo: true },
  { id: 'demo-5', complaint_id: 'CFC-2026-005', title: 'Open drainage on AB Road', status: 'in_progress', priority: 'medium', latitude: '22.7140', longitude: '75.8640', upvote_count: 15, _demo: true },
  { id: 'demo-6', complaint_id: 'CFC-2026-006', title: 'Damaged park bench', status: 'pending', priority: 'low', latitude: '22.7225', longitude: '75.8530', upvote_count: 3, _demo: true },
  { id: 'demo-7', complaint_id: 'CFC-2026-007', title: 'Traffic signal malfunction', status: 'in_progress', priority: 'urgent', latitude: '22.7105', longitude: '75.8725', upvote_count: 45, _demo: true },
  { id: 'demo-8', complaint_id: 'CFC-2026-008', title: 'Encroachment blocking footpath', status: 'pending', priority: 'medium', latitude: '22.7188', longitude: '75.8480', upvote_count: 19, _demo: true },
  { id: 'demo-9', complaint_id: 'CFC-2026-009', title: 'Waterlogging at Palasia', status: 'in_progress', priority: 'high', latitude: '22.7240', longitude: '75.8750', upvote_count: 31, _demo: true },
  { id: 'demo-10', complaint_id: 'CFC-2026-010', title: 'Broken road divider', status: 'resolved', priority: 'medium', latitude: '22.7160', longitude: '75.8700', upvote_count: 12, _demo: true },
];

export default function MapPage() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(DUMMY_MAP);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    complaintsAPI.getMapComplaints()
      .then(({ data }) => {
        const list = data.results || data;
        if (Array.isArray(list)) setComplaints([...list, ...DUMMY_MAP]);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(
    () => filter === 'all' ? complaints : complaints.filter((c) => c.status === filter),
    [filter, complaints]
  );

  const markerRadius = (upvotes) => {
    if (upvotes >= 100) return 14;
    if (upvotes >= 50) return 10;
    return 7;
  };

  return (
    <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Live Map</h2>
          <p className="text-sm text-slate-500">{filtered.length} complaint{filtered.length !== 1 ? 's' : ''} shown</p>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'in_progress', 'resolved', 'escalated'].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${filter === s ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 relative" style={{ minHeight: '500px' }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100"><span className="material-symbols-outlined animate-spin text-4xl text-brand-navy">progress_activity</span></div>
        ) : (
          <MapContainer center={CENTER} zoom={13} scrollWheelZoom={true} className="absolute inset-0" style={{ height: '100%', width: '100%' }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filtered.map((c) => (
              c.latitude && c.longitude && (
                <CircleMarker key={c.id} center={[parseFloat(c.latitude), parseFloat(c.longitude)]} radius={markerRadius(c.upvote_count || 0)} pathOptions={{ color: STATUS_COLORS[c.status] || '#94a3b8', fillColor: STATUS_COLORS[c.status] || '#94a3b8', fillOpacity: 0.7, weight: 2 }}>
                  <Popup>
                    <div>
                      <p style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: '#2563eb', background: '#eff6ff', display: 'inline-block', padding: '2px 6px', borderRadius: 9999, marginBottom: 4 }}>{c.complaint_id}</p>
                      <p style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{c.title}</p>
                      <p style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{c.status?.replace('_', ' ')} · ▲ {c.upvote_count || 0}</p>
                      <button onClick={() => navigate(`/complaints/${c.id}`)} style={{ marginTop: 6, fontSize: 11, color: '#ec5b13', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>View Details →</button>
                    </div>
                  </Popup>
                </CircleMarker>
              )
            ))}
          </MapContainer>
        )}

        <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg border border-slate-200 p-4" style={{ zIndex: 1000 }}>
          <h4 className="text-xs font-bold uppercase text-slate-500 mb-3">Legend</h4>
          <div className="space-y-2">
            {Object.entries(STATUS_COLORS).map(([s, color]) => (
              <div key={s} className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />{s.replace('_', ' ')}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
