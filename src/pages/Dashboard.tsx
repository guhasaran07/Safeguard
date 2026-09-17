import { Target, Timer, Ban, TrendingUp, Sparkles, Play, BarChart3, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import StatCard from '@/components/StatCard';
import { dailyActivity, focusScoreHistory, aiInsight, distractionPattern } from '@/data/mockData';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line,
} from 'recharts';

export default function Dashboard() {
  const { setPage, history } = useApp();

  const todaySessions = history.filter((h) => h.date === new Date().toISOString().slice(0, 10));
  const focusMin = todaySessions
    .filter((s) => s.status === 'Completed')
    .reduce((a, s) => a + s.durationMin, 0);
  const baseMin = 222; // baseline from demo data
  const totalFocusMin = baseMin + focusMin;
  const h = Math.floor(totalFocusMin / 60);
  const m = totalFocusMin % 60;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
          <p className="text-muted text-sm mt-1">Here's your focus summary for today</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPage('timer')} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
            <Play className="w-4 h-4" /> Start Focus Session
          </button>
          <button onClick={() => setPage('analytics')} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> View Analytics
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Today's Focus Score" value={84} suffix="%" trend="+6%" accent="primary" />
        <StatCard icon={Clock} label="Focus Time" value={totalFocusMin} suffix={` (${h}h ${m}m)`} accent="accent" />
        <StatCard icon={Ban} label="Distractions" value={7} trend="-2" accent="warning" />
        <StatCard icon={TrendingUp} label="Focus Streak" value={5} suffix=" days" accent="primary" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h2 className="font-bold text-lg mb-1">Today's Activity</h2>
          <p className="text-muted text-sm mb-4">Focus time vs. distraction categories (minutes)</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dailyActivity}>
              <defs>
                <linearGradient id="gFocus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gSocial" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gEnt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="name" stroke="rgb(var(--text-muted))" fontSize={12} />
              <YAxis stroke="rgb(var(--text-muted))" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 12 }}
              />
              <Legend />
              <Area type="monotone" dataKey="focus" name="Focus" stroke="#10b981" fill="url(#gFocus)" strokeWidth={2} />
              <Area type="monotone" dataKey="social" name="Social" stroke="#ec4899" fill="url(#gSocial)" strokeWidth={2} />
              <Area type="monotone" dataKey="entertainment" name="Entertainment" stroke="#f59e0b" fill="url(#gEnt)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-lg mb-1">Focus Score History</h2>
          <p className="text-muted text-sm mb-4">Last 7 days</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={focusScoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="name" stroke="rgb(var(--text-muted))" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="rgb(var(--text-muted))" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 12 }}
              />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distraction pattern + AI insight */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-lg">Distraction Pattern</h2>
          </div>
          <p className="text-sm leading-relaxed">{distractionPattern}</p>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={[
                { time: 'Morning', count: 2 },
                { time: 'Afternoon', count: 4 },
                { time: 'Evening', count: 11 },
                { time: 'Night', count: 3 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                <XAxis dataKey="time" stroke="rgb(var(--text-muted))" fontSize={12} />
                <YAxis stroke="rgb(var(--text-muted))" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 12 }}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-lg">AI Insight</h2>
          </div>
          <p className="text-sm leading-relaxed">{aiInsight}</p>
          <button
            onClick={() => setPage('assistant')}
            className="mt-4 text-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Ask the AI Assistant
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
