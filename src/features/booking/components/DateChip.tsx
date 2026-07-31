import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  colors,
  palette,
  radius,
  spacing,
  typography,
} from '../../../theme';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function DateChip({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.card,
    backgroundColor: palette.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  label: {
    ...typography.title,
    color: colors.text.primary,
  },
  labelSelected: {
    color: colors.text.inverse,
  },
});
