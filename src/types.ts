export type Page =
  | 'landing'
  | 'dashboard'
  | 'timer'
  | 'analytics'
  | 'blocking'
  | 'assistant'
  | 'history'
  | 'settings';

export type Theme = 'light' | 'dark';

export type SessionStatus = 'Completed' | 'Interrupted';

export interface FocusSessionRecord {
  id: string;
  subject: string;
  durationMin: number;
  date: string; // ISO date
  status: SessionStatus;
  completedAt?: string;
}

export interface AppToggle {
  id: string;
  name: string;
  category: 'Social' | 'Entertainment' | 'Games' | 'Other';
  icon: string;
  enabled: boolean;
  minutesToday: number;
}

export interface ToastMsg {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
