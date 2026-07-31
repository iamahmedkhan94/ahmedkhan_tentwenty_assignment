import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './navigationTypes';
import { PlaceholderScreen } from './PlaceholderScreen';
import { MovieListScreen } from '../features/movies/screens/MovieListScreen';
import { colors, fontFamily, fontSize } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const Dashboard = () => <PlaceholderScreen title="Dashboard" />;
const MediaLibrary = () => <PlaceholderScreen title="Media Library" />;
const More = () => <PlaceholderScreen title="More" />;

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Watch"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.text.primary,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.medium,
          fontSize: fontSize.xs,
        },
      }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Watch" component={MovieListScreen} />
      <Tab.Screen
        name="MediaLibrary"
        component={MediaLibrary}
        options={{ title: 'Media Library' }}
      />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}
