import React from 'react';
import styled from 'styled-components';
import PageHero from 'components/PageHero';
import WaveCta from 'components/WaveCta';
import SpotlightServicesSection from './SpotlightServicesSection';
import HowWeEngageSection from './HowWeEngageSection';
import DeliveryAccordionSection from './DeliveryAccordionSection';
import { pageHeroes } from 'sage-data';
import type { Service } from 'lib/content';

export interface ServicesPageProps {
  services: Service[];
}

export default function ServicesPage({ services }: ServicesPageProps) {
  const heroData = pageHeroes['/services'] || pageHeroes['services'];

  return (
    <ServicesPageWrapper>
      {/* 1. PageHero */}
      {heroData && <PageHero {...heroData} />}

      {/* 2. Four SpotlightCards from getServices() */}
      <SpotlightServicesSection services={services} />

      {/* 3. "How we engage" — three columns: On-site / Off-site / Online */}
      <HowWeEngageSection />

      {/* 4. Accordion: delivery details, typical formats, durations (SV-2 keyboard operable single-open) */}
      <DeliveryAccordionSection />

      {/* 5. WaveCta: "Let's design your program" -> /contact */}
      <WaveCta
        title="Let's design your program"
        subtitle="Whether you need on-site corporate training, specialized RF advisory, or a custom university course, our veteran faculty will tailor a program to your exact technical requirements."
        primaryLabel="Talk to an Expert"
        primaryHref="/contact"
        secondaryLabel="Explore Courses"
        secondaryHref="/courses"
      />
    </ServicesPageWrapper>
  );
}

const ServicesPageWrapper = styled.div`
  min-height: 100vh;
  background: rgb(var(--background));
`;
