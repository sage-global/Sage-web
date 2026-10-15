import Head from 'next/head';
import NextLink from 'next/link';
import styled, { keyframes } from 'styled-components';
import Container from 'components/Container';
import Page from 'components/Page';

export default function CookiesPolicyPage() {
  return (
    <Page
      title="Cookies Policy"
      description="Cookies Policy for Shastry Associates Global Enterprises (SAGE). Our official cookies and tracking preferences guidelines are currently being updated."
      canonicalPath="/cookies-policy"
      ogType="website"
    >
      <Head>
        <title>Cookies Policy | SAGE — Shastry Associates Global Enterprises</title>
        <meta
          name="description"
          content="Cookies Policy for Shastry Associates Global Enterprises (SAGE). Our official cookies and tracking preferences guidelines are currently being updated."
        />
      </Head>

      <PolicyWrapper>
        <Container>
          <PolicyCard>
            <StatusBadge>Under Construction</StatusBadge>
            <IconWrapper aria-hidden="true">🍪</IconWrapper>
            <Title>Cookies Policy — Under Construction</Title>
            <Divider />
            <Description>
              Our official Cookies Policy is currently under review and being updated for Shastry Associates Global Enterprises (SAGE). We use cookies strictly to improve your browsing experience and technical performance.
            </Description>

            <InfoNoticeBox>
              <NoticeTitle>Need more information?</NoticeTitle>
              <NoticeText>
                If you have questions about our cookie usage, tracking policies, or preferences, please feel free to reach out to us.
              </NoticeText>
              <ActionGroup>
                <NextLink href="/contact" passHref>
                  <PrimaryButton>Contact Us &rarr;</PrimaryButton>
                </NextLink>
                <NextLink href="/" passHref>
                  <SecondaryButton>Return to Home</SecondaryButton>
                </NextLink>
              </ActionGroup>
            </InfoNoticeBox>
          </PolicyCard>
        </Container>
      </PolicyWrapper>
    </Page>
  );
}

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.88; transform: scale(1.02); }
`;

const PolicyWrapper = styled.section`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0;
  background: radial-gradient(circle at 50% 30%, rgba(53, 169, 239, 0.08) 0%, transparent 70%),
              rgb(var(--background));
`;

const PolicyCard = styled.div`
  max-width: 68rem;
  margin: 0 auto;
  text-align: center;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 2.4rem;
  padding: 5rem 4rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);

  @media (max-width: 640px) {
    padding: 3.6rem 2rem;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, rgb(var(--brandBlue, 0, 106, 173)), rgb(var(--skyBlue, 53, 169, 239)));
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.6rem 1.6rem;
  border-radius: 9999px;
  margin-bottom: 2.4rem;
  animation: ${pulse} 3s ease-in-out infinite;
  box-shadow: 0 4px 14px rgba(0, 106, 173, 0.25);
`;

const IconWrapper = styled.div`
  font-size: 5rem;
  margin-bottom: 1.6rem;
  line-height: 1;
`;

const Title = styled.h1`
  font-family: var(--font-heading);
  font-size: 3.2rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.25;
  margin-bottom: 1.4rem;

  @media (max-width: 640px) {
    font-size: 2.4rem;
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
  font-size: 1.65rem;
  line-height: 1.7;
  color: rgb(var(--mutedColor));
  max-width: 56rem;
  margin: 0 auto 3.2rem auto;
`;

const InfoNoticeBox = styled.div`
  background: rgba(var(--brandBlue), 0.04);
  border: 1px solid rgba(var(--brandBlue), 0.12);
  border-radius: 1.8rem;
  padding: 2.8rem 2.4rem;
`;

const NoticeTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 1.9rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;
`;

const NoticeText = styled.p`
  font-size: 1.45rem;
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
  padding: 1.1rem 2.4rem;
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
  padding: 1.1rem 2.4rem;
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
