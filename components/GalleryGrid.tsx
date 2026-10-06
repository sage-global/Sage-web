import type { SageEvent } from 'lib/content';
import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { cloudinaryUrl, imagePresets } from 'utils/cloudinary';

const FALLBACK_PHOTOS = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80',
];

/**
 * Format event identifier into clean human-readable title if placeholder
 */
function getEventDisplayName(event: SageEvent): string {
  if (event.title && event.title.trim().length > 0) {
    return event.title;
  }
  const idMap: Record<string, string> = {
    'sage-inauguration': 'SAGE Inauguration',
    'sage-symposium': 'SAGE Symposium',
    'sage-x-rvce': 'SAGE × RVCE',
    'sage-rvce-2': 'SAGE RVCE 2',
    'sage-bmsit-symposium': 'SAGE BMSIT Symposium',
    'sage-vit': 'SAGE VIT',
    'sage-dinner-get-together': 'SAGE Dinner Meetup',
    'sage-lunch-get-together': 'SAGE Lunch Meetup',
  };
  return idMap[event.id] || event.id;
}

export interface GalleryItem {
  id: string;
  eventId: string;
  eventTitle: string;
  location: string;
  photoPath: string;
  alt: string;
  fallbackSrc: string;
}

export interface GalleryGridProps {
  events: SageEvent[];
}

export default function GalleryGrid({ events }: GalleryGridProps) {
  // 1. Gather all past event photos
  const allPhotos: GalleryItem[] = events.flatMap((evt) => {
    const displayName = getEventDisplayName(evt);
    return (evt.gallery || []).map((path, idx) => ({
      id: `${evt.id}-${idx}`,
      eventId: evt.id,
      eventTitle: displayName,
      location: evt.location,
      photoPath: path,
      alt: `${displayName} — Photo ${idx + 1}`,
      fallbackSrc: FALLBACK_PHOTOS[(idx + evt.id.length) % FALLBACK_PHOTOS.length],
    }));
  });

  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  // Focus return ref tracking (EV-5)
  const triggerButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Lightbox slides using imagePresets.lightbox
  const slides = allPhotos.map((p) => ({
    src: cloudinaryUrl(p.photoPath, imagePresets.lightbox),
    alt: p.alt,
    title: p.eventTitle,
    description: p.location,
  }));

  // EV-5: Lock body scroll while lightbox is open
  useEffect(() => {
    if (lightboxIndex >= 0) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  const handleOpen = (photoId: string, index: number) => {
    activeTriggerRef.current = triggerButtonRefs.current[photoId] || null;
    setLightboxIndex(index);
  };

  const handleClose = () => {
    setLightboxIndex(-1);
    // EV-5: focus returns to the triggering thumbnail on close
    setTimeout(() => {
      if (activeTriggerRef.current) {
        activeTriggerRef.current.focus();
      }
    }, 50);
  };

  return (
    <GalleryWrapper>
      {/* Lightbox theme applied via Master Trio CSS Variables */}
      <LightboxMasterTrioStyles />

      {/* Masonry wall of photos */}
      {allPhotos.length === 0 ? (
        <EmptyGallery>No photos found.</EmptyGallery>
      ) : (
        <MasonryWall>
          {allPhotos.map((photo, index) => (
            <MasonryItem key={photo.id}>
              <ThumbnailButton
                ref={(el: HTMLButtonElement | null) => {
                  triggerButtonRefs.current[photo.id] = el;
                }}
                onClick={() => handleOpen(photo.id, index)}
                aria-label={`Open photo ${index + 1} of ${allPhotos.length} from ${photo.eventTitle}`}
                type="button"
              >
                <ThumbnailImageItem
                  photoPath={photo.photoPath}
                  fallbackSrc={photo.fallbackSrc}
                  alt={photo.alt}
                />
                <OverlayGradient>
                  <OverlayTitle>{photo.eventTitle}</OverlayTitle>
                </OverlayGradient>
              </ThumbnailButton>
            </MasonryItem>
          ))}
        </MasonryWall>
      )}

      {/* Lightbox component */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={handleClose}
        index={lightboxIndex}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
      />
    </GalleryWrapper>
  );
}

function ThumbnailImageItem({
  photoPath,
  fallbackSrc,
  alt,
}: {
  photoPath: string;
  fallbackSrc: string;
  alt: string;
}) {
  const [src, setSrc] = useState(() =>
    cloudinaryUrl(photoPath, imagePresets.gallery)
  );

  return (
    <ThumbnailImage
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setSrc(fallbackSrc)}
    />
  );
}

/**
 * Theme yet-another-react-lightbox to the Master Trio palette:
 * - Deep Blue: rgb(var(--brandBlue, 0, 106, 173))
 * - Sky Blue: rgb(var(--skyBlue, 53, 169, 239))
 * - SAGE Orange: rgb(var(--primary, 251, 107, 49))
 * - Backdrop: Deep Ink rgb(15, 23, 42)
 */
const LightboxMasterTrioStyles = createGlobalStyle`
  .yarl__root {
    --yarl__color_backdrop: rgba(15, 23, 42, 0.95) !important;
    --yarl__color_button: rgb(var(--skyBlue, 53, 169, 239)) !important;
    --yarl__color_button_active: rgb(var(--primary, 251, 107, 49)) !important;
    --yarl__color_button_disabled: rgba(100, 116, 139, 0.4) !important;
  }

  .yarl__button {
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    border-radius: 9999px !important;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5)) !important;
  }

  .yarl__button:hover {
    color: rgb(var(--primary, 251, 107, 49)) !important;
    background-color: rgba(0, 106, 173, 0.25) !important;
    transform: scale(1.08) !important;
  }

  .yarl__button:focus-visible {
    outline: 2px solid rgb(var(--primary, 251, 107, 49)) !important;
    outline-offset: 3px !important;
  }

  .yarl__slide_title {
    color: #ffffff !important;
    font-family: var(--font-heading) !important;
    font-size: 1.6rem !important;
    font-weight: 700 !important;
  }

  .yarl__slide_description {
    color: rgba(255, 255, 255, 0.8) !important;
    font-family: var(--font-body) !important;
  }
`;

const GalleryWrapper = styled.div`
  width: 100%;
`;

const MasonryWall = styled.div`
  column-count: 3;
  column-gap: 2rem;

  @media (max-width: 900px) {
    column-count: 2;
    column-gap: 1.6rem;
  }

  @media (max-width: 560px) {
    column-count: 1;
  }
`;

const MasonryItem = styled.div`
  break-inside: avoid;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    margin-bottom: 1.6rem;
  }
`;

const ThumbnailButton = styled.button`
  width: 100%;
  display: block;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  border-radius: 1.4rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
  }

  &:focus-visible {
    outline: 3px solid rgb(var(--primary));
    outline-offset: 3px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 1.4rem;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  ${ThumbnailButton}:hover & {
    transform: scale(1.04);
  }
`;

const OverlayGradient = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1.4rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 40%,
    rgba(15, 23, 42, 0.85) 100%
  );
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.6rem;
  transition: opacity 0.3s ease;

  ${ThumbnailButton}:hover &,
  ${ThumbnailButton}:focus-visible & {
    opacity: 1;
  }
`;

const OverlayTitle = styled.span`
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  text-align: left;
  line-height: 1.3;
`;

const EmptyGallery = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  font-size: 1.6rem;
  color: rgb(var(--mutedColor));
`;
