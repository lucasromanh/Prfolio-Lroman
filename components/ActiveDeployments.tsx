
import React, { useState, useEffect, useRef } from 'react';
import { Translation, Language, Project } from '../types';
import { Section } from './Section';
import { PROJECTS } from '../constants';
import { ExternalLink, Circle, X, Terminal, ChevronDown, ChevronUp, CornerDownLeft, Globe, Monitor, Radio, Code2, Database, LayoutTemplate, Box, Server, Smartphone, ShoppingCart, Map, Layers, Cpu, Activity } from 'lucide-react';

interface Props {
  t: Translation['deployments'];
  lang: Language;
}

// Extended suggestion type to include metadata
type SuggestionItem = {
  text: string;
  type: 'command' | 'project';
  status?: 'active' | 'maintenance' | 'archived' | 'offline';
};

// Helper function to map tech string to icon
const getTechIcon = (tech: string) => {
  const lower = tech.toLowerCase();
  
  // Specific Languages/Frameworks
  if (lower.includes('react') || lower.includes('next') || lower.includes('web')) return <LayoutTemplate size={10} />;
  if (lower.includes('python') || lower.includes('django') || lower.includes('flask')) return <Terminal size={10} />;
  if (lower.includes('laravel') || lower.includes('php')) return <Server size={10} />;
  if (lower.includes('sql') || lower.includes('data') || lower.includes('grid')) return <Database size={10} />;
  if (lower.includes('pwa') || lower.includes('mobile') || lower.includes('android')) return <Smartphone size={10} />;
  
  // Domains
  if (lower.includes('map') || lower.includes('gis') || lower.includes('leaf')) return <Map size={10} />;
  if (lower.includes('commerce') || lower.includes('shop') || lower.includes('market') || lower.includes('ticket')) return <ShoppingCart size={10} />;
  if (lower.includes('game') || lower.includes('interactive')) return <Cpu size={10} />;
  
  // General
  if (lower.includes('system') || lower.includes('admin')) return <Layers size={10} />;
  if (lower.includes('ai') || lower.includes('image')) return <Code2 size={10} />;
  
  return <Box size={10} />;
};

