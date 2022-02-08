import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { BottomTabScreenHeader } from "../components/global/Header";
import Icon from "../components/global/Icon";
import Info from "../components/global/Info";
import NewIcon from "../components/global/NewIcon";
import Shutter from "../components/shutter/Shutter";
import NewImageFeedScreen from "../screens/NewImageFeedScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SavedHashTagScreen from "../screens/saved/SavedHashTagScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TrendingScreen from "../screens/tabs/TrendingScreen";
import VideoFeedScreen from "../screens/tabs/VideoFeedScreen";
import {
  SHUTTER_HEIGHT,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_2,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
} from "../utility/constants";
import { RootTabNavigatorParamList } from "../utility/types";
import { MediumText } from "../utility/ui";
import SavedScreenNavigator from "./SavedScreenNavigator";
import TrendingScreenNavigator from "./TrendingScreenNavigator";
import UtilityStackNavigator from "./UtilityStackNavigator";

const TabNavigator = createBottomTabNavigator<RootTabNavigatorParamList>();

const RootTabNavigator = () => {
  return (
    <TabNavigator.Navigator
      backBehavior="history"
      tabBar={(props) => <Shutter {...props} />}
      initialRouteName="ImageFeedScreen"
      sceneContainerStyle={styles.sceneContainerStaticStyle}
    >
      <TabNavigator.Screen
        name="ImageFeedScreen"
        component={NewImageFeedScreen}
        options={{
          header: (props) => (
            <BottomTabScreenHeader
              headerProps={props}
              hasSeparator={true}
              leftSideComponent={
                <MediumText style={styles.headerTextStaticStyle}>
                  Social
                </MediumText>
              }
              rightSideComponent={
                <>
                  <Icon
                    name="plus-outline"
                    size={SIZE_REF_10 * 2}
                    style={styles.secondaryRightSideGap}
                  />
                  <Icon
                    name="search-regular"
                    size={SIZE_REF_10 * 2}
                    style={styles.rightSideGap}
                  />
                </>
              }
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="VideoFeedScreen"
        component={VideoFeedScreen}
        options={{
          header: (props) => (
            <BottomTabScreenHeader
              headerProps={props}
              hasSeparator={true}
              leftSideComponent={
                <Info
                  textSize={SIZE_REF_6 * 3}
                  pictureGapSize={SIZE_REF_8}
                  picture={<Icon name="video-outline" size={SIZE_REF_12 * 2} />}
                >
                  {(size, color) => (
                    <MediumText
                      style={{ fontSize: size, lineHeight: size, color }}
                    >
                      Videos
                    </MediumText>
                  )}
                </Info>
              }
              rightSideComponent={
                <NewIcon name="magnify-bold" size={SIZE_REF_12 * 2} />
              }
            />
          ),
        }}
      />
      <TabNavigator.Screen name="ProfileScreen" component={ProfileScreen} />
      <TabNavigator.Screen
        name="TrendingScreen"
        component={TrendingScreen}
        options={{
          header: (props) => (
            <BottomTabScreenHeader
              headerProps={props}
              hasSeparator={true}
              leftSideComponent={
                <Info
                  textSize={SIZE_REF_10 * 2}
                  picture={
                    <Icon name="trending-outline" size={SIZE_REF_10 * 2} />
                  }
                >
                  {(size, color) => (
                    <MediumText
                      style={{ fontSize: size, lineHeight: size, color }}
                    >
                      Trending
                    </MediumText>
                  )}
                </Info>
              }
              rightSideComponent={
                <NewIcon
                  name="magnify-bold"
                  size={SIZE_REF_10 * 2}
                  style={styles.rightSideGap}
                />
              }
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <TabNavigator.Screen
        name="SavedScreen"
        component={SavedScreenNavigator}
        options={{
          header: (props) => (
            <BottomTabScreenHeader
              headerProps={props}
              hasSeparator={true}
              leftSideComponent={
                <Info
                  textSize={SIZE_REF_6 * 3}
                  pictureGapSize={SIZE_REF_8}
                  picture={
                    <Icon name="bookmark-outline" size={SIZE_REF_12 * 2} />
                  }
                >
                  {(size, color) => (
                    <MediumText
                      style={{ fontSize: size, lineHeight: size, color }}
                    >
                      Saved
                    </MediumText>
                  )}
                </Info>
              }
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          header: (props) => (
            <BottomTabScreenHeader
              headerProps={props}
              hasSeparator={true}
              leftSideComponent={
                <Info
                  textSize={SIZE_REF_6 * 3}
                  pictureGapSize={SIZE_REF_8}
                  picture={<Icon name="gear-outline" size={SIZE_REF_12 * 2} />}
                >
                  {(size, color) => (
                    <MediumText
                      style={{ fontSize: size, lineHeight: size, color }}
                    >
                      Settings
                    </MediumText>
                  )}
                </Info>
              }
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Stacks"
        component={UtilityStackNavigator}
        options={{ headerShown: false, unmountOnBlur: true, lazy: true }}
      />
    </TabNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainerStaticStyle: {
    paddingBottom: Math.floor((SHUTTER_HEIGHT * 4) / 25),
    backgroundColor: "#FDFDFD",
  },
  headerTextStaticStyle: {
    fontSize: SIZE_REF_10 * 2 + SIZE_REF_2,
    lineHeight: SIZE_REF_10 * 2 + SIZE_REF_2,
  },
  rightSideGap: {
    marginRight: SIZE_REF_4,
  },
  secondaryRightSideGap: {
    marginRight: SIZE_REF_12,
  },
});

export default RootTabNavigator;
