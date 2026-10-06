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
    description: 'Global RF and microwave experts and professionals striving for excellence in disseminating knowledge, skills, and solutions.',
  },
  '/team': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Meet Our Team', href: '/team' },
    ],
    title: 'Meet Our Team',
    description: 'Our international instructors, research fellows, and corporate advisors bring decades of engineering leadership from top research institutions, semiconductor centers, and industrial laboratories.',
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
    title: 'Upcoming & Past Events',
    description: 'Explore technical symposiums, hands-on workshops, engineering hackathons, and webinars organized by SAGE globally.',
    imageSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
  },
  '/gallery': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events' },
      { label: 'Photo Gallery', href: '/gallery' },
    ],
    title: 'Photo Gallery',
    description: 'Moments and photo highlights from SAGE international inaugurations, technical symposiums, university workshops, and academic leadership gatherings.',
    imageSrc: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=80',
  },
  '/photos': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Events', href: '/events' },
      { label: 'Photo Gallery', href: '/photos' },
    ],
    title: 'Photo Gallery',
    description: 'Moments and photo highlights from SAGE international inaugurations, technical symposiums, university workshops, and academic leadership gatherings.',
    imageSrc: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=80',
  },
  '/news': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'News', href: '/news' },
    ],
    title: 'SAGE News & Technical Insights',
    description: 'Latest institutional updates, engineering breakthroughs, publications, and milestone announcements from SAGE global network.',
    imageSrc: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80',
  },
  '/training': {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Training Programs', href: '/training' },
    ],
    title: 'Professional Training Programs',
    description: 'Specialized RF, microwave, and wireless engineering curricula bridging fundamental electromagnetic principles with state-of-the-art industrial practice.',
    imageSrc: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80',
  },
};
