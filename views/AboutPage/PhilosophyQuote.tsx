import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';


export default function PhilosophyQuote() {
  return (
    <Section>
      <style dangerouslySetInnerHTML={{ __html: `
        .wave-cta-svg { background-color: #FFF8F3; }
        .next-dark-theme .wave-cta-svg { background-color: rgb(var(--secondBackground)); }
      `}} />
      <Container>
        <Layout>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <QuoteMark>“</QuoteMark>
            <QuoteText>
              Excellence in engineering education and consulting requires not just technical knowledge, but the ability to communicate complex concepts clearly and effectively.
            </QuoteText>
            <QuoteAuthor>— SAGE Philosophy</QuoteAuthor>
            

          </motion.div>
        </Layout>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 12rem 0;
  background: #FFF8F3;
  
  @media (prefers-color-scheme: dark) {
    .next-dark-theme & {
      background: rgb(var(--secondBackground));
    }
  }
`;

const Layout = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuoteMark = styled.div`
  font-family: Georgia, serif;
  font-size: 12rem;
  line-height: 0;
  color: rgb(var(--primary));
  margin-bottom: 4rem;
  opacity: 0.2;
`;

const QuoteText = styled.blockquote`
  font-family: var(--font-heading);
  font-size: 3.2rem;
  line-height: 1.4;
  color: rgb(var(--text));
  font-weight: 700;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const QuoteAuthor = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--mutedColor));
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 6rem;
`;


