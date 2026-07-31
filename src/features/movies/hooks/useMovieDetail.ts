import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchMovieDetail, fetchMovieImages } from '../api/movieApi';
import { movieKeys } from '../queryKeys';
import { MovieImage } from '../../../types/tmdb';


function pickHeroBackdrop(backdrops: MovieImage[]): string | undefined {
  if (backdrops.length === 0) {
    return undefined;
  }
  const ranked = [...backdrops].sort((a, b) => {
    const aTextless = a.iso_639_1 === null ? 1 : 0;
    const bTextless = b.iso_639_1 === null ? 1 : 0;
    if (aTextless !== bTextless) {
      return bTextless - aTextless;
    }
    return b.vote_average - a.vote_average;
  });
  return ranked[0].file_path;
}

export function useMovieDetail(movieId: number) {
  const detailQuery = useQuery({
    queryKey: movieKeys.detail(movieId),
    queryFn: () => fetchMovieDetail(movieId),
  });

  const imagesQuery = useQuery({
    queryKey: movieKeys.images(movieId),
    queryFn: () => fetchMovieImages(movieId),
  });

  const heroPath = useMemo(() => {
    const fromImages = pickHeroBackdrop(imagesQuery.data?.backdrops ?? []);
    return fromImages ?? detailQuery.data?.backdrop_path ?? undefined;
  }, [imagesQuery.data, detailQuery.data]);

  return {
    movie: detailQuery.data,
    heroPath,
    isPending: detailQuery.isPending,
    isError: detailQuery.isError,
    error: detailQuery.error,
    refetch: () => {
      detailQuery.refetch();
      imagesQuery.refetch();
    },
  };
}
