export interface Service {
  id: 'training' | 'consulting' | 'custom-courses' | 'workshops';
  name: string;
  tagline: string;
  description: string;
  icon: string; // icon id from components/Icon.tsx
  href: string;
}

export const services: Service[] = [
  {
    id: 'training',
    name: 'Training Programs',
    tagline: 'Comprehensive courses to build strong engineering foundations and advanced skills.', // TODO(scarlet)
    description: 'Comprehensive training courses designed to build strong foundations and advanced skills in electronics and communication engineering.', // TODO(scarlet)
    icon: 'training',
    href: '/training',
  },
  {
    id: 'consulting',
    name: 'Consulting Services',
    tagline: 'Expert consulting to help solve complex engineering challenges.', // TODO(scarlet)
    description: 'Expert consulting to help solve complex engineering challenges and optimize your technology solutions.', // TODO(scarlet)
    icon: 'consulting',
    href: '/consulting',
  },
  {
    id: 'custom-courses',
    name: 'Customized Courses',
    tagline: 'Tailored educational programs designed specifically for your organization.', // TODO(scarlet)
    description: "Tailored educational programs designed specifically for your organization's unique requirements and objectives.", // TODO(scarlet)
    icon: 'custom-courses',
    href: '/courses',
  },
  {
    id: 'workshops',
    name: 'Workshops & Tutorials',
    tagline: 'Interactive workshops providing practical insights and real-world applications.', // TODO(scarlet)
    description: 'Interactive workshops and hands-on tutorials providing practical insights and real-world applications.', // TODO(scarlet)
    icon: 'workshops',
    href: '/workshops',
  },
];
