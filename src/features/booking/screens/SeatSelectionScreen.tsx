import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { seatLayout } from '../data/seatLayout';
import { Seat } from '../types';
import { useBookingStore, totalPrice } from '../../../store/useBookingStore';
import { BookingHeader } from '../components/BookingHeader';
import { ScreenCurve } from '../components/ScreenCurve';
import { SeatGrid } from '../components/SeatGrid';
import { SeatLegend } from '../components/SeatLegend';
import { PillButton } from '../../../components/PillButton';
import {
  colors,
  palette,
  radius,
  screenPadding,
  spacing,
  typography,
} from '../../../theme';

type SeatRoute = RouteProp<RootStackParamList, 'SeatSelection'>;

const MIN_SCALE = 1;
const MAX_SCALE = 2.2;
const BASE_SEAT = 12;
const BASE_GAP = 4;

function ZoomButton({
  kind,
  onPress,
}: {
  kind: 'in' | 'out';
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.zoomButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={kind === 'in' ? 'Zoom in' : 'Zoom out'}>
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path
          d="M5 12H19"
          stroke={colors.text.primary}
          strokeWidth={2}
          strokeLinecap="round"
        />
        {kind === 'in' ? (
          <Path
            d="M12 5V19"
            stroke={colors.text.primary}
            strokeWidth={2}
            strokeLinecap="round"
          />
        ) : null}
      </Svg>
    </TouchableOpacity>
  );
}

export function SeatSelectionScreen() {
  const { params } = useRoute<SeatRoute>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [scale, setScale] = useState(1);
  const selectedSeats = useBookingStore(state => state.selectedSeats);
  const toggleSeat = useBookingStore(state => state.toggleSeat);
  const removeSeat = useBookingStore(state => state.removeSeat);

  const selectedIds = useMemo(
    () => new Set(selectedSeats.map(seat => seat.id)),
    [selectedSeats],
  );

  const total = totalPrice(selectedSeats);
  const mapWidth = width - screenPadding * 2;

  const onSeatPress = (seat: Seat) => toggleSeat(seat);

  return (
    <View style={styles.container}>
      <BookingHeader
        title={params.title}
        subtitle={`${params.date}  |  ${params.time} ${params.hall}`}
        onBack={navigation.goBack}
      />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}>
        <ScreenCurve width={mapWidth} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.mapScroll}>
          <SeatGrid
            rows={seatLayout}
            selectedIds={selectedIds}
            onSelect={onSeatPress}
            seatSize={BASE_SEAT * scale}
            gap={BASE_GAP * scale}
          />
        </ScrollView>

        <View style={styles.zoomRow}>
          <ZoomButton
            kind="in"
            onPress={() => setScale(s => Math.min(MAX_SCALE, s + 0.2))}
          />
          <ZoomButton
            kind="out"
            onPress={() => setScale(s => Math.max(MIN_SCALE, s - 0.2))}
          />
        </View>

        <SeatLegend />

        {selectedSeats.length > 0 ? (
          <View style={styles.chips}>
            {selectedSeats.map(seat => (
              <View key={seat.id} style={styles.chip}>
                <Text style={styles.chipSeat}>{seat.number}</Text>
                <Text style={styles.chipRow}>/ {seat.row} row</Text>
                <TouchableOpacity
                  onPress={() => removeSeat(seat.id)}
                  hitSlop={spacing.sm}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove seat ${seat.number}`}>
                  <Svg width={14} height={14} viewBox="0 0 24 24">
                    <Path
                      d="M7 7L17 17M17 7L7 17"
                      stroke={colors.text.secondary}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <View
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>$ {total}</Text>
        </View>
        <PillButton
          label="Proceed to pay"
          style={styles.payButton}
          disabled={selectedSeats.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  mapScroll: {
    paddingBottom: spacing.md,
  },
  zoomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.lg,
  },
  zoomButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    shadowColor: palette.black,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipSeat: {
    ...typography.title,
    color: colors.text.primary,
  },
  chipRow: {
    ...typography.caption,
    color: colors.text.secondary,
    marginHorizontal: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenPadding,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
  },
  totalBox: {
    backgroundColor: colors.background,
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.md,
  },
  totalLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  totalValue: {
    ...typography.title,
    color: colors.text.primary,
  },
  payButton: {
    flex: 1,
  },
});
