export type ProjectChapterId = 'chapter-1' | 'chapter-2' | 'chapter-3';

export interface ProjectChapter {
  id: ProjectChapterId;
  roman: string;
  label: string;
  title: string;
  subtitle: string;
}

export interface Project {
  slug: string;
  index: string;
  chapter: ProjectChapterId;
  title: string;
  shortTitle: string;
  category: string;
  engagement: string;
  liveUrl: string;
  screenshotPath: string;
  summary: string;
  narrativeRole: string;
  highlights: string[];
  technologies: string[];
}

export const PROJECT_CHAPTERS: ProjectChapter[] = [
  {
    id: 'chapter-1',
    roman: 'I',
    label: 'Chapter I',
    title: 'Systems Built for Real Operations',
    subtitle:
      'Production-grade platforms engineered for clinical laboratories and bilingual medical distribution.',
  },
  {
    id: 'chapter-2',
    roman: 'II',
    label: 'Chapter II',
    title: 'Digital Spaces & Commerce',
    subtitle:
      'Architectural studios, personal folios, and multi-role commerce shaped around structure and clarity.',
  },
  {
    id: 'chapter-3',
    roman: 'III',
    label: 'Chapter III',
    title: 'Atmosphere & Craft',
    subtitle:
      'A focused interface connecting live atmospheric conditions back to the sky outside the studio window.',
  },
];

