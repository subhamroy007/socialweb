import React, { useMemo } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { SIZE_REF_8 } from "../../utility/constants";
import { TabBarItemProps } from "../../utility/types";
import Icon from "../global/Icon";

const TabBarItem = ({
  activeIconColor,
  activeIconName,
  activeIconSize,
  animatedValue,
  inActiveIconColor,
  inActiveIconName,
  inActiveIconSize,
  index,
}: TabBarItemProps) => {
  const activeIconDynamicStyle = useMemo(
    () => [
      styles.activeIconStaticStyle,
      {
        opacity: animatedValue.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    []
  );

  const inActiveIconDynamicStyle = useMemo(
    () => ({
      opacity: animatedValue.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 0, 1],
        extrapolate: "clamp",
      }),
    }),
    []
  );

  return (
    <View style={styles.tabBarItemStaticStyle}>
      <Animated.View style={activeIconDynamicStyle}>
        <Icon
          name={activeIconName}
          color={activeIconColor}
          size={activeIconSize}
        />
      </Animated.View>
      <Animated.View style={[inActiveIconDynamicStyle]}>
        <Icon
          name={inActiveIconName}
          color={inActiveIconColor}
          size={inActiveIconSize}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarItemStaticStyle: {
    flex: 1,
    paddingVertical: SIZE_REF_8,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
  },
  activeIconStaticStyle: {
    position: "absolute",
  },
});

export default TabBarItem;
