import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Settings, PanelLeftClose, PanelLeftOpen, LogOut } from 'lucide-react';

type NavItem = 'dashboard' | 'clients' | 'settings';

interface AppShellProps {
  activeNav: NavItem;
  title: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ activeNav, title, titleIcon, children }: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || 'Anish M.');
  const [profileEmail, setProfileEmail] = useState(() => localStorage.getItem('profileEmail') || 'anish@exploremedia.com');

  useEffect(() => {
    const handleStorageChange = () => {
      setProfileName(localStorage.getItem('profileName') || 'Anish M.');
      setProfileEmail(localStorage.getItem('profileEmail') || 'anish@exploremedia.com');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(isCollapsed));
  }, [isCollapsed]);

  const handleSignOut = () => {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/';
  };

  return (
    <div className="h-screen font-sans text-slate-900 flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdfaf1 0%, #f7f3e8 100%)' }}>
      <header className="fixed top-0 left-0 right-0 h-24 md:h-28 bg-white/80 backdrop-blur-md border-b border-[#e6dec9] flex items-center z-30 flex-shrink-0">
        <div className={`h-full border-r border-[#e6dec9] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-16 px-2' : 'w-64 px-4'}`}>
          <a href="/main-dashboard.html" title="Go to Dashboard" className="flex items-center justify-center h-full w-full">
            {isCollapsed ? (
              <img src="/logo.svg" alt="Explore Media" className="h-10 w-10 opacity-90 object-contain transition-all duration-300" />
            ) : (
              <img src="/logo.svg" alt="Explore Media" className="h-20 md:h-24 opacity-90 object-contain max-w-full transition-all duration-300" />
            )}
          </a>
        </div>

        <div className="flex-1 flex items-center justify-between pl-2 pr-8 h-full relative">
          <div className="flex items-center gap-4">
            {/* Collapse toggle icon button next to logo */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="p-2 text-slate-500 hover:text-slate-900 transition-colors bg-transparent border-0 cursor-pointer flex items-center justify-center hover:bg-slate-100 rounded-lg"
            >
              {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center justify-center text-center pointer-events-none">
            <h1 
              className="text-[22px] font-extrabold text-[#142f45] m-0 select-none leading-tight"
              style={{ letterSpacing: '-0.015em', fontFamily: 'var(--font-sans, sans-serif)' }}
            >
              Client Health Dashboard
            </h1>
            <span 
              className="text-[11px] font-bold text-[#607484] mt-0.5 uppercase select-none"
              style={{ letterSpacing: '0.08em', fontFamily: 'var(--font-sans, sans-serif)' }}
            >
              Explore Media Hub
            </span>
          </div>

          <div className="flex items-center gap-4 z-10 relative">
            {/* Username text next to avatar */}
            <span className="text-sm font-semibold text-[#0c304f] select-none hidden sm:inline">{profileName}</span>
            
            {/* Avatar Image Button */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden cursor-pointer border-2 border-white shadow-sm ring-1 ring-slate-200 outline-none hover:scale-105 transition-all duration-200"
            >
              <img src="/avatar.png" alt={profileName} className="w-full h-full object-cover" />
            </button>
            
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 m-0 leading-tight">{profileName}</p>
                    <p className="text-xs text-[#607484] m-0 mt-0.5 leading-none">{profileEmail}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      window.location.href = '/settings.html';
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#0c304f] hover:bg-slate-50 transition-colors border-0 bg-transparent text-left cursor-pointer font-medium"
                  >
                    <Settings size={16} /> Profile Settings
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50/50 transition-colors border-0 bg-transparent text-left cursor-pointer font-medium"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-24 md:pt-28 overflow-hidden">
        <aside className={`bg-white border-r border-[#e6dec9] flex flex-col shrink-0 h-full relative z-20 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
          <div className="py-6 flex-1 overflow-y-auto hidden-scrollbar">
            <div className={`text-[11px] uppercase text-[#94a3b8] font-bold tracking-[0.05em] px-4 mb-2 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
              Navigation
            </div>
            <nav className={`flex flex-col gap-1 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
              <NavButton
                href="/main-dashboard.html"
                icon={<LayoutDashboard size={18} />}
                label="Main Dashboard"
                isActive={activeNav === 'dashboard'}
                isCollapsed={isCollapsed}
              />
              <NavButton
                href="/clients.html"
                icon={<Users size={18} />}
                label="Clients"
                isActive={activeNav === 'clients'}
                isCollapsed={isCollapsed}
              />
            </nav>
          </div>

          {/* Sidebar Bottom Section */}
          <div className={`border-t border-[#e6dec9] bg-slate-50/50 transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-4'}`}>
            <a
              href="/settings.html"
              title={isCollapsed ? 'Settings' : undefined}
              className={`w-full flex items-center rounded-lg transition-all duration-200 no-underline group cursor-pointer border-0 ${
                activeNav === 'settings' ? 'bg-[#142f45]/[0.08] text-[#142f45]' : 'hover:bg-[#f8fafc] bg-transparent text-[#0c304f]'
              } ${
                isCollapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-4 py-3 text-left'
              }`}
            >
              <span className={`transition-colors flex items-center justify-center ${
                activeNav === 'settings' ? 'text-[#142f45]' : 'text-[#607484] group-hover:text-[#142f45]'
              }`}>
                <Settings size={18} />
              </span>
              <span className={`text-sm font-medium transition-all duration-300 whitespace-nowrap overflow-hidden ${
                activeNav === 'settings' ? 'text-[#142f45]' : 'text-[#0c304f] group-hover:text-[#142f45]'
              } ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                Settings
              </span>
            </a>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto relative w-full bg-transparent">
          {/* Animated Wave Background */}
          <div className="wave-bg">
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
          </div>
          {children}
        </main>
      </div>

      <style>{`
        .hidden-scrollbar::-webkit-scrollbar { width: 6px; }
        .hidden-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .hidden-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 20px; }

        /* Animated Wave Background */
        .wave-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23142f45" fill-opacity="0.04" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') repeat-x;
          background-size: 50% auto;
          background-position: 0 bottom;
          animation: wave 25s linear infinite;
        }

        .wave:nth-of-type(2) {
          animation: wave 35s linear infinite;
          opacity: 0.8;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23607484" fill-opacity="0.05" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,144C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
        }

        .wave:nth-of-type(3) {
          animation: wave 45s linear infinite;
          opacity: 0.5;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ee683b" fill-opacity="0.06" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,149.3C672,117,768,75,864,80C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
        }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function NavButton({ href, icon, label, isActive, isCollapsed }: { href: string; icon: React.ReactNode; label: string; isActive: boolean; isCollapsed: boolean }) {
  return (
    <a
      href={href}
      title={isCollapsed ? label : undefined}
      className={`w-full flex items-center rounded-lg transition-all duration-200 no-underline ${
        isCollapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-4 py-3 text-left'
      } ${
        isActive ? 'bg-[#142f45]/[0.08] text-[#142f45]' : 'hover:bg-[#f8fafc] text-[#0c304f]'
      }`}
    >
      <span className={`flex items-center justify-center ${isActive ? 'text-[#142f45]' : 'text-[#607484]'}`}>{icon}</span>
      <span className={`text-sm font-medium transition-all duration-300 whitespace-nowrap overflow-hidden ${
        isActive ? 'text-[#142f45]' : 'text-[#0c304f]'
      } ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
        {label}
      </span>
    </a>
  );
}
