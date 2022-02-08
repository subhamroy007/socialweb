import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TAB_INDICATOR_HEIGHT } from "../../utility/constants";

export interface TabBarProps {
  children: ReactNode[];
  scrollPosition: SharedValue<number>;
}

const TabBar = ({ children, scrollPosition }: TabBarProps) => {
  const dynamicStyle = useAnimatedStyle(
    () => ({
      left: scrollPosition.value,
    }),
    []
  );

  return (
    <View style={styles.containerStaticStyle}>
      {children}
      <Animated.View
        style={[
          styles.indicatorStaticStyle,
          { width: 100 / children.length + "%" },
          dynamicStyle,
        ]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStaticStyle: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  indicatorStaticStyle: {
    height: TAB_INDICATOR_HEIGHT,
    backgroundColor: "black",
    bottom: 0,
    position: "absolute",
  },
});

export default TabBar;
