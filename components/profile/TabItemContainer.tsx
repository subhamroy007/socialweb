import React, { useCallback, useMemo } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { WINDOW_WIDTH } from "../../utility/constants";

export interface TabItemContainerProps {
  children: ViewProps["children"];
  width?: number;
  onHeightChange?: (heigth: number) => void;
}

const TabItemContainer = ({
  children,
  width,
  onHeightChange,
}: TabItemContainerProps) => {
  const containerDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.containerStaticStyle,
      { width: width ? width : WINDOW_WIDTH },
    ],
    [width]
  );

  const layoutChangeCallback = useCallback(
    (event: LayoutChangeEvent) => {
      if (onHeightChange) {
        onHeightChange(event.nativeEvent.layout.height);
      }
    },
    [onHeightChange]
  );

  return (
    <View style={containerDynamicStyle} onLayout={layoutChangeCallback}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});

export default TabItemContainer;
