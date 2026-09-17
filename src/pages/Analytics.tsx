import { useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, RadialBarChart, RadialBar,
} from 'recharts';
import { Clock, TrendingUp, Ban, CheckCircle2 } from 'lucide-react';
import {
  dailyActivity, distractionCategories, focusScoreHistory, completionRate, weeklyFocusTrend,
} from '@/data/mockData';
import StatCard from '@/components/StatCard';

type Range = 'Today' | 'This Week' | 'This Month';

const rangeData: Record<Range, { usage: number; focus: number; distractions: number; score: number }> = {
  Today: { usage: 165, focus: 222, distractions: 7, score: 84 },
  'This Week': { usage: 985, focus: 1287, distractions: 28, score: 79 },
  'This Month': { usage: 4200, focus: 5180, distractions: 112, score: 76 },
};

export default function Analytics() {
  const [range, setRange] = useState<Range>('Today');
  const d = rangeData[range];

  const fmt = (min: number) => `${Math.floor(min / 60)}h ${min % 60}m`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Distraction Analytics</h1>
          <p className="text-muted text-sm mt-1">Understand your patterns, improve your focus</p>
        </div>
        <div className="flex gap-2">
          {(['Today', 'This Week', 'This Month'] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                range === r ? 'bg-primary text-white' : 'btn-ghost'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Daily Screen Usage" value={d.usage} suffix={` (${fmt(d.usage)})`} accent="warning" />
        <StatCard icon={TrendingUp} label="Focus Time" value={d.focus} suffix={` (${fmt(d.focus)})`} accent="primary" />
        <StatCard icon={Ban} label="Distractions" value={d.distractions} accent="danger" />
        <StatCard icon={CheckCircle2} label="Focus Score" value={d.score} suffix="%" accent="primary" />
      </div>

      {/* Weekly focus trend + completion rate */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h2 className="font-bold text-lg mb-4">Weekly Focus Time</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weeklyFocusTrend}>
              <defs>
                <linearGradient id="gWeek" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="name" stroke="rgb(var(--text-muted))" fontSize={12} />
              <YAxis stroke="rgb(var(--text-muted))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 12 }} />
              <Area type="monotone" dataKey="focus" stroke="#10b981" fill="url(#gWeek)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4">Completion Rate</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={completionRate} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4}>
                {completionRate.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 12 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily activity stacked + distraction categories */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4">Daily Activity Breakdown</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="name" stroke="rgb(var(--text-muted))" fontSize={12} />
              <YAxis stroke="rgb(var(--text-muted))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 12 }} />
              <Legend />
              <Bar dataKey="focus" name="Focus" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="social" name="Social" stackId="a" fill="#ec4899" />
              <Bar dataKey="entertainment" name="Entertainment" stackId="a" fill="#f59e0b" />
              <Bar dataKey="other" name="Other" stackId="a" fill="#64748b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4">Most Distracting Categories</h2>
          <div className="space-y-3">
            {distractionCategories.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted">{fmt(c.minutes)}</span>
                </div>
                <div className="h-2.5 rounded-full bg-[rgb(var(--bg))] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(c.minutes / 65) * 100}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Focus score history radial */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4">Focus Score History</h2>
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart
              data={focusScoreHistory.map((d, i) => ({ name: d.name, score: d.score, fill: i === 6 ? '#10b981' : '#10b98155' }))}
              innerRadius="20%" outerRadius="90%"
            >
              <RadialBar dataKey="score" cornerRadius={8} background={{ fill: 'rgb(var(--border))' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 12 }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs text-muted mt-2">
            {focusScoreHistory.map((d) => (
              <span key={d.name}>{d.name}</span>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4">App Usage Breakdown</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={distractionCategories} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" horizontal={false} />
              <XAxis type="number" stroke="rgb(var(--text-muted))" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="rgb(var(--text-muted))" fontSize={12} width={80} />
              <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))', borderRadius: 12 }} />
              <Bar dataKey="minutes" radius={[0, 8, 8, 0]}>
                {distractionCategories.map((c, i) => (
                  <Cell key={i} fill={c.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
