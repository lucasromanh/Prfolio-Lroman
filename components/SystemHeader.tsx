
import React, { useEffect, useState } from 'react';
import { Globe, Clock, Activity, Wifi, Settings } from 'lucide-react';
import { Translation } from '../types';

interface Props {
  t: Translation['overview'];
}

export const SystemHeader: React.FC<Props> = ({ t }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-24 pb-12 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        
        {/* System Identity Block */}
        <div className="border-l-2 border-sys-accent pl-6">
          <h1 className="text-4xl md:text-6xl font-sans font-light text-sys-text tracking-tighter mb-2">
            LUCAS <span className="font-semibold">ROMÁN</span>
          </h1>
          <p className="font-mono text-sm md:text-base text-sys-subtext tracking-wider uppercase">
            {t.role}
          </p>
        </div>

        {/* System Status Indicators - Horizontal Band */}
        <div className="flex flex-wrap gap-4 md:gap-8 mt-8 items-center text-xs md:text-sm font-mono text-sys-subtext bg-sys-surface/50 p-4 rounded-sm border border-sys-line/50">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-sys-text">{t.availability}</span>
          </div>

          <div className="hidden md:block w-px h-4 bg-sys-line"></div>

          <div className="flex items-center gap-2">
            <Globe size={14} />
            <span>{t.location}</span>
          </div>

          <div className="hidden md:block w-px h-4 bg-sys-line"></div>

          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{t.timezone} <span className="text-sys-text ml-1">{time}</span></span>
          </div>

          <div className="hidden md:block w-px h-4 bg-sys-line"></div>
          
          <div className="flex items-center gap-2 ml-auto">
             <Wifi size={14} className="text-sys-accent" />
             <span>SYS.ONLINE</span>
          </div>
        </div>

        {/* Kernel Manifest (Moved from MetricsPanel) */}
        <div className="mt-4 border-l-4 border-sys-accent bg-sys-surface/40 rounded-r-sm p-8 relative overflow-hidden shadow-sm">
          <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                  <Settings size={20} className="text-sys-accent animate-[spin_10s_linear_infinite]" />
                  <h3 className="text-sm font-mono font-bold text-sys-text tracking-widest uppercase">{t.bio_title}</h3>
              </div>
              
              <p className="text-sys-text text-base md:text-lg font-light leading-8 max-w-4xl tracking-wide">
                  {t.bio_text}
              </p>
          </div>
        </div>

      </div>
    </div>
  );
};
