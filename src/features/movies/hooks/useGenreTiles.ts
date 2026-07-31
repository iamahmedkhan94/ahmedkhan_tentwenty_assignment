import { useMemo } from 'react';
import { Movie } from '../../../types/tmdb';
import { useGenres } from './useGenres';
import { useUpcomingMovies } from './useUpcomingMovies';

export type GenreTile = {
  id: number;
  name: string;
  backdropPath: string | null;
};

export function useGenreTiles() {
  const { genres } = useGenres();
  const { movies } = useUpcomingMovies();

  return useMemo<GenreTile[]>(() => {
    const withArt = movies.filter((movie): movie is Movie =>
      Boolean(movie.backdrop_path),
    );

    if (withArt.length === 0) {
      return genres.map(genre => ({
        id: genre.id,
        name: genre.name,
        backdropPath: null,
      }));
    }

    const used = new Set<number>();

    return genres.map((genre, index) => {
      const matching = withArt.filter(movie =>
        movie.genre_ids.includes(genre.id),
      );

      const pick =
        matching.find(movie => !used.has(movie.id)) ??
        matching[0] ??
        withArt[index % withArt.length];

      used.add(pick.id);

      return {
        id: genre.id,
        name: genre.name,
        backdropPath: pick.backdrop_path,
      };
    });
  }, [genres, movies]);
}
