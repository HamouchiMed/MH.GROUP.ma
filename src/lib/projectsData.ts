/** Which interface schematic to draw when a project has no capture yet. */
export type ScreenVariant = 'dashboard' | 'auth' | 'marketplace' | 'tracking' | 'editorial'

/**
 * Real screen capture for a project. Drop files into
 * `public/media/<slug>/` and point at them here — see public/media/README.md
 * for the exact ffmpeg recipe. Until then the device renders a schematic.
 */
export type ProjectMedia = {
  /** Still frame, also the video's poster. ~1600px wide, jpg or webp. */
  poster?: string
  /** Muted 6–10s loop, webm preferred with an mp4 sibling for Safari. */
  video?: string
  alt?: string
}

export type ProjectData = {
  slug: string
  id: string
  title: string
  year: string
  category: { EN: string; FR: string }
  tags: string[]
  summary: { EN: string; FR: string }
  challenge: { EN: string; FR: string }
  solution: { EN: string; FR: string }
  impact: { EN: string; FR: string }
  techStack: string[]
  role: { EN: string; FR: string }
  githubUrl?: string
  liveUrl?: string
  type: 'laptop' | 'phone'
  screen: ScreenVariant
  media?: ProjectMedia
}

export const projectsData: Record<string, ProjectData> = {
  'onebotads': {
    slug: 'onebotads',
    id: 'onebotads',
    title: 'OneBotAds',
    year: '2026',
    type: 'laptop',
    screen: 'dashboard',
    category: { EN: 'SaaS Ad Management', FR: 'Gestion SaaS Publicitaire' },
    tags: ['React.js', 'Node.js', 'PostgreSQL', 'OAuth 2.0'],
    summary: {
      EN: 'A multi-platform SaaS solution that centralizes and automates advertising campaigns across Meta, TikTok, Google, LinkedIn, and Snapchat.',
      FR: 'Une solution SaaS multi-plateforme qui centralise et automatise les campagnes publicitaires sur Meta, TikTok, Google, LinkedIn et Snapchat.',
    },
    role: { EN: 'Full-Stack Engineer', FR: 'Ingénieur Full-Stack' },
    techStack: [
      'Frontend: React.js, Tailwind CSS, MUI, Axios',
      'Backend: Node.js, Express.js, Sequelize (ORM), JWT',
      'Database: PostgreSQL',
      'APIs: Google Ads, TikTok, Meta, LinkedIn, Snapchat',
      'DevOps: PM2, Ngrok, Git, Hostinger',
    ],
    challenge: {
      EN: 'Stabilizing a full-stack architecture and integrating complex, high-volume marketing data from multiple restricted APIs.',
      FR: 'Stabilisation d’une architecture full-stack et intégration de données marketing complexes et volumineuses provenant de plusieurs APIs restreintes.',
    },
    solution: {
      EN: 'Architected secure OAuth 2.0 flows and automated data synchronization to ensure reliable campaign management.',
      FR: 'Conception de flux OAuth 2.0 sécurisés et automatisation de la synchronisation des données pour une gestion fiable des campagnes.',
    },
    impact: {
      EN: 'Ensured reliable multi-channel data synchronization and centralized management for marketing teams.',
      FR: 'Synchronisation fiable des données multi-canaux et gestion centralisée pour les équipes marketing.',
    },
  },
  'siendo-auth': {
    slug: 'siendo-auth',
    id: 'siendo-auth',
    title: 'SIENDO Auth',
    year: '2025',
    type: 'phone',
    screen: 'auth',
    category: { EN: 'Mobile Authentication', FR: 'Authentification Mobile' },
    tags: ['React Native', 'Security', 'JWT'],
    summary: {
      EN: 'Implementation of a robust and standardized mobile authentication system via React Native for SIENDO Group Maroc.',
      FR: 'Implémentation d’un système d’authentification mobile robuste et standardisé via React Native pour SIENDO Group Maroc.',
    },
    role: { EN: 'Mobile Developer Intern', FR: 'Stagiaire Développeur Mobile' },
    techStack: ['React Native', 'JWT', 'Encrypted Storage', 'Context API'],
    challenge: {
      EN: 'Standardizing security protocols across multiple mobile projects with varying performance requirements.',
      FR: 'Standardisation des protocoles de sécurité sur plusieurs projets mobiles avec des exigences de performance variées.',
    },
    solution: {
      EN: 'Developed a reusable auth module with biometric support and secure token management.',
      FR: 'Développement d’un module d’authentification réutilisable avec support biométrique et gestion sécurisée des jetons.',
    },
    impact: {
      EN: 'Reduced development time for future mobile apps by 30% through modular security architecture.',
      FR: 'Réduction du temps de développement des futures applications mobiles de 30% grâce à une architecture de sécurité modulaire.',
    },
  },
  'obbo-mobile': {
    slug: 'obbo-mobile',
    id: 'obbo-mobile',
    title: 'Obbo Mobile',
    year: '2024',
    type: 'phone',
    screen: 'marketplace',
    category: { EN: 'Startup Ecosystem', FR: 'Écosystème Startup' },
    tags: ['React Native', 'Node.js', 'Branding'],
    summary: {
      EN: 'An anti-waste food mobile application and complete visual identity, enabling vendors to recover lost revenue.',
      FR: 'Une application mobile anti-gaspillage alimentaire et identité visuelle complète, permettant aux commerçants de récupérer leurs revenus perdus.',
    },
    role: { EN: 'Lead Full-Stack Freelance', FR: 'Lead Développeur Freelance' },
    techStack: ['React Native', 'Node.js', 'Socket.io', 'Adobe XD', 'MongoDB'],
    challenge: {
      EN: 'Creating an end-to-end marketplace for food waste from scratch, including real-time notifications and branding.',
      FR: 'Création d’une marketplace complète pour le gaspillage alimentaire à partir de zéro, incluant notifications en temps réel et branding.',
    },
    solution: {
      EN: 'Engineered a dual-app system (Vendor/Client) and designed the full brand ecosystem.',
      FR: 'Conception d’un système à deux applications (Vendeur/Client) et design de l’écosystème de marque complet.',
    },
    impact: {
      EN: 'Helping local vendors recover 15% of potentially wasted revenue since the MVP launch.',
      FR: 'Aide aux commerçants locaux à récupérer 15% de revenus potentiellement perdus depuis le lancement du MVP.',
    },
  },
  'bricol-clic': {
    slug: 'bricol-clic',
    id: 'bricol-clic',
    title: 'Bricol.clic',
    year: '2025',
    type: 'phone',
    screen: 'tracking',
    category: { EN: 'Service Marketplace', FR: 'Marketplace de Services' },
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Expo'],
    summary: {
      EN: 'A comprehensive marketplace connecting individuals with local handyman service providers, featuring real-time tracking.',
      FR: 'Une marketplace complète reliant les particuliers à des prestataires de services locaux, avec suivi en temps réel.',
    },
    role: { EN: 'Full-Stack Developer', FR: 'Développeur Full-Stack' },
    techStack: [
      'Mobile: React Native, Expo, Reanimated, Navigation',
      'Backend: Node.js, Express.js, PostgreSQL',
      'Admin: React.js management dashboard',
      'Security: Multer for ID verification, secure auth',
    ],
    challenge: {
      EN: 'Building a secure provider verification system with ID document handling and reliable mission management.',
      FR: 'Construction d’un système de vérification des prestataires sécurisé avec gestion des documents d’identité et des missions.',
    },
    solution: {
      EN: 'Engineered the full-stack flow for real-time missions and identity workflows.',
      FR: 'Ingénierie du flux full-stack pour les missions en temps réel et les workflows d’identité.',
    },
    impact: {
      EN: 'Created a centralized ecosystem for reliable local service provider management.',
      FR: 'Création d’un écosystème centralisé pour la gestion fiable des prestataires de services locaux.',
    },
    githubUrl: 'https://github.com/HamouchiMed/bricol.clic.ma',
  },
  'conges-app-web': {
    slug: 'conges-app-web',
    id: 'conges-app-web',
    title: 'Conges App Web',
    year: '2025',
    type: 'laptop',
    screen: 'dashboard',
    category: { EN: 'HR Workflow App', FR: 'Application de Workflow RH' },
    tags: ['React 19', 'Tailwind CSS 4', 'PostgreSQL'],
    summary: {
      EN: 'A centralized system to streamline employee leave requests and meeting scheduling with role-based dashboards.',
      FR: 'Un système centralisé pour simplifier les demandes de congé et la planification des réunions avec tableaux de bord par rôle.',
    },
    role: { EN: 'Full-Stack Developer', FR: 'Développeur Full-Stack' },
    techStack: ['React 19', 'Vite', 'Tailwind CSS 4', 'Node.js', 'PostgreSQL', 'Date-fns'],
    challenge: {
      EN: 'Automating complex leave approval workflows while maintaining transparency between employees and directors.',
      FR: 'Automatisation des workflows complexes d’approbation de congés tout en maintenant la transparence entre employés et directeurs.',
    },
    solution: {
      EN: 'Built role-based dashboards with real-time status tracking and meeting management modules.',
      FR: 'Construction de tableaux de bord par rôle avec suivi de statut en temps réel et gestion des réunions.',
    },
    impact: {
      EN: 'Improved organizational transparency and efficiency in internal resource scheduling.',
      FR: 'Amélioration de la transparence organisationnelle et de l’efficacité dans la planification des ressources internes.',
    },
    githubUrl: 'https://github.com/HamouchiMed/conges-app-web',
  },
  'sirh1': {
    slug: 'sirh1',
    id: 'sirh1',
    title: 'Ouchari Sud SIRH',
    year: '2024',
    type: 'laptop',
    screen: 'dashboard',
    category: { EN: 'Enterprise SIRH', FR: 'SIRH d’Entreprise' },
    tags: ['Vanilla JS', 'Node.js', 'PostgreSQL'],
    summary: {
      EN: 'A custom Human Resources Management System designed to digitize employee data, organizational charts, and payroll.',
      FR: 'Un système de gestion des ressources humaines personnalisé conçu pour digitaliser les données des employés et la paie.',
    },
    role: { EN: 'Full-Stack Developer', FR: 'Développeur Full-Stack' },
    techStack: ['HTML5/CSS3', 'ES6+ JavaScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Fetch API'],
    challenge: {
      EN: 'Replacing manual data management with a secure, digitized administrative portal for large-scale personnel data.',
      FR: 'Remplacement de la gestion manuelle des données par un portail administratif numérisé pour les données du personnel.',
    },
    solution: {
      EN: 'Implemented robust role-based access control and dynamic data visualization for HR analytics.',
      FR: 'Implémentation d’un contrôle d’accès robuste par rôle et visualisation dynamique des données RH.',
    },
    impact: {
      EN: 'Digitized entire employee lifecycle management for Ouchari Sud Travaux Divers.',
      FR: 'Numérisation complète de la gestion du cycle de vie des employés pour Ouchari Sud Travaux Divers.',
    },
    githubUrl: 'https://github.com/HamouchiMed/sirh1',
  },
  'fmmed-portfolio': {
    slug: 'fmmed-portfolio',
    id: 'fmmed-portfolio',
    title: 'FMMED Portfolio',
    year: '2026',
    type: 'laptop',
    screen: 'editorial',
    category: { EN: 'Creative Engineering', FR: 'Ingénierie Créative' },
    tags: ['Next.js 16', 'Three.js', 'GSAP', 'WebGL'],
    summary: {
      EN: 'A high-performance, immersive digital portfolio featuring 3D device mockups, fluid animations, and custom WebGL shaders.',
      FR: 'Un portfolio digital immersif haute performance avec maquettes 3D, animations fluides et shaders WebGL personnalisés.',
    },
    role: { EN: 'Full-Stack Architect', FR: 'Architecte Full-Stack' },
    techStack: [
      'Next.js 16 (App Router), React 19',
      'Three.js, R3F, Drei, GSAP',
      'Tailwind CSS 4, Zustand, Lenis',
      'WebGL page transitions & liquid warp',
    ],
    challenge: {
      EN: 'Bridging technical full-stack precision with creative front-end execution and seamless 3D rendering.',
      FR: 'Allier la précision technique full-stack à l’exécution front-end créative et au rendu 3D fluide.',
    },
    solution: {
      EN: 'Engineered a unified WebGL background and custom cursor system with localized state management.',
      FR: 'Ingénierie d’un arrière-plan WebGL unifié et d’un système de curseur personnalisé avec gestion d’état locale.',
    },
    impact: {
      EN: 'Showcasing the pinnacle of technical and creative development through an interactive brand story.',
      FR: 'Présentation du sommet du développement technique et créatif à travers une histoire de marque interactive.',
    },
  },
}

/**
 * Presentation order, shared by the homepage stack and the /work index.
 * Deliberately alternates device type (laptop ⇄ phone) so the stack never
 * shows two web apps or two mobile apps back to back — L P L P L P L.
 */
export const projectOrder = [
  'onebotads', // laptop
  'siendo-auth', // phone
  'conges-app-web', // laptop
  'obbo-mobile', // phone
  'sirh1', // laptop
  'bricol-clic', // phone
  'fmmed-portfolio', // laptop
] as const

export const orderedProjects = projectOrder.map((slug) => projectsData[slug])
