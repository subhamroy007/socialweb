import React from "react";
import Icon from "../global/Icon";
import { StyleSheet, View } from "react-native";
import { SIZE_REF_10, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ImagePostControlsProps,
  RootStackNavigatorParamList,
} from "../../utility/types";

import { useNavigation } from "@react-navigation/core";

export type ImageFeedScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "Tabs"
>;

export type ImageFeedScreenNavigationProps = ImageFeedScreenProps["navigation"];

const ImagePostControls = ({ hasLiked, hasSaved }: ImagePostControlsProps) => {
  const navigation = useNavigation<ImageFeedScreenNavigationProps>();

  return (
    <View style={styles.rootContainerStaticStyle}>
      <View style={styles.leftContainerStaticStyle}>
        <Icon
          color={hasLiked ? "#EE3434" : "black"}
          name={hasLiked ? "heart-solid" : "heart-outline"}
          size={SIZE_REF_10 * 3}
          style={styles.icon}
        />
        <Icon
          color="black"
          name="comment-outline"
          size={SIZE_REF_10 * 3}
          style={styles.icon}
        />
        <Icon color="black" name="send" size={SIZE_REF_10 * 3} />
      </View>
      <Icon
        color="black"
        name={hasSaved ? "bookmark-solid" : "bookmark-outline"}
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
    padding: SIZE_REF_8,
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
