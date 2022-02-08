import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import Icon from "../components/global/Icon";
import {
  HEADER_HEIGHT,
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
import NewIcon from "../components/global/NewIcon";

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
  tabBarIconStyle: {
    width: "100%",
    height: "100%",
  },
};

const trendingHashTagScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <NewIcon name="hashtag-solid" size={SIZE_REF_10 * 2} color={color} />
    ) : (
      <NewIcon name="hashtag-solid" size={SIZE_REF_10 * 2} color={"grey"} />
    ),
};

const trendingImageScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <NewIcon name="image-nav-bold" size={SIZE_REF_10 * 2} color={color} />
    ) : (
      <NewIcon name="image-nav-bold" size={SIZE_REF_10 * 2} color={"grey"} />
    ),
};

const trendingVideoScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <NewIcon name="video-solid" size={SIZE_REF_10 * 2} color={color} />
    ) : (
      <NewIcon name="video-solid" size={SIZE_REF_10 * 2} color={"grey"} />
    ),
};

const TrendingScreenNavigator = () => {
  return (
    <TrendingScreenTab.Navigator
      backBehavior="none"
      screenOptions={defaultScreenOptions}
      sceneContainerStyle={styles.sceneContainerStaticStyle}
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
  );
};

const styles = StyleSheet.create({
  sceneContainerStaticStyle: {
    backgroundColor: "#FDFDFD",
  },
});

export default TrendingScreenNavigator;
