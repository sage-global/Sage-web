import React, { useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import FilterPills from 'components/FilterPills';
import AutofitGrid from 'components/AutofitGrid';
import EventCard from './EventCard';
import type { SageEvent } from 'lib/content';

export type EventFilter = 'all' | 'upcoming' | 'past';

export const EVENT_FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
] as const;

export interface EventsListSectionProps {
  allEvents: SageEvent[];
  upcomingEvents: SageEvent[];
  pastEvents: SageEvent[];
}

export default function EventsListSection({
  allEvents,
  upcomingEvents,
  pastEvents,
}: EventsListSectionProps) {
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all');

  const showUpcomingEmptyState =
    activeFilter === 'upcoming' && upcomingEvents.length === 0;

  const displayEvents = (() => {
    if (activeFilter === 'upcoming') {
      return upcomingEvents.length > 0 ? upcomingEvents : pastEvents;
    }
    if (activeFilter === 'past') {
      return pastEvents;
    }
    return allEvents;
  })();

  return (
    <SectionWrapper>
      <Container>
        {/* EV-1: FilterPills */}
        <FilterContainer>
          <FilterPills<EventFilter>
            options={EVENT_FILTER_OPTIONS}
            activeId={activeFilter}
            onSelect={(id) => setActiveFilter(id)}
            ariaLabel="Filter events by status"
          />
        </FilterContainer>

        {/* EV-7: Required empty state when Upcoming filter is selected but empty */}
        {showUpcomingEmptyState && (
          <EmptyStateNotice>
            <NoticeBadge>
              <NoticeIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </NoticeIcon>
              <span>Upcoming Schedule</span>
            </NoticeBadge>
            <NoticeTitle>
              No upcoming events right now — check out what we&apos;ve done
            </NoticeTitle>
            <NoticeSubtitle>
              We are finalizing dates for our next season of hands-on workshops and hackathons.
              In the meantime, explore our recent programs and gallery below.
            </NoticeSubtitle>
          </EmptyStateNotice>
        )}

        {/* EV-7 & EV-8: Event Cards Grid */}
        <AutofitGrid minWidth="32rem">
          {displayEvents.map((event) => (
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

const EmptyStateNotice = styled.div`
  margin-bottom: 4rem;
  padding: 3.2rem 2.4rem;
  background: linear-gradient(
    135deg,
    rgba(var(--primary), 0.06) 0%,
    rgba(var(--skyBlue, 53, 169, 239), 0.06) 100%
  );
  border: 1px solid rgba(var(--lineColor), 0.8);
  border-left: 4px solid rgb(var(--primary));
  border-radius: 1.4rem;
  text-align: center;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;

const NoticeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--primary));
  margin-bottom: 1.2rem;
`;

const NoticeIcon = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
`;

const NoticeTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: rgb(var(--text));
  margin: 0 0 1rem 0;
`;

const NoticeSubtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor));
  margin: 0;
  max-width: 62rem;
  margin-left: auto;
  margin-right: auto;
`;
