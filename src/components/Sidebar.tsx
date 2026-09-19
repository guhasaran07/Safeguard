import { ShieldCheck, LayoutDashboard, Timer, BarChart3, Ban, Bot, History, Settings, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Page } from '@/types';

const items: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'timer', label: 'Focus Timer', icon: Timer },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'blocking', label: 'Smart Blocking', icon: Ban },
  { id: 'assistant', label: 'AI Assistant', icon: Bot },
  { id: 'history', label: 'Focus History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { page, setPage, profile } = useApp();

  const go = (p: Page) => {
    setPage(p);
    onClose();
  };

  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 shrink-0 surface border-r flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ backgroundColor: 'rgb(var(--surface))' }}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b">
          <button onClick={() => go('dashboard')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">FocusGuard</span>
          </button>
          <button onClick={onClose} className="lg:hidden text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-[rgb(var(--text))]'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t">
          <button
            onClick={() => go('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              page === 'settings'
                ? 'bg-primary text-white'
                : 'text-muted hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${profile.avatarColor} flex items-center justify-center text-white`}>
              {initials}
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">{profile.name}</div>
              <div className="text-xs text-muted">{profile.role}</div>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
