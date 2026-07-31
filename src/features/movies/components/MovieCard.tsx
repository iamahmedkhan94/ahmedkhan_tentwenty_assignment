import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../../../types/tmdb';
import { backdropSize, buildImageUrl } from '../../../constants/config';
import { colors, radius, spacing, typography } from '../../../theme';

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
    height: 180,
    marginBottom: spacing.lg,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    backgroundColor: colors.border,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    experimental_backgroundImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)',
  },
  title: {
    ...typography.h3,
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    color: colors.text.inverse,
  },
});
