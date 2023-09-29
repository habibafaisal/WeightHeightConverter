import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HooksTabScreen from './src/screens/HooksTabScreen';
import MobXTabScreen from './src/screens/MobXTabScreen';
import {WeightHeightProvider} from './src/state/WeightHeightContext'; // Import the context provider
import AppNavigator from './src/navigation/Navigation';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <WeightHeightProvider>
      <AppNavigator />
    </WeightHeightProvider>
  );
};

export default App;
