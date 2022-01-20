import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalColors } from "../../utility/styles";

const ShutterFooter = () => {
  return (
    <SafeAreaView
      style={[styles.shutterFooter, globalColors.shutterFooterColor]}
      edges={[]}
    ></SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shutterFooter: {
    flex: 3,
    width: "100%",
    borderTopWidth: 1,
  },
});

export default ShutterFooter;
