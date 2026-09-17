import { useMemo } from 'react';
import { CheckCircle2, XCircle, Clock, TrendingUp, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import StatCard from '@/components/StatCard';

function relativeDay(iso: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (iso === today) return 'Today';
  if (iso === yesterday) return 'Yesterday';
  return new Date(iso + 'T00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
}

export default function FocusHistory() {
  const { history } = useApp();

  const stats = useMemo(() => {
    const completed = history.filter((h) => h.status === 'Completed');
    const interrupted = history.filter((h) => h.status === 'Interrupted');
    const totalMin = completed.reduce((a, s) => a + s.durationMin, 0);
    const avg = completed.length ? Math.round(totalMin / completed.length) : 0;
    return { completed: completed.length, interrupted: interrupted.length, totalMin, avg };
  }, [history]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof history>();
    history.forEach((h) => {
      const arr = map.get(h.date) || [];
      arr.push(h);
      map.set(h.date, arr);
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [history]);

  const fmt = (min: number) => `${Math.floor(min / 60)}h ${min % 60}m`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Focus History</h1>
        <p className="text-muted text-sm mt-1">Track your completed and interrupted sessions</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CheckCircle2} label="Completed Sessions" value={stats.completed} accent="primary" />
        <StatCard icon={XCircle} label="Interrupted" value={stats.interrupted} accent="danger" />
        <StatCard icon={Clock} label="Total Focus Time" value={stats.totalMin} suffix={` (${fmt(stats.totalMin)})`} accent="accent" />
        <StatCard icon={TrendingUp} label="Avg Session" value={stats.avg} suffix=" min" accent="primary" />
      </div>

      {/* Session list */}
      <div className="space-y-6">
        {grouped.map(([date, sessions]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-muted" />
              <h2 className="font-semibold text-sm text-muted">{relativeDay(date)}</h2>
            </div>
            <div className="card divide-y">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4 hover:bg-[rgb(var(--bg))] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      s.status === 'Completed' ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger'
                    }`}>
                      {s.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold">{s.subject}</p>
                      <p className="text-xs text-muted">
                        {s.completedAt ? `Completed at ${s.completedAt}` : 'Session was interrupted'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium tabular-nums">{s.durationMin} min</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                      s.status === 'Completed' ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {history.length === 0 && (
        <div className="card p-12 text-center text-muted">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No sessions yet. Start a focus session to see your history here.</p>
        </div>
      )}
    </div>
  );
}
