import "react-native-gesture-handler";
import "react-native-reanimated";
import "./src/locales/i18n";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return <AppNavigator />;
}
