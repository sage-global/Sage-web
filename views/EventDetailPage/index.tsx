import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import styled from 'styled-components';
import Container from 'components/Container';
import Page from 'components/Page';
import WaveCta from 'components/WaveCta';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import { media } from 'utils/media';
import type { SageEvent } from 'data/events.data';

export interface EventDetailPageProps {
  event: SageEvent;
}

const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80';

export default function EventDetailPage({ event }: EventDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'speakers' | 'gallery'>('overview');
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  const scrollToSection = (id: 'overview' | 'agenda' | 'speakers' | 'gallery') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const heroBg = event.image ? cloudinaryUrl(event.image, imagePresets.hero) : FALLBACK_HERO;

  const gallerySlides = (event.gallery || []).map((path, idx) => ({
    src: cloudinaryUrl(path, imagePresets.lightbox),
    alt: `${event.title} — Photo ${idx + 1}`,
    title: event.title,
    description: event.location,
  }));

  const isCompleted = event.statusText === 'Completed' || new Date(event.date) < new Date();

  return (
    <Page
      title={event.title}
      description={event.description}
    >
      <Head>
        <title>{event.title} | SAGE Events</title>
        <meta name="description" content={event.description} />
        <link rel="canonical" href={`https://shastryassociates.com/events/${event.id}`} />
        <meta property="og:title" content={`${event.title} | SAGE Events`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={heroBg} />
      </Head>

      <PageWrapper>
        {/* Breadcrumbs */}
        <BreadcrumbContainer>
          <Breadcrumbs>
            <NextLink href="/">Home</NextLink>
            <span>&gt;</span>
            <NextLink href="/events">Events</NextLink>
            <span>&gt;</span>
            <CurrentCrumb>{event.title}</CurrentCrumb>
          </Breadcrumbs>
        </BreadcrumbContainer>

        {/* Hero Section */}
        <HeroSection bgImage={heroBg}>
          <HeroOverlay />
          <HeroContent>
            <HeroBadge>{event.badge || event.type}</HeroBadge>
            <HeroTitle>{event.title}</HeroTitle>
            <HeroSubtitle>
              <CalendarIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
              </CalendarIcon>
              {event.date} | {event.location}
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        {/* Stats Bar */}
        <StatsBarWrapper>
          <StatsBarContainer>
            <StatItem>
              <StatIconWrapper>⏱️</StatIconWrapper>
              <div>
                <StatLabel>Duration:</StatLabel>
                <StatValue>{event.duration || '1 Day'}</StatValue>
              </div>
            </StatItem>
            <StatItem>
              <StatIconWrapper>👥</StatIconWrapper>
              <div>
                <StatLabel>Participants:</StatLabel>
                <StatValue>{event.participants || '50+'}</StatValue>
              </div>
            </StatItem>
            <StatItem>
              <StatIconWrapper>🎖️</StatIconWrapper>
              <div>
                <StatLabel>Certificates:</StatLabel>
                <StatValue>{event.certificates || 'Distributed'}</StatValue>
              </div>
            </StatItem>
            <StatItem>
              <StatIconWrapper>✅</StatIconWrapper>
              <div>
                <StatLabel>Status:</StatLabel>
                <StatusBadge isCompleted={isCompleted}>
                  {event.statusText || (isCompleted ? 'Completed' : 'Upcoming')}
                </StatusBadge>
              </div>
            </StatItem>
          </StatsBarContainer>
        </StatsBarWrapper>

        {/* Navigation Tabs */}
        <TabsWrapper>
          <TabsContainer>
            <TabButton active={activeTab === 'overview'} onClick={() => scrollToSection('overview')}>
              ℹ️ Overview
            </TabButton>
            <TabButton active={activeTab === 'agenda'} onClick={() => scrollToSection('agenda')}>
              📅 Agenda
            </TabButton>
            <TabButton active={activeTab === 'speakers'} onClick={() => scrollToSection('speakers')}>
              👤 Speakers
            </TabButton>
            <TabButton active={activeTab === 'gallery'} onClick={() => scrollToSection('gallery')}>
              🖼️ Gallery
            </TabButton>
          </TabsContainer>
        </TabsWrapper>

        {/* Main Content Sections */}
        <MainContainer>
          <ContentGrid>
            {/* Left Column */}
            <LeftColumn>
              {/* Overview Section */}
              <SectionBlock id="overview">
                <SectionHeader>
                  <SectionHeaderIcon>ℹ️</SectionHeaderIcon>
                  <SectionTitle>About This Event</SectionTitle>
                </SectionHeader>
                <Paragraph>{event.aboutText || event.description}</Paragraph>

                {event.highlights && event.highlights.length > 0 && (
                  <>
                    <SubHeading>Workshop Highlights</SubHeading>
                    <HighlightsList>
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </HighlightsList>
                  </>
                )}

                {event.whoShouldAttend && (
                  <>
                    <SubHeading>Who Should Attend</SubHeading>
                    <Paragraph>{event.whoShouldAttend}</Paragraph>
                  </>
                )}

                {event.chiefGuestsText && (
                  <>
                    <SubHeading>Distinguished Chief Guests</SubHeading>
                    <GuestsText>{event.chiefGuestsText}</GuestsText>
                  </>
                )}
              </SectionBlock>

              {/* Agenda Section */}
              <SectionBlock id="agenda">
                <SectionHeader>
                  <SectionHeaderIcon>📅</SectionHeaderIcon>
                  <SectionTitle>Program Schedule & Agenda</SectionTitle>
                </SectionHeader>
                {event.agenda && event.agenda.length > 0 ? (
                  <ScheduleList>
                    {event.agenda.map((item, idx) => (
                      <ScheduleItem key={idx}>
                        <ScheduleTime>{item.time}</ScheduleTime>
                        <ScheduleDetails>
                          <h4>{item.title}</h4>
                          {item.speaker && <p>{item.speaker}</p>}
                          {item.tag && <ScheduleTag>{item.tag}</ScheduleTag>}
                        </ScheduleDetails>
                      </ScheduleItem>
                    ))}
                  </ScheduleList>
                ) : (
                  <Paragraph>Detailed session timing will be announced prior to the event.</Paragraph>
                )}
              </SectionBlock>

              {/* Speakers Section */}
              <SectionBlock id="speakers">
                <SectionHeader>
                  <SectionHeaderIcon>👤</SectionHeaderIcon>
                  <SectionTitle>Chief Guests & Key Speakers</SectionTitle>
                </SectionHeader>
                {event.speakers && event.speakers.length > 0 ? (
                  <SpeakersGrid>
                    {event.speakers.map((speaker, idx) => (
                      <SpeakerCard key={idx}>
                        <SpeakerName>{speaker.name}</SpeakerName>
                        <SpeakerRole>{speaker.role}</SpeakerRole>
                        <SpeakerBio>{speaker.bio}</SpeakerBio>
                      </SpeakerCard>
                    ))}
                  </SpeakersGrid>
                ) : (
                  <Paragraph>Speaker announcements and guest panel profiles will be displayed here.</Paragraph>
                )}
              </SectionBlock>

              {/* Gallery Section */}
              <SectionBlock id="gallery">
                <SectionHeader>
                  <SectionHeaderIcon>🖼️</SectionHeaderIcon>
                  <SectionTitle>Event Highlights & Gallery</SectionTitle>
                </SectionHeader>
                <Paragraph>
                  Photo highlights and moments from this event session:
                </Paragraph>
                {event.gallery && event.gallery.length > 0 ? (
                  <MiniGalleryGrid>
                    {event.gallery.map((img, idx) => (
                      <GalleryThumbButton
                        key={idx}
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        aria-label={`Open photo ${idx + 1}`}
                      >
                        <img
                          src={cloudinaryUrl(img, imagePresets.card)}
                          alt={`${event.title} - Photo ${idx + 1}`}
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_HERO;
                          }}
                        />
                      </GalleryThumbButton>
                    ))}
                  </MiniGalleryGrid>
                ) : (
                  <Paragraph>Photos will be updated following the event conclusion.</Paragraph>
                )}
                <GalleryCtaRow>
                  <GalleryCtaButton href="/photos">
                    Explore Full SAGE Photo Gallery &rarr;
                  </GalleryCtaButton>
                </GalleryCtaRow>
              </SectionBlock>
            </LeftColumn>

            {/* Right Column: Sticky Sidebar Card */}
            <RightColumn>
              <InfoCard>
                <InfoCardHeader>
                  <InfoIcon>ℹ️</InfoIcon>
                  <InfoCardTitle>Event Information</InfoCardTitle>
                </InfoCardHeader>
                <InfoRow>
                  <InfoRowIcon>📅</InfoRowIcon>
                  <div>
                    <InfoRowLabel>Date</InfoRowLabel>
                    <InfoRowValue>{event.date}</InfoRowValue>
                  </div>
                </InfoRow>
                <InfoRow>
                  <InfoRowIcon>⏱️</InfoRowIcon>
                  <div>
                    <InfoRowLabel>Schedule</InfoRowLabel>
                    <InfoRowValue>{event.scheduleTime || 'Full Day Event'}</InfoRowValue>
                  </div>
                </InfoRow>
                <InfoRow>
                  <InfoRowIcon>📍</InfoRowIcon>
                  <div>
                    <InfoRowLabel>Venue</InfoRowLabel>
                    <InfoRowValue>{event.venueDetails || event.location}</InfoRowValue>
                  </div>
                </InfoRow>
                <InfoRow>
                  <InfoRowIcon>📜</InfoRowIcon>
                  <div>
                    <InfoRowLabel>Outcome</InfoRowLabel>
                    <InfoRowValue>
                      {event.certificates ? `${event.participants || ''} Certificates ${event.certificates}` : 'Certificates Awarded'}
                    </InfoRowValue>
                  </div>
                </InfoRow>

                {event.registrationUrl ? (
                  <CardPrimaryButton href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Register for Event
                  </CardPrimaryButton>
                ) : (
                  <CardGalleryButton href="/photos">
                    View Photo Gallery
                  </CardGalleryButton>
                )}
              </InfoCard>
            </RightColumn>
          </ContentGrid>
        </MainContainer>

        {/* Lightbox for Gallery */}
        {gallerySlides.length > 0 && (
          <Lightbox
            open={lightboxIndex >= 0}
            close={() => setLightboxIndex(-1)}
            index={lightboxIndex}
            slides={gallerySlides}
            controller={{ closeOnBackdropClick: true }}
          />
        )}

        {/* Bottom CTA */}
        <WaveCta
          title="Interested in SAGE RF & Microwave Workshops?"
          subtitle="Collaborate with SAGE to bring hands-on RF design clinics, hardware measurement labs, and industry mentorship to your institution."
          primaryLabel="Connect with Us"
          primaryHref="/contact"
          secondaryLabel="View All Events"
          secondaryHref="/events"
        />
      </PageWrapper>
    </Page>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background: rgb(var(--background));
`;

const BreadcrumbContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 1.5rem;
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: rgb(var(--mutedColor));

  a {
    color: rgb(var(--brandBlue));
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CurrentCrumb = styled.span`
  color: rgb(var(--text));
  font-weight: 500;
`;

const HeroSection = styled.div<{ bgImage: string }>`
  position: relative;
  background-image: url(${(p) => p.bgImage});
  background-position: center;
  background-size: cover;
  padding: 8rem 0 7rem 0;
  color: #ffffff;
  text-align: left;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 106, 173, 0.92) 0%, rgba(15, 23, 42, 0.95) 100%);
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 1;
  max-width: 100rem;
