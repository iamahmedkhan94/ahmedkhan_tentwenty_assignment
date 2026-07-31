import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchGenres } from '../api/movieApi';
import { movieKeys } from '../queryKeys';

export function useGenres() {
  const query = useQuery({
    queryKey: movieKeys.genres(),
    queryFn: fetchGenres,
    staleTime: Infinity,
  });

  const genresById = useMemo(() => {
    const map = new Map<number, string>();
    query.data?.forEach(genre => map.set(genre.id, genre.name));
    return map;
  }, [query.data]);

  return { genres: query.data ?? [], genresById };
}
