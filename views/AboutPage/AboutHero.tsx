import styled from 'styled-components'
import Container from 'components/Container'
import OverTitle from 'components/OverTitle'
import StatsBar from 'components/StatsBar'

export default function AboutHero() {
  return (
    <HeroWrapper>
      <Container>
        <HeroContent>
          <OverTitle>01 / ABOUT SAGE</OverTitle>
          <HeroTitle>
            Engineers teaching engineers.{' '}
            <TitleHighlight>25+ years of applied RF excellence.</TitleHighlight>
          </HeroTitle>
          <HeroSubtitle>
            Shastry Associates Global Enterprises (SAGE) was established by veteran electromagnetics
            engineers to deliver rigorous technical training, hands-on laboratory curricula, and
            specialized corporate consulting across RF, microwave, and wireless communication systems.
          </HeroSubtitle>
        </HeroContent>

        <StatsContainer>
          <StatsBar />
        </StatsContainer>
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

const StatsContainer = styled.div`
  margin-top: 2rem;
`
