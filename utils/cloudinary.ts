/**
 * Cloudinary URL & Preset Utilities for SAGE
 *
 * Provides standardized asset URLs, responsive format delivery (f_auto, q_auto),
 * and predefined aspect-ratio and crop transforms.
 */

export const imagePresets = {
  card: 'c_fill,g_auto,w_800,h_500/f_auto/q_auto',
  gallery: 'c_fill,g_auto,w_700,h_520/f_auto/q_auto',
  lightbox: 'w_1600/f_auto/q_auto',
  hero: 'c_fill,g_auto,w_1920,h_900/f_auto/q_auto',
  avatar: 'c_fill,g_face,w_400,h_400/f_auto/q_auto',
  og: 'c_fill,g_auto,w_1200,h_630/f_auto/q_auto',
} as const;

export type ImagePresetKey = keyof typeof imagePresets;

/**
 * Builds an optimized Cloudinary delivery URL for a given public ID.
 * If a full HTTP/HTTPS URL is passed, it returns the URL unchanged for compatibility.
 *
 * @param publicId Cloudinary asset public ID (e.g., 'sage/faculty/dr-prasad-shastry' or 'sage/events/cover')
 * @param transformations Transformation string or preset (default: 'f_auto/q_auto')
 */
export const cloudinaryUrl = (
  publicId: string,
  transformations: string = 'f_auto/q_auto'
): string => {
  if (!publicId) return '';

  // If already an absolute external/legacy URL, return as-is
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    return publicId;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'sage-production';
  if (!cloudName) {
    throw new Error('Missing Cloudinary cloud name');
  }

  // Sanitize any accidental leading slash
  const cleanId = publicId.startsWith('/') ? publicId.slice(1) : publicId;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${cleanId}`;
};

/**
 * Resolves an avatar URL prioritizing Cloudinary public ID with fallback to standard avatarUrl.
 */
export const getAvatarUrl = (
  avatarPublicId?: string,
  fallbackUrl?: string,
  transformations: string = imagePresets.avatar
): string | undefined => {
  if (avatarPublicId) {
    return cloudinaryUrl(avatarPublicId, transformations);
  }
  return fallbackUrl;
};
