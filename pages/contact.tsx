import Head from 'next/head';
import styled from 'styled-components';
import Page from 'components/Page';
import PageHero from 'components/PageHero';
import Container from 'components/Container';
import { media } from 'utils/media';
import { pageHeroes } from 'sage-data';
import FormSection from 'views/ContactPage/FormSection';
import InformationSection from 'views/ContactPage/InformationSection';

export default function ContactPage() {
  return (
    <Page title="Contact & Advisory Inquiries | SAGE — Shastry Associates Global Enterprises">
      <Head>
        <meta
          name="description"
          content="Contact SAGE for professional RF, microwave, and wireless engineering training programs, corporate consulting, and customized technical workshops."
        />
      </Head>

      {pageHeroes['/contact'] && <PageHero {...pageHeroes['/contact']} />}

      <ContactSection>
        <Container>
          <ContactGrid>
            <InformationSection />
            <FormSection />
          </ContactGrid>
        </Container>
      </ContactSection>
    </Page>
  );
}

const ContactSection = styled.section`
  padding: 6rem 0 10rem 0;
  background: rgb(var(--background));

  ${media('<=tablet')} {
    padding: 3.5rem 0 6rem 0;
  }
`;

const ContactGrid = styled.div`
  display: flex;
  align-items: flex-start;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
