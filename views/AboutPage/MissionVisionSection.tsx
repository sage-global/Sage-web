import styled from 'styled-components'
import Container from 'components/Container'
import AutofitGrid from 'components/AutofitGrid'
import { mission, vision } from 'sage-data'

export default function MissionVisionSection() {
  return (
    <SectionWrapper>
      <Container>
        <AutofitGrid minWidth="34rem">
          <ChakraCard railColor="var(--brandBlue)">
            <CardHeader>
              <CardBadge railColor="var(--brandBlue)">OUR MISSION</CardBadge>
              <CardTitle>Disseminating Applied Electromagnetics Knowledge</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>{mission}</CardText>
              <FocusList>
                <FocusItem>
                  <BulletPoint railColor="var(--brandBlue)">✓</BulletPoint>
                  <span>Practical engineering & technology information on RF, millimeter-wave, and microwave sub-systems.</span>
                </FocusItem>
                <FocusItem>
                  <BulletPoint railColor="var(--brandBlue)">✓</BulletPoint>
                  <span>Tutorials, workshops, and intensive courses for engineers and recent graduates.</span>
                </FocusItem>
              </FocusList>
            </CardBody>
          </ChakraCard>

          <ChakraCard railColor="var(--skyBlue)">
            <CardHeader>
              <CardBadge railColor="var(--skyBlue)">OUR VISION</CardBadge>
              <CardTitle>Global Leadership in Wireless Education & Advisory</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>{vision}</CardText>
              <FocusList>
                <FocusItem>
                  <BulletPoint railColor="var(--skyBlue)">✓</BulletPoint>
                  <span>Premier knowledge network spanning international research universities and commercial tech hubs.</span>
                </FocusItem>
                <FocusItem>
                  <BulletPoint railColor="var(--skyBlue)">✓</BulletPoint>
                  <span>Specialist engineering consulting for next-gen cellular, satellite, and radar technologies.</span>
                </FocusItem>
              </FocusList>
            </CardBody>
          </ChakraCard>
        </AutofitGrid>
      </Container>
    </SectionWrapper>
  )
}

const SectionWrapper = styled.section`
  padding: 8rem 0;
  background: var(--background);
`

const ChakraCard = styled.div<{ railColor: string }>`
  background: var(--cardBackground);
  border: 1px solid var(--lineColor);
  border-left: 4px solid ${(p) => p.railColor};
  border-radius: 1.6rem;
  padding: 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CardBadge = styled.span<{ railColor: string }>`
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(p) => p.railColor};
`

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.6rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.2;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const CardText = styled.p`
  font-size: 1.7rem;
  line-height: 1.6;
  color: var(--mutedColor);
  font-weight: 500;
`

const FocusList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid var(--lineColor);
  padding-top: 1.6rem;
`

const FocusItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1.5;
`

const BulletPoint = styled.span<{ railColor: string }>`
  color: ${(p) => p.railColor};
  font-weight: 800;
  font-size: 1.6rem;
`
