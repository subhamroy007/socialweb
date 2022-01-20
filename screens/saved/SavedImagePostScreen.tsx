import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import ImageGallery from "../../components/global/ImageGallery";
import { getSavedImagePostThunk } from "../../store/appData/reducer";
import {
  selectSavedImagePostIdList,
  selectSavedImagePostScreenState,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { globalColors, globalLayouts } from "../../utility/styles";

const SavedImagePostScreen = () => {
  const state = useAppSelector(selectSavedImagePostScreenState);
  const idList = useAppSelector(selectSavedImagePostIdList);

  const dispatch = useAppDispatch();

  const onEndReachCallback = useCallback(() => {
    dispatch(getSavedImagePostThunk({ initRequest: false }));
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {!idList || idList.length === 0 ? (
        <BlankScreenPlaceHolder icon="camera-outline" text="no saved images" />
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

export default SavedImagePostScreen;
