import styled from 'styled-components';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';
import { whyFeatures } from 'sage-data';
import { media } from 'utils/media';

export default function WhySage() {
  return (
    <SectionWrapper>
      <Container>
        <HeaderContainer>
          <OverTitle>The SAGE Advantage</OverTitle>
          <Title>Why Engineers & Organizations Choose SAGE</Title>
          <LeadText>
            We provide more than just education; we deliver actionable guidelines and insights for real-world system success.
          </LeadText>
        </HeaderContainer>

        <Grid>
          {whyFeatures.map((feature, idx) => (
            <FeatureCard key={feature.title}>
              <IconBadge>{idx + 1}</IconBadge>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 8rem 0;
  background: rgb(var(--secondBackground));
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
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;

  ${media('<=desktop')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.2rem;
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--skyBlue, 53, 169, 239));
    box-shadow: var(--shadow-md);
  }
`;

const IconBadge = styled.div`
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  background: rgb(var(--primary, 251, 107, 49));
  color: #FFFFFF;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const FeatureTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
`;

const FeatureDescription = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;
