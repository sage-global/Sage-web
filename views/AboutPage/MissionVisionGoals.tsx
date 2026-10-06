import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import { missionVisionCombined, goalsIntro, goals } from 'sage-data';

export default function MissionVisionGoals() {
  return (
    <Section id="mission">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <MissionVisionCard>
            <CardTitle>MISSION &amp; VISION</CardTitle>
            <CardText>"{missionVisionCombined}"</CardText>
          </MissionVisionCard>
        </motion.div>

        <GoalsSection>
          <GoalsHeader>
            <GoalsTitle>GOALS</GoalsTitle>
            <GoalsDivider />
            <GoalsIntroText>{goalsIntro}</GoalsIntroText>
          </GoalsHeader>

          <GoalsContainer>
            {goals &&
              goals.map((goal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <GoalRow>
                    <GoalNumber>0{idx + 1}</GoalNumber>
                    <GoalText>{goal}</GoalText>
                  </GoalRow>
                </motion.div>
              ))}
          </GoalsContainer>
        </GoalsSection>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 8rem 0 10rem 0;
  background: rgb(var(--secondBackground));
`;

const MissionVisionCard = styled.div`
  max-width: 900px;
  margin: 0 auto 6rem auto;
  background: rgb(var(--cardBackground));
  padding: 4.8rem 4rem;
  border-top: 5px solid rgb(var(--primary));
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 1.6rem 1.6rem;

  @media (max-width: 768px) {
    padding: 3.2rem 2.4rem;
  }
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: rgb(var(--primary));
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const CardText = styled.p`
  font-size: 2.1rem;
  line-height: 1.65;
  color: rgb(var(--text));
  font-weight: 500;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const GoalsSection = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const GoalsHeader = styled.div`
  margin-bottom: 3.6rem;
  text-align: left;
`;

const GoalsTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  color: rgb(var(--primary));
  letter-spacing: 0.1em;
  margin: 0;
`;

const GoalsDivider = styled.div`
  width: 4.5rem;
  height: 3px;
  background: rgb(var(--primary));
  margin: 0.8rem 0 1.8rem 0;
  border-radius: 9999px;
`;

const GoalsIntroText = styled.p`
  font-size: 1.85rem;
  line-height: 1.65;
  color: rgb(var(--text));
  font-weight: 600;
  margin: 0;
`;

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const GoalRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid rgba(var(--text), 0.1);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const GoalNumber = styled.span`
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 800;
  color: rgb(var(--primary));
  min-width: 4rem;
`;

const GoalText = styled.p`
  font-size: 1.75rem;
  line-height: 1.6;
  color: rgb(var(--text));
  padding-top: 0.3rem;
  margin: 0;
`;
