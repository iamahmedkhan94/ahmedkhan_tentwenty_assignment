import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../../../types/tmdb';
import { backdropSize, buildImageUrl } from '../../../constants/config';
import {
  colors,
  gradients,
  palette,
  radius,
  spacing,
  typography,
} from '../../../theme';

type Props = {
  movie: Movie;
  onPress?: (movie: Movie) => void;
};

function MovieCardComponent({ movie, onPress }: Props) {
  // Fall back to the poster when a title has no backdrop.
  const imageUrl =
    buildImageUrl(movie.backdrop_path, backdropSize.medium) ??
    buildImageUrl(movie.poster_path, backdropSize.medium);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress?.(movie)}
      accessibilityRole="button"
      accessibilityLabel={movie.title}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imageFallback]} />
      )}
      <View style={styles.scrim} />
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
}

export const MovieCard = React.memo(MovieCardComponent);

const styles = StyleSheet.create({
  card: {
    // (derived) card height is not an extracted value.
    height: 180,
    marginBottom: spacing.lg,
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    backgroundColor: palette.placeholder,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    experimental_backgroundImage: gradients.scrimBottom,
  },
  title: {
    ...typography.title,
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    color: colors.text.inverse,
  },
});
