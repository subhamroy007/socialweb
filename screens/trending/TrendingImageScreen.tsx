import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { globalColors, globalLayouts } from "../../utility/styles";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import ImageGallery from "../../components/global/ImageGallery";

const TrendingImageScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    ></SafeAreaView>
  );
};

export default TrendingImageScreen;
