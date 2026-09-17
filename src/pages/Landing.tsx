import { useEffect, useState } from 'react';
import {
  ShieldCheck, ArrowRight, Brain, Ban, BarChart3, Timer, Bot, Target, TrendingUp,
  Eye, Lightbulb, Zap, Moon, Sun, Menu, X, CheckCircle2, Sparkles, Users, GraduationCap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useReveal } from '@/hooks';

const navLinks = ['Features', 'How It Works', 'About'];

export default function Landing() {
  const { setPage, theme, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const heroRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md border-b' : ''
        }`}
        style={{ backgroundColor: scrolled ? 'rgb(var(--bg) / 0.85)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">FocusGuard</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-')}`} className="text-sm font-medium text-muted hover:text-[rgb(var(--text))] transition">
                {l}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-muted hover:text-[rgb(var(--text))] transition">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setPage('dashboard')} className="text-sm font-medium text-muted hover:text-[rgb(var(--text))] transition">
              Login
            </button>
            <button onClick={() => setPage('dashboard')} className="btn-primary px-5 py-2 text-sm">
              Get Started
            </button>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden p-2 text-muted">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden fixed inset-0 z-50 bg-[rgb(var(--bg))] flex flex-col p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg">FocusGuard</span>
              <button onClick={() => setMobileMenu(false)} className="text-muted"><X className="w-6 h-6" /></button>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-')}`} onClick={() => setMobileMenu(false)} className="text-lg font-medium">
                  {l}
                </a>
              ))}
              <button onClick={() => setPage('dashboard')} className="btn-primary px-5 py-3 text-center mt-4">Get Started</button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section ref={heroRef} className="reveal relative pt-32 pb-20 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[rgb(var(--surface))] text-sm font-medium text-muted mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            AI-Powered Digital Wellness
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            FocusGuard
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mt-4 text-muted">
            Don't just block distractions. <span className="text-primary">Understand</span> them.
          </p>
          <p className="text-lg text-muted mt-6 max-w-2xl mx-auto leading-relaxed">
            An AI-powered digital wellness platform that detects distraction patterns, helps you
            regain focus, and builds better digital habits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button onClick={() => setPage('dashboard')} className="btn-primary px-8 py-3.5 text-base flex items-center gap-2 justify-center group">
              Start Focusing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#features" className="btn-ghost px-8 py-3.5 text-base flex items-center gap-2 justify-center">
              Explore Features
            </a>
          </div>
        </div>

        {/* Hero dashboard preview */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="card p-6 md:p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Today's Focus Score", value: '84%', icon: Target, color: 'text-primary' },
                { label: 'Focus Time', value: '3h 42m', icon: Timer, color: 'text-accent' },
                { label: 'Distractions', value: '7', icon: Ban, color: 'text-warning' },
                { label: 'Focus Streak', value: '5 days', icon: TrendingUp, color: 'text-primary' },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-[rgb(var(--bg))] border">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                  <p className="text-xl font-bold mt-2">{s.value}</p>
                  <p className="text-xs text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section id="problem">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge color="danger">The Problem</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
              Students lose hours every day to digital distractions
            </h2>
            <p className="text-muted text-lg mt-4 leading-relaxed">
              Social media, games, and endless notifications fragment attention and derail study
              sessions. The result: wasted time, reduced productivity, and fractured focus habits
              that are hard to rebuild.
            </p>
            <div className="mt-8 space-y-3">
              {[
                'Average student checks their phone 96+ times a day',
                'Every distraction costs ~23 minutes of refocus time',
                "Traditional app blockers don't address root causes",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '3.6h', label: 'Daily screen distraction' },
              { value: '96x', label: 'Phone checks per day' },
              { value: '23min', label: 'Cost per interruption' },
              { value: '40%', label: 'Reduced productivity' },
            ].map((s) => (
              <div key={s.label} className="card p-6 text-center">
                <p className="text-3xl font-bold text-danger">{s.value}</p>
                <p className="text-sm text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SOLUTION / CONCEPT */}
      <Section id="solution" alt>
        <div className="text-center mb-12">
          <Badge color="primary">The Solution</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Detect → Understand → Intervene → Improve
          </h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            Instead of simply blocking apps, FocusGuard learns your usage patterns and provides
            adaptive interventions.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Eye, title: 'Detect', desc: 'Monitor screen usage and distraction triggers across all apps and time windows.', n: '01' },
            { icon: Brain, title: 'Understand', desc: 'AI analyzes patterns to find when and why you get distracted most.', n: '02' },
            { icon: Zap, title: 'Intervene', desc: 'Smart blocking, focus sessions, and personalized nudges at the right moments.', n: '03' },
            { icon: TrendingUp, title: 'Improve', desc: 'Track focus scores over time and build healthier digital habits.', n: '04' },
          ].map((s) => (
            <RevealCard key={s.title}>
              <div className="card p-6 h-full hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                <span className="text-xs font-bold text-primary/50">{s.n}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mt-2">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mt-4">{s.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{s.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </Section>

      {/* KEY FEATURES */}
      <Section id="features">
        <div className="text-center mb-12">
          <Badge color="accent">Key Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">Everything you need to stay focused</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Timer, title: 'Focus Timer', desc: 'Pomodoro-style sessions with 25/5, 50/10, or custom presets. Track every session automatically.' },
            { icon: BarChart3, title: 'Distraction Analytics', desc: 'Beautiful charts show daily usage, weekly trends, and your most distracting apps.' },
            { icon: Ban, title: 'Smart App Blocking', desc: 'Toggle which apps to restrict and enable Focus Mode to silence distractions instantly.' },
            { icon: Bot, title: 'AI Focus Assistant', desc: 'Chat with an AI that knows your patterns and gives personalized, data-driven advice.' },
            { icon: Target, title: 'Focus Score', desc: 'A daily score that combines focus time, distractions, and session completion into one metric.' },
            { icon: TrendingUp, title: 'Focus History', desc: 'Review completed and interrupted sessions, track streaks, and watch your habits improve.' },
          ].map((f) => (
            <RevealCard key={f.title}>
              <div className="card p-6 h-full hover:shadow-xl transition-all hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mt-4">{f.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{f.desc}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works" alt>
        <div className="text-center mb-12">
          <Badge color="primary">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">Three steps to better focus</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Set Your Goals', desc: 'Define your daily focus target and choose which apps distract you the most.' },
            { step: '2', title: 'Start a Focus Session', desc: 'Begin a timer, and FocusGuard silences distractions while you work.' },
            { step: '3', title: 'Review & Improve', desc: 'AI insights show your patterns and suggest the best times to study.' },
          ].map((s, i) => (
            <RevealCard key={s.step}>
              <div className="relative card p-8 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mt-5">{s.title}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[rgb(var(--border))]" />}
              </div>
            </RevealCard>
          ))}
        </div>
      </Section>

      {/* AI INSIGHTS */}
      <Section id="ai-insights">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealCard>
            <div className="card p-8 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <span className="font-bold">AI Insight</span>
              </div>
              <p className="text-lg leading-relaxed">
                "You usually maintain longer focus sessions during the morning. Consider scheduling
                important study tasks between <span className="text-primary font-semibold">7 AM and 10 AM</span>."
              </p>
              <div className="mt-6 p-4 rounded-xl bg-[rgb(var(--bg))] border">
                <p className="text-sm text-muted">Distraction Pattern Detected</p>
                <p className="text-sm mt-1 font-medium">Most distractions occur between 7 PM – 9 PM</p>
              </div>
            </div>
          </RevealCard>
          <div>
            <Badge color="accent">AI-Powered Insights</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Your personal AI focus coach
            </h2>
            <p className="text-muted text-lg mt-4 leading-relaxed">
              FocusGuard's AI analyzes your usage data to find patterns you'd never notice on your
              own. It tells you exactly when to study, what's derailing you, and how to improve.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Brain, text: 'Pattern recognition across your daily activity' },
                { icon: Target, text: 'Personalized study schedule recommendations' },
                { icon: Bot, text: 'Conversational AI assistant for real-time advice' },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* EXPECTED BENEFITS */}
      <Section id="benefits" alt>
        <div className="text-center mb-12">
          <Badge color="primary">Expected Impact</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">Build healthier digital habits</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Ban, value: '-45%', label: 'Unnecessary screen usage' },
            { icon: Timer, value: '+60%', label: 'Focused study time' },
            { icon: TrendingUp, value: '+3x', label: 'Consistency streaks' },
            { icon: CheckCircle2, value: 'Better', label: 'Digital habits' },
          ].map((b) => (
            <RevealCard key={b.label}>
              <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <b.icon className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold mt-4">{b.value}</p>
                <p className="text-sm text-muted mt-1">{b.label}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </Section>

      {/* ABOUT / TARGET USERS */}
      <Section id="about">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge color="accent">About</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Built for anyone who needs focus</h2>
            <p className="text-muted text-lg mt-4 leading-relaxed">
              FocusGuard was created for the modern student and professional—anyone whose attention
              is constantly pulled in a dozen directions. It's not just an app blocker; it's a
              complete digital wellness companion.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: GraduationCap, title: 'Students', desc: 'College and university students juggling coursework and study sessions.' },
              { icon: Target, title: 'Exam Aspirants', desc: 'Competitive-exam candidates who need long, uninterrupted focus blocks.' },
              { icon: Users, title: 'Professionals', desc: 'Knowledge workers who want to reclaim deep-work time.' },
            ].map((u) => (
              <RevealCard key={u.title}>
                <div className="card p-5 flex items-center gap-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shrink-0">
                    <u.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{u.title}</h3>
                    <p className="text-sm text-muted mt-0.5">{u.desc}</p>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="px-4 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto card p-12 md:p-16 text-center bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          </div>
          <ShieldCheck className="w-12 h-12 text-primary mx-auto" />
          <h2 className="text-3xl md:text-5xl font-bold mt-6">Ready to reclaim your focus?</h2>
          <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
            Join FocusGuard today and start building better digital habits with AI-powered insights.
          </p>
          <button
            onClick={() => setPage('dashboard')}
            className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2 mt-8 group"
          >
            Start Focusing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">FocusGuard</span>
          </div>
          <p className="text-sm text-muted">AI-Powered Digital Wellness · Hackathon Prototype</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, children, alt }: { id: string; children: React.ReactNode; alt?: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id={id} ref={ref} className={`reveal px-4 lg:px-8 py-20 ${alt ? 'bg-[rgb(var(--surface))]' : ''}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function RevealCard({ children }: { children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className="reveal h-full">{children}</div>;
}

function Badge({ children, color }: { children: React.ReactNode; color: 'primary' | 'accent' | 'danger' }) {
  const map = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    danger: 'bg-danger/10 text-danger',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${map[color]}`}>
      {children}
    </span>
  );
}
