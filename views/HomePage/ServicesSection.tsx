import NextLink from 'next/link';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';
import { services } from 'sage-data';
import { media } from 'utils/media';

export default function ServicesSection() {
  return (
    <SectionWrapper>
      <Container>
        <HeaderContainer>
          <OverTitle>Capabilities & Engagement</OverTitle>
          <Title>Services & Specialized Offerings</Title>
          <LeadText>
            From custom enterprise workshops to one-on-one consulting, SAGE adapts to your engineering requirements.
          </LeadText>
        </HeaderContainer>

        <Grid>
          {services.map((service, idx) => (
            <ServiceCard key={service.id}>
              <NumberBadge>{`0${idx + 1}`}</NumberBadge>
              <ServiceTitle>{service.name}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <DeliveryRow>
                <DeliveryTag>{service.tagline}</DeliveryTag>
              </DeliveryRow>
            </ServiceCard>
          ))}
        </Grid>

        <CtaRow>
          <NextLink href="/services" passHref>
            <Button>
              Explore All Services <span>&rarr;</span>
            </Button>
          </NextLink>
        </CtaRow>
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
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.2rem;
  padding: 3.5rem 3rem;
  position: relative;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--brandBlue, 0, 106, 173));
    box-shadow: var(--shadow-md);
  }
`;

const NumberBadge = styled.span`
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 800;
  color: rgb(var(--brandBlue, 0, 106, 173));
  background: rgb(var(--tertiary, 235, 246, 254));
  padding: 0.4rem 1rem;
  border-radius: 0.6rem;
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
`;

const ServiceDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.5rem;
`;

const DeliveryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const DeliveryTag = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.3rem 1rem;
  border-radius: 9999px;
  background: rgb(var(--secondBackground));
  color: rgb(var(--text));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
`;

const CtaRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;