`;

const HeroBadge = styled.span`
  display: inline-block;
  background-color: rgb(var(--primary, 251, 107, 49));
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.5rem 1.4rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.25;
  color: #ffffff;
  margin-bottom: 1.8rem;

  ${media('<=tablet')} {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`;

const CalendarIcon = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  color: rgb(var(--primary));
`;

const StatsBarWrapper = styled.div`
  background: rgb(var(--cardBackground));
  border-bottom: 1px solid rgb(var(--lineColor));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
`;

const StatsBarContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.2rem;
  gap: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIconWrapper = styled.span`
  font-size: 2rem;
`;

const StatLabel = styled.span`
  display: block;
  font-size: 1.2rem;
  color: rgb(var(--mutedColor));
  font-weight: 600;
  text-transform: uppercase;
`;

const StatValue = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 800;
  color: rgb(var(--text));
`;

const StatusBadge = styled.span<{ isCompleted?: boolean }>`
  display: inline-block;
  background: ${(p) => (p.isCompleted ? '#dcfce7' : '#fef3c7')};
  color: ${(p) => (p.isCompleted ? '#166534' : '#92400e')};
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.2rem 1rem;
  border-radius: 9999px;
`;

const TabsWrapper = styled.div`
  background: rgb(var(--secondBackground));
  border-bottom: 1px solid rgb(var(--lineColor));
  position: sticky;
  top: 8rem;
  z-index: 50;
`;

const TabsContainer = styled(Container)`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1.2rem 1.2rem;
`;

const TabButton = styled.button<{ active?: boolean }>`
  background: ${(p) => (p.active ? 'rgb(var(--brandBlue))' : 'rgb(var(--cardBackground))')};
  color: ${(p) => (p.active ? '#ffffff' : 'rgb(var(--text))')};
  border: 1px solid ${(p) => (p.active ? 'rgb(var(--brandBlue))' : 'rgb(var(--lineColor))')};
  padding: 0.8rem 1.8rem;
  border-radius: 0.6rem;
  font-weight: 700;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${(p) => (p.active ? 'rgb(var(--brandBlue))' : 'rgba(0, 106, 173, 0.1)')};
  }
