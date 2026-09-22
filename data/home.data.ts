
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  isPlaceholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "test1",
    quote:
      "SAGE provided me with the practical skills I needed to excel in my career. The instructors are true industry experts.",
    name: "John Anderson",
    title: "Senior RF Engineer",
    isPlaceholder: true,
  },
  {
    id: "test2",
    quote:
      "The 5G course was comprehensive and up-to-date with the latest industry standards. Highly recommended!",
    name: "Priya Sharma",
    title: "Wireless Systems Architect",
    isPlaceholder: true,
  },
  {
    id: "test3",
    quote:
      "As a student, the foundational courses in Microwave engineering were exactly what I needed to bridge the gap between theory and practice.",
    name: "Marcus Thorne",
    title: "Graduate Student",
    isPlaceholder: true,
  },
];

export const homeCopy = {
  hero: {
    eyebrow: "SAGE Professional Education",
    heading: "Master the art of RF & wireless engineering.",
    body: "Expert-led learning and consulting for the systems shaping a connected world.",
    primaryCta: { label: "Explore Courses", href: "/courses" },
    secondaryCta: { label: "Talk to an Expert", href: "/contact" },
  },
  stats: [
    { value: "25+", label: "Years of Experience", isPlaceholder: false },
    { value: "15+", label: "Global Associates", isPlaceholder: false },
    { value: "4", label: "Core Disciplines", isPlaceholder: false },
  ],
  competenciesHeading: "Our Expertise",
  competenciesSubheading: "Core Competencies",
  coursesHeading: "Featured Courses",
  coursesSubheading: "Build from fundamentals. Design for reality.",
  coursesBody:
    "Carefully structured courses that take you from theory to confident engineering practice.",
  whyHeading: "Why SAGE?",
  whyBody:
    "We provide more than just education; we provide the tools for your professional success in the wireless industry.",
  ctaHeading: "Your next system begins with deeper understanding.",
  ctaBody:
    "Build the practical expertise to analyse, design, and deliver modern RF and wireless systems.",
  ctaPrimary: { label: "Explore Learning Paths", href: "/courses" },
  ctaSecondary: { label: "Start a Conversation", href: "/contact" },
};

export const whyFeatures = [
  {
    title: "Expert Instructors",
    description:
      "Learn from engineers and educators with decades of practical experience in RF and Microwave systems.",
    icon: "GraduationCap",
  },
  {
    title: "Flexible Learning",
    description:
      "Access courses on-site, off-site, and online. Our delivery adapts to your schedule and needs.",
    icon: "Globe",
  },
  {
    title: "Practical Focus",
    description:
      "Every course bridges electromagnetic theory with real-world design guidelines and applications.",
    icon: "Wrench",
  },
  {
    title: "Tailored Programs",
    description:
      "Custom courses, workshops, and consulting designed around your organisation's specific engineering challenges.",
    icon: "Settings",
  },
];
