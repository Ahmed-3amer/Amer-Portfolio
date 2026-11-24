export interface ContactLinks {
  email: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
}

export interface CVAssets {
  pdfUrl: string;
  pdfFileName: string;
  docxUrl: string;
  docxFileName: string;
}

export interface WorkingPrinciple {
  index: string;
  title: string;
  description: string;
}

export interface CraftGroup {
  id: string;
  label: string;
  summary: string;
  items: string[];
}

export const PROFILE = {
  name: 'Ahmed Amer',
  fullName: 'Ahmed Mohamed Amer',
  role: 'Frontend Developer',
  heroHeadline: 'Interfaces built with structure, clarity, and quiet precision.',
  heroIntro:
    'I build modern, responsive web applications in React, Next.js, and TypeScript—turning complex clinical, corporate, and commercial workflows into calm, reliable experiences.',
  teaserNote:
    'Good frontend work feels natural before you notice the craft behind it. From bilingual enterprise platforms and laboratory workflows to clean architectural portfolios, every interface is shaped around visual hierarchy, responsive structure, and steady performance.',
  contact: {
    email: 'ahmedammer777@gmail.com',
    github: 'https://github.com/Ahmed-3amer',
    githubHandle: 'github.com/Ahmed-3amer',
    linkedin: 'https://www.linkedin.com/in/ahmed-amer22',
    linkedinHandle: 'linkedin.com/in/ahmed-amer22',
  } satisfies ContactLinks,
  cv: {
    pdfUrl: '/cv/Ahmed_Amer_Frontend_Developer_CV.pdf',
    pdfFileName: 'Ahmed_Amer_Frontend_Developer_CV.pdf',
    docxUrl: '/cv/Ahmed_Amer_Frontend_Developer_CV.docx',
    docxFileName: 'Ahmed_Amer_Frontend_Developer_CV.docx',
  } satisfies CVAssets,
} as const;

export const ABOUT_CONTENT = {
  eyebrow: 'Studio Perspective',
  headline: 'Engineering interfaces that feel grounded in how people actually work.',
  perspective: [
    'My path into frontend development began with a genuine curiosity for how visual layout, typography, and code come together on a screen. Structured courses and intensive scholarships gave me the foundation to step into the field seriously, turning that early interest into disciplined engineering habits through hands-on, collaborative builds.',
    'Today, my focus is bridging clean visual judgment with dependable frontend architecture. Whether a product serves lab clinicians validating diagnostic ranges, medical equipment buyers switching between Arabic and English, or visitors exploring an architectural studio, the interface should never make people work harder than the task itself.',
    'Rather than decorating layouts with fleeting visual trends, I prefer grounded typography, modular components, and calm spatial rhythm—so every interaction earns its place and holds up smoothly across desktop and mobile.',
  ],
  workingPrinciples: [
    {
      index: '01',
      title: 'Clarity & Visual Hierarchy',
      description:
        'Information should read effortlessly at a glance. Strong typographic contrast, deliberate pacing, and semantic HTML give complex screens immediate structure.',
    },
    {
      index: '02',
      title: 'Component-Driven Architecture',
      description:
        'Modular UI patterns in React, Next.js, and native Web Components keep large interfaces maintainable, predictable, and consistent as products grow.',
    },
    {
      index: '03',
      title: 'Real-World Readiness',
      description:
        'From bilingual RTL/LTR localization, static generation, and structured SEO to role-based workflows and automated Playwright checks, software is built for real daily use.',
    },
    {
      index: '04',
      title: 'Purposeful Motion',
      description:
        'Motion exists to clarify spatial depth, guide reading focus, and reflect physical continuity—never to distract from the content or slow down the browser.',
    },
  ] satisfies WorkingPrinciple[],
  craftGroups: [
    {
      id: 'core',
      label: 'Frontend Core',
      summary: 'Foundational web standards and type-safe application logic.',
      items: [
        'Semantic HTML5',
        'CSS3 (Flexbox & Grid)',
        'JavaScript (ES6+)',
        'TypeScript',
        'Responsive Design',
      ],
    },
    {
      id: 'frameworks',
      label: 'Frameworks & UI Architecture',
      summary: 'Composable systems built for clarity across viewports and languages.',
      items: [
        'React.js',
        'Next.js',
        'Tailwind CSS',
        'CSS Modules',
        'Bootstrap',
        'Component-Driven Architecture',
        'Visual Hierarchy',
      ],
    },
    {
      id: 'workflow',
      label: 'Data, Visualization & Workflow',
      summary: 'Tools used across production client systems and collaborative builds.',
      items: [
        'REST API Integration',
        'TanStack Query',
        'Zustand',
        'D3.js / TopoJSON',
        'Playwright E2E',
        'Git & GitHub',
        'Collaborative Workflows',
        'AI-Assisted Development',
      ],
    },
  ] satisfies CraftGroup[],
  cvBridgeNote:
    'For formal education, intensive training tracks, languages, and full chronological credentials, open the formatted CV directly below.',
} as const;
