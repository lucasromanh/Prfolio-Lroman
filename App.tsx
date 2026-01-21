
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { TEXTS } from './constants';
import { Navigation } from './components/Navigation';
import { SystemHeader } from './components/SystemHeader';
import { MetricsPanel } from './components/MetricsPanel';
import { ModulesGrid } from './components/ModulesGrid';
import { ActiveDeployments } from './components/ActiveDeployments';
import { SystemActions } from './components/SystemActions';
import { SystemChat } from './components/SystemChat';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const t = TEXTS[lang];

  return (
    <div className="min-h-screen text-sys-text selection:bg-sys-accent/30">
      
      {/* Background Grid Pattern - Dark Mode Optimized */}
      <div className="fixed inset-0 z-[-1] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.2
        }}
      ></div>

      <Navigation t={t.nav} lang={lang} setLang={setLang} />

      {/* Adjusted padding-left (lg:pl-72) to match the new sidebar width */}
      <main className="lg:pl-72 pb-24 transition-all duration-300 relative">
        <section id="overview">
           <SystemHeader t={t.overview} />
        </section>
        
        <MetricsPanel t={t.metrics} />
        <ModulesGrid t={t.modules} />
        <ActiveDeployments t={t.deployments} lang={lang} />
        <SystemActions t={t.contact} />

        <footer className="py-12 text-center">
          <p className="font-mono text-[10px] text-sys-subtext tracking-widest uppercase">
            {t.footer.rights.replace('{year}', new Date().getFullYear().toString())}
          </p>
        </footer>
        
        {/* Chatbot Integration */}
        <SystemChat lang={lang} />
      </main>

    </div>
  );
};

export default App;
