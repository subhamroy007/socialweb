import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { RootState, useAppSelector } from "../../store/appStore";
import {
  selectImagePostAuhor,
  selectImagePostTimestamp,
} from "../../store/imagePost/selector";
import { selectUserSocialId } from "../../store/user/selector";
import {
  selectVideoPostAuhor,
  selectVideoPostTimestamp,
} from "../../store/videoPost/selectors";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_4,
  SIZE_REF_8,
} from "../../utility/constants";
import { timeElapsed } from "../../utility/helpers";
import { InfoProps, PostHeaderProps } from "../../utility/types";
import { MediumText } from "../../utility/ui";
import Info from "../global/EntityInfo";
import Icon from "../global/Icon";

const PostHeader = ({ id, postType }: PostHeaderProps) => {
  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const authorId =
        postType === "video"
          ? selectVideoPostAuhor(state, id)
          : selectImagePostAuhor(state, id);
      const socialId = selectUserSocialId(state, authorId as string);
      return { authorId, socialId };
    },
    [id, postType]
  );

  const { authorId, socialId } = useAppSelector(
    immutableDataSelectorCallback,
    (left, right) => {
      if (!left.socialId && right.socialId) {
        return false;
      }
      return true;
    }
  );
  return (
    <View style={styles.rootContainerStaticStyle}>
      <Info
        name={authorId as string}
        type="user"
        pictureSize={SIZE_REF_10 * 4}
        gapSize={SIZE_REF_4}
        textSize={SIZE_REF_12}
      >
        {(style) => <MediumText style={style}>{socialId}</MediumText>}
      </Info>
      <Icon color="black" name="more-solid" size={SIZE_REF_10 * 2} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZE_REF_8,
  },
});

export default PostHeader;
