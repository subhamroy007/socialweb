import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LiveScreen from "../screens/LiveScreen";
import OverlayScreen from "../screens/OverlayScreen";
import StoryFeedScreen from "../screens/StoryFeedScreen";
import VideoPostScreen from "../screens/VideoPostScreen";
import VideoPreviewScreen from "../screens/VIdeoPreviewScreen";
import { RootStackNavigatorParamList } from "../utility/types";
import FollowerFollowingNavigator from "./FollowerFollowingNavigator";
import PostEngagementNavigator from "./PostEngagementNavigator";
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
        name="PostEngagementStack"
        component={PostEngagementNavigator}
        options={{
          // header: (props) => <MetaScreenHeader {...props} />,
          headerShown: true,
          headerTitle: "Comments",
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
