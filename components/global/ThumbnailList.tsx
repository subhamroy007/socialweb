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
import { VideoThumbnailResponse } from "../../utility/types";
import VideoThumbnail from "../videoPost/VideoThumbnail";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";

const VIDEO_BATCH_SIZE = 10;

export interface ThumbnailListProps {
  thumbnails?: VideoThumbnailResponse[] | null;
}

export default class ThumbnailList extends Component<ThumbnailListProps> {
  keyExtractor: (item: VideoThumbnailResponse, index: number) => string =
    createKeyExtractor("thumbnails");
  constructor(props: ThumbnailListProps) {
    super(props);
  }

  renderComments({ item }: ListRenderItemInfo<VideoThumbnailResponse>) {
    return <VideoThumbnail {...item} />;
  }

  itemSeparator() {
    return <ItemSeparator axis="horizontal" length={SIZE_REF_16} />;
  }

  shouldComponentUpdate({ thumbnails }: ThumbnailListProps) {
    return thumbnails !== this.props.thumbnails;
  }

  render(): ReactNode {
    const { thumbnails } = this.props;

    return (
      <View style={[globalColors.screenColor, globalLayouts.screenLayout]}>
        <FlatList
          style={styles.listStaticStyle}
          showsVerticalScrollIndicator={false}
          data={thumbnails}
          renderItem={this.renderComments}
          keyExtractor={this.keyExtractor}
          initialNumToRender={VIDEO_BATCH_SIZE}
          maxToRenderPerBatch={VIDEO_BATCH_SIZE}
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
