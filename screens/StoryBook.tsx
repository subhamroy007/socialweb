import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalColors, globalLayouts } from "../utility/styles";
import { BoldText } from "../utility/ui";

const StoryBook = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.tabLayout, globalColors.screenColor]}
    >
      <BoldText>story book</BoldText>
    </SafeAreaView>
  );
};

export default StoryBook;
