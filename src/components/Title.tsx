import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  underline: {
    marginTop: 8,
    width: "60%",
    height: 4,
    backgroundColor: "#a8e6cf",
    borderRadius: 2,
  },
});

export default Title;
