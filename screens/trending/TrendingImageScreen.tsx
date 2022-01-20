import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTrendingImageThunk } from "../../store/appData/reducer";
import {
  selectTrendingImageIdList,
  selectTrendingImageState,
  selectTrendingScreenError,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { globalColors, globalLayouts } from "../../utility/styles";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import ImageGallery from "../../components/global/ImageGallery";

const TrendingImageScreen = () => {
  const state = useAppSelector(selectTrendingImageState);
  const error = useAppSelector(selectTrendingScreenError);

  const idList = useAppSelector(selectTrendingImageIdList);

  const dispatch = useAppDispatch();

  const onEndReachCallback = useCallback(() => {
    dispatch(getTrendingImageThunk({ initRequest: false }));
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      {!idList || idList.length === 0 ? (
        <BlankScreenPlaceHolder
          icon="camera-outline"
          text="no trending images"
        />
      ) : (
        <ImageGallery
          dataState={state}
          ids={idList}
          onEndReach={onEndReachCallback}
        />
      )}
    </SafeAreaView>
  );
};

export default TrendingImageScreen;
