import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Page from 'components/Page';
import ProfileView from 'views/TeamProfilePage/ProfileView';
import {
  getAllTeamMemberSlugs,
  getTeamMemberBySlug,
  getAdjacentTeamMembers,
  TeamMember,
} from 'sage-data';
import { getAvatarUrl, imagePresets } from 'utils/cloudinary';
import { getPersonSchema, getBreadcrumbSchema } from 'utils/seo';

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

  const avatarSrc = getAvatarUrl(member.avatarPublicId, member.avatarUrl, imagePresets.avatar);
  const metaDescription = `${member.name} (${member.role}${member.affiliation ? `, ${member.affiliation}` : ''}) — ${member.bio.replace(/\r?\n/g, ' ').substring(0, 155)}...`;
  const pageTitle = `${member.name} | SAGE Team & Instructors`;
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Faculty & Associates', href: '/team' },
    { label: member.name, href: `/team/${member.slug}` },
  ];

  const personSchema = getPersonSchema(member, avatarSrc);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <Page
      title={pageTitle}
      description={metaDescription}
      canonicalPath={`/team/${member.slug}`}
      ogType="profile"
      ogImage={avatarSrc || undefined}
      jsonLd={[personSchema, breadcrumbSchema]}
    >
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
