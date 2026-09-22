import styled from 'styled-components';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';
import { media } from 'utils/media';

export default function MissionVision() {
  return (
    <SectionWrapper>
      <Container>
        <HeaderContainer>
          <OverTitle>About SAGE Institute</OverTitle>
          <Title>Disseminating RF & Wireless Knowledge Globally</Title>
          <LeadText>
            SAGE (Shastry Associates Global Enterprises) is an international network of highly accomplished engineers and faculty with decades of industrial and academic experience.
          </LeadText>
        </HeaderContainer>

        <Grid>
          <Card>
            <Badge>Mission</Badge>
            <CardTitle>Disseminate Knowledge</CardTitle>
            <CardText>
              To disseminate practical engineering knowledge and technological insights in the area of applied electromagnetics, RF circuits, antennas, and wireless systems.
            </CardText>
          </Card>

          <Card highlight>
            <Badge highlight>Core Goals</Badge>
            <CardTitle>Practical Guidelines</CardTitle>
            <CardList>
              <li>Practical information on RF, mmWave, and microwave circuits.</li>
              <li>Courses and workshops for graduates & industry engineers.</li>
              <li>High-impact engineering consulting services.</li>
            </CardList>
          </Card>

          <Card>
            <Badge>Vision</Badge>
            <CardTitle>Global Leadership</CardTitle>
            <CardText>
              To be the leader in disseminating knowledge and information in radio frequency wireless systems engineering and advanced technologies globally.
            </CardText>
          </Card>
        </Grid>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 8rem 0;
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 0 auto 6rem auto;
`;

const Title = styled(SectionTitle)`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const LeadText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div<{ highlight?: boolean }>`
  background: ${(p) => (p.highlight ? 'rgb(var(--brandBlue, 0, 106, 173))' : 'rgb(var(--cardBackground))')};
  color: ${(p) => (p.highlight ? '#FFFFFF' : 'rgb(var(--text))')};
  border: 1px solid ${(p) => (p.highlight ? 'transparent' : 'rgb(var(--lineColor, 226, 232, 240))')};
  border-radius: 1.2rem;
  padding: 4rem 3rem;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

const Badge = styled.span<{ highlight?: boolean }>`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  background: ${(p) => (p.highlight ? 'rgba(255, 255, 255, 0.2)' : 'rgb(var(--tertiary, 235, 246, 254))')};
  color: ${(p) => (p.highlight ? '#FFFFFF' : 'rgb(var(--brandBlue, 0, 106, 173))')};
  margin-bottom: 2rem;

  html[data-theme='dark'] & {
    background: ${(p) => (p.highlight ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 106, 173, 0.45)')};
    color: #ffffff;
    border: 1px solid rgba(53, 169, 239, 0.5);
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const CardText = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const CardList = styled.ul`
  font-size: 1.4rem;
  line-height: 1.6;
  opacity: 0.9;
  padding-left: 2rem;

  li {
    margin-bottom: 0.8rem;
  }
`;
