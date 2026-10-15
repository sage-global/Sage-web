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
              <CountUp end={35} suffix="+" duration={2} />
            </NumberWrapper>
            <Label>Years of Combined Experience</Label>
          </StatBlock>

          <StatBlock>
            <NumberWrapper>
              <CountUp end={20} suffix="+" duration={2} />
            </NumberWrapper>
            <Label>Global Associates: Professionals & Faculty</Label>
          </StatBlock>

          <StatBlock>
            <NumberWrapper>
              <CountUp end={5} duration={1.5} />
            </NumberWrapper>
            <Label>Workshops & Events to Date</Label>
          </StatBlock>
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 8rem 0;
  background: linear-gradient(135deg, #004578 0%, #006AAD 100%);
  color: #ffffff;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  html[data-theme='dark'] &,
  .next-dark-theme & {
    background: linear-gradient(135deg, #0e2f52 0%, #194877 100%);
    border-top: 1px solid rgba(56, 189, 248, 0.25);
    border-bottom: 1px solid rgba(56, 189, 248, 0.25);
  }
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
