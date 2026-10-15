import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import PageHero from 'components/PageHero';
import WaveCta from 'components/WaveCta';
import { pageHeroes } from 'sage-data';
import {
  Building2,
  Shield,
  GraduationCap,
  HeartHandshake,
  UserCheck,
  MapPin,
  Video,
  Clock,
  Radio,
  Cpu,
  Activity,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function TrainingPage() {
  const heroData = pageHeroes['/training'] || pageHeroes['training'];

  const sectors = [
    {
      title: 'Industry & Corporate Teams',
      badge: 'Industry',
      description:
        'Specialized technical upskilling in high-frequency wireless communications, RF transceiver architecture, RFIC/MMIC layout, radar systems, power amplifiers, and 5G/6G RF front-end design.',
      icon: Building2,
      highlights: ['RFIC / MMIC Design', 'Power Amplifiers & Transceivers', '5G / 6G Systems'],
    },
    {
      title: 'Government & Defense Labs',
      badge: 'Government',
      description:
        'Rigorous technical curricula focusing on electronic warfare (EW) fundamentals, radar cross-section (RCS), phased array beamforming, electromagnetic compatibility (EMC/EMI), and mission-critical antenna systems.',
      icon: Shield,
      highlights: ['Electronic Warfare (EW)', 'Phased Arrays & Radar', 'EMC / EMI Compliance'],
    },
    {
      title: 'University & Academia',
      badge: 'University',
      description:
        'Faculty Development Programs (FDP) and Graduate Engineering Transition curricula that bridge theoretical electromagnetic physics with real-world CAD simulation, fabrication, and laboratory bench testing.',
      icon: GraduationCap,
      highlights: ['Faculty Development (FDP)', 'Graduate Leveling Tracks', 'Hands-on Lab Curricula'],
    },
    {
      title: 'Nonprofit & Research Institutes',
      badge: 'Nonprofit',
      description:
        'Collaborative workshops and seminars on international RF standards, open-access technical research, spectrum coexistence, and foundational microwave engineering principles.',
      icon: HeartHandshake,
      highlights: ['RF Standards & Coexistence', 'Electromagnetics Research', 'Technical Symposiums'],
    },
    {
      title: 'Independent Engineers & Entrepreneurs',
      badge: 'Independent',
      description:
        'Practical hardware prototyping, impedance matching techniques, test equipment operation (VNA, spectrum analyzer), and engineering advisory for emerging wireless hardware ventures.',
      icon: UserCheck,
      highlights: ['Hardware Prototyping', 'VNA & RF Instrumentation', 'Design Advisory'],
    },
  ];

  const deliveryFormats = [
    {
      title: 'In-Person On-Site Training',
      tag: 'Hands-On & Immersive',
      icon: MapPin,
      description:
        'Intensive hands-on laboratory workshops, instrumentation measurement training, and customized lectures conducted directly at your facility, corporate site, or university campus.',
    },
    {
      title: 'Virtual Interactive Sessions',
      tag: 'Live & Collaborative',
      icon: Video,
      description:
        'Live webinars, structured online seminar series, remote simulation walkthroughs, and real-time CAD / schematic design reviews with SAGE senior specialists.',
    },
    {
      title: 'Self-Paced Modular Learning',
      tag: 'Flexible & On-Demand',
      icon: Clock,
      description:
        'Curated video modules, technical reference guides, downloadable equation sheets, and step-by-step problem sets designed for independent mastery at your own pace.',
    },
  ];

  const technicalCurricula = [
    {
      title: 'RF & Microwave Circuit Design',
      icon: Cpu,
      topics: [
        'Transmission line theory & distributed circuit fundamentals',
        'Smith chart impedance matching & network synthesis',
        'Microstrip, stripline, and coplanar waveguide design',
        'Planar filter synthesis, couplers, and power dividers',
      ],
    },
    {
      title: 'Antenna Engineering & Radiation Systems',
      icon: Radio,
      topics: [
        'Microstrip patch antennas & broadband planar elements',
        'Phased array beamforming & active electronically scanned arrays (AESA)',
        'MIMO configurations, polarization purity, & pattern synthesis',
        'Anechoic chamber testing, near-field / far-field measurements',
      ],
    },
    {
      title: 'High-Frequency Test & Measurement',
      icon: Activity,
      topics: [
        'Vector Network Analyzer (VNA) calibration, error correction, & S-parameters',
        'Spectrum analysis, harmonic distortion, & phase noise evaluation',
        'Intermodulation distortion (IMD), IP3, & 1-dB compression point testing',
        'Noise figure characterization & RF probe station workflows',
      ],
    },
    {
      title: 'Applied Electromagnetics & Simulation',
      icon: Layers,
      topics: [
        'Time-domain and frequency-domain numerical EM modeling',
        'Boundary conditions, port excitation, & meshing optimization',
        'Electromagnetic wave propagation in complex media & urban channels',
        'Multi-physics thermal & mechanical RF co-simulation',
      ],
    },
  ];

  return (
    <PageWrapper>
      {heroData && <PageHero {...heroData} />}

      <MainSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NoticeCard>
              <BadgeRow>
                <StatusBadge>UNDER CONSTRUCTION</StatusBadge>
                <TimelineBadge>Coming Soon</TimelineBadge>
              </BadgeRow>

              <CardTitle>Professional Training Programs</CardTitle>
              <CardDescription>
                We are currently updating our detailed training modules, course syllabi, and custom organizational learning tracks.
              </CardDescription>

              <CardFootnote>
                We continue to offer customized on-site and virtual training programs for private industry, government agencies, universities, and research institutions. Contact our academic and technical advisory team to discuss custom curriculum requirements.
              </CardFootnote>

              <ActionRow>
                <NextLink href="/contact" passHref>
                  <PrimaryButton>Request Training Info →</PrimaryButton>
                </NextLink>
                <NextLink href="/courses" passHref>
                  <SecondaryButton>Browse Courses</SecondaryButton>
                </NextLink>
                <NextLink href="/tutorials" passHref>
                  <SecondaryButton>Explore Tutorials</SecondaryButton>
                </NextLink>
                <NextLink href="/events" passHref>
                  <SecondaryButton>View Events</SecondaryButton>
                </NextLink>
              </ActionRow>
            </NoticeCard>
          </motion.div>

          {/* Section 1: Sectors Covered */}
          <SectionBlock>
            <SectionHeader>
              <SectionEyebrow>Sectors & Engineering Audiences</SectionEyebrow>
              <SectionTitle>
                Training Programs for Private, Public, Academia, Nonprofit, & Entrepreneurial Sectors
              </SectionTitle>
              <SectionSubtitle>
                Professional development entailing educational training through workshops, seminars, and webinars, in addition to courses and tutorials, for beginners and experienced professionals. Sessions are provided by SAGE associates or in collaboration with SAGE partners.
              </SectionSubtitle>
            </SectionHeader>

            <SectorsGrid>
              {sectors.map((sector, idx) => {
                const IconComponent = sector.icon;
                return (
                  <SectorCard key={idx}>
                    <SectorCardHeader>
                      <SectorIconBox>
                        <IconComponent size={24} />
                      </SectorIconBox>
                      <SectorBadge>{sector.badge}</SectorBadge>
                    </SectorCardHeader>
                    <SectorCardTitle>{sector.title}</SectorCardTitle>
                    <SectorCardDesc>{sector.description}</SectorCardDesc>
                    <HighlightsList>
                      {sector.highlights.map((h, hIdx) => (
                        <HighlightItem key={hIdx}>
                          <CheckCircle2 size={15} />
                          <span>{h}</span>
                        </HighlightItem>
                      ))}
                    </HighlightsList>
                  </SectorCard>
                );
              })}
            </SectorsGrid>
          </SectionBlock>

          {/* Section 2: Delivery Formats */}
          <SectionBlock>
            <SectionHeader>
              <SectionEyebrow>Flexible Delivery Methods</SectionEyebrow>
              <SectionTitle>In-Person, Virtual, & Self-Paced Training Formats</SectionTitle>
              <SectionSubtitle>
                Designed to fit the scheduling, operational security, and facility requirements of corporate engineering teams, government defense facilities, and academic institutions.
              </SectionSubtitle>
            </SectionHeader>

            <DeliveryGrid>
              {deliveryFormats.map((item, idx) => {
                const FormatIcon = item.icon;
                return (
                  <DeliveryCard key={idx}>
                    <DeliveryIconBox>
                      <FormatIcon size={26} />
                    </DeliveryIconBox>
                    <DeliveryTag>{item.tag}</DeliveryTag>
                    <DeliveryTitle>{item.title}</DeliveryTitle>
                    <DeliveryDesc>{item.description}</DeliveryDesc>
                  </DeliveryCard>
                );
              })}
            </DeliveryGrid>
          </SectionBlock>

          {/* Section 3: Technical Curricula Focus Areas */}
          <SectionBlock>
            <SectionHeader>
              <SectionEyebrow>Technical Scope & Curricula</SectionEyebrow>
              <SectionTitle>Core High-Frequency Engineering Domains</SectionTitle>
              <SectionSubtitle>
                In-depth educational modules bridging fundamental electromagnetic theory with state-of-the-art industrial practice and simulation tools.
              </SectionSubtitle>
            </SectionHeader>

            <CurriculaGrid>
              {technicalCurricula.map((curriculum, idx) => {
                const CurrIcon = curriculum.icon;
                return (
                  <CurriculumCard key={idx}>
                    <CurriculumHeader>
                      <CurriculumIconBox>
                        <CurrIcon size={24} />
                      </CurriculumIconBox>
                      <CurriculumTitle>{curriculum.title}</CurriculumTitle>
                    </CurriculumHeader>
                    <TopicList>
                      {curriculum.topics.map((t, tIdx) => (
                        <TopicItem key={tIdx}>
                          <TopicBullet />
                          <span>{t}</span>
                        </TopicItem>
                      ))}
                    </TopicList>
                  </CurriculumCard>
                );
              })}
            </CurriculaGrid>
          </SectionBlock>
        </Container>
      </MainSection>

      <WaveCta
        title="Transform Your Team's RF Engineering Capabilities"
        subtitle="Contact our academic and corporate advisory team to discuss a tailored training program for your organization."
        primaryLabel="Inquire About Training Programs"
        primaryHref="/contact"
        secondaryLabel="View Course Catalog"
        secondaryHref="/courses"
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background: rgb(var(--background));
`;

const MainSection = styled.section`
  padding: 5rem 0 8rem 0;
  background: rgb(var(--background));
`;

const NoticeCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-left: 5px solid rgb(var(--brandBlue));
  border-radius: 2rem;
  padding: 4.4rem;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.04);
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StatusBadge = styled.span`
  background: rgba(0, 106, 173, 0.1);
  color: rgb(var(--brandBlue));
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.5rem 1.2rem;
  border-radius: 0.6rem;
`;

const TimelineBadge = styled.span`
  background: rgba(251, 107, 49, 0.1);
  color: rgb(var(--primary));
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.5rem 1.2rem;
  border-radius: 0.6rem;
`;

const CardTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 3.2rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.3;
  margin-bottom: 1.8rem;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgb(var(--text));
  font-weight: 500;
  margin-bottom: 1.4rem;
`;

const CardFootnote = styled.p`
  font-size: 1.55rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor));
  margin-bottom: 3.2rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff !important;
  background: #006aad;
  background: rgb(var(--brandBlue));
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 106, 173, 0.25);

  &:hover {
    background: #00558b;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 106, 173, 0.35);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--text));
  background: transparent;
  border: 1px solid rgb(var(--lineColor));
  padding: 1.2rem 2.2rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgb(var(--brandBlue));
    color: rgb(var(--brandBlue));
    background: rgba(0, 106, 173, 0.05);
    transform: translateY(-2px);
  }
`;

const SectionBlock = styled.div`
  margin-bottom: 7rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 3.6rem;
  max-width: 90rem;
`;

const SectionEyebrow = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(var(--primary));
  margin-bottom: 0.8rem;
`;

const SectionTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.3;
  margin-bottom: 1.4rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.65rem;
  line-height: 1.7;
  color: rgb(var(--mutedColor));
`;

const SectorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SectorCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  padding: 2.8rem 2.4rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgb(var(--brandBlue));
    box-shadow: 0 8px 24px rgba(0, 106, 173, 0.08);
  }
`;

const SectorCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;
`;

const SectorIconBox = styled.div`
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 1.2rem;
  background: rgba(0, 106, 173, 0.08);
  color: rgb(var(--brandBlue));
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectorBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: rgb(var(--brandBlue));
  background: rgba(0, 106, 173, 0.06);
  padding: 0.4rem 1rem;
  border-radius: 0.6rem;
`;

const SectorCardTitle = styled.h4`
  font-family: var(--font-heading);
  font-size: 1.9rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.3;
  margin-bottom: 1.2rem;
`;

const SectorCardDesc = styled.p`
  font-size: 1.45rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor));
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgb(var(--lineColor));
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(var(--text));

  svg {
    color: rgb(var(--primary));
    flex-shrink: 0;
  }
`;

const DeliveryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const DeliveryCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  padding: 3.2rem 2.6rem;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgb(var(--brandBlue));
    box-shadow: 0 8px 24px rgba(0, 106, 173, 0.08);
  }
`;

const DeliveryIconBox = styled.div`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 1.4rem;
  background: rgba(251, 107, 49, 0.1);
  color: rgb(var(--primary));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.8rem;
`;

const DeliveryTag = styled.span`
  font-size: 1.15rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--primary));
  margin-bottom: 0.8rem;
`;

const DeliveryTitle = styled.h4`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
  line-height: 1.3;
`;

const DeliveryDesc = styled.p`
  font-size: 1.5rem;
  line-height: 1.65;
  color: rgb(var(--mutedColor));
  margin: 0;
`;

const CurriculaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CurriculumCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  padding: 3rem 2.6rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgb(var(--brandBlue));
    box-shadow: 0 8px 24px rgba(0, 106, 173, 0.08);
  }
`;

const CurriculumHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: 2rem;
`;

const CurriculumIconBox = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 1.2rem;
  background: rgba(0, 106, 173, 0.08);
  color: rgb(var(--brandBlue));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CurriculumTitle = styled.h4`
  font-family: var(--font-heading);
  font-size: 1.9rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.3;
`;

const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopicItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.45rem;
  line-height: 1.55;
  color: rgb(var(--mutedColor));
`;

const TopicBullet = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: rgb(var(--brandBlue));
  margin-top: 0.8rem;
  flex-shrink: 0;
`;
