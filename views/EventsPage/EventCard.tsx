import React, { useState } from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import DisciplineTag from 'components/DisciplineTag';
import DateBadge from './DateBadge';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import type { SageEvent } from 'lib/content';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';

export interface EventCardProps {
  event: SageEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const [imgSrc, setImgSrc] = useState(() =>
    cloudinaryUrl(event.image, imagePresets.card)
  );

  const isUpcoming = event.status === 'upcoming';
  const isPast = event.status === 'past';
  const eventDetailUrl = `/events/${event.id}`;

  return (
    <CardContainer data-testid={`event-card-${event.id}`} id={`event-${event.id}`}>
      <NextLink href={eventDetailUrl} passHref>
        <ImageFrameLink aria-label={`View details for ${event.title || event.id}`}>
          <EventImage
            src={imgSrc}
            alt={event.title ? `${event.title} - ${event.location}` : `SAGE Event in ${event.location}`}
            loading="lazy"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
          />
          <DateBadge date={event.date} />
        </ImageFrameLink>
      </NextLink>

      <CardBody>
        <HeaderRow>
          <DisciplineTag variant="subtle" colorScheme="blue">
            {event.type}
          </DisciplineTag>
          {event.location && (
            <LocationTag>
              <LocationIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </LocationIcon>
              <span>{event.location}</span>
            </LocationTag>
          )}
        </HeaderRow>

        <NextLink href={eventDetailUrl} passHref>
          <EventTitleLink>
            <EventTitle>
              {event.title && !event.title.includes('TODO')
                ? event.title
                : event.id
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
            </EventTitle>
          </EventTitleLink>
        </NextLink>

        {event.description && !event.description.includes('TODO') && (
          <EventDescription>{event.description}</EventDescription>
        )}

        <FooterRow>
          <NextLink href={eventDetailUrl} passHref>
            <ViewDetailsButton>
              View Event Page <span>&rarr;</span>
            </ViewDetailsButton>
          </NextLink>

          {/* EV-3: Upcoming cards - orange Register button ONLY when registrationUrl exists, opens in new tab with rel="noopener" */}
          {isUpcoming && event.registrationUrl && (
            <RegisterButton
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register <span>&rarr;</span>
            </RegisterButton>
          )}

          {/* Past cards: "View photos" anchor that scrolls to the gallery section */}
          {isPast && (
            <ViewPhotosLink href={`/events/${event.id}#gallery`}>
              Photos <span>&darr;</span>
            </ViewPhotosLink>
          )}
        </FooterRow>
      </CardBody>
    </CardContainer>
  );
}

const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
    border-color: rgba(var(--primary), 0.35);
  }
`;

const ImageFrameLink = styled.a`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgb(var(--secondBackground));
  display: block;
  text-decoration: none;
`;

const EventTitleLink = styled.a`
  text-decoration: none;
  color: inherit;

  &:hover h3 {
    color: rgb(var(--primary));
  }
`;

const ViewDetailsButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgb(var(--brandBlue));
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  text-decoration: none;
  margin-right: auto;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(var(--primary));
    transform: translateY(-1px);
  }

  span {
    transition: transform 0.2s ease;
  }

  &:hover span {
    transform: translateX(3px);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  ${CardContainer}:hover & {
    transform: scale(1.04);
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2.4rem;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.4rem;
`;

const LocationTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 500;
  color: rgb(var(--mutedColor));

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 18rem;
  }
`;

const LocationIcon = styled.svg`
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
  color: rgb(var(--primary));
`;

const EventTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: rgb(var(--text));
  margin: 0 0 1.2rem 0;
`;

const EventDescription = styled.p`
  font-size: 1.45rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.75);
  margin: 0 0 2rem 0;
  flex: 1;
`;

const FooterRow = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(var(--lineColor), 0.7);
`;

const RegisterButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgb(var(--primary));
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  padding: 1rem 2.2rem;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(251, 107, 49, 0.3);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: rgb(var(--primary));
    filter: brightness(1.08);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(251, 107, 49, 0.4);
  }

  span {
    transition: transform 0.2s ease;
  }

  &:hover span {
    transform: translateX(3px);
  }
`;

const ViewPhotosLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: rgb(var(--brandBlue));
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease, gap 0.2s ease;

  &:hover {
    color: rgb(var(--primary));
    gap: 0.9rem;
    text-decoration: underline;
  }
`;
