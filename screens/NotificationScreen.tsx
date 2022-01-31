import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback } from "react";
import { globalColors, globalLayouts } from "../utility/styles";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import ItemSeparator from "../components/global/ItemSeparator";
import { SHUTTER_HEIGHT, SIZE_REF_16 } from "../utility/constants";

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
    ></SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: Math.floor((SHUTTER_HEIGHT * 4) / 25),
  },
});

export default NotificationScreen;
