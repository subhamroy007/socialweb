import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PostEngagementNavigatorParamList,
  RootStackNavigatorParamList,
} from "../../utility/types";

type ShareScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<PostEngagementNavigatorParamList, "ShareScreen">,
  StackScreenProps<RootStackNavigatorParamList>
>;

const ShareScreen = ({ navigation, route }: ShareScreenProps) => {
  return <SafeAreaView edges={["left", "right"]}></SafeAreaView>;
};

export default ShareScreen;
