import React, { useCallback, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import FastImage, { ImageStyle, Source } from "react-native-fast-image";
import { shallowEqual } from "react-redux";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectImagePostImageList } from "../../store/imagePost/selector";
import { ImageGalleryItemProps, MediaInfo } from "../../utility/types";

const ImageGalleryItem = ({
  id,
  height,
  width,
  style,
}: ImageGalleryItemProps) => {
  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const image = (selectImagePostImageList(state, id) as MediaInfo[])[0];
      return { image };
    },
    [id]
  );

  const { image } = useAppSelector(
    immutableDataSelectorCallback,
    (left, right) => {
      if (!left.image && right.image) {
        return false;
      }
      return true;
    }
  );

  const imageSource = useMemo<Source>(
    () => ({ cache: "immutable", priority: "high", uri: image.uri }),
    [image.uri]
  );

  const itemContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => [style, styles.itemContainerStaticStyle, { width, height }],
    [width, height, style]
  );

  return (
    <View style={itemContainerDynamicStyle}>
      <FastImage
        source={imageSource}
        resizeMode="cover"
        style={styles.imageStaticStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDFDFD",
  },
  imageStaticStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EBE8FB",
  },
});

export default ImageGalleryItem;
