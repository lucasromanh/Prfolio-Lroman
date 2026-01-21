
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
    <div className="pt-24 pb-12 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto relative">
      
      {/* BACKGROUND PROFILE IMAGE LAYER 
          Posicionada absolutamente detrás (z-0).
          Sin afectar el flujo del contenido (pointer-events-none).
      */}
      <div className="absolute top-0 right-0 w-full md:w-[700px] h-[700px] pointer-events-none select-none z-0 opacity-15 md:opacity-20 mix-blend-lighten overflow-visible">
         <div className="relative w-full h-full">
            {/* Image */}
            <img 
              src="/LucasROman-Porfolio.png" 
              alt="System User Profile" 
              className="w-full h-full object-cover object-top mask-image-gradient"
            />
            
            {/* Gradient Overlay: Fade from Bottom to Top (Merges with background) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
            
            {/* Gradient Overlay: Fade from Left to Right (Merges with text area) */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#0f172a] via-transparent to-transparent"></div>
            
            {/* Radial Gradient for softer edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0f172a_100%)] opacity-40"></div>
         </div>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        
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
        <div className="flex flex-wrap gap-4 md:gap-8 mt-8 items-center text-xs md:text-sm font-mono text-sys-subtext bg-sys-surface/50 backdrop-blur-sm p-4 rounded-sm border border-sys-line/50 shadow-sm w-fit">
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

        {/* Kernel Manifest - RESTORED ORIGINAL WIDTH (Removed w-3/4 constraints) */}
        <div className="mt-4 border-l-4 border-sys-accent bg-sys-surface/60 backdrop-blur-md rounded-r-sm p-8 relative overflow-hidden shadow-sm">
          <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                  <Settings size={20} className="text-sys-accent animate-[spin_10s_linear_infinite]" />
                  <h3 className="text-sm font-mono font-bold text-sys-text tracking-widest uppercase">{t.bio_title}</h3>
              </div>
              
              <p className="text-sys-text text-base md:text-lg font-light leading-8 tracking-wide">
                  {t.bio_text}
              </p>
          </div>
        </div>

      </div>
    </div>
  );
};
