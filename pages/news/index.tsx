import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import ArticleCard from 'components/ArticleCard';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import Page from 'components/Page';
import PageHero from 'components/PageHero';
import SectionTitle from 'components/SectionTitle';
import WaveCta from 'components/WaveCta';
import { pageHeroes } from 'sage-data';
import { SingleArticle } from 'types';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import { formatDate } from 'utils/formatDate';
import { getAllPosts } from 'utils/postsFetcher';

export default function NewsIndexPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const heroData = pageHeroes['/news'] || pageHeroes['news'];
  const ogImageUrl = cloudinaryUrl('sage/pages/news.jpg', imagePresets.og);

  // Separate the featured article (topmost article with featured in slug or latest)
  const { featuredPost, posts2026, posts2025, posts2024 } = useMemo(() => {
    const featured =
      posts.find((p) => p.slug.includes('featured')) ||
      [...posts].sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())[0];

    const nonFeaturedPosts = posts.filter((p) => p.slug !== featured?.slug);

    const getYear = (dateStr: string) => {
      const year = new Date(dateStr).getFullYear();
      return isNaN(year) ? 0 : year;
    };

    const y2026 = nonFeaturedPosts
      .filter((p) => getYear(p.meta.date) === 2026)
      .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
      .slice(0, 4);

    const y2025 = nonFeaturedPosts
      .filter((p) => getYear(p.meta.date) === 2025)
      .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
      .slice(0, 4);

    const y2024 = nonFeaturedPosts
      .filter((p) => getYear(p.meta.date) === 2024)
      .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
      .slice(0, 4);

    return {
      featuredPost: featured,
      posts2026: y2026,
      posts2025: y2025,
      posts2024: y2024,
    };
  }, [posts]);

  return (
    <Page
      title="News & Articles"
      description="Latest technical publications, research breakthroughs, event milestones, and announcements in RF, microwave, and wireless engineering from SAGE."
    >
      <Head>
        <title>News & Articles | SAGE — Shastry Associates Global Enterprises</title>
        <meta
          name="description"
          content="Latest technical publications, research breakthroughs, event milestones, and announcements in RF, microwave, and wireless engineering from SAGE."
        />
        <link rel="canonical" href="https://shastryassociates.com/news" />
        <meta property="og:title" content="News & Articles | SAGE — Shastry Associates Global Enterprises" />
        <meta
          property="og:description"
          content="Latest technical publications, research breakthroughs, event milestones, and announcements in RF, microwave, and wireless engineering."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/news" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News & Articles | SAGE — Shastry Associates Global Enterprises" />
        <meta
          name="twitter:description"
          content="Latest technical publications, research breakthroughs, event milestones, and announcements in RF, microwave, and wireless engineering."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      {/* Page Hero */}
      {heroData && <PageHero {...heroData} />}

      <MainNewsSection>
        <Container>
          {/* Top Featured Article */}
          {featuredPost && (
            <FeaturedSection>
              <SectionHeader>
                <OverTitle>Spotlight Insight</OverTitle>
                <SectionTitle>Featured by SAGE</SectionTitle>
              </SectionHeader>

              <NextLink href={`/news/${featuredPost.slug}`} passHref>
                <FeaturedCardLink aria-label={`Read featured article: ${featuredPost.meta.title}`}>
                  <FeaturedImageWrapper>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <FeaturedImage src={featuredPost.meta.imageUrl} alt={featuredPost.meta.title} loading="lazy" />
                  </FeaturedImageWrapper>

                  <FeaturedContent>
                    <FeaturedMetaRow>
                      <FeaturedBadge>Featured by SAGE</FeaturedBadge>
                      {featuredPost.meta.date && (
                        <FeaturedDate>{formatDate(new Date(featuredPost.meta.date))}</FeaturedDate>
                      )}
                    </FeaturedMetaRow>

                    <FeaturedTitle>{featuredPost.meta.title}</FeaturedTitle>
                    <FeaturedDescription>{featuredPost.meta.description}</FeaturedDescription>

                    <ReadMoreRow>
                      <span>Read Full Article</span>
                      <ArrowSpan>&rarr;</ArrowSpan>
                    </ReadMoreRow>
                  </FeaturedContent>
                </FeaturedCardLink>
              </NextLink>
            </FeaturedSection>
          )}

          {/* 2026 Section */}
          {posts2026.length > 0 && (
            <YearSection>
              <YearHeader>
                <YearBadge>2026</YearBadge>
                <YearTitle>Articles & Technical Insights (2026)</YearTitle>
              </YearHeader>
              <ArticlesGrid>
                {posts2026.map((post) => (
                  <ArticleCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.meta.title}
                    description={post.meta.description}
                    imageUrl={post.meta.imageUrl}
                    date={post.meta.date}
                    tags={post.meta.tags}
                  />
                ))}
              </ArticlesGrid>
            </YearSection>
          )}

          {/* 2025 Section */}
          {posts2025.length > 0 && (
            <YearSection>
              <YearHeader>
                <YearBadge>2025</YearBadge>
                <YearTitle>Articles & Milestones (2025)</YearTitle>
              </YearHeader>
              <ArticlesGrid>
                {posts2025.map((post) => (
                  <ArticleCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.meta.title}
                    description={post.meta.description}
                    imageUrl={post.meta.imageUrl}
                    date={post.meta.date}
                    tags={post.meta.tags}
                  />
                ))}
              </ArticlesGrid>
            </YearSection>
          )}

          {/* 2024 Section */}
          {posts2024.length > 0 && (
            <YearSection>
              <YearHeader>
                <YearBadge>2024</YearBadge>
                <YearTitle>Foundational Announcements & Events (2024)</YearTitle>
              </YearHeader>
              <ArticlesGrid>
                {posts2024.map((post) => (
                  <ArticleCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.meta.title}
                    description={post.meta.description}
                    imageUrl={post.meta.imageUrl}
                    date={post.meta.date}
                    tags={post.meta.tags}
                  />
                ))}
              </ArticlesGrid>
            </YearSection>
          )}
        </Container>
      </MainNewsSection>

      <WaveCta
        title="Stay Connected with SAGE Updates"
        subtitle="Subscribe to our quarterly newsletter for technical briefings, research whitepapers, and upcoming workshop notifications."
        primaryLabel="Subscribe to Newsletter"
        primaryHref="/newsletter"
        secondaryLabel="Explore Events"
        secondaryHref="/events"
      />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<{ posts: SingleArticle[] }> = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
      hideDefaultWaveCta: true,
    },
  };
};

