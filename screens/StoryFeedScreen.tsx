import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalColors, globalLayouts } from "../utility/styles";
import { RegularText } from "../utility/ui";

const StoryFeedScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      <RegularText>Story Feed Screen</RegularText>
    </SafeAreaView>
  );
};

export default StoryFeedScreen;
