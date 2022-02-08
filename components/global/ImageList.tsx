import { Component, ReactNode } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  SIZE_REF_10,
  SIZE_REF_16,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";
import { ImagePostResponse } from "../../utility/types";
import ImagePost from "../imagePost/ImagePost";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";

const IMAGE_BATCH_SIZE = 12;

export interface ImageListProps {
  imagePosts?: ImagePostResponse[] | null;
}

export default class ImageList extends Component<ImageListProps> {
  keyExtractor: (item: ImagePostResponse, index: number) => string =
    createKeyExtractor("images");
  constructor(props: ImageListProps) {
    super(props);
  }

  renderComments({ item }: ListRenderItemInfo<ImagePostResponse>) {
    return <ImagePost {...item} />;
  }

  itemSeparator() {
    return <ItemSeparator axis="horizontal" length={SIZE_REF_16} />;
  }

  shouldComponentUpdate({ imagePosts }: ImageListProps) {
    return imagePosts !== this.props.imagePosts;
  }

  render(): ReactNode {
    const { imagePosts } = this.props;

    return (
      <View style={[globalColors.screenColor, globalLayouts.screenLayout]}>
        <FlatList
          style={styles.listStaticStyle}
          showsVerticalScrollIndicator={false}
          data={imagePosts}
          renderItem={this.renderComments}
          keyExtractor={this.keyExtractor}
          initialNumToRender={IMAGE_BATCH_SIZE}
          maxToRenderPerBatch={IMAGE_BATCH_SIZE}
          scrollEventThrottle={20}
          contentContainerStyle={styles.contentContainerStaticStyle}
          ItemSeparatorComponent={this.itemSeparator}
          ListEmptyComponent={
            <View style={styles.emptyComponentContainerStaticStyle}>
              <LoadingIndicator size={SIZE_REF_10 * 5} />
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
  contentContainerStaticStyle: {
    alignItems: "center",
  },
  emptyComponentContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: WINDOW_WIDTH,
    marginTop: WINDOW_WIDTH * 0.5,
  },
});
