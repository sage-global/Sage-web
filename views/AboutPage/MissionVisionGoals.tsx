import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import { mission, vision, goals } from 'sage-data';

export default function MissionVisionGoals() {
  return (
    <Section>
      <Container>
        <Grid>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardTitle>MISSION</CardTitle>
              <CardText>"{mission}"</CardText>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardTitle>VISION</CardTitle>
              <CardText>"{vision}"</CardText>
            </Card>
          </motion.div>
        </Grid>

        <GoalsContainer>
          {goals && goals.map((goal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <GoalRow>
                <GoalNumber>0{idx + 1}</GoalNumber>
                <GoalText>{goal}</GoalText>
              </GoalRow>
            </motion.div>
          ))}
        </GoalsContainer>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 8rem 0 10rem 0;
  background: #FFF8F3; /* Warm background as requested */
  
  /* Fallback for dark mode */
  @media (prefers-color-scheme: dark) {
    .next-dark-theme & {
      background: rgb(var(--secondBackground));
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled.div`
  background: rgb(var(--cardBackground));
  padding: 4rem;
  border-top: 4px solid rgb(var(--primary));
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 1.2rem 1.2rem;
  height: 100%;
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: rgb(var(--primary));
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
`;

const CardText = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgb(var(--text));
  font-weight: 500;
  font-style: italic;
`;

const GoalsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
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
  font-size: 1.8rem;
  line-height: 1.5;
  color: rgb(var(--text));
  padding-top: 0.4rem;
`;
