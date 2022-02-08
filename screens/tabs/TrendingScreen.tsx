import React, { useCallback, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import APP_STYLE, { globalColors, globalLayouts } from "../../utility/styles";
import TrendingHashTagScreen from "../trending/TrendingHashTagScreen";
import TrendingImageScreen from "../trending/TrendingImageScreen";
import TrendingVideoScreen from "../trending/TrendingVideoScreen";

export interface TrendingScreenState {
  loadedState: {
    hashtags: boolean;
    images: boolean;
    videos: boolean;
  };
}

const TrendingScreen = () => {
  const [screenInfo, setScreenInfo] = useState<TrendingScreenState>({
    loadedState: { hashtags: true, images: true, videos: true },
  });

  const onPageChange = useCallback(
    ({ nativeEvent: { position } }: PagerViewOnPageSelectedEvent) => {
      if (position === 1 && !screenInfo.loadedState.videos) {
        setScreenInfo((info) => ({
          ...info,
          loadedState: { ...info.loadedState, videos: true },
        }));
      } else if (position === 2 && !screenInfo.loadedState.images) {
        setScreenInfo((info) => ({
          ...info,
          loadedState: { ...info.loadedState, images: true },
        }));
      }
    },
    [screenInfo, setScreenInfo]
  );

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      <StatusBar
        animated={true}
        backgroundColor={"#FDFDFD"}
        barStyle={"dark-content"}
      />
      <PagerView
        initialPage={2}
        style={styles.pageContainerStaticStyle}
        keyboardDismissMode="on-drag"
        onPageSelected={onPageChange}
      >
        <View
          style={styles.sceneContainerStaticStyle}
          key="hashtag-list"
          collapsable={false}
        >
          {screenInfo.loadedState.hashtags && <TrendingHashTagScreen />}
        </View>
        <View
          style={styles.sceneContainerStaticStyle}
          key="video-list"
          collapsable={false}
        >
          {screenInfo.loadedState.videos && <TrendingVideoScreen />}
        </View>
        <View
          style={styles.sceneContainerStaticStyle}
          key="image-list"
          collapsable={false}
        >
          {screenInfo.loadedState.videos && <TrendingImageScreen />}
        </View>
      </PagerView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainerStaticStyle: {
    ...APP_STYLE.WIDTH_RELATIVE_100,
    ...APP_STYLE.FLEX_1,
    ...APP_STYLE.BACKGROUND_PRIMARY_LIGHT_COLOR,
  },
  sceneContainerStaticStyle: {
    ...APP_STYLE.WIDTH_RELATIVE_100,
    ...APP_STYLE.HEIGHT_RELATIVE_100,
  },
});

export default TrendingScreen;
