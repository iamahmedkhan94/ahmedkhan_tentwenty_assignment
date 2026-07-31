import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { Movie } from '../../../types/tmdb';
import { ApiError } from '../../../services/apiClient';
import { useDebouncedValue } from '../../../utils/useDebouncedValue';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { useGenres } from '../hooks/useGenres';
import { useGenreTiles, GenreTile } from '../hooks/useGenreTiles';
import { SearchInput } from '../components/SearchInput';
import { SearchResultRow } from '../components/SearchResultRow';
import { GenreTileCard } from '../components/GenreTileCard';
import { EmptyView, ErrorView, LoadingView } from '../../../components/StateView';
import {
  colors,
  screenPadding,
  spacing,
  typography,
} from '../../../theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function SearchScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const [term, setTerm] = useState('');
  const debouncedTerm = useDebouncedValue(term);

  const { genresById } = useGenres();
  const tiles = useGenreTiles();
  const {
    movies,
    totalResults,
    isActive,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovieSearch(debouncedTerm);

  const openMovie = useCallback(
    (movie: Movie) => {
      navigation.navigate('MovieDetail', {
        movieId: movie.id,
        title: movie.title,
      });
    },
    [navigation],
  );

  const genreLabelFor = useCallback(
    (movie: Movie) => {
      const first = movie.genre_ids?.[0];
      return first ? genresById.get(first) : undefined;
    },
    [genresById],
  );

  const renderResult = useCallback(
    ({ item }: ListRenderItemInfo<Movie>) => (
      <SearchResultRow
        movie={item}
        genreLabel={genreLabelFor(item)}
        onPress={openMovie}
      />
    ),
    [genreLabelFor, openMovie],
  );

  const renderTile = useCallback(
    ({ item }: ListRenderItemInfo<GenreTile>) => <GenreTileCard tile={item} />,
    [],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderBody = () => {
    if (!isActive) {
      return (
        <FlatList
          data={tiles}
          keyExtractor={item => String(item.id)}
          renderItem={renderTile}
          numColumns={2}
          contentContainerStyle={styles.tileContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      );
    }

    if (isPending) {
      return <LoadingView />;
    }

    if (isError) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Something went wrong. Please try again.';
      return <ErrorView message={message} onRetry={refetch} />;
    }

    if (movies.length === 0) {
      return <EmptyView message={`No results for “${debouncedTerm}”.`} />;
    }

    return (
      <FlatList
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={renderResult}
        contentContainerStyle={styles.resultContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <Text style={styles.resultsLabel}>
            {totalResults} Results Found
          </Text>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.footer} color={colors.primary} />
          ) : null
        }
      />
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <SearchInput
          value={term}
          onChangeText={setTerm}
          onClear={() => setTerm('')}
        />
      </View>
      {renderBody()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: screenPadding,
    paddingVertical: spacing.md,
  },
  tileContent: {
    paddingHorizontal: screenPadding - spacing.xs,
    paddingBottom: spacing.xl,
  },
  resultContent: {
    paddingHorizontal: screenPadding,
    paddingBottom: spacing.xl,
  },
  resultsLabel: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  footer: {
    marginVertical: spacing.md,
  },
});