const MainNewsSection = styled.section`
  padding: 6rem 0 8rem 0;
  background: rgb(var(--background));
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.6rem;
`;

const FeaturedSection = styled.div`
  margin-bottom: 7rem;
`;

const FeaturedCardLink = styled.a`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3.6rem;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 2.4rem;
  overflow: hidden;
  text-decoration: none;
  color: rgb(var(--text));
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
    border-color: rgba(var(--primary), 0.4);
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const FeaturedImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 34rem;
  overflow: hidden;
  background: rgb(var(--secondary));
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  ${FeaturedCardLink}:hover & {
    transform: scale(1.05);
  }
`;

const FeaturedContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;

  @media (max-width: 640px) {
    padding: 2.8rem 2rem;
  }
`;

const FeaturedMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: 1.6rem;
  flex-wrap: wrap;
`;

const FeaturedBadge = styled.span`
  background: linear-gradient(135deg, rgb(var(--primary)), #f59e0b);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.5rem 1.4rem;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(251, 107, 49, 0.35);
`;

const FeaturedDate = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--skyBlue));
`;

const FeaturedTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.3;
  color: rgb(var(--text));
  margin-bottom: 1.6rem;

  @media (max-width: 640px) {
    font-size: 2.1rem;
  }
`;

const FeaturedDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: rgb(var(--mutedColor));
  margin-bottom: 2.4rem;
`;

const ReadMoreRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--primary));
  transition: gap 0.2s ease;

  ${FeaturedCardLink}:hover & {
    gap: 1.2rem;
  }
`;

const ArrowSpan = styled.span`
  font-size: 1.8rem;
  transition: transform 0.2s ease;

  ${FeaturedCardLink}:hover & {
    transform: translateX(4px);
  }
`;

const YearSection = styled.div`
  margin-bottom: 6.4rem;
`;

const YearHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 3.2rem;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid rgb(var(--lineColor));
`;

const YearBadge = styled.span`
  background: rgb(var(--brandBlue));
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  padding: 0.4rem 1.4rem;
  border-radius: 0.8rem;
`;

const YearTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin: 0;

  @media (max-width: 640px) {
    font-size: 1.9rem;
  }
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
