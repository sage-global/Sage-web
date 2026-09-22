import styled from 'styled-components';
import { Mail, Building2 } from 'lucide-react';
import { siteConfig } from 'sage-data';
import { media } from 'utils/media';

export default function InformationSection() {
  return (
    <CardWrapper>
      <Title>Contact Information</Title>
      <Subtitle>
        Have a question or looking to collaborate? Reach out to us directly via email or submit the inquiry form.
      </Subtitle>

      <ContactChannelList>
        <ChannelItem>
          <IconCircle>
            <Mail size={20} />
          </IconCircle>
          <ChannelContent>
            <ChannelLabel>Email Us</ChannelLabel>
            <ChannelValue href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </ChannelValue>
          </ChannelContent>
        </ChannelItem>

        <ChannelItem>
          <IconCircle>
            <Building2 size={20} />
          </IconCircle>
          <ChannelContent>
            <ChannelLabel>Organization</ChannelLabel>
            <ChannelText>{siteConfig.legalName || siteConfig.fullName}</ChannelText>
          </ChannelContent>
        </ChannelItem>
      </ContactChannelList>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  flex: 1;
  background: rgb(var(--cardBackground));
  border: 1px solid rgb(var(--lineColor));
  border-radius: 2rem;
  padding: 4rem 3.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  margin-right: 3rem;

  ${media('<=tablet')} {
    margin-right: 0;
    margin-bottom: 3rem;
    padding: 3rem 2rem;
  }
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 2.6rem;
  font-weight: 800;
  color: rgb(var(--text));
  line-height: 1.25;
  margin-bottom: 1.2rem;

  ${media('<=tablet')} {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--mutedColor));
  margin-bottom: 3.5rem;
`;

const ContactChannelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const ChannelItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 1.2rem;
  background: rgb(var(--tertiary));
  color: rgb(var(--brandBlue));
  border: 1px solid rgb(var(--lineColor));
  flex-shrink: 0;
`;

const ChannelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ChannelLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgb(var(--mutedColor));
`;

const ChannelValue = styled.a`
  font-size: 1.6rem;
  font-weight: 700;
  color: rgb(var(--brandBlue));
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: rgb(var(--primary));
    text-decoration: underline;
  }
`;

const ChannelText = styled.span`
  font-size: 1.5rem;
  color: rgb(var(--text));
  font-weight: 600;
  line-height: 1.4;
`;
