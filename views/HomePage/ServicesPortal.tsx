import NextLink from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';
import { media } from 'utils/media';

interface ServiceTab {
  id: string;
  title: string;
  badge: string;
  icon: string;
  headline: string;
  description: string;
  highlights: string[];
  formats: string[];
  ctaText: string;
  ctaLink: string;
  imageBg: string;
  imageUrl: string;
  accentColor: string;
}

const SERVICE_TABS: ServiceTab[] = [
  {
    id: 'courses',
    title: 'Courses',
    badge: 'Educational Programs',
    icon: 'courses',
    headline: 'Structured Engineering Courses from Fundamentals to Advanced Design',
    description:
      'Rigorous, self-paced and instructor-led courses covering RF circuit design, microwave passive networks, 5G wireless architectures, and antenna theory.',
    highlights: [
      'Comprehensive curriculum with real-world circuit formulas',
      'Hands-on design exercises and prototype guidelines',
      'Certificate of completion from SAGE senior faculty',
    ],
    formats: ['Online Self-Paced', 'Live Online Seminars', 'Campus Sessions'],
    ctaText: 'Explore All Courses',
    ctaLink: '/courses',
    imageBg: 'linear-gradient(135deg, rgba(0, 106, 173, 0.92) 0%, rgba(15, 23, 42, 0.95) 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    accentColor: '#FB6B31',
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    badge: 'Applied Guides',
    icon: 'tutorials',
    headline: 'In-Depth Technical Tutorials & Mathematical Insights',
    description:
      'Clear, practical tutorials bridging complex electromagnetic theory with physical circuit design guidelines, S-parameter analysis, and link budgets.',
    highlights: [
      'Step-by-step mathematical derivations & design rules',
      'Applied electromagnetics & impedance matching guides',
      'Downloadable design tables and calculation cheatsheets',
    ],
    formats: ['Web Tutorials', 'PDF Reference Guides', 'Video Demonstrations'],
    ctaText: 'Browse Tutorials',
    ctaLink: '/tutorials',
    imageBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(0, 106, 173, 0.95) 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=900&q=80',
    accentColor: '#35A9EF',
  },
  {
    id: 'training',
    title: 'Training',
    badge: 'Professional Upskilling',
    icon: 'training',
    headline: 'Customized Training Programs for Industry Teams & Faculty',
    description:
      'Targeted professional development programs designed for corporate R&D teams, engineering organizations, and university faculty looking to upgrade their skills.',
    highlights: [
      'Tailored curriculum mapped to your team engineering goals',
      'Flexible scheduling: on-site, off-site, or live online',
      'Direct interaction with veteran RF industry associates',
    ],
    formats: ['Corporate On-Site', 'Off-Site Retreats', 'Virtual Bootcamps'],
    ctaText: 'Request Training Info',
    ctaLink: '/training',
    imageBg: 'linear-gradient(135deg, rgba(0, 106, 173, 0.92) 0%, rgba(30, 41, 59, 0.95) 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
    accentColor: '#FB6B31',
  },
  {
    id: 'consulting',
    title: 'Consulting',
    badge: 'Expert Advisory',
    icon: 'consulting',
    headline: 'Specialized RF, Microwave & Wireless System Consulting',
    description:
      'Direct consulting engagements with Dr. S.N. Prasad and senior SAGE associates to solve critical electromagnetic design challenges and optimize system performance.',
    highlights: [
      'Antenna array optimization & beamforming consulting',
      'RF transceiver architecture review & troubleshooting',
      'Electromagnetic compatibility (EMC) & signal integrity',
    ],
    formats: ['Direct Retainer', 'Project-Based Advisory', 'Design Audits'],
    ctaText: 'Explore Consulting',
    ctaLink: '/consulting',
    imageBg: 'linear-gradient(135deg, rgba(21, 128, 61, 0.9) 0%, rgba(0, 106, 173, 0.95) 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    accentColor: '#FB6B31',
  },
  {
    id: 'workshops',
    title: 'Workshops',
    badge: 'Interactive Seminars',
    icon: 'workshops',
    headline: 'Hands-On Technical Workshops & Interactive Seminars',
    description:
      'Intensive 1-day to 3-day technical workshops focusing on specialized topics in mmWave circuits, 5G wireless deployment, and microwave component measurement.',
    highlights: [
      'Interactive problem-solving & prototype design labs',
      'Guest lectures by international faculty & industry leaders',
      'Networking with fellow wireless & microwave engineers',
    ],
    formats: ['On-Site Workshops', 'IEEE Conference Sessions', 'Webinars'],
    ctaText: 'View Workshops',
    ctaLink: '/workshops',
    imageBg: 'linear-gradient(135deg, rgba(3, 105, 161, 0.92) 0%, rgba(53, 169, 239, 0.95) 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    accentColor: '#FB6B31',
  },
  {
    id: 'news',
    title: 'News',
    badge: 'Research & Industry Updates',
    icon: 'news',
    headline: 'Latest SAGE Announcements, Research Insights & Publications',
    description:
      'Stay informed with technical articles, research publications, industry trends, and institutional announcements from the SAGE global network.',
    highlights: [
      'Peer-reviewed insights & IEEE publication summaries',
      'Industry trend analysis in 5G, 6G, and satellite RF',
      'SAGE global associate news and milestone updates',
    ],
    formats: ['Editorial Articles', 'Research Papers', 'Quarterly Digest'],
    ctaText: 'Read Latest News',
    ctaLink: '/news',
    imageBg: 'linear-gradient(135deg, rgba(51, 65, 85, 0.92) 0%, rgba(0, 106, 173, 0.95) 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80',
    accentColor: '#35A9EF',
  },
  {
    id: 'events',
    title: 'Upcoming Events',
    badge: 'Global Schedule',
    icon: 'events',
    headline: 'Upcoming Webinars, IEEE Keynotes & Academic Conferences',
    description:
      'Explore upcoming international keynote addresses, conference presentations, IEEE chapter meetings, and virtual Q&A sessions hosted by SAGE.',
    highlights: [
      'Live Q&A sessions with senior RF & wireless experts',
      'Keynote addresses at international IEEE symposia',
      'Free informational webinars for engineering students',
    ],
    formats: ['IEEE Symposia', 'Global Webinars', 'Academic Panels'],
    ctaText: 'Check Event Calendar',
    ctaLink: '/events',
    imageBg: 'linear-gradient(135deg, rgba(0, 106, 173, 0.92) 0%, rgba(2, 132, 199, 0.95) 100%)',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80',
    accentColor: '#FB6B31',
  },
];

