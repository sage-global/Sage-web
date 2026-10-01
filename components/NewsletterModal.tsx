import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MailchimpSubscribe, { DefaultFormFields } from 'react-mailchimp-subscribe';
import styled from 'styled-components';
import { EnvVars } from 'env';
import useEscClose from 'hooks/useEscKey';
import { media } from 'utils/media';
import Button from './Button';
import CloseIcon from './CloseIcon';
import Container from './Container';
import Input from './Input';
import MailSentState from './MailSentState';
import Overlay from './Overlay';

export interface NewsletterModalProps {
  onClose: () => void;
}

export default function NewsletterModal({ onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const router = useRouter();

  function handleCloseAndRedirect() {
    onClose();
    router.push('/newsletter');
  }

  useEscClose({ onClose: handleCloseAndRedirect });

  function onSubmit(event: React.FormEvent<HTMLFormElement>, enrollNewsletter: (props: DefaultFormFields) => void) {
    event.preventDefault();
    console.log({ email });
    if (email) {
      enrollNewsletter({ EMAIL: email });
    }
  }

  return (
    <MailchimpSubscribe
      url={EnvVars.MAILCHIMP_SUBSCRIBE_URL}
      render={({ subscribe, status, message }) => {
        const hasSignedUp = status === 'success';
        return (
          <Overlay>
            <Container>
              <Card onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmit(event, subscribe)}>
                <CloseIconContainer>
                  <CloseIcon onClick={handleCloseAndRedirect} />
                </CloseIconContainer>
                {hasSignedUp && (
                  <MailSentState
                    customTitle="Successfully Enrolled in SAGE Newsletter!"
                    customDescription="Thank you for enrolling! Below is our archive of published SAGE Technical Digest issues available for immediate reading."
                    showNewsletters
                  />
                )}
                {!hasSignedUp && (
                  <>
                    <Title>Enroll to Our Newsletter</Title>
                    <Subtitle>
                      Stay updated with SAGE&apos;s upcoming RF & wireless hackathons, antenna design workshops, technical articles, and engineering events.
                    </Subtitle>
                    <Row>
                      <CustomInput
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        required
                      />
                      <CustomButton type="submit" disabled={hasSignedUp}>
                        Enroll Now
                      </CustomButton>
                    </Row>
                    {message && <ErrorMessage dangerouslySetInnerHTML={{ __html: message as string }} />}
                  </>
                )}
              </Card>
            </Container>
          </Overlay>
        );
      }}
    />
  );
}

const Card = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: auto;
  padding: 10rem 5rem;
  background: rgb(var(--modalBackground));
  border-radius: 0.6rem;
  max-width: 70rem;
  overflow: hidden;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    padding: 7.5rem 2.5rem;
  }
`;

const CloseIconContainer = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;

  svg {
    cursor: pointer;
    width: 2rem;
  }
`;

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    font-size: 2.6rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  text-align: center;
  color: rgb(var(--mutedColor));
  margin-top: 1rem;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorMessage = styled.p`
  color: rgb(var(--errorColor));
  font-size: 1.5rem;
  margin: 1rem 0;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 3rem;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;

const CustomButton = styled(Button)`
  height: 100%;
  padding: 1.8rem;
  margin-left: 1.5rem;
  box-shadow: var(--shadow-lg);

  ${media('<=tablet')} {
    width: 100%;
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const CustomInput = styled(Input)`
  width: 60%;

  ${media('<=tablet')} {
    width: 100%;
  }
`;
