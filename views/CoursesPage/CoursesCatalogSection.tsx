import NextLink from 'next/link';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import DisciplineTag from 'components/DisciplineTag';
import FilterPills from 'components/FilterPills';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';
import type { Course } from 'lib/content';
import { media } from 'utils/media';

interface CoursesCatalogSectionProps {
  courses: Course[];
}

export default function CoursesCatalogSection({ courses }: CoursesCatalogSectionProps) {
  // Dynamically generate FilterPills strictly from disciplines present in courses
  const filterOptions = useMemo(() => {
    const presentCategoryMap = new Map<string, string>();

    courses.forEach((course) => {
      if (course.category && course.categoryId) {
        presentCategoryMap.set(course.categoryId, course.category);
      }
    });

    const categoryPills = Array.from(presentCategoryMap.entries()).map(([id, label]) => ({
      id,
      label,
    }));

    return [{ id: 'all', label: 'All Courses' }, ...categoryPills];
  }, [courses]);

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'all') {
      return courses;
    }
    return courses.filter((course) => course.categoryId === activeFilter);
  }, [courses, activeFilter]);

  return (
    <SectionWrapper id="course-catalog">
      <Container>
        <HeaderContainer>
          <OverTitle>Comprehensive Curriculum</OverTitle>
          <Title>All Courses & Modules</Title>
          <LeadText>
            Browse courses across RF engineering, microwave circuits, wireless architectures, and electromagnetic theory.
          </LeadText>
        </HeaderContainer>

        <FilterWrapper>
          <FilterPills
            options={filterOptions}
            activeId={activeFilter}
            onSelect={(id) => setActiveFilter(id)}
          />
        </FilterWrapper>

        <CoursesGrid>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} id={course.categoryId}>
              <CardTopBar>
                <DisciplineTag variant="subtle" colorScheme="blue">
                  {course.category}
                </DisciplineTag>
                {course.level && <LevelBadge>{course.level}</LevelBadge>}
              </CardTopBar>

              <CourseTitle title={course.title}>{course.title}</CourseTitle>
              <CourseDescription title={course.description}>{course.description}</CourseDescription>

              <CardBottomBar>
                {course.duration ? (
                  <DurationTag>
                    <ClockIcon>⏱</ClockIcon>
                    <span>{course.duration}</span>
                  </DurationTag>
                ) : (
                  <div />
                )}

                <NextLink href={`/contact?subject=${encodeURIComponent(course.title)}`} passHref>
                  <InquireLink aria-label={`Inquire about ${course.title}`}>
                    <span>Inquire</span>
                    <ArrowSpan>&rarr;</ArrowSpan>
                  </InquireLink>
                </NextLink>
              </CardBottomBar>
            </CourseCard>
          ))}
        </CoursesGrid>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 6rem 0 8rem 0;
  background: rgb(var(--secondBackground));
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 0 auto 4rem auto;
`;

const Title = styled(SectionTitle)`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const LeadText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4.5rem;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  ${media('<=desktop')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const CourseCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.6rem;
  padding: 3rem 2.8rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--brandBlue, 0, 106, 173));
    box-shadow: 0 12px 25px -5px rgba(0, 106, 173, 0.12);
  }
`;

const CardTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const LevelBadge = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.3rem 0.9rem;
  border-radius: 9999px;
  background: rgb(var(--secondBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const CourseTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
  min-height: 5.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CourseDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

const CardBottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.8rem;
  border-top: 1px solid rgb(var(--lineColor, 226, 232, 240));
  margin-top: auto;
`;

const DurationTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const ClockIcon = styled.span`
  font-size: 1.4rem;
`;

const InquireLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--primary, 251, 107, 49));
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: rgb(var(--brandBlue, 0, 106, 173));

    html[data-theme='dark'] & {
      color: rgb(var(--skyBlue, 53, 169, 239));
    }

    span:last-child {
      transform: translateX(4px);
    }
  }
`;

const ArrowSpan = styled.span`
  transition: transform 0.2s ease-in-out;
  display: inline-block;
`;
