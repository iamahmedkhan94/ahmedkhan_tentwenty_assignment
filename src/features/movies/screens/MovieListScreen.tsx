import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Movie } from '../../../types/tmdb';
import { ApiError } from '../../../services/apiClient';
import { useUpcomingMovies } from '../hooks/useUpcomingMovies';
import { MovieCard } from '../components/MovieCard';
import { EmptyView, ErrorView, LoadingView } from '../../../components/StateView';
import { SearchIcon } from '../../../components/icons/SearchIcon';
import { colors, screenPadding, spacing, typography } from '../../../theme';

export function MovieListScreen() {
  const insets = useSafeAreaInsets();
  const {
    movies,
    error,
    isPending,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUpcomingMovies();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Movie>) => <MovieCard movie={item} />,
    [],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderBody = () => {
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
      return <EmptyView message="No upcoming movies right now." />;
    }

    return (
      <FlatList
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              style={styles.footer}
              color={colors.primary}
            />
          ) : null
        }
      />
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Watch</Text>
        <TouchableOpacity
          hitSlop={spacing.sm}
          accessibilityRole="button"
          accessibilityLabel="Search movies">
          <SearchIcon />
        </TouchableOpacity>
      </View>
      {renderBody()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenPadding,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.text.primary,
  },
  listContent: {
    padding: screenPadding,
  },
  footer: {
    marginBottom: spacing.lg,
  },
});