`;

const MainContainer = styled(Container)`
  padding: 5rem 1.2rem 8rem 1.2rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 34rem;
  gap: 4rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const SectionBlock = styled.section`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  padding: 3.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  ${media('<=phone')} {
    padding: 2.2rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2.2rem;
  padding-bottom: 1.4rem;
  border-bottom: 2px solid rgba(var(--primary), 0.3);
`;

const SectionHeaderIcon = styled.span`
  font-size: 2.4rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 800;
  color: rgb(var(--text));
`;

const Paragraph = styled.p`
  font-size: 1.6rem;
  line-height: 1.75;
  color: rgb(var(--text));
  opacity: 0.9;
  margin-bottom: 2.4rem;
`;

const SubHeading = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.9rem;
  font-weight: 700;
  color: rgb(var(--brandBlue));
  margin: 2.8rem 0 1.4rem 0;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.4rem 0;

  li {
    position: relative;
    padding-left: 2.6rem;
    margin-bottom: 1.2rem;
    font-size: 1.55rem;
    line-height: 1.6;
    color: rgb(var(--text));

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: rgb(var(--primary));
      font-weight: 800;
      font-size: 1.7rem;
    }
  }
`;

const GuestsText = styled.p`
  font-size: 1.5rem;
  line-height: 1.7;
  color: rgb(var(--text));
  background: rgb(var(--secondBackground));
  padding: 1.8rem;
  border-radius: 1rem;
  border-left: 4px solid rgb(var(--primary));
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ScheduleItem = styled.div`
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: 2rem;
  padding: 1.8rem;
  background: rgb(var(--secondBackground));
  border-radius: 1rem;
  border: 1px solid rgb(var(--lineColor));

  ${media('<=phone')} {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const ScheduleTime = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: rgb(var(--brandBlue));
  text-transform: uppercase;
`;

