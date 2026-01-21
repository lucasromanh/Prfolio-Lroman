
import { Project, Translation, ModuleNode, WorkExperience } from './types';

export const TEXTS: Record<'es' | 'en', Translation> = {
  es: {
    nav: {
      overview: '01_GENERAL',
      metrics: '02_EXPERIENCIA',
      modules: '03_CONOCIMIENTOS',
      deployments: '04_PROYECTOS',
      contact: '05_CONECTAR',
      cv_download: 'DESCARGAR CV',
    },
    overview: {
      label: 'SISTEMA LUCAS ROMÁN',
      availability: 'DISPONIBLE PARA DEPLOY',
      location: 'SALTA, AR',
      role: 'Sistemas de Gestión & Software Development',
      timezone: 'GMT-3',
      bio_title: 'KERNEL_MANIFEST [SOBRE MÍ]',
      bio_text: 'Desarrollador de Software enfocado en la creación de sistemas de gestión escalables y aplicaciones web progresivas. Mi enfoque parte del análisis profundo del problema y termina en soluciones técnicas claras, estables y fáciles de usar. Construyo software pensando en su evolución, mantenimiento y en el impacto real que tiene sobre las personas y los procesos.',
    },
    metrics: {
      title: 'TELEMETRÍA DE EXPERIENCIA',
      experience: 'AÑOS EN OPERACIÓN',
      projects: 'SISTEMAS DESPLEGADOS',
      stack_coverage: 'COBERTURA DE STACK',
      soft_skills: 'HABILIDADES BLANDAS',
      timeline_title: 'SYSTEM OUTPUT / VELOCITY',
      work_title: 'REGISTRO DE ACTIVIDAD LABORAL [WORK_LOGS]',
    },
    modules: {
      title: 'CONOCIMIENTOS INSTALADOS',
      desc: 'Paquetes de conocimiento y librerías operativas.',
      click_hint: '[ CLICK PARA INSPECCIONAR CONTENIDO ]',
    },
    deployments: {
      title: 'PROYECTOS ACTIVOS',
      subtitle: 'Acceso directo a sistemas en producción y entornos de prueba.',
      status_header: 'ESTADO',
      tech_header: 'STACK TÉCNICO',
      view_logs: 'VER REGISTROS DEL SISTEMA',
      view_more: 'EXPANDIR LISTA DE PROYECTOS',
      view_less: 'CONTRAER LISTA',
      launch: 'INICIAR SISTEMA (VISITAR)',
      real_time_note: 'NOTA DEL SISTEMA: Proyectos enlazados en tiempo real. El estado OFFLINE indica actualizaciones en curso, caída del servidor o interrupción de conexión.',
    },
    apps: {
      title: 'APLICACIONES WEB',
    },
    contact: {
      title: 'CONEXIÓN CON EL SISTEMA',
      cmd_email: 'INICIAR PROTOCOLO DE EMAIL',
      cmd_linkedin: 'ESTABLECER CONEXIÓN LINKEDIN',
      cmd_github: 'ACCEDER A GITHUB',
      placeholder: 'Esperando comando...',
    },
    footer: {
      rights: 'Arquitectura del Sistema © {year} Lucas Román. Todos los derechos reservados.',
    }
  },
  en: {
    nav: {
      overview: '01_OVERVIEW',
      metrics: '02_EXPERIENCE',
      modules: '03_KNOWLEDGE',
      deployments: '04_PROJECTS',
      contact: '05_CONNECT',
      cv_download: 'DOWNLOAD RESUME',
    },
    overview: {
      label: 'LUCAS ROMÁN SYSTEM',
      availability: 'READY FOR DEPLOYMENT',
      location: 'SALTA, AR',
      role: 'Management Systems & Software Engineering',
      timezone: 'GMT-3',
      bio_title: 'KERNEL_MANIFEST [ABOUT ME]',
      bio_text: 'Software Developer focused on building scalable management systems and progressive web apps. My approach starts with deep problem analysis and results in clear, stable, and user-friendly technical solutions. I build software with evolution, maintenance, and real impact on people and processes in mind.',
    },
    metrics: {
      title: 'EXPERIENCE TELEMETRY',
      experience: 'YEARS IN OPERATION',
      projects: 'SYSTEMS DEPLOYED',
      stack_coverage: 'STACK COVERAGE',
      soft_skills: 'SOFT SKILLS',
      timeline_title: 'SYSTEM OUTPUT / VELOCITY',
      work_title: 'WORK ACTIVITY LOGS [WORK_LOGS]',
    },
    modules: {
      title: 'INSTALLED KNOWLEDGE',
      desc: 'Knowledge packages and operational libraries.',
      click_hint: '[ CLICK TO INSPECT CONTENT ]',
    },
    deployments: {
      title: 'ACTIVE PROJECTS',
      subtitle: 'Direct access to production systems and test environments.',
      status_header: 'STATUS',
      tech_header: 'TECHNICAL STACK',
      view_logs: 'VIEW SYSTEM LOGS',
      view_more: 'EXPAND PROJECT LIST',
      view_less: 'COLLAPSE LIST',
      launch: 'LAUNCH SYSTEM (VISIT)',
      real_time_note: 'SYSTEM NOTE: Projects linked in real-time. OFFLINE status indicates ongoing updates, server downtime, or connection interruption.',
    },
    apps: {
      title: 'WEB APPLICATIONS',
    },
    contact: {
      title: 'SYSTEM CONNECTION',
      cmd_email: 'INITIATE EMAIL PROTOCOL',
      cmd_linkedin: 'ESTABLECER LINKEDIN CONNECTION',
      cmd_github: 'ACCESS GITHUB',
      placeholder: 'Awaiting command...',
    },
    footer: {
      rights: 'System Architecture © {year} Lucas Román. All rights reserved.',
    }
  },
};

