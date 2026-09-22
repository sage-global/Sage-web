import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import FeaturedCourses from 'views/HomePage/FeaturedCourses';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import MissionVision from 'views/HomePage/MissionVision';
import ServicesPortal from 'views/HomePage/ServicesPortal';
import StatsBar from 'views/HomePage/StatsBar';
import Testimonials from 'views/HomePage/Testimonials';
import WhySage from 'views/HomePage/WhySage';

export default function Homepage({ posts, courses }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} | Professional RF & Wireless Engineering`}</title>
        <meta
          name="description"
          content="SAGE provides expert-led training, consulting, workshops, and courses in radio frequency, microwave, applied electromagnetics, antennas, and wireless communication systems."
        />
      </Head>
      <HomepageWrapper>
        <Hero />
        <StatsBar />
        <MissionVision />
        <FeaturesGallery />
        <ServicesPortal />
        <FeaturedCourses courses={courses} />
        <WhySage />
        <Testimonials />
        {/* <ScrollableBlogPosts posts={posts} /> */}
      </HomepageWrapper>
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 10rem;
  }
`;

export async function getStaticProps() {
  const { getCourses } = await import('lib/content');
  return {
    props: {
      posts: await getAllPosts(),
      courses: getCourses().slice(0, 4),
    },
  };
}
