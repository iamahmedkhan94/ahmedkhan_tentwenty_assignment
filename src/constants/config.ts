export const API_BASE_URL = 'https://api.themoviedb.org/3';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const posterSize = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
} as const;

export const backdropSize = {
  medium: 'w780',
  large: 'w1280',
  original: 'original',
} as const;

type ImageSize =
  | (typeof posterSize)[keyof typeof posterSize]
  | (typeof backdropSize)[keyof typeof backdropSize];

export function buildImageUrl(
  path: string | null | undefined,
  size: ImageSize,
): string | undefined {
  if (!path) {
    return undefined;
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function buildYoutubeUrl(key: string): string {
  return `https://www.youtube.com/watch?v=${key}`;
}

export const REQUEST_TIMEOUT_MS = 15000;
