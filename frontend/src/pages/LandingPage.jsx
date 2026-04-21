import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  'All Categories', 'Roads & Potholes', 'Water Supply', 'Garbage & Sanitation',
  'Street Lighting', 'Parks & Gardens', 'Drainage Issue',
];

const STATS = [
  { value: '12,000+', label: 'Complaints Resolved' },
  { value: '94%', label: 'SLA Compliance' },
  { value: '48', label: 'Wards Covered' },
  { value: '4.8★', label: 'Citizen Satisfaction' },
];

const STEPS = [
  { icon: 'location_on', title: '1. Report', desc: 'Submit your complaint with location, photo, and details in 60 seconds.', bg: 'bg-primary', shadow: 'shadow-primary/20' },
  { icon: 'bar_chart', title: '2. Track', desc: 'Watch the progress in real-time as officials are assigned and dispatched.', bg: 'bg-navy', shadow: 'shadow-navy/20' },
  { icon: 'check_circle', title: '3. Resolved', desc: 'Get notified once fixed. Provide your feedback to close the ticket.', bg: 'bg-teal-accent', shadow: 'shadow-teal-accent/20' },
];

const FEATURES = [
  { icon: 'map', title: 'Live Complaint Map', desc: 'View all reported issues across the city in a real-time heatmap.', iconBg: 'bg-orange-100', iconColor: 'text-primary' },
  { icon: 'trending_up', title: 'Auto Escalation', desc: 'Tickets automatically move to higher authorities if not resolved in time.', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { icon: 'add_a_photo', title: 'Photo Evidence', desc: 'Geotagged photos ensure accuracy and provide visual proof of resolution.', iconBg: 'bg-teal-100', iconColor: 'text-teal-accent' },
  { icon: 'notifications_active', title: 'Real-time Alerts', desc: 'Stay updated via WhatsApp and SMS at every stage of your complaint.', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { icon: 'dashboard', title: 'Analytics Dashboard', desc: 'Publicly available data on ward-wise performance and resolution speed.', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  { icon: 'thumb_up', title: 'Community Upvoting', desc: 'Upvote local issues to help authorities prioritize critical neighborhood fixes.', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
];

const TESTIMONIALS = [
  { quote: '"I reported a non-working street light and it was fixed within 12 hours. The speed of response is unmatched!"', name: 'Animesh Kapoor', loc: 'Vijay Nagar, Indore', initials: 'AK', color: 'bg-primary/20 text-primary' },
  { quote: '"The real-time tracking is a game-changer. You can actually see who is working on your problem and when it\'s done."', name: 'Priya Sharma', loc: 'Sapna Sangeeta, Indore', initials: 'PS', color: 'bg-teal-accent/20 text-teal-accent' },
  { quote: '"CivicFix brings transparency to city management. Now we know exactly where our ward budgets are being used."', name: 'Rajesh Varma', loc: 'Palasia, Indore', initials: 'RV', color: 'bg-orange-100/20 text-orange-200' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background-light text-slate-900 font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-xl">CF</div>
              <span className="text-navy text-xl font-extrabold tracking-tight">CivicFix <span className="text-primary">311</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <button onClick={() => scrollTo('features')} className="hover:text-primary transition-colors">Features</button>
              <button onClick={() => scrollTo('how-it-works')} className="hover:text-primary transition-colors">How It Works</button>
              <button onClick={() => scrollTo('stats')} className="hover:text-primary transition-colors">Stats</button>
              <button onClick={() => scrollTo('cities')} className="hover:text-primary transition-colors">Cities</button>
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <button onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">dashboard</span> Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="hidden sm:block text-sm font-bold text-navy px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">Login</button>
                  <button onClick={() => navigate('/register')} className="bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all">Register Now</button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy">
        <div className="absolute top-0 right-0 w-1/2 h-full hero-pattern opacity-20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-teal-accent/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                <span className="text-lg">🏙️</span>
                <span className="text-white text-sm font-bold tracking-wide">Smart City Initiative — Indore</span>
              </div>
              <h1 className="text-white text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                Your City. <br />Your Voice. <br />Your <span className="text-primary underline decoration-teal-accent/30 underline-offset-8">Fix.</span>
              </h1>
              <p className="text-slate-300 text-lg lg:text-xl max-w-xl leading-relaxed">
                Report civic issues, track resolutions in real-time, and hold authorities accountable — all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button onClick={() => navigate(user ? '/complaints/new' : '/register')} className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-2xl shadow-primary/30 transition-all group">
                  Report an Issue <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button onClick={() => scrollTo('how-it-works')} className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 backdrop-blur-sm transition-all">
                  See How It Works
                </button>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8 text-white/70 text-sm font-medium">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-teal-accent text-sm">check_circle</span> Free for citizens</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-teal-accent text-sm">check_circle</span> Real-time tracking</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-teal-accent text-sm">check_circle</span> 24h SLA guarantee</span>
              </div>
            </div>

            {/* Mockup Card */}
            <div className="hidden lg:block relative">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-navy font-bold text-xl">Issue Tracking</h3>
                  <span className="bg-teal-accent/10 text-teal-accent text-xs font-black uppercase px-3 py-1 rounded-full">In Progress</span>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">road</span>
                    </div>
                    <div>
                      <p className="text-navy font-bold">Severe Pothole</p>
                      <p className="text-slate-500 text-sm">MG Road, Near High Court</p>
                    </div>
                  </div>
                  <div className="h-48 w-full bg-slate-100 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-slate-200" />
                    <div className="absolute inset-0 bg-navy/10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-primary p-2 rounded-full animate-bounce shadow-xl">
                        <span className="material-symbols-outlined text-white">location_on</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                      <span>Resolution Progress</span><span>75%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[75%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-12 bg-teal-accent text-white p-6 rounded-3xl shadow-2xl max-w-[200px]">
                <p className="text-xs font-bold opacity-80 mb-1">Assigned to</p>
                <p className="font-bold">Zonal Officer 04</p>
                <div className="flex -space-x-2 mt-3">
                  <div className="w-8 h-8 rounded-full border-2 border-teal-accent bg-slate-200" />
                  <div className="w-8 h-8 rounded-full border-2 border-teal-accent bg-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-navy py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-white text-3xl font-black mb-1">{s.value}</p>
                <p className="text-slate-400 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar pb-2">
            {CATEGORIES.map((cat, i) => (
              <button key={cat} className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">Three steps to get it fixed</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((step) => (
              <div key={step.title} className="flex flex-col items-center text-center group">
                <div className={`w-24 h-24 rounded-full ${step.bg} flex items-center justify-center mb-6 shadow-xl ${step.shadow} transition-transform group-hover:scale-110`}>
                  <span className="material-symbols-outlined text-white text-4xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Features</p>
            <h2 className="text-3xl md:text-4xl font-black text-navy">Everything a smart city needs</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-8 rounded-3xl bg-background-light border border-slate-100 hover:shadow-xl transition-all">
                <div className={`w-14 h-14 ${f.iconBg} ${f.iconColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-10 -left-10 text-white/5 font-black text-[12rem] select-none">"</div>
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white">Citizens love CivicFix</h2>
            <div className="flex justify-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((s) => <span key={s} className="material-symbols-outlined text-primary fill-current">star</span>)}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm">
                <p className="text-white text-lg italic mb-8">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${t.color} rounded-full flex items-center justify-center font-bold`}>{t.initials}</div>
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-slate-400 text-sm">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-r from-navy to-background-dark p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to fix your city?</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">Join over 50,000+ citizens of Indore in making our city cleaner, safer, and smarter.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <button onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-2">
                  Go to Dashboard <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/register')} className="bg-primary hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl transition-all">Register as Citizen →</button>
                  <button onClick={() => navigate('/login')} className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl border border-white/10 backdrop-blur-sm transition-all">Official Login</button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="cities" className="bg-background-dark py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg">CF</div>
                <span className="text-white text-xl font-extrabold tracking-tight">CivicFix 311</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Empowering citizens to build smarter, better cities through technology and transparency.</p>
              <div className="flex gap-4">
                {['public', 'alternate_email', 'call'].map((icon) => (
                  <span key={icon} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-sm">{icon}</span>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                {['About Portal', 'Track Complaint', 'Resolution Stats', 'Citizen Charter', 'Privacy Policy'].map((l) => (
                  <li key={l}><span className="hover:text-primary transition-colors cursor-pointer">{l}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Active Cities</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                {['Indore', 'Surat', 'Bhopal', 'Pune', 'Ujjain'].map((c) => (
                  <li key={c}><span className="hover:text-primary transition-colors cursor-pointer">{c}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li className="flex gap-3"><span className="material-symbols-outlined text-primary">location_on</span> Indore Municipal Corp, Indore, MP</li>
                <li className="flex gap-3"><span className="material-symbols-outlined text-primary">mail</span> support@civicfix.in</li>
                <li className="flex gap-3"><span className="material-symbols-outlined text-primary">call</span> Toll Free: 1800-311-2024</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-xs">© 2024 CivicFix 311. All rights reserved. A Smart City Initiative.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
