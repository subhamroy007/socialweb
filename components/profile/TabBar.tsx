import React, { useMemo } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { TabBarProps } from "../../utility/types";

const TabBar = ({ animatedValue, children, style }: TabBarProps) => {
  const tabBarIndicatorDynamicStyle = useMemo(
    () => [
      styles.tabBarIndicatorStaticStyle,
      {
        width: `${100 / children.length}%`,
        left: animatedValue.interpolate({
          inputRange: [0, children.length - 1],
          outputRange: [`${0}%`, `${100 - 100 / children.length}%`],
        }),
      },
    ],
    [children.length]
  );

  return (
    <View style={[style, styles.tabBarStaticStyle]}>
      {children}
      <Animated.View style={tabBarIndicatorDynamicStyle}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarIndicatorStaticStyle: {
    backgroundColor: "black",
    height: 2,
    position: "absolute",
    bottom: 0,
  },
  tabBarStaticStyle: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap",
    flexDirection: "row",
    borderBottomColor: "#D1CBCB",
    borderBottomWidth: 1,
    backgroundColor: "#FDFDFD",
  },
});

export default TabBar;
