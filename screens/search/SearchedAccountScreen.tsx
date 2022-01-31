import { useFocusEffect } from "@react-navigation/native";
import { PayloadAction } from "@reduxjs/toolkit";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountList from "../../components/global/AccountList";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import LoadingScreenPlaceHolder from "../../components/global/LoadingScreenPlaceHolder";
import RoundedIcon from "../../components/global/RoundedIcon";
import { SIZE_REF_14, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";
import { delay } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";
import { MediumText } from "../../utility/ui";

const SearchedAccountScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    ></SafeAreaView>
  );
};

export default SearchedAccountScreen;
