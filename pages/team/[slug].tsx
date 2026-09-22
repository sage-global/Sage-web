import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Page from 'components/Page';
import ProfileView from 'views/TeamProfilePage/ProfileView';
import {
  getAdjacentTeamMembers,
  getAllTeamMemberSlugs,
  getTeamMemberBySlug,
  TeamMember,
} from 'sage-data';

interface PageProps {
  member: TeamMember;
  prevMember?: TeamMember;
  nextMember?: TeamMember;
}

export default function SingleTeamMemberPage({
  member,
  prevMember,
  nextMember,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!member) return null;

  const pageTitle = `${member.name} | SAGE — Shastry Associates Global Enterprises`;
  const metaDescription = `${member.name} (${member.role}) — ${member.bio.substring(0, 155)}...`;
  const canonicalUrl = `https://shastryassociates.com/team/${member.slug}`;

  return (
    <Page title={pageTitle}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${member.name} — SAGE Faculty & Associates`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonicalUrl} />
        {member.avatarUrl && <meta property="og:image" content={member.avatarUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${member.name} — SAGE Faculty & Associates`} />
        <meta name="twitter:description" content={metaDescription} />
        {member.avatarUrl && <meta name="twitter:image" content={member.avatarUrl} />}
      </Head>

      <ProfileView
        member={member}
        prevMember={prevMember}
        nextMember={nextMember}
      />
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllTeamMemberSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, { slug: string }> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) {
    return { notFound: true };
  }

  const member = getTeamMemberBySlug(slug);
  if (!member) {
    return { notFound: true };
  }

  const { prev, next } = getAdjacentTeamMembers(slug);

  return {
    props: {
      member,
      prevMember: prev || undefined,
      nextMember: next || undefined,
    },
  };
};
