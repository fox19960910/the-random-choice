import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddWheelScreen from '../screens/AddWheelScreen'; // Adjust the path as necessary
import StartScreen from '../screens/StartScreen'; // Adjust the path as necessary
import WheelScreen from '../screens/WheelScreen'; // Adjust the path as necessary
import WheelListScreen from '../screens/WheelListScreen';
import { Wheel } from '../types';


export type RootStackParamList = {
  Start: undefined;
  WheelList: undefined;
  AddWheel: undefined;
  Wheel: { wheel: Wheel};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WheelList" component={WheelListScreen} options={{ title: 'Your Wheels' }} />
      <Stack.Screen name="AddWheel" component={AddWheelScreen} options={{ title: 'Create New Wheel' }} />
      <Stack.Screen name="Wheel" component={WheelScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
