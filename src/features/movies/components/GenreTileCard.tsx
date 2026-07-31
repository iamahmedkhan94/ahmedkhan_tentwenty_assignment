import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GenreTile } from '../hooks/useGenreTiles';
import { backdropSize, buildImageUrl } from '../../../constants/config';
import {
  colors,
  palette,
  radius,
  spacing,
  typography,
} from '../../../theme';

export function GenreTileCard({ tile }: { tile: GenreTile }) {
  const uri = buildImageUrl(tile.backdropPath, backdropSize.medium);

  return (
    <View style={styles.tile}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.fallback]} />
      )}
      <View style={styles.scrim} />
      <Text style={styles.label} numberOfLines={2}>
        {tile.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    height: 100,
    margin: spacing.xs,
    borderRadius: radius.card,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  fallback: {
    backgroundColor: palette.placeholder,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  label: {
    ...typography.title,
    color: colors.text.inverse,
    padding: spacing.sm,
  },
});
