import Page from 'components/Page';
import PageHero from 'components/PageHero';
import ServicesPortal from 'views/HomePage/ServicesPortal';

export default function ServicesPage() {
  return (
    <Page title="Engineering & Educational Services | SAGE">
      <PageHero
        title="Our Engineering Services"
        eyebrow="Educational & Technical Advisory"
        description="Explore professional training, interactive workshops, corporate upskilling, self-paced courses, online tutorials, and direct RF/Microwave engineering consulting."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
        imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80"
      />
      <ServicesPortal />
    </Page>
  );
}
