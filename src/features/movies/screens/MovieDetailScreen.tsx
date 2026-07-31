import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { ApiError } from '../../../services/apiClient';
import { backdropSize, buildImageUrl } from '../../../constants/config';
import { formatInTheaters, formatRuntime } from '../../../utils/date';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { useMovieTrailer } from '../hooks/useMovieTrailer';
import { GenreChip } from '../components/GenreChip';
import { PillButton } from '../../../components/PillButton';
import { ErrorView, LoadingView } from '../../../components/StateView';
import { BackIcon, PlayIcon } from '../../../components/icons/BackIcon';
import {
  colors,
  gradients,
  palette,
  screenPadding,
  spacing,
  typography,
} from '../../../theme';

type DetailRoute = RouteProp<RootStackParamList, 'MovieDetail'>;
type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function MovieDetailScreen() {
  const { params } = useRoute<DetailRoute>();
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { movie, heroPath, isPending, isError, error, refetch } =
    useMovieDetail(params.movieId);
  const { trailer } = useMovieTrailer(params.movieId);

  if (isPending) {
    return <LoadingView />;
  }

  if (isError || !movie) {
    const message =
      error instanceof ApiError
        ? error.message
        : 'Something went wrong. Please try again.';
    return <ErrorView message={message} onRetry={refetch} />;
  }

  const heroUrl = buildImageUrl(heroPath, backdropSize.large);
  const inTheaters = formatInTheaters(movie.release_date);
  const runtime = formatRuntime(movie.runtime);

  const openTrailer = () => {
    if (trailer) {
      navigation.navigate('Trailer', {
        videoKey: trailer.key,
        title: movie.title,
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.hero, { height: height * 0.62 }]}>
        {heroUrl ? (
          <Image source={{ uri: heroUrl }} style={styles.heroImage} />
        ) : (
          <View style={[styles.heroImage, styles.heroFallback]} />
        )}
        <View style={styles.scrimTop} />
        <View style={styles.scrimBottom} />

        <View style={[styles.heroHeader, { paddingTop: insets.top }]}>
          <TouchableOpacity
            onPress={navigation.goBack}
            hitSlop={spacing.md}
            accessibilityRole="button"
            accessibilityLabel="Go back">
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.heroHeaderTitle}>Watch</Text>
        </View>

        <View style={styles.heroBody}>
          <Text style={styles.heroTitle}>{movie.title}</Text>
          {inTheaters ? (
            <Text style={styles.inTheaters}>{inTheaters}</Text>
          ) : null}

          <PillButton
            label="Get Tickets"
            style={styles.cta}
            onPress={() =>
              navigation.navigate('Showtimes', {
                movieId: movie.id,
                title: movie.title,
                releaseDate: movie.release_date,
              })
            }
          />
          <PillButton
            label="Watch Trailer"
            variant="outlined"
            style={styles.cta}
            icon={<PlayIcon />}
            disabled={!trailer}
            onPress={openTrailer}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Genres</Text>
        <View style={styles.genres}>
          {movie.genres.map((genre, index) => (
            <GenreChip key={genre.id} name={genre.name} index={index} />
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>
          {movie.overview || 'No overview available for this title yet.'}
        </Text>
        {runtime ? <Text style={styles.meta}>Runtime · {runtime}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    justifyContent: 'flex-end',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroFallback: {
    backgroundColor: palette.placeholder,
  },
  scrimTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    experimental_backgroundImage: gradients.scrimTop,
    opacity: 0.7,
  },
  scrimBottom: {
    ...StyleSheet.absoluteFill,
    experimental_backgroundImage: gradients.scrimBottom,
  },
  heroHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenPadding,
    paddingBottom: spacing.md,
  },
  heroHeaderTitle: {
    ...typography.title,
    color: colors.text.inverse,
    marginLeft: spacing.md,
  },
  heroBody: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  heroTitle: {
    ...typography.heroTitle,
    color: colors.text.inverse,
    textAlign: 'center',
  },
  inTheaters: {
    ...typography.labelAccent,
    color: colors.text.accent,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  cta: {
    alignSelf: 'stretch',
    marginTop: spacing.sm,
  },
  section: {
    paddingHorizontal: screenPadding,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginTop: spacing.lg,
    marginHorizontal: screenPadding,
  },
  overview: {
    ...typography.body,
    color: colors.text.secondary,
  },
  meta: {
    ...typography.meta,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
});
