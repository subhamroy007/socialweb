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
import { AccountWithTimestampResponse } from "../../utility/types";
import Account from "./Account";
import Header from "./Header";
import InputBox from "./InputBox";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";

export interface LikeListProps {
  likes?: AccountWithTimestampResponse[];
}

export const LIKES_BATCH_SIZE = 12;

export default class LikeList extends Component<LikeListProps> {
  keyExtractor: (item: AccountWithTimestampResponse, index: number) => string =
    createKeyExtractor("likes");
  constructor(props: LikeListProps) {
    super(props);
  }

  renderComments({ item }: ListRenderItemInfo<AccountWithTimestampResponse>) {
    return <Account {...item} />;
  }

  itemSeparator() {
    return <ItemSeparator axis="horizontal" length={SIZE_REF_16} />;
  }

  shouldComponentUpdate({ likes }: LikeListProps) {
    return likes !== this.props.likes;
  }

  render(): ReactNode {
    const { likes } = this.props;

    return (
      <View style={[globalColors.screenColor, globalLayouts.screenLayout]}>
        <FlatList
          style={styles.listStaticStyle}
          showsVerticalScrollIndicator={false}
          data={likes}
          renderItem={this.renderComments}
          keyExtractor={this.keyExtractor}
          initialNumToRender={LIKES_BATCH_SIZE}
          maxToRenderPerBatch={LIKES_BATCH_SIZE}
          scrollEventThrottle={20}
          contentContainerStyle={styles.contentContainerStaticStyle}
          ItemSeparatorComponent={this.itemSeparator}
          ListEmptyComponent={
            <View style={styles.emptyComponentContainerStaticStyle}>
              <LoadingIndicator size={SIZE_REF_10 * 5} />
            </View>
          }
          ListHeaderComponent={
            <Header
              leftSideComponent={<InputBox placeholder="search accounts..." />}
              style={{ width: WINDOW_WIDTH, marginVertical: SIZE_REF_16 }}
            />
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
