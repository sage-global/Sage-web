import React from 'react';
import Head from 'next/head';
import Page from 'components/Page';
import TrainingPage from 'views/TrainingPage';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';

export default function TrainingRoute() {
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
