import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utility/constants";
import { getImageConfig } from "../../utility/helpers";
import {
  ImageConfig,
  ImagePostBodyProps,
  MediaInfo,
} from "../../utility/types";
import ImagePostOverlay from "./ImagePostOverlay";

const ImagePostBody = ({ images, ...restProps }: ImagePostBodyProps) => {
  const imageConfigList = images.map<MediaInfo & ImageConfig>((image) => {
    return {
      uri: image.uri,
      ...getImageConfig(
        { max: WINDOW_WIDTH, min: WINDOW_WIDTH, original: image.width },
        {
          max: WINDOW_HEIGHT * 0.67,
          min: WINDOW_HEIGHT * 0.33,
          original: image.height,
        }
      ),
    };
  });

  const animatedValue = useSharedValue<number>(0);

  const scrollEventCallback = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      animatedValue.value = Math.floor(x / WINDOW_WIDTH);
    },
  });

  const imageDynamicStyle = useAnimatedStyle(() => {
    return {
      height: imageConfigList[animatedValue.value].height,
      width: WINDOW_WIDTH,
    };
  }, imageConfigList);

  const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);

  const tapHandlerCallback = useCallback(
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
    <TapGestureHandler onHandlerStateChange={tapHandlerCallback}>
      <Animated.View
        style={[styles.rootContainerStaticStyle, imageDynamicStyle]}
      >
        <Animated.ScrollView
          style={styles.listStaticStyle}
          onScroll={scrollEventCallback}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          {imageConfigList.map((item, index) => (
            <FastImage
              key={item.uri + "-" + index}
              source={{
                cache: "immutable",
                priority: "high",
                uri: item.uri,
              }}
              style={[
                styles.imageStaticStyle,
                { width: item.width, height: item.height },
              ]}
              resizeMode={item.resizeMode}
            />
          ))}
        </Animated.ScrollView>
        {isOverlayVisible && (
          <ImagePostOverlay
            {...restProps}
            height={imageConfigList[animatedValue.value].height}
            width={WINDOW_WIDTH}
          />
        )}
      </Animated.View>
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
    backgroundColor: "white",
  },
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
});

export default ImagePostBody;
