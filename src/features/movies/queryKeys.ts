export const movieKeys = {
  all: ['movies'] as const,
  upcoming: () => [...movieKeys.all, 'upcoming'] as const,
  search: (query: string) => [...movieKeys.all, 'search', query] as const,
  detail: (movieId: number) => [...movieKeys.all, 'detail', movieId] as const,
  images: (movieId: number) => [...movieKeys.all, 'images', movieId] as const,
  videos: (movieId: number) => [...movieKeys.all, 'videos', movieId] as const,
  genres: () => [...movieKeys.all, 'genres'] as const,
};
