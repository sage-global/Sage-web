import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';
import GalleryGrid from 'components/GalleryGrid';
import type { SageEvent } from 'lib/content';

export interface EventsGallerySectionProps {
  events: SageEvent[];
}

export default function EventsGallerySection({ events }: EventsGallerySectionProps) {
  return (
    <GallerySectionWrapper id="gallery">
      <Container>
        <HeaderContainer>
          <OverTitle>Event Highlights & Gallery</OverTitle>
          <SectionTitle>Moments from Past Programs</SectionTitle>
          <LeadText>
            Browse photos from our university collaborations, technical workshops, and engineering meetups.
          </LeadText>
        </HeaderContainer>

        <GalleryGrid events={events} />
      </Container>
    </GallerySectionWrapper>
  );
}

const GallerySectionWrapper = styled.section`
  padding-top: 6rem;
  padding-bottom: 9rem;
  background: rgb(var(--secondBackground));
  border-top: 1px solid rgb(var(--lineColor));
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 72rem;
  margin: 0 auto 4.5rem auto;
`;

const LeadText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor));
  margin-top: 1.2rem;
`;
