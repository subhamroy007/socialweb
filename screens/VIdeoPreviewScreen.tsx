import { StackScreenProps } from "@react-navigation/stack";
import { Video } from "expo-av";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  HandlerStateChangeEvent,
  ScrollView,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual } from "react-redux";
import Icon from "../components/global/Icon";
import LoadingIndicator from "../components/global/LoadingIndicator";
import RoundedIcon from "../components/global/RoundedIcon";
import VideoOverlay from "../components/videoPost/VideoOverlay";
import { RootState, useAppDispatch, useAppSelector } from "../store/appStore";
import {
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";
import { countAbbreviator, timeElapsed } from "../utility/helpers";
import { globalLayouts } from "../utility/styles";
import { RootStackNavigatorParamList } from "../utility/types";
import { InfoProps, MediaInfo } from "../utility/types";
import { MediumText, RegularText } from "../utility/ui";

type VideoPreviewScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "VideoPreviewScreen"
>;

const VideoPreviewScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: VideoPreviewScreenProps) => {
  const videoRef = useRef<Video>(null);

  return (
    <SafeAreaView style={globalLayouts.screenLayout}>
      <TapGestureHandler
        numberOfTaps={1}
        shouldCancelWhenOutside={true}
      ></TapGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  metaDataContainerStaticStyle: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#FDFDFD",
    padding: SIZE_REF_8,
  },
  countAndControlsContainerStaticStyle: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalGap: {
    marginLeft: SIZE_REF_12,
  },
  verticalGap: {
    marginTop: SIZE_REF_16,
  },
  titleTextStaticStyle: {
    fontSize: SIZE_REF_12 + SIZE_REF_1,
    lineHeight: SIZE_REF_14 + SIZE_REF_1,
  },
  primaryTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_12,
  },
  secondaryTextStaticStyle: {
    fontSize: SIZE_REF_10 + 1,
    lineHeight: SIZE_REF_6 * 3,
    marginTop: SIZE_REF_16,
  },
  listStaticStyle: {
    width: 0.96 * WINDOW_WIDTH,
    maxHeight: 0.7 * WINDOW_HEIGHT,
  },
  listContentContainerStaticStyle: {
    width: "100%",
  },
  videoContainerStaticStyle: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayContentContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayTextStaticStyle: {
    fontSize: SIZE_REF_10,
    lineHeight: SIZE_REF_10,
    color: "white",
  },
  overlayIconStaticStyle: {
    borderColor: "white",
    borderWidth: 1,
  },
});

export default VideoPreviewScreen;
