import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const SHAPE_WIDTH = 3.0722;
const SHAPE_HEIGHT = 2.9162;

export const SEAT_ASPECT = SHAPE_HEIGHT / SHAPE_WIDTH;

type Props = {
  width: number;
  color: string;
  opacity?: number;
};

export function SeatShape({ width, color, opacity = 1 }: Props) {
  return (
    <Svg
      width={width}
      height={width * SEAT_ASPECT}
      viewBox={`0 0 ${SHAPE_WIDTH} ${SHAPE_HEIGHT}`}>
      <Rect
        x={0}
        y={0}
        width={3.0722}
        height={2.3023}
        rx={0.4305}
        fill={color}
        opacity={opacity}
      />
      <Rect
        x={0.4609}
        y={2.4558}
        width={2.1506}
        height={0.4605}
        rx={0.2302}
        fill={color}
        opacity={opacity}
      />
    </Svg>
  );
}
