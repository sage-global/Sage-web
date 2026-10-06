import NextLink from 'next/link';
import styled from 'styled-components';
import { formatDate } from 'utils/formatDate';

export interface ArticleCardProps {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
  date?: string;
  tags?: string;
}

export default function ArticleCard({
  title,
  slug,
  imageUrl,
  description,
  date,
  tags,
}: ArticleCardProps) {
  const firstTag = tags ? tags.split(',')[0].trim() : null;

  return (
    <NextLink href={`/news/${slug}`} passHref>
      <CardWrapper aria-label={`Read article: ${title}`}>
        <ImageWrapper>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <CardImage src={imageUrl} alt={title} loading="lazy" />
          {firstTag && <TagBadge>{firstTag}</TagBadge>}
        </ImageWrapper>
        <CardBody>
          {date && <DateText>{formatDate(new Date(date))}</DateText>}
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <ReadMoreText>Read Article &rarr;</ReadMoreText>
        </CardBody>
      </CardWrapper>
    </NextLink>
  );
}

const CardWrapper = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  overflow: hidden;
  text-decoration: none;
  color: rgb(var(--text));
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
    border-color: rgba(var(--brandBlue), 0.4);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  overflow: hidden;
  background: rgb(var(--secondary));
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const TagBadge = styled.span`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2.2rem;
`;

const DateText = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(var(--skyBlue));
  margin-bottom: 0.8rem;
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.35;
  color: rgb(var(--text));
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardDescription = styled.p`
  font-size: 1.45rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor));
  margin-bottom: 1.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const ReadMoreText = styled.span`
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(var(--primary));
  margin-top: auto;
  transition: color 0.2s ease;

  ${CardWrapper}:hover & {
    color: rgb(var(--brandBlue));
  }
`;
