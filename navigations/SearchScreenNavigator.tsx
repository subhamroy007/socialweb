import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import Icon from "../components/global/Icon";
import {
  HEADER_HEIGHT,
  SHUTTER_HEIGHT,
  SIZE_REF_10,
  SIZE_REF_6,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";
import { StatusBar, StyleSheet } from "react-native";
import { SearchScreenNavigationParamList } from "../utility/types";
import SearchedAccountScreen from "../screens/search/SearchedAccountScreen";
import SearchedHashTagScreen from "../screens/search/SearchedHashTagScreen";
import SearchedImagePostScreen from "../screens/search/SearchedImagePostScreen";
import SearchedVideoPostScreen from "../screens/search/SearchedVideoPostScreen";

const SearchScreenTab =
  createMaterialTopTabNavigator<SearchScreenNavigationParamList>();

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

const searchedHashTagScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="hashtag-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="hashtag-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const searchedImageScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="camera-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="camera-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const searchedVideoScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="video-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="video-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const searchedAccountScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="user-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="user-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const SearchScreenNavigator = () => {
  return (
    <SearchScreenTab.Navigator
      keyboardDismissMode="auto"
      initialLayout={initialScreenLayout}
      backBehavior="none"
      screenOptions={defaultScreenOptions}
      sceneContainerStyle={styles.sceneContainerStaticStyle}
    >
      <SearchScreenTab.Screen
        name="SearchedAccount"
        component={SearchedAccountScreen}
        options={searchedAccountScreenOptions}
      />
      <SearchScreenTab.Screen
        name="SearchedHashTag"
        component={SearchedHashTagScreen}
        options={searchedHashTagScreenOptions}
      />
      <SearchScreenTab.Screen
        name="SearchedImagePost"
        component={SearchedImagePostScreen}
        options={searchedImageScreenOptions}
      />
      <SearchScreenTab.Screen
        name="SearchedVideoPost"
        component={SearchedVideoPostScreen}
        options={searchedVideoScreenOptions}
      />
    </SearchScreenTab.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainerStaticStyle: {
    paddingBottom: Math.floor((SHUTTER_HEIGHT * 4) / 25),
    backgroundColor: "#FDFDFD",
  },
});

export default SearchScreenNavigator;
