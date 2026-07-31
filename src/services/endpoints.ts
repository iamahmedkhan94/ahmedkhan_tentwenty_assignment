export const endpoints = {
  upcomingMovies: '/movie/upcoming',
  searchMovies: '/search/movie',
  movieDetail: (movieId: number) => `/movie/${movieId}`,
  movieImages: (movieId: number) => `/movie/${movieId}/images`,
  movieVideos: (movieId: number) => `/movie/${movieId}/videos`,
  genres: '/genre/movie/list',
} as const;
