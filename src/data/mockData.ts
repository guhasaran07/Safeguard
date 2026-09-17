import type { AppToggle, FocusSessionRecord } from '@/types';

export const dailyActivity = [
  { name: 'Mon', focus: 180, social: 65, entertainment: 40, other: 20 },
  { name: 'Tue', focus: 210, social: 50, entertainment: 35, other: 25 },
  { name: 'Wed', focus: 165, social: 80, entertainment: 50, other: 15 },
  { name: 'Thu', focus: 240, social: 45, entertainment: 30, other: 20 },
  { name: 'Fri', focus: 150, social: 90, entertainment: 60, other: 30 },
  { name: 'Sat', focus: 120, social: 110, entertainment: 80, other: 40 },
  { name: 'Sun', focus: 222, social: 55, entertainment: 35, other: 18 },
];

export const focusScoreHistory = [
  { name: 'Mon', score: 78 },
  { name: 'Tue', score: 82 },
  { name: 'Wed', score: 71 },
  { name: 'Thu', score: 88 },
  { name: 'Fri', score: 69 },
  { name: 'Sat', score: 62 },
  { name: 'Sun', score: 84 },
];

export const distractionCategories = [
  { name: 'Instagram', minutes: 65, color: '#ec4899' },
  { name: 'YouTube', minutes: 48, color: '#ef4444' },
  { name: 'Games', minutes: 22, color: '#f59e0b' },
  { name: 'Snapchat', minutes: 18, color: '#fbbf24' },
  { name: 'Other', minutes: 12, color: '#64748b' },
];

export const completionRate = [
  { name: 'Completed', value: 18, color: '#10b981' },
  { name: 'Interrupted', value: 4, color: '#f43f5e' },
];

export const weeklyFocusTrend = [
  { name: 'W1', focus: 920 },
  { name: 'W2', focus: 1080 },
  { name: 'W3', focus: 1150 },
  { name: 'W4', focus: 1280 },
];

export const distractionByHour = [
  { hour: '6 AM', count: 0 },
  { hour: '8 AM', count: 1 },
  { hour: '10 AM', count: 1 },
  { hour: '12 PM', count: 2 },
  { hour: '2 PM', count: 2 },
  { hour: '4 PM', count: 3 },
  { hour: '6 PM', count: 4 },
  { hour: '7 PM', count: 5 },
  { hour: '8 PM', count: 6 },
  { hour: '9 PM', count: 5 },
  { hour: '10 PM', count: 3 },
  { hour: '11 PM', count: 2 },
];

export const initialAppToggles: AppToggle[] = [
  { id: 'ig', name: 'Instagram', category: 'Social', icon: 'Instagram', enabled: true, minutesToday: 65 },
  { id: 'yt', name: 'YouTube', category: 'Entertainment', icon: 'Youtube', enabled: true, minutesToday: 48 },
  { id: 'games', name: 'Games', category: 'Games', icon: 'Gamepad2', enabled: false, minutesToday: 22 },
  { id: 'snap', name: 'Snapchat', category: 'Social', icon: 'MessageCircle', enabled: true, minutesToday: 18 },
  { id: 'x', name: 'X / Twitter', category: 'Social', icon: 'Twitter', enabled: false, minutesToday: 14 },
  { id: 'tiktok', name: 'TikTok', category: 'Entertainment', icon: 'Music', enabled: true, minutesToday: 30 },
  { id: 'reddit', name: 'Reddit', category: 'Other', icon: 'MessageSquare', enabled: false, minutesToday: 9 },
  { id: 'netflix', name: 'Netflix', category: 'Entertainment', icon: 'Film', enabled: true, minutesToday: 25 },
];

export const initialHistory: FocusSessionRecord[] = [
  { id: 'h1', subject: 'Mathematics', durationMin: 45, date: todayISO(0), status: 'Completed', completedAt: '09:15' },
  { id: 'h2', subject: 'Python Programming', durationMin: 50, date: todayISO(0), status: 'Completed', completedAt: '11:05' },
  { id: 'h3', subject: 'DSA Practice', durationMin: 25, date: todayISO(0), status: 'Completed', completedAt: '14:30' },
  { id: 'h4', subject: 'DBMS', durationMin: 40, date: todayISO(1), status: 'Completed', completedAt: '10:20' },
  { id: 'h5', subject: 'English Essay', durationMin: 25, date: todayISO(1), status: 'Interrupted' },
  { id: 'h6', subject: 'Operating Systems', durationMin: 50, date: todayISO(1), status: 'Completed', completedAt: '16:45' },
  { id: 'h7', subject: 'Computer Networks', durationMin: 25, date: todayISO(2), status: 'Completed', completedAt: '09:00' },
  { id: 'h8', subject: 'Aptitude', durationMin: 45, date: todayISO(2), status: 'Completed', completedAt: '15:10' },
  { id: 'h9', subject: 'Web Development', durationMin: 50, date: todayISO(3), status: 'Completed', completedAt: '11:30' },
  { id: 'h10', subject: 'Reasoning', durationMin: 25, date: todayISO(3), status: 'Interrupted' },
];

function todayISO(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export const aiInsight =
  "You usually maintain longer focus sessions during the morning. Consider scheduling your most important study tasks between 7 AM and 10 AM when your distraction count is lowest.";

export const distractionPattern =
  "Most distractions occur between 7 PM – 9 PM, mainly driven by social media (Instagram, Snapchat) and entertainment (YouTube).";
