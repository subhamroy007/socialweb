import React from "react";
import { StyleSheet, View } from "react-native";
import { SIZE_REF_14 } from "../../utility/constants";
import { countAbbreviator, timeElapsed } from "../../utility/helpers";
import APP_STYLE from "../../utility/styles";
import { MediumText, RegularText } from "../../utility/ui";
import Icon from "../global/Icon";

export interface VideoThumbnailFooterProps {
  title: string;
  noOfViews: number;
  noOfLikes: number;
  timestamp: number;
}

const VideoThumbnailFooter = ({
  title,
  noOfLikes,
  noOfViews,
  timestamp,
}: VideoThumbnailFooterProps) => {
  return (
    <View style={styles.footerContainerStaticStyle}>
      <MediumText
        style={styles.primaryTextStaticStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </MediumText>
      <View style={[styles.metaDataContainer]}>
        <RegularText style={styles.secondaryTextStaticStyle}>
          {countAbbreviator(noOfViews) + " views"}
        </RegularText>
        <View style={[styles.rowStaticStyle, APP_STYLE.MARGIN_LEFT_4]}>
          <Icon name="heart-solid" size={SIZE_REF_14} color="#EE3434" />
          <RegularText style={styles.secondaryTextStaticStyle}>
            {countAbbreviator(noOfLikes)}
          </RegularText>
        </View>
        <RegularText
          style={[styles.secondaryTextStaticStyle, APP_STYLE.MARGIN_LEFT_4]}
        >
          {timeElapsed(timestamp) + " ago"}
        </RegularText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainerStaticStyle: {
    ...APP_STYLE.WIDTH_RELATIVE_100,
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_ALIGN_ITEM_START,
    ...APP_STYLE.FLEX_JUSTIFY_CENTER,
    ...APP_STYLE.PADDING_3,
  },
  primaryTextStaticStyle: {
    ...APP_STYLE.TEXT_SIZE_4,
    ...APP_STYLE.LINE_HEIGHT_4,
  },
  metaDataContainer: {
    ...APP_STYLE.WIDTH_RELATIVE_100,
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_ROW,
    ...APP_STYLE.FLEX_JUSTIFY_START,
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
    ...APP_STYLE.MARGIN_TOP_1,
  },
  secondaryTextStaticStyle: {
    ...APP_STYLE.TEXT_SIZE_2,
    ...APP_STYLE.TEXT_SIZE_2,
  },
  rowStaticStyle: {
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_ROW,
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
    ...APP_STYLE.FLEX_JUSTIFY_CENTER,
  },
});

export default VideoThumbnailFooter;
