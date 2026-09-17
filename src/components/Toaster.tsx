import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ToastMsg } from '@/types';

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap = {
  success: 'border-primary text-primary',
  info: 'border-accent text-accent',
  warning: 'border-warning text-warning',
  error: 'border-danger text-danger',
};

export default function Toaster() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
      {toasts.map((t: ToastMsg) => {
        const Icon = iconMap[t.type];
        return (
          <div
            key={t.id}
            className={`toast-in card flex items-start gap-3 p-4 border-l-4 ${colorMap[t.type]}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-[rgb(var(--text))]">{t.title}</p>
              {t.description && <p className="text-xs text-muted mt-0.5">{t.description}</p>}
            </div>
            <button onClick={() => dismissToast(t.id)} className="text-muted hover:text-[rgb(var(--text))]">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
