import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import AddWheelScreen from "../screens/AddWheelScreen";
import StartScreen from "../screens/StartScreen";
import WheelScreen from "../screens/WheelScreen";
import WheelListScreen from "../screens/WheelListScreen";
import EditWheelScreen from "../screens/EditWheelScreen";
import SettingScreen from "../screens/Setting";
import { Wheel } from "../types";
import { TouchableOpacity } from "react-native";
import { COLOR } from "../constants/color";
import { useTranslation } from "react-i18next";

export type RootStackParamList = {
  Start: undefined;
  WheelList: undefined;
  AddWheel: undefined;
  Wheel: { wheel: Wheel };
  EditWheel: { wheel: Wheel };
  Setting: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const StartStack = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
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
              onPress={() => navigation.navigate("Setting")}
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
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "List") {
              iconName = "list";
            } else if (route.name === "Create") {
              iconName = "plus-circle";
            } else if (route.name === "Setting") {
              iconName = "cog";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
        // tabBarOptions={{
        //   activeTintColor: "#ff8c00",
        //   inactiveTintColor: "#8e8e8e",
        // }}
      >
        <Tab.Screen name="Home" component={StartStack} />
        <Tab.Screen name="List" component={WheelListScreen} />
        <Tab.Screen name="Create" component={AddWheelScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
