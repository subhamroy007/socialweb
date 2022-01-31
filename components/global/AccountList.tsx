import React, { useCallback } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZE_REF_10, SIZE_REF_8 } from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { ListProps } from "../../utility/types";
import { AccountInfo } from "./EntityInfo";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";

const renderItem = (item: ListRenderItemInfo<string>) => {
  return <AccountInfo id={item.item} />;
};

const keyExtractor = createKeyExtractor("account");

const AccountList = ({
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
      data={ids}
      // keyExtractor={keyExtractor}
      renderItem={renderItem}
      extraData={dataState}
      ListFooterComponent={footerComponentCallback}
      getItemLayout={itemLayoutCallback}
      ItemSeparatorComponent={itemSeparatorCallback}
      style={styles.listStaticStyle}
      contentContainerStyle={[
        styles.listContentContainerStaticStyle,
        !headerComponent ? styles.optionalTopPadding : undefined,
      ]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={headerComponent}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReach}
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

export default AccountList;
