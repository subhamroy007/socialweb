import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CommentEngagementScreen from "../screens/CommentEngagementScreen";
import PostEngagementScreen from "../screens/PostEngagementScreen";
import VideoPostScreen from "../screens/VideoPostScreen";
import VideoPreviewScreen from "../screens/VIdeoPreviewScreen";
import { RootStackNavigatorParamList } from "../utility/types";
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
      <StackNavigator.Screen
        name="VideoPostScreen"
        component={VideoPostScreen}
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
        name="CommentEngagementScreen"
        component={CommentEngagementScreen}
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