export const ActiveDeployments: React.FC<Props> = ({ t, lang }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showGlobalLogs, setShowGlobalLogs] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // Terminal Interaction State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  
  // Changed suggestions to store objects instead of strings
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1); 
  
  // New state to handle the "Press Enter to Launch" logic
  const [pendingLaunchUrl, setPendingLaunchUrl] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const suggestionsContainerRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (proj: Project) => {
    setSelectedProject(proj);
    setTerminalOutput([]); 
    setPendingLaunchUrl(null);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowGlobalLogs(false);
    setTerminalInput('');
    setTerminalOutput([]);
    setSuggestions([]);
    setSuggestionIndex(-1);
    setPendingLaunchUrl(null);
  };

  const toggleProjectList = () => {
    if (showAllProjects) {
      // Si estamos contrayendo, scrollear hacia el inicio de la sección
      const section = document.getElementById('deployments');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setShowAllProjects(!showAllProjects);
  };

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (showGlobalLogs && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showGlobalLogs]);

  // Auto-scroll logic for Logs
  useEffect(() => {
    if (showGlobalLogs && logsEndRef.current) {
      setTimeout(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 10);
    }
  }, [terminalOutput, showGlobalLogs]);

  // Auto-scroll logic for Suggestions List navigation
  useEffect(() => {
    if (suggestionIndex >= 0 && suggestionsContainerRef.current) {
      // +1 because the first child is the "Suggestions" header paragraph
      const activeElement = suggestionsContainerRef.current.children[suggestionIndex + 1] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [suggestionIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTerminalInput(val);
    setSuggestionIndex(-1); // Reset selection on typing
    
    if (pendingLaunchUrl) {
        setPendingLaunchUrl(null);
    }

    if (!val) {
      setSuggestions([]);
      return;
    }

    const lowerVal = val.toLowerCase();
    
    // 1. Search Commands
    const commands = ['help', 'clear', 'cls', 'exit', 'ls'];
    const matchingCommands: SuggestionItem[] = commands
        .filter(c => c.startsWith(lowerVal))
        .map(c => ({ text: c, type: 'command' }));

    // 2. Search Projects (Map to SuggestionItem with status)
    const matchingProjects: SuggestionItem[] = PROJECTS.flatMap(p => {
        const matchesId = p.id.toLowerCase().includes(lowerVal);
        const matchesName = p.name.toLowerCase().includes(lowerVal);
        
        const results: SuggestionItem[] = [];
        
        // Add ID match
        if (matchesId) {
            results.push({ text: p.id, type: 'project', status: p.status });
        }
        // Add Name match (if not same as ID, which is always true)
        if (matchesName) {
            results.push({ text: p.name, type: 'project', status: p.status });
        }
        
        return results;
    });

    // Deduplicate by text
    const combined = [...matchingCommands, ...matchingProjects];
    const uniqueMap = new Map();
    combined.forEach(item => {
        if(!uniqueMap.has(item.text)) uniqueMap.set(item.text, item);
    });

    // Convert back to array. Removed .slice() limit to show all results.
    setSuggestions(Array.from(uniqueMap.values()));
  };

  const executeCommand = (cmdRaw: string) => {
      const cmd = cmdRaw.trim().toLowerCase();
      if (!cmd) return;

      if (cmd === 'exit') {
        handleCloseModal();
        return;
      }

      if (cmd === 'clear' || cmd === 'cls') {
        setTerminalOutput([]);
        setTerminalInput('');
        setSuggestions([]);
        setSuggestionIndex(-1);
        setPendingLaunchUrl(null);
        return;
      }

      if (cmd === 'ls' || cmd === 'help') {
         setTerminalOutput(prev => [
            ...prev, 
            `root@sys-roman:~$ ${cmdRaw}`,
            `AVAILABLE COMMANDS:`,
            `  [project_id]   : Load project info (e.g. sys-001)`,
            `  [project_name] : Search project info`,
            `  exit           : Close terminal`,
            `  cls / clear    : Clear session`
         ]);
         setTerminalInput('');
         setSuggestions([]);
         setSuggestionIndex(-1);
         return;
      }

      const foundProject = PROJECTS.find(p => 
        p.id.toLowerCase() === cmd || 
        p.name.toLowerCase() === cmd || 
        p.name.toLowerCase().includes(cmd) 
      );

      if (foundProject) {
        const separator = `--------------------------------------------------`;
        const logs = [
            `root@sys-roman:~$ ${cmdRaw}`,
            `> SEARCHING_DATABASE... OK`,
            `> TARGET IDENTIFIED: [${foundProject.id}]`,
            separator,
            ` SYSTEM REPORT: ${foundProject.name.toUpperCase()}`,
            separator,
            ` ROLE:       ${foundProject.role[lang]}`,
            ` YEAR:       ${foundProject.year}`,
            ` STATUS:     ${foundProject.status.toUpperCase()}`,
            ` STACK:      [${foundProject.tech.join(', ')}]`,
            separator,
            ` DESCRIPTION:`,
            ` ${foundProject.description[lang]}`,
            separator,
        ];

        if (foundProject.url) {
             logs.push(`> TARGET URL: ${foundProject.url}`);
             if (foundProject.status === 'offline') {
                 logs.push(`> WARNING: SYSTEM IS CURRENTLY OFFLINE/DOWN.`);
             }
             logs.push(`> ACTION REQUIRED: Press [ENTER] to launch system.`);
             setPendingLaunchUrl(foundProject.url);
        } else {
             logs.push(`> NOTE: No public URL available for this module.`);
        }

        setTerminalOutput(prev => [...prev, ...logs]);
        setTerminalInput('');
        setSuggestions([]);
        setSuggestionIndex(-1);
      } else {
        setTerminalOutput(prev => [
            ...prev,
            `root@sys-roman:~$ ${cmdRaw}`,
            `ERR: Command or Module '${cmdRaw}' not found. Type 'ls' for list.`
        ]);
        setTerminalInput('');
        setSuggestions([]);
        setSuggestionIndex(-1);
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSuggestionIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
      }
    }
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
         setSuggestionIndex(prev => (prev > -1 ? prev - 1 : -1));
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      if (suggestionIndex >= 0 && suggestions[suggestionIndex]) {
          const selectedCmd = suggestions[suggestionIndex].text;
          setTerminalInput(selectedCmd); 
          executeCommand(selectedCmd);
          return;
      }

      if (pendingLaunchUrl && terminalInput.trim() === '') {
          window.open(pendingLaunchUrl, '_blank');
          setTerminalOutput(prev => [
              ...prev,
              `> INITIATING LAUNCH SEQUENCE...`,
              `> OPENING EXTERNAL CONNECTION...`,
              `> DONE.`
          ]);
          setPendingLaunchUrl(null);
          return;
      }

      executeCommand(terminalInput);
    }
    
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const toSelect = suggestionIndex >= 0 ? suggestions[suggestionIndex].text : suggestions[0].text;
        setTerminalInput(toSelect);
        setSuggestions([]);
        setSuggestionIndex(-1);
      }
    }
  };

  const getLogTime = (offsetSeconds: number) => {
    const d = new Date();
    d.setSeconds(d.getSeconds() + offsetSeconds);
    return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
  };

  const INITIAL_COUNT = 3;
  const visibleProjects = showAllProjects ? PROJECTS : PROJECTS.slice(0, INITIAL_COUNT);

  // Helper for status dot color in suggestion box
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]';
      case 'maintenance': return 'bg-amber-500';
      case 'offline': return 'bg-red-500';
      case 'archived': return 'bg-indigo-500';
      default: return 'bg-sys-subtext';
    }
  };

  return (
    <>
      <Section id="deployments" title={t.title} subtitle={t.subtitle}>
        
        <div className="mb-6 flex items-start gap-3 p-3 bg-sys-surface border border-sys-line/70 rounded-sm text-xs font-mono text-sys-subtext shadow-sm">
            <Radio className="text-sys-accent shrink-0 animate-pulse mt-0.5" size={16} />
            <p className="leading-relaxed">{t.real_time_note}</p>
        </div>

        <div className="w-full overflow-hidden border border-sys-line rounded-sm bg-sys-surface shadow-md">
          <div className="hidden md:flex items-center bg-sys-base/50 border-b border-sys-line px-6 py-4 text-xs font-mono font-semibold text-sys-subtext tracking-wider uppercase">
            <div className="w-24 text-center">SYS.IMG</div>
            <div className="flex-1 pl-4">System Name</div>
            <div className="w-40">{t.status_header}</div>
            <div className="w-48">{t.tech_header}</div>
            <div className="w-24 text-right">ID</div>
          </div>

          <div className="divide-y divide-sys-line">
            {visibleProjects.map((proj) => (
              <div 
                key={proj.id} 
                onClick={() => handleProjectClick(proj)}
                className="group flex flex-col md:flex-row md:items-center px-6 py-6 md:py-4 hover:bg-sys-line/20 transition-colors duration-200 cursor-pointer animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="md:hidden flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-sys-subtext">{proj.id}</span>
                  <span className="font-mono text-xs text-sys-subtext">{proj.year}</span>
                </div>
                
                {/* Desktop Thumbnail Column */}
                <div className="hidden md:flex w-24 h-[54px] bg-sys-base border border-sys-line rounded-sm items-center justify-center overflow-hidden relative shrink-0">
                    {proj.url ? (
                        <>
                            {/* Background Placeholder - visible while loading or on error */}
                            <div className="absolute inset-0 flex items-center justify-center bg-sys-surface/50">
                                <Monitor size={14} className="text-sys-subtext opacity-30" />
                            </div>
                            
                            <img 
                                src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(proj.url)}?w=1280&h=720`}
                                alt="System Preview"
                                className="w-full h-full object-cover relative z-10 opacity-60 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
                                loading="lazy"
                                onError={(e) => {
                                    // Hide the broken image so the placeholder behind it shows clearly
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </>
                    ) : (
                        <Monitor size={18} className="text-sys-subtext opacity-50" />
                    )}
                </div>
                
                <div className="flex-1 md:pl-4 pr-4">
                  <div className="flex items-baseline gap-2">
                      <h4 className="text-base font-semibold text-sys-text group-hover:text-sys-accent transition-colors">
                      {proj.name}
                      </h4>
                      <span className="md:hidden inline-block ml-2 w-2 h-2 bg-sys-accent rounded-full"></span>
                  </div>
                  <p className="text-sm text-sys-subtext mt-1 max-w-xl group-hover:text-sys-text/80 transition-colors">{proj.description[lang]}</p>
                </div>

                <div className="w-40 mt-4 md:mt-0 flex items-center gap-2">
                  <Circle size={8} className={`
                    ${proj.status === 'active' ? 'fill-emerald-500 text-emerald-500 animate-pulse' : ''}
                    ${proj.status === 'maintenance' ? 'fill-amber-500 text-amber-500' : ''}
                    ${proj.status === 'offline' ? 'fill-red-500 text-red-500' : ''}
                    ${proj.status === 'archived' ? 'fill-sys-line text-sys-subtext' : ''}
                  `} />
                  <span className="text-xs font-mono uppercase tracking-wide text-sys-text">
                    {proj.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="w-48 mt-4 md:mt-0 flex flex-wrap gap-1">
                  {proj.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-sys-base border border-sys-line text-sys-subtext group-hover:border-sys-accent/30 group-hover:text-sys-accent transition-colors">
                      {getTechIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ID Column at the end */}
                <div className="hidden md:block w-24 text-right font-mono text-xs text-sys-subtext/70 group-hover:text-sys-accent transition-colors">
                  {proj.id}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
           <button 
             onClick={toggleProjectList}
             className="text-xs font-mono text-sys-subtext hover:text-sys-accent flex items-center gap-1 font-medium transition-colors border border-transparent hover:border-sys-line px-2 py-1 rounded-sm"
           >
              {showAllProjects ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showAllProjects ? t.view_less : t.view_more}
           </button>

           <button 
             onClick={() => setShowGlobalLogs(true)}
             className="relative group overflow-hidden px-4 py-2 rounded-sm bg-sys-surface border border-sys-accent/50 text-sys-accent font-mono text-xs font-bold tracking-wider hover:bg-sys-accent hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(13,148,136,0.2)] flex items-center gap-2"
           >
              <Terminal size={14} className="group-hover:animate-pulse" />
              <span className="relative z-10">{t.view_logs}</span>
              <div className="absolute inset-0 bg-sys-accent/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
           </button>
        </div>
      </Section>

      {/* Modal / Terminal Code remains largely same, just ensuring icons used if needed, but not critical for terminal text output */}
      {(selectedProject || showGlobalLogs) && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0f172a] border border-sys-line rounded shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="bg-[#1e293b] px-4 py-3 border-b border-sys-line flex items-center justify-between">
              <div className="flex items-center gap-2 text-sys-accent">
                <Terminal size={16} />
                <span className="font-mono text-xs font-bold tracking-wider">
                  {selectedProject && !showGlobalLogs 
                    ? `SYS_INFO: ${selectedProject.id}` 
                    : selectedProject 
                        ? `SYS_NAV: /${selectedProject.id}` 
                        : 'SYSTEM_ROOT_ACCESS'
                  }
                </span>
              </div>
              <button onClick={handleCloseModal} className="text-sys-subtext hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div 
              className="p-6 font-mono text-sm h-[500px] overflow-y-auto custom-scrollbar relative bg-[#0f172a]"
              onClick={() => showGlobalLogs && !selectedProject && inputRef.current?.focus()} 
            >
              {showGlobalLogs && !selectedProject ? (
                 <div className="space-y-2 pb-2">
                    <p className="text-sys-accent">root@sys-roman:~$ view_all_logs --verbose</p>
                    
                    <p className="text-sys-subtext">
                      [{getLogTime(0)}] {lang === 'es' ? 'Kernel del sistema inicializado.' : 'System kernel initialized.'}
                    </p>

                    {PROJECTS.map((proj, idx) => (
                      <p key={proj.id} className="text-sys-subtext flex flex-wrap gap-2 items-center">
                        <span className="whitespace-nowrap">[{getLogTime(idx * 2 + 3)}]</span>
                        <span className="text-blue-400 font-bold">[{proj.id}]</span>
                        <span>{lang === 'es' ? 'Cargando módulo:' : 'Loading module:'} {proj.name}...</span>
                        
                        {proj.status === 'active' ? (
                           <span className="text-emerald-500 font-bold ml-auto">{lang === 'es' ? 'LISTO' : 'DONE'}</span>
                        ) : proj.status === 'maintenance' ? (
                           <span className="text-amber-500 font-bold ml-auto">{lang === 'es' ? 'MANTENIMIENTO' : 'MAINTENANCE'}</span>
                        ) : proj.status === 'offline' ? (
                           <span className="text-red-500 font-bold ml-auto">{lang === 'es' ? 'OFFLINE' : 'OFFLINE'}</span>
                        ) : (
                           <span className="text-indigo-400 font-bold decoration-slice ml-auto">
                              {lang === 'es' ? '[ARCHIVADO]' : '[ARCHIVED]'}
                           </span>
                        )}
                      </p>
                    ))}

                    <p className="text-sys-subtext border-b border-sys-line/30 pb-4 mb-4">
                       [{getLogTime(PROJECTS.length * 2 + 8)}] {lang === 'es' ? 'Sesión de usuario iniciada.' : 'User session started.'}
                    </p>

                    {terminalOutput.map((line, i) => (
                        <p key={i} className={`text-sys-text whitespace-pre-wrap leading-relaxed ${line.includes('ACTION REQUIRED') ? 'animate-pulse text-sys-accent font-bold' : ''}`}>
                            {line}
                        </p>
                    ))}

                    {/* Suggestions Area with Infinite Scroll */}
                    {suggestions.length > 0 && (
                        <div 
                           ref={suggestionsContainerRef}
                           className="ml-0 md:ml-[140px] my-2 bg-sys-base border border-sys-line rounded shadow-lg w-max min-w-[220px] max-w-[300px] relative z-50 max-h-[200px] overflow-y-auto custom-scrollbar"
                        >
                            <div className="sticky top-0 bg-sys-base p-2 border-b border-sys-line z-10">
                                <p className="text-[10px] text-sys-subtext uppercase">
                                    {lang === 'es' ? 'Sugerencias (TAB/ENTER)' : 'Suggestions (TAB/ENTER)'}
                                </p>
                            </div>
                            
                            {suggestions.map((s, idx) => (
                                <div 
                                    key={`${s.text}-${idx}`} 
                                    className={`cursor-pointer px-3 py-1.5 transition-colors flex justify-between items-center gap-4 text-xs
                                      ${idx === suggestionIndex 
                                        ? 'bg-sys-line text-white font-bold' 
                                        : 'text-sys-subtext hover:bg-sys-line/50 hover:text-white'
                                      }
                                    `}
                                    onClick={(e) => { 
                                      e.stopPropagation(); 
                                      setTerminalInput(s.text); 
                                      setSuggestions([]); 
                                      setSuggestionIndex(-1);
                                      inputRef.current?.focus(); 
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        {s.type === 'project' && (
                                            <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(s.status)}`}></div>
                                        )}
                                        <span>{s.text}</span>
                                    </div>
                                    {idx === suggestionIndex && <span className="text-[10px] opacity-50">↵</span>}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                       <span className={`whitespace-nowrap ${pendingLaunchUrl ? 'text-sys-accent animate-pulse' : 'text-emerald-500'}`}>
                           {pendingLaunchUrl ? 'confirm_launch [ENTER]:~$' : 'root@sys-roman:~$'}
                       </span>
                       <input 
                          ref={inputRef}
                          type="text" 
                          value={terminalInput}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          className="bg-transparent border-none outline-none text-sys-text flex-1 caret-emerald-500 w-full min-w-0"
                          placeholder={pendingLaunchUrl ? "" : (lang === 'es' ? "Ingresar ID o Nombre... (ej: SYS-GEO)" : "Enter ID or Name... (ex: SYS-GEO)")}
                          autoComplete="off"
                       />
                       {terminalInput.length === 0 && !pendingLaunchUrl && <span className="animate-pulse w-2 h-4 bg-emerald-500/50 block"></span>}
                    </div>
                    <div ref={logsEndRef} className="h-4" />
                 </div>
              ) : (
                selectedProject && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl text-white font-sans font-medium mb-1">{selectedProject.name}</h3>
                        <p className="text-sys-subtext text-xs tracking-wider uppercase font-bold">{selectedProject.role[lang]}</p>
                      </div>
                      <button 
                        onClick={() => { setSelectedProject(null); setShowGlobalLogs(true); }}
                        className="text-xs text-sys-link hover:underline flex items-center gap-1"
                      >
                         <CornerDownLeft size={12} /> {lang === 'es' ? 'VOLVER A CONSOLA' : 'BACK TO CONSOLE'}
                      </button>
                    </div>

                    <div className="relative w-full aspect-video bg-[#020617] border border-sys-line rounded-sm flex items-center justify-center overflow-hidden group shadow-inner">
                       
                       {selectedProject.url ? (
                          <div className="absolute inset-0 w-full h-full bg-sys-base">
                             <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30">
                                 <Monitor size={48} className="text-sys-subtext" />
                                 <span className="font-mono text-[10px] text-sys-subtext">SYS.PREVIEW_GENERATING</span>
                             </div>
                             
                             <img 
                                src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(selectedProject.url)}?w=1280&h=720`}
                                alt={`System Interface: ${selectedProject.name}`}
                                className="relative z-10 w-full h-full object-cover object-top opacity-80 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                                loading="lazy"
                             />
                          </div>
                       ) : (
                         <div className="relative z-10 flex flex-col items-center gap-2 opacity-50">
                           <Globe className="text-sys-line" size={48} />
                           <span className="font-mono text-xs text-sys-subtext uppercase tracking-widest border border-sys-line px-2 py-1 rounded">
                              {lang === 'es' ? 'VISTA NO DISPONIBLE' : 'PREVIEW UNAVAILABLE'}
                           </span>
                         </div>
                       )}

                       <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

                       <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 backdrop-blur-[2px]">
                          {selectedProject.url && (
                            <a 
                              href={selectedProject.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-sys-accent text-white px-6 py-3 rounded-sm font-mono text-xs font-bold flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-[0_0_15px_rgba(13,148,136,0.5)] border border-white/10"
                            >
                              <ExternalLink size={16} /> {t.launch}
                            </a>
                          )}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 p-4 bg-sys-base border border-sys-line rounded-sm">
                       <div>
                          <p className="text-[10px] uppercase text-sys-subtext mb-2 tracking-widest">DETAILS</p>
                          <p className="text-sys-text text-sm mb-1 font-semibold">{selectedProject.year}</p>
                          <div className="flex items-center gap-2">
                            <Circle size={8} className={`
                              ${selectedProject.status === 'active' ? 'fill-emerald-500 text-emerald-500' : ''}
                              ${selectedProject.status === 'maintenance' ? 'fill-amber-500 text-amber-500' : ''}
                              ${selectedProject.status === 'offline' ? 'fill-red-500 text-red-500' : ''}
                              ${selectedProject.status === 'archived' ? 'fill-sys-line text-sys-subtext' : ''}
                            `} />
                            <span className="uppercase text-sys-text text-xs">{selectedProject.status}</span>
                          </div>
                       </div>
                       <div>
                          <p className="text-[10px] uppercase text-sys-subtext mb-2 tracking-widest">DESCRIPTION</p>
                          <p className="text-sys-subtext text-xs leading-relaxed">{selectedProject.description[lang]}</p>
                       </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-sys-subtext mb-3 tracking-widest">TECHNICAL STACK</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map(t => (
                          <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 bg-sys-surface border border-sys-line text-xs text-sys-accent rounded-sm font-mono hover:bg-sys-accent/10 cursor-default">
                            {getTechIcon(t)}
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-sys-line border-dashed">
                       {selectedProject.url ? (
                         <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs">
                            <Terminal size={12} />
                            <span>System is LIVE at: </span>
                            <a href={selectedProject.url} target="_blank" rel="noreferrer" className="underline hover:text-emerald-400">
                                {selectedProject.url}
                            </a>
                         </div>
                       ) : (
                        <div className="flex items-center gap-2 text-sys-subtext font-mono text-xs">
                           <Terminal size={12} />
                           <span>System URL not public or restricted access.</span>
                        </div>
                       )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
