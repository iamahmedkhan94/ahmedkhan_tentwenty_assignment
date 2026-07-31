import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { palette } from '../../theme';

export type TabIconProps = {
  color: string;
  size?: number;
};

export function DashboardIcon({ color, size = 24 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={4} y={4} width={7} height={7} rx={2} fill={color} />
      <Rect x={13} y={4} width={7} height={7} rx={2} fill={color} />
      <Rect x={4} y={13} width={7} height={7} rx={2} fill={color} />
      <Rect x={13} y={13} width={7} height={7} rx={2} fill={color} />
    </Svg>
  );
}

export function WatchIcon({ color, size = 24 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={5} width={18} height={14} rx={4} fill={color} />
      <Path d="M10 8.8L16 12L10 15.2V8.8Z" fill={palette.darkPurple} />
    </Svg>
  );
}

export function MediaLibraryIcon({ color, size = 24 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7.5C3 6.4 3.9 5.5 5 5.5H8.6L10.6 7.7H19C20.1 7.7 21 8.6 21 9.7V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7.5Z"
        fill={color}
      />
    </Svg>
  );
}

export function MoreIcon({ color, size = 24 }: TabIconProps) {
  const rows = [7, 12, 17];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {rows.map(y => (
        <React.Fragment key={y}>
          <Circle cx={4.75} cy={y} r={1.4} fill={color} />
          <Path
            d={`M9 ${y}H20`}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </React.Fragment>
      ))}
    </Svg>
  );
}
