import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { useMemo } from 'react';
import { pageHeroes } from 'sage-data';
import styled from 'styled-components';
import ArticleCard from 'components/ArticleCard';
import AutofitGrid from 'components/AutofitGrid';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import Page from 'components/Page';
import PageHero from 'components/PageHero';
import SectionTitle from 'components/SectionTitle';
import WaveCta from 'components/WaveCta';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import { formatDate } from 'utils/formatDate';
import { media } from 'utils/media';
import { getAllPosts } from 'utils/postsFetcher';

// TODO: Replace with official SAGE newsletter Google Form URL
const SAGE_NEWSLETTER_GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/TODO_SAGE_NEWSLETTER/viewform';

export default function NewsIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const heroData = pageHeroes['/news'] || pageHeroes['news'];
  const ogImageUrl = cloudinaryUrl('sage/pages/news.jpg', imagePresets.og);

  // Sort articles newest by date (NW-2)
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = a.meta.date ? new Date(a.meta.date).getTime() : 0;
      const dateB = b.meta.date ? new Date(b.meta.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [posts]);

  const featuredPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1);

  return (
    <Page
      title="News & Articles"
      description="Latest technical insights, research developments, industry trends, and institutional announcements in RF, microwave, and wireless systems engineering from SAGE."
    >
      <Head>
        <title>News & Articles | SAGE — Shastry Associates Global Enterprises</title>
        <meta
          name="description"
          content="Latest technical insights, research developments, industry trends, and institutional announcements in RF, microwave, and wireless systems engineering from SAGE."
        />
        <link rel="canonical" href="https://shastryassociates.com/news" />
        <meta property="og:title" content="News & Articles | SAGE — Shastry Associates Global Enterprises" />
        <meta
          property="og:description"
          content="Latest technical insights, research developments, industry trends, and institutional announcements in RF, microwave, and wireless systems engineering."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/news" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News & Articles | SAGE — Shastry Associates Global Enterprises" />
        <meta
          name="twitter:description"
          content="Latest technical insights, research developments, industry trends, and institutional announcements in RF, microwave, and wireless systems engineering."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      {/* 3. PageHero entry */}
      {heroData && <PageHero {...heroData} />}

      {/* 4. Featured article = newest by date (large card), rest as ArticleCard grid */}
      <ArticlesSection>
        <Container>
          {posts.length === 0 ? (
            <EmptyStateWrapper>
              <EmptyStateIcon>📰</EmptyStateIcon>
              <EmptyStateHeading>No Articles Published Yet</EmptyStateHeading>
              <EmptyStateText>
                Our technical publications and research announcements are currently being prepared. Check back soon for engineering articles, IEEE conference recaps, and industry insights.
              </EmptyStateText>
              <NextLink href="/courses" passHref>
                <BrowseCoursesLink>Explore Courses &rarr;</BrowseCoursesLink>
              </NextLink>
            </EmptyStateWrapper>
          ) : (
            <>
              {featuredPost && (
                <FeaturedSection>
                  <SectionHeader>
                    <OverTitle>Latest Insight</OverTitle>
                    <SectionTitle>Featured Article</SectionTitle>
                  </SectionHeader>

                  <NextLink href={`/news/${featuredPost.slug}`} passHref>
                    <FeaturedCardLink aria-label={`Read featured article: ${featuredPost.meta.title}`}>
                      <FeaturedImageWrapper>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={featuredPost.meta.imageUrl}
                          alt={featuredPost.meta.title}
                          loading="lazy"
                        />
                      </FeaturedImageWrapper>

                      <FeaturedContent>
                        <FeaturedMetaRow>
                          <FeaturedTag>Featured</FeaturedTag>
                          {featuredPost.meta.date && (
                            <DateText>{formatDate(new Date(featuredPost.meta.date))}</DateText>
                          )}
                        </FeaturedMetaRow>

                        <FeaturedTitle>{featuredPost.meta.title}</FeaturedTitle>
                        <FeaturedDescription>{featuredPost.meta.description}</FeaturedDescription>

                        <ReadMoreLink>
                          <span>Read Full Article</span>
                          <ArrowSpan>&rarr;</ArrowSpan>
                        </ReadMoreLink>
                      </FeaturedContent>
                    </FeaturedCardLink>
                  </NextLink>
                </FeaturedSection>
              )}

              {remainingPosts.length > 0 && (
                <MoreArticlesSection>
                  <SectionHeader>
                    <OverTitle>Archive &amp; Updates</OverTitle>
                    <SectionTitle>Recent Publications</SectionTitle>
                  </SectionHeader>

                  <CustomAutofitGrid>
                    {remainingPosts.map((post) => (
                      <ArticleCard
                        key={post.slug}
                        title={post.meta.title}
                        description={post.meta.description}
                        imageUrl={post.meta.imageUrl}
                        slug={post.slug}
                        basePath="/news"
                      />
                    ))}
                  </CustomAutofitGrid>
                </MoreArticlesSection>
              )}
            </>
          )}
        </Container>
      </ArticlesSection>

      {/* 5. Newsletter band: "Subscribe to the SAGE newsletter" -> Google Form */}
      <NewsletterBandSection id="newsletter">
        <Container>
          <NewsletterBox>
            <NewsletterInfo>
              <NewsletterOverTitle>Stay Ahead</NewsletterOverTitle>
              <NewsletterTitle>Subscribe to the SAGE newsletter</NewsletterTitle>
              <NewsletterText>
                Receive quarterly electromagnetic research digests, RF engineering tutorials, conference announcements, and faculty keynote dates directly in your inbox.
              </NewsletterText>
            </NewsletterInfo>

            <NewsletterAction>
              <SubscribeButton
                href={SAGE_NEWSLETTER_GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to the SAGE newsletter via Google Form (opens in new tab)"
              >
                <span>Subscribe via Google Form</span>
                <ExternalArrow>&nearr;</ExternalArrow>
              </SubscribeButton>
            </NewsletterAction>
          </NewsletterBox>
        </Container>
      </NewsletterBandSection>

      {/* WaveCta */}
      <WaveCta
        title="Interested in publishing or collaborating?"
        subtitle="SAGE partners with international academics and industrial researchers to advance microwave and RF engineering."
        primaryLabel="Contact Editorial Team"
        primaryHref="/contact"
        secondaryLabel="Explore Courses"
        secondaryHref="/courses"
      />
    </Page>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
      hideDefaultWaveCta: true,
    },
  };
}

