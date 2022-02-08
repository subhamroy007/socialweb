import React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import APP_STYLE from "../../utility/styles";
import { ImagePostResponse } from "../../utility/types";

const rootContainerStaticStyle = [
  APP_STYLE.FLEX_NOWRAP,
  APP_STYLE.FLEX_JUSTIFY_START,
  APP_STYLE.FLEX_ALIGN_ITEM_START,
  APP_STYLE.IMAGE_GALLERY_ITEM_HEIGHT,
  APP_STYLE.IMAGE_GALLERY_ITEM_WIDTH,
  APP_STYLE.LINE_PADDING_BOTTOM,
  APP_STYLE.BACKGROUND_PRIMARY_LIGHT_COLOR,
];

const imageStaticStyle = [
  APP_STYLE.WIDTH_RELATIVE_100,
  APP_STYLE.HEIGHT_RELATIVE_100,
  APP_STYLE.BACKGROUND_SECONDARY_LIGHT_COLOR,
];

const ImageGalleryItem = React.memo<ImagePostResponse & { index: number }>(
  (props) => {
    return (
      <View
        style={[
          ...rootContainerStaticStyle,
          (props.index + 1) % 3 !== 0
            ? APP_STYLE.LINE_PADDING_RIGHT
            : undefined,
        ]}
      >
        <FastImage
          source={{
            cache: "immutable",
            priority: "high",
            uri: props.images[0].uri,
          }}
          resizeMode="cover"
          style={imageStaticStyle}
        />
      </View>
    );
  }
);

export default ImageGalleryItem;
