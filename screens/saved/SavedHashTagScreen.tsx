import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import HashTagList from "../../components/global/HashTagList";
import { getSavedHashTagThunk } from "../../store/appData/reducer";
import {
  selectSavedHashTagIdList,
  selectSavedHashTagScreenState,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { globalColors, globalLayouts } from "../../utility/styles";

const SavedHashTagScreen = () => {
  const state = useAppSelector(selectSavedHashTagScreenState);
  const idList = useAppSelector(selectSavedHashTagIdList);

  const dispatch = useAppDispatch();

  const onEndReachCallback = useCallback(() => {
    dispatch(getSavedHashTagThunk({ initRequest: false }));
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {!idList || idList.length === 0 ? (
        <BlankScreenPlaceHolder icon="hashtag-solid" text="no saved hashtags" />
      ) : (
        <HashTagList
          dataState={state}
          ids={idList}
          onEndReach={onEndReachCallback}
        />
      )}
    </SafeAreaView>
  );
};

export default SavedHashTagScreen;
