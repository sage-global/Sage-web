import React from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';

const TESTIMONIALS = [
  {
    content: `Watching students test their own fabricated circuits using Keysight network analyzers and seeing real-world S-parameters match theoretical models is the pinnacle of engineering learning.`,
    name: 'Dr. K. D. Nayak',
    role: 'Former Director General, DRDO & SAGE Executive Board',
    initials: 'K. N.',
  },
  {
    content: `SAGE's initiative in bridging university research with practical microwave circuit design guidelines empowers the next generation of RF and wireless systems pioneers.`,
    name: 'Dr. Surendra Pal',
    role: 'Former Associate Director, ISRO & SAGE Advisory Board',
    initials: 'S. P.',
  },
  {
    content: `The hands-on 5G amplifier design workshop conducted by SAGE and Keysight provided our students and faculty with invaluable industry-level simulation rigor and hardware validation.`,
    name: 'Dr. Nagamani',
    role: 'Head of Department, ETE, RVCE',
    initials: 'N. K.',
  },
];

export default function Testimonials() {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <Overline>Feedback &amp; Endorsements</Overline>
        </SectionHeader>
        <Grid>
          {TESTIMONIALS.map((item, idx) => (
            <CompactCard key={idx}>
              <QuoteText>“{item.content}”</QuoteText>
              <AuthorRow>
                <InitialsAvatar>{item.initials}</InitialsAvatar>
                <AuthorInfo>
                  <AuthorName>{item.name}</AuthorName>
                  <AuthorRole>{item.role}</AuthorRole>
                </AuthorInfo>
              </AuthorRow>
            </CompactCard>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 5rem 0 6rem 0;
  background: transparent;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Overline = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgb(var(--mutedColor, 100, 116, 139));

  ${media('<=tablet')} {
    font-size: 1.8rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  ${media('<=desktop')} {
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
  }
`;

const CompactCard = styled.div`
  background: rgb(var(--secondBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 0.8rem;
  padding: 2rem 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
`;

const QuoteText = styled.p`
  font-size: 1.35rem;
  line-height: 1.55;
  font-style: italic;
  color: rgb(var(--text));
  opacity: 0.88;
  margin-bottom: 1.5rem;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: auto;
`;

const InitialsAvatar = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background: rgb(var(--brandBlue, 0, 106, 173));
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: rgb(var(--text));
  line-height: 1.3;
`;

const AuthorRole = styled.span`
  font-size: 1.15rem;
  font-weight: 500;
  color: rgb(var(--mutedColor, 100, 116, 139));
  line-height: 1.3;
`;
