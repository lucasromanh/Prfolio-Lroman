
import React, { useState } from 'react';
import { Translation, Language } from '../types';
import { Section } from './Section';
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Briefcase, Building2, Leaf, Headphones, ChevronDown, Plus, Minus, GitCommit, Database, Layers, Brain, MessageSquare, Users, Flag, Puzzle, RefreshCw, BrainCircuit, Timer, BookOpen } from 'lucide-react';
import { WORK_HISTORY } from '../constants';

interface Props {
  t: Translation['metrics'];
  lang?: Language;
}

// Data now tells a story: Systems (Quantity) vs Knowledge (Stack Quality) + Milestone Text
const data = [
  { 
    name: '2021', 
    systems: 3, 
    stack: 15, 
    milestone_es: 'Inicio: LuchaFit & PHP Legacy',
    milestone_en: 'Init: LuchaFit & PHP Legacy'
  },
  { 
    name: '2022', 
    systems: 8, 
    stack: 35, 
    milestone_es: 'Startup: SaltaCoders & La Ticketera',
    milestone_en: 'Startup: SaltaCoders & La Ticketera'
  },
  { 
    name: '2023', 
    systems: 15, 
    stack: 55, 
    milestone_es: 'Expansión: EcoMap, InmoSalta, React',
    milestone_en: 'Expansion: EcoMap, InmoSalta, React'
  },
  { 
    name: '2024', 
    systems: 22, 
    stack: 75, 
    milestone_es: 'GovTech: App Salta & GeoSurface',
    milestone_en: 'GovTech: App Salta & GeoSurface'
  },
  { 
    name: '2025', 
    systems: 25, 
    stack: 85, 
    milestone_es: 'Optimización: Refactor & Arquitectura',
    milestone_en: 'Optimization: Refactor & Architecture'
  }, 
  { 
    name: '2026', 
    systems: 28, 
    stack: 95, 
    milestone_es: 'Enterprise: ISO 14001 & Turismo',
    milestone_en: 'Enterprise: ISO 14001 & Tourism'
  }, 
];

// Define Soft Skills Data with Icons - FULL TEXT
const SOFT_SKILLS = [
  { id: 'comm', icon: MessageSquare, es: 'Comunicación Efectiva', en: 'Effective Communication' },
  { id: 'team', icon: Users, es: 'Trabajo en Equipo', en: 'Teamwork' },
  { id: 'lead', icon: Flag, es: 'Liderazgo Técnico', en: 'Technical Leadership' },
  { id: 'solve', icon: Puzzle, es: 'Resolución de Problemas', en: 'Problem Solving' },
  { id: 'adapt', icon: RefreshCw, es: 'Adaptabilidad', en: 'Adaptability' },
  { id: 'crit', icon: BrainCircuit, es: 'Pensamiento Crítico', en: 'Critical Thinking' },
  { id: 'time', icon: Timer, es: 'Gestión del Tiempo', en: 'Time Management' },
  { id: 'learn', icon: BookOpen, es: 'Aprendizaje Continuo', en: 'Continuous Learning' }
];

