import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import styled from 'styled-components';
import { EnvVars } from 'env';
import { media } from 'utils/media';

interface ShareWidgetProps {
  title: string;
  slug: string;
}

export default function ShareWidget({ title, slug }: ShareWidgetProps) {
  const shareMessage = 'New article: ' + title;
  const currentUrl = EnvVars.URL + 'blog/' + slug;

  return (
    <Wrapper>
      <FacebookShareButton title={shareMessage} url={currentUrl}>
        <FacebookIcon size={36} round={true} />
      </FacebookShareButton>
      <TwitterShareButton title={shareMessage} url={currentUrl}>
        <TwitterIcon size={36} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton title={shareMessage} url={currentUrl}>
        <LinkedinIcon size={36} round={true} />
      </LinkedinShareButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  position: sticky;
  align-items: flex-start;
  margin-left: -10rem;
  margin-top: -22.4rem;
  top: 50%;
  z-index: var(--z-sticky);
  transform: translateY(-50%);

  & > *:not(:first-child) {
    margin-top: 2rem;
  }

  ${media('<=largeDesktop')} {
    transform: translateY(-50%) scale(0.8);
  }

  ${media('<=desktop')} {
    display: none;
  }
`;
