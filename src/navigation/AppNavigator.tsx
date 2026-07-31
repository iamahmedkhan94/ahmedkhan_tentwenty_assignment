import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';
import { MainTabNavigator } from './MainTabNavigator';
import { MovieDetailScreen } from '../features/movies/screens/MovieDetailScreen';
import { TrailerScreen } from '../features/movies/screens/TrailerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={MainTabNavigator} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
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
