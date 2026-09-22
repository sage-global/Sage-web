import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import SpotlightCard from 'components/SpotlightCard';
import { Cpu, Wifi, Radio, Zap } from 'lucide-react';

const competencies = [
  {
    title: "Electronics & Communication Engineering",
    description: "Foundational and advanced expertise in electronic circuits, signal processing, and telecommunications infrastructure.",
    icon: <Cpu size={32} />
  },
  {
    title: "Applied Electromagnetics",
    description: "Computational and theoretical electromagnetics, EMI/EMC compliance, and metamaterial design.",
    icon: <Zap size={32} />
  },
  {
    title: "RF Circuits & Antennas",
    description: "Design and synthesis of high-frequency MMICs, printed antennas, arrays, and anechoic chamber measurements.",
    icon: <Radio size={32} />
  },
  {
    title: "Wireless Systems",
    description: "System-level architecture for 5G/6G, massive MIMO, sub-6GHz, and millimeter-wave communication networks.",
    icon: <Wifi size={32} />
  }
];

export default function CoreCompetencies() {
  return (
    <Section>
      <Container>
        <Header>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Title>Core Competencies</Title>
            <Subtitle>Decades of specialized experience across four key engineering pillars.</Subtitle>
          </motion.div>
        </Header>

        <Grid>
          {competencies.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightCard>
                <IconWrapper>{comp.icon}</IconWrapper>
                <CardTitle>{comp.title}</CardTitle>
                <CardText>{comp.description}</CardText>
              </SpotlightCard>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 10rem 0;
  background: rgb(var(--background));
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  font-size: 3.6rem;
  margin-bottom: 1.6rem;
  color: rgb(var(--text));
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--mutedColor));
  line-height: 1.5;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const IconWrapper = styled.div`
  color: rgb(var(--primary));
  margin-bottom: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
  color: rgb(var(--text));
`;

const CardText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor));
`;
