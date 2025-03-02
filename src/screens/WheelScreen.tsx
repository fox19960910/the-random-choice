import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,

} from "react-native";
import "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

import { SafeAreaView } from "react-native-safe-area-context";

import WheelComponent from "../components/WheelComponent";

type WheelScreenRouteProp = RouteProp<RootStackParamList, "Wheel">;

interface Props {
  route: WheelScreenRouteProp;
}

const WheelScreen: React.FC<Props> = ({ route }) => {
  const { wheel } = route.params;
  const segments = wheel.choices;
  const onWheelFinished = (winner: string) => {
    console.log('Kết quả: ', winner);
  };
  return (

    <SafeAreaView style={styles.container}>
      <WheelComponent
        segments={segments}
        winningSegment=""
        onFinished={onWheelFinished}
        primaryColor="black"
        contrastColor="white"
        buttonText="Quay"
        isOnlyOnce={false}
        size={350}
        upDuration={100}
        downDuration={1000}
        fontFamily="Arial"
        fontSize={16}
        outlineWidth={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffefd5",
    justifyContent: "center",
    alignItems: "center",
  },
  spinButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#ff8c00",
    padding: 20,
    borderRadius: 50,
  },
  spinText: {
    color: "#fff",
    fontSize: 24,
  },
  segment: {
    position: "absolute",
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  segmentText: {
    fontSize: 18,
  },
  winnerText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WheelScreen;
