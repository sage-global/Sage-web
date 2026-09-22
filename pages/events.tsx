import { getEvents, getPastEvents, getUpcomingEvents } from 'lib/content';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';
import EventsPage from 'views/EventsPage';

export default function EventsRoute({
  allEvents,
  upcomingEvents,
  pastEvents,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const ogImageUrl = cloudinaryUrl('sage/pages/events.jpg', imagePresets.og);

  return (
    <Page title="Events" description="Hands-on hackathons, workshops & engineering meetups in RF, microwave, and wireless systems organized by SAGE globally.">
      <Head>
        <title>Events | SAGE — Shastry Associates Global Enterprises</title>
        <meta
          name="description"
          content="Hands-on hackathons, workshops & engineering meetups in RF, microwave, and wireless systems organized by SAGE globally."
        />
        <link rel="canonical" href="https://shastryassociates.com/events" />
        <meta property="og:title" content="Events | SAGE — Shastry Associates Global Enterprises" />
        <meta
          property="og:description"
          content="Hands-on hackathons, workshops & engineering meetups in RF, microwave, and wireless systems."
        />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content="https://shastryassociates.com/events" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Events | SAGE — Shastry Associates Global Enterprises" />
        <meta
          name="twitter:description"
          content="Hands-on hackathons, workshops & engineering meetups in RF, microwave, and wireless systems."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <EventsPage
        allEvents={allEvents}
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
      />
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Read data strictly through lib/content (EV-2)
  const allEvents = getEvents();
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return {
    props: {
      allEvents,
      upcomingEvents,
      pastEvents,
      hideDefaultWaveCta: true,
    },
  };
};
