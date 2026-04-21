import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = role selection, 2 = form, 3 = success (for officer/depthead)
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
    role: 'citizen',
    department: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch departments for officer/depthead selection
    authAPI.getDepartments()
      .then(({ data }) => setDepartments(data || []))
      .catch(() => setDepartments([]));
  }, []);

  const roles = [
    {
      value: 'citizen',
      icon: '👤',
      title: 'Citizen',
      desc: ['File complaints', 'Track status', 'Upvote issues'],
      access: 'Instant Access',
      badge: '✅',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      value: 'field_officer',
      icon: '👮',
      title: 'Field Officer',
      desc: ['Resolve issues', 'Update status', 'Upload photos'],
      access: 'Needs Approval',
      badge: '⏳',
      badgeColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      value: 'dept_head',
      icon: '🏢',
      title: 'Dept Head',
      desc: ['Manage dept', 'Assign tasks', 'View analytics'],
      access: 'Needs Approval',
      badge: '⏳',
      badgeColor: 'bg-yellow-100 text-yellow-700'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setForm({ ...form, role });
    setStep(2);
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (form.password !== form.password2) return toast.error('Passwords do not match');

    if ((selectedRole === 'field_officer' || selectedRole === 'dept_head') && !form.department) {
      return toast.error('Please select a department');
    }

    setLoading(true);
    try {
      const payload = { ...form };
      if (payload.department) {
        payload.department = parseInt(payload.department);
      }

      await authAPI.register(payload);

      if (selectedRole === 'citizen') {
        toast.success('Account created! Please sign in.');
        navigate('/login');
      } else {
        // Show approval pending screen
        setStep(3);
      }
    } catch (err) {
      const data = err.response?.data;
      const msg = data ? Object.values(data).flat().join(' ') : 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Success screen for officer/dept head
  if (step === 3) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#F1F5F9] p-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-4xl">
            ⏳
          </div>
          <h1 className="mb-4 text-3xl font-bold text-navy-dark">Request Submitted!</h1>
          <div className="mb-8 rounded-xl bg-white p-8 shadow-sm border border-slate-200">
            <p className="mb-4 text-lg text-slate-700">
              Aapka registration admin ke paas approval ke liye bhej diya gaya hai.
            </p>
            <p className="text-slate-600">
              Approve hone ke baad aapko login karne diya jaega.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 rounded-xl bg-navy-dark px-6 py-3 font-semibold text-white hover:bg-navy-dark/90 transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row overflow-hidden">
      {/* Left Panel - Same as before */}
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
            <h1 className="text-5xl font-extrabold leading-tight text-white">
              Be the change<br />
              <span className="text-primary">you want to see.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {step === 1
                ? 'Choose your role and create your account to start making a difference in your community.'
                : 'Fill in your details to complete registration and join CivicFix 311.'}
            </p>
          </div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Indore Smart City Initiative
            </p>
          </div>
        </div>
      </section>

      {/* Right Panel - Registration Form */}
      <section className="flex w-full flex-col justify-center bg-[#F1F5F9] px-6 py-12 md:w-2/5 lg:px-16 overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 md:hidden cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="text-sm font-extrabold">CF</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-navy-dark">CivicFix 311</span>
          </div>

          {/* STEP 1: Role Selection */}
          {step === 1 && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-navy-dark">Choose Your Role</h2>
                <p className="mt-2 text-slate-600">Select how you want to contribute</p>
              </div>

              <div className="space-y-4">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => handleRoleSelect(role.value)}
                    className="w-full text-left rounded-xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-navy-dark hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{role.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-navy-dark mb-2">{role.title}</h3>
                          <ul className="space-y-1 mb-3">
                            {role.desc.map((item, idx) => (
                              <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                <span className="text-xs">•</span> {item}
                              </li>
                            ))}
                          </ul>
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${role.badgeColor}`}>
                            <span>{role.badge}</span>
                            <span>{role.access}</span>
                          </div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-navy-dark">arrow_forward</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          )}

          {/* STEP 2: Registration Form */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-navy-dark"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Change role
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-3xl font-bold text-navy-dark">Create Account</h2>
                <p className="mt-2 text-slate-600">
                  Registering as <span className="font-semibold text-navy-dark">
                    {roles.find(r => r.value === selectedRole)?.title}
                  </span>
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-dark">First Name *</label>
                    <input
                      required
                      className="mt-1 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="John"
                      value={form.first_name}
                      onChange={set('first_name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-dark">Last Name *</label>
                    <input
                      required
                      className="mt-1 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Doe"
                      value={form.last_name}
                      onChange={set('last_name')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-dark">Username *</label>
                  <input
                    required
                    className="mt-1 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={set('username')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-dark">Email *</label>
                  <input
                    required
                    type="email"
                    className="mt-1 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={set('email')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-dark">Phone</label>
                  <input
                    className="mt-1 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={set('phone')}
                  />
                </div>

                {/* Department dropdown for officer/dept head */}
                {(selectedRole === 'field_officer' || selectedRole === 'dept_head') && (
                  <div>
                    <label className="block text-sm font-semibold text-navy-dark">Department *</label>
                    <select
                      required
                      className="mt-1 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      value={form.department}
                      onChange={set('department')}
                    >
                      <option value="">Select department...</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-navy-dark">Password *</label>
                  <input
                    required
                    type="password"
                    className="mt-1 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={set('password')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-dark">Confirm Password *</label>
                  <input
                    required
                    type="password"
                    className="mt-1 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="••••••••"
                    value={form.password2}
                    onChange={set('password2')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-navy-dark px-5 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-navy-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                >
                  {loading ? 'Creating...' : (
                    selectedRole === 'citizen' ? 'Create Account' : 'Submit for Approval'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
