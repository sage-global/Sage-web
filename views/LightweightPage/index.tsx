import NextLink from 'next/link';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import Container from 'components/Container';
import DisciplineTag from 'components/DisciplineTag';
import Icon from 'components/Icon';
import OverTitle from 'components/OverTitle';
import PageHero from 'components/PageHero';
import SectionTitle from 'components/SectionTitle';
import WaveCta from 'components/WaveCta';
import type { Course, Service } from 'lib/content';
import { pageHeroes } from 'sage-data';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import { media } from 'utils/media';
import type { LightweightPageConfig, LightweightPageProps } from './types';

export * from './types';

export default function LightweightPage({
  config,
  relatedCourses = [],
  relatedServices = [],
}: LightweightPageProps) {
  // 1. PageHero from pageHeroes registry by heroKey (with graceful fallback)
  const heroData =
    pageHeroes[config.heroKey] ||
    pageHeroes[`/${config.heroKey}`] || {
      title: config.title,
      description: config.subtitle,
    };

  // Resolve intro image using Cloudinary or raw URL
  const resolvedIntroImage = useMemo(() => {
    if (!config.introImage) return '';
    return cloudinaryUrl(config.introImage, imagePresets.card);
  }, [config.introImage]);

  // 4. Related collection teaser items
  const displayCourses = useMemo(() => {
    if (config.relatedCollection === 'courses') {
      return relatedCourses.slice(0, 3);
    }
    return [];
  }, [config.relatedCollection, relatedCourses]);

  const displayServices = useMemo(() => {
    if (config.relatedCollection === 'services') {
      return relatedServices.slice(0, 3);
    }
    return [];
  }, [config.relatedCollection, relatedServices]);

  return (
    <TemplateWrapper>
      {/* Section 1: PageHero */}
      <PageHero {...heroData} />

      {/* Section 2: Intro (paragraph beside supporting image, 2-col desktop, stacked mobile) */}
      <IntroSection id="intro">
        <Container>
          <IntroGrid>
            <IntroTextColumn>
              <OverTitle>Overview</OverTitle>
              <IntroHeading>{config.title}</IntroHeading>
              <IntroParagraph>{config.introParagraph}</IntroParagraph>
            </IntroTextColumn>

            <IntroImageColumn>
              <ImageFrame>
                <img
                  src={resolvedIntroImage}
                  alt={config.title}
                  loading="lazy"
                />
              </ImageFrame>
            </IntroImageColumn>
          </IntroGrid>
        </Container>
      </IntroSection>

      {/* Section 3: Highlights (AutofitGrid of tiles: icon + heading + one line) */}
      <HighlightsSection id="highlights">
        <Container>
          <HeaderContainer>
            <OverTitle>Key Highlights</OverTitle>
            <HighlightsSectionTitle>Core Strengths &amp; Focus Areas</HighlightsSectionTitle>
          </HeaderContainer>

          <AutofitGrid minWidth="28rem">
            {config.highlights.map((highlight, index) => (
              <HighlightTile key={index}>
                <TileIconBadge>
                  <Icon id={highlight.icon} size="2.6rem" color="rgb(var(--brandBlue, 0, 106, 173))" />
                </TileIconBadge>
                <TileHeading>{highlight.heading}</TileHeading>
                <TileDescription>{highlight.description}</TileDescription>
              </HighlightTile>
            ))}
          </AutofitGrid>
        </Container>
      </HighlightsSection>

      {/* Section 4: Related teaser (cards pulled from named collection via lib/content) */}
      <TeaserSection id="related">
        <Container>
          <HeaderContainer>
            <OverTitle>Explore More</OverTitle>
            <TeaserSectionTitle>
              {config.relatedCollection === 'courses' ? 'Related Courses & Modules' : 'Related Services & Capabilities'}
            </TeaserSectionTitle>
            <TeaserLeadText>
              {config.relatedCollection === 'courses'
                ? 'Deepen your engineering foundation with our structured courses and hands-on laboratory modules.'
                : 'Discover how SAGE collaborates with industry teams and universities through flexible delivery models.'}
            </TeaserLeadText>
          </HeaderContainer>

          {config.relatedCollection === 'courses' && (
            <TeaserGrid>
              {displayCourses.map((course) => (
                <TeaserCard key={course.id}>
                  <CardHeaderRow>
                    <DisciplineTag variant="subtle" colorScheme="blue">
                      {course.category}
                    </DisciplineTag>
                    {course.level && <CardLevelTag>{course.level}</CardLevelTag>}
                  </CardHeaderRow>

                  <CardTitle title={course.title}>{course.title}</CardTitle>
                  <CardExcerpt title={course.description}>{course.description}</CardExcerpt>

                  <CardFooterRow>
                    <NextLink href={`/courses#${course.categoryId}`} passHref>
                      <CardActionLink aria-label={`Explore course ${course.title}`}>
                        <span>Explore Course</span>
                        <ArrowSpan>&rarr;</ArrowSpan>
                      </CardActionLink>
                    </NextLink>
                  </CardFooterRow>
                </TeaserCard>
              ))}
            </TeaserGrid>
          )}

          {config.relatedCollection === 'services' && (
            <TeaserGrid>
              {displayServices.map((service) => (
                <TeaserCard key={service.id}>
                  <CardHeaderRow>
                    <ServiceIconCircle>
                      <Icon id={service.icon} size="2.2rem" color="rgb(var(--brandBlue, 0, 106, 173))" />
                    </ServiceIconCircle>
                  </CardHeaderRow>

                  <CardTitle title={service.name}>{service.name}</CardTitle>
                  <CardExcerpt title={service.tagline}>{service.tagline}</CardExcerpt>

                  <CardFooterRow>
                    <NextLink href={service.href} passHref>
                      <CardActionLink aria-label={`Explore service ${service.name}`}>
                        <span>Explore Service</span>
                        <ArrowSpan>&rarr;</ArrowSpan>
                      </CardActionLink>
                    </NextLink>
                  </CardFooterRow>
                </TeaserCard>
              ))}
            </TeaserGrid>
          )}
        </Container>
      </TeaserSection>

      {/* Section 5: WaveCta with page-specific copy */}
      <WaveCta
        title={config.ctaTitle}
        primaryLabel={config.ctaLabel}
        primaryHref={config.ctaHref}
      />
    </TemplateWrapper>
  );
}

