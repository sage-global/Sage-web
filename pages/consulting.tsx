import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';
import { CheckCircle2, AlertCircle, Loader2, Send, ChevronRight, Briefcase } from 'lucide-react';
import Container from 'components/Container';
import Page from 'components/Page';
import { media } from 'utils/media';
import { trackEvent } from 'utils/analytics';
import MailSentState from 'components/MailSentState';

interface ConsultingFormData {
  name: string;
  surname: string;
  email: string;
  phone?: string;
  country?: string;
  state?: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
}

export default function ConsultingPage() {
  const [hasSuccessfullySubmitted, setHasSuccessfullySubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formLoadedAt] = useState<number>(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ConsultingFormData>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ConsultingFormData) {
    setErrorMessage(null);

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          country: data.country,
          state: data.state,
          topic: data.subject?.trim() ? `Consulting: ${data.subject.trim()}` : 'Engineering Consulting Inquiry',
          description: data.message,
          website: data.website,
          formLoadedAt,
        }),
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.ok) {
        trackEvent({
          action: 'submit_consulting_form',
          category: 'Engagement',
          label: data.subject || 'Consulting Inquiry',
        });
        setHasSuccessfullySubmitted(true);
      } else {
        setErrorMessage(json?.error || 'Could not submit your consulting inquiry. Please try again.');
      }
    } catch {
      setErrorMessage('Network error. Please check your internet connection and try again.');
    }
  }

  function handleReset() {
    reset();
    setErrorMessage(null);
    setHasSuccessfullySubmitted(false);
  }

  return (
    <Page
      title="Consulting Services"
      description="Consulting services in RF, microwave, and wireless technologies offered by SAGE experienced team of subject matter experts."
    >
      <Head>
        <title>Consulting Services | SAGE — Shastry Associates Global Enterprises</title>
        <meta
          name="description"
          content="At SAGE, we offer various expertise of RF engineering consulting services via our experienced team of diverse RF subject matter experts."
        />
        <link rel="canonical" href="https://shastryassociates.com/consulting" />
      </Head>

      <PageWrapper>
        <Container>
          {/* Breadcrumbs */}
          <BreadcrumbNav aria-label="Breadcrumb">
            <NextLink href="/" passHref>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </NextLink>
            <BreadcrumbSeparator>
              <ChevronRight size={14} />
            </BreadcrumbSeparator>
            <NextLink href="/services" passHref>
              <BreadcrumbLink>Services</BreadcrumbLink>
            </NextLink>
            <BreadcrumbSeparator>
              <ChevronRight size={14} />
            </BreadcrumbSeparator>
            <BreadcrumbCurrent aria-current="page">Consulting</BreadcrumbCurrent>
          </BreadcrumbNav>

          <MainContentCard>
            {/* Introductory Text */}
            <IntroHeader>
              <IntroText>
                At <strong>SAGE</strong>, we offer various expertise of RF engineering consulting services via our
                experienced team of diverse RF subject matter experts.
              </IntroText>
              <IntroText>
                Please fill out the form below with any of your engineering requests or inquiries to know if we may be
                of any service or help to you or your company.
              </IntroText>
            </IntroHeader>

            {hasSuccessfullySubmitted ? (
              <SuccessWrapper>
                <MailSentState onReset={handleReset} />
              </SuccessWrapper>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                {errorMessage && (
                  <ErrorMessageBanner role="alert">
                    <AlertCircle size={20} />
                    <span>{errorMessage}</span>
                  </ErrorMessageBanner>
                )}

                {/* Honeypot field */}
                <input
                  type="text"
                  {...register('website')}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Row 1: Name* & Surname* */}
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="name">
                      Name <RequiredAsterisk>*</RequiredAsterisk>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Name*"
                      hasError={!!errors.name}
                      {...register('name', {
                        required: 'Name is required.',
                        maxLength: { value: 60, message: 'Max 60 characters.' },
                      })}
                    />
                    {errors.name && <FieldErrorMessage>{errors.name.message}</FieldErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="surname">
                      Surname <RequiredAsterisk>*</RequiredAsterisk>
                    </Label>
                    <Input
                      id="surname"
                      type="text"
                      placeholder="Surname*"
                      hasError={!!errors.surname}
                      {...register('surname', {
                        required: 'Surname is required.',
                        maxLength: { value: 60, message: 'Max 60 characters.' },
                      })}
                    />
                    {errors.surname && <FieldErrorMessage>{errors.surname.message}</FieldErrorMessage>}
                  </FormGroup>
                </FormRow>

                {/* Row 2: Email* & Phone */}
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="email">
                      Email <RequiredAsterisk>*</RequiredAsterisk>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      hasError={!!errors.email}
                      {...register('email', {
                        required: 'Email is required.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address.',
                        },
                      })}
                    />
                    {errors.email && <FieldErrorMessage>{errors.email.message}</FieldErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone"
                      {...register('phone', {
                        maxLength: { value: 30, message: 'Max 30 characters.' },
                      })}
                    />
                    {errors.phone && <FieldErrorMessage>{errors.phone.message}</FieldErrorMessage>}
                  </FormGroup>
                </FormRow>

                {/* Row 3: Country & State */}
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Country"
                      {...register('country', {
                        maxLength: { value: 80, message: 'Max 80 characters.' },
                      })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="State"
                      {...register('state', {
                        maxLength: { value: 80, message: 'Max 80 characters.' },
                      })}
                    />
                  </FormGroup>
                </FormRow>

                {/* Row 4: Subject */}
                <FormGroupFull>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    {...register('subject', {
                      maxLength: { value: 120, message: 'Max 120 characters.' },
                    })}
                  />
                </FormGroupFull>

                {/* Row 5: Message */}
                <FormGroupFull>
                  <Label htmlFor="message">
                    Message <RequiredAsterisk>*</RequiredAsterisk>
                  </Label>
                  <TextArea
                    id="message"
                    rows={6}
                    placeholder="Message"
                    hasError={!!errors.message}
                    {...register('message', {
                      required: 'Message is required.',
                      minLength: { value: 10, message: 'Please provide at least 10 characters.' },
                      maxLength: { value: 4000, message: 'Message is too long (max 4000 chars).' },
                    })}
                  />
                  {errors.message && <FieldErrorMessage>{errors.message.message}</FieldErrorMessage>}
                </FormGroupFull>

                {/* Submit Action */}
                <ActionContainer>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="spinner" size={20} />
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send
                      </>
                    )}
                  </SubmitButton>
                </ActionContainer>
              </Form>
            )}
          </MainContentCard>
        </Container>
      </PageWrapper>
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

