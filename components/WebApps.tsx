import React from 'react';
import { Translation } from '../types';
import { Section } from './Section';
import { Smartphone, Monitor } from 'lucide-react';

interface Props {
  t: Translation['apps'];
}

export const WebApps: React.FC<Props> = ({ t }) => {
  return (
    <Section id="apps" title={t.title}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Abstract representation of a Web App - PWA */}
        <div className="block group cursor-pointer">
          <div className="relative aspect-video bg-sys-surface border border-sys-line rounded-sm overflow-hidden mb-4">
             {/* Abstract UI representation */}
             <div className="absolute inset-0 p-4 flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="w-1/3 h-2 bg-sys-line rounded-full"></div>
                <div className="w-full h-32 bg-sys-base border border-sys-line rounded-sm flex items-center justify-center">
                    <Smartphone className="text-sys-subtext" size={32} />
                </div>
             </div>
             <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/40 backdrop-blur text-[10px] font-mono border border-sys-line text-sys-text">
                PWA / MOBILE
             </div>
          </div>
          <h4 className="font-medium text-sys-text group-hover:text-sys-accent transition-colors">Field Ops PWA</h4>
          <p className="text-xs text-sys-subtext font-mono mt-1">Offline-first React App</p>
        </div>

         {/* Abstract representation - SaaS */}
         <div className="block group cursor-pointer">
          <div className="relative aspect-video bg-sys-surface border border-sys-line rounded-sm overflow-hidden mb-4">
             <div className="absolute inset-0 p-4 flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2 mb-2">
                    <div className="w-8 h-8 bg-sys-line rounded-sm"></div>
                    <div className="flex-1 h-2 bg-sys-line rounded-full mt-2"></div>
                </div>
                <div className="w-full flex-1 bg-sys-base border border-sys-line rounded-sm flex items-center justify-center">
                    <Monitor className="text-sys-subtext" size={32} />
                </div>
             </div>
             <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/40 backdrop-blur text-[10px] font-mono border border-sys-line text-sys-text">
                SaaS PLATFORM
             </div>
          </div>
          <h4 className="font-medium text-sys-text group-hover:text-sys-accent transition-colors">Logistics Control</h4>
          <p className="text-xs text-sys-subtext font-mono mt-1">Next.js Dashboard</p>
        </div>

        {/* Abstract representation - Landing */}
        <div className="block group cursor-pointer">
          <div className="relative aspect-video bg-sys-surface border border-sys-line rounded-sm overflow-hidden mb-4">
             <div className="absolute inset-0 bg-gradient-to-br from-sys-surface to-sys-line/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="font-mono text-4xl text-sys-line font-bold select-none opacity-20">WEB</span>
             </div>
             <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/40 backdrop-blur text-[10px] font-mono border border-sys-line text-sys-text">
                LANDING
             </div>
          </div>
          <h4 className="font-medium text-sys-text group-hover:text-sys-accent transition-colors">TechConf 2024</h4>
          <p className="text-xs text-sys-subtext font-mono mt-1">High-performance Astro Site</p>
        </div>

      </div>
    </Section>
  );
};