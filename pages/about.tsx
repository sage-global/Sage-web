import Page from 'components/Page';
import { pageHeroes } from 'sage-data';
import PageHero from 'components/PageHero';
import { getBreadcrumbSchema } from 'utils/seo';

import WhoWeAre from 'views/AboutPage/WhoWeAre';
import MissionVisionGoals from 'views/AboutPage/MissionVisionGoals';
import CoreCompetencies from 'views/AboutPage/CoreCompetencies';
import ServicesSnapshot from 'views/AboutPage/ServicesSnapshot';
import StatsBar from 'views/AboutPage/StatsBar';
import PhilosophyQuote from 'views/AboutPage/PhilosophyQuote';

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <Page
      title="About Us"
      description="Learn about SAGE (Shastry Associates Global Enterprises) — empowering RF, microwave, and wireless engineers with practical training and global corporate advisory."
      canonicalPath="/about"
      ogType="website"
      jsonLd={getBreadcrumbSchema(breadcrumbs)}
    >
      <PageHero {...pageHeroes['/about']} />
      <WhoWeAre />
      <MissionVisionGoals />
      <CoreCompetencies />
      <ServicesSnapshot />
      <StatsBar />
      <PhilosophyQuote />
    </Page>
  );
}
