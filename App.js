import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HooksTabScreen from './HooksTabScreen';
import MobXTabScreen from './MobXTabScreen';
import { WeightHeightProvider } from './WeightHeightContext'; // Import the context provider
import AppNavigator from './Navigation';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <WeightHeightProvider>
      <AppNavigator />
    </WeightHeightProvider> 
  );
};

export default App;
