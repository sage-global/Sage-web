import Head from 'next/head'
import Page from 'components/Page'
import { pageHeroes } from 'sage-data'
import PageHero from 'components/PageHero'

import WhoWeAre from 'views/AboutPage/WhoWeAre'
import MissionVisionGoals from 'views/AboutPage/MissionVisionGoals'
import CoreCompetencies from 'views/AboutPage/CoreCompetencies'
import ServicesSnapshot from 'views/AboutPage/ServicesSnapshot'
import StatsBar from 'views/AboutPage/StatsBar'
import PhilosophyQuote from 'views/AboutPage/PhilosophyQuote'

export default function AboutPage() {
  return (
    <Page title="About Us | SAGE — Shastry Associates Global Enterprises">
      <Head>
        <meta
          name="description"
          content="Learn about SAGE (Shastry Associates Global Enterprises) — empowering RF, microwave, and wireless engineers with practical training and global corporate advisory."
        />
      </Head>

      {/* Section 1: Page Header (Unchanged as requested) */}
      <PageHero {...pageHeroes['/about']} />
      
      {/* Section 2: Who We Are */}
      <WhoWeAre />
      
      {/* Section 3: Mission, Vision & Goals */}
      <MissionVisionGoals />
      
      {/* Section 4: Core Competencies */}
      <CoreCompetencies />
      
      {/* Section 5: Services Snapshot */}
      <ServicesSnapshot />
      
      {/* Section 6: Stats Bar */}
      <StatsBar />
      
      {/* Section 7: Philosophy Quote & CTA */}
      <PhilosophyQuote />

    </Page>
  )
}