const ArticlesSection = styled.section`
  padding: 8rem 0 6rem 0;
`;

const EmptyStateWrapper = styled.div`
  text-align: center;
  max-width: 65rem;
  margin: 4rem auto 8rem auto;
  padding: 6rem 3rem;
  background: rgb(var(--cardBackground));
  border: 1px dashed rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.6rem;
  box-shadow: var(--shadow-sm);
`;

const EmptyStateIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const EmptyStateHeading = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.5rem;
`;

const BrowseCoursesLink = styled.a`
  display: inline-flex;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--primary, 251, 107, 49));
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const FeaturedSection = styled.div`
  margin-bottom: 8rem;
`;

const MoreArticlesSection = styled.div`
  margin-top: 4rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 3.5rem;
`;

const FeaturedCardLink = styled.a`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: rgb(var(--brandBlue, 0, 106, 173));
  }

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const FeaturedImageWrapper = styled.div`
  position: relative;
  min-height: 34rem;
  background: rgb(var(--secondBackground));
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  ${FeaturedCardLink}:hover & img {
    transform: scale(1.03);
  }

  ${media('<=desktop')} {
    min-height: 24rem;
  }
`;

const FeaturedContent = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media('<=tablet')} {
    padding: 3rem 2.4rem;
  }
`;

const FeaturedMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.8rem;
`;

const FeaturedTag = styled.span`
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

const DateText = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const FeaturedTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.25;
  color: rgb(var(--text));
  margin-bottom: 1.6rem;

  ${media('<=tablet')} {
    font-size: 2.2rem;
  }
`;

const FeaturedDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.65;
  color: rgb(var(--mutedColor, 100, 116, 139));
  margin-bottom: 2.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMoreLink = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: rgb(var(--primary, 251, 107, 49));
  margin-top: auto;
  transition: color 0.2s;

  ${FeaturedCardLink}:hover & {
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

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 34rem;
  gap: 3rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }

  .article-card-wrapper {
    max-width: 100%;
  }
`;

/* Section 5: Newsletter Band Styles */
const NewsletterBandSection = styled.section`
  padding: 4rem 0 8rem 0;
`;

const NewsletterBox = styled.div`
  background: linear-gradient(135deg, rgba(0, 106, 173, 0.08) 0%, rgba(53, 169, 239, 0.12) 100%);
  border: 1px solid rgba(0, 106, 173, 0.2);
  border-radius: 1.6rem;
  padding: 5rem 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  html[data-theme='dark'] & {
    background: linear-gradient(135deg, rgba(0, 106, 173, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%);
    border-color: rgba(53, 169, 239, 0.3);
  }

  ${media('<=desktop')} {
    flex-direction: column;
    align-items: flex-start;
    padding: 3.5rem 3rem;
  }
`;

const NewsletterInfo = styled.div`
  max-width: 65rem;
`;

const NewsletterOverTitle = styled(OverTitle)`
  color: rgb(var(--primary, 251, 107, 49));
`;

const NewsletterTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.25;
  color: rgb(var(--text));
  margin-top: 1rem;
  margin-bottom: 1.2rem;

  ${media('<=tablet')} {
    font-size: 2.2rem;
  }
`;

const NewsletterText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
`;

const NewsletterAction = styled.div`
  flex-shrink: 0;
`;

const SubscribeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2.8rem;
  background: rgb(var(--primary, 251, 107, 49));
  color: #ffffff;
  border-radius: 0.8rem;
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(251, 107, 49, 0.3);
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgb(var(--brandBlue, 0, 106, 173));
    box-shadow: 0 6px 20px rgba(0, 106, 173, 0.3);
    transform: translateY(-2px);
  }
`;

const ExternalArrow = styled.span`
  font-size: 1.8rem;
  line-height: 1;
`;
