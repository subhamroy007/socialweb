import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  selectProfilePictureUri,
  selectShutterConfig,
} from "../../store/appData/selectors";
import { useAppSelector } from "../../store/appStore";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_8,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../../utility/constants";
import Avatar from "../global/Avatar";
import Icon from "../global/Icon";
import RoundedIcon from "../global/RoundedIcon";

const getIconNameFromScreenName = (
  screenName: string,
  isFocused: boolean
): string => {
  switch (screenName) {
    case "ImageFeedScreen":
      return isFocused ? "camera-solid" : "camera-outline";
    case "NotificationScreen":
      return isFocused ? "notification-solid" : "notification-outline";
    case "SavedScreen":
      return isFocused ? "bookmark-solid" : "bookmark-outline";
    case "SettingsScreen":
      return isFocused ? "gear-solid" : "gear-outline";
    case "TrendingScreen":
      return isFocused ? "trending-solid" : "trending-outline";
    case "VideoFeedScreen":
      return isFocused ? "video-solid" : "video-outline";
    default:
      return "profile";
  }
};

const Shutter = ({ insets, state, navigation }: BottomTabBarProps) => {
  const animatableValue = useSharedValue<number>(0);

  const configuration = useAppSelector(selectShutterConfig);

  const profilePictureUri = useAppSelector(selectProfilePictureUri);

  const translationYMin = -(WINDOW_HEIGHT * 0.47 - SIZE_REF_10 * 4);

  const focusedScreen = useMemo<string>(() => {
    let focusedScreen: any = state.routes[state.index].name;

    if (focusedScreen === "Stacks") {
      const tagetState = state.routes[state.index].state;
      focusedScreen = tagetState?.routes[tagetState.index as number];
    }

    return focusedScreen;
  }, [state]);

  const shutterDynamicStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: animatableValue.value,
        },
      ],
      borderTopStartRadius: interpolate(
        animatableValue.value,
        [translationYMin, 0],
        [SIZE_REF_12, 0],
        Animated.Extrapolate.CLAMP
      ),
      borderTopEndRadius: interpolate(
        animatableValue.value,
        [translationYMin, 0],
        [SIZE_REF_12, 0],
        Animated.Extrapolate.CLAMP
      ),
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    };
  }, [insets.bottom, insets.left, insets.right]);

  const overlayDynamicStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatableValue.value,
        [translationYMin, 0],
        [0.7, 0]
      ),
    };
  });

  const panGestureEventCallback = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offset: number }
  >({
    onStart: (_, ctx) => {
      ctx.offset = animatableValue.value;
    },
    onActive: ({ translationY }, ctx) => {
      animatableValue.value = Math.min(
        0,
        Math.max(translationY + ctx.offset, translationYMin)
      );
    },
    onEnd: ({ velocityY, translationY }) => {
      if (animatableValue.value > 0.4 * translationYMin) {
        if (velocityY < 0) {
          animatableValue.value = withTiming(translationYMin, {
            duration: 150,
            easing: Easing.out(Easing.linear),
          });
        } else {
          animatableValue.value = withTiming(0, {
            duration: 150,
            easing: Easing.out(Easing.linear),
          });
        }
      } else {
        if (translationY > 0) {
          animatableValue.value = withTiming(0, {
            duration: 150,
            easing: Easing.out(Easing.linear),
          });
        } else {
          animatableValue.value = withTiming(translationYMin, {
            duration: 150,
            easing: Easing.out(Easing.linear),
          });
        }
      }
    },
  });

  const tapGestureEventCallback = useAnimatedGestureHandler<
    TapGestureHandlerGestureEvent,
    {}
  >({
    onActive: () => {
      animatableValue.value = withTiming(0, {
        duration: 150,
        easing: Easing.out(Easing.linear),
      });
    },
  });

  const cameraIconTapCallback = useCallback(() => {
    const isFocused = state.routes[state.index].name === "ImageFeedScreen";

    const key = state.routes[state.routeNames.indexOf("ImageFeedScreen")].key;
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate<"ImageFeedScreen">({ merge: true, key });
    }
  }, [navigation, state]);

  const videoIconTapCallback = useCallback(() => {
    const isFocused = state.routes[state.index].name === "VideoFeedScreen";

    const key = state.routes[state.routeNames.indexOf("VideoFeedScreen")].key;
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate<"VideoFeedScreen">({ merge: true, key });
    }
  }, [navigation, state]);

  const trendingIconTapCallback = useCallback(() => {
    const isFocused = state.routes[state.index].name === "TrendingScreen";
    const key = state.routes[state.routeNames.indexOf("TrendingScreen")].key;
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate<"TrendingScreen">({ merge: true, key });
    }
  }, [navigation, state]);

  const notificationIconTapCallback = useCallback(() => {
    const isFocused = state.routes[state.index].name === "NotificationScreen";

    const key =
      state.routes[state.routeNames.indexOf("NotificationScreen")].key;
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate<"NotificationScreen">({ merge: true, key });
    }
  }, [navigation, state]);

  const savedIconTapCallback = useCallback(() => {
    const isFocused = state.routes[state.index].name === "SavedScreen";

    const key = state.routes[state.routeNames.indexOf("SavedScreen")].key;
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate<"SavedScreen">({ merge: true, key });
    }
  }, [navigation, state]);

  const settingsIconTapCallback = useCallback(() => {
    const isFocused = state.routes[state.index].name === "SettingsScreen";

    const key = state.routes[state.routeNames.indexOf("SettingsScreen")].key;
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate<"SettingsScreen">({ merge: true, key });
    }
  }, [navigation, state]);

  const iconTapCallbackSelector = useCallback((routeName: string) => {
    switch (routeName) {
      case "ImageFeedScreen":
        return cameraIconTapCallback;
      case "NotificationScreen":
        return notificationIconTapCallback;
      case "SavedScreen":
        return savedIconTapCallback;
      case "SettingsScreen":
        return settingsIconTapCallback;
      case "TrendingScreen":
        return trendingIconTapCallback;
      case "VideoFeedScreen":
        return videoIconTapCallback;
      default:
        return () => {};
    }
  }, []);

  return (
    <>
      <TapGestureHandler onGestureEvent={tapGestureEventCallback}>
        <Animated.View
          style={[styles.overlayStaticStyle, overlayDynamicStyle]}
        ></Animated.View>
      </TapGestureHandler>
      <PanGestureHandler onGestureEvent={panGestureEventCallback}>
        <Animated.View style={[styles.shutterStaticStyle, shutterDynamicStyle]}>
          <View style={styles.headerContainerStaticStyle}>
            {configuration.slice(0, 5).map((item, index) => {
              if (item === "ProfileScreen") {
                return (
                  <Avatar
                    size={SIZE_REF_16 * 3}
                    key={"item" + index}
                    style={styles.avatarStaticStyle}
                    profilePictureUri={profilePictureUri}
                    hasUnSeenStroy={false}
                    showOutline={false}
                  />
                );
              }
              return (
                <Icon
                  name={getIconNameFromScreenName(item, item === focusedScreen)}
                  size={SIZE_REF_16 * 2}
                  onTap={iconTapCallbackSelector(item)}
                  key={"item" + index}
                />
              );
            })}
          </View>
          <View style={styles.bodyContainerStaticStyle}>
            {configuration.slice(5).map((item, index) => {
              return (
                <RoundedIcon
                  name={getIconNameFromScreenName(item, item === focusedScreen)}
                  scale={0.7}
                  size={SIZE_REF_16 * 3}
                  key={"item" + index}
                  style={styles.roundedIconStaticStyle}
                  onTap={iconTapCallbackSelector(item)}
                />
              );
            })}
          </View>
          <View style={styles.footerContainerStaticStyle}></View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  shutterStaticStyle: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.47,
    backgroundColor: "#FDFDFD",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#D1CBCB",
    bottom: -(WINDOW_HEIGHT * 0.47 - SIZE_REF_10 * 4),
    position: "absolute",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    zIndex: 4,
  },
  headerContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: SIZE_REF_4,
    height: SIZE_REF_10 * 4,
  },
  avatarStaticStyle: {
    transform: [{ translateY: -SIZE_REF_8 }],
  },
  overlayStaticStyle: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 3,
  },
  bodyContainerStaticStyle: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    borderTopColor: "#D1CBCB",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: (WINDOW_WIDTH - 4 * SIZE_REF_16 * 3) / 10,
    paddingVertical:
      (WINDOW_HEIGHT * 0.47 -
        4 * SIZE_REF_10 -
        2 * SIZE_REF_16 -
        2 * SIZE_REF_16 * 3) /
      6,
  },
  roundedIconStaticStyle: {
    marginHorizontal: (WINDOW_WIDTH - 4 * SIZE_REF_16 * 3) / 10,
    marginVertical:
      (WINDOW_HEIGHT * 0.47 -
        4 * SIZE_REF_10 -
        2 * SIZE_REF_16 -
        2 * SIZE_REF_16 * 3) /
      6,
  },
  footerContainerStaticStyle: {
    height: SIZE_REF_16 * 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#D1CBCB",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Shutter;
