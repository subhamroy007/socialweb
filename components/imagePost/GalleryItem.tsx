import React, { PropsWithChildren, useMemo } from "react";
import FastImage, { FastImageProps, Source } from "react-native-fast-image";
import { shallowEqual } from "react-redux";
import { GalleryItemProps } from "../../utility/types";

const GalleryItem = React.memo<GalleryItemProps>(
  ({ resizeMode, url, height, width }: GalleryItemProps) => {
    const source = useMemo<Source>(
      () => ({ cache: "immutable", priority: "high", uri: url }),
      [url]
    );

    const style = useMemo<FastImageProps["style"]>(
      () => ({ width, height }),
      [width, height]
    );

    return <FastImage source={source} style={style} resizeMode={resizeMode} />;
  },
  (prevProps, nextProps) =>
    shallowEqual<Readonly<PropsWithChildren<GalleryItemProps>>>(
      prevProps,
      nextProps
    )
);

export default GalleryItem;
