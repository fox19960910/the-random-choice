import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Animated } from "react-native";

type BlinkingTextProps = {
  text: string;
  duration?: number; // Thời gian nhấp nháy, đơn vị là milliseconds
};

const BlinkingText: React.FC<BlinkingTextProps> = ({
  text,
  duration = 1000,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const blinking = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );
    blinking.start();

    return () => blinking.stop(); // Clean up animation when component unmounts
  }, [fadeAnim, duration]);

  return (
    <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
      {text}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});

export default BlinkingText;