export const WORK_HISTORY: WorkExperience[] = [
  {
    id: 'JOB-VECTRA',
    company: 'Vectra Group',
    role: { es: 'Sistemas ISO 14001', en: 'ISO 14001 Systems' },
    period: '2026 - Present',
    priority: 'high',
    description: {
      es: 'Implementación tecnológica para el cumplimiento de la norma ISO 14001 (Sistema de Gestión Ambiental). Desarrollo de soluciones para auditoría y control de procesos.',
      en: 'Technological implementation for ISO 14001 standard compliance (Environmental Management System). Development of solutions for auditing and process control.'
    },
    tags: ['ISO 14001', 'Environmental Tech', 'Compliance']
  },
  {
    id: 'JOB-MUNI-C',
    company: 'Municipalidad de Cachi',
    role: { es: 'App Turística (Audio-Guías)', en: 'Tourism App (Audio-Guides)' },
    period: '2026 - Present',
    priority: 'high',
    description: {
      es: 'Desarrollo integral de aplicación móvil para circuitos turísticos. Implementación de geolocalización precisa y sistema de audio-guías interactivas para visitantes.',
      en: 'Integral development of mobile application for tourist circuits. Implementation of precise geolocation and interactive audio-guide system for visitors.'
    },
    tags: ['Mobile App', 'Geolocation', 'Tourism Tech']
  },
  {
    id: 'JOB-MUNI-S',
    company: 'Municipalidad de Salta',
    role: { es: 'Creador App Municipal', en: 'Municipal App Creator' },
    period: '2024 - 2025 (Finalizado)',
    priority: 'high',
    description: {
      es: 'Creación y desarrollo de la App oficial "Salta Municipalidad". Digitalización de trámites, reportes ciudadanos y optimización de servicios de modernización del estado.',
      en: 'Creation and development of the official "Salta Municipalidad" App. Digitalization of procedures, citizen reports, and optimization of state modernization services.'
    },
    tags: ['GovTech', 'App Development', 'Digitalization']
  },
  {
    id: 'JOB-SALTACODERS',
    company: 'SALTACODERS',
    role: { es: 'CEO & Lead Developer', en: 'CEO & Lead Developer' },
    period: 'Dic 2022 - Present (Recess 2026)',
    priority: 'normal',
    description: {
      es: 'Liderazgo en gestión y desarrollo de sistemas de organización. Actualmente en receso operativo durante el ciclo 2026.',
      en: 'Leadership in management and development of organizational systems. Currently in operational recess during the 2026 cycle.'
    },
    tags: ['Leadership', 'System Design', 'Recess']
  },
  {
    id: 'JOB-CIMNE',
    company: 'Academia CIMNE-IBER',
    role: { es: 'Tutor Académico', en: 'Academic Tutor' },
    period: 'May 2022 - Dic 2023',
    priority: 'normal',
    description: {
      es: 'Recopilación y evaluación de trabajos. Gestión de actividades prácticas y creación de apps para seguimiento.',
      en: 'Collection and evaluation of assignments. Management of practical activities and creation of tracking apps.'
    },
    tags: ['Education', 'Management', 'Web Apps']
  },
  {
    id: 'JOB-ASTURIAS',
    company: 'Hotel Asturias',
    role: { es: 'Software Developer', en: 'Software Developer' },
    period: '2022 - Present (Remote)',
    priority: 'normal',
    description: {
      es: 'Desarrollo de software a medida, creación de aplicaciones web y capacitaciones al personal.',
      en: 'Custom software development, web application creation, and staff training.'
    },
    tags: ['Hospitality Tech', 'Web Apps', 'Training']
  },
  {
    id: 'JOB-CONSULT',
    company: 'Consultora Cognitia / Moreno / Eduluc',
    role: { es: 'Web Dev & Soporte', en: 'Web Dev & Support' },
    period: '2023 - 2024',
    priority: 'normal',
    description: {
      es: 'Desarrollo web, soporte técnico y mantenimiento de infraestructura digital para múltiples clientes.',
      en: 'Web development, technical support, and digital infrastructure maintenance for multiple clients.'
    },
    tags: ['Web Dev', 'Tech Support', 'Maintenance']
  }
];

