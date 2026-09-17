import { Ban, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Toggle from '@/components/Toggle';
import * as Icons from 'lucide-react';

export default function SmartBlocking() {
  const { appToggles, toggleApp, focusMode, setFocusMode, pushToast } = useApp();

  const blockedCount = appToggles.filter((a) => a.enabled).length;

  const handleFocusMode = () => {
    const next = !focusMode;
    setFocusMode(next);
    pushToast({
      title: next ? 'Focus Mode Active' : 'Focus Mode Disabled',
      description: next ? `${blockedCount} distracting categories restricted` : 'Restrictions lifted',
      type: next ? 'success' : 'info',
    });
  };

  const categoryColor: Record<string, string> = {
    Social: 'text-pink-500 bg-pink-500/10',
    Entertainment: 'text-red-500 bg-red-500/10',
    Games: 'text-amber-500 bg-amber-500/10',
    Other: 'text-slate-500 bg-slate-500/10',
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Smart App Blocking</h1>
        <p className="text-muted text-sm mt-1">
          Select which apps to restrict. This is a simulated prototype — no native apps are actually blocked.
        </p>
      </div>

      {/* Focus Mode banner */}
      <div className={`card p-6 transition-all ${focusMode ? 'bg-primary/5 border-primary/30 pulse-focus' : ''}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${focusMode ? 'bg-primary text-white' : 'bg-[rgb(var(--bg))] text-muted'}`}>
              {focusMode ? <ShieldCheck className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="font-bold text-lg">{focusMode ? 'Focus Mode Active' : 'Focus Mode'}</h2>
              <p className="text-sm text-muted">
                {focusMode ? `${blockedCount} distracting categories restricted` : 'Enable to restrict selected apps'}
              </p>
            </div>
          </div>
          <button
            onClick={handleFocusMode}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              focusMode ? 'btn-ghost' : 'btn-primary'
            }`}
          >
            {focusMode ? 'Disable Focus Mode' : 'Enable Focus Mode'}
          </button>
        </div>
      </div>

      {focusMode && (
        <div className="card p-4 flex items-center gap-3 border-l-4 border-l-primary">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm">
            <span className="font-semibold">Focus Mode is protecting you.</span>{' '}
            <span className="text-muted">Selected distractions are blocked during your focus sessions.</span>
          </p>
        </div>
      )}

      {/* App list */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Ban className="w-5 h-5 text-muted" />
          <h2 className="font-bold">Distracting Apps & Categories</h2>
        </div>
        <div className="divide-y">
          {appToggles.map((app) => {
            const IconComp = (Icons as unknown as Record<string, Icons.LucideIcon>)[app.icon] || Icons.Smartphone;
            return (
              <div key={app.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${categoryColor[app.category]}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{app.name}</p>
                    <p className="text-xs text-muted">
                      {app.category} · {app.minutesToday}m today
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {app.enabled && focusMode && (
                    <span className="text-xs font-medium text-danger flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Blocked
                    </span>
                  )}
                  <Toggle checked={app.enabled} onChange={() => toggleApp(app.id)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-muted text-center max-w-md mx-auto">
        Note: FocusGuard is a web prototype. Blocking is simulated for demonstration purposes.
        In production, this would integrate with OS-level app restrictions.
      </p>
    </div>
  );
}
