import React, { useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE_REF_16 } from "../../utility/constants";
import { RoundedIconProps } from "../../utility/types";
import Icon from "./Icon";

//a utility component that works like a rounded icon with a speicific background
const RoundedIcon = (props: RoundedIconProps) => {
  const { name, color, onDrag, onTap, scale, size, backgroundColor, style } =
    props;

  const calculatedScale = scale ? scale : 0.5;
  const calculatedSize = size ? size : SIZE_REF_16 * 3;
  const calculatedBackgroundColor = backgroundColor
    ? backgroundColor
    : "#EBE8FB";

  const rootContainerDynamicStyle: StyleProp<ViewStyle> = useMemo(() => {
    return [
      style,
      styles.rootContainerStaticStyle,
      {
        borderRadius: calculatedSize * 0.5,
        width: calculatedSize,
        height: calculatedSize,
        backgroundColor: calculatedBackgroundColor,
      },
    ];
  }, [calculatedSize, style, calculatedBackgroundColor, calculatedSize]);

  return (
    <TapGestureHandler
      enabled={onTap ? true : false}
      numberOfTaps={1}
      onHandlerStateChange={onTap}
    >
      <PanGestureHandler
        enabled={onDrag ? true : false}
        minPointers={1}
        maxPointers={1}
        avgTouches={true}
        enableTrackpadTwoFingerGesture={true}
        onGestureEvent={onDrag}
      >
        <View style={rootContainerDynamicStyle}>
          <Icon
            name={name}
            color={color}
            size={calculatedScale * calculatedSize}
          />
        </View>
      </PanGestureHandler>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RoundedIcon;
