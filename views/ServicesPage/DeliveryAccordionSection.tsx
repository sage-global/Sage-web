import React, { useState } from 'react';
import styled from 'styled-components';
import Accordion from 'components/Accordion';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';

interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

const ListWrapper = styled.ul`
  margin-top: 1.6rem;
  margin-bottom: 1rem;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  line-height: 1.6;

  li {
    font-size: 1.5rem;
    color: rgb(var(--mutedColor, 100, 116, 139));

    strong {
      color: rgb(var(--text));
    }
  }
`;

const ACCORDION_ITEMS: AccordionItemData[] = [
  {
    id: 'delivery-details',
    title: 'Delivery Details & Technical Prerequisites',
    content: (
      <div>
        <p>
          All SAGE programs are structured to bridge foundational electromagnetic theory with real-world circuit and system design reality. To ensure maximum value for your engineering team, we align on technical prerequisites prior to program launch:
        </p>
        <ListWrapper>
          <li>
            <strong>Foundational Background:</strong> A basic understanding of electrical engineering fundamentals, AC circuit theory, and vector calculus is recommended.
          </li>
          <li>
            <strong>Design & Simulation Tools:</strong> Depending on the chosen track, exercises integrate industry-standard EDA tools including Keysight ADS, Ansys HFSS, Cadence AWR Microwave Office, or open-source RF simulators.
          </li>
          <li>
            <strong>Laboratory Instrumentation:</strong> For on-site and off-site hands-on tracks, sessions utilize vector network analyzers (VNAs), spectrum analyzers, and signal generators to validate prototypes.
          </li>
          <li>
            <strong>Course Materials Provided:</strong> Comprehensive lecture slides, mathematical derivations, design calculation cheatsheets, and simulation workspace files are provided to all participants.
          </li>
        </ListWrapper>
      </div>
    ),
  },
  {
    id: 'typical-formats',
    title: 'Typical Formats & Cohort Sizes',
    content: (
      <div>
        <p>
          We offer versatile educational formats designed to suit both corporate team needs and academic institution requirements:
        </p>
        <ListWrapper>
          <li>
            <strong>Executive Briefings (1 Day):</strong> High-level strategic overviews of emerging wireless paradigms (e.g., 5G/6G architectures, satellite communication links, mmWave trends) designed for engineering managers, system architects, and technical decision-makers.
          </li>
          <li>
            <strong>Intensive Engineering Bootcamps (3 to 5 Days):</strong> Deep-dive practical courses combining morning theory sessions with afternoon design laboratories, simulation workflows, and measurement clinics.
          </li>
          <li>
            <strong>Semester-Long University Modules (12 to 14 Weeks):</strong> Fully accredited academic curricula designed for undergraduate and graduate electronics and communication engineering departments.
          </li>
          <li>
            <strong>Cohort Size Guidelines:</strong> We recommend 8 to 20 participants for hands-on laboratory sessions to ensure individual instructor attention, and up to 50+ participants for lecture-based seminars and webinars.
          </li>
        </ListWrapper>
      </div>
    ),
  },
  {
    id: 'durations-scheduling',
    title: 'Durations & Scheduling Options',
    content: (
      <div>
        <p>
          Scheduling is designed to be maximally flexible, respecting demanding corporate engineering deadlines and academic calendars:
        </p>
        <ListWrapper>
          <li>
            <strong>Modular Duration Blocks:</strong> Modules can be delivered as concentrated 8-hour daily immersions or split into convenient 2-hour or 4-hour evening and weekend sessions.
          </li>
          <li>
            <strong>Total Program Hours:</strong> Standard programs range from 16-hour short courses to comprehensive 40-hour master tracks. Extended custom training can span multiple months.
          </li>
          <li>
            <strong>Global Time-Zone Coordination:</strong> For online virtual delivery, sessions are coordinated across North American, European, and Asian time zones with live instructor availability.
          </li>
          <li>
            <strong>On-Demand Review Access:</strong> Digital sessions include recorded access for 90 days following completion, allowing engineers to review complex derivations at their own pace.
          </li>
        </ListWrapper>
      </div>
    ),
  },
  {
    id: 'customization-curriculum',
    title: 'Curriculum Tailoring & Customization Process',
    content: (
      <div>
        <p>
          Every organization faces unique electromagnetic and system challenges. Our 4-step customization process ensures that training addresses your specific technical roadmap:
        </p>
        <ListWrapper>
          <li>
            <strong>1. Needs Discovery:</strong> A confidential consultation with your technical leads to identify knowledge gaps, specific frequency bands (e.g., sub-6 GHz, Ku/Ka band, mmWave), and target applications.
          </li>
          <li>
            <strong>2. Custom Syllabus Design:</strong> SAGE faculty customize the syllabus, integrating your organization's specific circuit topologies, standards, or measurement constraints.
          </li>
          <li>
            <strong>3. Hands-On Lab Alignment:</strong> Development of tailored design problems and simulation models that replicate real engineering scenarios faced by your team.
          </li>
          <li>
            <strong>4. Post-Delivery Debrief:</strong> Comprehensive feedback, participant assessments, and advisory recommendations on follow-up design phases.
          </li>
        </ListWrapper>
      </div>
    ),
  },
];

export default function DeliveryAccordionSection() {
  // SV-2: Only one panel open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SectionWrapper id="delivery-details">
      <Container>
        <HeaderContainer>
          <OverTitle>Program Specifications</OverTitle>
          <Title>Delivery Details, Formats & Durations</Title>
          <LeadText>
            Everything you need to know about program prerequisites, typical formats, cohort sizes, and scheduling options.
          </LeadText>
        </HeaderContainer>

        <AccordionContainer>
          {ACCORDION_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <AccordionItemWrapper key={item.id}>
                <Accordion
                  id={`accordion-${item.id}`}
                  title={item.title}
                  isOpen={isOpen}
                  onToggle={() => handleToggle(index)}
                >
                  {item.content}
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
