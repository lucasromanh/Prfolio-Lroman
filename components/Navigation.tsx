
import React, { useState, useEffect } from 'react';
import { Translation, Language } from '../types';
import { Menu, X, Command, FileText, Download, LayoutDashboard, BarChart3, Box, Activity, Terminal, User } from 'lucide-react';

interface Props {
  t: Translation['nav'];
  lang: Language;
  setLang: (l: Language) => void;
}

export const Navigation: React.FC<Props> = ({ t, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [imgError, setImgError] = useState(false);

  // Mapped icons for the sidebar
  const getIcon = (id: string) => {
    switch(id) {
      case 'overview': return <LayoutDashboard size={18} />;
      case 'metrics': return <BarChart3 size={18} />;
      case 'modules': return <Box size={18} />;
      case 'deployments': return <Activity size={18} />;
      case 'contact': return <Terminal size={18} />;
      default: return <LayoutDashboard size={18} />;
    }
  };

  const links = [
    { id: 'overview', label: t.overview },
    { id: 'metrics', label: t.metrics },
    { id: 'modules', label: t.modules },
    { id: 'deployments', label: t.deployments },
    { id: 'contact', label: t.contact },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleDownloadCV = () => {
    // Dynamic download based on selected language
    if (lang === 'es') {
        window.open('/Cv-Lucas-Roman.pdf', '_blank');
    } else {
        window.open('/Lucas_Roman_CV_EN.pdf', '_blank');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 300; 

      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
           setActiveSection(section.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <>
      {/* 
        DESKTOP SIDEBAR - DARK THEME INTEGRATION
        Background: Slate 950 (#020617) - Slightly darker than main content for depth.
        Border: sys-line (Slate 700)
        Text: sys-subtext / sys-text
      */}
      <nav className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-72 border-r border-sys-line bg-[#020617] z-50 justify-between">
        
        {/* Top: Header & Identity */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 text-sys-text mb-8 cursor-pointer" onClick={() => scrollTo('overview')}>
            <div className="w-8 h-8 bg-sys-surface border border-sys-line text-sys-accent flex items-center justify-center rounded-sm shadow-sm">
                <Command size={16} />
            </div>
            <div>
                <span className="block font-mono text-sm font-bold tracking-tight text-sys-text">SYS.ROMÁN</span>
                <span className="block font-mono text-[10px] text-sys-subtext tracking-widest">V.2.0.4</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 px-1">
             <span className="text-[10px] font-mono text-sys-subtext uppercase tracking-wider">Navigation</span>
             <button 
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="font-mono text-[10px] font-bold border border-sys-line bg-sys-surface px-2 py-0.5 rounded shadow-sm hover:border-sys-accent hover:text-sys-accent transition-colors uppercase text-sys-subtext"
              >
                {lang === 'en' ? 'ES' : 'EN'}
              </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
             {links.map((link) => (
               <button 
                 key={link.id}
                 onClick={() => scrollTo(link.id)}
                 className={`group flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 border border-transparent ${activeSection === link.id ? 'bg-sys-surface/50 shadow-sm border-sys-line text-sys-text' : 'text-sys-subtext hover:bg-sys-surface/30 hover:text-sys-text'}`}
               >
                  <span className={`${activeSection === link.id ? 'text-sys-accent' : 'opacity-70 group-hover:opacity-100 group-hover:text-sys-accent'}`}>
                    {getIcon(link.id)}
                  </span>
                  <span className="font-sans text-xs font-medium tracking-wide">
                    {link.label.replace(/^\d+_/, '')}
                  </span>
                  {activeSection === link.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sys-accent animate-pulse"></div>
                  )}
               </button>
             ))}
          </div>
        </div>

        {/* Bottom: User Profile / Download CV Section */}
        <div className="p-4 border-t border-sys-line bg-[#0f172a]">
            <button 
              onClick={handleDownloadCV}
              className="w-full flex items-center gap-3 p-3 rounded-md bg-sys-surface border border-sys-line shadow-sm hover:border-sys-accent/50 hover:shadow-md transition-all group text-left"
            >
              {/* Profile Image with Fallback */}
              <div className="w-12 h-12 rounded-full bg-sys-base border border-sys-line flex items-center justify-center overflow-hidden shrink-0 relative">
                 {!imgError ? (
                    <img 
                      src="/LucasROman-Porfolio.png" 
                      alt="Lucas Roman" 
                      className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-500 scale-105"
                      onError={() => setImgError(true)}
                    />
                 ) : (
                    <div className="flex items-center justify-center w-full h-full text-sys-subtext group-hover:text-sys-accent group-hover:bg-sys-accent/10 transition-colors">
                        <User size={20} />
                    </div>
                 )}
              </div>
              
              <div className="flex-1 min-w-0 ml-1">
                <p className="text-sm font-bold text-sys-text truncate group-hover:text-white transition-colors">Lucas Román</p>
                <div className="flex items-center gap-1.5 text-[10px] text-sys-subtext font-mono mt-1 group-hover:text-sys-accent transition-colors">
                   <Download size={12} />
                   <span className="tracking-wider">{t.cv_download}</span>
                </div>
              </div>
            </button>
        </div>
      </nav>

      {/* Top Bar (Mobile Only) */}
      <div className="fixed lg:hidden top-0 left-0 right-0 z-40 bg-sys-base/90 backdrop-blur-md border-b border-sys-line h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-sys-text" onClick={() => scrollTo('overview')}>
          <Command size={20} />
          <span className="font-mono font-bold tracking-tight">SYS.ROMÁN</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="font-mono text-xs font-medium border border-sys-line px-2 py-1 rounded hover:bg-sys-surface transition-colors text-sys-text"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          
          <button onClick={() => setIsOpen(!isOpen)} className="text-sys-text">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-sys-base flex flex-col pt-24 px-6 gap-6 lg:hidden">
          {links.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left py-4 border-b border-sys-line font-mono text-sm tracking-widest text-sys-text hover:text-sys-accent"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={handleDownloadCV}
            className="mt-4 flex items-center gap-2 text-sys-accent font-mono text-sm border border-sys-accent/30 p-3 justify-center rounded-sm bg-sys-accent/5"
          >
            <Download size={16} />
            {t.cv_download}
          </button>
        </div>
      )}
    </>
  );
};
