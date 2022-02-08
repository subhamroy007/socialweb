import React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import {
  SIZE_REF_10,
  SIZE_REF_4,
  SIZE_REF_8,
  SOLID_COLOR_5,
} from "../../utility/constants";
import { timeStringGenerator } from "../../utility/helpers";
import APP_STYLE from "../../utility/styles";
import HighlightedItem from "../global/HighlightedItem";
import RoundedIcon from "../global/RoundedIcon";

export interface VideoThumbnailBodyProps {
  thumbnailUri: string;
  duration: number;
  watchTime?: number;
}

const VideoThumbnailBody = ({
  duration,
  thumbnailUri,
  watchTime,
}: VideoThumbnailBodyProps) => {
  return (
    <View style={styles.bodyContainerStaticStyle}>
      <FastImage
        source={{ cache: "immutable", priority: "high", uri: thumbnailUri }}
        style={styles.mediaStaticStyle}
        resizeMode="cover"
      />
      <RoundedIcon
        name="play"
        type="outline"
        style={styles.playIcon}
        color={SOLID_COLOR_5}
        borderColor={SOLID_COLOR_5}
      />
      <RoundedIcon
        name="chevron-right"
        color={SOLID_COLOR_5}
        size={SIZE_REF_10 * 3}
        type="outline"
        style={styles.infoIcon}
        borderColor={SOLID_COLOR_5}
      />
      <HighlightedItem
        text={timeStringGenerator(duration)}
        style={styles.durationTextStaticStyle}
        size={SIZE_REF_10}
        borderRadius={SIZE_REF_4}
        type="solid"
      />
      {watchTime && (
        <View
          style={[
            styles.watchTimeContainerStaticStyle,
            { width: (watchTime / duration) * 100 + "%" },
          ]}
        ></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoIcon: {
    ...APP_STYLE.POSITION_ABSOLUTE,
    right: SIZE_REF_8,
    bottom: SIZE_REF_8,
  },
  mediaStaticStyle: {
    ...APP_STYLE.HEIGHT_RELATIVE_100,
    ...APP_STYLE.WIDTH_RELATIVE_100,
    ...APP_STYLE.BACKGROUND_PRIMARY_LIGHT_COLOR,
  },
  bodyContainerStaticStyle: {
    ...APP_STYLE.THUMBNAIL_HEIGHT,
    ...APP_STYLE.WIDTH_RELATIVE_100,
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
    ...APP_STYLE.FLEX_JUSTIFY_CENTER,
  },
  playIcon: { ...APP_STYLE.POSITION_ABSOLUTE },
  watchTimeContainerStaticStyle: {
    ...APP_STYLE.POSITION_ABSOLUTE,
    bottom: 0,
    ...APP_STYLE.BAR_HEIGHT,
    ...APP_STYLE.SOLID_BACKGROUND_COLOR_1,
    left: 0,
  },
  durationTextStaticStyle: {
    ...APP_STYLE.POSITION_ABSOLUTE,
    left: SIZE_REF_8,
    bottom: SIZE_REF_8,
  },
});

export default VideoThumbnailBody;
