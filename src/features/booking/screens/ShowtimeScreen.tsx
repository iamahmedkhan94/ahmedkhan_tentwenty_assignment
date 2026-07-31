import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { formatInTheaters } from '../../../utils/date';
import { buildDates, buildShowtimes } from '../data/showtimes';
import { BookingHeader } from '../components/BookingHeader';
import { DateChip } from '../components/DateChip';
import { ShowtimeCard } from '../components/ShowtimeCard';
import { PillButton } from '../../../components/PillButton';
import {
  colors,
  screenPadding,
  spacing,
  typography,
} from '../../../theme';

type ShowtimeRoute = RouteProp<RootStackParamList, 'Showtimes'>;
type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function ShowtimeScreen() {
  const { params } = useRoute<ShowtimeRoute>();
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();

  const dates = useMemo(() => buildDates(), []);
  const [dateId, setDateId] = useState(dates[0].id);
  const showtimes = useMemo(() => buildShowtimes(dateId), [dateId]);
  const [showtimeId, setShowtimeId] = useState(showtimes[0].id);

  const activeShowtime =
    showtimes.find(item => item.id === showtimeId) ?? showtimes[0];
  const activeDate = dates.find(item => item.id === dateId) ?? dates[0];

  const goToSeats = () => {
    navigation.navigate('SeatSelection', {
      title: params.title,
      date: activeDate.full,
      time: activeShowtime.time,
      hall: activeShowtime.hall,
    });
  };

  return (
    <View style={styles.container}>
      <BookingHeader
        title={params.title}
        subtitle={formatInTheaters(params.releaseDate)}
        onBack={navigation.goBack}
      />

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Date</Text>

        <FlatList
          data={dates}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
          contentContainerStyle={styles.dateRow}
          renderItem={({ item }) => (
            <DateChip
              label={item.label}
              selected={item.id === dateId}
              onPress={() => {
                setDateId(item.id);
                setShowtimeId(buildShowtimes(item.id)[0].id);
              }}
            />
          )}
        />

        <FlatList
          data={showtimes}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
          contentContainerStyle={styles.showtimeRow}
          renderItem={({ item }) => (
            <ShowtimeCard
              showtime={item}
              selected={item.id === showtimeId}
              onPress={() => setShowtimeId(item.id)}
            />
          )}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <PillButton label="Select Seats" onPress={goToSeats} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.text.primary,
    paddingHorizontal: screenPadding,
    marginBottom: spacing.md,
  },
  horizontalList: {
    flexGrow: 0,
  },
  dateRow: {
    paddingHorizontal: screenPadding,
    paddingBottom: spacing.xl,
  },
  showtimeRow: {
    paddingHorizontal: screenPadding,
  },
  footer: {
    paddingHorizontal: screenPadding,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
  },
});
