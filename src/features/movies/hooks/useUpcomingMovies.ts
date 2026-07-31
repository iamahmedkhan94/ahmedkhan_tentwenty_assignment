import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchUpcomingMovies } from '../api/movieApi';
import { movieKeys } from '../queryKeys';

export function useUpcomingMovies() {
  const query = useInfiniteQuery({
    queryKey: movieKeys.upcoming(),
    queryFn: ({ pageParam }) => fetchUpcomingMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });


  const movies = useMemo(() => {
    const pages = query.data?.pages ?? [];
    const seen = new Set<number>();
    return pages
      .flatMap(page => page.results)
      .filter(movie => {
        if (seen.has(movie.id)) {
          return false;
        }
        seen.add(movie.id);
        return true;
      });
  }, [query.data]);

  return { ...query, movies };
}
