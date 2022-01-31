import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import HashTagList from "../../components/global/HashTagList";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { globalColors, globalLayouts } from "../../utility/styles";

const SavedHashTagScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {/* <HashTagList
          dataState={state}
          ids={idList}
          onEndReach={onEndReachCallback}
        /> */}
      )
    </SafeAreaView>
  );
};

export default SavedHashTagScreen;
