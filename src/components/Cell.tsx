import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Animated } from "react-native";

type Props = {
  value: "X" | "O" | null;
  onPress: () => void;
  isFading: boolean;
  isWinning: boolean;
};

const Cell = ({ value, onPress, isFading, isWinning }: Props) => {
  const [blinkAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isWinning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, { toValue: 0.2, duration: 500, useNativeDriver: true }),
          Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      blinkAnim.setValue(1);
    }
  }, [isWinning]);

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isFading && value !== null ? styles.fadingCell : null,
      ]}
      onPress={onPress}
    >
      <Animated.Text
        style={[
          styles.cellText,
          value === "X" ? styles.xText : styles.oText,
          isWinning ? { opacity: blinkAnim } : null, // 🆕 Yanıp sönme efekti
        ]}
      >
        {value}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#34495e",
    backgroundColor: "#ffffff",
  },
  cellText: {
    fontSize: 48,
    fontWeight: "800",
  },
  xText: {
    color: "#e74c3c",
  },
  oText: {
    color: "#3498db",
  },
  fadingCell: {
    backgroundColor: "#f8f9fa",
    opacity: 0.7,
  },
});

export default Cell;
