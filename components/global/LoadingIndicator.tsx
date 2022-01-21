import React, { useEffect } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SIZE_REF_8 } from "../../utility/constants";
import Icon from "./Icon";

export interface LoadingIndicatorProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const LoadingIndicator = ({ size, color, style }: LoadingIndicatorProps) => {
  const calculatedSize = size ? size : SIZE_REF_8 * 3;

  const calculatedColor = color ? color : "#D1CBCB";

  const animatedValue = useSharedValue<number>(0);

  const rootContainerDynamicStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: animatedValue.value + "deg" }],
    };
  });

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(360, {
        duration: 400,
        easing: Easing.inOut(Easing.linear),
      }),
      400,
      false
    );
  }, []);

  return (
    <Animated.View
      style={[style, rootContainerDynamicStyle]}
      exiting={FadeOut.duration(200).easing(Easing.out(Easing.quad))}
    >
      <Icon color={calculatedColor} name="loading" size={calculatedSize} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rootConatainerStaticStyle: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingIndicator;
