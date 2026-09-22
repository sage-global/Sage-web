import styled from 'styled-components'
import NextLink from 'next/link'
import Container from 'components/Container'
import DisciplineTag from 'components/DisciplineTag'
import { teamMembers, DisciplineId, TeamMember } from 'sage-data'
import { getAvatarUrl, imagePresets } from 'utils/cloudinary'

export interface FilterableTeamGridProps {
  activeDiscipline: DisciplineId
  onSelectMember?: (member: TeamMember) => void
}

export default function FilterableTeamGrid({
  activeDiscipline,
  onSelectMember,
}: FilterableTeamGridProps) {
  const filteredMembers =
    activeDiscipline === 'all'
      ? teamMembers
      : teamMembers.filter((m) => m.discipline === activeDiscipline)

  return (
    <GridSection>
      <Container>
        {filteredMembers.length === 0 ? (
          <EmptyState>
            <EmptyTitle>No associates found</EmptyTitle>
            <EmptyText>There are currently no specialists listed under this discipline category.</EmptyText>
          </EmptyState>
        ) : (
          <TeamGrid>
            {filteredMembers.map((member) => {
              const avatarSrc = getAvatarUrl(member.avatarPublicId, member.avatarUrl, imagePresets.avatar)

              return (
                <NextLink key={member.id} href={`/team/${member.slug}`} passHref>
                  <MemberCard
                    onClick={(e: React.MouseEvent) => {
                      if (onSelectMember) {
                        e.preventDefault()
                        onSelectMember(member)
                      }
                    }}
                  >
                    {/* 1. Top Image Header with Zoom Animation */}
                    <ImageFrame>
                      {avatarSrc ? (
                        <CardImage src={avatarSrc} alt={member.name} loading="lazy" />
                      ) : (
                        <AvatarFallback>{member.avatarInitials}</AvatarFallback>
                      )}
                    </ImageFrame>

                    {/* 2. Member Meta Info */}
                    <CardBody>
                      <MemberName>{member.name}</MemberName>
                      <MemberRole>{member.role}</MemberRole>
                      <MemberTeaser>{member.bio}</MemberTeaser>
                    </CardBody>

                    {/* 3. Card Footer with Social Icons (Left) & Read More (Right) */}
                    <CardFooter>
                      <SocialGroup>
                        {member.socialLinks?.linkedin && member.socialLinks.linkedin !== '#' && (
                          <SocialIconButton
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                            </svg>
                          </SocialIconButton>
                        )}

                        {member.socialLinks?.facebook && member.socialLinks.facebook !== '#' && (
                          <SocialIconButton
                            href={member.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Facebook`}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z" />
                            </svg>
                          </SocialIconButton>
                        )}
                      </SocialGroup>

                      <ReadMoreLink>
                        Read Profile <span>→</span>
                      </ReadMoreLink>
                    </CardFooter>
                  </MemberCard>
                </NextLink>
              )
            })}
          </TeamGrid>
        )}
      </Container>
    </GridSection>
  )
}

const GridSection = styled.section`
  padding: 5rem 0 10rem 0;
  background: rgb(var(--background));
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const MemberCard = styled.a`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  color: inherit;

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 106, 173, 0.12);
    border-color: rgb(var(--brandBlue));
    transform: translateY(-4px);
  }
`

const ImageFrame = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  position: relative;
  background: rgb(var(--tertiary));
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  ${MemberCard}:hover & {
    transform: scale(1.08);
  }
`

const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(var(--brandBlue)) 0%, rgb(var(--skyBlue)) 100%);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: 0.05em;
`

const CardBody = styled.div`
  padding: 1.4rem 1.6rem 1rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
`

const MemberName = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.7rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.25;
`

const MemberRole = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(var(--mutedColor));
  line-height: 1.35;
`

const CardTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.1rem 0;
`

const MemberTeaser = styled.p`
  font-size: 1.25rem;
  line-height: 1.45;
  color: rgb(var(--mutedColor));
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const CardFooter = styled.div`
  padding: 0.8rem 1.6rem 1rem 1.6rem;
  border-top: 1px solid rgb(var(--lineColor));
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  background: rgb(var(--cardBackground));
`

const SocialGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const SocialIconButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: rgb(var(--tertiary));
  color: rgb(var(--mutedColor));
  border: 1px solid rgb(var(--lineColor));
  transition: all 0.2s ease;

  &:hover {
    color: rgb(var(--brandBlue));
    background: rgba(0, 106, 173, 0.1);
    border-color: rgb(var(--brandBlue));
    transform: translateY(-2px);
  }
`

const ReadMoreLink = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--brandBlue));
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;

  span {
    transition: transform 0.2s ease;
  }

  ${MemberCard}:hover & {
    color: rgb(var(--primary));

    span {
      transform: translateX(4px);
    }
  }
`

const EmptyState = styled.div`
  padding: 8rem 2rem;
  text-align: center;
  background: rgb(var(--secondBackground));
  border: 1px dashed rgb(var(--lineColor));
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`

const EmptyTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  color: rgb(var(--text));
`

const EmptyText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--mutedColor));
`
