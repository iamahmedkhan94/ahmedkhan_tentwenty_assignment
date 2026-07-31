import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackIcon } from '../../../components/icons/BackIcon';
import {
  colors,
  screenPadding,
  spacing,
  typography,
} from '../../../theme';

type Props = {
  title: string;
  subtitle?: string;
  onBack: () => void;
};

export function BookingHeader({ title, subtitle, onBack }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + spacing.sm }]}>
      <TouchableOpacity
        style={styles.back}
        onPress={onBack}
        hitSlop={spacing.md}
        accessibilityRole="button"
        accessibilityLabel="Go back">
        <BackIcon color={colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    paddingBottom: spacing.md,
    paddingHorizontal: screenPadding,
  },
  back: {
    position: 'absolute',
    left: screenPadding,
    bottom: spacing.md,
    zIndex: 1,
  },
  text: {
    alignItems: 'center',
  },
  title: {
    ...typography.title,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.labelAccent,
    color: colors.text.accent,
    marginTop: spacing.xs,
  },
});
