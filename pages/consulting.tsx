import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import styled, { keyframes } from 'styled-components';
import Container from 'components/Container';
import Page from 'components/Page';

export default function ConsultingPage() {
  return (
    <Page
      title="Consulting Services"
      description="Our Consulting Services page is currently under construction. Stay connected with SAGE for expert engineering consulting and advisory engagements."
    >
      <Head>
        <title>Consulting Services | SAGE — Shastry Associates Global Enterprises</title>
        <meta
          name="description"
          content="Our Consulting Services page is currently under construction. Stay connected with SAGE for expert engineering consulting and advisory engagements."
        />
        <link rel="canonical" href="https://shastryassociates.com/consulting" />
      </Head>

      <ConstructionWrapper>
        <Container>
          <Card>
            <StatusBadge>Coming Soon</StatusBadge>
            <IconWrapper aria-hidden="true">💼</IconWrapper>
            <Title>Consulting — Coming Soon</Title>
            <Divider />
            <Description>
              Our specialized RF, microwave, and wireless engineering consulting portal is coming soon. In the meantime, you can reach out directly to our senior associates for immediate project advisory.
            </Description>
            <StayConnectedBox>
              <StayConnectedTitle>Need immediate consulting advisory?</StayConnectedTitle>
              <StayConnectedText>
                Get in touch directly with our team of senior engineers and associates to discuss your technical challenges.
              </StayConnectedText>
              <ActionGroup>
                <NextLink href="/contact" passHref>
                  <PrimaryButton>Schedule a Consultation &rarr;</PrimaryButton>
                </NextLink>
                <NextLink href="/newsletter" passHref>
                  <SecondaryButton>Subscribe to Newsletter</SecondaryButton>
                </NextLink>
              </ActionGroup>
            </StayConnectedBox>
          </Card>
        </Container>
      </ConstructionWrapper>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      hideDefaultWaveCta: true,
    },
  };
};

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.03); }
`;

const ConstructionWrapper = styled.section`
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0;
  background: radial-gradient(circle at 50% 30%, rgba(53, 169, 239, 0.08) 0%, transparent 70%),
              rgb(var(--background));
`;

const Card = styled.div`
  max-width: 68rem;
  margin: 0 auto;
  text-align: center;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 2.4rem;
  padding: 5rem 4rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    padding: 3.6rem 2rem;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, rgb(var(--primary)), #f59e0b);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.6rem 1.6rem;
  border-radius: 9999px;
  margin-bottom: 2.4rem;
  animation: ${pulse} 3s ease-in-out infinite;
  box-shadow: 0 4px 14px rgba(251, 107, 49, 0.35);
`;

const IconWrapper = styled.div`
  font-size: 5.6rem;
  margin-bottom: 1.6rem;
  animation: ${float} 3.5s ease-in-out infinite;
  line-height: 1;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 3.4rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.25;
  margin-bottom: 1.4rem;

  @media (max-width: 640px) {
    font-size: 2.6rem;
  }
`;

const Divider = styled.div`
  width: 6rem;
  height: 0.4rem;
  background: linear-gradient(90deg, rgb(var(--brandBlue)), rgb(var(--skyBlue)));
  border-radius: 9999px;
  margin: 0 auto 2.4rem auto;
`;

const Description = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgb(var(--mutedColor));
  max-width: 54rem;
  margin: 0 auto 3.6rem auto;
`;

const StayConnectedBox = styled.div`
  background: rgba(var(--brandBlue), 0.04);
  border: 1px solid rgba(var(--brandBlue), 0.12);
  border-radius: 1.8rem;
  padding: 2.8rem 2.4rem;
`;

const StayConnectedTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;
`;

const StayConnectedText = styled.p`
  font-size: 1.5rem;
  color: rgb(var(--mutedColor));
  margin-bottom: 2.4rem;
  line-height: 1.5;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--primary));
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  padding: 1.2rem 2.4rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(251, 107, 49, 0.3);

  &:hover {
    background: rgb(var(--primaryHover, 230, 90, 35));
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(251, 107, 49, 0.4);
    color: #ffffff;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: rgb(var(--text));
  border: 1px solid rgb(var(--lineColor));
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  padding: 1.2rem 2.4rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: rgb(var(--cardBackground));
    border-color: rgb(var(--brandBlue));
    color: rgb(var(--brandBlue));
    transform: translateY(-2px);
  }
`;
