import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { Layout } from "@react-navigation/stack/lib/typescript/src/types";
import React from "react";
import { View } from "react-native";
import Icon from "../components/global/Icon";
import RoundedIcon from "../components/global/RoundedIcon";
import FollowerScreen from "../screens/follower_following/FollowerScreen";
import FollowingScreen from "../screens/follower_following/FollowingScreen";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utility/constants";
import { FollowerFollowingNavigatorParamList } from "../utility/types";
import { MediumText } from "../utility/ui";

const FollowerScreenLazyPlaceHolder = () => {
  return (
    <View
      style={{
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
      }}
    >
      <RoundedIcon
        name="user-solid"
        backgroundColor="transparent"
        size={40}
        scale={0.7}
        style={{ borderColor: "black", borderWidth: 1 }}
      />
    </View>
  );
};

const Tab =
  createMaterialTopTabNavigator<FollowerFollowingNavigatorParamList>();

const initialLayout: Partial<Layout> = {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT - 0.1 * WINDOW_HEIGHT,
};

const defaultScreenOptions: MaterialTopTabNavigationOptions = {
  lazy: true,
  lazyPlaceholder: () => <FollowerScreenLazyPlaceHolder />,
  tabBarShowIcon: false,
  tabBarAllowFontScaling: true,
  tabBarPressColor: "transparent",
  tabBarPressOpacity: 1,
  tabBarInactiveTintColor: "grey",
  tabBarActiveTintColor: "black",
  tabBarIndicatorStyle: {
    backgroundColor: "black",
  },
  tabBarIndicatorContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1CBCB",
  },
  tabBarStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "#FDFDFD",
  },
};

const followerScreenOption: MaterialTopTabNavigationOptions = {
  tabBarLabel: ({ color, focused }) => (
    <MediumText style={{ fontSize: 14, color: color }}>follower</MediumText>
  ),
};

const followingScreenOption: MaterialTopTabNavigationOptions = {
  tabBarLabel: ({ color, focused }) => (
    <MediumText style={{ fontSize: 14, color: color }}>following</MediumText>
  ),
};

const FollowerFollowingNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName="FollowerScreen"
      initialLayout={initialLayout}
      overScrollMode="auto"
      overdrag={true}
      defaultScreenOptions={defaultScreenOptions}
    >
      <Tab.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={followerScreenOption}
      />
      <Tab.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={followingScreenOption}
      />
    </Tab.Navigator>
  );
};

export default FollowerFollowingNavigator;
