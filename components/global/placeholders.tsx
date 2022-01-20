import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { shallowEqual } from "react-redux";
import {
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { PlaceHolderProps } from "../../utility/types";

export const PlaceHolder = React.memo<PlaceHolderProps>(
  ({
    height,
    width,
    color,
    size,
    gap,
    gapBottom,
    gapHorizontal,
    gapLeft,
    gapRight,
    gapTop,
    gapVertical,
    alignment,
  }) => {
    const style: StyleProp<ViewStyle> = {
      backgroundColor: color ? color : "#EBE8FB",
      width: width ? width : size ? size : undefined,
      height: height ? height : size ? size : undefined,
      borderRadius: size ? size * 0.5 : undefined,
      alignSelf: alignment,
      margin: gap,
      marginHorizontal: gapHorizontal,
      marginVertical: gapVertical,
      marginLeft: gapLeft,
      marginRight: gapRight,
      marginTop: gapTop,
      marginBottom: gapBottom,
    };

    return <View style={style}></View>;
  },
  shallowEqual
);

export const VideoPostScreenPlaceHolder = () => {
  return (
    <>
      <PlaceHolder
        height={0.02 * WINDOW_HEIGHT}
        width={WINDOW_WIDTH * 0.4}
        alignment="flex-start"
        gapLeft={SIZE_REF_8}
        gapTop={SIZE_REF_16}
      />

      <View style={styles.iconControlsContainer}>
        <PlaceHolder size={0.12 * WINDOW_WIDTH} />
        <PlaceHolder size={0.12 * WINDOW_WIDTH} />
        <PlaceHolder size={0.12 * WINDOW_WIDTH} />
        <PlaceHolder size={0.12 * WINDOW_WIDTH} />
      </View>

      <PlaceHolder
        alignment="flex-start"
        width={WINDOW_WIDTH * 0.4}
        gapLeft={WINDOW_WIDTH * 0.1004}
        gapTop={SIZE_REF_16}
        height={0.1 * WINDOW_HEIGHT}
      />

      <PlaceHolder
        width={WINDOW_WIDTH - 2 * SIZE_REF_8}
        height={0.02 * WINDOW_HEIGHT}
        gapTop={SIZE_REF_16}
      />
      <PlaceHolder
        width={WINDOW_WIDTH - 2 * SIZE_REF_8}
        height={0.02 * WINDOW_HEIGHT}
        gapTop={SIZE_REF_8}
      />
      <PlaceHolder
        width={WINDOW_WIDTH * 0.5}
        height={0.02 * WINDOW_HEIGHT}
        gapTop={SIZE_REF_8}
        gapLeft={SIZE_REF_8}
        alignment="flex-start"
      />
    </>
  );
};

const styles = StyleSheet.create({
  iconControlsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: SIZE_REF_16,
  },
});
