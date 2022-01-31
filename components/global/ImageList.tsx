import React, { useCallback } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZE_REF_10, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { ListProps } from "../../utility/types";
import ImagePost from "../imagePost/ImagePost";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";

// const renderItem = (item: ListRenderItemInfo<string>) => {
//   return <ImagePost id={item.item} />;
// };

const keyExtractor = createKeyExtractor("image");

const ImageList = ({
  ids,
  dataState,
  headerComponent,
  onEndReach,
  extraData,
}: ListProps) => {
  const footerComponentCallback = useCallback(
    () =>
      dataState === "loading" ? (
        <LoadingIndicator color="black" size={SIZE_REF_10 * 4} />
      ) : null,
    [dataState]
  );

  const itemSeparatorCallback = useCallback(
    () => <ItemSeparator axis="horizontal" length={SIZE_REF_16} />,
    []
  );

  return (
    <FlatList
      onEndReachedThreshold={0.2}
      onEndReached={onEndReach}
      ListHeaderComponent={headerComponent}
      extraData={{ dataState, ...extraData }}
      data={ids}
      renderItem={() => null}
      // keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={itemSeparatorCallback}
      ListFooterComponent={footerComponentCallback}
      style={styles.listStaticStyle}
      contentContainerStyle={[
        styles.listContentContainerStaticStyle,
        !headerComponent ? styles.optionalTopPadding : undefined,
      ]}
      removeClippedSubviews={true}
      maxToRenderPerBatch={4}
      updateCellsBatchingPeriod={150}
      initialNumToRender={3}
      windowSize={7}
    />
  );
};

const styles = StyleSheet.create({
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
  listContentContainerStaticStyle: {
    paddingBottom: SIZE_REF_8,
  },
  optionalTopPadding: {
    paddingTop: SIZE_REF_8,
  },
});

export default ImageList;
