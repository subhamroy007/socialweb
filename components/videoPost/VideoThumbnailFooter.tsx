import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import { RootState, useAppSelector } from "../../store/appStore";
import {
  selectVideoPostLikeCount,
  selectVideoPostTitle,
  selectVideoPostViewCount,
} from "../../store/videoPost/selectors";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
} from "../../utility/constants";
import { countAbbreviator } from "../../utility/helpers";
import { Id } from "../../utility/types";
import { MediumText } from "../../utility/ui";
import Icon from "../global/Icon";

const VideoThumbnailFooter = ({ id }: Id) => {
  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const title = selectVideoPostTitle(state, id);
      return { title };
    },
    [id]
  );

  const mutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const likeCount = selectVideoPostLikeCount(state, id);
      const viewCount = selectVideoPostViewCount(state, id);

      return { likeCount, viewCount };
    },
    [id]
  );

  const { title } = useAppSelector(
    immutableDataSelectorCallback,
    (left, right) => {
      if (!left.title && right.title) {
        return false;
      }
      return true;
    }
  );

  const { likeCount, viewCount } = useAppSelector(
    mutableDataSelectorCallback,
    shallowEqual
  );

  return (
    <View style={styles.rootContainerStaticStyle}>
      <MediumText
        style={styles.titleTextStaticStyle}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </MediumText>
      <View style={styles.likeAndViewCountContainerStaticStyle}>
        <MediumText style={styles.countTextStaticStyle}>
          {countAbbreviator(viewCount as number)} views
        </MediumText>
        <View style={styles.likeContainerStaticStyle}>
          <Icon color="#EE3434" name="heart-solid" size={SIZE_REF_6 * 3} />
          <MediumText style={styles.countTextStaticStyle}>
            {" "}
            {countAbbreviator(likeCount as number)}
          </MediumText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: SIZE_REF_8,
  },
  likeContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZE_REF_8,
  },
  titleTextStaticStyle: {
    fontSize: SIZE_REF_14,
    lineHeight: SIZE_REF_16,
  },
  likeAndViewCountContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: SIZE_REF_4,
  },
  countTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_12,
  },
});

export default VideoThumbnailFooter;
