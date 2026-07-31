import { apiClient } from '../../../services/apiClient';
import { endpoints } from '../../../services/endpoints';
import { Movie, PaginatedResponse } from '../../../types/tmdb';

export async function fetchUpcomingMovies(
  page: number,
): Promise<PaginatedResponse<Movie>> {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    endpoints.upcomingMovies,
    { params: { page } },
  );
  return data;
}
