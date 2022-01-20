import React, { useCallback } from "react";
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
import { SavedScreenNavigatorParamList } from "../utility/types";
import SavedHashTagScreen from "../screens/saved/SavedHashTagScreen";
import SavedImagePostScreen from "../screens/saved/SavedImagePostScreen";
import SavedVideoPostScreen from "../screens/saved/SavedVideoPostScreen";
import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/appStore";
import { getInitSavedDataThunk } from "../store/appData/reducer";
import {
  selectSavedHashTagIdList,
  selectSavedImagePostIdList,
  selectSavedScreenState,
  selectSavedVideoPostIdList,
} from "../store/appData/selector";
import LoadingIndicator from "../components/global/LoadingIndicator";
import BlankScreenPlaceHolder from "../components/global/BlankScreenPlaceHolder";

const SavedScreenTab =
  createMaterialTopTabNavigator<SavedScreenNavigatorParamList>();

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
  const state = useAppSelector(selectSavedScreenState);

  const hashTagIdList = useAppSelector(selectSavedHashTagIdList);
  const imagePostIdList = useAppSelector(selectSavedImagePostIdList);
  const videoPostIdList = useAppSelector(selectSavedVideoPostIdList);

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getInitSavedDataThunk());
    }, [])
  );

  return (
    <>
      {!state || state === "loading" ? (
        <LoadingIndicator
          color="black"
          size={SIZE_REF_10 * 4}
          style={styles.spinnerStaticStyle}
        />
      ) : state === "failure" &&
        (!hashTagIdList || hashTagIdList.length === 0) &&
        (!imagePostIdList || imagePostIdList.length === 0) &&
        (!videoPostIdList || videoPostIdList.length === 0) ? (
        <BlankScreenPlaceHolder icon="chevron-down" text="" />
      ) : (
        <SavedScreenTab.Navigator
          initialLayout={initialScreenLayout}
          backBehavior="none"
          screenOptions={defaultScreenOptions}
        >
          <SavedScreenTab.Screen
            name="SavedHashTagScreen"
            component={SavedHashTagScreen}
            options={savedHashTagScreenOptions}
          />
          <SavedScreenTab.Screen
            name="SavedImagePostScreen"
            component={SavedImagePostScreen}
            options={savedImageScreenOptions}
          />
          <SavedScreenTab.Screen
            name="SavedVideoPostScreen"
            component={SavedVideoPostScreen}
            options={savedVideoScreenOptions}
          />
        </SavedScreenTab.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerStaticStyle: {
    width: "100%",
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
});

export default SavedScreenNavigator;
