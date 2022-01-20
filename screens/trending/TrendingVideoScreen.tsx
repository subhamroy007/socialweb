import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import VideoCollection from "../../components/global/VideoCollection";
import { getTrendingVideoThunk } from "../../store/appData/reducer";
import {
  selectTrendingScreenError,
  selectTrendingVideoIdList,
  selectTrendingVideoState,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { globalColors, globalLayouts } from "../../utility/styles";

const TrendingVideoScreen = () => {
  const state = useAppSelector(selectTrendingVideoState);
  const error = useAppSelector(selectTrendingScreenError);

  const idList = useAppSelector(selectTrendingVideoIdList);

  const dispatch = useAppDispatch();

  const onEndReachCallback = useCallback(() => {
    dispatch(getTrendingVideoThunk({ initRequest: false }));
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      {!idList || idList.length === 0 ? (
        <BlankScreenPlaceHolder
          icon="video-outline"
          text="no trending videos"
        />
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

export default TrendingVideoScreen;
