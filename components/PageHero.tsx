import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import media from 'css-in-js-media';
import Container from './Container';
import Breadcrumbs from './Breadcrumbs';
import OverTitle from './OverTitle';
import { useScrollPosition } from 'hooks/useScrollPosition';
import type { PageHeroData } from 'sage-data';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';

export type PageHeroProps = PageHeroData;

/* -------------------------------------------------------------------------- */
/* Keyframes & Animations                                                      */
/* -------------------------------------------------------------------------- */

const kenburns = keyframes`
  0% {
    transform: scale(1.03) translate3d(0, 0, 0);
  }
  50% {
    transform: scale(1.08) translate3d(-0.8%, -0.5%, 0);
  }
  100% {
    transform: scale(1.03) translate3d(0, 0, 0);
  }
`;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

const HeroSection = styled.section<{ $src?: string }>`
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: ${(p) => (p.$src ? 'clamp(380px, 48vh, 540px)' : 'auto')};
  display: flex;
  align-items: center;
  overflow: hidden;

  border-bottom: 1px solid rgba(var(--lineColor), 0.6);

  background: rgb(var(--secondBackground));

  ${media('<=tablet')} {
    min-height: 0;
  }
`;

/* -------------------------------------------------------------------------- */
/* Background image with Parallax & Motion                                     */
/* -------------------------------------------------------------------------- */

const HeroImage = styled.div<{ $src?: string; $parallaxY: number }>`
  position: absolute;
  inset: -30px -15px;
  z-index: -5;

  background-image: ${(p) => (p.$src ? `url("${p.$src}")` : 'none')};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  filter: saturate(0.96) contrast(1.03);
  transform: translate3d(0, ${(p) => p.$parallaxY}px, 0);
  will-change: transform;
  animation: ${kenburns} 28s ease-in-out infinite alternate;

  ${media('<=tablet')} {
    background-position: center;
    inset: -15px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
  }
`;

/* -------------------------------------------------------------------------- */
/* Overall image protection                                                    */
/* -------------------------------------------------------------------------- */

const ImageShade = styled.div`
  position: absolute;
  inset: 0;
  z-index: -4;
  pointer-events: none;

  background:
    linear-gradient(
      90deg,
      rgba(var(--secondBackground), 0.42) 0%,
      rgba(var(--secondBackground), 0.18) 42%,
      rgba(var(--secondBackground), 0.02) 72%,
      rgba(var(--secondBackground), 0.08) 100%
    ),
    linear-gradient(
      180deg,
      rgba(var(--secondBackground), 0.08) 0%,
      rgba(var(--secondBackground), 0) 38%,
      rgba(var(--secondBackground), 0.12) 100%
    );

  ${media('<=tablet')} {
    background: linear-gradient(
      90deg,
      rgba(var(--secondBackground), 0.35) 0%,
      rgba(var(--secondBackground), 0.1) 60%,
      rgba(var(--secondBackground), 0) 100%
    );
  }
`;

/* -------------------------------------------------------------------------- */
/* Atmospheric blur                                                            */
/*                                                                            */
/* This is intentionally NOT a rectangular glass panel.                       */
/* Multiple blurred layers create a soft "light field" behind the copy.       */
/* -------------------------------------------------------------------------- */

