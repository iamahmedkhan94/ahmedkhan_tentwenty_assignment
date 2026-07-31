import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../../theme';

type Props = {
  size?: number;
  color?: string;
};

export function SearchIcon({ size = 24, color = colors.text.primary }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={11}
        cy={11}
        r={7}
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M20 20L16.5 16.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
