import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Icon from "../components/global/Icon";
import CommentScreen from "../screens/engagement/CommentScreen";
import LikeScreen from "../screens/engagement/LikeScreen";
import ShareScreen from "../screens/engagement/ShareSreen";
import { RootState, useAppSelector } from "../store/appStore";
import { selectImagePostLikesCommentShareCount } from "../store/imagePost/selectors";
import {
  HEADER_HEIGHT,
  SIZE_REF_10,
  SIZE_REF_6,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";
import {
  PostEngagementNavigatorParamList,
  RootStackNavigatorParamList,
} from "../utility/types";

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

const LikeScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) => {
    return focused ? (
      <Icon color={color} name="heart-solid" size={SIZE_REF_10 * 3} />
    ) : (
      <Icon color={color} name="heart-outline" size={SIZE_REF_10 * 3} />
    );
  },
};

const CommentScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) => {
    return focused ? (
      <Icon color={color} name="comment-solid" size={SIZE_REF_10 * 3} />
    ) : (
      <Icon color={color} name="comment-outline" size={SIZE_REF_10 * 3} />
    );
  },
};

const ShareScreenOptions: MaterialTopTabNavigationOptions = {
  tabBarIcon: ({ color, focused }) => {
    return focused ? (
      <Icon color={color} name="share-solid" size={SIZE_REF_10 * 3} />
    ) : (
      <Icon color={color} name="share-outline" size={SIZE_REF_10 * 3} />
    );
  },
};

const TabNavigator =
  createMaterialTopTabNavigator<PostEngagementNavigatorParamList>();

type PostEngagementNavigatorProps = StackScreenProps<
  RootStackNavigatorParamList,
  "PostEngagementStack"
>;

const PostEngagementNavigator = ({
  navigation,
  route,
}: PostEngagementNavigatorProps) => {
  const id = route.params.params?.id;
  const type = route.params.params?.type;

  const countsSelectorCallback = useCallback(
    (state: RootState) => {
      return selectImagePostLikesCommentShareCount(state, id as string);
    },
    [id, type]
  );

  const counts = useAppSelector(countsSelectorCallback);

  return (
    <TabNavigator.Navigator
      keyboardDismissMode="on-drag"
      initialLayout={initialScreenLayout}
      backBehavior="none"
      screenOptions={defaultScreenOptions}
      initialRouteName="CommentScreen"
      screenListeners={{
        focus: ({ target }) => {
          if (target?.startsWith("LikeScreen")) {
            navigation.setOptions({
              headerTitle: "Likes " + counts?.likesCount,
            });
          } else if (target?.startsWith("CommentScreen")) {
            navigation.setOptions({
              headerTitle: "Comments " + counts?.commentsCount,
            });
          } else if (target?.startsWith("ShareScreen")) {
            navigation.setOptions({
              headerTitle: "Shares " + counts?.sharesCount,
            });
          }
        },
      }}
      sceneContainerStyle={styles.sceneContainerStaticStyle}
    >
      <TabNavigator.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={LikeScreenOptions}
      />
      <TabNavigator.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={CommentScreenOptions}
      />
      <TabNavigator.Screen
        name="ShareScreen"
        component={ShareScreen}
        options={ShareScreenOptions}
      />
    </TabNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainerStaticStyle: { backgroundColor: "#FDFDFD" },
});

export default PostEngagementNavigator;
