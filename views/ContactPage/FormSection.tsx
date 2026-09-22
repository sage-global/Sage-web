import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';
import { User, Mail, Phone, Tag, MessageSquare, Send, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import Button from 'components/Button';
import { media } from 'utils/media';
import MailSentState from '../../components/MailSentState';

interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  description: string;
  website?: string;
  formLoadedAt?: number;
}

const INQUIRY_TOPICS = [
  'General Inquiry',
  'Professional Training & Courses',
  'Engineering Consulting',
  'Custom Corporate Workshops',
  'Faculty & Research Collaboration',
  'Other',
];

export default function FormSection() {
  const [hasSuccessfullySentMail, setHasSuccessfullySentMail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formLoadedAt] = useState<number>(() => Date.now());
  const { register, handleSubmit, reset, formState } = useForm<EmailPayload>({
    defaultValues: {
      topic: 'General Inquiry',
    },
  });
  const { isSubmitting, errors } = formState;

  async function onSubmit(payload: EmailPayload) {
    setErrorMessage(null);

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload, formLoadedAt }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setHasSuccessfullySentMail(true);
      } else {
        setErrorMessage(data?.error || "Couldn't send email. Please try again.");
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  }

  function handleReset() {
    reset();
    setErrorMessage(null);
    setHasSuccessfullySentMail(false);
  }

  const isSubmitDisabled = isSubmitting || Object.keys(errors).length > 0;

  if (hasSuccessfullySentMail) {
    return (
      <FormCard>
        <MailSentState onReset={handleReset} />
      </FormCard>
    );
  }

  return (
    <FormCard>
      <CardHeader>
        <CardTitle>Send Us a Message</CardTitle>
        <CardDescription>
          Complete the form below and your inquiry will be routed directly to the appropriate technical lead.
        </CardDescription>
      </CardHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && (
          <AlertBanner>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </AlertBanner>
        )}

        {/* Hidden Honeypot field for bot protection */}
        <HoneypotContainer aria-hidden="true">
          <input
            type="text"
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
          />
        </HoneypotContainer>

        {/* Row 1: Name and Email */}
        <Row>
          <FieldGroup>
            <Label htmlFor="name">
              <User size={14} />
              <span>Full Name <RequiredMark>*</RequiredMark></span>
            </Label>
            <Input
              id="name"
              placeholder="e.g. Dr. Jane Smith"
              disabled={isSubmitting}
              hasError={!!errors.name}
              {...register('name', {
                required: 'Full name is required',
                maxLength: { value: 100, message: 'Name must be 100 characters or fewer' },
              })}
            />
            {errors.name && <FieldErrorMessage>{errors.name.message}</FieldErrorMessage>}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="email">
              <Mail size={14} />
              <span>Email Address <RequiredMark>*</RequiredMark></span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. jane.smith@company.com"
              disabled={isSubmitting}
              hasError={!!errors.email}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
                maxLength: { value: 254, message: 'Email must be 254 characters or fewer' },
              })}
            />
            {errors.email && <FieldErrorMessage>{errors.email.message}</FieldErrorMessage>}
          </FieldGroup>
        </Row>

        {/* Row 2: Phone Number (Optional) and Inquiry Topic */}
        <Row>
          <FieldGroup>
            <Label htmlFor="phone">
              <Phone size={14} />
              <span>Phone Number <OptionalMark>(Optional)</OptionalMark></span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              disabled={isSubmitting}
              hasError={!!errors.phone}
              {...register('phone', {
                maxLength: { value: 30, message: 'Phone number must be 30 characters or fewer' },
              })}
            />
            {errors.phone && <FieldErrorMessage>{errors.phone.message}</FieldErrorMessage>}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="topic">
              <Tag size={14} />
              <span>Topic of Inquiry <RequiredMark>*</RequiredMark></span>
            </Label>
            <Select id="topic" disabled={isSubmitting} {...register('topic')}>
              {INQUIRY_TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </Select>
          </FieldGroup>
        </Row>

        {/* Row 3: Message Textarea */}
        <FieldGroup>
          <Label htmlFor="description">
            <MessageSquare size={14} />
            <span>Your Message or Project Scope <RequiredMark>*</RequiredMark></span>
          </Label>
          <Textarea
            id="description"
            placeholder="Please describe your requirements, training objectives, or technical consulting needs..."
            disabled={isSubmitting}
            hasError={!!errors.description}
            {...register('description', {
              required: 'Message details are required',
              maxLength: { value: 5000, message: 'Message must be 5000 characters or fewer' },
            })}
          />
          {errors.description && <FieldErrorMessage>{errors.description.message}</FieldErrorMessage>}
        </FieldGroup>

        {/* Action Row: Submit Button & Privacy Note */}
        <ActionFooter>
          <SubmitButton type="submit" disabled={isSubmitDisabled}>
            {isSubmitting ? (
              <>
                <SpinnerIcon size={16} />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={16} />
              </>
            )}
          </SubmitButton>

          <PrivacyNotice>
            <ShieldCheck size={14} />
            <span>Confidential & secure. No spam.</span>
          </PrivacyNotice>
        </ActionFooter>
      </Form>
    </FormCard>
  );
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const FormCard = styled.div`
  flex: 1.8;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 2rem;
  padding: 3.5rem 3.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);

  ${media('<=tablet')} {
    padding: 3rem 2rem;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 2.8rem;
`;

