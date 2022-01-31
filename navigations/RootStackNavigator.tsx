import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  initialWindowMetrics,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StackScreenHeader } from "../components/global/Header";
import Icon from "../components/global/Icon";
import Info from "../components/global/Info";
import LiveScreen from "../screens/LiveScreen";
import OverlayScreen from "../screens/OverlayScreen";
import PostEngagementScreen from "../screens/PostEngagementScreen";
import StoryFeedScreen from "../screens/StoryFeedScreen";
import VideoPostScreen from "../screens/VideoPostScreen";
import VideoPreviewScreen from "../screens/VIdeoPreviewScreen";
import { SIZE_REF_6 } from "../utility/constants";
import { RootStackNavigatorParamList } from "../utility/types";
import { MediumText } from "../utility/ui";
import FollowerFollowingNavigator from "./FollowerFollowingNavigator";
import RootTabNavigator from "./RootTabNavigator";

const StackNavigator = createStackNavigator<RootStackNavigatorParamList>();

const RootStackNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        keyboardHandlingEnabled: true,
        detachPreviousScreen: true,
      }}
    >
      <StackNavigator.Screen name="Tabs" component={RootTabNavigator} />
      <StackNavigator.Screen name="LiveScreen" component={LiveScreen} />
      <StackNavigator.Screen
        name="OverlayScreen"
        component={OverlayScreen}
        options={{
          presentation: "transparentModal",
          cardStyle: { backgroundColor: "transparent" },
          detachPreviousScreen: false,
        }}
      />
      <StackNavigator.Screen
        name="FollowerFollowingStack"
        component={FollowerFollowingNavigator}
      />
      <StackNavigator.Screen
        name="VideoPostScreen"
        component={VideoPostScreen}
      />
      <StackNavigator.Screen
        name="StoryFeedScreen"
        component={StoryFeedScreen}
      />
      <StackNavigator.Screen
        name="PostEngagementScreen"
        component={PostEngagementScreen}
        options={{
          presentation: "modal",
          headerShown: true,
        }}
      />
      <StackNavigator.Screen
        name="VideoPreviewScreen"
        component={VideoPreviewScreen}
        options={{
          presentation: "transparentModal",
          cardStyle: { backgroundColor: "transparent" },
          detachPreviousScreen: false,
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default RootStackNavigator;