// Custom Tooltip to show the milestone
const CustomTooltip = ({ active, payload, label, lang }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const milestone = lang === 'es' ? dataPoint.milestone_es : dataPoint.milestone_en;
    
    return (
      <div className="bg-[#0f172a] border border-sys-line p-3 shadow-xl rounded-sm max-w-[250px]">
        <p className="text-sys-accent font-mono text-xs font-bold mb-1 border-b border-sys-line/30 pb-1">
          [{label}] SYSTEM LOG
        </p>
        <p className="text-white text-sm font-medium mb-3 leading-tight">
          {milestone}
        </p>
        <div className="space-y-1">
          <p className="text-xs text-sys-subtext flex justify-between">
            <span>{lang === 'es' ? 'Sistemas:' : 'Systems:'}</span>
            <span className="text-emerald-400 font-mono">{dataPoint.systems}</span>
          </p>
          <p className="text-xs text-sys-subtext flex justify-between">
            <span>Stack Level:</span>
            <span className="text-indigo-400 font-mono">{dataPoint.stack}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const MetricsPanel: React.FC<Props> = ({ t, lang = 'es' }) => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const toggleJob = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const getJobIcon = (id: string) => {
    if (id.includes('VECTRA')) return <Leaf size={18} />;
    if (id.includes('MUNI-C')) return <Headphones size={18} />;
    if (id.includes('MUNI-S')) return <Building2 size={18} />;
    if (id.includes('SALTACODERS')) return <Briefcase size={18} />;
    return <Briefcase size={18} />;
  };

  const visibleJobs = showAllJobs ? WORK_HISTORY : WORK_HISTORY.slice(0, 4);

  return (
    <Section id="metrics" title={t.title}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* KPI Cards - Left Column */}
        <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          
          {/* Card 1: Systems Deployed */}
          <div className="p-6 bg-sys-surface border border-sys-line rounded-sm shadow-lg relative overflow-hidden group hover:border-sys-accent/30 transition-colors h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-sys-accent">
              <Layers size={64} />
            </div>
            <div>
                <h3 className="text-xs font-mono text-sys-subtext uppercase mb-2 tracking-wider flex items-center gap-2">
                <Database size={12} /> {t.projects}
                </h3>
                <div className="text-5xl font-sans font-light text-sys-text tracking-tighter">20<span className="text-sys-accent text-3xl">+</span></div>
            </div>
            <p className="text-xs text-sys-subtext mt-4 font-mono border-t border-sys-line/30 pt-2">
               {lang === 'es' ? 'Sistemas desplegados & activos' : 'Deployed & active systems'}
            </p>
          </div>

          {/* Card 2: Soft Skills (Compact & Icons) */}
          <div className="p-6 bg-sys-surface border border-sys-line rounded-sm shadow-lg hover:border-sys-accent/30 transition-colors flex flex-col h-full">
            <h3 className="text-xs font-mono text-sys-subtext uppercase mb-4 tracking-wider flex items-center gap-2">
              <Brain size={12} /> {t.soft_skills}
            </h3>
            
            {/* Icons Grid */}
            <div className="flex-1 grid grid-cols-4 gap-3 items-center justify-items-center mb-4">
              {SOFT_SKILLS.map((skill) => (
                <div 
                    key={skill.id}
                    onMouseEnter={() => setHoveredSkill(lang === 'es' ? skill.es : skill.en)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="w-10 h-10 rounded-sm bg-sys-base border border-sys-line flex items-center justify-center text-sys-subtext hover:text-sys-accent hover:border-sys-accent hover:bg-sys-accent/10 transition-all cursor-pointer group relative"
                >
                   <skill.icon size={18} strokeWidth={1.5} />
                </div>
              ))}
            </div>

            {/* Readout Display - Fixed height removed, min-height added for wrapping */}
            <div className="min-h-[3rem] h-auto py-2 bg-[#0f172a] border border-sys-line/50 rounded-sm flex items-center justify-center px-3">
                <p className={`font-mono text-xs uppercase text-center leading-tight tracking-tight transition-all duration-300 ${hoveredSkill ? 'text-sys-accent' : 'text-sys-subtext/30'}`}>
                    {hoveredSkill ? `> ${hoveredSkill}` : '...'}
                </p>
            </div>
          </div>
        </div>

        {/* Evolution Chart - Right Column */}
        <div className="lg:col-span-2 p-6 bg-sys-surface border border-sys-line rounded-sm shadow-lg flex flex-col h-full min-h-[300px]">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-xs font-mono text-sys-subtext uppercase flex items-center gap-2 font-bold tracking-widest">
                <span className="w-2 h-2 bg-sys-accent animate-pulse rounded-full"></span>
                {lang === 'es' ? 'EVOLUCIÓN DEL SISTEMA' : 'SYSTEM EVOLUTION'}
             </h3>
             <div className="flex gap-4 md:gap-6 text-[10px] font-mono text-sys-subtext">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded-sm"></span> 
                  <span className="hidden sm:inline">{lang === 'es' ? 'SISTEMAS' : 'SYSTEMS'}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-indigo-400"></span> 
                  <span className="hidden sm:inline">STACK</span>
                </span>
             </div>
          </div>
          
          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#94a3b8'}} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip lang={lang} />} cursor={{fill: 'rgba(255,255,255,0.03)'}} />
                
                {/* Systems Bar */}
                <Bar 
                  dataKey="systems" 
                  barSize={32} 
                  fill="url(#barGradient)" 
                  radius={[2, 2, 0, 0]} 
                  animationDuration={1500}
                />
                
                {/* Stack Line */}
                <Line 
                  type="monotone" 
                  dataKey="stack" 
                  stroke="#818cf8" 
                  strokeWidth={2} 
                  dot={{r: 4, fill: '#1e293b', stroke: '#818cf8', strokeWidth: 2}} 
                  activeDot={{r: 6, fill: '#818cf8', stroke: '#fff'}}
                  animationDuration={2000}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-sys-subtext/50 font-mono text-center mt-4 border-t border-sys-line/20 pt-2">
            {lang === 'es' ? 'HOVER PARA VER HITOS ANUALES' : 'HOVER TO SEE YEARLY MILESTONES'}
          </p>
        </div>
      </div>

      {/* Work Experience Logs */}
      <div className="mt-12">
        <h3 className="text-sm font-mono tracking-widest text-sys-text font-semibold uppercase mb-6 flex items-center gap-2 border-b border-sys-line/50 pb-2">
            // {t.work_title}
        </h3>
        <div className="space-y-3">
            {visibleJobs.map((job) => {
                const isExpanded = expandedJob === job.id;
                const isHighPriority = job.priority === 'high';
                
                return (
                    <div 
                        key={job.id} 
                        className={`border rounded-sm transition-all duration-300 overflow-hidden cursor-pointer group relative
                            ${isHighPriority 
                                ? 'bg-sys-surface/80 border-sys-accent/30 hover:border-sys-accent/60' 
                                : 'bg-sys-base border-sys-line hover:border-sys-line/80'
                            }
                            ${isExpanded ? 'shadow-lg ring-1 ring-sys-accent/20 bg-sys-surface' : ''}
                        `}
                        onClick={() => toggleJob(job.id)}
                    >
                        {isHighPriority && (
                           <div className="absolute top-0 left-0 w-1 h-full bg-sys-accent/50"></div>
                        )}

                        <div className="p-4 flex items-center justify-between pl-5">
                            <div className="flex items-center gap-4">
                                <div className={`hidden md:flex p-2 rounded-full border ${isHighPriority ? 'bg-sys-accent/10 border-sys-accent text-sys-accent' : 'bg-sys-line/20 border-sys-line text-sys-subtext'}`}>
                                    {getJobIcon(job.id)}
                                </div>
                                <div>
                                    <h4 className={`font-medium text-sm md:text-base ${isHighPriority ? 'text-white' : 'text-sys-text'} group-hover:text-sys-accent transition-colors`}>
                                        {job.company}
                                    </h4>
                                    <p className="text-[10px] md:text-xs font-mono text-sys-subtext uppercase tracking-wide mt-0.5">
                                        <span className="text-sys-text">{job.role[lang]}</span>
                                        <span className="opacity-30 mx-2">|</span> 
                                        {job.period}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {isHighPriority && (
                                    <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-mono rounded uppercase animate-pulse">
                                        Active
                                    </span>
                                )}
                                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                  <ChevronDown size={16} className="text-sys-subtext" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Expanded Details */}
                        <div className={`
                            bg-black/20 border-t border-sys-line/30 transition-all duration-300 ease-in-out px-5 md:px-16
                            ${isExpanded ? 'max-h-60 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}
                        `}>
                            <p className="text-sm text-sys-text/90 leading-relaxed mb-4 font-light">
                                {job.description[lang]}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-mono text-sys-subtext bg-sys-line/30 px-2 py-1 rounded-sm border border-transparent hover:border-sys-line transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        
        {/* Toggle View More Button */}
        <div className="mt-8 flex justify-center">
            <button 
                onClick={() => setShowAllJobs(!showAllJobs)}
                className="group flex items-center gap-2 px-6 py-2 border border-sys-line rounded-full bg-sys-surface/50 text-xs font-mono text-sys-subtext hover:text-white hover:border-sys-accent hover:bg-sys-accent/10 transition-all tracking-widest uppercase"
            >
                <div className="transition-transform duration-300 group-hover:rotate-180">
                  {showAllJobs ? <Minus size={14} /> : <Plus size={14} />}
                </div>
                {showAllJobs ? (lang === 'es' ? 'CONTRAER REGISTROS' : 'COLLAPSE LOGS') : (lang === 'es' ? 'VER HISTORIAL COMPLETO' : 'VIEW FULL LOGS')}
            </button>
        </div>
      </div>
    </Section>
  );
};
