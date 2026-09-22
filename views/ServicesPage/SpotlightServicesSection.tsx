import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import Icon from 'components/Icon';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';
import SpotlightCard from 'components/SpotlightCard';
import type { Service } from 'lib/content';
import { media } from 'utils/media';

interface SpotlightServicesSectionProps {
  services: Service[];
}

const SPOTLIGHT_COLORS = [
  'rgba(0, 106, 173, 0.15)',   // Deep Blue
  'rgba(251, 107, 49, 0.14)',  // Orange
  'rgba(53, 169, 239, 0.15)',  // Sky Blue
  'rgba(251, 107, 49, 0.14)',  // Orange
];

export default function SpotlightServicesSection({ services }: SpotlightServicesSectionProps) {
  return (
    <SectionWrapper id="offerings">
      <Container>
        <HeaderContainer>
          <OverTitle>Our Core Capabilities</OverTitle>
          <Title>Specialized Engineering Services</Title>
          <LeadText>
            Explore our foundational programs, specialized advisory engagements, tailored curricula, and hands-on workshops.
          </LeadText>
        </HeaderContainer>

        <CardsGrid>
          {services.map((service, index) => {
            const spotlightColor = SPOTLIGHT_COLORS[index % SPOTLIGHT_COLORS.length];
            return (
              <CardAnchor key={service.id} id={service.id}>
                <SpotlightCard spotlightColor={spotlightColor}>
                  <CardHeader>
                    <IconBadge>
                      <Icon id={service.icon} size="3rem" color="rgb(var(--brandBlue, 0, 106, 173))" />
                    </IconBadge>
                    <CardNumber>{`0${index + 1}`}</CardNumber>
                  </CardHeader>

                  <CardTitle>{service.name}</CardTitle>
                  <CardTagline>{service.tagline}</CardTagline>
                  <CardDescription>{service.description}</CardDescription>

                  <CardFooter>
                    <NextLink href={service.href} passHref>
                      <ExploreLink aria-label={`Explore ${service.name}`}>
                        <span>Explore</span>
                        <ArrowSpan>&rarr;</ArrowSpan>
                      </ExploreLink>
                    </NextLink>
                  </CardFooter>
                </SpotlightCard>
              </CardAnchor>
            );
          })}
        </CardsGrid>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 8rem 0 6rem 0;
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 0 auto 5rem auto;
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const CardAnchor = styled.div`
  scroll-margin-top: 10rem;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const IconBadge = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 1.2rem;
  background: rgb(var(--tertiary, 235, 246, 254));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 106, 173, 0.08);
  transition: transform 0.2s ease;

  html[data-theme='dark'] & {
    background: rgba(53, 169, 239, 0.15);
  }
`;

const CardNumber = styled.span`
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: rgb(var(--mutedColor, 100, 116, 139));
  opacity: 0.6;
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
`;

const CardTagline = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.5;
  color: rgb(var(--brandBlue, 0, 106, 173));
  margin-bottom: 1.6rem;

  html[data-theme='dark'] & {
    color: rgb(var(--skyBlue, 53, 169, 239));
  }
`;

const CardDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.8rem;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(var(--lineColor, 226, 232, 240));
`;

const ExploreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: rgb(var(--primary, 251, 107, 49));
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: rgb(var(--brandBlue, 0, 106, 173));

    html[data-theme='dark'] & {
      color: rgb(var(--skyBlue, 53, 169, 239));
    }

    span:last-child {
      transform: translateX(4px);
    }
  }
`;

const ArrowSpan = styled.span`
  transition: transform 0.2s ease-in-out;
  display: inline-block;
`;
