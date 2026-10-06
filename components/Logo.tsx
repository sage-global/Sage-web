import NextImage from 'next/image';
import styled from 'styled-components';
import { cloudinaryUrl } from 'utils/cloudinary';

export default function Logo({ ...rest }) {
  const emblemSrc = cloudinaryUrl('Shastryhexagon_Orange.png');

  return (
    <LogoWrapper {...rest}>
      <IconContainer>
        <NextImage
          src={emblemSrc}
          alt="SAGE Hexagon Emblem"
          width={46}
          height={46}
          objectFit="contain"
          priority
        />
      </IconContainer>
      <TextGroup>
        <TextImageContainer>
          <NextImage
            src="/sage-text.png"
            alt="Shastry Associates Global Enterprises (SAGE)"
            width={105}
            height={26}
            objectFit="contain"
            priority
          />
        </TextImageContainer>
        <SubText>Shastry Associates Global Enterprises</SubText>
      </TextGroup>
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  user-select: none;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25));
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const TextImageContainer = styled.div`
  display: flex;
  align-items: center;
  filter: brightness(0) invert(1);
`;

const SubText = styled.span`
  font-family: var(--font-body);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #ffffff;
  opacity: 0.98;
  margin-top: 0.2rem;
  text-transform: uppercase;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

