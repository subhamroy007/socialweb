import React, { useCallback } from "react";
import {
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZE_REF_10, WINDOW_WIDTH } from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { ListProps } from "../../utility/types";
import ImageGalleryItem from "../profile/ImageGalleryItem";
import LoadingIndicator from "./LoadingIndicator";

const keyExtractor = createKeyExtractor("image");

const ImageGallery = ({
  ids,
  dataState,
  headerComponent,
  onEndReach,
}: ListProps) => {
  const footerComponentCallback = useCallback(
    () =>
      dataState === "loading" ? (
        <LoadingIndicator color="black" size={SIZE_REF_10 * 4} />
      ) : null,
    [dataState]
  );

  const itemLayoutCallback = useCallback(
    (data: any[] | null | undefined, index: number) => ({
      index,
      length: WINDOW_WIDTH / 3,
      offset: (index * WINDOW_WIDTH) / 3,
    }),
    []
  );

  // const renderItem = useCallback(
  //   (item: ListRenderItemInfo<string>) => {
  //     let imageContainerStyle: StyleProp<ViewStyle>;

  //     switch (item.index % 3) {
  //       case 0:
  //         imageContainerStyle = [styles.leftSideImageContainerStaticStyle];
  //         break;
  //       case 1:
  //         imageContainerStyle = [
  //           styles.leftSideImageContainerStaticStyle,
  //           styles.rightSideImageContainerStaticStyle,
  //         ];
  //         break;
  //       default:
  //         imageContainerStyle = [styles.rightSideImageContainerStaticStyle];
  //     }

  //     if (Math.floor(item.index / 3) === 0) {
  //       imageContainerStyle.push(styles.topLevelImageContainerStaticStyle);
  //     } else if (Math.floor(item.index / 3) === Math.floor(ids.length / 3)) {
  //       imageContainerStyle.push(styles.bottomLevelImageContainerStaticStyle);
  //     } else {
  //       imageContainerStyle.push(
  //         styles.bottomLevelImageContainerStaticStyle,
  //         styles.topLevelImageContainerStaticStyle
  //       );
  //     }
  //     return (
  //       <ImageGalleryItem
  //         height={WINDOW_WIDTH / 3}
  //         width={WINDOW_WIDTH / 3}
  //         id={item.item}
  //         style={imageContainerStyle}
  //       />
  //     );
  //   },
  //   [ids.length]
  // );

  return (
    <FlatList
      data={ids}
      extraData={dataState}
      ListHeaderComponent={headerComponent}
      ListFooterComponent={footerComponentCallback}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReach}
      getItemLayout={itemLayoutCallback}
      // keyExtractor={keyExtractor}
      renderItem={() => null}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      style={styles.listStaticStyle}
    />
  );
};

const styles = StyleSheet.create({
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
  leftSideImageContainerStaticStyle: {
    paddingRight: 1,
  },
  rightSideImageContainerStaticStyle: {
    paddingLeft: 1,
  },
  topLevelImageContainerStaticStyle: {
    paddingBottom: 1,
  },
  bottomLevelImageContainerStaticStyle: {
    paddingTop: 1,
  },
});

export default ImageGallery;
