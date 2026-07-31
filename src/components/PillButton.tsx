import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

type Props = {
  label: string;
  onPress?: () => void;
  /** "filled" is the primary CTA; "outlined" is the blue-bordered secondary. */
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
};

export function PillButton({
  label,
  onPress,
  variant = 'filled',
  disabled = false,
  icon,
  style,
}: Props) {
  const outlined = variant === 'outlined';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        outlined ? styles.outlined : styles.filled,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={label}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
  },
  filled: {
    backgroundColor: colors.primary,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.4,
  },
  icon: {
    marginRight: spacing.sm,
  },
  label: {
    ...typography.title,
    color: colors.text.inverse,
  },
});
