import React, { useMemo } from "react";
import { Animated, Easing } from "react-native";
import {
  SHUTTER_TOP_RADIUS,
  SHUTTER_TRANSLATION_Y_MAX,
  SHUTTER_TRANSLATION_Y_MIN,
} from "../utility/constants";

const useShutterAnimation = (animationControlData: Animated.Value) => {
  const shutterBorderDynamicStyle = useMemo(
    () => ({
      borderTopStartRadius: animationControlData.interpolate({
        inputRange: [SHUTTER_TRANSLATION_Y_MIN, SHUTTER_TRANSLATION_Y_MAX],
        outputRange: [SHUTTER_TOP_RADIUS, 0],
        easing: Easing.linear,
      }),
      borderTopEndRadius: animationControlData.interpolate({
        inputRange: [SHUTTER_TRANSLATION_Y_MIN, SHUTTER_TRANSLATION_Y_MAX],
        outputRange: [SHUTTER_TOP_RADIUS, 0],
        easing: Easing.linear,
      }),
    }),
    [animationControlData]
  );

  const shutterTranslationDynamicStyle = useMemo(
    () => ({ transform: [{ translateY: animationControlData }] }),
    [animationControlData]
  );

  return { shutterTranslationDynamicStyle, shutterBorderDynamicStyle };
};

export default useShutterAnimation;