function TabIcon({ name, size = '1.8rem', color = 'currentColor' }: { name: string; size?: string; color?: string }) {
  const props = {
    width: size,
    height: size,
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
  };

  switch (name) {
    case 'courses':
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M12 6h4" />
          <path d="M12 10h4" />
        </svg>
      );
    case 'tutorials':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case 'training':
      return (
        <svg {...props}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'consulting':
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'workshops':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'news':
      return (
        <svg {...props}>
          <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
          <line x1="7" y1="8" x2="13" y2="8" />
          <line x1="7" y1="12" x2="11" y2="12" />
        </svg>
      );
    case 'events':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesPortal() {
  const [activeTab, setActiveTab] = useState<ServiceTab>(SERVICE_TABS[0]);

  return (
    <SectionWrapper>
      <Container>
        <HeaderContainer>
          <OverTitle>SAGE Ecosystem</OverTitle>
          <Title>Services & Specialized Offerings</Title>
          <LeadText>
            Select a discipline to explore tailored learning, specialized consulting, workshops, and industry insights.
          </LeadText>
        </HeaderContainer>

        {/* Tab Selector Pills */}
        <TabPillsRow>
          {SERVICE_TABS.map((tab) => {
            const isActive = tab.id === activeTab.id;
            return (
              <PillButton
                key={tab.id}
                isActive={isActive}
                onClick={() => setActiveTab(tab)}
              >
                <PillIcon>
                  <TabIcon name={tab.icon} size="1.8rem" color={isActive ? '#FFFFFF' : 'rgb(var(--brandBlue, 0, 106, 173))'} />
                </PillIcon>
                <span>{tab.title}</span>
                {isActive && <ActiveIndicator />}
              </PillButton>
            );
          })}
        </TabPillsRow>

        {/* Split View Content Portal */}
        <PortalContainer>
          {/* Left Info Panel */}
          <InfoPanel>
            <BadgeRow>
              <BadgeTag>{activeTab.badge}</BadgeTag>
              <FormatsText>{activeTab.formats.join(' • ')}</FormatsText>
            </BadgeRow>

            <Headline>{activeTab.headline}</Headline>
            <Description>{activeTab.description}</Description>

            <HighlightsList>
              {activeTab.highlights.map((item, idx) => (
                <HighlightItem key={idx}>
                  <CheckIcon>✓</CheckIcon>
                  <span>{item}</span>
                </HighlightItem>
              ))}
            </HighlightsList>

            <CtaButtonRow>
              <NextLink href={activeTab.ctaLink} passHref>
                <Button>
                  {activeTab.ctaText} <span>&rarr;</span>
                </Button>
              </NextLink>
            </CtaButtonRow>
          </InfoPanel>

          {/* Right Visual Card Panel */}
          <VisualCardPanel bgGradient={activeTab.imageBg} bgImage={activeTab.imageUrl}>
            <CardHeaderOverlay>
              <BrandMark>SAGE.</BrandMark>
              <CategoryBadge>{activeTab.title}</CategoryBadge>
            </CardHeaderOverlay>

            <AccentDivider style={{ background: activeTab.accentColor }} />

            <CardBodyContent>
              <IconDisplay>
                <TabIcon name={activeTab.icon} size="3.6rem" color="#FFFFFF" />
              </IconDisplay>
              <CardTitle>{activeTab.headline}</CardTitle>
              <FormatPillsRow>
                {activeTab.formats.map((fmt) => (
                  <FormatChip key={fmt}>{fmt}</FormatChip>
                ))}
              </FormatPillsRow>
            </CardBodyContent>
          </VisualCardPanel>
        </PortalContainer>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 8rem 0;
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 0 auto 5rem auto;
`;

const Title = styled(SectionTitle)`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const LeadText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const TabPillsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 5rem;
`;

const PillButton = styled.button<{ isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 2.2rem;
  border-radius: 9999px;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  background: ${(p) => (p.isActive ? 'rgb(var(--brandBlue, 0, 106, 173))' : 'rgb(var(--cardBackground))')};
  color: ${(p) => (p.isActive ? '#FFFFFF' : 'rgb(var(--brandBlue, 0, 106, 173))')};
  border: 1.5px solid ${(p) => (p.isActive ? 'rgb(var(--brandBlue, 0, 106, 173))' : 'rgb(var(--lineColor, 226, 232, 240))')};
  box-shadow: ${(p) => (p.isActive ? '0 8px 20px -4px rgba(0, 106, 173, 0.3)' : 'var(--shadow-sm)')};

  html[data-theme='dark'] & {
    color: ${(p) => (p.isActive ? '#FFFFFF' : '#f1f5f9')};
    background: ${(p) => (p.isActive ? 'rgb(var(--brandBlue, 0, 106, 173))' : 'rgba(255, 255, 255, 0.08)')};
    border-color: ${(p) => (p.isActive ? 'rgb(var(--skyBlue, 53, 169, 239))' : 'rgba(255, 255, 255, 0.18)')};
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgb(var(--skyBlue, 53, 169, 239));
  }
`;

const PillIcon = styled.span`
  font-size: 1.6rem;
`;

const ActiveIndicator = styled.span`
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 1.2rem;
  height: 0.4rem;
  background: rgb(var(--primary, 251, 107, 49));
  border-radius: 9999px;
`;

const PortalContainer = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.6rem;
  padding: 4.5rem;
  box-shadow: var(--shadow-md);

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
    padding: 3rem;
  }
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const BadgeTag = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  background: rgb(var(--tertiary, 235, 246, 254));
  color: rgb(var(--brandBlue, 0, 106, 173));
`;

const FormatsText = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const Headline = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 1.8rem;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    font-size: 2.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.5rem;
`;

const HighlightsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3.5rem;
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(var(--text));
`;

const CheckIcon = styled.span`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: rgba(53, 169, 239, 0.15);
  color: rgb(var(--skyBlue, 53, 169, 239));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const CtaButtonRow = styled.div`
  margin-top: auto;
`;

const VisualCardPanel = styled.div<{ bgGradient: string; bgImage: string }>`
  position: relative;
  background: ${(p) => p.bgGradient};
  border-radius: 1.2rem;
  padding: 3.5rem;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 38rem;
  box-shadow: 0 12px 30px -5px rgba(0, 106, 173, 0.25);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(p) => p.bgImage});
    background-size: cover;
    background-position: center;
    opacity: 0.28;
    mix-blend-mode: overlay;
    transition: all 0.4s ease-in-out;
  }

  & > * {
    position: relative;
    z-index: 2;
  }

  ${media('<=desktop')} {
    min-height: 30rem;
  }
`;

const CardHeaderOverlay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandMark = styled.span`
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 2.4rem;
  letter-spacing: -0.02em;
  color: #FFFFFF;
`;

const CategoryBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
`;

const AccentDivider = styled.div`
  height: 4px;
  width: 6rem;
  border-radius: 9999px;
  margin: 2rem 0;
`;

const CardBodyContent = styled.div`
  margin-top: auto;
`;

const IconDisplay = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h4`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 2rem;
`;

const FormatPillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const FormatChip = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
`;
