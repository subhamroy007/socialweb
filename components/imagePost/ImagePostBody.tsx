import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectImagePostImageList } from "../../store/imagePost/selectors";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utility/constants";
import { getImageConfig } from "../../utility/helpers";
import { Id, ImageConfig, MediaInfo } from "../../utility/types";
import ImagePostOverlay from "./ImagePostOverlay";

const ImagePostBody = ({ id }: Id) => {
  const movementValue = useSharedValue<number>(0);

  const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);

  const [focusedImageIndex, setFocusedImageIndex] = useState<number>(0);

  const imageListSelectorCallback = useCallback(
    (state: RootState) => {
      return selectImagePostImageList(state, id) as MediaInfo[];
    },
    [id]
  );

  const imageList = useAppSelector(imageListSelectorCallback);

  const imageConfigList = useMemo<ImageConfig[]>(() => {
    return imageList.map((image) =>
      getImageConfig(
        { max: WINDOW_WIDTH, min: WINDOW_WIDTH, original: image.width },
        {
          max: WINDOW_HEIGHT * 0.65,
          min: WINDOW_HEIGHT * 0.3,
          original: image.height,
        }
      )
    );
  }, [imageList]);

  const focusedImageContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        movementValue.value,
        [-1, 0, 1],
        [0, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const leftSideImageContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        movementValue.value,
        [-1, 0],
        [1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const rightSideImageContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        movementValue.value,
        [0, 1],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const singleTapHandler = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (state === State.ACTIVE) {
        setOverlayVisible((state) => !state);
      }
    },
    []
  );

  return (
    <TapGestureHandler onHandlerStateChange={singleTapHandler}>
      <View
        style={[
          styles.rootContainerStaticStyle,
          {
            width: imageConfigList[focusedImageIndex].width,
            height: imageConfigList[focusedImageIndex].height,
          },
        ]}
      >
        {imageList?.map((image, index) => {
          const imageContainerDynamicStyle =
            index === focusedImageIndex
              ? focusedImageContainerStyle
              : index < focusedImageIndex
              ? leftSideImageContainerStyle
              : rightSideImageContainerStyle;
          return (
            <Animated.View
              style={[
                styles.imageContainerStaticStyle,
                imageContainerDynamicStyle,
              ]}
              key={"container" + index}
            >
              <FastImage
                source={{
                  cache: "immutable",
                  priority: "high",
                  uri: image.uri,
                }}
                style={styles.imageStaticStyle}
              />
            </Animated.View>
          );
        })}
        {isOverlayVisible && (
          <ImagePostOverlay
            height={imageConfigList[focusedImageIndex].height}
            width={imageConfigList[focusedImageIndex].width}
            id={id}
          />
        )}
      </View>
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
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  imageContainerStaticStyle: {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0,
  },
});

export default ImagePostBody;
