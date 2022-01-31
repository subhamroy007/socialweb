import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { globalColors, globalLayouts } from "../utility/styles";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_8,
} from "../utility/constants";

// const data = ["1", "1", "1", "1", "1", "1", "1", "1"];
// const renderItem = (item: ListRenderItemInfo<string>) => (
//   // <HighlightedLink iconName="video-solid" title="checkout new video" url="" />
// );
const keyExtractor = (_: string, index?: number) => "item" + index;

const OthersProfileScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    ></SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameValuePair: {
    marginLeft: SIZE_REF_16,
  },
  icon: {
    marginLeft: SIZE_REF_16,
  },
  wrapperScrollbar: {
    flex: 1,
    width: "100%",
  },
  bioText: {
    fontSize: SIZE_REF_12,
    paddingHorizontal: SIZE_REF_4,
  },
  linkContainer: {
    marginTop: SIZE_REF_10,
  },
  bioLinkWrapper: {
    width: "100%",
    marginBottom: SIZE_REF_16,
  },
  metadataContainer: {
    marginBottom: SIZE_REF_16,
  },
  avatarMetaIconWrapper: {
    marginBottom: SIZE_REF_16,
    marginTop: SIZE_REF_8 * 3,
  },
  button: { marginLeft: SIZE_REF_16, marginBottom: SIZE_REF_16 },
});

export default OthersProfileScreen;
