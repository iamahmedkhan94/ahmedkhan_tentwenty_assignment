import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Seat, SeatRow } from '../types';
import { SeatShape } from './SeatShape';
import { colors, spacing, typography } from '../../../theme';

type Props = {
  rows: SeatRow[];
  selectedIds: Set<string>;
  onSelect?: (seat: Seat) => void;
  seatSize?: number;
  gap?: number;
  showRowNumbers?: boolean;
};

function seatFill(seat: Seat, selected: boolean) {
  if (selected) {
    return { color: colors.seat.selected, opacity: 1 };
  }
  if (seat.kind === 'unavailable') {
    return { color: colors.seat.unavailable, opacity: 0.5 };
  }
  if (seat.kind === 'vip') {
    return { color: colors.seat.vip, opacity: 1 };
  }
  return { color: colors.seat.regular, opacity: 1 };
}

export function SeatGrid({
  rows,
  selectedIds,
  onSelect,
  seatSize = 12,
  gap = 4,
  showRowNumbers = true,
}: Props) {
  const rowLabelWidth = { width: seatSize + gap * 2 };

  return (
    <View>
      {rows.map(row => (
        <View key={row.row} style={[styles.row, { marginBottom: gap }]}>
          {showRowNumbers ? (
            <Text style={[styles.rowLabel, rowLabelWidth]}>{row.row}</Text>
          ) : null}

          {row.blocks.map((block, blockIndex) => {
            const isLastBlock = blockIndex === row.blocks.length - 1;
            const blockStyle = {
              marginRight: isLastBlock ? 0 : seatSize + gap,
            };

            return (
              <View key={blockIndex} style={[styles.block, blockStyle]}>
                {block.map(seat => {
                  const selected = selectedIds.has(seat.id);
                  const disabled = seat.kind === 'unavailable' || !onSelect;
                  const fill = seatFill(seat, selected);
                  const seatStyle = { marginRight: gap };

                  return (
                    <TouchableOpacity
                      key={seat.id}
                      disabled={disabled}
                      activeOpacity={0.6}
                      hitSlop={gap / 2}
                      onPress={() => onSelect?.(seat)}
                      accessibilityRole="button"
                      accessibilityLabel={`Row ${row.row} seat ${seat.number}`}
                      style={seatStyle}>
                      <SeatShape
                        width={seatSize}
                        color={fill.color}
                        opacity={fill.opacity}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    ...typography.caption,
    fontSize: 8,
    lineHeight: 10,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  block: {
    flexDirection: 'row',
  },
});
