import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

interface EngagementModel {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  highlights: string[];
  iconSvg: React.ReactNode;
  accentColor: string;
}

const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: 'on-site',
    title: 'On-site',
    tagline: 'Direct at your enterprise campus or university lab',
    badge: 'At Your Facility',
    description:
      'SAGE instructors and technical experts travel directly to your facility. We integrate with your existing lab benches, measurement instruments, and design environments for zero disruption.',
    highlights: [
      'Hands-on training with your actual bench equipment',
      'Confidential on-premises design reviews and audits',
      'Direct face-to-face mentoring for engineering teams',
      'Customized to your corporate design flows and NDA standards',
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    accentColor: '#006AAD',
  },
  {
    id: 'off-site',
    title: 'Off-site',
    tagline: 'Immersive retreats away from office interruptions',
    badge: 'Dedicated Venues',
    description:
      'Hosted at specialized training centers, partner university labs, or IEEE symposia hubs. An immersive setting that allows your engineers to focus fully on intensive technical upskilling.',
    highlights: [
      'High-focus environment away from daily deliverables',
      'Access to partner testbeds and RF measurement gear',
      'Multi-team collaboration and cross-discipline learning',
      'Ideal for intensive 2-day to 5-day bootcamp programs',
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    accentColor: '#FB6B31',
  },
  {
    id: 'online',
    title: 'Online',
    tagline: 'Live interactive virtual classrooms & digital modules',
    badge: 'Global Digital',
    description:
      'Live instructor-led masterclasses, interactive simulation demonstrations, and modular digital sessions. Accessible to distributed engineering teams across all international time zones.',
    highlights: [
      'Live Q&A and interactive circuit simulation walkthroughs',
      'Flexible time slots accommodating global engineering teams',
      'Digital reference materials, formulas, and cheatsheets',
      'Session recordings available for internal review & reference',
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    accentColor: '#35A9EF',
  },
];

export default function HowWeEngageSection() {
  return (
    <SectionWrapper id="how-we-engage">
      <Container>
        <HeaderContainer>
          <OverTitle>Engagement Delivery</OverTitle>
          <Title>How We Engage</Title>
          <LeadText>
            Flexible delivery models tailored to your schedule, location, and technical objectives.
          </LeadText>
        </HeaderContainer>

        <ColumnsGrid>
          {ENGAGEMENT_MODELS.map((model) => (
            <ColumnCard key={model.id}>
              <TopBar style={{ backgroundColor: model.accentColor }} />
              <CardInner>
                <BadgeWrapper>
                  <IconContainer style={{ color: model.accentColor }}>
                    {model.iconSvg}
                  </IconContainer>
                  <ModelBadge>{model.badge}</ModelBadge>
                </BadgeWrapper>

                <ModelTitle>{model.title}</ModelTitle>
                <ModelTagline>{model.tagline}</ModelTagline>
                <ModelDescription>{model.description}</ModelDescription>

                <Divider />

                <HighlightsHeading>Key Advantages</HighlightsHeading>
                <HighlightsList>
                  {model.highlights.map((item, idx) => (
                    <HighlightItem key={idx}>
                      <CheckIcon style={{ color: model.accentColor }}>✓</CheckIcon>
                      <span>{item}</span>
                    </HighlightItem>
                  ))}
                </HighlightsList>
              </CardInner>
            </ColumnCard>
          ))}
        </ColumnsGrid>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 6rem 0 8rem 0;
  background: rgb(var(--secondBackground));
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

const ColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ColumnCard = styled.div`
  position: relative;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(0, 106, 173, 0.3);
  }
`;

const TopBar = styled.div`
  height: 6px;
  width: 100%;
`;

const CardInner = styled.div`
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const IconContainer = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 1.2rem;
  background: rgb(var(--tertiary, 235, 246, 254));
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2.6rem;
    height: 2.6rem;
  }

  html[data-theme='dark'] & {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ModelBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  background: rgb(var(--secondBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  color: rgb(var(--text));
`;

const ModelTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.6rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;
`;

const ModelTagline = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--brandBlue, 0, 106, 173));
  margin-bottom: 1.8rem;
  line-height: 1.4;

  html[data-theme='dark'] & {
    color: rgb(var(--skyBlue, 53, 169, 239));
  }
`;

const ModelDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.5rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgb(var(--lineColor, 226, 232, 240));
  margin: 0 0 2.2rem 0;
`;

const HighlightsHeading = styled.h4`
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(var(--text));
  margin-bottom: 1.4rem;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.4rem;
  line-height: 1.5;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const CheckIcon = styled.span`
  font-weight: 800;
  font-size: 1.4rem;
  flex-shrink: 0;
  line-height: 1.4;
`;
