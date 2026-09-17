import { AppProvider, useApp } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Toaster from '@/components/Toaster';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import FocusTimer from '@/pages/FocusTimer';
import Analytics from '@/pages/Analytics';
import SmartBlocking from '@/pages/SmartBlocking';
import AIAssistant from '@/pages/AIAssistant';
import FocusHistory from '@/pages/FocusHistory';
import Settings from '@/pages/Settings';
import { useState } from 'react';

function Shell() {
  const { page } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (page === 'landing') {
    return <Landing />;
  }

  return (
    <div className="flex min-h-screen bg-[rgb(var(--bg))]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar onMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {page === 'dashboard' && <Dashboard />}
          {page === 'timer' && <FocusTimer />}
          {page === 'analytics' && <Analytics />}
          {page === 'blocking' && <SmartBlocking />}
          {page === 'assistant' && <AIAssistant />}
          {page === 'history' && <FocusHistory />}
          {page === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
      <Toaster />
    </AppProvider>
  );
}
