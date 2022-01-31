import React, { useCallback } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZE_REF_10, SIZE_REF_8 } from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { ListProps } from "../../utility/types";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";

// const renderItem = (item: ListRenderItemInfo<string>) => {
//   return <HashTagInfo id={item.item} />;
// };

const keyExtractor = createKeyExtractor("hashtag");

const HashTagList = ({
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
      length: SIZE_REF_8 * 8,
      offset: index * SIZE_REF_8 * 8,
    }),
    []
  );

  const itemSeparatorCallback = useCallback(
    () => <ItemSeparator axis="horizontal" length={SIZE_REF_8} />,
    []
  );

  return (
    <FlatList
      onEndReachedThreshold={0.2}
      onEndReached={onEndReach}
      ListHeaderComponent={headerComponent}
      extraData={dataState}
      data={ids}
      renderItem={() => null}
      // keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={itemSeparatorCallback}
      getItemLayout={itemLayoutCallback}
      ListFooterComponent={footerComponentCallback}
      style={styles.listStaticStyle}
      contentContainerStyle={[
        styles.listContentContainerStaticStyle,
        !headerComponent ? styles.optionalTopPadding : undefined,
      ]}
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

export default HashTagList;
