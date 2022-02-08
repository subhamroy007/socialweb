import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import {
  SIZE_REF_1,
  SIZE_REF_12,
  SOLID_COLOR_2,
  SOLID_COLOR_3,
  SOLID_COLOR_4,
  SOLID_COLOR_5,
} from "../../utility/constants";
import APP_STYLE from "../../utility/styles";
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
  const calculatedType = type ? type : "outline";

  const calculatedSize = size ? size : SIZE_REF_12;

  const calculatedBorderRadius = borderRadius ? borderRadius : calculatedSize;

  const calculatedBorderWidth =
    calculatedType === "solid" ? 0 : borderWidth ? borderWidth : SIZE_REF_1;

  const calculatedBorderColor = borderColor ? borderColor : SOLID_COLOR_3;

  const calculatedBackGroundColor =
    calculatedType === "outline"
      ? "transparent"
      : backgroundColor
      ? backgroundColor
      : SOLID_COLOR_2;

  const calculatedColor = color
    ? color
    : calculatedType === "outline"
    ? SOLID_COLOR_4
    : SOLID_COLOR_5;

  const calculatedPadding =
    calculatedType === "solid"
      ? 0.47 * calculatedSize
      : 0.47 * calculatedSize - calculatedBorderWidth;

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
            padding: calculatedPadding,
            borderColor: calculatedBorderColor,
            backgroundColor: calculatedBackGroundColor,
            borderWidth: calculatedBorderWidth,
            borderRadius: calculatedBorderRadius,
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
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_JUSTIFY_CENTER,
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
  },
});

export default HighlightedItem;
