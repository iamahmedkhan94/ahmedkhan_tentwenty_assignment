import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { searchMovies } from '../api/movieApi';
import { movieKeys } from '../queryKeys';

export function useMovieSearch(query: string) {
  const trimmed = query.trim();

  const result = useInfiniteQuery({
    queryKey: movieKeys.search(trimmed),
    queryFn: ({ pageParam }) => searchMovies(trimmed, pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: trimmed.length > 0,
  });

  const movies = useMemo(() => {
    const seen = new Set<number>();
    return (result.data?.pages ?? [])
      .flatMap(page => page.results)
      .filter(movie => {
        if (seen.has(movie.id)) {
          return false;
        }
        seen.add(movie.id);
        return true;
      });
  }, [result.data]);

  return {
    ...result,
    movies,
    totalResults: result.data?.pages[0]?.total_results ?? 0,
    isActive: trimmed.length > 0,
  };
}
