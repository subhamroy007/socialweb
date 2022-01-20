import React, { ReactElement, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { shallowEqual } from "react-redux";
import { SIZE_REF_8 } from "../../utility/constants";
import { Id, MediaInfo } from "../../utility/types";

export interface VideoOverlayProps {
  children: ReactElement<any> | ReactElement<any>[] | string | undefined;
}

const VideoOverlay = ({ children }: VideoOverlayProps) => {
  const animationControlData = useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;

  const overlayDynamicStyle = useMemo(() => {
    return [styles.overlayStaticStyle, { opacity: animationControlData }];
  }, []);

  useEffect(() => {
    Animated.timing(animationControlData, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start();

    return () => {
      animationControlData.stopAnimation();
    };
  }, []);

  return <Animated.View style={overlayDynamicStyle}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  overlayStaticStyle: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    padding: SIZE_REF_8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default VideoOverlay;
