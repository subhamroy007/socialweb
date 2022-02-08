import React from "react";
import { StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  SIZE_REF_10,
  SOLID_COLOR_5,
  SOLID_COLOR_8,
} from "../../utility/constants";
import { countAbbreviator } from "../../utility/helpers";
import APP_STYLE from "../../utility/styles";
import { HashTagLongResponse } from "../../utility/types";
import { MediumText } from "../../utility/ui";
import RoundedIcon from "./RoundedIcon";

const HashTag = React.memo<HashTagLongResponse>(
  ({ id, isFollowing, name, noOfUploads }) => {
    return (
      <View style={styles.rootContainerStaticStyle}>
        <View style={styles.leftSideChildContainerStaticStyle}>
          <RoundedIcon
            name="hashtag-solid"
            scale={0.5}
            size={SIZE_REF_10 * 5}
          />
          <View style={styles.textContainerStaticStyle}>
            <MediumText
              style={styles.primaryTextStaticStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </MediumText>
            <MediumText
              style={styles.secondaryTextStaticStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {countAbbreviator(noOfUploads) + " uploads"}
            </MediumText>
          </View>
        </View>
        {isFollowing ? (
          <RoundedIcon name="bookmark-solid" type="outline" />
        ) : (
          <RoundedIcon
            name="bookmark-outline"
            backgroundColor={SOLID_COLOR_8}
            color={SOLID_COLOR_5}
          />
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    const { children: ch1, ...prevRestProps } = prevProps;
    const { children: ch2, ...nextRestProps } = nextProps;
    return shallowEqual(prevRestProps, nextRestProps);
  }
);

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    ...APP_STYLE.FLEX_ROW,
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_JUSTIFY_SPACE_BETWEEN,
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
    ...APP_STYLE.WIDTH_ABSOLUTE_100,
    ...APP_STYLE.PADDING_3,
  },
  leftSideChildContainerStaticStyle: {
    ...APP_STYLE.FLEX_ROW,
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_JUSTIFY_CENTER,
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
    ...APP_STYLE.FLEX_1,
    ...APP_STYLE.MARGIN_RIGHT_2,
  },
  textContainerStaticStyle: {
    ...APP_STYLE.FLEX_JUSTIFY_START,
    ...APP_STYLE.FLEX_ALIGN_ITEM_START,
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.MARGIN_LEFT_2,
    ...APP_STYLE.FLEX_1,
  },
  primaryTextStaticStyle: {
    ...APP_STYLE.TEXT_SIZE_2,
    ...APP_STYLE.LINE_HEIGHT_2,
    ...APP_STYLE.TEXT_PRIMARY_DARK_COLOR,
  },
  secondaryTextStaticStyle: {
    ...APP_STYLE.TEXT_SIZE_2,
    ...APP_STYLE.LINE_HEIGHT_2,
    ...APP_STYLE.TEXT_SECONDARY_COLOR,
    ...APP_STYLE.MARGIN_TOP_1,
  },
});

export default HashTag;
