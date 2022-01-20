import React, { useCallback } from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import Icon from "../components/global/Icon";
import {
  HEADER_HEIGHT,
  MAX_SCREEN_REFRESH_TIME_INTERVAL,
  SHUTTER_HEIGHT,
  SIZE_REF_10,
  SIZE_REF_6,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";
import { TrendingScreenNavigatorParamList } from "../utility/types";
import TrendingHashTagScreen from "../screens/trending/TrendingHashTagScreen";
import { StatusBar, StyleSheet } from "react-native";
import TrendingImageScreen from "../screens/trending/TrendingImageScreen";
import TrendingVideoScreen from "../screens/trending/TrendingVideoScreen";
import { useAppDispatch, useAppSelector } from "../store/appStore";
import { switchTrendingScreenFocus } from "../store/appData/slice";
import {
  selectTrendingHashTagIdList,
  selectTrendingImageIdList,
  selectTrendingScreenLastRefreshTimestamp,
  selectTrendingScreenState,
  selectTrendingVideoIdList,
} from "../store/appData/selector";
import { useFocusEffect } from "@react-navigation/native";
import { getInitTrendingDataThunk } from "../store/appData/reducer";
import LoadingIndicator from "../components/global/LoadingIndicator";
import BlankScreenPlaceHolder from "../components/global/BlankScreenPlaceHolder";

const TrendingScreenTab =
  createMaterialTopTabNavigator<TrendingScreenNavigatorParamList>();

const defaultScreenOptions: MaterialTopTabNavigationOptions = {
  lazy: true,
  tabBarShowLabel: false,
  tabBarPressColor: "transparent",
  tabBarPressOpacity: 1,
  tabBarInactiveTintColor: "black",
  tabBarActiveTintColor: "black",
  tabBarIndicatorStyle: {
    backgroundColor: "black",
  },
  tabBarStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "#FDFDFD",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#D1CBCB",
  },
  tabBarItemStyle: {
    marginVertical: -SIZE_REF_6,
  },
  tabBarIconStyle: {
    width: "100%",
    height: "100%",
  },
};

const initialScreenLayout = {
  width: WINDOW_WIDTH,
  height:
    WINDOW_HEIGHT -
    (StatusBar.currentHeight ? StatusBar.currentHeight : 0) -
    HEADER_HEIGHT,
};

const trendingHashTagScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="hashtag-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="hashtag-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const trendingImageScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="camera-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="camera-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const trendingVideoScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="video-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="video-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const TrendingScreenNavigator = () => {
  const state = useAppSelector(selectTrendingScreenState);

  const lastRefreshTimestamp = useAppSelector(
    selectTrendingScreenLastRefreshTimestamp
  );

  const hashTagIdList = useAppSelector(selectTrendingHashTagIdList);
  const imagePostIdList = useAppSelector(selectTrendingImageIdList);
  const videoPostIdList = useAppSelector(selectTrendingVideoIdList);

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      if (
        !lastRefreshTimestamp ||
        Date.now() - lastRefreshTimestamp > MAX_SCREEN_REFRESH_TIME_INTERVAL
      ) {
        dispatch(getInitTrendingDataThunk());
      }
    }, [lastRefreshTimestamp])
  );

  return (
    <>
      {!state || state === "loading" ? (
        <LoadingIndicator
          color="black"
          size={SIZE_REF_10 * 4}
          style={styles.spinnerStaticStyle}
        />
      ) : state === "failure" &&
        (!hashTagIdList || hashTagIdList.length === 0) &&
        (!imagePostIdList || imagePostIdList.length === 0) &&
        (!videoPostIdList || videoPostIdList.length === 0) ? (
        <BlankScreenPlaceHolder icon="chevron-down" text="" />
      ) : (
        <TrendingScreenTab.Navigator
          initialLayout={initialScreenLayout}
          backBehavior="none"
          screenOptions={defaultScreenOptions}
          sceneContainerStyle={styles.sceneContainerStaticStyle}
          screenListeners={{
            focus: ({ target }) => {
              if (target?.startsWith("TrendingHashTagScreen")) {
                dispatch(switchTrendingScreenFocus("hashtag"));
              } else if (target?.startsWith("TrendingImageScreen")) {
                dispatch(switchTrendingScreenFocus("imagePost"));
              } else {
                dispatch(switchTrendingScreenFocus("videoPost"));
              }
            },
          }}
        >
          <TrendingScreenTab.Screen
            name="TrendingHashTagScreen"
            component={TrendingHashTagScreen}
            options={trendingHashTagScreenOptions}
          />
          <TrendingScreenTab.Screen
            name="TrendingImageScreen"
            component={TrendingImageScreen}
            options={trendingImageScreenOptions}
          />
          <TrendingScreenTab.Screen
            name="TrendingVideoScreen"
            component={TrendingVideoScreen}
            options={trendingVideoScreenOptions}
          />
        </TrendingScreenTab.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sceneContainerStaticStyle: {
    paddingBottom: Math.floor((SHUTTER_HEIGHT * 4) / 25),
    backgroundColor: "#FDFDFD",
  },
  spinnerStaticStyle: {
    width: "100%",
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
});

export default TrendingScreenNavigator;