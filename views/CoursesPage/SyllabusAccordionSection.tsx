import React, { useState } from 'react';
import styled from 'styled-components';
import Accordion from 'components/Accordion';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';

interface ModuleSyllabusItem {
  id: string;
  title: string;
  topics: string[];
  handsOn: string;
}

const SAMPLE_MODULES: ModuleSyllabusItem[] = [
  {
    id: 'module-1',
    title: 'Module 1: Cascaded Noise Figure & Dynamic Range in RF Receivers',
    topics: [
      'Noise temperature, Friis formula for cascaded stages, and sensitivity calculations',
      'Nonlinear distortions: 1-dB compression point (P1dB) and Third-Order Intercept (IP3)',
      'Spurious-Free Dynamic Range (SFDR) and intermodulation products in modern multi-carrier systems',
    ],
    handsOn: 'Simulation lab: Calculating receiver cascaded noise figure and linearity trade-offs using EDA tools.',
  },
  {
    id: 'module-2',
    title: 'Module 2: Microwave Passive Networks, Power Dividers & Couplers',
    topics: [
      'Scattering parameters (S-parameters), reciprocity, and lossless multi-port network constraints',
      'Wilkinson power divider design: isolation resistor analysis and bandwidth enhancement',
      'Directional couplers: Branch-line quadrature hybrids, coupled-line theory, and 180° rat-race rings',
    ],
    handsOn: 'Simulation lab: Layout and electromagnetic co-simulation of a 3-dB branch-line coupler with microstrip lines.',
  },
  {
    id: 'module-3',
    title: 'Module 3: Impedance Matching Networks & Smith Chart Engineering',
    topics: [
      'Smith Chart navigation, lumped-element L-sections, and Q-factor bandwidth limitations',
      'Distributed matching: single-stub and double-stub tuners, quarter-wave transformers',
      'Wideband matching techniques and Bode-Fano theoretical limits',
    ],
    handsOn: 'Simulation lab: Matching an RF power amplifier output to 50 Ω across 3.3–3.8 GHz 5G spectrum.',
  },
  {
    id: 'module-4',
    title: 'Module 4: Antenna Parameters, Phased Arrays & Link Budgets',
    topics: [
      'Near-field vs. far-field boundaries, radiation patterns, directivity, and aperture efficiency',
      'Linear and planar phased antenna arrays, beam steering, array factor, and mutual coupling',
      'Friis transmission equation, atmospheric absorption, polarization mismatch, and complete link margin',
    ],
    handsOn: 'Simulation lab: Phased array beamforming simulation and terrestrial link budget spreadsheet verification.',
  },
  {
    id: 'module-5',
    title: 'Module 5: Hardware Prototyping & Vector Network Analyzer (VNA) Verification',
    topics: [
      'VNA calibration standards: SOLT (Short-Open-Load-Thru) vs. TRL (Thru-Reflect-Line)',
      'Time-domain gating, fixture de-embedding, and PCB trace dispersion compensation',
      'Practical measurement tips: preventing coaxial cable phase distortion and RF connector wear',
    ],
    handsOn: 'Bench demonstration: Calibrating a 2-port VNA and measuring S11 / S21 of a fabricated passive bandpass filter.',
  },
];

export default function SyllabusAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SectionWrapper id="sample-syllabus">
      <Container>
        <HeaderContainer>
          <OverTitle>Curriculum Breakdown</OverTitle>
          <Title>Sample Syllabus Preview</Title>
          <LeadText>
            Explore our curriculum architecture. Every module is engineered to bridge rigorous electromagnetic theory with laboratory verification.
          </LeadText>
        </HeaderContainer>

        <AccordionContainer>
          {SAMPLE_MODULES.map((module, index) => {
            const isOpen = openIndex === index;
            return (
              <AccordionItemWrapper key={module.id}>
                <Accordion
                  id={`syllabus-${module.id}`}
                  title={module.title}
                  isOpen={isOpen}
                  onToggle={() => handleToggle(index)}
                >
                  <SyllabusContent>
                    <TopicsHeading>Core Technical Topics Covered:</TopicsHeading>
                    <TopicsList>
                      {module.topics.map((topic, idx) => (
                        <TopicItem key={idx}>
                          <Bullet>&bull;</Bullet>
                          <span>{topic}</span>
                        </TopicItem>
                      ))}
                    </TopicsList>

                    <HandsOnBox>
                      <HandsOnLabel>Hands-On Application:</HandsOnLabel>
                      <HandsOnText>{module.handsOn}</HandsOnText>
                    </HandsOnBox>
                  </SyllabusContent>
                </Accordion>
              </AccordionItemWrapper>
            );
          })}
        </AccordionContainer>
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

const AccordionContainer = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const AccordionItemWrapper = styled.div`
  /* Outer spacing for accordion items */
`;

const SyllabusContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TopicsHeading = styled.h4`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;

const TopicsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopicItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const Bullet = styled.span`
  color: rgb(var(--brandBlue, 0, 106, 173));
  font-weight: 800;
  line-height: 1.5;
`;

const HandsOnBox = styled.div`
  margin-top: 1rem;
  padding: 1.4rem 1.8rem;
  border-radius: 0.8rem;
  background: rgb(var(--secondBackground));
  border-left: 4px solid rgb(var(--primary, 251, 107, 49));
`;

const HandsOnLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(var(--primary, 251, 107, 49));
  display: block;
  margin-bottom: 0.4rem;
`;

const HandsOnText = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  color: rgb(var(--text));
  font-weight: 500;
`;
