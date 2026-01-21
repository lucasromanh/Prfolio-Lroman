import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 border-b border-sys-line ${className}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {(title || subtitle) && (
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {title && (
                <h2 className="text-sm font-mono tracking-widest text-sys-accent font-semibold uppercase mb-2">
                  // {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xl md:text-2xl font-light text-sys-text tracking-tight">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="h-px bg-sys-line flex-grow md:ml-8 hidden md:block opacity-50"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};