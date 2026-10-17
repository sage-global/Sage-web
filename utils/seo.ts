import { TeamMember } from 'sage-data';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'https://shastryassociates.com');
export const DEFAULT_OG_IMAGE = `${SITE_URL}/sage-og-card.png`;
export const SITE_NAME = 'SAGE — Shastry Associates Global Enterprises';
export const DEFAULT_DESCRIPTION =
  'SAGE provides expert-led training, consulting, and courses in RF, microwave, applied electromagnetics, antennas, and wireless systems.';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Builds the canonical title formatted with site standard (kept <= 60 chars)
 */
export function formatTitle(title: string): string {
  if (title.includes('SAGE')) return title;
  return `${title} | SAGE`;
}

/**
 * Generates JSON-LD Structured Data for the Educational Organization
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Shastry Associates Global Enterprises (SAGE)',
    alternateName: 'SAGE',
    legalName: 'Shastry Associates Global Enterprises, LLC',
    url: SITE_URL,
    logo: `${SITE_URL}/Shastryhexagon(Orange).png`,
    description: DEFAULT_DESCRIPTION,
    email: 'info@shastryassociates.com',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@shastryassociates.com',
      contactType: 'Advisory & Customer Support',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/shastry-associates',
    ],
  };
}

/**
 * Generates JSON-LD Structured Data for the WebSite entity
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Shastry Associates Global Enterprises',
      logo: `${SITE_URL}/Shastryhexagon(Orange).png`,
    },
  };
}

/**
 * Generates JSON-LD Structured Data for a Faculty / Specialist profile
 */
export function getPersonSchema(member: TeamMember, avatarSrc?: string | null) {
  const sameAsLinks = [
    member.socialLinks?.linkedin && member.socialLinks.linkedin !== '#' ? member.socialLinks.linkedin : null,
    member.socialLinks?.scholar && member.socialLinks.scholar !== '#' ? member.socialLinks.scholar : null,
    member.socialLinks?.orcid && member.socialLinks.orcid !== '#' ? member.socialLinks.orcid : null,
    member.socialLinks?.website && member.socialLinks.website !== '#' ? member.socialLinks.website : null,
    member.socialLinks?.facebook && member.socialLinks.facebook !== '#' ? member.socialLinks.facebook : null,
  ].filter(Boolean) as string[];

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Shastry Associates Global Enterprises (SAGE)',
      url: SITE_URL,
    },
    url: `${SITE_URL}/team/${member.slug}`,
    description: member.bio ? member.bio.substring(0, 250).replace(/\r?\n/g, ' ') : undefined,
  };

  if (avatarSrc) {
    schema.image = avatarSrc.startsWith('http') ? avatarSrc : `${SITE_URL}${avatarSrc}`;
  }

  if (member.affiliation) {
    schema.affiliation = {
      '@type': 'Organization',
      name: member.affiliation,
    };
  }

  if (sameAsLinks.length > 0) {
    schema.sameAs = sameAsLinks;
  }

  if (member.specializations && member.specializations.length > 0) {
    schema.knowsAbout = member.specializations;
  }

  if (member.degrees) {
    schema.alumniOf = member.degrees;
  }

  if (member.ieeeStatus) {
    schema.honorificPrefix = member.ieeeStatus;
  }

  return schema;
}

/**
 * Generates JSON-LD Structured Data for Breadcrumbs
 */
export function getBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: crumb.href.startsWith('http') ? crumb.href : `${SITE_URL}${crumb.href}`,
    })),
  };
}
