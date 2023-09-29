import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HooksTabScreen from './HooksTabScreen';
import MobXTabScreen from './MobXTabScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: 'black'},
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'white',
        }}>
        <Tab.Screen
          name="Hooks"
          component={HooksTabScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" color="green" size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="MobX"
          component={MobXTabScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" color="green" size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
