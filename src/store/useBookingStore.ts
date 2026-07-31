import { create } from 'zustand';
import { Seat, SEAT_PRICE } from '../features/booking/types';

type BookingState = {
  selectedSeats: Seat[];
  toggleSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  clear: () => void;
};

export const useBookingStore = create<BookingState>(set => ({
  selectedSeats: [],
  toggleSeat: seat =>
    set(state => {
      const exists = state.selectedSeats.some(item => item.id === seat.id);
      return {
        selectedSeats: exists
          ? state.selectedSeats.filter(item => item.id !== seat.id)
          : [...state.selectedSeats, seat],
      };
    }),
  removeSeat: seatId =>
    set(state => ({
      selectedSeats: state.selectedSeats.filter(item => item.id !== seatId),
    })),
  clear: () => set({ selectedSeats: [] }),
}));

export function totalPrice(seats: Seat[]) {
  return seats.reduce((sum, seat) => {
    if (seat.kind === 'unavailable') {
      return sum;
    }
    return sum + SEAT_PRICE[seat.kind];
  }, 0);
}
