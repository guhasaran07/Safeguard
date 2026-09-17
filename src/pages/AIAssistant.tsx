import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { distractionPattern, aiInsight } from '@/data/mockData';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const suggestions = [
  'Why am I getting distracted?',
  'How can I study for 2 hours?',
  'When should I study?',
  'How can I reduce Instagram usage?',
];

function generateResponse(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes('distract')) {
    return `Your activity shows that most distractions happen between 7 PM and 9 PM, mainly from social media (Instagram, Snapchat) and entertainment (YouTube). During that window your focus score drops to an average of 62. Try a 30-minute Focus Session during this period and enable Focus Mode to block the top offenders.`;
  }
  if (lower.includes('2 hour') || lower.includes('two hour') || lower.includes('long')) {
    return `To study for 2 hours straight, I recommend breaking it into two 50-minute focus sessions with a 10-minute break in between. Your data shows you complete 50-minute sessions 88% of the time. Start at 8 AM — your most productive window — and enable Focus Mode to block Instagram and YouTube.`;
  }
  if (lower.includes('when') || lower.includes('best time') || lower.includes('schedule')) {
    return `Based on your patterns, ${aiInsight} Your focus score peaks at 88 on Thursday mornings. Avoid 7–9 PM as that's your highest-distraction window. Consider scheduling lighter review tasks during that time instead.`;
  }
  if (lower.includes('instagram') || lower.includes('social')) {
    return `You spent 65 minutes on Instagram today, mostly between 7–9 PM. Here's a 3-step plan: 1) Enable Focus Mode to block Instagram during study hours. 2) Set a daily limit of 30 minutes. 3) Replace that time with a short walk — your data shows outdoor breaks improve your next session's focus score by 12%.`;
  }
  if (lower.includes('focus score') || lower.includes('score')) {
    return `Your focus score is 84% today, up 6% from last week. It's calculated from your focus time (${222} min), distractions (7), and session completion rate (82%). To push it above 90, aim for 4+ hours of focus time and keep distractions under 5.`;
  }
  if (lower.includes('habit')) {
    return `You're on a 5-day focus streak — great momentum! Your most consistent habit is morning sessions between 8–10 AM. To build on this, try setting a fixed study time daily and use the Focus Timer's 50/10 preset. Consistency compounds: your weekly focus time has grown from 920 to 1280 minutes over 4 weeks.`;
  }
  return `I'm your AI focus assistant. I can help you understand your distraction patterns, suggest study schedules, and recommend strategies to improve focus. Try asking: "Why am I getting distracted?", "When should I study?", or "How can I reduce Instagram usage?"`;
}

export default function AIAssistant() {
  const { pushToast } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'ai',
      text: "Hi! I'm your AI Focus Assistant. I've analyzed your usage data and I'm here to help you build better focus habits. Ask me anything, or try one of the suggestions below.",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Math.random().toString(36).slice(2), role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    // Simulated AI response — structured for future Gemini API integration
    // To connect Gemini: replace this setTimeout with a fetch to your edge function
    // that calls the Gemini API with the user's usage context.
    setTimeout(() => {
      const aiMsg: Message = { id: Math.random().toString(36).slice(2), role: 'ai', text: generateResponse(text) };
      setMessages((m) => [...m, aiMsg]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Your Focus Assistant</h1>
          <p className="text-muted text-sm">AI-powered, personalized to your usage data</p>
        </div>
      </div>

      {/* Messages */}
      <div className="card p-4 flex-1 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              msg.role === 'ai' ? 'bg-gradient-to-br from-primary to-accent text-white' : 'bg-[rgb(var(--bg))] text-muted border'
            }`}>
              {msg.role === 'ai' ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'ai'
                ? 'bg-[rgb(var(--bg))] rounded-tl-sm'
                : 'bg-primary text-white rounded-tr-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[rgb(var(--bg))]">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="px-4 py-2 rounded-xl text-sm border bg-[rgb(var(--surface))] hover:border-primary hover:text-primary transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="card p-2 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(input); }}
          placeholder="Ask your focus assistant..."
          className="flex-1 px-4 py-2.5 bg-transparent text-sm focus:outline-none"
        />
        <button
          onClick={() => send(input)}
          className="btn-primary w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
