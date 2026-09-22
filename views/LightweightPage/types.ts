export interface LightweightHighlight {
  icon: string;
  heading: string;
  description: string;
}

export interface LightweightPageConfig {
  heroKey: string;
  title: string;
  subtitle: string;
  introParagraph: string;
  introImage: string;
  highlights: LightweightHighlight[];
  relatedCollection: 'courses' | 'services';
  ctaTitle: string;
  ctaLabel: string;
  ctaHref: string;
}

import type { Course, Service } from 'lib/content';

export interface LightweightPageProps {
  config: LightweightPageConfig;
  relatedCourses?: Course[];
  relatedServices?: Service[];
}
