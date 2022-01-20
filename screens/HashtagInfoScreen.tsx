import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import RoundedIcon from "../components/global/RoundedIcon";
import { ScrollView } from "react-native-gesture-handler";

import SwippableTabNavigator, {
  CustomMaterialScreen,
} from "../components/global/CustomMaterialNavigator";
import ImageGallery from "./ImageGallery";
import VideoCollection from "./VideoColletion";
import SolidButton from "../components/profile/SolidButton";
import { globalColors, globalLayouts } from "../utility/styles";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_8,
  TAB_INDICATOR_HEIGHT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";

const HashtagInfoScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      <StatusBar hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.wrapperScrollbar]}
        stickyHeaderIndices={[2]}
      >
        {/* <RootWrapper style={[styles.avatarMetaIconWrapper]}>
          <RoundedIcon
            color="black"
            dragEnabled={false}
            tapEnabled={false}
            name="hashtag-solid"
            size={80}
            scale={0.8}
          />
          <MetaIconWrapper>
            <MetaDataWrapper style={[styles.metadataContainer]}>
              <NameValuePair name="uploads" value="400" />
              <NameValuePair name="saves" value="12M" style={styles.icon} />
            </MetaDataWrapper>
            <IconAndButtonWrapper style={styles.buttonWrapper}>
              <SolidButton onPress={() => {}} title="save" />
            </IconAndButtonWrapper>
          </MetaIconWrapper>
        </RootWrapper> */}
        <SwippableTabNavigator
          width={WINDOW_WIDTH}
          height={
            WINDOW_HEIGHT -
            (0.1 * WINDOW_HEIGHT +
              SIZE_REF_12 +
              SIZE_REF_14 +
              TAB_INDICATOR_HEIGHT)
          }
        >
          <CustomMaterialScreen
            target={<ImageGallery />}
            activeIcon="camera-solid"
            inActiveIcon="camera-outline"
            size={SIZE_REF_12 + SIZE_REF_14}
          />
          <CustomMaterialScreen
            target={<VideoCollection />}
            activeIcon="video-solid"
            inActiveIcon="video-outline"
            size={SIZE_REF_12 + SIZE_REF_14}
          />
        </SwippableTabNavigator>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameValuePair: {
    marginLeft: SIZE_REF_16,
  },
  icon: {
    marginLeft: SIZE_REF_16 * 2,
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
  buttonWrapper: {
    alignSelf: "center",
  },
});

export default HashtagInfoScreen;
