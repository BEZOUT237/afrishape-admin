import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types pour toutes les données du site
export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface AboutData {
  title: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  teamImage: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  client: string;
  date: string;
  link: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  published: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Media {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar: string;
  createdAt: string;
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

// Nouveaux types pour AfriShape
export interface OrientationGuide {
  id: string;
  title: string;
  description: string;
  category: string; // "post-bac", "universitaire", "professionnel"
  targetAudience: string; // "bacheliers", "étudiants", "diplômés"
  content: string;
  image: string;
  author: string;
  date: string;
  published: boolean;
  tags: string[];
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string; // "orientation", "bourses", "témoignages", "carrières"
  audioUrl: string;
  duration: string; // "45:30"
  coverImage: string;
  host: string;
  guest?: string;
  date: string;
  published: boolean;
  listens: number;
  tags: string[];
}

export interface Scholarship {
  id: string;
  title: string;
  description: string;
  country: string;
  university: string;
  level: string; // "Licence", "Master", "Doctorat", "Post-doctorat"
  fieldOfStudy: string[];
  deadline: string;
  amount: string;
  requirements: string[];
  applicationLink: string;
  coverageType: string; // "Totale", "Partielle", "Frais de scolarité uniquement"
  image: string;
  published: boolean;
  eligibility: string;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string; // "guides", "templates", "ebooks", "videos", "outils"
  type: string; // "PDF", "Video", "Audio", "Link", "Document"
  fileUrl: string;
  coverImage: string;
  fileSize?: string; // "2.5 MB"
  author: string;
  date: string;
  downloadCount: number;
  published: boolean;
  tags: string[];
}

interface DataContextType {
  hero: HeroData;
  setHero: (data: HeroData) => void;
  about: AboutData;
  setAbout: (data: AboutData) => void;
  services: Service[];
  setServices: (data: Service[]) => void;
  projects: Project[];
  setProjects: (data: Project[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (data: Testimonial[]) => void;
  blogPosts: BlogPost[];
  setBlogPosts: (data: BlogPost[]) => void;
  messages: Message[];
  setMessages: (data: Message[]) => void;
  media: Media[];
  setMedia: (data: Media[]) => void;
  users: User[];
  setUsers: (data: User[]) => void;
  settings: Settings;
  setSettings: (data: Settings) => void;
  // Nouveaux contextes
  orientationGuides: OrientationGuide[];
  setOrientationGuides: (data: OrientationGuide[]) => void;
  podcasts: Podcast[];
  setPodcasts: (data: Podcast[]) => void;
  scholarships: Scholarship[];
  setScholarships: (data: Scholarship[]) => void;
  resources: Resource[];
  setResources: (data: Resource[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Données initiales
const initialHero: HeroData = {
  title: "Façonnez l'Afrique de demain",
  subtitle: "AfriShape - Innovation & Excellence",
  description: "Nous transformons vos idées en solutions digitales innovantes qui propulsent votre entreprise vers le futur.",
  ctaText: "Découvrir nos services",
  ctaLink: "#services",
  backgroundImage: "https://images.unsplash.com/photo-1762766910426-6452a4c75734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2l0eSUyMHNreWxpbmV8ZW58MXx8fHwxNzc0MDAzNzMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
};

const initialAbout: AboutData = {
  title: "À propos d'AfriShape",
  description: "AfriShape est une entreprise dédiée à la transformation numérique de l'Afrique. Nous croyons au potentiel illimité du continent et travaillons chaque jour pour concrétiser cette vision.",
  mission: "Accompagner les entreprises africaines dans leur transformation digitale en proposant des solutions innovantes et adaptées aux réalités locales.",
  vision: "Devenir le leader africain des solutions digitales et contribuer activement au développement technologique du continent.",
  values: ["Innovation", "Excellence", "Intégrité", "Impact social", "Collaboration"],
  teamImage: "https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzczOTQ0NjgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
};

const initialServices: Service[] = [
  {
    id: "1",
    title: "Développement Web",
    description: "Création de sites web et applications web modernes et performantes",
    icon: "Globe",
    features: ["Sites vitrines", "E-commerce", "Applications web", "PWA"],
  },
  {
    id: "2",
    title: "Applications Mobile",
    description: "Développement d'applications mobiles natives et hybrides",
    icon: "Smartphone",
    features: ["iOS & Android", "React Native", "Flutter", "Design UX/UI"],
  },
  {
    id: "3",
    title: "Consulting Digital",
    description: "Accompagnement stratégique pour votre transformation digitale",
    icon: "Lightbulb",
    features: ["Audit digital", "Stratégie", "Formation", "Optimisation"],
  },
];

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Plateforme E-commerce AfriMarket",
    description: "Marketplace panafricaine connectant vendeurs et acheteurs à travers le continent",
    image: "https://images.unsplash.com/photo-1684337399050-0412ebed8005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzc0MDAzNzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "E-commerce",
    client: "AfriMarket Inc.",
    date: "2026-01-15",
    link: "#",
  },
  {
    id: "2",
    title: "Application de Gestion Bancaire",
    description: "Solution mobile pour la banque digitale nouvelle génération",
    image: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc0MDAxMTI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Fintech",
    client: "EcoBank Digital",
    date: "2025-12-10",
    link: "#",
  },
];

const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Aminata Diallo",
    position: "CEO",
    company: "TechStart Dakar",
    content: "AfriShape a transformé notre vision en réalité. Leur expertise et leur professionnalisme sont exceptionnels.",
    avatar: "https://images.unsplash.com/photo-1616804827035-f4aa814c14ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczOTkwNDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
  },
];

const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "L'avenir du digital en Afrique",
    excerpt: "Découvrez les tendances qui façonnent le paysage technologique africain",
    content: "Le continent africain connaît une révolution digitale sans précédent...",
    author: "Jean-Pierre Koné",
    date: "2026-03-15",
    category: "Technologie",
    image: "https://images.unsplash.com/photo-1572888195250-3037a59d3578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbGFuZHNjYXBlJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDAwMzczMHww&ixlib=rb-4.1.0&q=80&w=1080",
    published: true,
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    name: "Marie Kouassi",
    email: "marie@example.com",
    subject: "Demande de devis",
    message: "Bonjour, je souhaiterais obtenir un devis pour le développement d'un site e-commerce.",
    date: "2026-03-18",
    read: false,
  },
];

const initialMedia: Media[] = [
  {
    id: "1",
    name: "hero-background.jpg",
    url: "https://images.unsplash.com/photo-1762766910426-6452a4c75734",
    type: "image/jpeg",
    size: 2048000,
    uploadedAt: "2026-03-01",
  },
];

const initialUsers: User[] = [
  {
    id: "1",
    name: "Admin AfriShape",
    email: "admin@afrishape.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1616804827035-f4aa814c14ac",
    createdAt: "2025-01-01",
  },
];

const initialSettings: Settings = {
  siteName: "AfriShape",
  siteDescription: "Innovation & Excellence - Transformons l'Afrique ensemble",
  logo: "/logo.png",
  primaryColor: "#030213",
  secondaryColor: "#d4183d",
  contactEmail: "contact@afrishape.com",
  contactPhone: "+225 01 23 45 67 89",
  address: "Abidjan, Côte d'Ivoire",
  socialMedia: {
    facebook: "https://facebook.com/afrishape",
    twitter: "https://twitter.com/afrishape",
    linkedin: "https://linkedin.com/company/afrishape",
    instagram: "https://instagram.com/afrishape",
  },
};

// Nouvelles données initiales pour AfriShape
const initialOrientationGuides: OrientationGuide[] = [
  {
    id: "1",
    title: "Guide complet : Choisir sa filière après le Bac",
    description: "Un guide détaillé pour aider les nouveaux bacheliers à choisir leur orientation universitaire en fonction de leurs passions et opportunités.",
    category: "post-bac",
    targetAudience: "bacheliers",
    content: "Ce guide vous accompagne dans le choix crucial de votre orientation post-bac. Nous explorons les différentes filières, les débouchés professionnels, et comment identifier vos talents...",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    author: "Dr. Amadou Sy",
    date: "2026-03-15",
    published: true,
    tags: ["orientation", "bac", "université", "choix de carrière"],
  },
  {
    id: "2",
    title: "Sciences vs Lettres : Déconstruire les mythes",
    description: "Analyse approfondie des préjugés sur les filières scientifiques et littéraires, et comment faire un choix éclairé.",
    category: "post-bac",
    targetAudience: "bacheliers",
    content: "Trop souvent, les étudiants choisissent leur filière basée sur des préjugés plutôt que sur leurs véritables aptitudes...",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    author: "Marie-Claire Ngo",
    date: "2026-03-10",
    published: true,
    tags: ["sciences", "lettres", "orientation", "mythes"],
  },
  {
    id: "3",
    title: "Les métiers d'avenir en Afrique francophone",
    description: "Découvrez les secteurs porteurs et les compétences recherchées pour réussir votre carrière.",
    category: "professionnel",
    targetAudience: "étudiants",
    content: "L'Afrique connaît une transformation économique majeure. Voici les secteurs qui recrutent et les compétences à développer...",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    author: "Jean-Baptiste Kouame",
    date: "2026-03-08",
    published: true,
    tags: ["carrière", "métiers", "avenir", "afrique"],
  },
];

const initialPodcasts: Podcast[] = [
  {
    id: "1",
    title: "De Yaoundé à Harvard : Le parcours de Chimène",
    description: "Comment une brillante étudiante camerounaise a obtenu une bourse complète pour Harvard malgré les obstacles.",
    category: "témoignages",
    audioUrl: "https://example.com/podcasts/episode1.mp3",
    duration: "45:30",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
    host: "AfriShape Team",
    guest: "Chimène Atangana",
    date: "2026-03-18",
    published: true,
    listens: 1250,
    tags: ["harvard", "bourses", "témoignage", "cameroun"],
  },
  {
    id: "2",
    title: "Les bourses Chevening expliquées de A à Z",
    description: "Tout ce que vous devez savoir sur les bourses Chevening du gouvernement britannique.",
    category: "bourses",
    audioUrl: "https://example.com/podcasts/episode2.mp3",
    duration: "38:15",
    coverImage: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
    host: "Dr. Amadou Sy",
    date: "2026-03-12",
    published: true,
    listens: 2100,
    tags: ["chevening", "royaume-uni", "bourses", "master"],
  },
  {
    id: "3",
    title: "Orientation : Les erreurs à éviter après le Bac",
    description: "Conseils pratiques pour bien démarrer votre parcours universitaire.",
    category: "orientation",
    audioUrl: "https://example.com/podcasts/episode3.mp3",
    duration: "30:45",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
    host: "Marie-Claire Ngo",
    date: "2026-03-05",
    published: true,
    listens: 1890,
    tags: ["orientation", "bac", "erreurs", "conseils"],
  },
];

const initialScholarships: Scholarship[] = [
  {
    id: "1",
    title: "Bourses d'Excellence Eiffel - France",
    description: "Programme de bourses du gouvernement français pour les étudiants internationaux de haut niveau.",
    country: "France",
    university: "Campus France",
    level: "Master",
    fieldOfStudy: ["Ingénierie", "Économie", "Droit", "Sciences Politiques"],
    deadline: "2027-01-08",
    amount: "1,400€/mois",
    requirements: [
      "Avoir moins de 30 ans",
      "Être nommé par un établissement français",
      "Viser un Master ou Doctorat",
      "Excellence académique démontrée",
    ],
    applicationLink: "https://www.campusfrance.org/fr/le-programme-de-bourses-eiffel",
    coverageType: "Totale",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    published: true,
    eligibility: "Étudiants internationaux hors UE",
    tags: ["france", "master", "excellence", "gouvernement"],
  },
  {
    id: "2",
    title: "Chevening Scholarships - Royaume-Uni",
    description: "Bourses prestigieuses du gouvernement britannique pour futurs leaders mondiaux.",
    country: "Royaume-Uni",
    university: "Universités britanniques",
    level: "Master",
    fieldOfStudy: ["Toutes disciplines"],
    deadline: "2026-11-05",
    amount: "Frais complets + allocation",
    requirements: [
      "Minimum 2 ans d'expérience professionnelle",
      "Diplôme de Licence",
      "Retour dans son pays d'origine après les études",
      "Compétences en leadership",
    ],
    applicationLink: "https://www.chevening.org/",
    coverageType: "Totale",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    published: true,
    eligibility: "Citoyens de pays éligibles dont pays africains",
    tags: ["royaume-uni", "leadership", "master", "gouvernement"],
  },
  {
    id: "3",
    title: "Mastercard Foundation Scholars Program",
    description: "Programme complet pour jeunes africains talentueux issus de milieux défavorisés.",
    country: "Plusieurs pays",
    university: "Universités partenaires",
    level: "Licence",
    fieldOfStudy: ["STEM", "Agriculture", "Commerce", "Sciences Sociales"],
    deadline: "2026-10-15",
    amount: "Couverture complète",
    requirements: [
      "Être citoyen africain",
      "Excellent dossier académique",
      "Démontrer un engagement social",
      "Besoin financier avéré",
    ],
    applicationLink: "https://mastercardfdn.org/all/scholars/",
    coverageType: "Totale",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    published: true,
    eligibility: "Jeunes africains de 18-29 ans",
    tags: ["afrique", "licence", "mastercard", "social"],
  },
  {
    id: "4",
    title: "DAAD Scholarships - Allemagne",
    description: "Bourses du Service Allemand d'Échanges Universitaires pour étudiants internationaux.",
    country: "Allemagne",
    university: "Universités allemandes",
    level: "Master",
    fieldOfStudy: ["Ingénierie", "Sciences Naturelles", "Médecine", "Architecture"],
    deadline: "2026-10-31",
    amount: "850€/mois + assurance",
    requirements: [
      "Licence obtenue depuis moins de 6 ans",
      "Bon niveau d'allemand ou d'anglais selon le programme",
      "Projet d'étude clair",
    ],
    applicationLink: "https://www.daad.de/",
    coverageType: "Partielle",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
    published: true,
    eligibility: "Étudiants internationaux",
    tags: ["allemagne", "master", "daad", "ingénierie"],
  },
];

const initialResources: Resource[] = [
  {
    id: "1",
    title: "Guide complet des bourses d'études 2026-2027",
    description: "Document PDF exhaustif recensant plus de 100 programmes de bourses pour étudiants africains.",
    category: "guides",
    type: "PDF",
    fileUrl: "https://example.com/resources/guide-bourses-2026.pdf",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    fileSize: "4.2 MB",
    author: "Équipe AfriShape",
    date: "2026-03-01",
    downloadCount: 3450,
    published: true,
    tags: ["bourses", "guide", "pdf", "2026"],
  },
  {
    id: "2",
    title: "Template CV international (format européen)",
    description: "Modèle de CV professionnel adapté aux candidatures internationales et bourses d'études.",
    category: "templates",
    type: "Document",
    fileUrl: "https://example.com/resources/cv-template-international.docx",
    coverImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
    fileSize: "1.1 MB",
    author: "Marie-Claire Ngo",
    date: "2026-02-28",
    downloadCount: 5230,
    published: true,
    tags: ["cv", "template", "candidature", "international"],
  },
  {
    id: "3",
    title: "Webinaire : Réussir sa lettre de motivation",
    description: "Vidéo de formation complète sur l'art d'écrire une lettre de motivation convaincante.",
    category: "videos",
    type: "Video",
    fileUrl: "https://example.com/resources/webinaire-lettre-motivation.mp4",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    fileSize: "256 MB",
    author: "Dr. Amadou Sy",
    date: "2026-02-20",
    downloadCount: 2780,
    published: true,
    tags: ["lettre de motivation", "webinaire", "video", "formation"],
  },
  {
    id: "4",
    title: "Calendrier des bourses 2026-2027",
    description: "Calendrier interactif avec toutes les deadlines importantes pour les candidatures aux bourses.",
    category: "outils",
    type: "Link",
    fileUrl: "https://calendar.afrishape.com/bourses-2026",
    coverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    author: "Équipe AfriShape",
    date: "2026-01-15",
    downloadCount: 4120,
    published: true,
    tags: ["calendrier", "deadlines", "bourses", "outil"],
  },
  {
    id: "5",
    title: "E-book : 50 Parcours Inspirants d'Étudiants Africains",
    description: "Livre numérique compilant les témoignages de 50 étudiants africains ayant réussi à l'international.",
    category: "ebooks",
    type: "PDF",
    fileUrl: "https://example.com/resources/ebook-50-parcours.pdf",
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    fileSize: "8.5 MB",
    author: "Collectif AfriShape",
    date: "2026-01-10",
    downloadCount: 6890,
    published: true,
    tags: ["ebook", "témoignages", "inspiration", "afrique"],
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  // Charger les données depuis localStorage ou utiliser les valeurs par défaut
  const [hero, setHeroState] = useState<HeroData>(() => {
    const saved = localStorage.getItem("afrishape_hero");
    return saved ? JSON.parse(saved) : initialHero;
  });

  const [about, setAboutState] = useState<AboutData>(() => {
    const saved = localStorage.getItem("afrishape_about");
    return saved ? JSON.parse(saved) : initialAbout;
  });

  const [services, setServicesState] = useState<Service[]>(() => {
    const saved = localStorage.getItem("afrishape_services");
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [projects, setProjectsState] = useState<Project[]>(() => {
    const saved = localStorage.getItem("afrishape_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("afrishape_testimonials");
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [blogPosts, setBlogPostsState] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem("afrishape_blog");
    return saved ? JSON.parse(saved) : initialBlogPosts;
  });

  const [messages, setMessagesState] = useState<Message[]>(() => {
    const saved = localStorage.getItem("afrishape_messages");
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [media, setMediaState] = useState<Media[]>(() => {
    const saved = localStorage.getItem("afrishape_media");
    return saved ? JSON.parse(saved) : initialMedia;
  });

  const [users, setUsersState] = useState<User[]>(() => {
    const saved = localStorage.getItem("afrishape_users");
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [settings, setSettingsState] = useState<Settings>(() => {
    const saved = localStorage.getItem("afrishape_settings");
    return saved ? JSON.parse(saved) : initialSettings;
  });

  // Nouveaux states
  const [orientationGuides, setOrientationGuidesState] = useState<OrientationGuide[]>(() => {
    const saved = localStorage.getItem("afrishape_orientation");
    return saved ? JSON.parse(saved) : initialOrientationGuides;
  });

  const [podcasts, setPodcastsState] = useState<Podcast[]>(() => {
    const saved = localStorage.getItem("afrishape_podcasts");
    return saved ? JSON.parse(saved) : initialPodcasts;
  });

  const [scholarships, setScholarshipsState] = useState<Scholarship[]>(() => {
    const saved = localStorage.getItem("afrishape_scholarships");
    return saved ? JSON.parse(saved) : initialScholarships;
  });

  const [resources, setResourcesState] = useState<Resource[]>(() => {
    const saved = localStorage.getItem("afrishape_resources");
    return saved ? JSON.parse(saved) : initialResources;
  });

  // Sauvegarder dans localStorage à chaque changement
  const setHero = (data: HeroData) => {
    setHeroState(data);
    localStorage.setItem("afrishape_hero", JSON.stringify(data));
  };

  const setAbout = (data: AboutData) => {
    setAboutState(data);
    localStorage.setItem("afrishape_about", JSON.stringify(data));
  };

  const setServices = (data: Service[]) => {
    setServicesState(data);
    localStorage.setItem("afrishape_services", JSON.stringify(data));
  };

  const setProjects = (data: Project[]) => {
    setProjectsState(data);
    localStorage.setItem("afrishape_projects", JSON.stringify(data));
  };

  const setTestimonials = (data: Testimonial[]) => {
    setTestimonialsState(data);
    localStorage.setItem("afrishape_testimonials", JSON.stringify(data));
  };

  const setBlogPosts = (data: BlogPost[]) => {
    setBlogPostsState(data);
    localStorage.setItem("afrishape_blog", JSON.stringify(data));
  };

  const setMessages = (data: Message[]) => {
    setMessagesState(data);
    localStorage.setItem("afrishape_messages", JSON.stringify(data));
  };

  const setMedia = (data: Media[]) => {
    setMediaState(data);
    localStorage.setItem("afrishape_media", JSON.stringify(data));
  };

  const setUsers = (data: User[]) => {
    setUsersState(data);
    localStorage.setItem("afrishape_users", JSON.stringify(data));
  };

  const setSettings = (data: Settings) => {
    setSettingsState(data);
    localStorage.setItem("afrishape_settings", JSON.stringify(data));
  };

  // Nouvelles fonctions de sauvegarde
  const setOrientationGuides = (data: OrientationGuide[]) => {
    setOrientationGuidesState(data);
    localStorage.setItem("afrishape_orientation", JSON.stringify(data));
  };

  const setPodcasts = (data: Podcast[]) => {
    setPodcastsState(data);
    localStorage.setItem("afrishape_podcasts", JSON.stringify(data));
  };

  const setScholarships = (data: Scholarship[]) => {
    setScholarshipsState(data);
    localStorage.setItem("afrishape_scholarships", JSON.stringify(data));
  };

  const setResources = (data: Resource[]) => {
    setResourcesState(data);
    localStorage.setItem("afrishape_resources", JSON.stringify(data));
  };

  return (
    <DataContext.Provider
      value={{
        hero,
        setHero,
        about,
        setAbout,
        services,
        setServices,
        projects,
        setProjects,
        testimonials,
        setTestimonials,
        blogPosts,
        setBlogPosts,
        messages,
        setMessages,
        media,
        setMedia,
        users,
        setUsers,
        settings,
        setSettings,
        orientationGuides,
        setOrientationGuides,
        podcasts,
        setPodcasts,
        scholarships,
        setScholarships,
        resources,
        setResources,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}