import React, { useState } from 'react';
import styled from 'styled-components';
import Page from 'components/Page';
import PageHero from 'components/PageHero';
import Container from 'components/Container';
import AutofitGrid from 'components/AutofitGrid';
import { getNewsletters, NewsletterIssue } from 'data/newsletters.data';
import { Calendar, FileText, ArrowRight, Mail, CheckCircle } from 'lucide-react';
import NextLink from 'next/link';
import { media } from 'utils/media';
import MailchimpSubscribe, { DefaultFormFields } from 'react-mailchimp-subscribe';
import { EnvVars } from 'env';

export default function NewsletterPage() {
  const newsletters = getNewsletters();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleEnrollSubmit(e: React.FormEvent, subscribe?: (props: DefaultFormFields) => void) {
    e.preventDefault();
    if (email) {
      if (subscribe) {
        subscribe({ EMAIL: email });
      }
      setIsSubmitted(true);
    }
  }

  return (
    <Page title="SAGE Newsletter & Technical Digest | Shastry Associates Global Enterprises">
      <PageHero
        title="Newsletter & Technical Digest"
        eyebrow="Stay Ahead in RF & Wireless"
        description="Explore our published editions of SAGE Technical Digest covering applied RF engineering, microwave circuit design, antennas, and wireless systems."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Newsletter', href: '/newsletter' },
        ]}
        imageSrc="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
      />

      <SectionContainer>
        {/* Inline Enrollment Card Section */}
        <EnrollmentCardContainer id="enroll">
          <MailchimpSubscribe
            url={EnvVars.MAILCHIMP_SUBSCRIBE_URL}
            render={({ subscribe, status, message }) => {
              const hasSignedUp = isSubmitted || status === 'success';
              return (
                <EnrollmentCard onSubmit={(e: React.FormEvent) => handleEnrollSubmit(e, subscribe)}>
                  <GlowBackground />
                  <CardHeader>
                    <BadgeTag>
                      <Mail size={14} /> Official SAGE Publication
                    </BadgeTag>
                    <CardTitle>Enroll to Receive our Newsletter</CardTitle>
                    <CardSubtitle>
                      Stay updated with SAGE&apos;s workshops, technical news, achievements, and upcoming events.
                    </CardSubtitle>
                  </CardHeader>

                  {hasSignedUp ? (
                    <SuccessBox>
                      <CheckCircle size={32} color="#10B981" />
                      <div>
                        <h4>Successfully Enrolled in SAGE Newsletter!</h4>
                        <p>Thank you for subscribing ({email || 'your email'}). You will receive our upcoming technical digests and event announcements directly in your inbox.</p>
                      </div>
                    </SuccessBox>
                  ) : (
                    <FormRow>
                      <InputWrapper>
                        <MailIconWrapper>
                          <Mail size={18} />
                        </MailIconWrapper>
                        <EmailInput
                          type="email"
                          value={email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          placeholder="Enter your email address..."
                          required
                        />
                      </InputWrapper>
                      <EnrollButton type="submit">
                        Enroll Now <ArrowRight size={16} />
                      </EnrollButton>
                    </FormRow>
                  )}
                  {message && status === 'error' && (
                    <ErrorMessage dangerouslySetInnerHTML={{ __html: message as string }} />
                  )}
                </EnrollmentCard>
              );
            }}
          />
        </EnrollmentCardContainer>

        <HeaderGroup>
          <SectionEyebrow>Published Archive</SectionEyebrow>
          <SectionTitle>SAGE Technical News Updates</SectionTitle>
          <SectionSubtitle>
            Read through our released editions of SAGE Technical News Updates, curated articles, and engineering research breakdowns.
          </SectionSubtitle>
        </HeaderGroup>

        <NewsletterGrid>
          {newsletters.map((issue: NewsletterIssue) => (
            <IssueCard key={issue.id}>
              <CardImageWrapper>
                <CardImage src={issue.image} alt={issue.title} loading="lazy" />
                <EditionBadge>{issue.edition}</EditionBadge>
              </CardImageWrapper>
              <CardBody>
                <TagRow>
                  {issue.tags.map((tag, idx) => (
                    <TagPill key={idx}>{tag}</TagPill>
                  ))}
                </TagRow>
                <DateBadge>
                  <Calendar size={13} />
                  <span>{issue.date}</span>
                </DateBadge>
                <IssueTitle>{issue.title}</IssueTitle>
                <IssueSummary>{issue.summary}</IssueSummary>
              </CardBody>
              <CardFooter>
                <ReadTime>
                  <FileText size={14} />
                  <span>{issue.readTime}</span>
                </ReadTime>
                {issue.pdfUrl && (
                  <NextLink href={issue.pdfUrl} passHref>
                    <ReadButton>
                      Read Issue <ArrowRight size={14} />
                    </ReadButton>
                  </NextLink>
                )}
              </CardFooter>
            </IssueCard>
          ))}
        </NewsletterGrid>
      </SectionContainer>
    </Page>
  );
}

const SectionContainer = styled(Container)`
  padding-top: 4rem;
  padding-bottom: 8rem;
`;

const EnrollmentCardContainer = styled.div`
  margin-bottom: 6rem;
`;

