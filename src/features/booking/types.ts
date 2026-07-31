export type SeatKind = 'regular' | 'vip' | 'unavailable';

export type Seat = {
  id: string;
  row: number;
  number: number;
  kind: SeatKind;
};

export type SeatRow = {
  row: number;
  blocks: Seat[][];
};

export type Showtime = {
  id: string;
  time: string;
  hall: string;
  priceFrom: number;
  bonus: number;
};

export type ShowDate = {
  id: string;
  label: string;
  full: string;
};

export const SEAT_PRICE: Record<Exclude<SeatKind, 'unavailable'>, number> = {
  regular: 50,
  vip: 150,
};
