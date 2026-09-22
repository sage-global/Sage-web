import NextLink from 'next/link';
import styled from 'styled-components';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

export interface WaveCtaProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function WaveCta({
  title = 'Your next system begins with deeper understanding.',
  subtitle = 'Build the practical expertise to analyse, design, and deliver modern RF and wireless systems.',
  primaryLabel = 'Explore Courses',
  primaryHref = '/courses',
  secondaryLabel = 'Talk to an Expert',
  secondaryHref = '/contact',
}: WaveCtaProps = {}) {
  return (
    <>
      <svg className="wave-cta-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block' }}>
        <path
          fill="rgb(var(--secondary))"
          fillOpacity="1"
          d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,203,960,197.3C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <CtaWrapper>
        <Container>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <CustomButtonGroup>
            <NextLink href={primaryHref} passHref>
              <Button>
                {primaryLabel} <span>&rarr;</span>
              </Button>
            </NextLink>
            <NextLink href={secondaryHref} passHref>
              <OutlinedButton transparent>
                {secondaryLabel} <span>&rarr;</span>
              </OutlinedButton>
            </NextLink>
          </CustomButtonGroup>
        </Container>
      </CtaWrapper>
    </>
  );
}

const CtaWrapper = styled.div`
  background: rgb(var(--secondary));
  margin-top: -1rem;
  padding-bottom: 6rem;

  ${media('<=tablet')} {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

const Title = styled(SectionTitle)`
  color: rgb(var(--textSecondary));
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--textSecondary), 0.85);
  margin-bottom: 4rem;
  text-align: center;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;
`;

const OutlinedButton = styled(Button)`
  border: 1.5px solid rgb(var(--skyBlue, 53, 169, 239));
  color: #FFFFFF;
  background: rgba(53, 169, 239, 0.12);

  &:hover {
    background: rgb(var(--skyBlue, 53, 169, 239));
    border-color: rgb(var(--skyBlue, 53, 169, 239));
    color: #FFFFFF;
  }
`;

const CustomButtonGroup = styled(ButtonGroup)`
  justify-content: center;
`;
