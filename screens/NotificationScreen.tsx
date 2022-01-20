import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback } from "react";
import { globalColors, globalLayouts } from "../utility/styles";
import NotificationGroup from "../components/stacks/NotificationGroup";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { ConfiguredFlatList } from "../utility/ui";
import ItemSeparator from "../components/global/ItemSeparator";
import HashTag from "../components/global/HashTag";
import TimeStampStack from "../components/stacks/TimeStampStack";
import { SHUTTER_HEIGHT, SIZE_REF_16 } from "../utility/constants";

const data = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0];

const renderItem = (item: ListRenderItemInfo<number>) =>
  item.item === 1 ? <TimeStampStack /> : <NotificationGroup />;

const keyExtractor = (item: number, index?: number) => "item" + index;

const NotificationScreen = () => {
  const itemSeparator = useCallback(
    () => <ItemSeparator axis="horizontal" length={SIZE_REF_16} />,
    []
  );

  const stickyHeaderIndices = [0, 2, 4, 6, 8];

  return (
    <SafeAreaView
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
      edges={["left", "right"]}
    >
      <ConfiguredFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparator}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyHeaderIndices}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: Math.floor((SHUTTER_HEIGHT * 4) / 25),
  },
});

export default NotificationScreen;
