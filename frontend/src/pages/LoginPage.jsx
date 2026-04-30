import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [approvalError, setApprovalError] = useState(null); // { type: 'pending' | 'rejected', message: string }
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApprovalError(null); // Clear previous errors

    if (!username || !password) return toast.error('Please fill in all fields');
    setLoading(true);
    try {
      await login({ username, password });
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const errorData = err.response?.data;

      // Check for approval-related errors
      if (errorData?.error === 'approval_pending') {
        setApprovalError({
          type: 'pending',
          message: errorData.message || 'Aapka account abhi admin se approve hone ka wait kar raha hai.'
        });
      } else if (errorData?.error === 'approval_rejected') {
        setApprovalError({
          type: 'rejected',
          message: errorData.message || 'Aapka registration reject ho gaya. Admin se contact karo.'
        });
      } else {
        toast.error(errorData?.detail || errorData?.message || 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row overflow-hidden">
      {/* Left Panel */}
      <section className="relative hidden w-full flex-col justify-between overflow-hidden bg-navy-dark p-12 md:flex md:w-3/5">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-blue-400/5 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <span className="text-xl font-extrabold">CF</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CivicFix 311</span>
          </div>
          <div className="mt-24 max-w-lg">
            <h1 className="text-6xl font-extrabold leading-tight text-white">
              Your city.<br />
              <span className="text-primary">Your voice.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Join thousands of citizens in Indore making our urban landscape better.
              Report potholes, street light issues, or waste management concerns directly
              to city officials through our unified civic portal.
            </p>
          </div>
        </div>
        <div className="relative z-10">
          <div className="mb-12 flex flex-wrap gap-8 border-t border-white/10 pt-10">
            <div>
              <p className="text-2xl font-bold text-white">12k+</p>
              <p className="text-sm text-slate-400">Complaints Resolved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">94%</p>
              <p className="text-sm text-slate-400">SLA Met</p>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold text-white">4.8</p>
                <span className="material-symbols-outlined text-sm text-primary">star</span>
              </div>
              <p className="text-sm text-slate-400">Citizen Rating</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Indore Smart City Initiative</p>
          </div>
        </div>
      </section>

      {/* Right Panel */}
      <section className="flex w-full flex-col justify-center bg-[#F1F5F9] px-6 py-12 md:w-2/5 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 md:hidden cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="text-sm font-extrabold">CF</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-navy-dark">CivicFix 311</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-navy-dark">Sign in</h2>
            <p className="mt-2 text-slate-600">Enter your credentials to continue to the portal.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-navy-dark" htmlFor="username">Username or Email</label>
              <div className="mt-2">
                <input className="block w-full rounded-xl border-slate-200 bg-white px-4 py-4 text-slate-900 shadow-sm transition focus:border-primary focus:ring-primary sm:text-sm" id="username" placeholder="e.g. johndoe@indore.gov" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-navy-dark" htmlFor="password">Password</label>
              </div>
              <div className="mt-2 relative">
                <input className="block w-full rounded-xl border-slate-200 bg-white px-4 py-4 pr-12 text-slate-900 shadow-sm transition focus:border-primary focus:ring-primary sm:text-sm" id="password" placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" id="remember-me" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <label className="ml-2 block text-sm text-slate-600" htmlFor="remember-me">Keep me logged in</label>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-dark py-4 text-base font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <span className="material-symbols-outlined text-xl">arrow_right_alt</span>}
            </button>
          </form>

          {/* Approval Error Messages */}
          {approvalError && (
            <div className={`mt-6 rounded-xl border-2 p-4 ${
              approvalError.type === 'pending'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex gap-3">
                <span className={`material-symbols-outlined text-2xl ${
                  approvalError.type === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {approvalError.type === 'pending' ? 'schedule' : 'cancel'}
                </span>
                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${
                    approvalError.type === 'pending' ? 'text-yellow-900' : 'text-red-900'
                  }`}>
                    {approvalError.type === 'pending' ? '⏳ Approval Pending' : '❌ Request Rejected'}
                  </h4>
                  <p className={`mt-1 text-sm ${
                    approvalError.type === 'pending' ? 'text-yellow-700' : 'text-red-700'
                  }`}>
                    {approvalError.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              New citizen?{' '}
              <Link className="font-bold text-primary hover:text-primary-hover" to="/register">Create account</Link>
            </p>
          </div>

          <div className="mt-12 rounded-xl bg-blue-50 border border-blue-100 p-4">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-blue-500">info</span>
              <div>
                <h4 className="text-sm font-bold text-blue-900">Demo Access</h4>
                <p className="mt-1 text-xs leading-relaxed text-blue-700">
                  Use <span className="font-semibold">citizen_test</span> and password <span className="font-semibold">fixmycity123</span> to explore the portal features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
