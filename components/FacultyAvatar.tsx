import styled from 'styled-components';
import { getAvatarUrl, imagePresets } from 'utils/cloudinary';

export interface FacultyAvatarProps {
  initials: string;
  name: string;
  imageUrl?: string;
  avatarPublicId?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function FacultyAvatar({
  initials,
  name,
  imageUrl,
  avatarPublicId,
  size = 'md',
}: FacultyAvatarProps) {
  const resolvedSrc = getAvatarUrl(avatarPublicId, imageUrl, imagePresets.avatar);

  if (resolvedSrc) {
    return (
      <AvatarImageWrapper size={size}>
        <img src={resolvedSrc} alt={name} loading="lazy" />
      </AvatarImageWrapper>
    );
  }

  return (
    <AvatarFallbackWrapper size={size} aria-label={name}>
      {initials}
    </AvatarFallbackWrapper>
  );
}

const getSizePX = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return '4.4rem'
    case 'lg':
      return '8rem'
    case 'md':
    default:
      return '6rem'
  }
}

const getFontSize = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return '1.6rem'
    case 'lg':
      return '2.8rem'
    case 'md':
    default:
      return '2.2rem'
  }
}

const AvatarFallbackWrapper = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  width: ${(p) => getSizePX(p.size)};
  height: ${(p) => getSizePX(p.size)};
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brandBlue) 0%, var(--skyBlue) 100%);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: ${(p) => getFontSize(p.size)};
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 14px rgba(0, 106, 173, 0.2);
  user-select: none;
  flex-shrink: 0;
`

const AvatarImageWrapper = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  width: ${(p) => getSizePX(p.size)};
  height: ${(p) => getSizePX(p.size)};
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 106, 173, 0.15);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
