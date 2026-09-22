import NextImage from 'next/image';
import NextLink from 'next/link';
import styled, { keyframes } from 'styled-components';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import { media } from 'utils/media';

export default function Hero() {
  return (
    <HeroOuterContainer>
      <TaglineBadge>
        <BadgeDot />
        Striving for excellence in providing knowledge, skills, and solutions
      </TaglineBadge>
      <HeroWrapper>
        <Contents>
          <Heading>Master the art of RF & wireless engineering.</Heading>
          <Description>
            SAGE (Shastry Associates Global Enterprises) provides expert-led training, consulting, workshops, and courses in radio frequency, microwave, applied electromagnetics, antennas, and wireless communication systems.
          </Description>
          <CustomButtonGroup>
            <NextLink href="/courses" passHref>
              <Button>
                Explore Courses <span>&rarr;</span>
              </Button>
            </NextLink>
            <NextLink href="/contact" passHref>
              <Button transparent>
                Talk to an Expert <span>&rarr;</span>
              </Button>
            </NextLink>
          </CustomButtonGroup>
        </Contents>
        <ImageContainer>
          <GlowingGlowBackground />
          <HexagonWrapper>
            <NextImage
              src="/Shastryhexagon(Orange).png"
              alt="SAGE Hexagon Emblem"
              width={350}
              height={350}
              objectFit="contain"
              priority
            />
          </HexagonWrapper>
        </ImageContainer>
      </HeroWrapper>
    </HeroOuterContainer>
  );
}

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const HeroOuterContainer = styled(Container)`
  padding-top: 1.5rem;
  padding-bottom: 3rem;

  ${media('<=desktop')} {
    min-height: calc(100vh - 8rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const TaglineBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto 1.5rem auto;
  padding: 0.8rem 2rem;
  width: fit-content;
  background: rgb(var(--tertiary, 235, 246, 254));
  border: 1.5px solid rgba(53, 169, 239, 0.35);
  border-radius: 9999px;
  color: rgb(var(--brandBlue, 0, 106, 173));
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 4px 14px rgba(53, 169, 239, 0.12);

  html[data-theme='dark'] & {
    background: rgba(0, 106, 173, 0.45);
    border: 1.5px solid rgba(53, 169, 239, 0.65);
    color: #ffffff;
    box-shadow: 0 4px 20px rgba(53, 169, 239, 0.3);
  }

  ${media('<=tablet')} {
    font-size: 1.05rem;
    padding: 0.6rem 1.4rem;
    text-align: center;
    margin-bottom: 1.2rem;
  }

  ${media('<=phone')} {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    gap: 0.6rem;
    letter-spacing: 0.03em;
  }
`;

const BadgeDot = styled.span`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: rgb(var(--primary, 251, 107, 49));
  display: inline-block;
  flex-shrink: 0;
`;

const HeroWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  ${media('<=desktop')} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
`;

const Contents = styled.div`
  flex: 1;
  max-width: 52rem;

  ${media('<=desktop')} {
    max-width: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 2.5rem;

  ${media('<=desktop')} {
    margin-top: 2.5rem;
    justify-content: center;
  }

  ${media('<=tablet')} {
    margin-top: 2rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1.1;
  justify-content: center;
  align-items: center;

  ${media('<=desktop')} {
    margin-top: 3rem;
  }
`;

const GlowingGlowBackground = styled.div`
  position: absolute;
  width: 38rem;
  height: 38rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(53, 169, 239, 0.22) 0%,
    rgba(251, 107, 49, 0.12) 45%,
    rgba(0, 106, 173, 0) 70%
  );
  filter: blur(20px);
  animation: ${pulseGlow} 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;

  ${media('<=tablet')} {
    width: 28rem;
    height: 28rem;
  }
`;

const HexagonWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${floatAnimation} 5s ease-in-out infinite;
  filter: drop-shadow(0 15px 35px rgba(0, 106, 173, 0.25));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  ${media('<=tablet')} {
    max-width: 300px;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media('<=desktop')} {
    font-size: 1.5rem;
  }
`;

const Heading = styled.h1`
  font-size: 6.4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 3rem;
  letter-spacing: -0.03em;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    font-size: 4.2rem;
    margin-bottom: 2rem;
  }
`;
