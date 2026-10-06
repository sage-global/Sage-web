import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import PageHero from 'components/PageHero';
import GalleryGrid from 'components/GalleryGrid';
import WaveCta from 'components/WaveCta';
import { pageHeroes } from 'sage-data';
import type { SageEvent } from 'lib/content';

export interface GalleryPageProps {
  events: SageEvent[];
}

export default function GalleryPage({ events }: GalleryPageProps) {
  const heroData = pageHeroes['/gallery'] || pageHeroes['/photos'] || pageHeroes['gallery'] || pageHeroes['photos'] || pageHeroes['/events'];

  return (
    <GalleryPageWrapper>
      {heroData && <PageHero {...heroData} />}

      <MainGallerySection>
        <Container>
          <GalleryIntro>
            <IntroTitle>Moments &amp; Milestones</IntroTitle>
            <IntroSubtitle>
              Explore photo highlights from SAGE global inaugurations, technical symposiums, university workshops, and academic leadership gatherings.
            </IntroSubtitle>
          </GalleryIntro>

          <GalleryGrid events={events} />
        </Container>
      </MainGallerySection>

      <WaveCta
        title="Host SAGE at Your Campus or Institution"
        subtitle="Partner with SAGE to conduct high-impact technical symposiums, student hackathons, and laboratory clinics."
        primaryLabel="Plan an Event with SAGE"
        primaryHref="/contact"
        secondaryLabel="View Upcoming Events"
        secondaryHref="/events"
      />
    </GalleryPageWrapper>
  );
}

const GalleryPageWrapper = styled.div`
  min-height: 100vh;
  background: rgb(var(--background));
`;

const MainGallerySection = styled.section`
  padding: 6rem 0 8rem 0;
  background: rgb(var(--background));
`;

const GalleryIntro = styled.div`
  text-align: center;
  max-width: 72rem;
  margin: 0 auto 4.8rem auto;
`;

const IntroTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 3.2rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.3;
  margin-bottom: 1.4rem;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const IntroSubtitle = styled.p`
  font-size: 1.7rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor));
`;
