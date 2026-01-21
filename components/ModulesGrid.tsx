
import React, { useState } from 'react';
import { Translation } from '../types';
import { Section } from './Section';
import { MODULES } from '../constants';
import { 
  Cpu, Server, Layout, Gamepad2, Smartphone, ChevronRight, CheckCircle2, 
  Loader2, Globe, Database, Code2, Map, Layers, Box, FileCode
} from 'lucide-react';

interface Props {
  t: Translation['modules'];
}

// Icon mapper for Category (Card Icon)
const getCategoryIcon = (id: string) => {
  if (id === 'MOD-01') return <Layout size={24} />;
  if (id === 'MOD-02') return <Server size={24} />;
  if (id === 'MOD-03') return <Smartphone size={24} />;
  if (id === 'MOD-04') return <Cpu size={24} />;
  if (id === 'MOD-05') return <Gamepad2 size={24} />;
  if (id === 'MOD-06') return <Globe size={24} />; // Web3
  return <Box size={24} />;
};

// Icon mapper for specific skills inside the card
const getSkillIcon = (skillName: string) => {
  const s = skillName.toLowerCase();
  
  // Frontend
  if (s.includes('react')) return <Code2 size={12} />;
  if (s.includes('html') || s.includes('css')) return <Layout size={12} />;
  if (s.includes('sass') || s.includes('tailwind')) return <FileCode size={12} />;
  
  // GIS
  if (s.includes('map') || s.includes('gis')) return <Map size={12} />;
  
  // Backend
  if (s.includes('python') || s.includes('django') || s.includes('flask')) return <TerminalIcon size={12} />;
  if (s.includes('php') || s.includes('laravel')) return <Server size={12} />;
  if (s.includes('mysql') || s.includes('postgres') || s.includes('sql')) return <Database size={12} />;
  
  // Mobile
  if (s.includes('android') || s.includes('mobile')) return <Smartphone size={12} />;
  
  // DevOps
  if (s.includes('docker') || s.includes('container')) return <Box size={12} />;
  if (s.includes('git')) return <Layers size={12} />;
  
  // Web3
  if (s.includes('blockchain') || s.includes('web3') || s.includes('solidity')) return <Globe size={12} />;
  
  return <Code2 size={12} />;
};

// Custom Terminal Icon Component since it's used often
const TerminalIcon = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

export const ModulesGrid: React.FC<Props> = ({ t }) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <Section id="modules" title={t.title} subtitle={t.desc}>
      <p className="text-[10px] font-mono text-sys-subtext uppercase tracking-wider mb-4 opacity-70 text-right">
        {t.click_hint}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((mod) => {
          const isExpanded = expandedModule === mod.id;
          const isInstalling = mod.installationStatus === 'installing';

          return (
            <div 
              key={mod.id} 
              onClick={() => toggleModule(mod.id)}
              className={`
                bg-sys-base border rounded-sm p-6 cursor-pointer
                transition-all duration-300 relative group overflow-hidden
                ${isExpanded 
                    ? 'bg-sys-surface shadow-xl ring-1' 
                    : 'hover:bg-sys-surface/50'
                }
                ${isInstalling 
                    ? 'border-amber-500/30 ring-amber-500/20' 
                    : isExpanded ? 'border-sys-line ring-sys-accent/30' : 'border-sys-line'
                }
              `}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-sm border transition-colors duration-300 
                  ${isInstalling 
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                      : isExpanded 
                          ? 'bg-sys-accent text-white border-sys-accent' 
                          : 'bg-sys-surface text-sys-subtext border-sys-line group-hover:text-sys-accent group-hover:border-sys-accent/30'
                  }`}>
                  {isInstalling ? <Loader2 size={24} className="animate-spin" /> : getCategoryIcon(mod.id)}
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[10px] text-sys-subtext opacity-50 mb-1">{mod.id}</span>
                  <ChevronRight size={16} className={`text-sys-subtext transition-transform duration-300 ${isExpanded ? 'rotate-90 text-sys-accent' : ''}`} />
                </div>
              </div>

              {/* Title & Short Skills */}
              <div className="relative z-10">
                 <h3 className={`text-lg font-medium mb-3 transition-colors 
                    ${isInstalling 
                        ? 'text-amber-500' 
                        : isExpanded ? 'text-sys-accent' : 'text-sys-text'
                    }`}>
                    {mod.category.replace('Módulo Instalado: ', '').replace('Módulo Pendiente: ', '')}
                 </h3>

                 {isInstalling && (
                     <div className="mb-2 text-[10px] font-mono uppercase tracking-widest text-amber-500 animate-pulse border border-amber-500/30 px-2 py-1 inline-block rounded">
                         [ INSTALLATION IN PROGRESS... ]
                     </div>
                 )}
                 
                 {!isExpanded && (
                   <div className="flex flex-wrap gap-2">
                     {mod.skills.map((skill, idx) => (
                       <span key={idx} className="flex items-center gap-1.5 text-xs font-mono text-sys-subtext bg-sys-line/20 px-2 py-0.5 rounded-sm border border-transparent hover:border-sys-line transition-colors">
                         {getSkillIcon(skill)}
                         {skill}
                       </span>
                     ))}
                   </div>
                 )}
              </div>

              {/* Expanded Details */}
              <div className={`
                 grid overflow-hidden transition-all duration-500 ease-in-out relative z-10
                 ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-sys-line/50' : 'grid-rows-[0fr] opacity-0'}
              `}>
                 <div className="min-h-0">
                    <ul className="space-y-2">
                       {mod.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-sys-text/90">
                             {isInstalling ? (
                                <Loader2 size={14} className="text-amber-500 mt-0.5 shrink-0 animate-spin" />
                             ) : (
                                <CheckCircle2 size={14} className="text-sys-accent mt-0.5 shrink-0" />
                             )}
                             <span>{detail}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* Background Decoration */}
              <div className={`absolute -right-4 -bottom-4 opacity-5 transition-opacity duration-300 pointer-events-none ${isExpanded ? 'opacity-10' : ''}`}>
                 <div className="scale-[4] text-sys-text">
                   {getCategoryIcon(mod.id)}
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
