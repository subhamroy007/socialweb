import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  HEADER_HEIGHT,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_2,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { globalColors } from "../../utility/styles";
import {
  BottomTabScreenHeaderProps,
  HeaderProps,
  StackScreenHeaderProps,
} from "../../utility/types";

const Header = ({
  leftSideComponent,
  rightSideComponent,
  hasSeparator,
  style,
}: HeaderProps) => {
  return (
    <View
      style={[
        globalColors.headerColor,
        styles.rootContainerStaticStyle,
        {
          width: "100%",
          borderBottomWidth: hasSeparator
            ? StyleSheet.hairlineWidth
            : undefined,
        },
        style,
      ]}
    >
      {leftSideComponent && (
        <View
          style={[
            styles.childContainerStaticStyle,
            styles.leftSideContainerStaticStyle,
          ]}
        >
          {leftSideComponent}
        </View>
      )}
      {rightSideComponent && (
        <View
          style={[
            styles.childContainerStaticStyle,
            styles.rightSideContainerStaticStyle,
          ]}
        >
          {rightSideComponent}
        </View>
      )}
    </View>
  );
};

export const BottomTabScreenHeader = ({
  headerProps,
  style,
  ...restProps
}: BottomTabScreenHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Header
      {...restProps}
      style={[
        style,
        {
          paddingTop: insets.top,
          width: WINDOW_WIDTH,
          height: HEADER_HEIGHT,
        },
      ]}
    />
  );
};

export const StackScreenHeader = ({
  headerProps,
  style,
  ...restProps
}: StackScreenHeaderProps) => {
  return (
    <Header
      {...restProps}
      style={[
        style,
        {
          width: WINDOW_WIDTH,
          height: HEADER_HEIGHT,
        },
      ]}
    />
  );
};

export default Header;

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZE_REF_8,
  },
  textStaticStyle: {
    fontSize: SIZE_REF_6 * 3,
    flex: 1,
  },
  leftSideContainerStaticStyle: {
    flex: 1,
  },
  rightSideContainerStaticStyle: {
    marginLeft: SIZE_REF_8,
  },
  childContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
