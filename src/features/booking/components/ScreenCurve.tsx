import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, palette, spacing, typography } from '../../../theme';

export function ScreenCurve({ width }: { width: number }) {
  const height = 34;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>SCREEN</Text>
      <Svg width={width} height={height}>
        <Path
          d={`M0 ${height - 2} Q ${width / 2} -8 ${width} ${height - 2}`}
          stroke={palette.blue}
          strokeWidth={1.5}
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.text.secondary,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
});
