import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { getRandomColor, getRandomPastelColor } from "../utils/color";

interface WheelComponentProps {
  segments: string[];
  winningSegment: string;
  onFinished: (segment: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  outlineWidth?: number;
}

const WheelComponent = ({
  segments,
  winningSegment,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "Spin",
  isOnlyOnce = true,
  size = Dimensions.get("window").width * 0.8,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = "Arial",
  fontSize = 16,
  outlineWidth = 10,
}: WheelComponentProps) => {
  const [isFinished, setFinished] = useState(false);
  const [currentSegment, setCurrentSegment] = useState("");
  const angle = useSharedValue(0);

  const numberOfSegments = segments.length;
  const anglePerSegment = 360 / numberOfSegments;
  const [segColors, setSegColors] = useState<string[]>([]);

  useEffect(() => {
    const colors = segments.map(() => getRandomPastelColor());
    setSegColors(colors);
  }, [segments]);

  const handleSpinFinish = (winningSegmentName: string) => {
    console.log("winningSegmentName:", winningSegmentName);
    setCurrentSegment(winningSegmentName);
    setFinished(true);
    onFinished(winningSegmentName);
  };
  const spinWheel = () => {
    const spinAngle = Math.floor(Math.random() * 360) + 360 * 5; // Quay ít nhất 5 vòng
    console.log("spinAngle, ", spinAngle);

    angle.value = withTiming(
      angle.value + spinAngle,
      {
        duration: 5000,
        easing: Easing.out(Easing.cubic),
      },
      (isFinishedAnimation) => {
        if (isFinishedAnimation) {
          const rotation = angle.value % 360;
          const adjustedRotation = (360 - rotation) % 360; // Đảm bảo đúng hướng quay
          const winnerIndex = Math.floor(
            (adjustedRotation / 360) * numberOfSegments
          );
          const winningSegmentName = segments[winnerIndex];
          if (winningSegmentName) runOnJS(handleSpinFinish)(winningSegmentName);
        }
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${angle.value}deg` }],
    };
  });

  const wheelSize = size + 10 + outlineWidth;
  const center = wheelSize / 2;
  console.log("wheelSize:", wheelSize);
  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        <Animated.View style={[animatedStyle]}>
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${wheelSize} ${wheelSize}`}
          >
            <G rotation={-90} origin={`${center}, ${center}`}>
              {segments.map((segment, index) => {
                const startAngle = index * anglePerSegment;
                const endAngle = startAngle + anglePerSegment;
                const largeArcFlag = anglePerSegment > 180 ? 1 : 0;
                const x1 =
                  center + center * Math.cos((Math.PI * startAngle) / 180);
                const y1 =
                  center + center * Math.sin((Math.PI * startAngle) / 180);
                const x2 =
                  center + center * Math.cos((Math.PI * endAngle) / 180);
                const y2 =
                  center + center * Math.sin((Math.PI * endAngle) / 180);

                return (
                  <Path
                    key={`segment-${index}`}
                    d={`M${center},${center} L${x1},${y1} A${center},${center} 0 ${largeArcFlag} 1 ${x2},${y2} z`}
                    fill={segColors[index % segColors.length]}
                    stroke={segColors[index % segColors.length]}
                    strokeWidth={1} // Viền dày hơn
                    opacity={0.7} // Opacity cho viền
                  />
                );
              })}
              {segments.map((segment, index) => {
                const angleValue =
                  index * anglePerSegment + anglePerSegment / 2;
                const x =
                  center +
                  (center - 70) * Math.cos((Math.PI * angleValue) / 180);
                const y =
                  center +
                  (center - 70) * Math.sin((Math.PI * angleValue) / 180);
                return (
                  <SvgText
                    key={`label-${index}`}
                    x={x}
                    y={y}
                    fill={contrastColor}
                    fontSize={fontSize}
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${angleValue}, ${x}, ${y})`}
                  >
                    {segment}
                  </SvgText>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
        {/* Con trỏ chỉ định */}
        <TouchableOpacity
          onPress={spinWheel}
          disabled={isFinished && isOnlyOnce}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
        <View style={styles.pointer} />
      </View>

      {isFinished && (
        <Text style={styles.resultText}>Bạn đã trúng: {currentSegment}</Text>
      )}
    </View>
  );
};

export default WheelComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  wheelContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pointer: {
    position: "absolute",
    top: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
    transform: [{ rotate: "180deg" }],
  },
  button: {
    backgroundColor: "#FF6347",
    width: 50,
    height: 50,
    position: "absolute",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});
