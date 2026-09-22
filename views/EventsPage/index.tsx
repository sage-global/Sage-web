import React from 'react';
import styled from 'styled-components';
import PageHero from 'components/PageHero';
import WaveCta from 'components/WaveCta';
import EventsListSection from './EventsListSection';
import EventsGallerySection from './EventsGallerySection';
import { pageHeroes } from 'sage-data';
import type { SageEvent } from 'lib/content';

export interface EventsPageProps {
  allEvents: SageEvent[];
  upcomingEvents: SageEvent[];
  pastEvents: SageEvent[];
}

export default function EventsPage({
  allEvents,
  upcomingEvents,
  pastEvents,
}: EventsPageProps) {
  const heroData = pageHeroes['/events'] || pageHeroes['events'];

  return (
    <EventsPageWrapper>
      {/* 1. PageHero */}
      {heroData && <PageHero {...heroData} />}

      {/* 2 & 3. FilterPills (All/Upcoming/Past) + AutofitGrid of EventCards (with EV-7 empty state) */}
      <EventsListSection
        allEvents={allEvents}
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
      />

      {/* Photo gallery anchor target for past event cards */}
      <EventsGallerySection events={pastEvents} />

      {/* 4. Skip StatsBar entirely for now */}

      {/* 5. WaveCta: "Want SAGE at your campus?" -> /contact */}
      <WaveCta
        title="Want SAGE at your campus?"
        subtitle="Partner with SAGE to host hands-on RF, microwave, and wireless engineering workshops, hackathons, and technical symposiums at your institution."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="Explore Courses"
        secondaryHref="/courses"
      />
    </EventsPageWrapper>
  );
}

const EventsPageWrapper = styled.div`
  min-height: 100vh;
  background: rgb(var(--background));
`;
