import styled from 'styled-components'
import Container from 'components/Container'
import AutofitGrid from 'components/AutofitGrid'
import OverTitle from 'components/OverTitle'
import SectionTitle from 'components/SectionTitle'
import BasicCard from 'components/BasicCard'
import { aboutPillars } from 'sage-data'

export default function ValuesGrid() {
  return (
    <SectionWrapper>
      <Container>
        <HeaderWrapper>
          <OverTitle>02 / CORE PILLARS</OverTitle>
          <SectionTitle>Guided by uncompromised engineering values</SectionTitle>
        </HeaderWrapper>

        <AutofitGrid minWidth="26rem">
          {aboutPillars.map((pillar, idx) => (
            <PillarCard key={idx}>
              <PillarNumber>0{idx + 1}</PillarNumber>
              <PillarTitle>{pillar.title}</PillarTitle>
              <PillarDescription>{pillar.description}</PillarDescription>
            </PillarCard>
          ))}
        </AutofitGrid>
      </Container>
    </SectionWrapper>
  )
}

const SectionWrapper = styled.section`
  padding: 8rem 0;
  background: var(--secondBackground);
`

const HeaderWrapper = styled.div`
  margin-bottom: 5rem;
  max-width: 70rem;
`

const PillarCard = styled.div`
  background: var(--cardBackground);
  border: 1px solid var(--lineColor);
  border-radius: 1.6rem;
  padding: 3.2rem 2.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 106, 173, 0.08);
    border-color: var(--brandBlue);
  }
`

const PillarNumber = styled.span`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: 0.05em;
`

const PillarTitle = styled.h4`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.3;
`

const PillarDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--mutedColor);
`
