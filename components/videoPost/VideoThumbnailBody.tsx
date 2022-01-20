import { useNavigation } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import FastImage, { ResizeMode, Source } from "react-native-fast-image";
import {
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { shallowEqual } from "react-redux";
import { RootState, useAppSelector } from "../../store/appStore";
import {
  selectVideoPostDuration,
  selectVideoPostThumbnail,
  selectVideoPostWatchTime,
} from "../../store/videoPost/selectors";
import {
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { timeStringGenerator } from "../../utility/helpers";
import { Id, RootStackNavigatorParamList } from "../../utility/types";
import { MediumText } from "../../utility/ui";
import RoundedIcon from "../global/RoundedIcon";

type RootTabNavigationProps = StackScreenProps<
  RootStackNavigatorParamList,
  "Tabs"
>["navigation"];

const VideoThumbnailBody = ({ id }: Id) => {
  const navigation = useNavigation<RootTabNavigationProps>();

  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const thumbnail = selectVideoPostThumbnail(state, id);
      const duration = selectVideoPostDuration(state, id);
      return { thumbnail, duration };
    },
    [id]
  );

  const mutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const watchTime = selectVideoPostWatchTime(state, id);
      return { watchTime };
    },
    [id]
  );

  const { duration, thumbnail } = useAppSelector(
    immutableDataSelectorCallback,
    (left, right) => {
      if (!left.duration && right.duration) {
        return false;
      }
      return true;
    }
  );

  const { watchTime } = useAppSelector(
    mutableDataSelectorCallback,
    shallowEqual
  );

  const imageSource = useMemo<Source>(
    () => ({ cache: "immutable", priority: "high", uri: thumbnail?.uri }),
    [thumbnail?.uri]
  );

  let watchTimeTrackerDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.watchTimeTrackerStaticStyle,
      { width: (WINDOW_WIDTH * (watchTime as number)) / (duration as number) },
    ],
    [watchTime, duration]
  );

  const longPressHandlerCalback = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
      if (state === State.ACTIVE) {
        navigation.navigate("VideoPreviewScreen", { id });
      }
    },
    [id]
  );

  const tapHandlerCalback = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (state === State.ACTIVE) {
        navigation.navigate("VideoPostScreen", { id });
      }
    },
    [id]
  );

  const imageResizeMode: ResizeMode =
    (thumbnail?.width as number) > (thumbnail?.height as number)
      ? "cover"
      : "contain";

  return (
    <TapGestureHandler
      shouldCancelWhenOutside={true}
      onHandlerStateChange={tapHandlerCalback}
      numberOfTaps={1}
    >
      <LongPressGestureHandler
        minDurationMs={400}
        shouldCancelWhenOutside={true}
        onHandlerStateChange={longPressHandlerCalback}
      >
        <View style={styles.rootContainerStaticStyle}>
          <FastImage
            source={imageSource}
            style={styles.imageStaticStyle}
            resizeMode={imageResizeMode}
          />
          <RoundedIcon
            color="white"
            name="play"
            backgroundColor="transparent"
            size={SIZE_REF_12 * 3}
            scale={0.7}
            style={styles.iconStaticStyle}
          />
          <RoundedIcon
            color="white"
            name="chevron-right"
            backgroundColor="transparent"
            size={SIZE_REF_14 * 2}
            scale={0.7}
            style={[styles.iconStaticStyle, styles.previewIconStaticStyle]}
          />
          <MediumText style={styles.textStaticStyle}>
            {timeStringGenerator(duration as number)}
          </MediumText>
          <View style={watchTimeTrackerDynamicStyle}></View>
        </View>
      </LongPressGestureHandler>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStaticStyle: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.3,
    backgroundColor: "black",
  },
  textStaticStyle: {
    fontSize: SIZE_REF_10 + SIZE_REF_1,
    color: "white",
    position: "absolute",
    bottom: SIZE_REF_6,
    left: SIZE_REF_6,
  },
  iconStaticStyle: {
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
  },

  previewIconStaticStyle: { bottom: SIZE_REF_8, right: SIZE_REF_8 },

  watchTimeTrackerStaticStyle: {
    backgroundColor: "red",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
  },
});

export default VideoThumbnailBody;
