import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import LightweightPage, { LightweightPageConfig } from 'views/LightweightPage';

const trainingConfig: LightweightPageConfig = {
  heroKey: 'training',
  title: 'Professional & Corporate Training',
  subtitle: 'Targeted upskilling programs designed for corporate R&D teams and academic institutions.',
  introParagraph:
    'SAGE delivers structured professional development programs tailored specifically for enterprise engineering groups, government defense laboratories, and university engineering departments. Our senior faculty collaborate closely with your technical leadership to design an applied curriculum that addresses your immediate project milestones and closes key capability gaps.',
  introImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80',
  highlights: [
    {
      icon: 'training',
      heading: 'Custom Enterprise Syllabi',
      description: 'Curricula mapped precisely to your organization’s product lines and design flows.',
    },
    {
      icon: 'custom-courses',
      heading: 'Flexible Delivery Schedules',
      description: 'On-site corporate bootcamps, off-site retreats, or live interactive virtual sessions.',
    },
    {
      icon: 'consulting',
      heading: 'Senior Faculty Mentorship',
      description: 'Direct instruction and design reviews led by veteran RF & microwave specialists.',
    },
    {
      icon: 'tutorials',
      heading: 'Measurable Skill Uplift',
      description: 'Practical evaluations, design project deliverables, and formal certificates of completion.',
    },
  ],
  relatedCollection: 'courses',
  ctaTitle: 'Build a customized training curriculum for your engineering team',
  ctaLabel: 'Discuss a program',
  ctaHref: '/contact',
};

export default function TrainingPage({
  relatedCourses,
  relatedServices,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const ogImageUrl = cloudinaryUrl('sage/pages/training.jpg', imagePresets.og);

  return (
    <Page
      title="Training"
      description="Tailored corporate and academic training programs in RF, microwave, and wireless systems engineering from SAGE."
    >
      <Head>
        <title>Training Programs | SAGE — Corporate & Academic RF Engineering</title>
        <meta
          name="description"
          content="Tailored corporate and academic training programs in RF, microwave, and wireless systems engineering from SAGE."
        />
        <link rel="canonical" href="https://shastryassociates.com/training" />
        <meta property="og:title" content="Training Programs | SAGE — Corporate & Academic RF Engineering" />
        <meta
          property="og:description"
          content="Tailored corporate and academic training programs in RF, microwave, and wireless systems engineering from SAGE."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/training" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Training Programs | SAGE — Corporate & Academic RF Engineering" />
        <meta
          name="twitter:description"
          content="Tailored corporate and academic training programs in RF, microwave, and wireless systems engineering."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <LightweightPage
        config={trainingConfig}
        relatedCourses={relatedCourses}
        relatedServices={relatedServices}
      />
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { getCourses, getServices } = await import('lib/content');
  return {
    props: {
      hideDefaultWaveCta: true,
      relatedCourses: getCourses().slice(0, 3),
      relatedServices: getServices().slice(0, 3),
    },
  };
};
