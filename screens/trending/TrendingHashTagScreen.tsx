import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import HashTagList from "../../components/global/HashTagList";
import { getTrendingHashTagThunk } from "../../store/appData/reducer";
import {
  selectTrendingHashTagIdList,
  selectTrendingHashTagState,
  selectTrendingScreenError,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { globalColors, globalLayouts } from "../../utility/styles";

const TrendingHashTagScreen = () => {
  const state = useAppSelector(selectTrendingHashTagState);
  const error = useAppSelector(selectTrendingScreenError);

  const idList = useAppSelector(selectTrendingHashTagIdList);

  const dispatch = useAppDispatch();

  const onEndReachCallback = useCallback(() => {
    dispatch(getTrendingHashTagThunk({ initRequest: false }));
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      {!idList || idList.length === 0 ? (
        <BlankScreenPlaceHolder
          icon="hashtag-solid"
          text="no trending hashtags"
        />
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

export default TrendingHashTagScreen;
