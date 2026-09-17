import type { LucideIcon } from 'lucide-react';
import { useCountUp } from '@/hooks';

export default function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  trend,
  accent = 'primary',
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  trend?: string;
  accent?: 'primary' | 'accent' | 'warning' | 'danger';
}) {
  const animated = useCountUp(value);
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  return (
    <div className="card p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[accent]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="text-xs font-medium px-2 py-1 rounded-lg bg-primary/10 text-primary">
            {trend}
          </span>
        )}
      </div>
      <p className="text-muted text-sm mt-4">{label}</p>
      <p className="text-2xl font-bold mt-1">
        {Number.isInteger(value) ? Math.round(animated) : animated.toFixed(1)}
        {suffix && <span className="text-lg text-muted ml-1">{suffix}</span>}
      </p>
    </div>
  );
}
