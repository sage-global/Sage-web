import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import CountUp from 'components/CountUp';

export default function StatsBar() {
  return (
    <Section>
      <Container>
        <Grid>
          <StatBlock>
            <NumberWrapper>
              <CountUp end={25} suffix="+" duration={2} />
            </NumberWrapper>
            <Label>Years Experience</Label>
          </StatBlock>

          <StatBlock>
            <NumberWrapper>
              <CountUp end={15} suffix="+" duration={2} />
            </NumberWrapper>
            <Label>Global Associates</Label>
          </StatBlock>

          <StatBlock>
            <NumberWrapper>
              <CountUp end={4} duration={1.5} />
            </NumberWrapper>
            <Label>Core Disciplines</Label>
          </StatBlock>
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 8rem 0;
  background: #1A1A1A; /* Dark ink band as requested */
  color: #ffffff;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 4rem;
`;

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NumberWrapper = styled.div`
  font-family: var(--font-heading);
  font-size: 6.4rem;
  font-weight: 800;
  color: rgb(var(--primary));
  line-height: 1;
  margin-bottom: 0.8rem;
`;

const Label = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  opacity: 0.9;
`;
