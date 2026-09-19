import { useState } from 'react';
import { User, Target, Bell, Palette, Timer, Trash2, Moon, Sun, Save } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import EditProfileModal from '@/components/EditProfileModal';

export default function Settings() {
  const {
    theme, toggleTheme, dailyGoalMin, setDailyGoalMin, resetStats, pushToast,
    profile, setProfile,
  } = useApp();

  const [notif, setNotif] = useState({ sessionEnd: true, distractions: true, dailyReport: false, streaks: true });
  const [prefs, setPrefs] = useState({ defaultFocus: 25, defaultBreak: 5, autoStartBreak: false, sound: true });
  const [resetOpen, setResetOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleSave = () => pushToast({ title: 'Settings saved', type: 'success' });

  const handleReset = () => {
    resetStats();
    setResetOpen(false);
    pushToast({ title: 'Statistics reset', description: 'All sessions and app toggles restored to defaults', type: 'warning' });
  };

  const ToggleRow = ({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted text-sm mt-1">Manage your profile, goals, and preferences</p>
      </div>

      {/* Profile */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${profile.avatarColor}`} />
          <h2 className="font-bold">Profile</h2>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${profile.avatarColor} flex items-center justify-center text-white font-bold text-xl`}>
            {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1">
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-muted">{profile.role} · {profile.university}</p>
            <p className="text-xs text-muted mt-1">{profile.bio}</p>
          </div>
          <button
            onClick={() => setEditOpen(true)}
            className="btn-ghost px-4 py-2 text-sm"
          >
            Edit
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted">Name</label>
            <input value={profile.name} readOnly className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm opacity-70" />
          </div>
          <div>
            <label className="text-sm text-muted">Email</label>
            <input value={profile.email} readOnly className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm opacity-70" />
          </div>
        </div>
      </div>

      {/* Focus goals */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-muted" />
          <h2 className="font-bold">Focus Goals</h2>
        </div>
        <div>
          <label className="text-sm text-muted">Daily Focus Target: {Math.floor(dailyGoalMin / 60)}h {dailyGoalMin % 60}m</label>
          <input
            type="range" min={60} max={480} step={15} value={dailyGoalMin}
            onChange={(e) => setDailyGoalMin(Number(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>1h</span><span>4h</span><span>8h</span>
          </div>
        </div>
      </div>

      {/* Session preferences */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Timer className="w-5 h-5 text-muted" />
          <h2 className="font-bold">Focus Session Preferences</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-muted">Default Focus (min)</label>
            <input
              type="number" min={1} max={120} value={prefs.defaultFocus}
              onChange={(e) => setPrefs({ ...prefs, defaultFocus: Number(e.target.value) })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm text-muted">Default Break (min)</label>
            <input
              type="number" min={1} max={60} value={prefs.defaultBreak}
              onChange={(e) => setPrefs({ ...prefs, defaultBreak: Number(e.target.value) })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="divide-y">
          <ToggleRow label="Auto-start break" desc="Automatically start break timer after focus session" checked={prefs.autoStartBreak} onChange={() => setPrefs({ ...prefs, autoStartBreak: !prefs.autoStartBreak })} />
          <ToggleRow label="Sound alerts" desc="Play a sound when sessions end" checked={prefs.sound} onChange={() => setPrefs({ ...prefs, sound: !prefs.sound })} />
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-muted" />
          <h2 className="font-bold">Notification Settings</h2>
        </div>
        <div className="divide-y">
          <ToggleRow label="Session end reminders" desc="Get notified when a focus session completes" checked={notif.sessionEnd} onChange={() => setNotif({ ...notif, sessionEnd: !notif.sessionEnd })} />
          <ToggleRow label="Distraction alerts" desc="Warn when a distracting app is opened during focus" checked={notif.distractions} onChange={() => setNotif({ ...notif, distractions: !notif.distractions })} />
          <ToggleRow label="Daily report" desc="Receive a daily summary of your focus activity" checked={notif.dailyReport} onChange={() => setNotif({ ...notif, dailyReport: !notif.dailyReport })} />
          <ToggleRow label="Streak reminders" desc="Keep your streak alive with daily reminders" checked={notif.streaks} onChange={() => setNotif({ ...notif, streaks: !notif.streaks })} />
        </div>
      </div>

      {/* Theme */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-muted" />
          <h2 className="font-bold">Theme</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => { if (theme !== 'light') toggleTheme(); }}
            className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-[rgb(var(--border))]'}`}
          >
            <Sun className="w-5 h-5 text-amber-500" />
            <span className="font-medium text-sm">Light</span>
          </button>
          <button
            onClick={() => { if (theme !== 'dark') toggleTheme(); }}
            className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-[rgb(var(--border))]'}`}
          >
            <Moon className="w-5 h-5 text-accent" />
            <span className="font-medium text-sm">Dark</span>
          </button>
        </div>
      </div>

      {/* Reset */}
      <div className="card p-6 border-danger/30">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="w-5 h-5 text-danger" />
          <h2 className="font-bold text-danger">Danger Zone</h2>
        </div>
        <p className="text-sm text-muted mb-4">Reset all focus statistics, session history, and app blocking settings to defaults.</p>
        <button onClick={() => setResetOpen(true)} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-danger/30 text-danger hover:bg-danger/10 transition-all">
          Reset Statistics
        </button>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary px-6 py-3 text-sm flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset all statistics?"
        footer={
          <>
            <button onClick={() => setResetOpen(false)} className="btn-ghost px-5 py-2 text-sm">Cancel</button>
            <button onClick={handleReset} className="px-5 py-2 rounded-xl bg-danger text-white text-sm font-semibold hover:bg-danger/90 transition">Reset</button>
          </>
        }
      >
        <p className="text-sm text-muted">
          This will permanently clear all your focus sessions, history, and blocking settings. This cannot be undone.
        </p>
      </Modal>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
