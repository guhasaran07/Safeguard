import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Page, Theme, AppToggle, FocusSessionRecord, ToastMsg } from '@/types';
import { initialAppToggles, initialHistory } from '@/data/mockData';

interface AppState {
  page: Page;
  setPage: (p: Page) => void;

  theme: Theme;
  toggleTheme: () => void;

  focusMode: boolean;
  setFocusMode: (v: boolean) => void;

  appToggles: AppToggle[];
  toggleApp: (id: string) => void;

  history: FocusSessionRecord[];
  addSession: (s: FocusSessionRecord) => void;
  resetStats: () => void;

  toasts: ToastMsg[];
  pushToast: (t: Omit<ToastMsg, 'id'>) => void;
  dismissToast: (id: string) => void;

  dailyGoalMin: number;
  setDailyGoalMin: (n: number) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>('landing');
  const [theme, setTheme] = useState<Theme>('dark');
  const [focusMode, setFocusMode] = useState(false);
  const [appToggles, setAppToggles] = useState<AppToggle[]>(initialAppToggles);
  const [history, setHistory] = useState<FocusSessionRecord[]>(initialHistory);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const [dailyGoalMin, setDailyGoalMin] = useState(240);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  const toggleApp = useCallback((id: string) => {
    setAppToggles((apps) => apps.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((ts) => ts.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback((t: Omit<ToastMsg, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((ts) => [...ts, { ...t, id }]);
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 4000);
  }, []);

  const addSession = useCallback((s: FocusSessionRecord) => {
    setHistory((h) => [s, ...h]);
  }, []);

  const resetStats = useCallback(() => {
    setHistory([]);
    setAppToggles(initialAppToggles);
    setFocusMode(false);
  }, []);

  return (
    <Ctx.Provider
      value={{
        page,
        setPage,
        theme,
        toggleTheme,
        focusMode,
        setFocusMode,
        appToggles,
        toggleApp,
        history,
        addSession,
        resetStats,
        toasts,
        pushToast,
        dismissToast,
        dailyGoalMin,
        setDailyGoalMin,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