const CardTitle = styled.h3`
  font-family: var(--font-heading);
  font-size: 2.6rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.25;
  margin-bottom: 0.8rem;

  ${media('<=tablet')} {
    font-size: 2.2rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  color: rgb(var(--mutedColor));
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

const AlertBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(var(--errorColor, 220, 38, 38), 0.08);
  border: 1px solid rgba(var(--errorColor, 220, 38, 38), 0.3);
  color: rgb(var(--errorColor, 220, 38, 38));
  padding: 1.2rem 1.6rem;
  border-radius: 1rem;
  font-size: 1.4rem;
  font-weight: 600;

  svg {
    flex-shrink: 0;
  }
`;

const HoneypotContainer = styled.div`
  position: absolute;
  opacity: 0;
  z-index: -1;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
  margin: 0 !important;
  padding: 0 !important;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;

  ${media('<=tablet')} {
    flex-direction: column;
    gap: 2.2rem;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;

  svg {
    color: rgb(var(--brandBlue));
  }
`;

const RequiredMark = styled.span`
  color: rgb(var(--primary, 251, 107, 49));
`;

const OptionalMark = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgb(var(--mutedColor));
  margin-left: 0.3rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  border: 1.5px solid ${(p) => (p.hasError ? 'rgb(var(--errorColor, 220, 38, 38))' : 'rgb(var(--lineColor))')};
  background: #ffffff;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-family: var(--font-body);
  padding: 1.4rem 1.6rem;
  height: 5rem;
  color: rgb(var(--text));
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  &::placeholder {
    color: rgba(var(--mutedColor), 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgb(var(--brandBlue));
    box-shadow: 0 0 0 4px rgba(var(--brandBlue), 0.12);
  }

  &:disabled {
    background: rgb(var(--tertiary));
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  border: 1.5px solid rgb(var(--lineColor));
  background: #ffffff;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-family: var(--font-body);
  padding: 1.4rem 1.6rem;
  height: 5rem;
  color: rgb(var(--text));
  transition: all 0.2s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23006aad' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.6rem center;
  background-size: 1.6rem;
  padding-right: 4.2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  &:focus {
    outline: none;
    border-color: rgb(var(--brandBlue));
    box-shadow: 0 0 0 4px rgba(var(--brandBlue), 0.12);
  }

  &:disabled {
    background: rgb(var(--tertiary));
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea<{ hasError?: boolean }>`
  border: 1.5px solid ${(p) => (p.hasError ? 'rgb(var(--errorColor, 220, 38, 38))' : 'rgb(var(--lineColor))')};
  background: #ffffff;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-family: var(--font-body);
  padding: 1.4rem 1.6rem;
  color: rgb(var(--text));
  transition: all 0.2s ease;
  width: 100%;
  min-height: 16rem;
  resize: vertical;
  line-height: 1.6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  &::placeholder {
    color: rgba(var(--mutedColor), 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgb(var(--brandBlue));
    box-shadow: 0 0 0 4px rgba(var(--brandBlue), 0.12);
  }

  &:disabled {
    background: rgb(var(--tertiary));
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FieldErrorMessage = styled.span`
  color: rgb(var(--errorColor, 220, 38, 38));
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const ActionFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 1rem;

  ${media('<=tablet')} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SubmitButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.5rem 3.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  min-width: 20rem;

  ${media('<=tablet')} {
    width: 100%;
  }
`;

const SpinnerIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

const PrivacyNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.25rem;
  color: rgb(var(--mutedColor));

  svg {
    color: rgb(var(--success, 22, 163, 74));
  }

  ${media('<=tablet')} {
    justify-content: center;
  }
`;
