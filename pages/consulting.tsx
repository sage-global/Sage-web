import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import LightweightPage, { LightweightPageConfig } from 'views/LightweightPage';

const consultingConfig: LightweightPageConfig = {
  heroKey: 'consulting',
  title: 'Specialized Engineering Consulting',
  subtitle: 'Expert RF, microwave, and wireless advisory to resolve complex electromagnetic challenges.',
  introParagraph:
    'SAGE provides strategic technical consulting led by Dr. S.N. Prasad and our global network of senior associates. We support technology companies, aerospace developers, and defense contractors with independent design reviews, antenna array synthesis, signal integrity troubleshooting, and electromagnetic compatibility (EMC) compliance optimization.',
  introImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  highlights: [
    {
      icon: 'consulting',
      heading: 'Transceiver Architecture Audits',
      description: 'Comprehensive review of dynamic range, cascaded noise figure, and linearity budgets.',
    },
    {
      icon: 'custom-courses',
      heading: 'Antenna Array Synthesis',
      description: 'Beamforming optimization, mutual coupling reduction, and wideband aperture design.',
    },
    {
      icon: 'workshops',
      heading: 'Signal Integrity & EMC',
      description: 'High-speed PCB trace analysis, crosstalk isolation, and regulatory emission fixes.',
    },
    {
      icon: 'training',
      heading: 'Flexible Engagement Models',
      description: 'Project-specific troubleshooting engagements, ongoing retainers, and executive advisory.',
    },
  ],
  relatedCollection: 'services',
  ctaTitle: 'Partner with senior RF specialists on your next mission-critical system',
  ctaLabel: 'Talk to an expert',
  ctaHref: '/contact',
};

export default function ConsultingPage({
  relatedCourses,
  relatedServices,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const ogImageUrl = cloudinaryUrl('sage/pages/consulting.jpg', imagePresets.og);

  return (
    <Page
      title="Consulting"
      description="Specialized RF, microwave, and wireless engineering consulting and technical advisory from SAGE senior associates."
    >
      <Head>
        <title>Consulting Services | SAGE — Expert RF & Microwave Advisory</title>
        <meta
          name="description"
          content="Specialized RF, microwave, and wireless engineering consulting and technical advisory from SAGE senior associates."
        />
        <link rel="canonical" href="https://shastryassociates.com/consulting" />
        <meta property="og:title" content="Consulting Services | SAGE — Expert RF & Microwave Advisory" />
        <meta
          property="og:description"
          content="Specialized RF, microwave, and wireless engineering consulting and technical advisory from SAGE senior associates."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/consulting" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Consulting Services | SAGE — Expert RF & Microwave Advisory" />
        <meta
          name="twitter:description"
          content="Specialized RF, microwave, and wireless engineering consulting and technical advisory."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <LightweightPage
        config={consultingConfig}
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
