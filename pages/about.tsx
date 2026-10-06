import Page from 'components/Page';
import { pageHeroes } from 'sage-data';
import PageHero from 'components/PageHero';
import { getBreadcrumbSchema } from 'utils/seo';

import WhoWeAre from 'views/AboutPage/WhoWeAre';
import MissionVisionGoals from 'views/AboutPage/MissionVisionGoals';
import StatsBar from 'views/AboutPage/StatsBar';
import PhilosophyQuote from 'views/AboutPage/PhilosophyQuote';
import WhySage from 'views/HomePage/WhySage';

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <Page
      title="About Us | SAGE — Shastry Associates Global Enterprises"
      description="Learn about SAGE (Shastry Associates Global Enterprises) — empowering RF, microwave, and wireless engineers with practical training and global corporate advisory."
      canonicalPath="/about"
      ogType="website"
      jsonLd={getBreadcrumbSchema(breadcrumbs)}
    >
      {/* Section 1: Page Header */}
      <PageHero {...pageHeroes['/about']} />
      
      {/* Section 2: Who We Are */}
      <WhoWeAre />

      {/* Section 3: The SAGE Advantage */}
      <WhySage />

      {/* Section 4: Mission, Vision & Goals */}
      <MissionVisionGoals />
      
      {/* Section 5: Stats Bar */}
      <StatsBar />
      
      {/* Section 7: Philosophy Quote & CTA */}
      <PhilosophyQuote />
    </Page>
  );
}
