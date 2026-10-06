import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import DisciplineTag from 'components/DisciplineTag';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';
import SpotlightCard from 'components/SpotlightCard';
import type { Course } from 'lib/content';
import { media } from 'utils/media';

interface FeaturedCourseSectionProps {
  course?: Course;
}

export default function FeaturedCourseSection({ course }: FeaturedCourseSectionProps) {
  if (!course) return null;

  return (
    <SectionWrapper id="featured-course">
      <Container>
        <HeaderContainer>
          <OverTitle>Curriculum Spotlight</OverTitle>
          <Title>Featured Course</Title>
          <LeadText>
            Our flagship curriculum designed to accelerate industry engineering mastery.
          </LeadText>
        </HeaderContainer>

        <SpotlightCardWrapper>
          <SpotlightCard spotlightColor="rgba(251, 107, 49, 0.18)">
            <CardLayout>
              <ContentColumn>
                <BadgeRow>
                  <FeaturedBadge>Flagship Course</FeaturedBadge>
                  <DisciplineTag variant="solid" colorScheme="orange">
                    {course.category}
                  </DisciplineTag>
                  {course.level && <LevelBadge>{course.level}</LevelBadge>}
                </BadgeRow>

                <CourseHeading>{course.title}</CourseHeading>
                <CourseDescription>{course.description}</CourseDescription>

                <MetadataRow>
                  {course.duration && (
                    <MetaItem>
                      <MetaIcon>⏱</MetaIcon>
                      <MetaText>{course.duration}</MetaText>
                    </MetaItem>
                  )}
                  {course.instructor && (
                    <MetaItem>
                      <MetaIcon>👤</MetaIcon>
                      <MetaText>Lead: {course.instructor}</MetaText>
                    </MetaItem>
                  )}
                  <MetaItem>
                    <MetaIcon>📋</MetaIcon>
                    <MetaText>Comprehensive Syllabus Included</MetaText>
                  </MetaItem>
                </MetadataRow>

                <CtaRow>
                  <NextLink href="/contact" passHref>
                    <Button>
                      Enroll in Course <span>&rarr;</span>
                    </Button>
                  </NextLink>
                  <SyllabusAnchor href="#sample-syllabus">
                    View Syllabus Preview &darr;
                  </SyllabusAnchor>
                </CtaRow>
              </ContentColumn>

              <VisualColumn>
                <VisualBox>
                  <VisualPattern />
                  <VisualCardContent>
                    <BrandWatermark>SAGE.</BrandWatermark>
                    <VisualCode>FLAGSHIP // {course.categoryId?.toUpperCase() || 'RF'}</VisualCode>
                    <VisualTitle>{course.title}</VisualTitle>
                    <VisualTags>
                      <VisualChip>{course.category}</VisualChip>
                      {course.level && <VisualChip>{course.level}</VisualChip>}
                      {course.duration && <VisualChip>{course.duration}</VisualChip>}
                    </VisualTags>
                  </VisualCardContent>
                </VisualBox>
              </VisualColumn>
            </CardLayout>
          </SpotlightCard>
        </SpotlightCardWrapper>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 8rem 0 5rem 0;
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 0 auto 5rem auto;
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

const SpotlightCardWrapper = styled.div`
  max-width: 110rem;
  margin: 0 auto;
`;

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 4rem;
  align-items: center;

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const FeaturedBadge = styled.span`
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  background: rgba(251, 107, 49, 0.15);
  color: rgb(var(--primary, 251, 107, 49));
`;

const LevelBadge = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  background: rgb(var(--secondBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  color: rgb(var(--text));
`;

const CourseHeading = styled.h3`
  font-family: var(--font-heading);
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
  color: rgb(var(--text));
  margin-bottom: 1.8rem;

  ${media('<=tablet')} {
    font-size: 2.6rem;
  }
`;

const CourseDescription = styled.p`
  font-size: 1.7rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.8rem;
`;

const MetadataRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgb(var(--lineColor, 226, 232, 240));
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MetaIcon = styled.span`
  font-size: 1.6rem;
`;

const MetaText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const SyllabusAnchor = styled.a`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--brandBlue, 0, 106, 173));
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  html[data-theme='dark'] & {
    color: rgb(var(--skyBlue, 53, 169, 239));
  }

  &:hover {
    text-decoration: underline;
  }
`;

const VisualColumn = styled.div`
  display: flex;
  justify-content: center;
`;

const VisualBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 32rem;
  border-radius: 1.6rem;
  background: linear-gradient(135deg, #006aad 0%, #0f172a 100%);
  color: #ffffff;
  padding: 3.5rem;
  overflow: hidden;
  box-shadow: 0 15px 35px -10px rgba(0, 106, 173, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const VisualPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.12;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 16px 16px;
`;

const VisualCardContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const BrandWatermark = styled.div`
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.4);
`;

const VisualCode = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgb(var(--primary, 251, 107, 49));
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const VisualTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
  margin-bottom: 2rem;
`;

const VisualTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: auto;
`;

const VisualChip = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
`;
