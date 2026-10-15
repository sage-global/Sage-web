import React from 'react';
import Head from 'next/head';
import Page from 'components/Page';
import TrainingPage from 'views/TrainingPage';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';

export default function TrainingRoute() {
  const ogImageUrl = cloudinaryUrl('sage/pages/training.jpg', imagePresets.og);

  return (
    <Page
      title="Training Programs | SAGE"
      description="Professional development entailing educational training through workshops, seminars, and webinars, in addition to courses and tutorials, for beginners and experienced professionals."
    >
      <Head>
        <title>Training Programs | SAGE — Professional RF & Wireless Engineering</title>
        <meta
          name="description"
          content="Professional development entailing educational training through workshops, seminars, and webinars, in addition to courses and tutorials, for beginners and experienced professionals."
        />
        <link rel="canonical" href="https://shastryassociates.com/training" />
        <meta property="og:title" content="Training Programs | SAGE — Professional RF & Wireless Engineering" />
        <meta
          property="og:description"
          content="Professional development entailing educational training through workshops, seminars, and webinars, in addition to courses and tutorials, for beginners and experienced professionals."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/training" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Training Programs | SAGE — Professional RF & Wireless Engineering" />
        <meta
          name="twitter:description"
          content="Professional development entailing educational training through workshops, seminars, and webinars, in addition to courses and tutorials, for beginners and experienced professionals."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <TrainingPage />
    </Page>
  );
}

export async function getStaticProps() {
  return {
    props: {
      hideDefaultWaveCta: true,
    },
  };
}
