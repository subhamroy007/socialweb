import { Component, ReactNode } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { shallowEqual } from "react-redux";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";
import { CommentResponse, ReplyResponse } from "../../utility/types";
import { MediumText, RegularText } from "../../utility/ui";
import Avatar from "./Avatar";
import CollapsableText from "./CollapsableText";
import Comment from "./Comment";
import Info from "./Info";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";
import Reply from "./Reply";

export interface ReplyListProps {
  replys?: ReplyResponse[];
  noOfReplys?: number;
  targetComment?: CommentResponse;
}

const REPLY_BATCH_SIZE = 16;

export default class ReplyList extends Component<ReplyListProps> {
  keyExtractor: (item: ReplyResponse, index: number) => string =
    createKeyExtractor("replys");
  constructor(props: ReplyListProps) {
    super(props);
    this.renderComments = this.renderComments.bind(this);
    this.itemSeparator = this.itemSeparator.bind(this);
  }

  renderComments({ item }: ListRenderItemInfo<ReplyResponse>) {
    return <Reply {...item} />;
  }

  itemSeparator() {
    return <ItemSeparator axis="horizontal" length={SIZE_REF_16} />;
  }

  shouldComponentUpdate(nextProps: ReplyListProps) {
    return !shallowEqual(this.props, nextProps);
  }

  render(): ReactNode {
    const { noOfReplys, replys, targetComment } = this.props;

    return (
      <View style={[globalColors.screenColor, globalLayouts.screenLayout]}>
        <FlatList
          style={styles.listStaticStyle}
          showsVerticalScrollIndicator={false}
          data={replys}
          renderItem={this.renderComments}
          keyExtractor={this.keyExtractor}
          initialNumToRender={REPLY_BATCH_SIZE}
          maxToRenderPerBatch={REPLY_BATCH_SIZE}
          scrollEventThrottle={20}
          contentContainerStyle={styles.contentContainerStaticStyle}
          ItemSeparatorComponent={this.itemSeparator}
          ListEmptyComponent={
            <View style={styles.emptyComponentContainerStaticStyle}>
              <LoadingIndicator size={SIZE_REF_10 * 5} />
            </View>
          }
          ListHeaderComponent={
            targetComment ? (
              <View style={styles.headerStaticStyle}>
                <Comment {...targetComment} isMetaHidden={true} />
                <RegularText style={styles.headerTextStaticStyle}>
                  {noOfReplys + " replys"}
                </RegularText>
              </View>
            ) : null
          }
          extraData={this.props}
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
    paddingBottom: SIZE_REF_16,
  },
  emptyComponentContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: WINDOW_WIDTH,
    marginTop: WINDOW_WIDTH * 0.5,
  },
  headerStaticStyle: {
    width: WINDOW_WIDTH,
    borderColor: "#D1CBCB",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: SIZE_REF_16,
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZE_REF_16,
  },
  headerTextStaticStyle: {
    fontSize: SIZE_REF_6 * 3,
    lineHeight: SIZE_REF_6 * 3,
    color: "grey",
    marginTop: SIZE_REF_16,
  },
});
