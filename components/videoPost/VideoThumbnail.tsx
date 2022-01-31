import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { shallowEqual } from "react-redux";
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
} from "../../utility/constants";
import {
  countAbbreviator,
  timeElapsed,
  timeStringGenerator,
} from "../../utility/helpers";
import { VideoThumbnailResponse } from "../../utility/types";
import { MediumText, RegularText } from "../../utility/ui";
import Avatar from "../global/Avatar";
import Header from "../global/Header";
import HighlightedItem from "../global/HighlightedItem";
import Icon from "../global/Icon";
import Info from "../global/Info";
import RoundedIcon from "../global/RoundedIcon";

export class VideoThumbnail extends Component<VideoThumbnailResponse> {
  constructor(props: VideoThumbnailResponse) {
    super(props);
  }

  shouldComponentUpdate(nextProps: VideoThumbnailResponse) {
    const { author: nextAuthor, ...nextRestProps } = nextProps;

    const { author: prevAuthor, ...prevRestProps } = this.props;

    return (
      !shallowEqual(nextAuthor, prevAuthor) ||
      !shallowEqual(prevRestProps, prevRestProps)
    );
  }

  render(): React.ReactNode {
    const {
      author: { profilePictureUri, socialId, hasUnSeenStroy },
      noOfViews,
      noOfLikes,
      timestamp,
      title,
      duration,
      watchtime,
      thumbnail: { uri },
    } = this.props;

    return (
      <View style={styles.rootContainerStaticStyle}>
        {/* thumbnail header */}
        <Header
          hasSeparator={true}
          style={styles.headerStaticStyle}
          leftSideComponent={
            <Info
              picture={
                <Avatar
                  profilePictureUri={profilePictureUri}
                  hasUnSeenStroy={hasUnSeenStroy}
                  showOutline={hasUnSeenStroy}
                />
              }
              pictureGapSize={SIZE_REF_6}
            >
              {(size, color) => (
                <MediumText style={{ fontSize: size, lineHeight: size, color }}>
                  {socialId}
                </MediumText>
              )}
            </Info>
          }
          rightSideComponent={<Icon name="more-solid" size={SIZE_REF_8 * 3} />}
        />
        {/* thubnail body */}
        <View style={styles.bodyContainerStaticStyle}>
          <FastImage
            source={{ cache: "immutable", priority: "high", uri }}
            style={styles.mediaStaticStyle}
            resizeMode="cover"
          />
          <RoundedIcon
            name="play"
            color="white"
            scale={0.7}
            size={SIZE_REF_10 * 4}
            type="outline"
            style={styles.playIcon}
            borderWidth={SIZE_REF_1}
          />
          <RoundedIcon
            name="chevron-right"
            color="white"
            scale={0.7}
            size={SIZE_REF_16 * 2}
            type="outline"
            style={styles.infoIcon}
            borderWidth={SIZE_REF_1}
          />
          <HighlightedItem
            text={timeStringGenerator(duration)}
            backgroundColor="#1F1F1F"
            color="white"
            style={styles.durationTextStaticStyle}
            size={SIZE_REF_10}
            borderRadius={SIZE_REF_4}
          />
          <View
            style={[
              styles.watchTimeContainerStaticStyle,
              { width: (watchtime / duration) * 100 + "%" },
            ]}
          ></View>
        </View>
        {/* thumbnail footer */}
        <View style={styles.footerContainerStaticStyle}>
          <MediumText
            style={styles.titleTextStaticStyle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </MediumText>
          <View style={[styles.metaDataContainer]}>
            <RegularText style={styles.mediaTextStaticStyle}>
              {countAbbreviator(noOfViews) + " views"}
            </RegularText>
            <View style={[styles.rowStaticStyle, styles.leftGap]}>
              <Icon name="heart-solid" size={SIZE_REF_16} color="#EE3434" />
              <RegularText style={styles.mediaTextStaticStyle}>
                {countAbbreviator(noOfLikes)}
              </RegularText>
            </View>
            <RegularText style={[styles.mediaTextStaticStyle, styles.leftGap]}>
              {timeElapsed(timestamp) + " ago"}
            </RegularText>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoIcon: {
    position: "absolute",
    right: SIZE_REF_8,
    bottom: SIZE_REF_8,
  },
  rootContainerStaticStyle: {
    width: WINDOW_WIDTH,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  headerStaticStyle: {
    padding: SIZE_REF_8,
  },
  footerContainerStaticStyle: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: SIZE_REF_8,
  },
  mediaStaticStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FDFDFD",
  },
  bodyContainerStaticStyle: {
    height: WINDOW_HEIGHT * 0.33,
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: { position: "absolute" },
  watchTimeContainerStaticStyle: {
    position: "absolute",
    bottom: 0,
    height: SIZE_REF_2,
    backgroundColor: "#3F71F2",
    left: 0,
  },
  durationTextStaticStyle: {
    position: "absolute",
    left: SIZE_REF_8,
    bottom: SIZE_REF_8,
  },
  titleTextStaticStyle: { fontSize: SIZE_REF_16, lineHeight: SIZE_REF_16 },
  metaDataContainer: {
    width: "100%",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: SIZE_REF_4,
  },
  rowStaticStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaTextStaticStyle: { fontSize: SIZE_REF_12, lineHeight: SIZE_REF_12 },
  leftGap: {
    marginLeft: SIZE_REF_10,
  },
});

export default VideoThumbnail;
