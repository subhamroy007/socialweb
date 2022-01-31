import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { BottomTabScreenHeader } from "../components/global/Header";
import Icon from "../components/global/Icon";
import Shutter from "../components/shutter/Shutter";
import NewImageFeedScreen from "../screens/NewImageFeedScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import VideoFeedScreen from "../screens/tabs/VideoFeedScreen";
import { SIZE_REF_10, SIZE_REF_6 } from "../utility/constants";
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
                <MediumText
                  style={styles.headerTextStaticStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {"Social"}
                </MediumText>
              }
              rightSideComponent={
                <Icon name="search-regular" size={SIZE_REF_10 * 3} />
              }
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="VideoFeedScreen"
        component={VideoFeedScreen}
        // options={{ header: (props) => <VideoFeedScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        // options={{ header: (props) => <ProfileScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="TrendingScreen"
        component={TrendingScreenNavigator}
        // options={{ header: (props) => <TrendingScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        // options={{ header: (props) => <NotificationScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="SavedScreen"
        component={SavedScreenNavigator}
        // options={{ header: (props) => <SavedScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        // options={{ header: (props) => <SettingsScreenHeader {...props} /> }}
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
    paddingBottom: SIZE_REF_10 * 4,
    backgroundColor: "#FDFDFD",
  },
  headerTextStaticStyle: {
    fontSize: SIZE_REF_10 * 2,
    lineHeight: SIZE_REF_10 * 2,
  },
});

export default RootTabNavigator;
