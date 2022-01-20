import React, { useCallback } from "react";
import { StyleProp, View } from "react-native";
import FastImage, {
  ImageStyle,
  ResizeMode,
  Source,
} from "react-native-fast-image";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  OVERLAY_SCREEN_IMAGE_MAX_HEIGHT,
  OVERLAY_SCREEN_IMAGE_MAX_WIDTH,
  OVERLAY_SCREEN_IMAGE_MIN_HEIGHT,
  OVERLAY_SCREEN_IMAGE_MIN_WIDTH,
} from "../utility/constants";
import { globalLayouts } from "../utility/styles";

export const ImageGalleryCard = () => {
  const width = Math.floor(Math.random() * 720 + 360);
  const height = Math.floor(Math.random() * 720 + 360);

  const imageSource: Source = {
    cache: "immutable",
    priority: "high",
    uri: "https://source.unsplash.com/random/" + width + "x" + height,
  };

  let imageStyle: StyleProp<ImageStyle> = {};

  let imageResizeMode: ResizeMode = "center";

  if (width > height) {
    const scaledWidth =
      width >= OVERLAY_SCREEN_IMAGE_MAX_WIDTH
        ? OVERLAY_SCREEN_IMAGE_MAX_WIDTH
        : width <= OVERLAY_SCREEN_IMAGE_MIN_WIDTH
        ? OVERLAY_SCREEN_IMAGE_MIN_WIDTH
        : width;

    let scaledHeight = (scaledWidth * height) / width;

    imageResizeMode =
      scaledWidth === OVERLAY_SCREEN_IMAGE_MAX_WIDTH ? "cover" : "center";

    if (scaledHeight <= OVERLAY_SCREEN_IMAGE_MIN_HEIGHT) {
      scaledHeight = OVERLAY_SCREEN_IMAGE_MIN_HEIGHT;
      // if (scaledWidth === OVERLAY_SCREEN_IMAGE_MAX_WIDTH) {
      //   imageResizeMode = "center";
      // }
    } else if (scaledHeight >= OVERLAY_SCREEN_IMAGE_MAX_HEIGHT) {
      scaledHeight = OVERLAY_SCREEN_IMAGE_MAX_HEIGHT;
      // if (scaledWidth !== OVERLAY_SCREEN_IMAGE_MAX_WIDTH) {
      //   imageResizeMode = "center";
      // }
    }

    imageStyle = {
      width: scaledWidth,
      height: scaledHeight,
    };
  } else {
    const scaledHeight =
      height >= OVERLAY_SCREEN_IMAGE_MAX_HEIGHT
        ? OVERLAY_SCREEN_IMAGE_MAX_HEIGHT
        : height <= OVERLAY_SCREEN_IMAGE_MIN_HEIGHT
        ? OVERLAY_SCREEN_IMAGE_MIN_HEIGHT
        : height;

    let scaledWidth = (width * scaledHeight) / height;

    imageResizeMode =
      scaledHeight === OVERLAY_SCREEN_IMAGE_MAX_HEIGHT ? "cover" : "center";

    if (scaledWidth <= OVERLAY_SCREEN_IMAGE_MIN_WIDTH) {
      scaledWidth = OVERLAY_SCREEN_IMAGE_MIN_WIDTH;
    } else if (scaledWidth >= OVERLAY_SCREEN_IMAGE_MAX_WIDTH) {
      scaledWidth = OVERLAY_SCREEN_IMAGE_MAX_WIDTH;
    }

    imageStyle = {
      width: scaledWidth,
      height: scaledHeight,
    };
  }

  const panCallback = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
      if (state === State.END || state === State.FAILED || State.CANCELLED) {
        console.log("done dragging");
      }
    },
    []
  );

  return (
    <PanGestureHandler onHandlerStateChange={panCallback}>
      <View>
        <FastImage
          source={imageSource}
          style={[imageStyle, { backgroundColor: "white" }]}
          resizeMode={imageResizeMode}
        />
      </View>
    </PanGestureHandler>
  );
};

const OverlayScreen = () => {
  return (
    <SafeAreaView
      style={[
        globalLayouts.screenLayout,
        { backgroundColor: "rgba(0, 0, 0, 0.8)" },
      ]}
    >
      <ImageGalleryCard />
    </SafeAreaView>
  );
};

export default OverlayScreen;
