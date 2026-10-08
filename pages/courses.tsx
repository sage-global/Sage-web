import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import CoursesPage from 'views/CoursesPage';
import { getCourses, type Course } from 'lib/content';

export interface CoursesRouteProps {
  courses: Course[];
}

export default function CoursesRoute({ courses }: CoursesRouteProps) {
  return (
    <Page
      title="Courses & Professional RF Education | SAGE"
      description="Rigorous, self-paced and instructor-led courses covering RF & microwave circuit design, antenna theory, and wireless communication technologies."
      canonicalPath="/courses"
      ogType="website"
    >
      <Head>
        <title>Courses &amp; Educational Programs | SAGE — Professional RF Engineering</title>
        <meta
          name="description"
          content="Rigorous, self-paced and instructor-led courses covering RF & microwave circuit design, antenna theory, and wireless communication technologies."
        />
        <link rel="canonical" href="https://shastryassociates.com/courses" />
      </Head>
      <CoursesPage courses={courses} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<CoursesRouteProps> = async () => {
  const courses = getCourses();
  return {
    props: {
      courses,
      hideDefaultWaveCta: true,
    },
  };
};
