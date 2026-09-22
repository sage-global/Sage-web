import NextImage from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { A11y, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import SectionTitle from 'components/SectionTitle';
import Separator from 'components/Separator';
import { media } from 'utils/media';

const TESTIMONIALS = [
  {
    content: `The advanced RF system design principles and practical circuit guidelines provided by Dr. Prasad and SAGE are unparalleled in clarity and mathematical rigor.`,
    author: {
      name: 'Dr. Vikram Sharma',
      title: 'Senior RF Systems Architect • Wireless Communications Inc.',
      avatarUrl: '/testimonials/author-photo-1.jpeg',
    },
  },
  {
    content: `SAGE's specialized faculty training program transformed our laboratory curriculum. The bridge from theoretical electromagnetics to microwave prototyping is exceptional.`,
    author: {
      name: 'Prof. Rajesh Kumar',
      title: 'Professor of ECE • Applied Electromagnetics Lab',
      avatarUrl: '/testimonials/author-photo-2.jpeg',
    },
  },
  {
    content: `Taking SAGE's microwave passive circuits course gave me the exact design formulas and link budget insights needed for my industrial 5G antenna research.`,
    author: {
      name: 'Elena Rostova',
      title: 'Graduate Research Assistant & Microwave Engineer',
      avatarUrl: '/testimonials/author-photo-3.jpeg',
    },
  },
];

export default function Testimonials() {
  return (
    <SectionWrapper>
      <Separator />
      <HeaderContainer>
        <OverTitle>Testimonials & Feedback</OverTitle>
        <Title>What Engineers & Educators Say About SAGE</Title>
      </HeaderContainer>
      <TestimonialsWrapper>
        <Swiper
          modules={[Navigation, Autoplay, A11y]}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          centeredSlides
          navigation
          loop
        >
          {TESTIMONIALS.map((singleTestimonial, idx) => (
            <SwiperSlide key={idx}>
              <TestimonialCard>
                <Content>“{singleTestimonial.content}”</Content>
                <AuthorContainer>
                  <AuthorImageContainer>
                    <NextImage src={singleTestimonial.author.avatarUrl} alt={singleTestimonial.author.name} width={56} height={56} />
                  </AuthorImageContainer>
                  <AuthorContent>
                    <AuthorName>{singleTestimonial.author.name}</AuthorName>
                    <AuthorTitle>{singleTestimonial.author.title}</AuthorTitle>
                  </AuthorContent>
                </AuthorContainer>
              </TestimonialCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </TestimonialsWrapper>
      <Separator />
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 4rem 0;
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 4rem auto 4rem auto;
`;

const Title = styled(SectionTitle)`
  margin-top: 1.5rem;
`;

const TestimonialsWrapper = styled(Container)`
  position: relative;

  .swiper-button-prev,
  .swiper-button-next {
    color: rgb(var(--secondary));

    ${media('<=desktop')} {
      display: none;
    }
  }

  .swiper-button-prev {
    color: rgb(var(--textSecondary));
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23currentColor'%2F%3E%3C%2Fsvg%3E");
  }

  .swiper-button-next {
    color: rgb(var(--textSecondary));
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23currentColor'%2F%3E%3C%2Fsvg%3E");
  }
`;

const TestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:first-child) {
    margin-top: 5rem;
  }
`;

const Content = styled.blockquote`
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  font-style: italic;
  max-width: 60%;

  ${media('<=desktop')} {
    max-width: 100%;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.4rem;
`;

const AuthorTitle = styled.p`
  font-weight: bold;
`;

const AuthorName = styled.p`
  font-weight: normal;
`;

const AuthorImageContainer = styled.div`
  display: flex;
  border-radius: 10rem;
  margin-right: 1rem;
  overflow: hidden;
`;
