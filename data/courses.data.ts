export const courseCategories = [
  { id: "rf-engineering", label: "RF Engineering" },
  { id: "microwave", label: "Microwave" },
  { id: "wireless", label: "Wireless" },
  { id: "antennas", label: "Antennas" },
  { id: "signal-processing", label: "Signal Processing" },
  { id: "circuit-design", label: "Circuit Design" },
] as const;

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  longDescription: string | null;
  price: number;
  currency: string;
  duration: string | null; // TODO: confirm
  level: string | null; // TODO: confirm
  instructor: string | null; // TODO: confirm — draft names were placeholders
  image: {
    src: string;
    alt: string;
    isPlaceholder: boolean;
  };
  syllabus: string[] | null; // TODO: add when available
  featured?: boolean;
  isPlaceholder: boolean;
}

export const courses: Course[] = [
  {
    id: "c1",
    slug: "advanced-rf-system-design",
    title: "Advanced RF System Design & Analysis",
    category: "RF Engineering",
    categoryId: "rf-engineering",
    description:
      "Noise figure, linearity (IP3), compression, and link budget calculations for high-performance RF systems.",
    longDescription: null,
    price: 199,
    currency: "USD",
    duration: "8 Weeks (40 Hours)",
    level: "Advanced",
    instructor: "Dr. S.N. Prasad",
    image: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      alt: "Electronic circuit board close-up",
      isPlaceholder: true,
    },
    syllabus: [
      "Module 1: RF System Architectures, Cascaded Noise Figure & Linearity (IIP3/OIP3)",
      "Module 2: Dynamic Range, Gain Compression Points & Phase Noise Considerations",
      "Module 3: Impedance Matching Networks, Smith Chart Calculations & S-Parameter Verification",
      "Module 4: Link Budget Analysis for Terrestrial, Cellular & Satellite Links",
      "Module 5: Practical RF Simulation Workflows & Vector Network Analyzer (VNA) Verification",
    ],
    featured: true,
    isPlaceholder: true,
  },
  {
    id: "c2",
    slug: "microwave-passive-circuits",
    title: "Microwave Passive Circuits & Networks",
    category: "Microwave",
    categoryId: "microwave",
    description:
      "Multi-port junctions, power dividers (Wilkinson), couplers (Branch-line, Lange), and cavity resonators.",
    longDescription: null,
    price: 149,
    currency: "USD",
    duration: null,
    level: "Intermediate",
    instructor: null,
    image: {
      src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&q=80",
      alt: "Engineer working with electronic measurement equipment",
      isPlaceholder: true,
    },
    syllabus: null,
    isPlaceholder: true,
  },
  {
    id: "c3",
    slug: "5g-wireless-communication-systems",
    title: "5G Wireless Communication Systems",
    category: "Wireless",
    categoryId: "wireless",
    description:
      "5G NR architecture, sub-6GHz and mmWave deployments, and network slicing topology.",
    longDescription: null,
    price: 249,
    currency: "USD",
    duration: null,
    level: "Advanced",
    instructor: null,
    image: {
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
      alt: "Telecommunication tower and network infrastructure",
      isPlaceholder: true,
    },
    syllabus: null,
    isPlaceholder: true,
  },
  {
    id: "c4",
    slug: "antenna-theory-and-design",
    title: "Antenna Theory and Design",
    category: "Antennas",
    categoryId: "antennas",
    description:
      "Radiation pattern, gain, efficiency, impedance, polarization, and array parameters.",
    longDescription: null,
    price: 179,
    currency: "USD",
    duration: null,
    level: "Intermediate",
    instructor: null,
    image: {
      src: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80",
      alt: "Satellite dish and antenna array",
      isPlaceholder: true,
    },
    syllabus: null,
    isPlaceholder: true,
  },
  {
    id: "c5",
    slug: "dsp-for-rf-systems",
    title: "Digital Signal Processing for RF Systems",
    category: "Signal Processing",
    categoryId: "signal-processing",
    description:
      "Digital upconverters (DUC), downconverters (DDC), and numerically controlled oscillators (NCOs).",
    longDescription: null,
    price: 129,
    currency: "USD",
    duration: null,
    level: "Intermediate",
    instructor: null,
    image: {
      src: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80",
      alt: "Engineer writing code for signal processing",
      isPlaceholder: true,
    },
    syllabus: null,
    isPlaceholder: true,
  },
  {
    id: "c6",
    slug: "high-speed-pcb-design",
    title: "High-Speed PCB Design & Signal Integrity",
    category: "Circuit Design",
    categoryId: "circuit-design",
    description:
      "High-speed trace routing, impedance continuity, decoupling capacitor networks, and crosstalk shielding.",
    longDescription: null,
    price: 159,
    currency: "USD",
    duration: null,
    level: "Advanced",
    instructor: null,
    image: {
      src: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=80",
      alt: "Printed circuit board macro photography",
      isPlaceholder: true,
    },
    syllabus: null,
    isPlaceholder: true,
  },
];
