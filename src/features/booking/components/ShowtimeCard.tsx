import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Showtime } from '../types';
import { seatLayout } from '../data/seatLayout';
import { SeatGrid } from './SeatGrid';
import {
  colors,
  fontFamily,
  radius,
  spacing,
  typography,
} from '../../../theme';

type Props = {
  showtime: Showtime;
  selected: boolean;
  onPress: () => void;
};

const EMPTY = new Set<string>();

export function ShowtimeCard({ showtime, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${showtime.time} ${showtime.hall}`}>
      <View style={styles.heading}>
        <Text style={styles.time}>{showtime.time}</Text>
        <Text style={styles.hall}>{showtime.hall}</Text>
      </View>

      <View style={[styles.preview, selected && styles.previewSelected]}>
        <View pointerEvents="none">
          <SeatGrid
            rows={seatLayout}
            selectedIds={EMPTY}
            seatSize={6}
            gap={2.5}
            showRowNumbers={false}
          />
        </View>
      </View>

      <Text style={styles.price}>
        From <Text style={styles.priceStrong}>{showtime.priceFrom}$</Text> or{' '}
        <Text style={styles.priceStrong}>{showtime.bonus} bonus</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 260,
    marginRight: spacing.md,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  time: {
    ...typography.meta,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  hall: {
    ...typography.caption,
    color: colors.text.caption,
  },
  preview: {
    height: 150,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewSelected: {
    borderColor: colors.primary,
  },
  price: {
    ...typography.meta,
    color: colors.text.primary,
    marginTop: spacing.sm,
  },
  priceStrong: {
    fontFamily: fontFamily.semiBold,
    color: colors.text.primary,
  },
});
