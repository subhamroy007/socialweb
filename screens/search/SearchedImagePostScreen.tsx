import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import ImageGallery from "../../components/global/ImageGallery";
import LoadingScreenPlaceHolder from "../../components/global/LoadingScreenPlaceHolder";
import RoundedIcon from "../../components/global/RoundedIcon";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import { SIZE_REF_14, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";
import { globalColors, globalLayouts } from "../../utility/styles";
import { MediumText } from "../../utility/ui";

const SearchedImagePostScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    ></SafeAreaView>
  );
};
export default SearchedImagePostScreen;
