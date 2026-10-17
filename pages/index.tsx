import { InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import SEOHead from 'components/SEOHead';
import { getOrganizationSchema, getWebSiteSchema, DEFAULT_DESCRIPTION } from 'utils/seo';
import { getAllPosts } from 'utils/postsFetcher';
import FeaturedCourses from 'views/HomePage/FeaturedCourses';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import MissionVision from 'views/HomePage/MissionVision';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import ServicesPortal from 'views/HomePage/ServicesPortal';
import StatsBar from 'views/HomePage/StatsBar';
import Testimonials from 'views/HomePage/Testimonials';
import WhySage from 'views/HomePage/WhySage';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SEOHead
        title="SAGE | RF, Microwave & Wireless Engineering"
        description={DEFAULT_DESCRIPTION}
        canonicalPath="/"
        ogType="website"
        jsonLd={[getOrganizationSchema(), getWebSiteSchema()]}
      />
      <HomepageWrapper>
        <Hero />
        <StatsBar />
        <ServicesPortal />
        <Testimonials />
        {/* <ScrollableBlogPosts posts={posts} /> */}
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 7rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
