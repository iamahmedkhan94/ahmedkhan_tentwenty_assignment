import { Seat, SeatRow } from '../types';

const ROW_COUNT = 10;
const BLOCK_SIZES = [4, 12, 4];
const VIP_ROW = 10;

function noise(row: number, column: number) {
  const value = Math.sin(row * 127.1 + column * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function buildSeatLayout(): SeatRow[] {
  const rows: SeatRow[] = [];

  for (let row = 1; row <= ROW_COUNT; row++) {
    const blocks: Seat[][] = [];
    let seatNumber = 1;

    BLOCK_SIZES.forEach((size, blockIndex) => {
      const block: Seat[] = [];

      for (let index = 0; index < size; index++) {
        const column = seatNumber;
        const isEdgeBlock = blockIndex !== 1;
        const trimmed = row <= 2 && isEdgeBlock && index >= size - 2;

        if (!trimmed) {
          const unavailable = row === VIP_ROW ? false : noise(row, column) < 0.4;

          block.push({
            id: `${row}-${column}`,
            row,
            number: column,
            kind:
              row === VIP_ROW ? 'vip' : unavailable ? 'unavailable' : 'regular',
          });
        }

        seatNumber++;
      }

      blocks.push(block);
    });

    rows.push({ row, blocks });
  }

  return rows;
}

export const seatLayout = buildSeatLayout();
