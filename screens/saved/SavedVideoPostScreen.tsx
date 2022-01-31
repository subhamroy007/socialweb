import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { globalColors, globalLayouts } from "../../utility/styles";

const SavedVideoPostScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    ></SafeAreaView>
  );
};

export default SavedVideoPostScreen;
