import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import GalleryPage from 'views/GalleryPage';
import { getPastEvents } from 'lib/content';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';

export default function PhotosRoute({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const ogImageUrl = cloudinaryUrl('sage/pages/events.jpg', imagePresets.og);

  return (
    <Page
      title="Photo Gallery"
      description="Photo gallery and event moments from SAGE inaugurations, university workshops, technical symposiums, and engineering conferences."
    >
      <Head>
        <title>Photo Gallery | SAGE — Moments & Event Highlights</title>
        <meta
          name="description"
          content="Photo gallery and event moments from SAGE inaugurations, university workshops, technical symposiums, and engineering conferences."
        />
        <link rel="canonical" href="https://shastryassociates.com/photos" />
        <meta property="og:title" content="Photo Gallery | SAGE — Moments & Event Highlights" />
        <meta
          property="og:description"
          content="Photo gallery and event moments from SAGE inaugurations, university workshops, technical symposiums, and engineering conferences."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/photos" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Photo Gallery | SAGE — Moments & Event Highlights" />
        <meta
          name="twitter:description"
          content="Photo gallery and event moments from SAGE inaugurations, university workshops, and symposiums."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <GalleryPage events={events} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const events = getPastEvents();

  return {
    props: {
      events,
      hideDefaultWaveCta: true,
    },
  };
};
