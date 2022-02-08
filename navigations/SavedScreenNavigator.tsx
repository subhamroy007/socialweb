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
import { StatusBar, StyleSheet } from "react-native";
import { SavedScreenNavigatorParamList } from "../utility/types";
import SavedHashTagScreen from "../screens/saved/SavedHashTagScreen";
import SavedImagePostScreen from "../screens/saved/SavedImagePostScreen";
import SavedVideoPostScreen from "../screens/saved/SavedVideoPostScreen";

const SavedScreenTab =
  createMaterialTopTabNavigator<SavedScreenNavigatorParamList>();

const defaultScreenOptions: MaterialTopTabNavigationOptions = {
  lazy: false,
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

const savedHashTagScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="hashtag-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="hashtag-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const savedImageScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="camera-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="camera-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const savedVideoScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) =>
    focused ? (
      <Icon name="video-solid" color={color} size={SIZE_REF_10 * 3} />
    ) : (
      <Icon name="video-outline" color={color} size={SIZE_REF_10 * 3} />
    ),
};

const SavedScreenNavigator = () => {
  return (
    <SavedScreenTab.Navigator
      backBehavior="none"
      // screenOptions={defaultScreenOptions}
    >
      <SavedScreenTab.Screen
        name="SavedHashTagScreen"
        component={SavedHashTagScreen}
        // options={savedHashTagScreenOptions}
      />
      <SavedScreenTab.Screen
        name="SavedImagePostScreen"
        component={SavedImagePostScreen}
        // options={savedImageScreenOptions}
      />
      <SavedScreenTab.Screen
        name="SavedVideoPostScreen"
        component={SavedVideoPostScreen}
        // options={savedVideoScreenOptions}
      />
    </SavedScreenTab.Navigator>
  );
};

export default SavedScreenNavigator;
