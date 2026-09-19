import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import EditProfileModal from '@/components/EditProfileModal';

export default function ProfileMenu() {
  const { profile, setPage, pushToast } = useApp();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  const handleLogout = () => {
    setOpen(false);
    pushToast({ title: 'Logged out', description: 'See you soon, ' + profile.name.split(' ')[0] + '!', type: 'info' });
    setPage('landing');
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 p-1 pr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition"
      >
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${profile.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
          {initials}
        </div>
        <ChevronDown className={`w-4 h-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 card p-2 shadow-xl z-50">
          <div className="px-3 py-3 border-b">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${profile.avatarColor} flex items-center justify-center text-white font-semibold`}>
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{profile.name}</p>
                <p className="text-xs text-muted truncate">{profile.email}</p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => { setEditOpen(true); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <User className="w-4 h-4 text-muted" />
              Edit Profile
            </button>
            <button
              onClick={() => { setPage('settings'); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <SettingsIcon className="w-4 h-4 text-muted" />
              Settings
            </button>
          </div>

          <div className="border-t pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
