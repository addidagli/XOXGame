import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  value: "X" | "O" | null;
  onPress: () => void;
  isFading: boolean;
};

const Cell = ({ value, onPress, isFading }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isFading && value !== null ? styles.fadingCell : null, // 🆕 Reset sonrası yanlış solukluk engellendi
      ]}
      onPress={onPress}
    >
      <Text style={[styles.cellText, value === "X" ? styles.xText : styles.oText]}>
        {value}
      </Text>
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
    borderColor: "#34495e", // Koyu lacivert border
    backgroundColor: "#ffffff",
  },
  cellText: {
    fontSize: 48,
    fontWeight: "800",
  },
  xText: {
    color: "#e74c3c", // Klasik kırmızı
  },
  oText: {
    color: "#3498db", // Klasik mavi
  },
  fadingCell: {
    backgroundColor: '#f8f9fa',
    opacity: 0.7,
  },
});

export default Cell;
