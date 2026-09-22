import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import LightweightPage, { LightweightPageConfig } from 'views/LightweightPage';

const tutorialsConfig: LightweightPageConfig = {
  heroKey: 'tutorials',
  title: 'Applied Engineering Tutorials',
  subtitle: 'Step-by-step guided learning in RF circuit analysis, applied electromagnetics, and system design.',
  introParagraph:
    'SAGE technical tutorials bridge foundational electromagnetic theory with bench design practice. Each guide provides clear mathematical derivations, impedance matching rules, S-parameter interpretations, and design cheat-sheets crafted to help engineers build intuitive mastery over high-frequency behaviors.',
  introImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=900&q=80',
  highlights: [
    {
      icon: 'tutorials',
      heading: 'Mathematical Derivations',
      description: 'Step-by-step analytical equations connecting field theory to circuit reality.',
    },
    {
      icon: 'training',
      heading: 'Impedance Matching Rules',
      description: 'Practical Smith Chart navigation and discrete component broadband matching.',
    },
    {
      icon: 'consulting',
      heading: 'S-Parameter Analysis',
      description: 'Interpreting return loss, insertion loss, and isolation across frequency bands.',
    },
    {
      icon: 'custom-courses',
      heading: 'Design Cheatsheets',
      description: 'Downloadable formulas, microstrip calculators, and RF reference cards.',
    },
  ],
  relatedCollection: 'courses',
  ctaTitle: 'Ready to deepen your RF system design expertise?',
  ctaLabel: 'Browse courses',
  ctaHref: '/courses',
};

export default function TutorialsPage({
  relatedCourses,
  relatedServices,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const ogImageUrl = cloudinaryUrl('sage/pages/tutorials.jpg', imagePresets.og);

  return (
    <Page
      title="Tutorials"
      description="Step-by-step guided learning in RF circuit analysis, applied electromagnetics, and system design from SAGE senior faculty."
    >
      <Head>
        <title>Tutorials | SAGE — Applied RF & Microwave Engineering</title>
        <meta
          name="description"
          content="Step-by-step guided learning in RF circuit analysis, applied electromagnetics, and system design from SAGE senior faculty."
        />
        <link rel="canonical" href="https://shastryassociates.com/tutorials" />
        <meta property="og:title" content="Tutorials | SAGE — Applied RF & Microwave Engineering" />
        <meta
          property="og:description"
          content="Step-by-step guided learning in RF circuit analysis, applied electromagnetics, and system design from SAGE senior faculty."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/tutorials" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tutorials | SAGE — Applied RF & Microwave Engineering" />
        <meta
          name="twitter:description"
          content="Step-by-step guided learning in RF circuit analysis, applied electromagnetics, and system design."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <LightweightPage
        config={tutorialsConfig}
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
