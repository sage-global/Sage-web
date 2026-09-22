import Head from 'next/head'
import Page from 'components/Page'
import PageHero from 'components/PageHero'
import MissionVisionSection from 'views/AboutPage/MissionVisionSection'
import ValuesGrid from 'views/AboutPage/ValuesGrid'
import { pageHeroes } from 'sage-data'

export default function MissionVisionPage() {
  return (
    <Page title="Mission & Vision | SAGE — Shastry Associates Global Enterprises">
      <Head>
        <meta
          name="description"
          content="Explore the mission, vision, and core engineering principles of SAGE (Shastry Associates Global Enterprises) in applied electromagnetics and radio frequency wireless systems."
        />
      </Head>

      <PageHero {...pageHeroes['/mission']} />
      <MissionVisionSection />
      <ValuesGrid />
    </Page>
  )
}
