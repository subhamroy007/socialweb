import React, { useCallback } from "react";
import Icon from "../global/Icon";
import { StyleSheet, View } from "react-native";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_8,
} from "../../utility/constants";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackNavigatorParamList } from "../../utility/types";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/appStore";
import { selectIsLiked, selectIsSaved } from "../../store/imagePost/selector";
import { useNavigation } from "@react-navigation/core";
import { selectImagePostLikeAndBookmarkStatus } from "../../store/imagePost/selectors";
import { shallowEqual } from "react-redux";

export type ImageFeedScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "Tabs"
>;

export type ImageFeedScreenNavigationProps = ImageFeedScreenProps["navigation"];

export interface ImagePostControlsProps {
  id: string;
}

const ImagePostControls = ({ id }: ImagePostControlsProps) => {
  const navigation = useNavigation<ImageFeedScreenNavigationProps>();

  const mutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      return selectImagePostLikeAndBookmarkStatus(state, id);
    },
    [id]
  );

  const mutableData = useAppSelector(mutableDataSelectorCallback, shallowEqual);

  const likeIconClickHandler = useCallback(() => {}, []);

  const commentIconClickHandler = useCallback(() => {
    if (navigation.isFocused()) {
      navigation.navigate("PostEngagementStack", {
        screen: "CommentScreen",
        params: { id, type: "imagePost" },
      });
    }
  }, [id, navigation.navigate, navigation.isFocused]);

  const shareIconClickHandler = useCallback(() => {}, []);

  const bookmarkIconClickHandler = useCallback(() => {}, []);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.rootContainerStaticStyle}>
      <View style={styles.leftContainerStaticStyle}>
        <Icon
          color={mutableData?.isLiked ? "#EE3434" : "black"}
          name={mutableData?.isLiked ? "heart-solid" : "heart-outline"}
          size={SIZE_REF_10 * 3}
          style={styles.icon}
        />
        <Icon
          color="black"
          name="comment-outline"
          size={SIZE_REF_10 * 3}
          style={styles.icon}
          onTap={commentIconClickHandler}
        />
        <Icon color="black" name="send" size={SIZE_REF_10 * 3} />
      </View>
      <Icon
        color="black"
        name={mutableData?.isSaved ? "bookmark-solid" : "bookmark-outline"}
        size={SIZE_REF_10 * 3}
      />
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
    marginTop: SIZE_REF_8,
    paddingHorizontal: SIZE_REF_8,
  },
  leftContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    marginRight: SIZE_REF_16,
  },
});

export default ImagePostControls;
