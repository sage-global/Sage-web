import fs from 'fs';
import path from 'path';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import styled from 'styled-components';
import Container from 'components/Container';
import MDXRichText from 'components/MDXRichText';
import { formatDate } from 'utils/formatDate';
import { media } from 'utils/media';
import { getReadTime } from 'utils/readTime';
import Header from 'views/SingleArticlePage/Header';
import MetadataHead from 'views/SingleArticlePage/MetadataHead';
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead';
import ShareWidget from 'views/SingleArticlePage/ShareWidget';
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead';

const postsDir = path.join(process.cwd(), 'posts');

interface PostData {
  title: string;
  description: string;
  date: string;
  tags: string;
  imageUrl: string;
  body: MDXRemoteSerializeResult;
}

export default function SingleArticlePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [readTime, setReadTime] = useState('');

  useEffect(() => {
    calculateReadTime();
    lazyLoadPrismTheme();

    function calculateReadTime() {
      const currentContent = contentRef.current;
      if (currentContent) {
        setReadTime(getReadTime(currentContent.textContent || ''));
      }
    }

    function lazyLoadPrismTheme() {
      const prismThemeLinkEl = document.querySelector('link[data-id="prism-theme"]');
      if (!prismThemeLinkEl) {
        const headEl = document.querySelector('head');
        if (headEl) {
          const newEl = document.createElement('link');
          newEl.setAttribute('data-id', 'prism-theme');
          newEl.setAttribute('rel', 'stylesheet');
          newEl.setAttribute('href', '/prism-theme.css');
          newEl.setAttribute('media', 'print');
          newEl.setAttribute('onload', "this.media='all'; this.onload=null;");
          headEl.appendChild(newEl);
        }
      }
    }
  }, []);

  const { slug, data } = props;

  if (!data) return null;

  const { title, description, date, tags, imageUrl, body } = data as PostData;
  const meta = { title, description, date, tags, imageUrl, author: '' };
  const formattedDate = formatDate(new Date(date));
  const absoluteImageUrl = imageUrl.replace(/\/+/, '/');

  return (
    <>
      <Head>
        <noscript>
          <link rel="stylesheet" href="/prism-theme.css" />
        </noscript>
      </Head>
      <OpenGraphHead slug={slug} {...meta} />
      <StructuredDataHead slug={slug} {...meta} />
      <MetadataHead {...meta} />
      <CustomContainer id="content" ref={contentRef}>
        <ShareWidget title={title} slug={slug} />
        <Header title={title} formattedDate={formattedDate} imageUrl={absoluteImageUrl} readTime={readTime} />
        <MDXRichText content={body} />
      </CustomContainer>
    </>
  );
}

export async function getStaticPaths() {
  if (!fs.existsSync(postsDir)) {
    return { paths: [], fallback: false };
  }
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
  return {
    paths: files.map((f) => ({ params: { slug: f.replace('.mdx', '') } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const { slug } = params as { slug: string };
  const filePath = path.join(postsDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);
  const body = await serialize(content, { parseFrontmatter: false });

  return {
    props: {
      slug,
      data: {
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        date: frontmatter.date ? String(frontmatter.date) : '',
        tags: frontmatter.tags || '',
        imageUrl: frontmatter.imageUrl || '',
        body,
      } as PostData,
    },
  };
}

const CustomContainer = styled(Container)`
  position: relative;
  max-width: 90rem;
  margin: 10rem auto;

  ${media('<=tablet')} {
    margin: 5rem auto;
  }
`;
