import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import ImageGalleryItem from "./ImageGalleryItem";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectUserImagePostIdList } from "../../store/user/selector";
import { WINDOW_WIDTH } from "../../utility/constants";
import { Id } from "../../utility/types";

const ImageGallery = ({ id }: Id) => {
  const imageIdListSelectorCallback = useCallback(
    (state: RootState) => selectUserImagePostIdList(state, id),
    [id]
  );

  const imageIdList = useAppSelector(imageIdListSelectorCallback);

  return (
    <View style={styles.galleryContainerStaticStyle}>
      {imageIdList?.map((id, index) => (
        <ImageGalleryItem
          id={id}
          height={WINDOW_WIDTH / 3}
          width={
            (index + 1) % 3 === 0 || index === imageIdList.length - 1
              ? WINDOW_WIDTH / 3
              : WINDOW_WIDTH / 3 - 1
          }
          style={[
            (index + 1) % 3 === 0 ? undefined : styles.galleryItemVerticalGap,
            styles.galleryItemHorizontalGap,
          ]}
          key={id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainerStaticStyle: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    flexDirection: "row",
  },
  galleryItemVerticalGap: {
    marginRight: 1,
  },
  galleryItemHorizontalGap: {
    marginBottom: 1,
  },
});

export default ImageGallery;