/* -------------------------------------------------------------------------- */
/* Keyframes & Animations                                                      */
/* -------------------------------------------------------------------------- */

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* -------------------------------------------------------------------------- */
/* Styled Components                                                           */
/* -------------------------------------------------------------------------- */

const PageWrapper = styled.div`
  min-height: 80vh;
  padding: 3.5rem 0 7rem 0;
  background-color: rgb(var(--background));

  ${media('<=tablet')} {
    padding: 2.5rem 0 5rem 0;
  }
`;

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 3.2rem;
  font-size: 1.45rem;
  font-weight: 500;
`;

const BreadcrumbLink = styled.a`
  color: rgb(var(--brandBlue));
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: rgb(var(--primary));
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  color: rgb(var(--mutedColor));
  opacity: 0.6;
`;

const BreadcrumbCurrent = styled.span`
  color: rgb(var(--mutedColor));
  font-weight: 600;
`;

const MainContentCard = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 2rem;
  padding: 4.5rem 5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  animation: ${fadeIn} 0.4s ease-out;

  ${media('<=tablet')} {
    padding: 3.2rem 2.4rem;
    border-radius: 1.6rem;
  }
`;

const IntroHeader = styled.div`
  margin-bottom: 3.6rem;
`;

const IntroText = styled.p`
  font-size: 1.65rem;
  line-height: 1.75;
  color: rgb(var(--text));
  margin-bottom: 1.6rem;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: rgb(var(--brandBlue));
    font-weight: 700;
  }

  ${media('<=tablet')} {
    font-size: 1.55rem;
    line-height: 1.65;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const FormGroupFull = styled(FormGroup)`
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const RequiredAsterisk = styled.span`
  color: #ef4444;
  font-weight: 700;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  height: 4.8rem;
  padding: 0 1.6rem;
  font-size: 1.5rem;
  font-family: inherit;
  color: rgb(var(--text));
  background: rgb(var(--background));
  border: 1px solid ${(p) => (p.hasError ? '#ef4444' : 'rgb(var(--lineColor))')};
  border-radius: 0.8rem;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgb(var(--mutedColor));
    opacity: 0.65;
  }

  &:focus {
    outline: none;
    border-color: ${(p) => (p.hasError ? '#ef4444' : 'rgb(var(--brandBlue))')};
    box-shadow: 0 0 0 3px ${(p) => (p.hasError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 106, 173, 0.15)')};
    background: #ffffff;
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 14rem;
  padding: 1.4rem 1.6rem;
  font-size: 1.5rem;
  font-family: inherit;
  color: rgb(var(--text));
  background: rgb(var(--background));
  border: 1px solid ${(p) => (p.hasError ? '#ef4444' : 'rgb(var(--lineColor))')};
  border-radius: 0.8rem;
  resize: vertical;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgb(var(--mutedColor));
    opacity: 0.65;
  }

  &:focus {
    outline: none;
    border-color: ${(p) => (p.hasError ? '#ef4444' : 'rgb(var(--brandBlue))')};
    box-shadow: 0 0 0 3px ${(p) => (p.hasError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 106, 173, 0.15)')};
    background: #ffffff;
  }
`;

const FieldErrorMessage = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: #ef4444;
  margin-top: 0.2rem;
`;

const ErrorMessageBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.4rem 1.8rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 1rem;
  color: #b91c1c;
  font-size: 1.45rem;
  font-weight: 500;
`;

const ActionContainer = styled.div`
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 5.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgb(var(--brandBlue, 0, 106, 173));
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.65rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(0, 106, 173, 0.3);

  &:hover:not(:disabled) {
    background: #005a94;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 106, 173, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    animation: ${spin} 1s linear infinite;
  }
`;

const SuccessWrapper = styled.div`
  padding: 2rem 0;
`;