const AtmosphericBlur = styled.div`
  position: absolute;
  z-index: -3;

  top: -15%;
  bottom: -15%;
  left: -8%;
  width: 72%;

  pointer-events: none;

  background:
    radial-gradient(
      ellipse 55% 70% at 30% 50%,
      rgba(var(--secondBackground), 0.96) 0%,
      rgba(var(--secondBackground), 0.88) 42%,
      rgba(var(--secondBackground), 0.54) 68%,
      rgba(var(--secondBackground), 0) 100%
    );

  backdrop-filter: blur(28px) saturate(1.12);
  -webkit-backdrop-filter: blur(28px) saturate(1.12);

  mask-image: linear-gradient(
    90deg,
    #000 0%,
    rgba(0, 0, 0, 0.98) 38%,
    rgba(0, 0, 0, 0.72) 66%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    #000 0%,
    rgba(0, 0, 0, 0.98) 38%,
    rgba(0, 0, 0, 0.72) 66%,
    transparent 100%
  );

  ${media('<=tablet')} {
    top: 0;
    bottom: 0;
    left: 0;
    width: 85%;

    background: linear-gradient(
      90deg,
      rgba(var(--secondBackground), 0.92) 0%,
      rgba(var(--secondBackground), 0.75) 50%,
      rgba(var(--secondBackground), 0.2) 80%,
      rgba(var(--secondBackground), 0) 100%
    );

    backdrop-filter: blur(14px) saturate(1.1);
    -webkit-backdrop-filter: blur(14px) saturate(1.1);

    mask-image: linear-gradient(
      90deg,
      #000 0%,
      rgba(0, 0, 0, 0.85) 50%,
      rgba(0, 0, 0, 0.3) 80%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      90deg,
      #000 0%,
      rgba(0, 0, 0, 0.85) 50%,
      rgba(0, 0, 0, 0.3) 80%,
      transparent 100%
    );
  }

  @supports not (backdrop-filter: blur(1px)) {
    background:
      linear-gradient(
        90deg,
        rgba(var(--secondBackground), 0.98) 0%,
        rgba(var(--secondBackground), 0.94) 48%,
        rgba(var(--secondBackground), 0.72) 72%,
        rgba(var(--secondBackground), 0) 100%
      );

    mask-image: none;
    -webkit-mask-image: none;

    ${media('<=tablet')} {
      background: rgba(var(--secondBackground), 0.92);
    }
  }

  @media (prefers-reduced-transparency: reduce) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;

    mask-image: none;
    -webkit-mask-image: none;

    background:
      linear-gradient(
        90deg,
        rgb(var(--secondBackground)) 0%,
        rgba(var(--secondBackground), 0.98) 58%,
        rgba(var(--secondBackground), 0) 100%
      );

    ${media('<=tablet')} {
      background: rgb(var(--secondBackground));
    }
  }
`;

/* -------------------------------------------------------------------------- */
/* Secondary soft glow                                                         */
/* -------------------------------------------------------------------------- */

const TextGlow = styled.div`
  position: absolute;
  z-index: -2;

  top: 50%;
  left: 5%;
  width: min(720px, 70vw);
  height: 440px;

  transform: translateY(-50%);

  pointer-events: none;

  background: radial-gradient(
    ellipse,
    rgba(var(--secondBackground), 0.42) 0%,
    rgba(var(--secondBackground), 0.2) 42%,
    rgba(var(--secondBackground), 0) 72%
  );

  filter: blur(22px);

  opacity: 0.9;

  ${media('<=tablet')} {
    display: none;
  }
`;

/* -------------------------------------------------------------------------- */
/* Fine foreground gradient                                                    */
/* -------------------------------------------------------------------------- */

const ForegroundGradient = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;

  pointer-events: none;

  background: linear-gradient(
    90deg,
    rgba(var(--secondBackground), 0.2) 0%,
    rgba(var(--secondBackground), 0) 60%
  );

  ${media('<=tablet')} {
    background: linear-gradient(
      180deg,
      rgba(var(--secondBackground), 0.08) 0%,
      rgba(var(--secondBackground), 0) 45%,
      rgba(var(--secondBackground), 0.16) 100%
    );
  }
`;

/* -------------------------------------------------------------------------- */
/* Content                                                                     */
/* -------------------------------------------------------------------------- */

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 2;

  width: 100%;

  padding-top: 5.25rem;
  padding-bottom: 5.25rem;

  ${media('<=tablet')} {
    padding-top: 3.75rem;
    padding-bottom: 3.75rem;
  }

  ${media('<=phone')} {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

const TextContent = styled.div`
  position: relative;

  max-width: 760px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1.35rem;

  text-wrap: pretty;