export const PROJECTS: Project[] = [
  // PRIORITY 1: ControlFit
  {
    id: 'SYS-CFT',
    name: 'ControlFit',
    role: { es: 'Full Stack Dev', en: 'Full Stack Dev' },
    tech: ['React', 'System', 'Dashboard'],
    status: 'active',
    description: {
      es: 'Plataforma integral de gestión para centros de entrenamiento y gimnasios.',
      en: 'Comprehensive management platform for training centers and gyms.'
    },
    year: '2024',
    url: 'https://controlfit.saltacoders.com'
  },
  // PRIORITY 2: GeoSurface
  {
    id: 'SYS-GEO',
    name: 'GeoSurface Studio',
    role: { es: 'Frontend Lead', en: 'Frontend Lead' },
    tech: ['Maps API', 'GIS', 'Data Viz'],
    status: 'active',
    description: {
      es: 'Estudio y visualización de superficies geográficas y datos topográficos.',
      en: 'Study and visualization of geographic surfaces and topographic data.'
    },
    year: '2024',
    url: 'https://geosurfacestudio.saltacoders.com'
  },
  // PRIORITY 3: EcoMap
  {
    id: 'SYS-ECO',
    name: 'EcoMap',
    role: { es: 'System Architect', en: 'System Architect' },
    tech: ['GIS', 'Leaflet', 'React'],
    status: 'active',
    description: {
      es: 'Sistema de mapeo ecológico para monitoreo ambiental y recursos.',
      en: 'Ecological mapping system for environmental monitoring and resources.'
    },
    year: '2023',
    url: 'https://ecomap.saltacoders.com'
  },
  // Other Active / Recent Projects
  {
    id: 'SYS-INC',
    name: 'InmoSalta 360',
    role: { es: 'Developer', en: 'Developer' },
    tech: ['Real Estate', '360 View', 'Web'],
    status: 'active',
    description: {
      es: 'Plataforma inmobiliaria con recorridos virtuales y gestión de propiedades.',
      en: 'Real estate platform with virtual tours and property management.'
    },
    year: '2023',
    url: 'https://inmosalta360.saltacoders.com'
  },
  {
    id: 'SYS-FPA',
    name: 'FPastor System',
    role: { es: 'Frontend', en: 'Frontend' },
    tech: ['Social Media', 'Dashboard', 'Analytics'],
    status: 'active',
    description: {
      es: 'Sistema de gestión de publicaciones para redes sociales y métricas.',
      en: 'Social media publication management system and metrics.'
    },
    year: '2023',
    url: 'https://fpastor.saltacoders.com'
  },
  {
    id: 'SYS-TCK',
    name: 'La Ticketera',
    role: { es: 'Full Stack', en: 'Full Stack' },
    tech: ['E-commerce', 'Tickets', 'Events'],
    status: 'maintenance',
    description: {
      es: 'Sistema de venta y validación de tickets para eventos.',
      en: 'Ticket sales and validation system for events.'
    },
    year: '2022',
    url: 'https://laticketera.saltacoders.com'
  },
  {
    id: 'SYS-GRN',
    name: 'Patrulla Verde',
    role: { es: 'PWA Developer', en: 'PWA Developer' },
    tech: ['Game Logic', 'Edu-Tech', 'PWA'],
    status: 'active',
    description: {
      es: 'Juego educativo infantil para concientización ambiental.',
      en: 'Children\'s educational game for environmental awareness.'
    },
    year: '2022',
    url: 'https://patrullaverde.saltacoders.com'
  },
  {
    id: 'SYS-CFY',
    name: 'Cafayate Dice',
    role: { es: 'Game Dev', en: 'Game Dev' },
    tech: ['Next.js', 'Interactive', 'Game'],
    status: 'active',
    description: {
      es: 'Juego de trivia interactivo "100 Cafayateños Dicen".',
      en: 'Interactive trivia game "100 Cafayateños Say".'
    },
    year: '2023',
    url: 'https://cafayatedice.serviciosasturias.com'
  },
  {
    id: 'SYS-FIT',
    name: 'LuchaFit',
    role: { es: 'Frontend', en: 'Frontend' },
    tech: ['Fitness', 'Tracking', 'React'],
    status: 'archived',
    description: {
      es: 'Plataforma de seguimiento para deportes de contacto.',
      en: 'Tracking platform for combat sports.'
    },
    year: '2021',
    url: 'https://luchafit.saltacoders.com'
  },
  {
    id: 'SYS-CNS',
    name: 'Sistema Consumos',
    role: { es: 'Backend/Front', en: 'Backend/Front' },
    tech: ['Laravel', 'SQL', 'Admin'],
    status: 'maintenance',
    description: {
      es: 'Gestión administrativa de consumos y facturación de servicios.',
      en: 'Administrative management of consumption and service billing.'
    },
    year: '2021',
    url: 'https://sistemaconsumos.serviciosasturias.com'
  },
  {
    id: 'SYS-PRC',
    name: 'Precios Desarrollo',
    role: { es: 'Developer', en: 'Developer' },
    tech: ['Python', 'Analytics', 'SaaS'],
    status: 'active',
    description: {
      es: 'Herramienta de análisis y comparación de precios.',
      en: 'Price analysis and comparison tool.'
    },
    year: '2022',
    url: 'https://preciosdesarrollo.saltacoders.com'
  },
  {
    id: 'SYS-CNT',
    name: 'Contadores App',
    role: { es: 'Frontend', en: 'Frontend' },
    tech: ['FinTech', 'Calculator', 'Utils'],
    status: 'active',
    description: {
      es: 'Suite de herramientas digitales para contadores.',
      en: 'Digital tool suite for accountants.'
    },
    year: '2022',
    url: 'https://contadores.saltacoders.com'
  },
  {
    id: 'SYS-RUT',
    name: 'Rutinas App',
    role: { es: 'Mobile Web', en: 'Mobile Web' },
    tech: ['PWA', 'Health', 'Interact'],
    status: 'offline', 
    description: {
      es: 'Gestor de rutinas diarias y hábitos saludables.',
      en: 'Daily routine and healthy habit manager.'
    },
    year: '2022',
    url: 'https://rutinas.saltacoders.com'
  },
  {
    id: 'SYS-SFO',
    name: 'Sin Fondo',
    role: { es: 'Image Proc', en: 'Image Proc' },
    tech: ['AI', 'Image', 'Tool'],
    status: 'archived',
    description: {
      es: 'Servicio de remoción de fondos de imágenes.',
      en: 'Image background removal service.'
    },
    year: '2021',
    url: 'https://sinfondo.saltacoders.com'
  },
  {
    id: 'SYS-AUT',
    name: 'AutoNorte',
    role: { es: 'Web Dev', en: 'Web Dev' },
    tech: ['Automotive', 'Catalog', 'Landing'],
    status: 'active',
    description: {
      es: 'Catálogo digital para concesionaria automotriz.',
      en: 'Digital catalog for automotive dealership.'
    },
    year: '2021',
    url: 'https://autonorte.saltacoders.com'
  },
  {
    id: 'SYS-MSB',
    name: 'MasBarato',
    role: { es: 'E-commerce', en: 'E-commerce' },
    tech: ['Marketplace', 'Search', 'React'],
    status: 'active',
    description: {
      es: 'Buscador de ofertas y comparador de productos.',
      en: 'Offer finder and product comparator.'
    },
    year: '2022',
    url: 'https://masbarato.saltacoders.com'
  }
];

