import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Flex: React.FC<{
  children: React.ReactNode;
  alignItems?: "center";
  direction?: "row" | "column";
  justifyContent?: "flex-start" | "flex-end" | "space-between";
}> = ({
  children,
  alignItems = "center",
  direction = "row",
  justifyContent = "space-between",
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: direction,
      alignItems: alignItems,
      justifyContent: justifyContent,
    },
  });
  return <View style={styles.container}>{children}</View>;
};

export default Flex;
