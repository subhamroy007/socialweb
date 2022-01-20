import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SHUTTER_BODY_LIST_ITEM_HEIGHT,
  SHUTTER_ICON_HORIZONTAL_MARGIN,
  SHUTTER_ICON_VERTICAL_MARGIN,
  WINDOW_WIDTH,
} from "../../utility/constants";

export interface ShutterBodyListItemProps {
  children: ReactNode;
}

const ShutterBodyListItem = ({ children }: ShutterBodyListItemProps) => {
  //renders all the icons of a specific page
  return (
    <SafeAreaView edges={[]} style={[styles.itemContainer]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: WINDOW_WIDTH,
    height: SHUTTER_BODY_LIST_ITEM_HEIGHT,
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingLeft: SHUTTER_ICON_HORIZONTAL_MARGIN,
    paddingBottom: SHUTTER_ICON_VERTICAL_MARGIN,
  },
});

export default ShutterBodyListItem;
