import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { RootStackParamList } from '../../../navigation/navigationTypes';
import { colors, screenPadding, spacing, typography } from '../../../theme';

type TrailerRoute = RouteProp<RootStackParamList, 'Trailer'>;

export function TrailerScreen() {
  const { params } = useRoute<TrailerRoute>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [ready, setReady] = useState(false);

  const [playing, setPlaying] = useState(false);

  const close = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleStateChange = useCallback(
    (state: string) => {
      if (state === 'ended') {
        close();
      }
    },
    [close],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Text style={styles.title} numberOfLines={1}>
          {params.title}
        </Text>
        <TouchableOpacity
          onPress={close}
          hitSlop={spacing.md}
          accessibilityRole="button"
          accessibilityLabel="Done">
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.playerWrapper}>
        {!ready ? (
          <ActivityIndicator
            style={StyleSheet.absoluteFill}
            color={colors.primary}
          />
        ) : null}
        <YoutubePlayer
          height={width * (9 / 16)}
          width={width}
          videoId={params.videoKey}
          play={playing}
          onReady={() => {
            setReady(true);
            setPlaying(true);
          }}
          onChangeState={handleStateChange}
          onError={close}
          forceAndroidAutoplay
          initialPlayerParams={{ modestbranding: true, rel: false }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.overlay.player,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screenPadding,
    paddingBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text.inverse,
    flex: 1,
    marginRight: spacing.md,
  },
  done: {
    ...typography.title,
    color: colors.primary,
  },
  playerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
