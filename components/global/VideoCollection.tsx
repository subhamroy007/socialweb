import React, { useCallback } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZE_REF_10, SIZE_REF_8 } from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { ListProps } from "../../utility/types";
import VideoThumbnail from "../videoPost/VideoThumbnail";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";

const renderItem = (item: ListRenderItemInfo<string>) => {
  return <VideoThumbnail id={item.item} />;
};

const keyExtractor = createKeyExtractor("video");

const VideoCollection = ({
  ids,
  dataState,
  headerComponent,
  onEndReach,
}: ListProps) => {
  const itemSeparatorCallback = useCallback(
    () => (
      <ItemSeparator
        axis="horizontal"
        length={SIZE_REF_8}
        style={styles.itemSeparatorStaticStyle}
      />
    ),
    []
  );

  const footerComponentCallback = useCallback(
    () =>
      dataState === "loading" ? (
        <LoadingIndicator color="black" size={SIZE_REF_10 * 4} />
      ) : null,
    [dataState]
  );

  return (
    <FlatList
      data={ids}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReach}
      ListFooterComponent={footerComponentCallback}
      extraData={dataState}
      style={styles.listStaticStyle}
      ItemSeparatorComponent={itemSeparatorCallback}
      ListHeaderComponent={headerComponent}
    />
  );
};

const styles = StyleSheet.create({
  listStaticStyle: {
    flex: 1,
    width: "100%",
  },
  itemSeparatorStaticStyle: {
    backgroundColor: "#EBE8FB",
  },
});

export default VideoCollection;
