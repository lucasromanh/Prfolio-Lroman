
import React, { useState } from 'react';
import { Translation } from '../types';
import { Section } from './Section';
import { Terminal, Send, ArrowRight, Mail, Linkedin, Github } from 'lucide-react';

interface Props {
  t: Translation['contact'];
}

export const SystemActions: React.FC<Props> = ({ t }) => {
  const [input, setInput] = useState('');

  const handleCommand = (cmd: string) => {
    setInput(cmd);
    // Simulate system processing
    setTimeout(() => {
      if (cmd.includes('EMAIL')) {
          // Force mailto link
          window.location.href = 'mailto:lucasromanh@gmail.com';
      }
      if (cmd.includes('LINKEDIN')) window.open('https://www.linkedin.com/in/lucasromanh/', '_blank');
      if (cmd.includes('GITHUB')) window.open('https://github.com/lucasromanh', '_blank'); // Assuming GitHub user based on pattern
      setInput('');
    }, 800);
  };

  return (
    <Section id="contact" title={t.title} className="bg-sys-surface/10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#0c0a09] border border-sys-line rounded-sm shadow-xl overflow-hidden">
          
          {/* Fake Terminal Header */}
          <div className="bg-[#1c1917] px-4 py-2 border-b border-sys-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-sys-subtext" />
              <span className="text-xs font-mono text-sys-subtext">SYS.ROOT.EXEC</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-600"></div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-sm">
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 opacity-60">
                <span className="text-sys-accent">➜</span>
                <span>system ready for input...</span>
              </div>
              
              <div className="grid gap-3">
                <button 
                  onClick={() => handleCommand('EXECUTE_PROTOCOL: EMAIL_INIT')}
                  className="text-left p-3 border border-sys-line bg-sys-surface/50 hover:bg-sys-surface hover:border-sys-accent hover:text-sys-accent transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Mail size={16} /> {t.cmd_email}
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>

                <button 
                  onClick={() => handleCommand('EXECUTE_PROTOCOL: LINKEDIN_CONNECT')}
                  className="text-left p-3 border border-sys-line bg-sys-surface/50 hover:bg-sys-surface hover:border-sys-accent hover:text-sys-accent transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin size={16} /> {t.cmd_linkedin}
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>

                <button 
                  onClick={() => handleCommand('EXECUTE_PROTOCOL: GITHUB_ACCESS')}
                  className="text-left p-3 border border-sys-line bg-sys-surface/50 hover:bg-sys-surface hover:border-sys-accent hover:text-sys-accent transition-all flex items-center justify-between group"
                >
                   <span className="flex items-center gap-2">
                    <Github size={16} /> {t.cmd_github}
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
              </div>
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-3 border-t border-sys-line pt-4 text-sys-text">
              <span className="text-sys-accent animate-pulse">➜</span>
              <span className="text-sys-subtext">~</span>
              <input 
                type="text" 
                readOnly
                value={input}
                placeholder={t.placeholder}
                className="bg-transparent border-none outline-none w-full font-mono placeholder-sys-subtext/50 text-sys-text"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
