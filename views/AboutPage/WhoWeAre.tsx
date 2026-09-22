import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import { aboutFull } from 'sage-data';

export default function WhoWeAre() {
  // Assuming aboutFull is a single string with paragraphs separated by double newlines or just a single block of text.
  const paragraphs = aboutFull.split('\n\n').filter(p => p.trim() !== '');

  return (
    <Section>
      <Container>
        <Layout>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Label>WHO WE ARE</Label>
            <Divider />
          </motion.div>
          
          <Content>
            {paragraphs.map((text, idx) => (
              <motion.p 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
              >
                {text}
              </motion.p>
            ))}
          </Content>
        </Layout>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 10rem 0;
  background: rgb(var(--background));
`;

const Layout = styled.div`
  display: flex;
  gap: 6rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const Label = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgb(var(--primary));
  white-space: nowrap;
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: rgb(var(--primary));
  margin-top: 1.2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  p {
    font-size: 1.8rem;
    line-height: 1.8;
    color: rgb(var(--text));
    font-weight: 400;
  }
`;
