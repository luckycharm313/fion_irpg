import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './NavigationService';

import Home from 'app/screens/Home';

import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
const LoggedInStack = createStackNavigator();

const HomeNavigator = () => (
  <LoggedInStack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </LoggedInStack.Navigator>
);

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeStack" component={HomeNavigator} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
