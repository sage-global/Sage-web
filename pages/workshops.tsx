import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import LightweightPage, { LightweightPageConfig } from 'views/LightweightPage';

const workshopsConfig: LightweightPageConfig = {
  heroKey: 'workshops',
  title: 'Hands-On Technical Workshops',
  subtitle: 'Intensive design-and-test sessions bridging electromagnetic theory with physical measurement.',
  introParagraph:
    'SAGE engineering workshops provide deep, immersive technical experiences ranging from one-day seminars to intensive multi-day clinics. Participants work directly through RF circuit layout, antenna array steering, and laboratory vector network analyzer (VNA) calibration under the direct mentorship of senior industry leaders and IEEE fellows.',
  introImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
  highlights: [
    {
      icon: 'workshops',
      heading: 'Laboratory Instrumentation',
      description: 'Hands-on calibration and measurement using VNAs, spectrum analyzers, and testbenches.',
    },
    {
      icon: 'custom-courses',
      heading: 'Rapid Prototype Debugging',
      description: 'Isolating parasitics, spurious oscillations, and unexpected board resonances.',
    },
    {
      icon: 'training',
      heading: 'Interactive Design Labs',
      description: 'Live collaborative problem-solving on active RF matching and filter layouts.',
    },
    {
      icon: 'consulting',
      heading: 'Peer & Expert Networking',
      description: 'Engage directly with international faculty, IEEE chapter leads, and industry peers.',
    },
  ],
  relatedCollection: 'courses',
  ctaTitle: 'Experience hands-on RF workshops and technical symposiums',
  ctaLabel: 'See upcoming events',
  ctaHref: '/events',
};

export default function WorkshopsPage({
  relatedCourses,
  relatedServices,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const ogImageUrl = cloudinaryUrl('sage/pages/workshops.jpg', imagePresets.og);

  return (
    <Page
      title="Workshops"
      description="Hands-on design-and-test engineering workshops in RF, microwave, and wireless systems conducted by SAGE."
    >
      <Head>
        <title>Workshops | SAGE — Hands-On RF & Microwave Technical Labs</title>
        <meta
          name="description"
          content="Hands-on design-and-test engineering workshops in RF, microwave, and wireless systems conducted by SAGE."
        />
        <link rel="canonical" href="https://shastryassociates.com/workshops" />
        <meta property="og:title" content="Workshops | SAGE — Hands-On RF & Microwave Technical Labs" />
        <meta
          property="og:description"
          content="Hands-on design-and-test engineering workshops in RF, microwave, and wireless systems conducted by SAGE."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/workshops" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Workshops | SAGE — Hands-On RF & Microwave Technical Labs" />
        <meta
          name="twitter:description"
          content="Hands-on design-and-test engineering workshops in RF, microwave, and wireless systems."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <LightweightPage
        config={workshopsConfig}
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
