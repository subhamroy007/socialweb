import { Component, ReactNode } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { shallowEqual } from "react-redux";
import {
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { ImagePostDetails, MediaInfo } from "../../utility/types";
import CollapsableText from "../global/CollapsableText";
import HighlightedItem from "../global/HighlightedItem";
import ItemSeparator from "../global/ItemSeparator";

export interface AccountShortResponse {
  id: string;
  socialId: string;
  profilePictureUri: string;
}

export interface AccountMediumResponse extends AccountShortResponse {
  username: string;
  isFollowing: boolean;
}

export interface HashTagShortResponse {
  id: string;
  name: string;
}

export interface ImagePostResponse {
  id: string;
  timestamp: number;
  author: AccountMediumResponse;
  images: MediaInfo[];
  caption: string | null;
  likes: {
    noOfLikes: number;
    hasLiked: boolean;
    filteredLikes: AccountShortResponse[] | null;
  };
  noOfComments: number;
  noOfShares: number;
  hashtags: HashTagShortResponse[] | null;
  tags: AccountShortResponse[] | null;
}

const keyExtractor = createKeyExtractor("hashtag");

const itemSeparatorCallback = () => (
  <ItemSeparator axis="horizontal" length={SIZE_REF_16} />
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
    return (
      <View style={styles.rootContainerStaticStyle}>
        {this.props.hashtags && (
          <FlatList
            data={this.props.hashtags}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.listStaticStyle}
            contentContainerStyle={styles.listContentContainerStyle}
            ItemSeparatorComponent={itemSeparatorCallback}
          />
        )}
        {this.props.caption && (
          <CollapsableText
            text={this.props.caption}
            maxNoOfCharecters={50}
            style={styles.captionTextStaticStyle}
          />
        )}
      </View>
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
