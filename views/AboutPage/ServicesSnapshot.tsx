import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import Link from 'next/link';

const services = [
  {
    title: "Training",
    description: "Corporate and institutional training tailored for modern engineering challenges.",
    link: "/training"
  },
  {
    title: "Consulting",
    description: "Expert engineering advisory and technical problem-solving for enterprise projects.",
    link: "/consulting"
  },
  {
    title: "Custom Courses",
    description: "Specialized, deep-dive academic and industrial course materials.",
    link: "/courses"
  },
  {
    title: "Workshops",
    description: "Hands-on, immersive learning sessions for practical skill development.",
    link: "/workshops"
  }
];

export default function ServicesSnapshot() {
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
            <Title>What We Offer</Title>
          </motion.div>
        </Header>

        <Grid>
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ServiceCol>
                <Number>0{idx + 1}</Number>
                <ServiceTitle>{svc.title}</ServiceTitle>
                <ServiceText>{svc.description}</ServiceText>
                <Link href={svc.link} passHref>
                  <ServiceLink>Learn more <span>→</span></ServiceLink>
                </Link>
              </ServiceCol>
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
  margin-bottom: 6rem;
`;

const Title = styled.h2`
  font-size: 3.6rem;
  color: rgb(var(--text));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 6rem 4rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ServiceCol = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(var(--lineColor));
  padding-top: 2.4rem;
  height: 100%;
`;

const Number = styled.span`
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 800;
  color: rgb(var(--primary));
  margin-bottom: 1.6rem;
`;

const ServiceTitle = styled.h3`
  font-size: 2.2rem;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
`;

const ServiceText = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
  color: rgb(var(--mutedColor));
  margin-bottom: 2.4rem;
  flex: 1;
`;

const ServiceLink = styled.a`
  font-size: 1.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  transition: color 0.2s ease;
  
  span {
    transition: transform 0.2s ease;
    color: rgb(var(--primary));
  }

  &:hover {
    color: rgb(var(--primary));
    span {
      transform: translateX(4px);
    }
  }
`;
