import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import { SIZE_REF_6, SIZE_REF_8 } from "../../utility/constants";
import APP_STYLE from "../../utility/styles";
import { VideoThumbnailResponse } from "../../utility/types";
import { MediumText } from "../../utility/ui";
import Avatar from "../global/Avatar";
import Header from "../global/Header";
import Icon from "../global/Icon";
import Info from "../global/Info";
import VideoThumbnailBody from "./VideoThumbnailBody";
import VideoThumbnailFooter from "./VideoThumbnailFooter";

export class VideoThumbnail extends Component<VideoThumbnailResponse> {
  constructor(props: VideoThumbnailResponse) {
    super(props);
  }

  shouldComponentUpdate(nextProps: VideoThumbnailResponse) {
    const { author: nextAuthor, ...nextRestProps } = nextProps;

    const { author: prevAuthor, ...prevRestProps } = this.props;

    return (
      !shallowEqual(nextAuthor, prevAuthor) ||
      !shallowEqual(prevRestProps, nextRestProps)
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

        <VideoThumbnailBody
          duration={duration}
          thumbnailUri={uri}
          watchTime={watchtime}
        />

        <VideoThumbnailFooter
          noOfLikes={noOfLikes}
          noOfViews={noOfViews}
          timestamp={timestamp}
          title={title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    ...APP_STYLE.WIDTH_ABSOLUTE_100,
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_JUSTIFY_CENTER,
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
  },
  headerStaticStyle: {
    padding: SIZE_REF_8,
  },
});

export default VideoThumbnail;
