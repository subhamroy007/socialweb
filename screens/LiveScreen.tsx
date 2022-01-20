import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalColors, globalLayouts } from "../utility/styles";
import { RegularText } from "../utility/ui";

const LiveScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      <RegularText>Live Screen</RegularText>
    </SafeAreaView>
  );
};

export default LiveScreen;
