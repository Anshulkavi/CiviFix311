import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const DUMMY_USER = { first_name: 'Animesh', last_name: 'Kapoor', email: 'animesh@civicfix.in', phone: '+91 98765 43210', ward: '14', role: 'citizen', username: 'animesh_k', date_joined: '2025-06-05' };

export default function ProfilePage() {
  const { user: authUser, updateUser } = useAuth();
  const user = authUser || DUMMY_USER;
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    ward: user?.ward || '',
  });
  const [saving, setSaving] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPw, setChangingPw] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await authAPI.updateProfile(form);
      updateUser(data);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data ? Object.values(err.response.data).flat().join(' ') : 'Update failed');
    }
    setSaving(false);
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    setChangingPw(true);
    try {
      await authAPI.changePassword({ old_password: oldPassword, new_password: newPassword });
      toast.success('Password changed');
      setOldPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.detail || err.response?.data?.old_password?.[0] || 'Password change failed');
    }
    setChangingPw(false);
  };

  const initials = `${(user?.first_name?.[0] || '').toUpperCase()}${(user?.last_name?.[0] || '').toUpperCase()}` || user?.username?.[0]?.toUpperCase() || '?';

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-brand-navy">Profile Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account information</p>
      </header>

      {/* Avatar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-brand-navy flex items-center justify-center text-white text-2xl font-bold">{initials}</div>
        <div>
          <h3 className="text-lg font-bold text-brand-navy">{user?.first_name} {user?.last_name}</h3>
          <p className="text-sm text-slate-500 capitalize">{user?.role?.replace('_', ' ')} · Joined {user?.date_joined?.slice(0, 10)}</p>
        </div>
      </div>

      {/* Personal Info */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-brand-navy mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">person</span> Personal Information</h3>
        <form className="space-y-5" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-slate-custom">First Name</label><input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={form.first_name} onChange={set('first_name')} /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-slate-custom">Last Name</label><input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={form.last_name} onChange={set('last_name')} /></div>
          </div>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-slate-custom">Email</label><input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" type="email" value={form.email} onChange={set('email')} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-slate-custom">Phone</label><input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={form.phone} onChange={set('phone')} /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-slate-custom">Ward</label><input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" value={form.ward} onChange={set('ward')} /></div>
          </div>
          <div className="flex justify-end"><button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md shadow-primary/20 transition-all disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button></div>
        </form>
      </section>

      {/* Change Password */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-brand-navy mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">lock</span> Change Password</h3>
        <form className="space-y-5" onSubmit={handlePassword}>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-slate-custom">Current Password</label><input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" type="password" placeholder="••••••••" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-slate-custom">New Password</label><input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
            <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-slate-custom">Confirm New Password</label><input className="w-full px-4 py-2.5 rounded-lg border border-border-custom bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
          </div>
          <div className="flex justify-end"><button type="submit" disabled={changingPw} className="px-6 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-lg shadow-md transition-all disabled:opacity-50">{changingPw ? 'Changing...' : 'Update Password'}</button></div>
        </form>
      </section>
    </div>
  );
}