const EnrollmentCard = styled.form`
  position: relative;
  background: linear-gradient(135deg, rgba(235, 246, 254, 0.95) 0%, rgba(220, 240, 255, 0.98) 100%);
  border: 1.5px solid rgba(53, 169, 239, 0.35);
  border-radius: 2rem;
  padding: 5rem 4rem;
  color: rgb(var(--text));
  box-shadow: 0 16px 36px -10px rgba(53, 169, 239, 0.2);
  overflow: hidden;

  .next-dark-theme &,
  html[data-theme='dark'] &,
  body[data-theme='dark'] & {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
    border: 1.5px solid rgba(53, 169, 239, 0.45);
    color: #ffffff;
    box-shadow: 0 20px 40px -15px rgba(0, 106, 173, 0.4);
  }

  ${media('<=tablet')} {
    padding: 3.5rem 2rem;
    border-radius: 1.4rem;
  }
`;

const GlowBackground = styled.div`
  position: absolute;
  top: -30%;
  right: -10%;
  width: 40rem;
  height: 40rem;
  background: radial-gradient(circle, rgba(53, 169, 239, 0.25) 0%, rgba(251, 107, 49, 0.1) 50%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
`;

const BadgeTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(0, 106, 173, 0.1);
  border: 1.5px solid rgba(0, 106, 173, 0.25);
  color: rgb(var(--brandBlue, 0, 106, 173));
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.5rem 1.4rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;

  .next-dark-theme &,
  html[data-theme='dark'] &,
  body[data-theme='dark'] & {
    background: rgba(53, 169, 239, 0.2);
    border-color: rgba(53, 169, 239, 0.5);
    color: #35a9ef;
  }
`;

const CardTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 3.6rem;
  font-weight: 800;
  color: rgb(var(--brandBlue, 0, 106, 173));
  margin-bottom: 1.2rem;

  .next-dark-theme &,
  html[data-theme='dark'] &,
  body[data-theme='dark'] & {
    color: #ffffff;
  }

  ${media('<=tablet')} {
    font-size: 2.6rem;
  }
`;

const CardSubtitle = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor, 100, 116, 139));
  max-width: 58rem;
  margin: 0 auto;

  .next-dark-theme &,
  html[data-theme='dark'] &,
  body[data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  max-width: 58rem;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  ${media('<=tablet')} {
    flex-direction: column;
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
`;

const MailIconWrapper = styled.div`
  position: absolute;
  left: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(var(--mutedColor, 100, 116, 139));
  display: flex;
  align-items: center;

  .next-dark-theme &,
  html[data-theme='dark'] &,
  body[data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 1.4rem 1.6rem 1.4rem 4.5rem;
  background: #ffffff;
  border: 1.5px solid rgb(var(--lineColor, 226, 232, 240));
  border-radius: 1rem;
  color: rgb(var(--text));
  font-size: 1.5rem;
  font-family: inherit;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &::placeholder {
    color: rgb(var(--mutedColor, 100, 116, 139));
  }

  &:focus {
    outline: none;
    border-color: rgb(var(--skyBlue, 53, 169, 239));
    box-shadow: 0 0 0 4px rgba(53, 169, 239, 0.2);
  }

  .next-dark-theme &,
  html[data-theme='dark'] &,
  body[data-theme='dark'] & {
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    color: #ffffff;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const EnrollButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.4rem 2.8rem;
  background: rgb(var(--primary, 251, 107, 49));
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 8px 20px rgba(251, 107, 49, 0.35);
  transition: all 0.2s ease;

  &:hover {
    background: #e0551b;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(251, 107, 49, 0.45);
  }

  ${media('<=tablet')} {
    width: 100%;
  }
`;

const SuccessBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  background: rgba(16, 185, 129, 0.12);
  border: 1.5px solid rgba(16, 185, 129, 0.4);
  border-radius: 1.2rem;
  padding: 2rem 2.5rem;
  max-width: 60rem;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  h4 {
    font-size: 1.7rem;
    font-weight: 700;
    color: rgb(var(--text));
    margin-bottom: 0.4rem;

    html[data-theme='dark'] & {
      color: #ffffff;
    }
  }

  p {
    font-size: 1.4rem;
    color: rgb(var(--mutedColor));
    line-height: 1.5;

    html[data-theme='dark'] & {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  ${media('<=tablet')} {
    flex-direction: column;
    text-align: center;
  }
`;

const ErrorMessage = styled.p`
  color: #f87171;
  font-size: 1.4rem;
  margin-top: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const HeaderGroup = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionEyebrow = styled.span`
  color: rgb(var(--brandBlue));
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: 3.4rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-top: 0.6rem;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--mutedColor));
  max-width: 60rem;
  margin: 0 auto;
`;

const NewsletterGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 34rem;
  gap: 3rem;
`;

const IssueCard = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 1.6rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.1);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 18rem;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${IssueCard}:hover & {
    transform: scale(1.04);
  }
`;

const EditionBadge = styled.span`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: rgb(var(--primary));
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 0.6rem;
  text-transform: uppercase;
`;

const CardBody = styled.div`
  padding: 2.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
`;

const TagPill = styled.span`
  background: rgb(var(--tertiary));
  color: rgb(var(--brandBlue));
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 0.4rem;
  text-transform: uppercase;
`;

const DateBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  color: rgb(var(--mutedColor));
  margin-bottom: 0.8rem;
`;

const IssueTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.3;
  margin-bottom: 1rem;
`;

const IssueSummary = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: rgb(var(--textSecondary));
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 2.2rem;
  border-top: 1px solid rgb(var(--lineColor));
  background: rgba(var(--tertiary), 0.3);
`;

const ReadTime = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  color: rgb(var(--mutedColor));
`;

const ReadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: rgb(var(--brandBlue));
  font-weight: 700;
  font-size: 1.4rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: rgb(var(--primary));
  }
`;
