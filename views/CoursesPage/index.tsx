import React from 'react';
import styled from 'styled-components';
import PageHero from 'components/PageHero';
import WaveCta from 'components/WaveCta';
import FeaturedCourseSection from './FeaturedCourseSection';
import CoursesCatalogSection from './CoursesCatalogSection';
import SyllabusAccordionSection from './SyllabusAccordionSection';
import { pageHeroes } from 'sage-data';
import type { Course } from 'lib/content';

export interface CoursesPageProps {
  courses: Course[];
}

export default function CoursesPage({ courses }: CoursesPageProps) {
  const heroData = pageHeroes['/courses'] || pageHeroes['courses'];
  const featuredCourse = courses.find((c) => c.featured) || courses[0];

  return (
    <CoursesPageWrapper>
      {/* 1. PageHero: sage/pages/courses.jpg, title "Courses", subtitle "Master the art of RF & wireless engineering" */}
      {heroData && <PageHero {...heroData} />}

      {/* 3. Featured course: one large SpotlightCard for the entry flagged featured: true */}
      {featuredCourse && <FeaturedCourseSection course={featuredCourse} />}

      {/* 2 & 4. FilterPills (disciplines present) + Course grid (title, duration, level badge, DisciplineTag, two-line description) */}
      <CoursesCatalogSection courses={courses} />

      {/* 5. Accordion: sample syllabus preview */}
      <SyllabusAccordionSection />

      {/* 6. WaveCta: "Talk to an expert" -> /contact */}
      <WaveCta
        title="Talk to an expert"
        subtitle="Discuss your team's engineering background and learning objectives with our senior faculty. We'll recommend the ideal courses or design a custom corporate curriculum."
        primaryLabel="Talk to an Expert"
        primaryHref="/contact"
        secondaryLabel="What We Offer"
        secondaryHref="/services"
      />
    </CoursesPageWrapper>
  );
}

const CoursesPageWrapper = styled.div`
  min-height: 100vh;
  background: rgb(var(--background));
`;
