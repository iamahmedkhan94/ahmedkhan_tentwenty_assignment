import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

const ITEMS = [
  { color: colors.seat.selected, label: 'Selected' },
  { color: colors.seat.unavailable, label: 'Not available' },
  { color: colors.seat.vip, label: 'VIP (150$)' },
  { color: colors.seat.regular, label: 'Regular (50 $)' },
];

export function SeatLegend() {
  return (
    <View style={styles.wrapper}>
      {ITEMS.map(item => (
        <View key={item.label} style={styles.item}>
          <View style={[styles.swatch, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  swatch: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  label: {
    ...typography.meta,
    color: colors.text.primary,
  },
});
