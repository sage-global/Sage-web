import type { NextApiRequest, NextApiResponse } from 'next';
import { courses } from 'data/courses.data';
import { newslettersData } from 'data/newsletters.data';
import { teamMembers } from 'data/team.data';

export interface SearchResultItem {
  id: string;
  type: 'course' | 'team' | 'newsletter' | 'page';
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  category?: string;
}

export interface SearchResponse {
  query: string;
  results: SearchResultItem[];
  total: number;
}

const STATIC_PAGES: Array<{ title: string; subtitle: string; description: string; url: string; keywords: string[] }> = [
  {
    title: 'About Us',
    subtitle: 'Organization Overview & History',
    description: 'Learn about SAGE (Shastry Associates Global Enterprises) — empowering RF, microwave, and wireless engineers with practical training and global corporate advisory.',
    url: '/about',
    keywords: ['about', 'sage', 'shastry', 'history', 'mission', 'vision', 'company', 'organization'],
  },
  {
    title: 'Executive & Technical Advisory Team',
    subtitle: 'Faculty & Industry Experts',
    description: 'Meet our international network of distinguished faculty, RF leaders, microwave researchers, and industry consultants.',
    url: '/team',
    keywords: ['team', 'faculty', 'instructors', 'experts', 'advisors', 'board', 'prasad shastry', 'm h kori'],
  },
  {
    title: 'Courses & Masterclasses',
    subtitle: 'RF, Microwave & Antenna Training',
    description: 'Explore comprehensive courses in advanced RF system design, passive microwave circuits, 5G wireless networks, antenna theory, and DSP.',
    url: '/courses',
    keywords: ['courses', 'training', 'masterclass', 'rf', 'microwave', 'antennas', '5g', 'dsp', 'pcb'],
  },
  {
    title: 'Events & Workshops',
    subtitle: 'Upcoming Hands-on Sessions',
    description: 'Participate in live hands-on engineering workshops, tutorials, IEEE student branch sessions, and corporate seminars.',
    url: '/events',
    keywords: ['events', 'workshops', 'seminars', 'tutorials', 'training', 'ieee', 'hands-on'],
  },
  {
    title: 'Newsletter & Technical Digest',
    subtitle: 'Technical Publications & Insights',
    description: 'Read technical digests, whitepapers, and monthly engineering newsletters curated by SAGE experts.',
    url: '/newsletter',
    keywords: ['newsletter', 'digest', 'publications', 'whitepaper', 'articles', 'research', 'read'],
  },
  {
    title: 'Contact Us',
    subtitle: 'Get In Touch',
    description: 'Inquire about custom corporate workshops, technical advisory, university training sessions, or partnership opportunities.',
    url: '/contact',
    keywords: ['contact', 'inquire', 'support', 'email', 'phone', 'advisory', 'help', 'hire'],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse | { error: string }>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const queryParam = req.query.q;
  const query = typeof queryParam === 'string' ? queryParam.trim().toLowerCase() : '';

  if (!query) {
    return res.status(200).json({ query: '', results: [], total: 0 });
  }

  const results: SearchResultItem[] = [];

  // Search Courses
  courses.forEach((c) => {
    const textToSearch = `${c.title} ${c.category} ${c.description} ${c.level || ''} ${c.slug}`.toLowerCase();
    if (textToSearch.includes(query)) {
      results.push({
        id: `course-${c.id}`,
        type: 'course',
        title: c.title,
        subtitle: `Course • ${c.category}${c.level ? ` (${c.level})` : ''}`,
        description: c.description,
        url: `/courses/${c.slug}`,
        category: c.category,
      });
    }
  });

  // Search Team Members
  teamMembers.forEach((m) => {
    const textToSearch = `${m.name} ${m.role} ${m.affiliation || ''} ${m.disciplineLabel} ${m.bio} ${m.specializations.join(' ')} ${m.coursesTaught.join(' ')}`.toLowerCase();
    if (textToSearch.includes(query)) {
      results.push({
        id: `team-${m.id}`,
        type: 'team',
        title: m.name,
        subtitle: `${m.role}${m.degrees ? ` (${m.degrees})` : ''}`,
        description: m.affiliation || m.bio.substring(0, 140) + '...',
        url: `/team/${m.slug}`,
        category: m.disciplineLabel,
      });
    }
  });

  // Search Newsletters
  newslettersData.forEach((n) => {
    const textToSearch = `${n.title} ${n.edition} ${n.summary} ${n.tags.join(' ')}`.toLowerCase();
    if (textToSearch.includes(query)) {
      results.push({
        id: `newsletter-${n.id}`,
        type: 'newsletter',
        title: n.title,
        subtitle: `Digest • ${n.edition} (${n.date})`,
        description: n.summary,
        url: n.pdfUrl || '/newsletter',
        category: 'Newsletter',
      });
    }
  });

  // Search Static Pages
  STATIC_PAGES.forEach((p, idx) => {
    const textToSearch = `${p.title} ${p.subtitle} ${p.description} ${p.keywords.join(' ')}`.toLowerCase();
    if (textToSearch.includes(query)) {
      results.push({
        id: `page-${idx}`,
        type: 'page',
        title: p.title,
        subtitle: `Page • ${p.subtitle}`,
        description: p.description,
        url: p.url,
        category: 'Page',
      });
    }
  });

  return res.status(200).json({
    query,
    results,
    total: results.length,
  });
}
