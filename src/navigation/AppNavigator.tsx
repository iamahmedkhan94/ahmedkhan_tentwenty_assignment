import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';
import { MainTabNavigator } from './MainTabNavigator';
import { MovieDetailScreen } from '../features/movies/screens/MovieDetailScreen';
import { SearchScreen } from '../features/movies/screens/SearchScreen';
import { TrailerScreen } from '../features/movies/screens/TrailerScreen';
import { ShowtimeScreen } from '../features/booking/screens/ShowtimeScreen';
import { SeatSelectionScreen } from '../features/booking/screens/SeatSelectionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={MainTabNavigator} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
        <Stack.Screen name="Showtimes" component={ShowtimeScreen} />
        <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
        <Stack.Screen
          name="Trailer"
          component={TrailerScreen}
          options={{
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
