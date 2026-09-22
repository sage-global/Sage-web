import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import Container from 'components/Container';
import PageHero from 'components/PageHero';
import FacultyAvatar from 'components/FacultyAvatar';
import { TeamMember, PublicationItem } from 'sage-data';
import { getAvatarUrl, imagePresets } from 'utils/cloudinary';
import { media } from 'utils/media';

export interface ProfileViewProps {
  member: TeamMember;
  prevMember?: TeamMember;
  nextMember?: TeamMember;
}

export default function ProfileView({ member, prevMember, nextMember }: ProfileViewProps) {
  const avatarSrc = getAvatarUrl(member.avatarPublicId, member.avatarUrl, imagePresets.avatar);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Faculty & Associates', href: '/team' },
    { label: member.name, href: `/team/${member.slug}` },
  ];

  const descriptionParts = [
    member.role,
    member.degrees,
    member.ieeeStatus,
    member.affiliation,
  ].filter(Boolean);
  const heroDescription = descriptionParts.join(' • ');

  const hasSpecializations = member.specializations && member.specializations.length > 0;
  const hasCourses = member.coursesTaught && member.coursesTaught.length > 0;
  const hasPublications = member.publications && member.publications.length > 0;

  const validLinkedin = member.socialLinks?.linkedin && member.socialLinks.linkedin !== '#';
  const validFacebook = member.socialLinks?.facebook && member.socialLinks.facebook !== '#';
  const validScholar = member.socialLinks?.scholar && member.socialLinks.scholar !== '#';
  const validOrcid = member.socialLinks?.orcid && member.socialLinks.orcid !== '#';
  const validWebsite = member.socialLinks?.website && member.socialLinks.website !== '#';
  const hasLinks = validLinkedin || validFacebook || validScholar || validOrcid || validWebsite;

  return (
    <ProfileWrapper>
      {/* 1. Page Hero */}
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={member.disciplineLabel}
        title={member.name}
        description={heroDescription}
      />

      {/* 2. Main Layout */}
      <Container>
        <LayoutGrid>
          {/* Left Sidebar */}
          <SidebarColumn>
            <SidebarCard>
              {/* Portrait */}
              <PortraitFrame>
                {avatarSrc ? (
                  <PortraitImg src={avatarSrc} alt={member.name} />
                ) : (
                  <FallbackFrame>
                    <FacultyAvatar
                      initials={member.avatarInitials}
                      name={member.name}
                      size="lg"
                    />
                  </FallbackFrame>
                )}
              </PortraitFrame>

              {/* Role, Discipline & Affiliation */}
              <SidebarMeta>
                <MemberRole>{member.role}</MemberRole>
                <MemberDiscipline>{member.disciplineLabel}</MemberDiscipline>
                {member.affiliation && <MemberAffiliation>{member.affiliation}</MemberAffiliation>}
              </SidebarMeta>

              {/* Verified Professional & Academic Links */}
              {hasLinks && (
                <LinksList>
                  {validLinkedin && (
                    <ExternalLink
                      href={member.socialLinks?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                      </svg>
                      <span>LinkedIn</span>
                    </ExternalLink>
                  )}

                  {validScholar && (
                    <ExternalLink
                      href={member.socialLinks?.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Google Scholar`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.8 3.8v7.2h2.4v-5.3L12 19l12-9.5L12 0z" />
                      </svg>
                      <span>Google Scholar</span>
                    </ExternalLink>
                  )}

                  {validOrcid && (
                    <ExternalLink
                      href={member.socialLinks?.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on ORCID`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.516.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.869-1.425 3.869-3.722 0-2.016-1.397-3.722-3.822-3.722h-2.344z" />
                      </svg>
                      <span>ORCID</span>
                    </ExternalLink>
                  )}

                  {validFacebook && (
                    <ExternalLink
                      href={member.socialLinks?.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Facebook`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z" />
                      </svg>
                      <span>Facebook</span>
                    </ExternalLink>
                  )}

                  {validWebsite && (
                    <ExternalLink
                      href={member.socialLinks?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} Website`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <span>Lab / Website</span>
                    </ExternalLink>
                  )}
                </LinksList>
              )}

              {/* Primary Action */}
              <ActionArea>
                <NextLink href={`/contact?faculty=${member.slug}`} passHref>
                  <ContactButton>Schedule a conversation</ContactButton>
                </NextLink>
                <NextLink href="/team" passHref>
                  <DirectoryLink>
                    <span>&larr;</span> Faculty directory
                  </DirectoryLink>
                </NextLink>
              </ActionArea>
            </SidebarCard>
          </SidebarColumn>

          {/* Right Main Column */}
          <MainColumn>
            {/* Biography */}
            <EditorialSection>
              <SectionTitle>Biography</SectionTitle>
              <BioProse>
                {member.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </BioProse>
            </EditorialSection>

            {/* Focus Areas */}
            {hasSpecializations && (
              <EditorialSection>
                <SectionTitle>Focus areas</SectionTitle>
                <TagList>
                  {member.specializations.map((spec, index) => (
                    <TagItem key={index}>{spec}</TagItem>
                  ))}
                </TagList>
              </EditorialSection>
            )}

            {/* Teaching and Training */}
            {hasCourses && (
              <EditorialSection>
                <SectionTitle>Teaching and training</SectionTitle>
                <CoursesList>
                  {member.coursesTaught.map((course, index) => (
                    <CourseRow key={index}>{course}</CourseRow>
                  ))}
                </CoursesList>
              </EditorialSection>
            )}

            {/* Selected Publications */}
            {hasPublications && (
              <EditorialSection>
                <SectionTitle>Selected publications</SectionTitle>
                <PublicationsList>
                  {member.publications?.map((pub, index) => {
                    if (typeof pub === 'object' && pub !== null) {
                      const item = pub as PublicationItem;
                      return (
                        <PublicationRow key={index}>
                          <span className="pub-title">"{item.title}"</span>
                          {item.venue && <span className="pub-venue">, {item.venue}</span>}
                          {item.year && <span className="pub-year"> ({item.year})</span>}
                          {item.url && (
                            <span className="pub-link">
                              {' — '}
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                [Link]
                              </a>
                            </span>
                          )}
                          {item.doi && (
                            <span className="pub-doi">
                              {' — '}
                              <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">
                                doi:{item.doi}
                              </a>
                            </span>
                          )}
                        </PublicationRow>
                      );
                    }

                    // String format with URL detection
                    const pubStr = String(pub);
                    const urlMatch = pubStr.match(/(https?:\/\/[^\s]+)/);

                    if (urlMatch) {
                      const url = urlMatch[0];
                      const before = pubStr.substring(0, urlMatch.index);
                      const after = pubStr.substring((urlMatch.index || 0) + url.length);
                      return (
                        <PublicationRow key={index}>
                          {before}
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {url}
                          </a>
                          {after}
                        </PublicationRow>
                      );
                    }

                    return <PublicationRow key={index}>{pubStr}</PublicationRow>;
                  })}
                </PublicationsList>
              </EditorialSection>
            )}

            {/* Quiet Advisory Inquiry Note */}
            <InquiryNote>
              For technical advisory, curriculum design, or corporate training inquiries,{' '}
              <NextLink href={`/contact?faculty=${member.slug}`} passHref>
                <InlineLink>contact our team &rarr;</InlineLink>
              </NextLink>
            </InquiryNote>

            {/* Previous / Next Specialist Navigation */}
            {(prevMember || nextMember) && (
              <AdjacentNav aria-label="Adjacent faculty navigation">
                {prevMember ? (
                  <NextLink href={`/team/${prevMember.slug}`} passHref>
                    <AdjacentLink>
                      <AdjacentDir>&larr; Previous</AdjacentDir>
                      <AdjacentName>{prevMember.name}</AdjacentName>
                    </AdjacentLink>
                  </NextLink>
                ) : <div />}

                {nextMember && (
                  <NextLink href={`/team/${nextMember.slug}`} passHref>
                    <AdjacentLink isRight>
                      <AdjacentDir>Next &rarr;</AdjacentDir>
                      <AdjacentName>{nextMember.name}</AdjacentName>
                    </AdjacentLink>
                  </NextLink>
                )}
              </AdjacentNav>
            )}
          </MainColumn>
        </LayoutGrid>
      </Container>
    </ProfileWrapper>
  );
}

/* -------------------------------------------------------------------------- */
/* Quiet, Academic Styled Components                                          */
/* -------------------------------------------------------------------------- */

const ProfileWrapper = styled.div`
  background: rgb(var(--background));
  padding-bottom: 7rem;
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 30rem 1fr;
  gap: 4rem;
  margin-top: 4rem;
  align-items: start;

  ${media('<=desktop')} {
    grid-template-columns: 28rem 1fr;
    gap: 3rem;
  }

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 3.5rem;
    margin-top: 2.5rem;
  }
`;

const SidebarColumn = styled.aside`
  width: 100%;
`;

const SidebarCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 0.8rem;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: sticky;
  top: 9.5rem;

  ${media('<=tablet')} {
    position: static;
  }
`;

const PortraitFrame = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 0.6rem;
  overflow: hidden;
  background: rgb(var(--secondBackground));
  border: 1px solid rgb(var(--lineColor));
`;

const PortraitImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const FallbackFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--secondBackground));
`;

const SidebarMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const MemberRole = styled.p`
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(var(--primary));
  line-height: 1.3;
`;

const MemberDiscipline = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: rgb(var(--mutedColor));
`;

const MemberAffiliation = styled.p`
  font-size: 1.2rem;
  line-height: 1.4;
  color: rgb(var(--text));
  opacity: 0.85;
  margin-top: 0.2rem;
`;

const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgb(var(--lineColor));
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: rgb(var(--brandBlue));
  text-decoration: none;
  transition: color 0.15s ease;

  svg {
    flex-shrink: 0;
    color: rgb(var(--mutedColor));
  }

  &:hover {
    color: rgb(var(--primary));
    svg {
      color: rgb(var(--primary));
    }
  }
`;

const ActionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgb(var(--lineColor));
`;

const ContactButton = styled.a`
  display: inline-block;
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: rgb(var(--primary, 251, 107, 49));
  padding: 1.1rem 1.6rem;
  font-size: 1.35rem;
  color: #ffffff !important;
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: 0.6rem;
  border: 1px solid rgb(var(--primary, 251, 107, 49));
  transition: background-color 0.15s ease, border-color 0.15s ease;
  cursor: pointer;

  &:hover {
    background: #e0551e;
    border-color: #e0551e;
  }
`;

const DirectoryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: rgb(var(--mutedColor));
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: rgb(var(--brandBlue));
  }
