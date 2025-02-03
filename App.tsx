import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Board from "./src/components/Board";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>XOX Oyunu</Text>
      <Board />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 40,
    color: "#34495e",
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 3,
  },
});

export default App;