const TemplateWrapper = styled.div`
  min-height: 100vh;
  background: rgb(var(--background));
`;

/* Section 2: Intro Styles */
const IntroSection = styled.section`
  padding: 8rem 0 6rem 0;
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 5rem;
  align-items: center;

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const IntroTextColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const IntroHeading = styled.h2`
  font-family: var(--font-heading);
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.25;
  color: rgb(var(--text));
  margin-top: 1.2rem;
  margin-bottom: 2rem;

  ${media('<=tablet')} {
    font-size: 2.6rem;
  }
`;

const IntroParagraph = styled.p`
  font-size: 1.8rem;
  line-height: 1.75;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const IntroImageColumn = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageFrame = styled.div`
  width: 100%;
  max-width: 50rem;
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));

  img {
    width: 100%;
    height: 100%;
    max-height: 38rem;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

/* Section 3: Highlights Styles */
const HighlightsSection = styled.section`
  padding: 6rem 0 8rem 0;
  background: rgb(var(--secondBackground));
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 0 auto 5rem auto;
`;

const HighlightsSectionTitle = styled(SectionTitle)`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const HighlightTile = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.6rem;
  padding: 3.2rem 2.6rem;
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

const TileIconBadge = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 1.2rem;
  background: rgb(var(--tertiary, 235, 246, 254));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  html[data-theme='dark'] & {
    background: rgba(53, 169, 239, 0.15);
  }
`;

const TileHeading = styled.h4`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const TileDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin: 0;
`;

/* Section 4: Related Teaser Styles */
const TeaserSection = styled.section`
  padding: 8rem 0;
`;

const TeaserSectionTitle = styled(SectionTitle)`
  margin-top: 1.5rem;
  margin-bottom: 1.8rem;
`;

const TeaserLeadText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const TeaserGrid = styled.div`
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

const TeaserCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.6rem;
  padding: 3rem 2.6rem;
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

const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CardLevelTag = styled.span`
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

const ServiceIconCircle = styled.div`
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 1rem;
  background: rgb(var(--tertiary, 235, 246, 254));
  display: flex;
  align-items: center;
  justify-content: center;

  html[data-theme='dark'] & {
    background: rgba(53, 169, 239, 0.15);
  }
`;

const CardTitle = styled.h3`
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

const CardExcerpt = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.8rem;
  min-height: 4.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

const CardFooterRow = styled.div`
  margin-top: auto;
  padding-top: 1.8rem;
  border-top: 1px solid rgb(var(--lineColor, 226, 232, 240));
`;

const CardActionLink = styled.a`
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
