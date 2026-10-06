export const missionVisionCombined =
  "The mission of SAGE is threefold: education, training, and consulting to provide knowledge, skills, and solutions respectively in RF, Microwave, and Wireless technologies. While the vision of SAGE is to be a global leader excelling in fulfilling the Mission stated.";

export const mission = missionVisionCombined;
export const vision = missionVisionCombined;

export const goalsIntro =
  "The main goals at SAGE are to offer education and training to college students, beginning engineers in industry, and experienced executives in companies, as well as consulting services to industry and academia.";

export const goals = [
  "Education entails delivering courses, including the option of receiving professional certification, and providing free accessible tutorials on the company website.",
  "Training entails offering both design and simulation tools and test equipment skills training through SAGE or in collaboration with SAGE partners and respective tools and equipment companies.",
  "Consulting entails providing engineering solutions by the SAGE experts.",
];

export const aboutShort =
  "SAGE is an international group of highly qualified engineers and entrepreneurs with deep expertise in applied electromagnetics, RF circuits and antennas, and wireless communication systems.";

export const aboutFull = `SAGE (Shastry Associates Global Enterprises) is an international group of highly qualified and accomplished engineers and entrepreneurs with extensive engineering and technology experience in industry and academia. Their knowledge is very well rooted both in the fundamentals of electronics and communication engineering in general, and in RF/Microwave/Wireless technologies in particular.

The associates in SAGE disseminate knowledge through courses, tutorials, and workshops to provide deep understanding of the subject matter and insights therein, as well as guidelines for design and applications of the theory. They also impart skills through training, customized courses, tutorials, and workshops on demand. Consulting services are available upon request to provide engineering solutions.`;

export interface Competency {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export const competencies: Competency[] = [
  {
    id: "electronics-communication",
    number: "01",
    title: "Electronics & Communication Engineering",
    description:
      "Deep expertise in the fundamentals of electronics and communication systems, providing comprehensive solutions.",
    icon: "CircuitBoard",
  },
  {
    id: "applied-electromagnetics",
    number: "02",
    title: "Applied Electromagnetics",
    description:
      "Specialized knowledge in electromagnetic theory and its practical applications in modern systems.",
    icon: "Waves",
  },
  {
    id: "rf-circuits-antennas",
    number: "03",
    title: "RF Circuits & Antennas",
    description:
      "Advanced proficiency in radio frequency circuit design and antenna systems for various applications.",
    icon: "Antenna",
  },
  {
    id: "wireless-systems",
    number: "04",
    title: "Wireless Communication Systems",
    description:
      "Comprehensive understanding of wireless technologies and communication system architectures.",
    icon: "Wifi",
  },
];

export interface Value {
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    title: "Excellence in Education",
    description:
      "Committed to delivering the highest quality educational experiences and knowledge transfer.",
  },
  {
    title: "Innovation & Insight",
    description:
      "Providing cutting-edge insights and innovative approaches to engineering challenges.",
  },
  {
    title: "Collaboration & Partnership",
    description:
      "Building strong relationships with clients, academia, and industry partners.",
  },
  {
    title: "Results-Oriented",
    description:
      "Focused on delivering practical, actionable results that drive real-world success.",
  },
];

export interface TimelineStep {
  year: string;
  title: string;
  description: string;
}

export const aboutHeritageTimeline: TimelineStep[] = [
  {
    year: "Legacy & Origins",
    title: "Boutique RF Technical Advisory",
    description:
      "Founded by senior electromagnetics engineers to provide specialized consulting for complex industrial RF and microwave design challenges.",
  },
  {
    year: "Educational Expansion",
    title: "Bench-Guided Lab Modules",
    description:
      "Launched structured training curricula bridging university electromagnetic theory with real-world bench measurements and instrument practice.",
  },
  {
    year: "Global Reach",
    title: "International Associate Network",
    description:
      "Expanded engineering associates across USA, India, South Korea, and Europe to deliver global corporate advisory and workshop programs.",
  },
  {
    year: "Enterprise Platform",
    title: "Next-Gen Enterprise Portal",
    description:
      "Established modern e-learning and consulting portals supporting R&D teams in 5G/6G, satellite communications, and high-frequency RFICs.",
  },
];

export interface AboutPillar {
  title: string;
  description: string;
  iconName: string;
}

export const aboutPillars: AboutPillar[] = [
  {
    title: "Uncompromising Technical Rigor",
    description:
      "No marketing fluff or simplified shortcuts. Every course and advisory engagement is grounded in electromagnetic fundamentals and verified data.",
    iconName: "ShieldCheck",
  },
  {
    title: "Global Expert Network",
    description:
      "Collaborative associate network spanning research universities, semiconductor hubs, and international telecommunications R&D centers.",
    iconName: "Globe2",
  },
  {
    title: "Academic & Industry Synergy",
    description:
      "Bridging advanced academic research with commercial product realities, helping engineers design manufacturable, high-yield RF systems.",
    iconName: "GraduationCap",
  },
  {
    title: "Practical Bench Mastery",
    description:
      "Focus on design guidelines, circuit layouts, spectrum analysis, noise figure optimization, and practical lab instrumentation.",
    iconName: "Cpu",
  },
];
