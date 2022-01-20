import React, { useCallback } from "react";
import useShutterAnimation from "../../hooks/useShutterAnimation";
import { StyleSheet } from "react-native";
import Icon from "../global/Icon";
import ProfileIcon from "./ProfileIcon";
import { MainTabNavigationBarProps } from "../../utility/types";
import { AnimatedSafeAreaView } from "../../utility/ui";
import { globalColors } from "../../utility/styles";
import { SIZE_REF_14, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";

const MainTabNavigationBar = ({
  animationControlData,
  onTabPress,
  activeIndex,
  routes,
}: MainTabNavigationBarProps) => {
  const { shutterBorderDynamicStyle } =
    useShutterAnimation(animationControlData);

  const navigateToImageFeedScreen = useCallback(
    () => onTabPress("ImageFeedScreen"),
    []
  );

  const navigateToVideoFeedScreen = useCallback(
    () => onTabPress("VideoFeedScreen"),
    []
  );

  const navigateToProfileScreen = useCallback(
    () => onTabPress("ProfileScreen"),
    []
  );

  const navigateToTrendingScreen = useCallback(
    () => onTabPress("TrendingScreen"),
    []
  );

  const navigateToNotificationScreen = useCallback(
    () => onTabPress("NotificationScreen"),
    []
  );
  const navigateToSavedScreen = useCallback(
    () => onTabPress("SavedDataScreen"),
    []
  );

  const navigateToSettingsScreen = useCallback(
    () => onTabPress("SettingsScreen"),
    []
  );
  //iterate through all the route names and render the appropriate navigation icons for each routeName
  return (
    <AnimatedSafeAreaView
      style={[
        styles.shutterHeader,
        globalColors.shutterHeaderColor,
        //note that shutterDynamicStyle is used in both shutter and shutter-header component
        //because both transition effect is same and depend on the same atomic value
        shutterBorderDynamicStyle,
      ]}
      edges={[]}
    >
      {routes.slice(0, 5).map((item, index) => {
        switch (item) {
          case "ImageFeedScreen":
            return (
              <Icon
                name={
                  routes[activeIndex] === "ImageFeedScreen"
                    ? "camera-solid"
                    : "camera-outline"
                }
                color="black"
                size={SIZE_REF_16 + SIZE_REF_14}
                onPress={navigateToImageFeedScreen}
                key={"icon" + index}
              />
            );
          case "VideoFeedScreen":
            return (
              <Icon
                name={
                  routes[activeIndex] === "VideoFeedScreen"
                    ? "video-solid"
                    : "video-outline"
                }
                color="black"
                size={SIZE_REF_16 + SIZE_REF_14}
                onPress={navigateToVideoFeedScreen}
                key={"icon" + index}
              />
            );
          case "ProfileScreen":
            return (
              <ProfileIcon
                key={"icon" + index}
                style={{ transform: [{ translateY: -8 }] }}
                size={SIZE_REF_8 * 6}
                onPress={navigateToProfileScreen}
              />
            );
          case "TrendingScreen":
            return (
              <Icon
                name={
                  routes[activeIndex] === "TrendingScreen"
                    ? "trending-solid"
                    : "trending-outline"
                }
                color="black"
                size={SIZE_REF_16 + SIZE_REF_14}
                onPress={navigateToTrendingScreen}
                key={"icon" + index}
              />
            );
          case "NotificationScreen":
            return (
              <Icon
                name={
                  routes[activeIndex] === "NotificationScreen"
                    ? "notification-solid"
                    : "notification-outline"
                }
                color="black"
                size={SIZE_REF_16 + SIZE_REF_14}
                onPress={navigateToNotificationScreen}
                key={"icon" + index}
              />
            );
          case "SavedDataScreen":
            return (
              <Icon
                name={
                  routes[activeIndex] === "SavedDataScreen"
                    ? "bookmark-solid"
                    : "bookmark-outline"
                }
                color="black"
                size={SIZE_REF_16 + SIZE_REF_14}
                onPress={navigateToSavedScreen}
                key={"icon" + index}
              />
            );
          case "SettingsScreen":
            return (
              <Icon
                name={
                  routes[activeIndex] === "SettingsScreen"
                    ? "gear-solid"
                    : "gear-outline"
                }
                color="black"
                size={SIZE_REF_16 + SIZE_REF_14}
                onPress={navigateToSettingsScreen}
                key={"icon" + index}
              />
            );
        }
      })}
    </AnimatedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  shutterHeader: {
    flex: 4,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 1,
  },
});
export default MainTabNavigationBar;
