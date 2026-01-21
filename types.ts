
export type Language = 'es' | 'en';

export interface SystemState {
  uptime: string;
  version: string;
  load: string;
  status: 'optimal' | 'busy' | 'offline';
}

export interface Project {
  id: string;
  name: string;
  role: {
    es: string;
    en: string;
  };
  tech: string[];
  status: 'active' | 'maintenance' | 'archived' | 'offline';
  description: {
    es: string;
    en: string;
  };
  year: string;
  url?: string; // Added URL field
}

export interface Metric {
  label: string;
  value: number | string;
  unit?: string;
  trend?: number; // percentage
}

export interface WorkExperience {
  id: string;
  company: string;
  role: { es: string; en: string };
  period: string;
  priority: 'high' | 'normal';
  description: { es: string; en: string };
  tags: string[];
}

export interface ModuleNode {
  id: string;
  category: string;
  skills: string[]; // Resumen visible
  details: string[]; // Lista detallada para el expandible
  description: { es: string; en: string }; // Descripción corta
  installationStatus: 'installed' | 'installing' | 'pending'; // New field
}

export interface Translation {
  nav: {
    overview: string;
    metrics: string; // Now "EXPERIENCIA"
    modules: string; // Now "CONOCIMIENTOS"
    deployments: string; // Now "PROYECTOS"
    contact: string; // Now "CONECTAR"
    cv_download: string;
  };
  overview: {
    label: string;
    availability: string;
    location: string;
    role: string;
    timezone: string;
    bio_title: string; // Moved here
    bio_text: string;  // Moved here
  };
  metrics: {
    title: string;
    experience: string;
    projects: string;
    stack_coverage: string;
    soft_skills: string; // New field for Soft Skills
    timeline_title: string;
    work_title: string; // New: Title for work list
  };
  modules: {
    title: string;
    desc: string;
    click_hint: string;
  };
  deployments: {
    title: string;
    subtitle: string;
    status_header: string;
    tech_header: string;
    view_logs: string;
    view_more: string;
    view_less: string;
    launch: string;
    real_time_note: string;
  };
  apps: {
    title: string;
  };
  contact: {
    title: string;
    cmd_email: string;
    cmd_linkedin: string;
    cmd_github: string;
    placeholder: string;
  };
  footer: {
    rights: string;
  };
}