`;

const MainColumn = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const EditorialSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  letter-spacing: -0.01em;
  line-height: 1.25;
`;

const BioProse = styled.div`
  font-size: 1.55rem;
  line-height: 1.65;
  color: rgb(var(--text));

  p:not(:last-child) {
    margin-bottom: 1.2rem;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TagItem = styled.span`
  display: inline-block;
  padding: 0.5rem 1.1rem;
  background: rgb(var(--tertiary));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 0.4rem;
  font-size: 1.3rem;
  font-weight: 500;
  color: rgb(var(--text));
`;

const CoursesList = styled.ul`
  list-style: disc inside;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CourseRow = styled.li`
  font-size: 1.45rem;
  line-height: 1.5;
  color: rgb(var(--text));
`;

const PublicationsList = styled.ol`
  list-style: decimal inside;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PublicationRow = styled.li`
  font-size: 1.45rem;
  line-height: 1.55;
  color: rgb(var(--text));
  font-style: italic;

  .pub-title {
    font-weight: 600;
    font-style: normal;
  }

  .pub-venue {
    color: rgb(var(--text));
  }

  .pub-year {
    font-style: normal;
    color: rgb(var(--mutedColor));
  }

  .pub-link a,
  .pub-doi a {
    color: rgb(var(--brandBlue));
    font-style: normal;
    text-decoration: underline;
    font-size: 1.3rem;
  }
`;

const InquiryNote = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  color: rgb(var(--mutedColor));
  padding-top: 1.5rem;
  border-top: 1px solid rgb(var(--lineColor));
`;

const InlineLink = styled.a`
  color: rgb(var(--brandBlue));
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;

  &:hover {
    color: rgb(var(--primary));
  }
`;

const AdjacentNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(var(--lineColor));

  ${media('<=phone')} {
    flex-direction: column;
  }
`;

const AdjacentLink = styled.a<{ isRight?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-decoration: none;
  text-align: ${(p) => (p.isRight ? 'right' : 'left')};
  color: inherit;
  transition: color 0.15s ease;

  &:hover {
    color: rgb(var(--brandBlue));
  }
`;

const AdjacentDir = styled.span`
  font-size: 1.15rem;
  font-weight: 600;
  color: rgb(var(--mutedColor));
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const AdjacentName = styled.span`
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
`;
