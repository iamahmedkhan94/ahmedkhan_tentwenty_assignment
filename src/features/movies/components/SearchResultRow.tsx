import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Movie } from '../../../types/tmdb';
import { backdropSize, buildImageUrl } from '../../../constants/config';
import {
  colors,
  palette,
  radius,
  spacing,
  typography,
} from '../../../theme';

type Props = {
  movie: Movie;
  genreLabel?: string;
  onPress: (movie: Movie) => void;
};

function MoreIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={5} r={1.6} fill={colors.text.secondary} />
      <Circle cx={12} cy={12} r={1.6} fill={colors.text.secondary} />
      <Circle cx={12} cy={19} r={1.6} fill={colors.text.secondary} />
    </Svg>
  );
}

function SearchResultRowComponent({ movie, genreLabel, onPress }: Props) {
  const uri =
    buildImageUrl(movie.backdrop_path, backdropSize.medium) ??
    buildImageUrl(movie.poster_path, backdropSize.medium);

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.8}
      onPress={() => onPress(movie)}
      accessibilityRole="button"
      accessibilityLabel={movie.title}>
      {uri ? (
        <Image source={{ uri }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.fallback]} />
      )}
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        {genreLabel ? <Text style={styles.genre}>{genreLabel}</Text> : null}
      </View>
      <MoreIcon />
    </TouchableOpacity>
  );
}

export const SearchResultRow = React.memo(SearchResultRowComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  thumb: {
    width: 130,
    height: 100,
    borderRadius: radius.card,
    backgroundColor: palette.muted,
  },
  fallback: {
    backgroundColor: palette.placeholder,
  },
  text: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.text.primary,
  },
  genre: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});
