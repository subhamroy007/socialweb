import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import VideoCollection from "../../components/global/VideoCollection";
import { getSavedVideoPostThunk } from "../../store/appData/reducer";
import {
  selectSavedVideoPostIdList,
  selectSavedVideoPostScreenState,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { globalColors, globalLayouts } from "../../utility/styles";

const SavedVideoPostScreen = () => {
  const state = useAppSelector(selectSavedVideoPostScreenState);
  const idList = useAppSelector(selectSavedVideoPostIdList);

  const dispatch = useAppDispatch();
  const onEndReachCallback = useCallback(() => {
    dispatch(getSavedVideoPostThunk({ initRequest: false }));
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {!idList || idList.length === 0 ? (
        <BlankScreenPlaceHolder icon="video-outline" text="no saved videos" />
      ) : (
        <VideoCollection
          dataState={state}
          ids={idList}
          onEndReach={onEndReachCallback}
        />
      )}
    </SafeAreaView>
  );
};

export default SavedVideoPostScreen;
