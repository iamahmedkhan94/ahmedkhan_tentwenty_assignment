import { useQuery } from '@tanstack/react-query';
import { fetchMovieVideos } from '../api/movieApi';
import { movieKeys } from '../queryKeys';
import { Video } from '../../../types/tmdb';

const isPlayable = (video: Video) => video.site === 'YouTube' && !!video.key;

function pickTrailer(videos: Video[]): Video | undefined {
  const playable = videos.filter(isPlayable);
  const newestFirst = (a: Video, b: Video) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime();

  const tiers = [
    playable.filter(v => v.type === 'Trailer' && v.official),
    playable.filter(v => v.type === 'Trailer'),
    playable.filter(v => v.type === 'Teaser'),
    playable,
  ];

  for (const tier of tiers) {
    if (tier.length > 0) {
      return [...tier].sort(newestFirst)[0];
    }
  }
  return undefined;
}

export function useMovieTrailer(movieId: number) {
  const query = useQuery({
    queryKey: movieKeys.videos(movieId),
    queryFn: () => fetchMovieVideos(movieId),
    select: data => pickTrailer(data.results),
  });

  return { trailer: query.data, isPending: query.isPending };
}
