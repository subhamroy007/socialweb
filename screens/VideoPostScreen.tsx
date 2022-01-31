import { StackScreenProps } from "@react-navigation/stack";
import { Video } from "expo-av";
import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HighlightedContent from "../components/global/HighlightedItem";
import ItemSeparator from "../components/global/ItemSeparator";

import RoundedIcon from "../components/global/RoundedIcon";
import useVideoResizer from "../hooks/useVideoResizer";
import { RootState, useAppDispatch, useAppSelector } from "../store/appStore";

import {
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_2,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";
import {
  countAbbreviator,
  createKeyExtractor,
  dateString,
  timeFormatter,
} from "../utility/helpers";
import { globalColors, globalLayouts } from "../utility/styles";
import { RootStackNavigatorParamList } from "../utility/types";
import { InfoProps, MediaInfo, VideoPost } from "../utility/types";
import { ConfiguredFlatList, MediumText, RegularText } from "../utility/ui";
import * as ScreenOrientation from "expo-screen-orientation";
import { shallowEqual } from "react-redux";

// const renderItem = (item: ListRenderItemInfo<string>) => {
//   return (
//     <HighlightedContent style={styles.hashTagStaticStyle}>
//       {item.item}
//     </HighlightedContent>
//   );
// };

const keyExtractor = createKeyExtractor("hashtag");

type VideoPostScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "VideoPostScreen"
>;

const VideoPostScreen = ({
  route: {
    params: { id },
  },
}: VideoPostScreenProps) => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.defaultViewColor]}
    ></SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoPlayerContaierStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  separatorStaticStyle: {
    width: WINDOW_WIDTH - 2 * SIZE_REF_8,
    backgroundColor: "#EBE8FB",
    marginBottom: SIZE_REF_8,
    alignSelf: "center",
  },
  authorInfoContainerStaticStyle: {
    marginBottom: SIZE_REF_8,
    marginLeft: 0.1004 * WINDOW_WIDTH,
  },
  viewTimestampPairContainerStaticStyle: {
    marginBottom: SIZE_REF_8,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZE_REF_8,
  },
  primaryTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_12,
  },
  descriptionTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_6 * 3,
    marginHorizontal: SIZE_REF_8,
  },
  secondaryTextStaticStyle: {
    fontSize: SIZE_REF_10 + SIZE_REF_1,
    lineHeight: SIZE_REF_10 + SIZE_REF_1,
    marginTop: SIZE_REF_4,
  },
  horizontalGap: {
    marginLeft: SIZE_REF_16 * 2,
  },
  titleTextStaticStyle: {
    fontSize: SIZE_REF_14 + SIZE_REF_1,
    lineHeight: SIZE_REF_16 + 1,
    marginHorizontal: SIZE_REF_8,
    marginBottom: SIZE_REF_16,
  },
  hashTagListStaticStyle: {
    marginBottom: SIZE_REF_6,
  },
  hashTagListContentContainerStaticStyle: {
    paddingVertical: 0,
  },
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
  listContentContainerStaticStyle: {
    width: "100%",
  },
  metaDataContainerStaticStyle: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: SIZE_REF_8,
  },

  hashTagStaticStyle: { marginRight: SIZE_REF_8 },
  iconContainerStaticStyle: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginBottom: SIZE_REF_16,
  },
  iconTextPairStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VideoPostScreen;
