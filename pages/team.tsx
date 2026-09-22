import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import Page from 'components/Page'
import PageHero from 'components/PageHero'
import Container from 'components/Container'
import FilterPills from 'components/FilterPills'
import FilterableTeamGrid from 'views/TeamPage/FilterableTeamGrid'
import { DisciplineId, DISCIPLINES, pageHeroes } from 'sage-data'

export default function TeamPage() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineId>('all')

  return (
    <Page title="Faculty & Associates | SAGE — Shastry Associates Global Enterprises">
      <Head>
        <meta
          name="description"
          content="Meet the faculty, research fellows, and principal corporate advisory consultants at SAGE specializing in RF circuits, antennas, and 5G/6G wireless systems."
        />
      </Head>

      <PageHero {...pageHeroes['/team']} />

      <FilterBarSection>
        <Container>
          <FilterPills
            options={DISCIPLINES}
            activeId={activeDiscipline}
            onSelect={(id) => setActiveDiscipline(id)}
          />
        </Container>
      </FilterBarSection>

      <FilterableTeamGrid activeDiscipline={activeDiscipline} />
    </Page>
  )
}

const FilterBarSection = styled.div`
  padding-top: 3.5rem;
  padding-bottom: 1rem;
`
