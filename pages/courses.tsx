import { getCourses } from 'lib/content';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import CoursesPage from 'views/CoursesPage';

export default function CoursesRoute({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const ogImageUrl = cloudinaryUrl('sage/pages/courses.jpg', imagePresets.og);

  return (
    <Page
      title="Courses"
      description="Master the art of RF & wireless engineering. Comprehensive expert-led courses across RF system design, microwave passive circuits, 5G wireless architectures, and antenna theory."
    >
      <Head>
        <title>Courses | SAGE — Shastry Associates Global Enterprises</title>
        <meta
          name="description"
          content="Master the art of RF & wireless engineering. Comprehensive expert-led courses across RF system design, microwave passive circuits, 5G wireless architectures, and antenna theory."
        />
        <link rel="canonical" href="https://shastryassociates.com/courses" />
        <meta property="og:title" content="Courses | SAGE — Shastry Associates Global Enterprises" />
        <meta
          property="og:description"
          content="Master the art of RF & wireless engineering. Comprehensive expert-led courses across RF system design, microwave passive circuits, 5G wireless architectures, and antenna theory."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/courses" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Courses | SAGE — Shastry Associates Global Enterprises" />
        <meta
          name="twitter:description"
          content="Master the art of RF & wireless engineering. Comprehensive expert-led courses across RF system design, microwave passive circuits, 5G wireless architectures, and antenna theory."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <CoursesPage courses={courses} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Read courses strictly through lib/content single access layer (CR-2)
  const courses = getCourses();

  return {
    props: {
      courses,
      hideDefaultWaveCta: true,
    },
  };
};
