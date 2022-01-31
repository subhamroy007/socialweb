import React from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { SIZE_REF_16 } from "../../utility/constants";
import { RoundedIconProps } from "../../utility/types";
import Icon from "./Icon";

const RoundedIcon = ({
  name,
  backgroundColor,
  borderColor,
  borderWidth,
  color,
  onDrag,
  onTap,
  scale,
  size,
  style,
  type,
}: RoundedIconProps) => {
  const calculatedType = type ? type : "solid";

  const calculatedScale = scale ? scale : 0.5;
  const calculatedSize = size ? size : SIZE_REF_16 * 3;
  const calculatedBackgroundColor = backgroundColor
    ? backgroundColor
    : calculatedType === "outline"
    ? "transparent"
    : "#EBE8FB";

  const calculatedBorderColor = borderColor ? borderColor : "white";
  const calculatedBorderWidth = borderWidth
    ? borderWidth
    : calculatedType === "outline"
    ? StyleSheet.hairlineWidth
    : 0;

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
        <View
          style={[
            style,
            styles.rootContainerStaticStyle,
            {
              borderRadius: calculatedSize * 0.5,
              width:
                calculatedType === "solid"
                  ? calculatedSize
                  : calculatedSize - calculatedBorderWidth,
              height:
                calculatedType === "solid"
                  ? calculatedSize
                  : calculatedSize - calculatedBorderWidth,
              backgroundColor: calculatedBackgroundColor,
              borderWidth: calculatedBorderWidth,
              borderColor: calculatedBorderColor,
            },
          ]}
        >
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
