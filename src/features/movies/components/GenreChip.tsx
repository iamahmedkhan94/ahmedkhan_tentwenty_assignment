import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, genreColorAt, radius, spacing, typography } from '../../../theme';

type Props = {
  name: string;
  index: number;
};

export function GenreChip({ name, index }: Props) {
  return (
    <View style={[styles.chip, { backgroundColor: genreColorAt(index) }]}>
      <Text style={styles.label}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.chip,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.label,
    color: colors.text.inverse,
  },
});
