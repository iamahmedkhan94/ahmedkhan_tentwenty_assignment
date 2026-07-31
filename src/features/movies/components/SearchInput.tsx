import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SearchIcon } from '../../../components/icons/SearchIcon';
import {
  colors,
  palette,
  radius,
  spacing,
  typography,
} from '../../../theme';

type Props = {
  value: string;
  onChangeText: (next: string) => void;
  onClear: () => void;
  placeholder?: string;
};

function ClearIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 7L17 17M17 7L7 17"
        stroke={colors.text.secondary}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SearchInput({
  value,
  onChangeText,
  onClear,
  placeholder = 'TV shows, movies and more',
}: Props) {
  return (
    <View style={styles.wrapper}>
      <SearchIcon size={20} color={colors.text.secondary} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="never"
      />
      {value.length > 0 ? (
        <TouchableOpacity
          onPress={onClear}
          hitSlop={spacing.md}
          accessibilityRole="button"
          accessibilityLabel="Clear search">
          <ClearIcon />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.muted,
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    height: 51,
  },
  input: {
    ...typography.title,
    flex: 1,
    marginLeft: spacing.sm,
    color: colors.text.primary,
    padding: 0,
  },
});
