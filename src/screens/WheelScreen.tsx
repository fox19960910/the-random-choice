import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

import WheelComponent from "../components/WheelComponent";
import ScreenWrapper from "../components/layouts/ScreenWrap";
import { StackNavigationProp } from "@react-navigation/stack";
import Title from "../components/Title";
import { useTranslation } from "react-i18next";

type WheelScreenRouteProp = RouteProp<RootStackParamList, "Wheel">;
type WheelScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Wheel"
>;

interface Props {
  route: WheelScreenRouteProp;
  navigation: WheelScreenNavigationProp;
}

const WheelScreen: React.FC<Props> = ({ route, navigation }) => {
  const { wheel } = route.params;
  const segments = wheel.choices;

  const { t } = useTranslation();

  const onWheelFinished = (winner: string) => {
    console.log("Kết quả: ", winner);
  };
  const pressEdit = () => {
    // console.log("wheel: ", wheel);
    navigation.navigate("EditWheel", { wheel });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={pressEdit}>
          <Icon name="edit" size={30} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, wheel]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, marginTop: 10 }}>
        <Title text={wheel.name} />
        <View style={{ height: 40 }} />
        <WheelComponent
          segments={segments}
          winningSegment=""
          onFinished={onWheelFinished}
          primaryColor="black"
          contrastColor="white"
          buttonText="SPIN"
          isOnlyOnce={false}
          size={350}
          upDuration={100}
          downDuration={1000}
          fontFamily="Arial"
          fontSize={20}
          outlineWidth={5}
          resultText={t("result")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffefd5",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
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
    fontWeight: "bold",
  },
});

export default WheelScreen;
