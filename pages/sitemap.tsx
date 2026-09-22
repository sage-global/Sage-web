import Head from 'next/head';
import NextLink from 'next/link';
import styled from 'styled-components';
import Container from 'components/Container';
import Page from 'components/Page';
import { EnvVars } from 'env';

const sitemapTree = [
  {
    title: 'Home',
    href: '/',
    description: 'Main landing page for SAGE engineering knowledge & solutions.',
  },
  {
    title: 'About Us',
    href: '/about',
    description: 'Learn about SAGE history, mission, and associate leadership.',
    subItems: [
      { title: 'Faculty & Associates', href: '/team', description: 'Senior associates, faculty, & engineering experts.' },
      { title: 'Mission & Vision', href: '/mission', description: 'Core vision, objectives, & values.' },
    ],
  },
  {
    title: 'Courses',
    href: '/courses',
    description: 'Master the art of RF & wireless engineering with foundational and advanced courses.',
    subItems: [
      { title: 'Tutorials', href: '/tutorials', description: 'Step-by-step guided learning in RF circuit analysis and design.' },
      { title: 'Workshops', href: '/workshops', description: 'Hands-on design-and-test sessions bridging theory with prototype measurement.' },
    ],
  },
  {
    title: 'Services',
    href: '/services',
    description: 'Comprehensive engineering services tailored for academia and industry.',
    subItems: [
      { title: 'Training Programs', href: '/training', description: 'Corporate & academic programs to upskill engineering teams.' },
      { title: 'Consulting Services', href: '/consulting', description: 'Expert RF/wireless advisory to resolve critical electromagnetic challenges.' },
    ],
  },
  {
    title: 'Events',
    href: '/events',
    description: 'Hands-on hackathons, workshops, and engineering meetups.',
    subItems: [
      { title: 'Event Photo Gallery', href: '/events#gallery', description: 'Photos and memories from past SAGE engineering symposia and workshops.' },
    ],
  },
  {
    title: 'News & Articles',
    href: '/news',
    description: 'Technical articles, research developments, industry trends, and announcements from SAGE.',
  },
  {
    title: 'Contact Us',
    href: '/contact',
    description: 'Get in touch with SAGE engineering specialists.',
  },
];

export default function SitemapPage() {
  return (
    <Page title="Sitemap" description="Complete site navigation tree and sitemap for SAGE.">
      <Head>
        <title>{`Sitemap | ${EnvVars.SITE_NAME}`}</title>
      </Head>
      <SitemapWrapper>
        <Container>
          <HeaderSection>
            <Badge>Navigation Tree</Badge>
            <Title>SAGE Website Sitemap</Title>
            <Subtitle>Explore the full structure and directory of pages and specialized services across our website.</Subtitle>
          </HeaderSection>

          <Grid>
            {sitemapTree.map((section) => (
              <SectionCard key={section.href}>
                <MainLinkWrapper>
                  <NextLink href={section.href} passHref>
                    <MainLink>
                      {section.title} <span>&rarr;</span>
                    </MainLink>
                  </NextLink>
                  <SectionDesc>{section.description}</SectionDesc>
                </MainLinkWrapper>

                {section.subItems && (
                  <SubItemList>
                    {section.subItems.map((sub) => (
                      <SubItemCard key={sub.href}>
                        <NextLink href={sub.href} passHref>
                          <SubLink>
                            <Dot />
                            {sub.title}
                          </SubLink>
                        </NextLink>
                        <SubDesc>{sub.description}</SubDesc>
                      </SubItemCard>
                    ))}
                  </SubItemList>
                )}
              </SectionCard>
            ))}
          </Grid>
        </Container>
      </SitemapWrapper>
    </Page>
  );
}

const SitemapWrapper = styled.div`
  padding: 6rem 0 8rem 0;
`;

const HeaderSection = styled.div`
  text-align: center;
  max-width: 65rem;
  margin: 0 auto 5rem auto;
`;

const Badge = styled.div`
  display: inline-block;
  padding: 0.6rem 1.6rem;
  border-radius: 9999px;
  background: rgba(22, 101, 52, 0.1);
  color: #166534;
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.7rem;
  color: rgb(var(--mutedColor));
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  gap: 3rem;
`;

const SectionCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1.5px solid rgba(53, 169, 239, 0.2);
  border-radius: 1.2rem;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  }
`;

const MainLinkWrapper = styled.div`
  margin-bottom: 2rem;
`;

const MainLink = styled.a`
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 700;
  color: rgb(var(--brandBlue, 0, 106, 173));
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;

  span {
    transition: transform 0.2s ease;
  }

  &:hover {
    color: rgb(var(--primary, 251, 107, 49));
    span {
      transform: translateX(4px);
    }
  }
`;

const SectionDesc = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--mutedColor));
  line-height: 1.5;
`;

const SubItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
`;

const SubItemCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubLink = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--text));
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;

  &:hover {
    color: rgb(var(--brandBlue, 0, 106, 173));
  }
`;

const Dot = styled.span`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: rgb(var(--primary, 251, 107, 49));
  display: inline-block;
`;

const SubDesc = styled.span`
  font-size: 1.25rem;
  color: rgb(var(--mutedColor));
  margin-left: 1.5rem;
  margin-top: 0.2rem;
`;
