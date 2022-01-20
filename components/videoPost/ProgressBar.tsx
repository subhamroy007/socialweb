import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  GestureEvent,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import {
  SIZE_REF_2,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
} from "../../utility/constants";

export interface ProgressBarProps {
  min?: number;
  max?: number;
  step?: number;
  size?: number;
  value: number;
  onValueChange?: (timestamp: number, postion: number) => void;
  orientation?: "horizontal" | "vertical";
  backgroundColor?: string;
  foregroundColor?: string;
  thumbSize?: number;
  thumbColor?: string;
  extraValue?: number;
  extraForegroundColor?: string;
  style?: StyleProp<ViewStyle>;
  onEnd?: () => void;
}

const ProgressBar = ({
  value,
  backgroundColor,
  extraForegroundColor,
  extraValue,
  foregroundColor,
  max,
  min,
  onValueChange,
  orientation,
  size,
  step,
  thumbColor,
  thumbSize,
  style,
  onEnd,
}: ProgressBarProps) => {
  const [thumbAbsolute, setThumbAbsolute] = useState<number | undefined>();

  const calculatedValue =
    Math.round(
      (((value - (min ? min : 0)) * 100) /
        ((max ? max : 100) - (min ? min : 0))) *
        100
    ) / 100;

  const calculatedBackGroundColor = backgroundColor
    ? backgroundColor
    : "rgba(255, 255, 255, 0.3)";

  const calculatedExtraForeGroundColor = extraForegroundColor
    ? extraForegroundColor
    : "rgba(255, 255, 255, 0.7)";

  const calculatedExtraValue =
    Math.round(
      ((((extraValue ? extraValue : 0) - (min ? min : 0)) * 100) /
        ((max ? max : 100) - (min ? min : 0))) *
        100
    ) / 100;

  const calculatedForeGroundColor = foregroundColor ? foregroundColor : "red";

  const calculatedOrientation = orientation ? orientation : "horizontal";

  const calculatedSize = size ? size : SIZE_REF_2;

  const calculatedThumbSize = thumbSize ? thumbSize : SIZE_REF_8;

  const calculatedThumbColor = thumbColor
    ? thumbColor
    : calculatedForeGroundColor;

  const rootContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      style,
      styles.rootContainerStaticStyle,
      {
        backgroundColor: calculatedBackGroundColor,
        width: calculatedOrientation === "horizontal" ? "100%" : calculatedSize,
        height: calculatedOrientation === "vertical" ? "100%" : calculatedSize,
        flexDirection:
          calculatedOrientation === "horizontal" ? "row" : "column",
      },
    ];
  }, [calculatedBackGroundColor, calculatedSize, calculatedOrientation, style]);

  const loadedContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      styles.loadedContainerStaticStyle,
      {
        backgroundColor: calculatedForeGroundColor,
        width:
          calculatedOrientation === "horizontal"
            ? calculatedValue + "%"
            : undefined,
        height:
          calculatedOrientation === "vertical"
            ? calculatedValue + "%"
            : undefined,
      },
    ];
  }, [calculatedForeGroundColor, calculatedValue]);

  const extraContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      styles.extraContainerStyle,
      {
        backgroundColor: calculatedExtraForeGroundColor,
        width:
          calculatedOrientation === "horizontal"
            ? calculatedExtraValue + "%"
            : calculatedSize,
        height:
          calculatedOrientation === "vertical"
            ? calculatedExtraValue + "%"
            : calculatedSize,
      },
    ];
  }, [
    calculatedExtraForeGroundColor,
    calculatedExtraValue,
    calculatedSize,
    calculatedOrientation,
  ]);

  const thumbDynamicStyle = useMemo<StyleProp<ViewStyle>>(() => {
    const gap = (calculatedThumbSize - calculatedSize) / 2;

    return [
      styles.thumbStaticStyle,
      {
        width: calculatedThumbSize,
        height: calculatedThumbSize,
        backgroundColor: calculatedThumbColor,
        left:
          calculatedOrientation === "horizontal"
            ? thumbAbsolute
              ? thumbAbsolute
              : calculatedValue + "%"
            : -gap,
        bottom:
          calculatedOrientation === "vertical"
            ? thumbAbsolute
              ? thumbAbsolute
              : calculatedValue + "%"
            : -gap,
        borderRadius: calculatedThumbSize * 0.5,
      },
    ];
  }, [
    calculatedSize,
    calculatedThumbColor,
    calculatedThumbSize,
    calculatedValue,
    calculatedOrientation,
    thumbAbsolute,
  ]);

  const length = useRef<number>(0);

  const lastStepValue = useRef<number | undefined>();

  const panGestureHandlerCallback = useCallback(
    ({
      nativeEvent: { state, absoluteX, absoluteY },
    }: GestureEvent<PanGestureHandlerEventPayload>) => {
      if (state === State.ACTIVE) {
        setThumbAbsolute(
          calculatedOrientation === "horizontal" ? absoluteX : absoluteY
        );
        let valueInMillis = 0;
        if (length.current != 0) {
          valueInMillis = Math.floor(
            (((max ? max : 100) - (min ? min : 0)) * absoluteX) /
              (length.current * (step ? step : 1))
          );
        }
        if (onValueChange && lastStepValue.current !== valueInMillis) {
          onValueChange(
            valueInMillis * (step ? step : 1),
            calculatedOrientation === "horizontal" ? absoluteX : absoluteY
          );
          lastStepValue.current = valueInMillis;
        }
      }
    },
    [onValueChange, min, max, step, calculatedOrientation]
  );

  const layoutChangeCallback = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }: LayoutChangeEvent) => {
      length.current = width;
    },
    []
  );

  const panGestureStateChangeHandler = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
      if (state !== State.ACTIVE) {
        setThumbAbsolute(undefined);
        lastStepValue.current = undefined;
        if (onEnd) {
          onEnd();
        }
      }
    },
    []
  );

  return (
    <View style={rootContainerDynamicStyle} onLayout={layoutChangeCallback}>
      <View style={loadedContainerDynamicStyle}></View>
      <View style={[extraContainerDynamicStyle]}></View>
      <PanGestureHandler
        avgTouches={true}
        enableTrackpadTwoFingerGesture={true}
        shouldCancelWhenOutside={false}
        onGestureEvent={panGestureHandlerCallback}
        onHandlerStateChange={panGestureStateChangeHandler}
      >
        <View style={thumbDynamicStyle}></View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  extraContainerStyle: {
    position: "absolute",
    zIndex: 4,
  },
  loadedContainerStaticStyle: {
    zIndex: 5,
  },
  thumbStaticStyle: {
    position: "absolute",
    zIndex: 6,
  },
});

export default ProgressBar;
