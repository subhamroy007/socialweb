import { ListRenderItemInfo, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import RoundedIcon from "../components/global/RoundedIcon";
import { ScrollView } from "react-native-gesture-handler";
import Avatar from "../components/global/Avatar";

import HighlightedContentList from "../components/global/HashTagList";
import SwippableTabNavigator, {
  CustomMaterialScreen,
} from "../components/global/CustomMaterialNavigator";
import StoryBook from "./StoryBook";
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
import { RegularText } from "../utility/ui";

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
    >
      <StatusBar hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.wrapperScrollbar]}
        stickyHeaderIndices={[2]}
      >
        {/* <RootWrapper style={[styles.avatarMetaIconWrapper]}>
          <Avatar
            size={80}
            url="https://images.news18.com/ibnlive/uploads/2021/07/1627673437_kiara-advani.jpg"
          />
          <MetaIconWrapper>
            <MetaDataWrapper style={[styles.metadataContainer]}>
              <NameValuePair name="uploads" value="400" />
              <NameValuePair name="followers" value="12M" style={styles.icon} />
              <NameValuePair
                name="followings"
                value="212"
                style={styles.icon}
              />
            </MetaDataWrapper>
            <IconAndButtonWrapper>
              <RoundedIcon
                color="black"
                dragEnabled={false}
                tapEnabled={false}
                name="message-outline"
                size={SIZE_REF_10 * 4}
                scale={0.8}
              />
              <RoundedIcon
                color="black"
                dragEnabled={false}
                tapEnabled={false}
                name="mention-regular"
                size={SIZE_REF_10 * 4}
                scale={0.8}
                style={styles.icon}
              />
              <RoundedIcon
                color="black"
                dragEnabled={false}
                tapEnabled={false}
                name="notification-outline"
                size={SIZE_REF_10 * 4}
                scale={0.8}
                style={styles.icon}
              />
            </IconAndButtonWrapper>
          </MetaIconWrapper>
        </RootWrapper>
        <MetaIconWrapper style={[styles.bioLinkWrapper]}>
          <SolidButton
            onPress={() => {}}
            title="follow"
            style={styles.button}
          />
          <RegularText style={[styles.bioText]}>
            hello this is a demo capton to chek the visibility of captions in
            full screen mode of the image post and it is quite allright this is
            the best app on the group of social media and i am new here but
            already amused with this app :)
          </RegularText>
          <HighlightedContentList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.linkContainer}
          />
        </MetaIconWrapper> */}
      </ScrollView>
    </SafeAreaView>
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
