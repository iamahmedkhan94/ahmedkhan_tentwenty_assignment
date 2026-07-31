import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/services/queryClient';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
