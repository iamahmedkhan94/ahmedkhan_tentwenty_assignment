import dayjs from 'dayjs';
import { ShowDate, Showtime } from '../types';

export function buildDates(count = 7): ShowDate[] {
  const today = dayjs();

  return Array.from({ length: count }, (_, index) => {
    const date = today.add(index, 'day');
    return {
      id: date.format('YYYY-MM-DD'),
      label: date.format('D MMM'),
      full: date.format('MMMM D, YYYY'),
    };
  });
}

const HALLS = ['Cinetech + Hall 1', 'Cinetech + Hall 2', 'Cinetech + Hall 3'];

export function buildShowtimes(dateId: string): Showtime[] {
  const seed = dateId.split('-').reduce((sum, part) => sum + Number(part), 0);

  return [
    { time: '12:30', priceFrom: 50, bonus: 2500 },
    { time: '13:30', priceFrom: 75, bonus: 3000 },
    { time: '18:00', priceFrom: 90, bonus: 3500 },
  ].map((slot, index) => ({
    id: `${dateId}-${slot.time}`,
    time: slot.time,
    hall: HALLS[(seed + index) % HALLS.length],
    priceFrom: slot.priceFrom,
    bonus: slot.bonus,
  }));
}
