import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Settings2, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import type { FocusSessionRecord } from '@/types';

type Mode = 'focus' | 'break';
type Preset = { label: string; focus: number; break: number };

const presets: Preset[] = [
  { label: '25 / 5', focus: 25, break: 5 },
  { label: '50 / 10', focus: 50, break: 10 },
  { label: 'Custom', focus: 25, break: 5 },
];

export default function FocusTimer() {
  const { addSession, pushToast, setPage, dailyGoalMin } = useApp();
  const [presetIdx, setPresetIdx] = useState(0);
  const [focusMin, setFocusMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [mode, setMode] = useState<Mode>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState('Mathematics Study Session');
  const [customOpen, setCustomOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = mode === 'focus' ? focusMin * 60 : breakMin * 60;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleComplete = useCallback(() => {
    if (mode === 'focus') {
      const record: FocusSessionRecord = {
        id: Math.random().toString(36).slice(2),
        subject,
        durationMin: focusMin,
        date: new Date().toISOString().slice(0, 10),
        status: 'Completed',
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      addSession(record);
      setDoneOpen(true);
      pushToast({ title: 'Focus session complete!', description: `${focusMin} min · ${subject}`, type: 'success' });
      setMode('break');
      setSecondsLeft(breakMin * 60);
    } else {
      pushToast({ title: 'Break over — ready for another session?', type: 'info' });
      setMode('focus');
      setSecondsLeft(focusMin * 60);
    }
    setRunning(false);
  }, [mode, focusMin, breakMin, subject, addSession, pushToast]);

  useEffect(() => {
    if (secondsLeft === 0 && running) {
      handleComplete();
    }
  }, [secondsLeft, running, handleComplete]);

  const applyPreset = (idx: number) => {
    setPresetIdx(idx);
    if (idx < 2) {
      setFocusMin(presets[idx].focus);
      setBreakMin(presets[idx].break);
    } else {
      setCustomOpen(true);
    }
  };

  const reset = () => {
    setRunning(false);
    setMode('focus');
    setSecondsLeft(focusMin * 60);
  };

  const mm = Math.floor(secondsLeft / 60);
  const ss = secondsLeft % 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 130;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Focus Timer</h1>
        <p className="text-muted text-sm mt-1">Stay on task with structured focus sessions</p>
      </div>

      {/* Preset selector */}
      <div className="flex justify-center gap-3">
        {presets.map((p, i) => (
          <button
            key={p.label}
            onClick={() => applyPreset(i)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              presetIdx === i
                ? 'bg-primary text-white shadow-md'
                : 'btn-ghost'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Timer ring */}
      <div className="card p-8 md:p-12 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          {mode === 'focus' ? (
            <Brain className="w-5 h-5 text-primary" />
          ) : (
            <Coffee className="w-5 h-5 text-accent" />
          )}
          <span className={`text-sm font-semibold uppercase tracking-wider ${mode === 'focus' ? 'text-primary' : 'text-accent'}`}>
            {mode === 'focus' ? 'Focus Session' : 'Break Time'}
          </span>
        </div>

        <div className="relative w-72 h-72 md:w-80 md:h-80">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
            <circle cx="140" cy="140" r="130" fill="none" stroke="rgb(var(--border))" strokeWidth="12" />
            <circle
              cx="140" cy="140" r="130" fill="none"
              stroke={mode === 'focus' ? '#10b981' : '#3b82f6'}
              strokeWidth="12" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="ring-progress"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-6xl font-bold tabular-nums tracking-tight">
              {String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}
            </p>
            <p className="text-sm text-muted mt-2">{subject}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => setRunning((r) => !r)}
            className="btn-primary w-16 h-16 rounded-full flex items-center justify-center text-white pulse-focus"
          >
            {running ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
          </button>
          <button
            onClick={reset}
            className="w-12 h-12 rounded-full border border-[rgb(var(--border))] flex items-center justify-center text-muted hover:text-[rgb(var(--text))] transition"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Subject input */}
        <div className="w-full mt-6">
          <label className="text-xs text-muted font-medium">Session Label</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="What are you working on?"
          />
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs text-muted">
          <Settings2 className="w-4 h-4" />
          Daily goal: {Math.floor(dailyGoalMin / 60)}h {dailyGoalMin % 60}m
        </div>
      </div>

      {/* Custom modal */}
      <Modal
        open={customOpen}
        onClose={() => setCustomOpen(false)}
        title="Custom Session"
        footer={
          <button onClick={() => { setSecondsLeft(focusMin * 60); setCustomOpen(false); }} className="btn-primary px-5 py-2 text-sm">
            Apply
          </button>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted">Focus minutes</label>
            <input
              type="number" min={1} max={120} value={focusMin}
              onChange={(e) => setFocusMin(Math.max(1, Number(e.target.value)))}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm text-muted">Break minutes</label>
            <input
              type="number" min={1} max={60} value={breakMin}
              onChange={(e) => setBreakMin(Math.max(1, Number(e.target.value)))}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[rgb(var(--bg))] border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </Modal>

      {/* Completion modal */}
      <Modal
        open={doneOpen}
        onClose={() => setDoneOpen(false)}
        title="Session Complete!"
        footer={
          <>
            <button onClick={() => { setDoneOpen(false); setPage('history'); }} className="btn-ghost px-5 py-2 text-sm">
              View History
            </button>
            <button onClick={() => { setDoneOpen(false); setRunning(true); }} className="btn-primary px-5 py-2 text-sm">
              Start Break
            </button>
          </>
        }
      >
        <div className="text-center py-4">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
          <p className="text-lg font-bold mt-4">{focusMin} minutes focused!</p>
          <p className="text-sm text-muted mt-1">{subject}</p>
          <p className="text-xs text-muted mt-3">Your stats have been updated.</p>
        </div>
      </Modal>
    </div>
  );
}
