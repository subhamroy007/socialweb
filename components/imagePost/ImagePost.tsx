import React, { useCallback } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { RootState, useAppSelector } from "../../store/appStore";
import {
  selectImagePostCaption,
  selectImagePostHashTagList,
} from "../../store/imagePost/selectors";
import { SIZE_REF_12, SIZE_REF_8, WINDOW_WIDTH } from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { Id } from "../../utility/types";
import CollapsableText from "../global/CollapsableText";
import { HashTag } from "../global/HighlightedItem";
import ItemSeparator from "../global/ItemSeparator";
import PostHeader from "../videoPost/PostHeader";
import ImagePostBody from "./ImagePostBody";
import ImagePostControls from "./ImagePostControls";

const keyExtractor = createKeyExtractor("hashtag");

const renderItem = (item: ListRenderItemInfo<string>) => {
  return <HashTag id={item.item} />;
};

const itemSeparatorCallback = () => {
  return <ItemSeparator axis="vertical" length={SIZE_REF_8} />;
};

const ImagePost = React.memo<Id>(
  ({ id }) => {
    const immutableDataSelectorCallback = useCallback(
      (state: RootState) => {
        const caption = selectImagePostCaption(state, id);
        const hashTagList = selectImagePostHashTagList(state, id);
        return { caption, hashTagList };
      },
      [id]
    );

    const { caption, hashTagList } = useAppSelector(
      immutableDataSelectorCallback
    );

    return (
      <Animated.View style={[styles.rootContainerStaticStyle]}>
        <PostHeader id={id} postType="image" />
        <ImagePostBody id={id} />
        <ImagePostControls id={id} />
        {hashTagList && hashTagList.length > 0 && (
          <FlatList
            data={hashTagList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.listStaticStyle}
            contentContainerStyle={styles.listContentContainerStyle}
            ItemSeparatorComponent={itemSeparatorCallback}
          />
        )}
        {caption && (
          <CollapsableText
            text={caption}
            maxNoOfCharecters={50}
            style={styles.captionTextStaticStyle}
          />
        )}
      </Animated.View>
    );
  },
  (prveProps, nextProps) => prveProps.id === nextProps.id
);

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: WINDOW_WIDTH,
  },
  listStaticStyle: {
    width: "100%",
    height: SIZE_REF_12 + 2 * 0.47 * SIZE_REF_12,
    marginTop: SIZE_REF_8,
  },
  listContentContainerStyle: {
    paddingHorizontal: SIZE_REF_8,
    alignItems: "center",
  },
  captionTextStaticStyle: {
    width: "100%",
    paddingHorizontal: SIZE_REF_8,
    marginTop: SIZE_REF_8,
  },
});

export default ImagePost;
