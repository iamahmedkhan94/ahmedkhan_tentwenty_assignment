import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './navigationTypes';
import { PlaceholderScreen } from './PlaceholderScreen';
import { MovieListScreen } from '../features/movies/screens/MovieListScreen';
import {
  DashboardIcon,
  MediaLibraryIcon,
  MoreIcon,
  TabIconProps,
  WatchIcon,
} from '../components/icons/TabIcons';
import { colors, palette, radius, spacing, typography } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const Dashboard = () => <PlaceholderScreen title="Dashboard" />;
const MediaLibrary = () => <PlaceholderScreen title="Media Library" />;
const More = () => <PlaceholderScreen title="More" />;

const icon =
  (Icon: (props: TabIconProps) => React.JSX.Element) =>
  ({ color }: { color: string }) =>
    <Icon color={color} size={22} />;

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Watch"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text.inverse,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: palette.darkPurple,
          borderTopWidth: 0,
          borderTopLeftRadius: radius.tabBar,
          borderTopRightRadius: radius.tabBar,
          overflow: 'hidden',
          paddingTop: spacing.sm,
        },
        tabBarLabelStyle: typography.label,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ tabBarIcon: icon(DashboardIcon) }}
      />
      <Tab.Screen
        name="Watch"
        component={MovieListScreen}
        options={{ tabBarIcon: icon(WatchIcon) }}
      />
      <Tab.Screen
        name="MediaLibrary"
        component={MediaLibrary}
        options={{ title: 'Media Library', tabBarIcon: icon(MediaLibraryIcon) }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{ tabBarIcon: icon(MoreIcon) }}
      />
    </Tab.Navigator>
  );
}