`;

/* -------------------------------------------------------------------------- */
/* Breadcrumbs                                                                 */
/* -------------------------------------------------------------------------- */

const BreadcrumbWrapper = styled.div`
  margin-bottom: 0.55rem;
  font-size: 1.25rem;
  line-height: 1.45;

  nav,
  span,
  a {
    font-size: 1.25rem;
    font-weight: 600;
  }

  ${media('<=tablet')} {
    font-size: 1.15rem;
    nav,
    span,
    a {
      font-size: 1.15rem;
    }
  }

  ${media('<=phone')} {
    font-size: 1.05rem;
    nav,
    span,
    a {
      font-size: 1.05rem;
    }
  }
`;

/* -------------------------------------------------------------------------- */
/* Eyebrow                                                                     */
/* -------------------------------------------------------------------------- */

const Eyebrow = styled(OverTitle)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;

  margin-top: 0.1rem;

  color: rgb(var(--brandBlue));

  font-size: 0.92rem;
  font-weight: 750;
  letter-spacing: 0.13em;
  line-height: 1.2;
  text-transform: uppercase;

  &::before {
    content: '';

    flex: 0 0 auto;

    width: 2.35rem;
    height: 2px;

    border-radius: 999px;

    background: rgb(var(--primary));

    box-shadow: 0 0 14px rgba(var(--primary), 0.22);
  }

  ${media('<=tablet')} {
    font-size: 0.85rem;

    &::before {
      width: 2rem;
    }
  }
`;

/* -------------------------------------------------------------------------- */
/* Title                                                                       */
/* -------------------------------------------------------------------------- */

const Title = styled.h1`
  max-width: 15ch;

  margin: 0;

  color: rgb(var(--text));

  font-size: clamp(3.4rem, 6.8vw, 5.5rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.045em;

  text-wrap: balance;

  text-shadow: 0 1px 1px rgba(var(--text), 0.04);

  ${media('<=tablet')} {
    max-width: 16ch;

    font-size: clamp(3rem, 8.5vw, 4.4rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  ${media('<=phone')} {
    max-width: 100%;

    font-size: clamp(2.7rem, 12vw, 3.6rem);
    line-height: 1.07;
  }
`;

/* -------------------------------------------------------------------------- */
/* Description                                                                 */
/* -------------------------------------------------------------------------- */

const Description = styled.p`
  max-width: 58ch;

  margin: 0;

  color: rgba(var(--text), 0.9);

  font-size: 1.85rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.008em;

  text-wrap: pretty;

  ${media('<=tablet')} {
    max-width: 62ch;

    font-size: 1.65rem;
    line-height: 1.55;
  }

  ${media('<=phone')} {
    font-size: 1.5rem;
    line-height: 1.5;
  }
`;

/* -------------------------------------------------------------------------- */
/* Extra                                                                       */
/* -------------------------------------------------------------------------- */

const ExtraWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;

  margin-top: 0.35rem;
`;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

const PageHero: React.FC<PageHeroProps> = ({
  breadcrumbs,
  eyebrow,
  title,
  description,
  extra,
  imageSrc,
  imagePublicId,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useScrollPosition(
    ({ currPos }) => {
      setScrollY(Math.abs(currPos.y));
    },
    [],
    undefined,
    true,
    15
  );

  const parallaxY = Math.min(scrollY * 0.28, 140);
  const resolvedImageSrc = imagePublicId
    ? cloudinaryUrl(imagePublicId, imagePresets.hero)
    : imageSrc;

  return (
    <HeroSection $src={resolvedImageSrc}>
      {resolvedImageSrc && (
        <>
          <HeroImage $src={resolvedImageSrc} $parallaxY={parallaxY} aria-hidden="true" />
          <ImageShade aria-hidden="true" />
          <AtmosphericBlur aria-hidden="true" />
          <TextGlow aria-hidden="true" />
          <ForegroundGradient aria-hidden="true" />
        </>
      )}

      <StyledContainer>
        <TextContent>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <BreadcrumbWrapper>
              <Breadcrumbs crumbs={breadcrumbs} />
            </BreadcrumbWrapper>
          )}

          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

          <Title>{title}</Title>

          {description && <Description>{description}</Description>}

          {extra && <ExtraWrapper>{extra}</ExtraWrapper>}
        </TextContent>
      </StyledContainer>
    </HeroSection>
  );
};

export default PageHero;