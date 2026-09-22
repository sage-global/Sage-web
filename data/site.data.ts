import type { ReactNode } from "react";

export const siteConfig = {
  name: "SAGE",
  fullName: "Shastry Associates Global Enterprises",
  legalName: "Shastry Associates Global Enterprises, LLC",
  tagline: "Professional RF, Microwave & Wireless Engineering Education",
  description:
    "SAGE provides expert-led training, consulting, workshops, and courses in radio frequency, microwave, applied electromagnetics, antennas, and wireless communication systems.",
  url: "https://shastryassociates.com",
  email: "info@shastryassociates.com",
  phone: null as string | null, // TODO: confirm
  address: null as string | null, // TODO: confirm
  established: null as number | null, // TODO: confirm year
  social: {
    linkedin: null as string | null, // TODO: confirm
    twitter: null as string | null,
    youtube: null as string | null,
  },
};

export const brandColors = {
  deepBlue: "#006AAD",
  skyBlue: "#35A9EF",
  orange: "#FB6B31",
  ink: "#0F172A",
  paper: "#FFFFFF",
  warm: "#F8FBFF",
  line: "#E2E8F0",
  muted: "#64748B",
  softBlue: "#EBF6FE",
  success: "#16A34A",
  error: "#DC2626",
} as const;

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "RF Engineering", href: "/courses#rf-engineering" },
      { label: "Microwave", href: "/courses#microwave" },
      { label: "Wireless Systems", href: "/courses#wireless" },
      { label: "Antennas", href: "/courses#antennas" },
      { label: "Signal Processing", href: "/courses#signal-processing" },
      { label: "Circuit Design", href: "/courses#circuit-design" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Training Programs", href: "/training" },
      { label: "Consulting", href: "/consulting" },
      { label: "Custom Courses", href: "/courses" },
      { label: "Workshops & Tutorials", href: "/workshops" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export interface Crumb {
  label: string;
  href: string;
}

export type PageHeroData = {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  imageSrc?: string; // omit for legal / 404
  imagePublicId?: string; // Cloudinary public ID
  extra?: ReactNode;
};

export const pageHeroes: Record<string, PageHeroData> = {
  '/about': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
    ],
    title: 'About Us',
    description: 'Applied electromagnetics, taught with engineering rigor. Founded by RF and microwave veterans to bridge graduate theory with the industry bench.',
    imageSrc: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80',
  },
  '/team': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Faculty & Associates', href: '/team' },
    ],
    title: 'Faculty & Associates',
    description: 'Our international faculty and corporate advisors bring decades of engineering leadership from top research institutions, semiconductor centers, and industrial laboratories.',
    imageSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80',
  },
  '/mission': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Mission & Vision', href: '/mission' },
    ],
    title: 'Mission & Vision',
    description: 'To disseminate knowledge and information in applied electromagnetics and radio frequency wireless systems engineering globally.',
    imageSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
  },
  '/contact': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
    title: 'Get in Touch',
    description: 'Have questions about our RF, microwave, and wireless training programs, consulting, or customized workshops? Connect with our specialist team.',
    imageSrc: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80',
  },
  '/events': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events' },
    ],
    title: 'Events',
    description: 'Hands-on hackathons, workshops & engineering meetups',
    imagePublicId: 'sage/pages/events.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
  },
  'events': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events' },
    ],
    title: 'Events',
    description: 'Hands-on hackathons, workshops & engineering meetups',
    imagePublicId: 'sage/pages/events.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
  },
  '/services': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
    ],
    title: 'What We Offer',
    description: 'Expert training programs, specialized engineering consulting, customized courses, and hands-on workshops tailored to your organization.',
    imagePublicId: 'sage/pages/services.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
  },
  'services': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
    ],
    title: 'What We Offer',
    description: 'Expert training programs, specialized engineering consulting, customized courses, and hands-on workshops tailored to your organization.',
    imagePublicId: 'sage/pages/services.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
  },
  '/courses': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: '/courses' },
    ],
    title: 'Courses',
    description: 'Master the art of RF & wireless engineering',
    imagePublicId: 'sage/pages/courses.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
  },
  'courses': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: '/courses' },
    ],
    title: 'Courses',
    description: 'Master the art of RF & wireless engineering',
    imagePublicId: 'sage/pages/courses.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
  },
  '/tutorials': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Tutorials', href: '/tutorials' },
    ],
    title: 'Tutorials',
    description: 'Step-by-step guided learning in RF circuit analysis, applied electromagnetics, and system design.',
    imagePublicId: 'sage/pages/tutorials.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1600&q=80',
  },
  'tutorials': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Tutorials', href: '/tutorials' },
    ],
    title: 'Tutorials',
    description: 'Step-by-step guided learning in RF circuit analysis, applied electromagnetics, and system design.',
    imagePublicId: 'sage/pages/tutorials.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1600&q=80',
  },
  '/workshops': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Workshops', href: '/workshops' },
    ],
    title: 'Workshops',
    description: 'Hands-on design-and-test sessions bridging theory with prototype verification and measurement.',
    imagePublicId: 'sage/pages/workshops.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80',
  },
  'workshops': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Workshops', href: '/workshops' },
    ],
    title: 'Workshops',
    description: 'Hands-on design-and-test sessions bridging theory with prototype verification and measurement.',
    imagePublicId: 'sage/pages/workshops.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80',
  },
  '/training': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Training', href: '/training' },
    ],
    title: 'Training',
    description: 'Corporate & academic programs tailored to upskill engineering teams in modern wireless systems.',
    imagePublicId: 'sage/pages/training.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80',
  },
  'training': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Training', href: '/training' },
    ],
    title: 'Training',
    description: 'Corporate & academic programs tailored to upskill engineering teams in modern wireless systems.',
    imagePublicId: 'sage/pages/training.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80',
  },
  '/consulting': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Consulting', href: '/consulting' },
    ],
    title: 'Consulting',
    description: 'Expert RF/wireless guidance to resolve critical electromagnetic challenges and optimize transceiver performance.',
    imagePublicId: 'sage/pages/consulting.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
  },
  'consulting': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Consulting', href: '/consulting' },
    ],
    title: 'Consulting',
    description: 'Expert RF/wireless guidance to resolve critical electromagnetic challenges and optimize transceiver performance.',
    imagePublicId: 'sage/pages/consulting.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
  },
  '/news': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'News & Articles', href: '/news' },
    ],
    title: 'News & Articles',
    description: 'Technical articles, research developments, industry trends, and announcements from SAGE global associates.',
    imagePublicId: 'sage/pages/news.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80',
  },
  'news': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'News & Articles', href: '/news' },
    ],
    title: 'News & Articles',
    description: 'Technical articles, research developments, industry trends, and announcements from SAGE global associates.',
    imagePublicId: 'sage/pages/news.jpg',
    imageSrc: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80',
  },
};
