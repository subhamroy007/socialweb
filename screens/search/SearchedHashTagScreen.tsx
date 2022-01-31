import { useFocusEffect } from "@react-navigation/native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import HashTagList from "../../components/global/HashTagList";
import LoadingScreenPlaceHolder from "../../components/global/LoadingScreenPlaceHolder";
import RoundedIcon from "../../components/global/RoundedIcon";

import {
  SIZE_REF_10,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { globalColors, globalLayouts } from "../../utility/styles";
import { MediumText } from "../../utility/ui";

const SearchedHashTagScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    ></SafeAreaView>
  );
};

export default SearchedHashTagScreen;
