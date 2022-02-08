import { Component, ReactElement, ReactNode } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  SIZE_REF_10,
  SIZE_REF_16,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";
import { HashTagLongResponse } from "../../utility/types";
import HashTag from "./HashTag";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";
import RoundedIcon from "./RoundedIcon";

const ACCOUNT_BATCH_SIZE = 16;

export interface HashTagListProps {
  hashtags?: HashTagLongResponse[] | null;
  header?: ReactElement<any>;
  isLoading: boolean;
  isError: boolean;
  onEndReach?: () => void;
}

export default class HashTagList extends Component<HashTagListProps> {
  keyExtractor: (item: HashTagLongResponse, index: number) => string =
    createKeyExtractor("hashtags");
  constructor(props: HashTagListProps) {
    super(props);
  }

  renderComments({ item }: ListRenderItemInfo<HashTagLongResponse>) {
    return <HashTag {...item} />;
  }

  itemSeparator() {
    return <ItemSeparator axis="horizontal" length={SIZE_REF_16} />;
  }

  shouldComponentUpdate({ hashtags }: HashTagListProps) {
    return hashtags !== this.props.hashtags;
  }

  render(): ReactNode {
    const { hashtags, header, onEndReach, children, ...restprops } = this.props;

    let listEmptyComponent = null;
    let listFooterComponent = null;

    if (restprops.isLoading) {
      listEmptyComponent = (
        <View style={styles.emptyComponentContainerStaticStyle}>
          <LoadingIndicator size={SIZE_REF_10 * 5} />
        </View>
      );
      if (hashtags && hashtags.length > 0) {
        listFooterComponent = (
          <LoadingIndicator
            size={SIZE_REF_10 * 5}
            style={{ marginVertical: SIZE_REF_16 }}
          />
        );
      }
    }

    if (restprops.isError) {
      listEmptyComponent = (
        <View style={styles.emptyComponentContainerStaticStyle}>
          <RoundedIcon name="chevron-down" size={SIZE_REF_10 * 5} scale={0.7} />
        </View>
      );
      if (hashtags && hashtags.length > 0) {
        listFooterComponent = (
          <RoundedIcon
            name="chevron-down"
            size={SIZE_REF_10 * 5}
            scale={0.7}
            style={{ marginVertical: SIZE_REF_16 }}
          />
        );
      } else {
        listFooterComponent = (
          <View style={styles.emptyComponentContainerStaticStyle}>
            <RoundedIcon
              name="chevron-down"
              size={SIZE_REF_10 * 5}
              scale={0.7}
            />
          </View>
        );
      }
    }

    return (
      <View style={[globalColors.screenColor, globalLayouts.screenLayout]}>
        <FlatList
          style={styles.listStaticStyle}
          showsVerticalScrollIndicator={false}
          data={hashtags}
          renderItem={this.renderComments}
          keyExtractor={this.keyExtractor}
          initialNumToRender={ACCOUNT_BATCH_SIZE}
          maxToRenderPerBatch={ACCOUNT_BATCH_SIZE}
          scrollEventThrottle={20}
          contentContainerStyle={styles.contentContainerStaticStyle}
          ItemSeparatorComponent={this.itemSeparator}
          ListEmptyComponent={listEmptyComponent}
          ListFooterComponent={listFooterComponent}
          ListHeaderComponent={header}
          onEndReachedThreshold={0.3}
          onEndReached={onEndReach}
          extraData={restprops}
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
