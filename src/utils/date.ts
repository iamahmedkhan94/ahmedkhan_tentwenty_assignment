import dayjs from 'dayjs';

export function formatInTheaters(releaseDate?: string): string | undefined {
  if (!releaseDate) {
    return undefined;
  }
  const date = dayjs(releaseDate);
  if (!date.isValid()) {
    return undefined;
  }
  return `In theaters ${date.format('MMMM D, YYYY').toLowerCase()}`;
}

export function formatRuntime(minutes?: number | null): string | undefined {
  if (!minutes || minutes <= 0) {
    return undefined;
  }
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return hours > 0 ? `${hours}h ${remainder}m` : `${remainder}m`;
}
