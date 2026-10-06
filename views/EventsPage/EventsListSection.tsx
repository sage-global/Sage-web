import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import AutofitGrid from 'components/AutofitGrid';
import EventCard from './EventCard';
import type { SageEvent } from 'lib/content';

export interface EventsListSectionProps {
  allEvents: SageEvent[];
  upcomingEvents: SageEvent[];
  pastEvents: SageEvent[];
}

export default function EventsListSection({
  allEvents,
}: EventsListSectionProps) {
  return (
    <SectionWrapper>
      <Container>
        <AutofitGrid minWidth="32rem">
          {allEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </AutofitGrid>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding-top: 4rem;
  padding-bottom: 7rem;
  background: rgb(var(--background));
`;
