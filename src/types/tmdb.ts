export type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};


export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieDetail = Omit<Movie, 'genre_ids'> & {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  status: string;
  homepage: string | null;
  imdb_id: string | null;
  budget: number;
  revenue: number;
};

export type MovieImage = {
  file_path: string;
  aspect_ratio: number;
  width: number;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
};

export type MovieImages = {
  id: number;
  backdrops: MovieImage[];
  posters: MovieImage[];
  logos: MovieImage[];
};

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
};

export type VideosResponse = {
  id: number;
  results: Video[];
};
