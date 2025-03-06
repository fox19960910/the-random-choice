import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { createRef } from "react";
import AddWheelScreen from "../screens/AddWheelScreen"; // Adjust the path as necessary
import StartScreen from "../screens/StartScreen"; // Adjust the path as necessary
import WheelScreen from "../screens/WheelScreen"; // Adjust the path as necessary
import WheelListScreen from "../screens/WheelListScreen";
import { Wheel } from "../types";
import EditWheelScreen from "../screens/EditWheelScreen";

export type RootStackParamList = {
  Start: undefined;
  WheelList: undefined;
  AddWheel: undefined;
  Wheel: { wheel: Wheel };
  EditWheel: { wheel: Wheel };
};
export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  navigationRef.current?.navigate(name, params);
}
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WheelList"
        component={WheelListScreen}
        options={{ title: "Your Wheels" }}
      />
      <Stack.Screen
        name="AddWheel"
        component={AddWheelScreen}
        options={{ title: "Create New Wheel" }}
      />
      <Stack.Screen
        name="EditWheel"
        component={EditWheelScreen}
        options={{ title: "Update Your Wheel" }}
      />
      <Stack.Screen
        name="Wheel"
        component={WheelScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
