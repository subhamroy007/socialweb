import React, { useCallback, useRef } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SHUTTER_ICON_HORIZONTAL_MARGIN,
  SHUTTER_ICON_VERTICAL_MARGIN,
  SHUTTER_SCROLL_EVENT_THROTTLE,
  SIZE_REF_6,
} from "../../utility/constants";
import { globalColors } from "../../utility/styles";
import { MainTabNavigationBarProps } from "../../utility/types";
import RoundedIcon from "../global/RoundedIcon";
import ShutterBodyListItem from "./ShutterBodyListItem";

const ShutterBody = ({
  onTabPress,
  activeIndex,
  routes,
}: MainTabNavigationBarProps) => {
  //atomic value that controls the animation based on the scroll content offset
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

  //callback that is fired continously between the scroll start and end
  //it sets the the 'scrollX' with current scroll content offset
  const scrollCallback = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollX.setValue(event.nativeEvent.contentOffset.x);
    },
    [scrollX]
  );

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

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.shutterBodyColor, styles.shutterBody]}
    >
      {/* scroll component that holds the list items and gives a paginated horizontal scroll experience */}
      <SafeAreaView style={[styles.shutterBodyContainer]} edges={[]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          scrollEventThrottle={SHUTTER_SCROLL_EVENT_THROTTLE}
          onScroll={scrollCallback}
        >
          <ShutterBodyListItem>
            {routes.slice(5).map((item, index) => {
              switch (item) {
                case "VideoFeedScreen":
                  return (
                    <RoundedIcon
                      name={
                        routes[activeIndex] === "VideoFeedScreen"
                          ? "video-solid"
                          : "video-outline"
                      }
                      color="black"
                      size={SIZE_REF_6 * 7}
                      scale={0.7}
                      style={styles.icon}
                      tapEnabled={true}
                      onTap={navigateToVideoFeedScreen}
                      key={"item" + index}
                    />
                  );
                case "TrendingScreen":
                  return (
                    <RoundedIcon
                      name={
                        routes[activeIndex] === "TrendingScreen"
                          ? "trending-solid"
                          : "trending-outline"
                      }
                      color="black"
                      size={SIZE_REF_6 * 7}
                      scale={0.7}
                      style={styles.icon}
                      tapEnabled={true}
                      onTap={navigateToTrendingScreen}
                      key={"item" + index}
                    />
                  );
                case "NotificationScreen":
                  return (
                    <RoundedIcon
                      name={
                        routes[activeIndex] === "NotificationScreen"
                          ? "notification-solid"
                          : "notification-outline"
                      }
                      color="black"
                      size={SIZE_REF_6 * 7}
                      scale={0.7}
                      style={styles.icon}
                      tapEnabled={true}
                      onTap={navigateToNotificationScreen}
                      key={"item" + index}
                    />
                  );
                case "SavedDataScreen":
                  return (
                    <RoundedIcon
                      name={
                        routes[activeIndex] === "SavedDataScreen"
                          ? "bookmark-solid"
                          : "bookmark-outline"
                      }
                      color="black"
                      size={SIZE_REF_6 * 7}
                      scale={0.7}
                      style={styles.icon}
                      tapEnabled={true}
                      onTap={navigateToSavedScreen}
                      key={"item" + index}
                    />
                  );
                case "SettingsScreen":
                  return (
                    <RoundedIcon
                      name={
                        routes[activeIndex] === "SettingsScreen"
                          ? "gear-solid"
                          : "gear-outline"
                      }
                      color="black"
                      size={SIZE_REF_6 * 7}
                      scale={0.7}
                      style={styles.icon}
                      tapEnabled={true}
                      onTap={navigateToSettingsScreen}
                      key={"item" + index}
                    />
                  );
              }
            })}
          </ShutterBodyListItem>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shutterBody: {
    flex: 18,
    width: "100%",
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBodyContainer: {
    width: "100%",
  },
  icon: {
    marginTop: SHUTTER_ICON_VERTICAL_MARGIN,
    marginRight: SHUTTER_ICON_HORIZONTAL_MARGIN,
  },
});

export default ShutterBody;
