import styled from 'styled-components'
import OriginalDrawer from './Drawer'
import ClientOnly from './ClientOnly'
import CloseIcon from './CloseIcon'
import FacultyAvatar from './FacultyAvatar'
import DisciplineTag from './DisciplineTag'
import Button from './Button'
import NextLink from 'next/link'
import { TeamMember } from 'sage-data'

export interface BioDrawerProps {
  member: TeamMember | null
  onClose: () => void
}

export default function BioDrawer({ member, onClose }: BioDrawerProps) {
  if (!member) return null

  return (
    <ClientOnly>
      <OverlayBackdrop onClick={onClose} aria-label="Close Bio Drawer" />
      <SheetContainer role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <SheetHeader>
          <HeaderLeft>
            <FacultyAvatar
              initials={member.avatarInitials}
              name={member.name}
              imageUrl={member.avatarUrl}
              avatarPublicId={member.avatarPublicId}
              size="lg"
            />
            <HeaderMeta>
              <DrawerTitle id="drawer-title">{member.name}</DrawerTitle>
              <DrawerRole>{member.role}</DrawerRole>
              <TagsRow>
                <DisciplineTag variant="solid" colorScheme="orange">
                  {member.disciplineLabel}
                </DisciplineTag>
              </TagsRow>
            </HeaderMeta>
          </HeaderLeft>

          <CloseIconButton onClick={onClose} aria-label="Close">
            <CloseIcon />
          </CloseIconButton>
        </SheetHeader>

        <SheetBody>
          <SectionBlock>
            <SectionHeading>Biography</SectionHeading>
            <BioText>{member.bio}</BioText>
          </SectionBlock>

          <SectionBlock>
            <SectionHeading>Core Specializations</SectionHeading>
            <PillsGrid>
              {member.specializations.map((spec, i) => (
                <SpecializationItem key={i}>{spec}</SpecializationItem>
              ))}
            </PillsGrid>
          </SectionBlock>

          <SectionBlock>
            <SectionHeading>Courses & Workshops Taught</SectionHeading>
            <ListGroup>
              {member.coursesTaught.map((course, i) => (
                <ListItem key={i}>
                  <CheckMark>✓</CheckMark>
                  <span>{course}</span>
                </ListItem>
              ))}
            </ListGroup>
          </SectionBlock>

          {member.publications && member.publications.length > 0 && (
            <SectionBlock>
              <SectionHeading>Key Publications & Research</SectionHeading>
              <ListGroup>
                {member.publications.map((pub, i) => (
                  <ListItem key={i}>
                    <PubBullet>•</PubBullet>
                    <span>
                      {typeof pub === 'object' && pub !== null
                        ? `${pub.title}${pub.venue ? `, ${pub.venue}` : ''}${pub.year ? ` (${pub.year})` : ''}`
                        : String(pub)}
                    </span>
                  </ListItem>
                ))}
              </ListGroup>
            </SectionBlock>
          )}
        </SheetBody>

        <SheetFooter>
          <NextLink href={`/contact?faculty=${member.slug}`} passHref>
            <Button style={{ width: '100%' }}>
              Schedule Consultation with {member.name.split(' ')[0]}
            </Button>
          </NextLink>
        </SheetFooter>
      </SheetContainer>
    </ClientOnly>
  )
}

const OverlayBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9998;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const SheetContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 64rem; /* 640px desktop Sheet size */
  background: var(--cardBackground);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    height: 85vh;
    max-width: 100%;
    border-radius: 2rem 2rem 0 0;
    animation: slideInBottom 0.25s cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes slideInBottom {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  }
`

const SheetHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 3rem 3rem 2rem 3rem;
  border-bottom: 1px solid var(--lineColor);
  position: relative;
`

const HeaderLeft = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const HeaderMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const DrawerTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.2;
`

const DrawerRole = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--mutedColor);
`

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.8rem;
`

const CloseIconButton = styled.button`
  background: var(--tertiary);
  border: 1px solid var(--lineColor);
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text);
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: var(--lineColor);
  }
`

const SheetBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const SectionHeading = styled.h4`
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--brandBlue);
  letter-spacing: 0.02em;
  text-transform: uppercase;
`

const BioText = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: var(--text);
`

const PillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`

const SpecializationItem = styled.span`
  background: var(--tertiary);
  color: var(--brandBlue);
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.6rem 1.4rem;
  border-radius: 0.8rem;
  border: 1px solid var(--lineColor);
`

const ListGroup = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1.5;
`

const CheckMark = styled.span`
  color: var(--primary);
  font-weight: 800;
  font-size: 1.6rem;
`

const PubBullet = styled.span`
  color: var(--brandBlue);
  font-weight: 800;
  font-size: 1.8rem;
`

const SheetFooter = styled.div`
  padding: 2rem 3rem;
  border-top: 1px solid var(--lineColor);
  background: var(--cardBackground);
`
