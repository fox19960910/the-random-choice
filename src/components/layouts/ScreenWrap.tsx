import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = {
  children: React.ReactNode;
  onOptionPress?: () => void;
  optionButton?: React.ReactNode;
  backControlPath?: keyof RootStackParamList; // Cập nhật kiểu cho backControlPath
};

const ScreenWrapper = ({
  children,
  onOptionPress,
  optionButton,
  backControlPath,
}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleBackPress = () => {
    if (backControlPath) {
      navigation.navigate(backControlPath as any);
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="angle-left" size={40} color="#000" />
        </TouchableOpacity>
        {optionButton && (
          <TouchableOpacity onPress={onOptionPress} style={styles.optionButton}>
            {optionButton}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  optionButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
