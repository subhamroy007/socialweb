import {
  Animated,
  FlatListProps,
  StyleSheet,
  Text,
  TextProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import fontelloConfig from "../config.json";
import { createIconSetFromFontello } from "@expo/vector-icons";
import { SIZE_REF_8 } from "./constants";
import { FlatList } from "react-native-gesture-handler";
import React from "react";

export const AnimatedSafeAreaView =
  Animated.createAnimatedComponent(SafeAreaView);

//create the custom icons set with the custom icons font and fontello configuration file
export const CustomIcon = createIconSetFromFontello(
  fontelloConfig,
  "icons",
  "icons"
);

export const BoldText = (props: TextProps) => {
  const { style, ...restProps } = props;

  return (
    <Text {...restProps} style={[style, styles.boldText]}>
      {props.children}
    </Text>
  );
};

export const MediumText = (props: TextProps) => {
  const { style, ...restProps } = props;

  return (
    <Text {...restProps} style={[style, styles.mediumText]}>
      {props.children}
    </Text>
  );
};

export const LightText = (props: TextProps) => {
  const { style, ...restProps } = props;

  return (
    <Text {...restProps} style={[style, styles.lightText]}>
      {props.children}
    </Text>
  );
};

export const ThinText = (props: TextProps) => {
  const { style, ...restProps } = props;

  return (
    <Text {...restProps} style={[style, styles.thinText]}>
      {props.children}
    </Text>
  );
};

export const RegularText = (props: TextProps) => {
  const { style, ...restProps } = props;

  return (
    <Text {...restProps} style={[style, styles.regularText]}>
      {props.children}
    </Text>
  );
};

export const ConfiguredFlatList = ({
  style,
  contentContainerStyle,
  ...restProps
}: FlatListProps<any>) => {
  return (
    <FlatList
      {...restProps}
      style={[styles.list, style]}
      contentContainerStyle={[
        styles.listContentContainer,
        contentContainerStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: "100%",
    },
    listContentContainer: {
        padding: SIZE_REF_8,
    },
    boldText: {
        fontFamily: "roboto-bold",
    },
    mediumText: {
        fontFamily: "roboto-medium",
    },
    lightText: {
        fontFamily: "roboto-light",
    },
    thinText: {
        fontFamily: "roboto-thin",
    },
    regularText: {
        fontFamily: "roboto-regular",
    },
});