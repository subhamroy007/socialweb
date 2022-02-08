import React from "react";
import { StyleSheet, View } from "react-native";
import { SIZE_REF_10, SIZE_REF_8 } from "../../utility/constants";
import { IconType } from "../../utility/types";
import NewIcon from "./NewIcon";

export interface TabBarItemProps {
  focused: boolean;
  icon: IconType;
}

const TabBarItem = ({ focused, icon }: TabBarItemProps) => {
  return (
    <View style={styles.containerStaticStyle}>
      {focused ? (
        <NewIcon name={icon} size={SIZE_REF_10 * 2} color="black" />
      ) : (
        <NewIcon name={icon} size={SIZE_REF_10 * 2} color="grey" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStaticStyle: {
    flex: 1,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZE_REF_8,
  },
});

export default TabBarItem;
