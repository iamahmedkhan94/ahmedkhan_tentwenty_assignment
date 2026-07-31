import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme';

type Props = {
  size?: number;
  color?: string;
};

export function BackIcon({ size = 24, color = colors.text.inverse }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 5L8 12L15 19"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PlayIcon({ size = 16, color = colors.text.inverse }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 4.5L20 12L7 19.5V4.5Z" fill={color} />
    </Svg>
  );
}
