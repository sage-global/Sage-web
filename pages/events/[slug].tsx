import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import EventDetailPage from 'views/EventDetailPage';
import { events, SageEvent } from 'data/events.data';

export default function SingleEventRoute({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!event) return null;

  return <EventDetailPage event={event} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = events.map((event) => ({
    params: { slug: event.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ event: SageEvent }> = async ({ params }) => {
  const slug = params?.slug as string;
  const event = events.find((e) => e.id === slug);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
      hideDefaultWaveCta: true,
    },
  };
};
