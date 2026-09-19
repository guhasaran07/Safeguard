import { Menu, Sun, Moon, Bell, Home } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ProfileMenu from '@/components/ProfileMenu';

export default function TopBar({ onMenu }: { onMenu: () => void }) {
  const { theme, toggleTheme, setPage, pushToast } = useApp();

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-6 border-b backdrop-blur-md"
      style={{ backgroundColor: 'rgb(var(--bg) / 0.8)' }}>
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="lg:hidden text-muted hover:text-[rgb(var(--text))]">
          <Menu className="w-6 h-6" />
        </button>
        <button
          onClick={() => setPage('landing')}
          className="flex items-center gap-2 text-sm font-medium text-muted hover:text-[rgb(var(--text))] transition"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => pushToast({ title: 'No new notifications', type: 'info' })}
          className="relative p-2 rounded-lg text-muted hover:text-[rgb(var(--text))] hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted hover:text-[rgb(var(--text))] hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}
