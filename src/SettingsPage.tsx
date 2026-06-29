import React, { useState } from 'react';
import { AppShell } from './components/AppShell.tsx';
import { User, Sliders, Save, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || 'Anish M.');
  const [profileEmail, setProfileEmail] = useState(() => localStorage.getItem('profileEmail') || 'anish@exploremedia.com');
  const [profileRole, setProfileRole] = useState(() => localStorage.getItem('profileRole') || 'Super Admin');
  const [profileDept, setProfileDept] = useState(() => localStorage.getItem('profileDept') || 'Explore Media Operations');
  const [refreshInterval, setRefreshInterval] = useState(() => localStorage.getItem('refreshInterval') || '5');
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('profileName', profileName);
    localStorage.setItem('profileEmail', profileEmail);
    localStorage.setItem('profileRole', profileRole);
    localStorage.setItem('profileDept', profileDept);
    localStorage.setItem('refreshInterval', refreshInterval);
    
    // Show premium save success toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Refresh headers by triggering storage event manually
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AppShell activeNav="settings" title="Settings" titleIcon={<Sliders size={20} className="text-[#607484]" />}>
      <div className="relative z-10 px-6 lg:px-8 py-8 max-w-4xl mx-auto space-y-6 w-full">
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-28 right-8 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 border border-emerald-500/30 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle size={20} className="text-white shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Settings Saved</span>
              <span className="text-xs text-emerald-100">Preferences updated successfully.</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#e6dec9] shadow-sm overflow-hidden flex flex-col md:flex-row h-auto min-h-[500px]">
          {/* Tabs Sidebar */}
          <div className="w-full md:w-64 bg-slate-50/50 border-r border-[#e6dec9] p-4 flex flex-col gap-1 shrink-0">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-left transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#142f45] text-white shadow-sm'
                  : 'text-[#0c304f] hover:bg-slate-100/60 bg-transparent'
              }`}
            >
              <User size={18} />
              Account Profile
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-left transition-all ${
                activeTab === 'preferences'
                  ? 'bg-[#142f45] text-white shadow-sm'
                  : 'text-[#0c304f] hover:bg-slate-100/60 bg-transparent'
              }`}
            >
              <Sliders size={18} />
              System Preferences
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSave} className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#142f45] m-0">Account Profile</h2>
                    <p className="text-xs text-[#607484] m-0 mt-1">Configure your personal information and contact details.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 items-center border-b border-slate-100 pb-6">
                    <div className="w-20 h-20 rounded-full border-2 border-white ring-2 ring-slate-200 overflow-hidden shadow-sm relative group shrink-0">
                      <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-sm font-bold text-slate-800 m-0">Profile Photo</h3>
                      <p className="text-xs text-[#607484] mt-1 m-0">Professional headshot asset currently enabled.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#0c304f]">Display Name</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        required
                        className="px-3.5 py-2 rounded-lg border border-[#e6dec9] text-sm text-[#0c304f] focus:outline-none focus:ring-2 focus:ring-[#142f45]/20 focus:border-[#142f45] transition-all bg-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#0c304f]">Email Address</label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        required
                        className="px-3.5 py-2 rounded-lg border border-[#e6dec9] text-sm text-[#0c304f] focus:outline-none focus:ring-2 focus:ring-[#142f45]/20 focus:border-[#142f45] transition-all bg-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#0c304f]">Role Title</label>
                      <input
                        type="text"
                        value={profileRole}
                        onChange={(e) => setProfileRole(e.target.value)}
                        required
                        className="px-3.5 py-2 rounded-lg border border-[#e6dec9] text-sm text-[#0c304f] focus:outline-none focus:ring-2 focus:ring-[#142f45]/20 focus:border-[#142f45] transition-all bg-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#0c304f]">Department</label>
                      <input
                        type="text"
                        value={profileDept}
                        onChange={(e) => setProfileDept(e.target.value)}
                        required
                        className="px-3.5 py-2 rounded-lg border border-[#e6dec9] text-sm text-[#0c304f] focus:outline-none focus:ring-2 focus:ring-[#142f45]/20 focus:border-[#142f45] transition-all bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#142f45] m-0">System Preferences</h2>
                    <p className="text-xs text-[#607484] m-0 mt-1">Adjust portal performance and theme preferences.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#0c304f]">Auto-Refresh Data Interval</label>
                      <select
                        value={refreshInterval}
                        onChange={(e) => setRefreshInterval(e.target.value)}
                        className="px-3.5 py-2 rounded-lg border border-[#e6dec9] text-sm text-[#0c304f] focus:outline-none focus:ring-2 focus:ring-[#142f45]/20 focus:border-[#142f45] transition-all bg-white cursor-pointer"
                      >
                        <option value="1">Every 1 Minute</option>
                        <option value="5">Every 5 Minutes</option>
                        <option value="15">Every 15 Minutes</option>
                        <option value="30">Every 30 Minutes</option>
                        <option value="60">Every 1 Hour</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#0c304f]">Portal Mode</label>
                      <div className="grid grid-cols-2 gap-3 mt-1">
                        <div className="p-4 rounded-xl border-2 border-[#142f45] bg-[#faf8f0] flex items-center justify-between cursor-pointer">
                          <span className="text-sm font-semibold text-[#0c304f]">Explore Warm Theme</span>
                          <div className="w-4 h-4 rounded-full bg-[#142f45] flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between opacity-60 cursor-not-allowed">
                          <span className="text-sm font-semibold text-slate-500">Dark Theme (Beta)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-6 mt-8 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#142f45] hover:bg-[#0c304f] active:scale-95 text-white font-semibold text-sm rounded-lg border-0 shadow-md cursor-pointer transition-all duration-150"
              >
                <Save size={16} />
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
