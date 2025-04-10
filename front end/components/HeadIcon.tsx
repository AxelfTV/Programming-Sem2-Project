import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function HeadIcon() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/foxtrot-logo.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection:"row",
    justifyContent: "flex-start",
    zIndex: 999, 
  },
  image: {
    width: 150, 
    height: 100, 
    resizeMode: "contain",
  },
});

