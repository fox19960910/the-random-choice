import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { createRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import AddWheelScreen from "../screens/AddWheelScreen"; // Adjust the path as necessary
import StartScreen from "../screens/StartScreen"; // Adjust the path as necessary
import WheelScreen from "../screens/WheelScreen"; // Adjust the path as necessary
import WheelListScreen from "../screens/WheelListScreen";
import { Wheel } from "../types";
import EditWheelScreen from "../screens/EditWheelScreen";
import { TouchableOpacity } from "react-native";
import { COLOR } from "../constants/color";
import SettingScreen from "../screens/Setting";
import { useTranslation } from "react-i18next";

export type RootStackParamList = {
  Start: undefined;
  WheelList: undefined;
  AddWheel: undefined;
  Wheel: { wheel: Wheel };
  EditWheel: { wheel: Wheel };
  Setting: undefined;
};
export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  navigationRef.current?.navigate(name, params);
}
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { t } = useTranslation();
  return (
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
          options={{
            title: t("your_wheels"),
            headerStyle: { backgroundColor: COLOR.PRIMARY },
            headerTintColor: "#fff",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigate("Setting")}
              >
                <Icon name="home" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AddWheel"
          component={AddWheelScreen}
          options={{ title: t("create_new_wheel") }}
        />
        <Stack.Screen
          name="EditWheel"
          component={EditWheelScreen}
          options={{ title: t("update_your_wheel") }}
        />
        <Stack.Screen
          name="Wheel"
          component={WheelScreen}
          options={{
            title: t("wheel_fortune"),
            headerStyle: { backgroundColor: COLOR.PRIMARY },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{ title: t("setting") }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