export const MODULES: ModuleNode[] = [
  {
    id: 'MOD-01',
    category: 'Módulo Instalado: Frontend & UI',
    installationStatus: 'installed',
    description: {
        es: 'Desarrollo de interfaces reactivas.',
        en: 'Development of modern, reactive interfaces.'
    },
    skills: ['React', 'HTML5/CSS3', 'Sass', 'GIS/Maps'],
    details: ['React.js / Next.js', 'Google Maps API / Leaflet', 'Sass / SCSS Preprocessing', 'Tailwind CSS', 'JavaScript (ES6+)', 'TypeScript']
  },
  {
    id: 'MOD-02',
    category: 'Módulo Instalado: Backend & Systems',
    installationStatus: 'installed',
    description: {
        es: 'Lógica de servidor robusta y bases de datos.',
        en: 'Robust server-side logic and databases.'
    },
    skills: ['Python', 'Laravel', 'MySQL', 'Postgres'],
    details: ['Python 3 (Django/Flask)', 'PHP (Laravel Framework)', 'MySQL Relational DB', 'PostgreSQL', 'REST API Design']
  },
  {
    id: 'MOD-03',
    category: 'Módulo Instalado: Mobile Apps',
    installationStatus: 'installed',
    description: {
        es: 'Aplicaciones móviles nativas e híbridas.',
        en: 'Native and hybrid mobile applications.'
    },
    skills: ['Android Native', 'PWA', 'React Native'],
    details: ['Android SDK', 'Progressive Web Apps (PWA)', 'Offline-first Storage', 'Mobile UI/UX']
  },
  {
    id: 'MOD-04',
    category: 'Módulo Instalado: DevOps',
    installationStatus: 'installed',
    description: {
        es: 'Despliegue y mantenimiento.',
        en: 'Deployment and maintenance.'
    },
    skills: ['Docker', 'Git', 'Linux', 'Cloud'],
    details: ['Docker Containerization', 'Git Version Control', 'Linux VPS Management', 'Nginx']
  },
  {
    id: 'MOD-05',
    category: 'Módulo Instalado: Edu-Games',
    installationStatus: 'installed',
    description: {
        es: 'Gamificación y lógica de juegos.',
        en: 'Gamification and game logic.'
    },
    skills: ['Game Logic', 'Gamification', 'Interactive'],
    details: ['Educational Game Design', 'Interactive Storytelling', 'User Engagement Metrics']
  },
  {
    id: 'MOD-06',
    category: 'Módulo Pendiente: Web3 & Blockchain',
    installationStatus: 'installing',
    description: {
        es: 'Proceso de aprendizaje en curso...',
        en: 'Learning process in progress...'
    },
    skills: ['Solidity', 'Smart Contracts', 'DApps'],
    details: ['Blockchain Fundamentals', 'Ethereum Network', 'Smart Contract Logic (Learning)', 'Web3.js Integration']
  }
];
