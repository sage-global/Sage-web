import { getServices } from 'lib/content';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import ServicesPage from 'views/ServicesPage';

export default function ServicesRoute({
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const ogImageUrl = cloudinaryUrl('sage/pages/services.jpg', imagePresets.og);

  return (
    <Page
      title="What We Offer"
      description="Expert-led RF, microwave, and wireless engineering training programs, consulting services, customized curricula, and hands-on workshops."
    >
      <Head>
        <title>What We Offer | SAGE — Shastry Associates Global Enterprises</title>
        <meta
          name="description"
          content="Expert-led RF, microwave, and wireless engineering training programs, consulting services, customized curricula, and hands-on workshops."
        />
        <link rel="canonical" href="https://shastryassociates.com/services" />
        <meta property="og:title" content="What We Offer | SAGE — Shastry Associates Global Enterprises" />
        <meta
          property="og:description"
          content="Expert-led RF, microwave, and wireless engineering training programs, consulting services, customized curricula, and hands-on workshops."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="What We Offer | SAGE — Shastry Associates Global Enterprises" />
        <meta
          name="twitter:description"
          content="Expert-led RF, microwave, and wireless engineering training programs, consulting services, customized curricula, and hands-on workshops."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <ServicesPage services={services} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Read services strictly through lib/content single access layer
  const services = getServices();

  return {
    props: {
      services,
      hideDefaultWaveCta: true,
    },
  };
};
