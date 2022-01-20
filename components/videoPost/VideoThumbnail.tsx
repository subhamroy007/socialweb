import React from "react";
import { StyleSheet, View } from "react-native";
import { WINDOW_WIDTH } from "../../utility/constants";
import PostHeader from "./PostHeader";
import VideoThumbnailBody from "./VideoThumbnailBody";
import VideoThumbnailFooter from "./VideoThumbnailFooter";

export interface VideoThumbnailProps {
  id: string;
}

const VideoThumbnail = React.memo<VideoThumbnailProps>(
  ({ id }: VideoThumbnailProps) => {
    return (
      <View style={styles.thumbnailContainerStaticStyle}>
        <PostHeader id={id} postType="video" />
        <VideoThumbnailBody id={id} />
        <VideoThumbnailFooter id={id} />
      </View>
    );
  },
  (prevProps, nextProps) => prevProps.id === nextProps.id
);

const styles = StyleSheet.create({
  thumbnailContainerStaticStyle: {
    width: WINDOW_WIDTH,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VideoThumbnail;
