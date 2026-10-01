import { useState } from 'react';
import styled from 'styled-components';
import Page from 'components/Page';
import PageHero from 'components/PageHero';
import Container from 'components/Container';
import FilterPills from 'components/FilterPills';
import FilterableTeamGrid from 'views/TeamPage/FilterableTeamGrid';
import { pageHeroes, DisciplineId } from 'sage-data';
import { getBreadcrumbSchema } from 'utils/seo';

export default function TeamPage() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineId>('all');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Faculty & Associates', href: '/team' },
  ];

  return (
    <Page
      title="Faculty & Associates Directory"
      description="Meet the international faculty, IEEE research fellows, and principal corporate advisory consultants at SAGE specializing in RF circuits, antennas, microwave devices, and 5G/6G wireless systems."
      canonicalPath="/team"
      ogType="website"
      jsonLd={getBreadcrumbSchema(breadcrumbs)}
    >
      <PageHero {...pageHeroes['/team']} />

      <FilterBarSection>
        <Container>
          <FilterPills
            activeId={activeDiscipline}
            onSelect={(id) => setActiveDiscipline(id)}
          />
        </Container>
      </FilterBarSection>

      <FilterableTeamGrid activeDiscipline={activeDiscipline} />
    </Page>
  );
}

const FilterBarSection = styled.div`
  padding-top: 3.5rem;
  padding-bottom: 1rem;
`;
