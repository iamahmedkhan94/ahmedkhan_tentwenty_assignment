import { apiClient } from '../../../services/apiClient';
import { endpoints } from '../../../services/endpoints';
import {
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
