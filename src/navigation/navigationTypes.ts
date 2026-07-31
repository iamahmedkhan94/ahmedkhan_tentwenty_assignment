import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Dashboard: undefined;
  Watch: undefined;
  MediaLibrary: undefined;
  More: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  Search: undefined;
  MovieDetail: { movieId: number; title: string };
  Trailer: { videoKey: string; title: string };
  Showtimes: { movieId: number; title: string; releaseDate?: string };
  SeatSelection: {
    title: string;
    date: string;
    time: string;
    hall: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
