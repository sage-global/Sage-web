import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';

const ideaPillars = [
  { letter: 'i', title: 'Insight', desc: 'Deep foundational understanding & intuition' },
  { letter: 'D', title: 'Design', desc: 'Methodical circuit & system engineering' },
  { letter: 'E', title: 'Examples', desc: 'Real-world simulations & physical prototypes' },
  { letter: 'A', title: 'Applications', desc: 'Industrial deployment & practical solutions' },
];

export default function PhilosophyQuote() {
  return (
    <Section>
      <Container>
        <Layout>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <BadgeWrapper>
              <SectionBadge>Our Educational Philosophy</SectionBadge>
            </BadgeWrapper>

            <Heading>The SAGE iDEA</Heading>
            <SubheadingDivider />

            <IdeaGrid>
              {ideaPillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.letter}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <IdeaCard>
                    <LetterBadge>{pillar.letter}</LetterBadge>
                    <PillarTitle>{pillar.title}</PillarTitle>
                  </IdeaCard>
                </motion.div>
              ))}
            </IdeaGrid>

            <QuoteContainer>
              <QuoteMark>“</QuoteMark>
              <QuoteText>
                Excellence in engineering education and consulting is not only marked by technical
                knowledge, but by the versatility and effectiveness the package of complex iDEAs
                are communicated and delivered.
              </QuoteText>
            </QuoteContainer>
          </motion.div>
        </Layout>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 10rem 0 12rem 0;
  background: rgb(var(--background));
`;

const Layout = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.6rem;
`;

const SectionBadge = styled.span`
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--primary));
  background: rgba(var(--primary), 0.1);
  padding: 0.6rem 1.6rem;
  border-radius: 9999px;
`;

const Heading = styled.h2`
  font-family: var(--font-heading);
  font-size: 3.6rem;
  font-weight: 800;
  color: rgb(var(--text));
  letter-spacing: -0.02em;
  margin-bottom: 1.2rem;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const SubheadingDivider = styled.div`
  width: 6rem;
  height: 4px;
  background: rgb(var(--primary));
  margin: 0 auto 3.6rem auto;
  border-radius: 9999px;
`;

const IdeaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.8rem;
  margin-bottom: 4.8rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.4rem;
  }
`;

const IdeaCard = styled.div`
  background: rgb(var(--cardBackground));
  padding: 2.4rem 1.6rem;
  border-radius: 1.6rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(var(--primary), 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(var(--primary), 0.12);
    border-color: rgb(var(--primary));
  }
`;

const LetterBadge = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(var(--primary)) 0%, #ff8a4c 100%);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  box-shadow: 0 4px 12px rgba(var(--primary), 0.25);
`;

const PillarTitle = styled.span`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(var(--text));
`;

const QuoteContainer = styled.div`
  background: rgb(var(--cardBackground));
  padding: 4rem 3.6rem;
  border-radius: 2rem;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.05);
  border-left: 5px solid rgb(var(--primary));
  position: relative;
  text-align: left;

  @media (max-width: 768px) {
    padding: 3rem 2.2rem;
  }
`;

const QuoteMark = styled.div`
  font-family: Georgia, serif;
  font-size: 8rem;
  line-height: 0.8;
  color: rgb(var(--primary));
  opacity: 0.25;
  margin-bottom: 1rem;
`;

const QuoteText = styled.p`
  font-size: 2.1rem;
  line-height: 1.65;
  color: rgb(var(--text));
  font-weight: 500;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;