const ScheduleDetails = styled.div`
  h4 {
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    color: rgb(var(--text));
  }

  p {
    font-size: 1.45rem;
    color: rgb(var(--mutedColor));
    margin-bottom: 0.8rem;
  }
`;

const ScheduleTag = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.2rem 0.8rem;
  border-radius: 0.4rem;
  background: rgba(var(--brandBlue), 0.12);
  color: rgb(var(--brandBlue));
`;

const SpeakersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const SpeakerCard = styled.div`
  background: rgb(var(--secondBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.2rem;
  padding: 2rem;
`;

const SpeakerName = styled.h4`
  font-size: 1.8rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-bottom: 0.4rem;
`;

const SpeakerRole = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(var(--primary));
  margin-bottom: 0.8rem;
`;

const SpeakerBio = styled.p`
  font-size: 1.35rem;
  line-height: 1.5;
  color: rgb(var(--mutedColor));
`;

const MiniGalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  margin-bottom: 2.4rem;

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const GalleryThumbButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GalleryCtaRow = styled.div`
  margin-top: 1rem;
`;

const GalleryCtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgb(var(--brandBlue));
  color: #ffffff;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(var(--primary));
    transform: translateY(-2px);
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoCard = styled.div`
  position: sticky;
  top: 16rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.05);
`;

const InfoCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.4rem;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid rgb(var(--primary));
`;

const InfoIcon = styled.span`
  font-size: 2rem;
`;

const InfoCardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: rgb(var(--text));
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;
  margin-bottom: 2rem;
`;

const InfoRowIcon = styled.span`
  font-size: 2rem;
  line-height: 1;
`;

const InfoRowLabel = styled.div`
  font-size: 1.25rem;
  color: rgb(var(--mutedColor));
  font-weight: 600;
  text-transform: uppercase;
`;

const InfoRowValue = styled.div`
  font-size: 1.55rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-top: 0.2rem;
`;

const CardPrimaryButton = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  background: rgb(var(--primary));
  color: #ffffff;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  text-decoration: none;
  margin-top: 1.6rem;
  box-shadow: 0 4px 14px rgba(251, 107, 49, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: #e0551b;
    transform: translateY(-2px);
  }
`;

const CardGalleryButton = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  background: rgb(var(--brandBlue));
  color: #ffffff;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  text-decoration: none;
  margin-top: 1.6rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(var(--primary));
    transform: translateY(-2px);
  }
`;
