import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import PageHero from 'components/PageHero';
import WaveCta from 'components/WaveCta';
import { pageHeroes } from 'sage-data';

export default function TrainingPage() {
  const heroData = pageHeroes['/training'] || pageHeroes['training'];

  const upcomingTracks = [
    {
      title: 'Corporate R&D Engineering Programs',
      description: 'Tailored technical upskilling tracks for corporate teams working on high-frequency wireless, radar, and RF systems.',
      icon: '🏢',
    },
    {
      title: 'Graduate Engineering Transition Program',
      description: 'Structured leveling programs helping recent college graduates bridge university theory with practical industry design.',
      icon: '🎓',
    },
    {
      title: 'Faculty Development Programs (FDP)',
      description: 'Pedagogical and experimental curricula designed for university engineering professors and lab directors.',
      icon: '🔬',
    },
    {
      title: 'Defense & Aerospace Technical Training',
      description: 'Specialized programs in antenna systems, electronic warfare fundamentals, and transceiver architecture.',
      icon: '🛰️',
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

              <CardTitle>Professional & Corporate Training Programs</CardTitle>
              <CardDescription>
                We are currently updating our detailed corporate training modules, course syllabi, and custom organizational learning tracks.
              </CardDescription>

              <CardFootnote>
                We continue to offer customized on-site and virtual training programs for corporate engineering teams and universities. Contact our academic and corporate advisory team to discuss custom curriculum requirements.
              </CardFootnote>

              <ActionRow>
                <NextLink href="/contact" passHref>
                  <PrimaryButton>Request Corporate Training Info →</PrimaryButton>
                </NextLink>
                <NextLink href="/courses" passHref>
                  <SecondaryButton>Browse Courses</SecondaryButton>
                </NextLink>
              </ActionRow>
            </NoticeCard>
          </motion.div>

          <PreviewSection>
            <PreviewTitle>Planned Training Solutions</PreviewTitle>
            <TracksGrid>
              {upcomingTracks.map((track, idx) => (
                <TrackCard key={idx}>
                  <TrackIcon>{track.icon}</TrackIcon>
                  <TrackTitle>{track.title}</TrackTitle>
                  <TrackDesc>{track.description}</TrackDesc>
                </TrackCard>
              ))}
            </TracksGrid>
          </PreviewSection>
        </Container>
      </MainSection>

      <WaveCta
        title="Transform Your Team's RF Engineering Capabilities"
        subtitle="Contact our academic and corporate advisory team to discuss a tailored training program."
        primaryLabel="Inquire About Corporate Training"
        primaryHref="/contact"
        secondaryLabel="View Course Catalog"
        secondaryHref="/courses"
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background);
`;

const MainSection = styled.section`
  padding: 6rem 0 8rem 0;
  background: var(--background);
`;

const NoticeCard = styled.div`
  background: var(--cardBackground);
  border: 1px solid var(--lineColor);
  border-left: 5px solid var(--brandBlue);
  border-radius: 2rem;
  padding: 4.8rem;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.04);
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    padding: 3.2rem 2.4rem;
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
  color: var(--brandBlue);
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.5rem 1.2rem;
  border-radius: 0.6rem;
`;

const TimelineBadge = styled.span`
  background: rgba(251, 107, 49, 0.1);
  color: var(--primary);
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
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 1.8rem;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.7;
  color: var(--text);
  font-weight: 500;
  margin-bottom: 1.4rem;
`;

const CardFootnote = styled.p`
  font-size: 1.55rem;
  line-height: 1.6;
  color: var(--mutedColor);
  margin-bottom: 3.2rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  background: var(--brandBlue);
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #00558b;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 106, 173, 0.3);
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  background: transparent;
  border: 1px solid var(--lineColor);
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--brandBlue);
    color: var(--brandBlue);
    background: rgba(0, 106, 173, 0.05);
  }
`;

const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const PreviewTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--text);
`;

const TracksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TrackCard = styled.div`
  background: var(--cardBackground);
  border: 1px solid var(--lineColor);
  border-radius: 1.6rem;
  padding: 3.2rem 2.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--brandBlue);
  }
`;

const TrackIcon = styled.div`
  font-size: 3rem;
`;

const TrackTitle = styled.h4`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.3;
`;

const TrackDesc = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--mutedColor);
  margin: 0;
`;
