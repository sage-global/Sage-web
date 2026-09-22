import styled from 'styled-components'
import Container from 'components/Container'
import OverTitle from 'components/OverTitle'
import FilterPills from 'components/FilterPills'
import { DisciplineId, DISCIPLINES } from 'sage-data'

export interface TeamHeroProps {
  activeDiscipline: DisciplineId
  onSelectDiscipline: (id: DisciplineId) => void
}

export default function TeamHero({ activeDiscipline, onSelectDiscipline }: TeamHeroProps) {
  return (
    <HeroWrapper>
      <Container>
        <HeroContent>
          <OverTitle>02 / FACULTY & ASSOCIATES</OverTitle>
          <HeroTitle>
            World-class RF, microwave, &{' '}
            <TitleHighlight>wireless systems experts.</TitleHighlight>
          </HeroTitle>
          <HeroSubtitle>
            Our international faculty and corporate advisors bring decades of engineering leadership from
            top research institutions, semiconductor design centers, and industrial laboratories.
          </HeroSubtitle>

          <FilterWrapper>
            <FilterPills
              options={DISCIPLINES}
              activeId={activeDiscipline}
              onSelect={onSelectDiscipline}
            />
          </FilterWrapper>
        </HeroContent>
      </Container>
    </HeroWrapper>
  )
}

const HeroWrapper = styled.section`
  padding-top: 14rem;
  padding-bottom: 6rem;
  background: linear-gradient(180deg, var(--secondBackground) 0%, var(--background) 100%);
`

const HeroContent = styled.div`
  max-width: 90rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const HeroTitle = styled.h1`
  font-family: var(--font-heading);
  font-size: 5.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--text);
  margin-top: 1.6rem;
  margin-bottom: 2.4rem;

  @media (max-width: 768px) {
    font-size: 3.6rem;
  }
`

const TitleHighlight = styled.span`
  color: var(--primary);
`

const HeroSubtitle = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: var(--mutedColor);
  margin-bottom: 4rem;
  max-width: 80rem;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`

const FilterWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
`
