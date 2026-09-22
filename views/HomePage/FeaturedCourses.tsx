import NextLink from 'next/link';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import OverTitle from 'components/OverTitle';
import type { Course } from 'lib/content';
import { media } from 'utils/media';

export interface FeaturedCoursesProps {
  courses?: Course[];
}

export default function FeaturedCourses({ courses = [] }: FeaturedCoursesProps) {
  const featured = courses.slice(0, 4);

  return (
    <SectionWrapper>
      <Container>
        <HeaderContainer>
          <OverTitle>Educational Catalog</OverTitle>
          <Title>Featured Courses & Modules</Title>
          <LeadText>
            Build from fundamental electromagnetic theory to confident engineering practice with expert-led courses.
          </LeadText>
        </HeaderContainer>

        <Grid>
          {featured.map((course) => (
            <CourseCard key={course.id}>
              <CategoryTag>{course.category}</CategoryTag>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <FooterRow>
                <LevelTag>{course.level || 'All Levels'}</LevelTag>
                <NextLink href={`/courses#${course.categoryId}`} passHref>
                  <CourseButton>
                    View Details
                  </CourseButton>
                </NextLink>
              </FooterRow>
            </CourseCard>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 8rem 0;
  background: rgb(var(--secondBackground));
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 0 auto 6rem auto;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.2rem;
  padding: 3.5rem 3rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--skyBlue, 53, 169, 239));
    box-shadow: 0 12px 25px -5px rgba(53, 169, 239, 0.15);
  }
`;

const CategoryTag = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--primary, 251, 107, 49));
  margin-bottom: 1.2rem;
`;

const CourseTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  line-height: 1.3;
`;

const CourseDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 3rem;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgb(var(--lineColor, 226, 232, 240));
`;

const LevelTag = styled.div`
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: rgb(var(--brandBlue, 0, 106, 173));
  background: rgb(var(--tertiary, 235, 246, 254));
  padding: 0.4rem 1rem;
  border-radius: 0.6rem;

  html[data-theme='dark'] & {
    background: rgba(53, 169, 239, 0.15);
    color: rgb(var(--skyBlue, 53, 169, 239));
  }
`;

const CourseButton = styled(Button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
`;
