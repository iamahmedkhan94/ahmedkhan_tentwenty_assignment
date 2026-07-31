import { apiClient } from '../../../services/apiClient';
import { endpoints } from '../../../services/endpoints';
import {
  Genre,
  Movie,
  MovieDetail,
  MovieImages,
  PaginatedResponse,
  VideosResponse,
} from '../../../types/tmdb';

export async function fetchUpcomingMovies(
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    endpoints.upcomingMovies,
    { params: { page } },
  );
  return data;
}

export async function searchMovies(
  query: string,
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    endpoints.searchMovies,
    { params: { query, page, include_adult: false } },
  );
  return data;
}

export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await apiClient.get<{ genres: Genre[] }>(endpoints.genres);
  return data.genres;
}

export async function fetchMovieDetail(movieId: number): Promise<MovieDetail> {
  const { data } = await apiClient.get<MovieDetail>(
    endpoints.movieDetail(movieId),
  );
  return data;
}

export async function fetchMovieImages(movieId: number): Promise<MovieImages> {
  const { data } = await apiClient.get<MovieImages>(
    endpoints.movieImages(movieId),
  );
  return data;
}

export async function fetchMovieVideos(
  movieId: number,
): Promise<VideosResponse> {
  const { data } = await apiClient.get<VideosResponse>(
    endpoints.movieVideos(movieId),
  );
  return data;
}
