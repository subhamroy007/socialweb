import React, { useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  GestureEvent,
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { SIZE_REF_12 } from "../../utility/constants";
import { HighlightedItemProps } from "../../utility/types";
import { MediumText } from "../../utility/ui";

const HighlightedItem = ({
  text,
  onTap,
  size,
  style,
  type,
  backgroundColor,
  borderColor,
  color,
  borderWidth,
  borderRadius,
}: HighlightedItemProps) => {
  const calculatedType = type ? type : "solid";

  const calculatedSize = size ? size : SIZE_REF_12;
  const calculatedBackgroundColor = backgroundColor
    ? backgroundColor
    : calculatedType === "outline"
    ? "transparent"
    : "#EBE8FB";

  const calculatedBorderColor = borderColor ? borderColor : "#D1CBCB";
  const calculatedBorderWidth = borderWidth
    ? borderWidth
    : calculatedType === "outline"
    ? StyleSheet.hairlineWidth
    : 0;

  const calculatedColor = color ? color : "black";

  const calculatedBorderRadius = borderRadius ? borderRadius : calculatedSize;

  const tapHandlerCallback = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (state === State.ACTIVE && onTap) {
        onTap();
      }
    },
    []
  );

  return (
    <TapGestureHandler
      enabled={onTap ? true : false}
      onHandlerStateChange={tapHandlerCallback}
    >
      <View
        style={[
          style,
          styles.rootContainerStaticStyle,
          {
            borderRadius: calculatedBorderRadius,
            padding:
              calculatedType === "solid"
                ? calculatedSize * 0.47
                : calculatedSize * 0.47 - calculatedBorderWidth,
            borderColor: calculatedBorderColor,
            backgroundColor: calculatedBackgroundColor,
            borderWidth: calculatedBorderWidth,
          },
        ]}
      >
        <MediumText
          style={{
            fontSize: calculatedSize,
            lineHeight: calculatedSize,
            color: calculatedColor,
          }}
        >
          {text}
        </MediumText>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HighlightedItem;