export const PROJECTS: Project[] = [
  {
    slug: 'makkah-lab',
    index: '01',
    chapter: 'chapter-1',
    title: 'Makkah Lab — Laboratory Information System (LIS)',
    shortTitle: 'Makkah Lab (LIS)',
    category: 'Clinical Healthcare System',
    engagement: 'Client Project',
    liveUrl: 'https://makka-lab.vercel.app/',
    screenshotPath: '/images/projects/makkah-lab.webp',
    summary:
      'An end-to-end Laboratory Information System engineered to streamline clinical workflows, specimen tracking, automated result validation, financial billing, and WhatsApp patient delivery.',
    narrativeRole:
      'Built to replace fragmented manual lab procedures with a single auditable clinical interface across four user roles.',
    highlights: [
      'Patient intake with National ID search, automated barcode label generation, and full medical history tracking.',
      'Dynamic result validation flagging abnormal values (High, Low, Critical) tailored to patient age and gender reference ranges.',
      'Multi-tier pricing, corporate/insurance co-pay splitting, and real-time treasury cash flow logging.',
      'Instant PDF diagnostic reports with digital doctor signatures, QR/barcodes, and an automated WhatsApp notification microservice.',
      'Four-role access control (Admin, Doctor, Technician, Receptionist) with activity audit trails, bilingual RTL/LTR support, and analytics.',
    ],
    technologies: [
      'React 19',
      'JavaScript (ES6+)',
      'Vite',
      'Tailwind CSS v4',
      'React Router v7',
      'TanStack Query',
      'Zustand',
      'React Hook Form',
      'Zod',
      'Recharts',
      'Lucide React',
      'jsPDF',
      'JsBarcode',
      'react-to-print',
      'Supabase (PostgreSQL, Auth, RLS, Realtime)',
      'Node.js',
      'Express.js',
      'WebSockets',
      'whatsapp-web.js',
    ],
  },
  {
    slug: 'patron-medical-group',
    index: '02',
    chapter: 'chapter-1',
    title: 'Patron Medical Group',
    shortTitle: 'Patron Medical Group',
    category: 'Enterprise Corporate Platform',
    engagement: 'Client Project',
    liveUrl: 'https://patronmg.com/',
    screenshotPath: '/images/projects/patron-medical-group.webp',
    summary:
      'A bilingual (Arabic/English) corporate platform for a medical technology and equipment distributor, built with Next.js App Router and Static Site Generation for near-instant load times.',
    narrativeRole:
      'Designed to present medical catalogs and regional presence clearly across both RTL Arabic and LTR English layouts.',
    highlights: [
      'Full native Arabic (RTL) and English (LTR) localization with custom typography and localized routing.',
      'Interactive medical equipment catalog filterable by clinical specialties and global brand partners.',
      'Custom vector world map built with D3.js (d3-geo) and TopoJSON illustrating regional branches and reach.',
      'Pre-rendered static export with CSS Modules, dynamic sitemap, JSON-LD structured SEO, and Playwright end-to-end tests.',
    ],
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'CSS Modules',
      'D3.js (d3-geo)',
      'TopoJSON',
      'Playwright',
      'ESLint',
      'Lucide React',
    ],
  },
  {
    slug: 'solution-group',
    index: '03',
    chapter: 'chapter-2',
    title: 'Solution Group Website',
    shortTitle: 'Solution Group',
    category: 'Architectural & Engineering Office',
    engagement: 'Client Project',
    liveUrl: 'https://www.sgsbe.com/',
    screenshotPath: '/images/projects/solution-group.webp',
    summary:
      'A responsive corporate website for an architectural and engineering office featuring a project showcase slider, smooth on-scroll transitions, and direct EmailJS inquiry handling.',
    narrativeRole:
      'Structured to showcase engineering capabilities and built projects in a calm, accessible layout.',
    highlights: [
      'Responsive multi-section corporate layout adapted across mobile, tablet, and desktop.',
      'Interactive project carousel paired with restrained scroll-triggered reveals.',
      'Functional contact workflow integrated directly via EmailJS.',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Owl Carousel',
      'AOS',
      'EmailJS',
    ],
  },
  {
    slug: 'mahmoud-fayed-architect',
    index: '04',
    chapter: 'chapter-2',
    title: 'Mahmoud Fayed — Architect Portfolio',
    shortTitle: 'Architect Portfolio',
    category: 'Architectural Portfolio',
    engagement: 'Client Project',
    liveUrl: 'https://mahmoud-fayed-portfolio.vercel.app/',
    screenshotPath: '/images/projects/mahmoud-fayed-architect.webp',
    summary:
      'A responsive personal portfolio showcasing an architect’s selected projects and design background with a lightweight, mobile-friendly gallery.',
    narrativeRole:
      'Focused on keeping architectural photography and project context uncrowded and fast to browse.',
    highlights: [
      'Lightweight responsive gallery structured around visual clarity on mobile and desktop.',
      'Clean presentation of architectural background, project imagery, and contact details.',
    ],
    technologies: ['HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    slug: 'exclusive-ecommerce',
    index: '05',
    chapter: 'chapter-2',
    title: 'Exclusive Multi-Actor E-commerce',
    shortTitle: 'Exclusive E-commerce',
    category: 'Multi-Role Web Application',
    engagement: 'Team Build',
    liveUrl: 'https://e-commerce-website-pure-js.vercel.app/',
    screenshotPath: '/images/projects/exclusive-ecommerce.webp',
    summary:
      'A multi-role e-commerce web application supporting customer and admin workflows, persistent client-side cart management, role dashboards, and Chart.js sales analytics.',
    narrativeRole:
      'Engineered in pure JavaScript and reusable Web Components to handle state, dashboards, and analytics without framework overhead.',
    highlights: [
      'Distinct customer shopping flows and admin management dashboards within one cohesive application.',
      'Reusable custom Web Components for modular storefront and dashboard UI blocks.',
      'Persistent cart state via Local Storage paired with interactive Chart.js sales visualizations.',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6)',
      'Bootstrap',
      'Web Components',
      'Chart.js',
      'Local Storage',
      'Typed.js',
      'SweetAlert',
    ],
  },
  {
    slug: 'weather-app',
    index: '06',
    chapter: 'chapter-3',
    title: 'Weather App',
    shortTitle: 'Weather App',
    category: 'Atmospheric Forecast Interface',
    engagement: 'Featured Build',
    liveUrl: 'https://ahmed-3amer.github.io/weather-app/',
    screenshotPath: '/images/projects/weather-app.webp',
    summary:
      'A real-time weather forecast interface driven by location search, presenting atmospheric data through a custom visual layout.',
    narrativeRole:
      'Closes the studio journey by echoing the live sky, clouds, and changing light just outside the window.',
    highlights: [
      'Instant location-based search fetching real-time multi-day weather forecasts.',
      'Custom visual forecast layout designed for quick readability across screen sizes.',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Weather API',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getNextProject(currentSlug: string): Project {
  const idx = PROJECTS.findIndex((project) => project.slug === currentSlug);
  if (idx === -1) return PROJECTS[0];
  return PROJECTS[(idx + 1) % PROJECTS.length];
}
