import { Component, ReactNode } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  Easing,
  FadeInUp,
  FadeOutDown,
  SequencedTransition,
} from "react-native-reanimated";
import { shallowEqual } from "react-redux";
import {
  SIZE_REF_12,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { HashTagShortResponse, ImagePostResponse } from "../../utility/types";
import { MediumText } from "../../utility/ui";
import Avatar from "../global/Avatar";
import CollapsableText from "../global/CollapsableText";
import Header from "../global/Header";
import HighlightedItem from "../global/HighlightedItem";
import Icon from "../global/Icon";
import Info from "../global/Info";
import ItemSeparator from "../global/ItemSeparator";
import ImagePostBody from "./ImagePostBody";
import ImagePostControls from "./ImagePostControls";

const keyExtractor = createKeyExtractor("hashtag");

const itemSeparatorCallback = () => (
  <ItemSeparator axis="vertical" length={SIZE_REF_8} />
);

const renderItem = (item: ListRenderItemInfo<HashTagShortResponse>) => {
  return (
    <HighlightedItem text={item.item.name} type="solid" size={SIZE_REF_12} />
  );
};

export default class ImagePost extends Component<ImagePostResponse> {
  constructor(props: ImagePostResponse) {
    super(props);
  }

  shouldComponentUpdate(nextProps: ImagePostResponse) {
    const {
      author: nextAuthor,
      likes: nextLikes,
      ...restNextProps
    } = nextProps;

    const { author: prevAuthor, likes: prevLikes, ...restProps } = this.props;

    return (
      !shallowEqual(nextAuthor, prevAuthor) ||
      !shallowEqual(nextLikes, prevLikes) ||
      !shallowEqual(restNextProps, restProps)
    );
  }

  render(): ReactNode {
    const {
      author: { hasUnSeenStroy, id: userId, profilePictureUri, socialId },
      caption,
      hasSaved,
      hashtags,
      likes: { filteredLikes, hasLiked, noOfLikes },
      timestamp,
      id,
      children,
      ...restProps
    } = this.props;

    return (
      <Animated.View style={styles.rootContainerStaticStyle}>
        <Header
          style={styles.headerStaticStyle}
          hasSeparator={true}
          leftSideComponent={
            <Info
              picture={
                <Avatar
                  profilePictureUri={profilePictureUri}
                  hasUnSeenStroy={hasUnSeenStroy}
                  showOutline={hasUnSeenStroy}
                />
              }
              pictureGapSize={SIZE_REF_6}
            >
              {(size, color) => (
                <MediumText
                  style={[
                    {
                      fontSize: size,
                      lineHeight: size,
                      color: color,
                    },
                  ]}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {socialId}
                </MediumText>
              )}
            </Info>
          }
          rightSideComponent={<Icon name="more-solid" size={SIZE_REF_8 * 3} />}
        />
        <ImagePostBody
          filteredLikes={filteredLikes}
          noOfLikes={noOfLikes}
          {...restProps}
        />
        <ImagePostControls hasLiked={hasLiked} hasSaved={hasSaved} id={id} />
        {hashtags && (
          <FlatList
            data={hashtags}
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
  }
}

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
    height: SIZE_REF_12 + 2 * 0.47 * SIZE_REF_12 + 2 * SIZE_REF_8,
  },
  listContentContainerStyle: {
    padding: SIZE_REF_8,
    alignItems: "center",
  },
  captionTextStaticStyle: {
    width: "100%",
    padding: SIZE_REF_8,
  },
  headerStaticStyle: { paddingVertical: SIZE_REF_8 },
});
