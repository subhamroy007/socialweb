import React, { useCallback, useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import FastImage, { Source } from "react-native-fast-image";
import { RootState, useAppSelector } from "../../store/appStore";
import {
  selectUserProfilePictureUrl,
  selectUserSocialId,
} from "../../store/user/selector";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_4,
} from "../../utility/constants";
import { RegularText } from "../../utility/ui";

export interface TagProp {
  id: string;
  style?: ViewProps["style"];
}

const Tag = ({ id, style }: TagProp) => {
  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const socialId = selectUserSocialId(state, id);
      const profilePictureUri = selectUserProfilePictureUrl(state, id);
      return { socialId, profilePictureUri };
    },
    [id]
  );

  const { profilePictureUri, socialId } = useAppSelector(
    immutableDataSelectorCallback
  );
  return (
    <View style={[style, styles.rootContainerStaticStyle]}>
      <FastImage
        source={{
          cache: "immutable",
          priority: "high",
          uri: profilePictureUri,
        }}
        resizeMode="cover"
        style={styles.imageStaticStyle}
      />
      <RegularText style={styles.textStaticStyle}>{socialId}</RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    paddingHorizontal: SIZE_REF_4,
    paddingVertical: SIZE_REF_4,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#292828",
    borderRadius: SIZE_REF_16,
    elevation: 10,
  },
  imageStaticStyle: {
    width: SIZE_REF_16,
    height: SIZE_REF_16,
    borderRadius: SIZE_REF_16 * 0.5,
  },
  textStaticStyle: {
    color: "white",
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_12,
    marginHorizontal: SIZE_REF_4,
  },
});

export default Tag;
