import { Component, ReactNode } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  SIZE_REF_10,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";
import { CommentResponse } from "../../utility/types";
import Comment from "./Comment";
import InputBox from "./InputBox";
import ItemSeparator from "./ItemSeparator";
import LoadingIndicator from "./LoadingIndicator";
import RoundedIcon from "./RoundedIcon";

export const COMMENT_BATCH_SIZE = 12;

export interface CommentListProps {
  comments?: CommentResponse[] | null;
}

export default class CommentList extends Component<CommentListProps> {
  keyExtractor: (item: CommentResponse, index: number) => string =
    createKeyExtractor("comments");
  constructor(props: CommentListProps) {
    super(props);
    this.renderComments = this.renderComments.bind(this);
    this.itemSeparator = this.itemSeparator.bind(this);
  }

  renderComments({ item }: ListRenderItemInfo<CommentResponse>) {
    return <Comment {...item} />;
  }

  itemSeparator() {
    return <ItemSeparator axis="horizontal" length={SIZE_REF_16} />;
  }

  shouldComponentUpdate({ comments }: CommentListProps) {
    return comments !== this.props.comments;
  }

  render(): ReactNode {
    const { comments } = this.props;

    return (
      <View style={[globalColors.screenColor, globalLayouts.screenLayout]}>
        <FlatList
          style={styles.listStaticStyle}
          showsVerticalScrollIndicator={false}
          data={comments}
          renderItem={this.renderComments}
          keyExtractor={this.keyExtractor}
          initialNumToRender={COMMENT_BATCH_SIZE}
          maxToRenderPerBatch={COMMENT_BATCH_SIZE}
          scrollEventThrottle={20}
          contentContainerStyle={styles.contentContainerStaticStyle}
          ItemSeparatorComponent={this.itemSeparator}
          ListEmptyComponent={
            <View style={styles.emptyComponentContainerStaticStyle}>
              <LoadingIndicator size={SIZE_REF_10 * 5} />
            </View>
          }
        />
        <View style={styles.inputBoxContainerStaticStyle}>
          <InputBox placeholder="write comment..." />
          <RoundedIcon
            name="arrow-right"
            size={SIZE_REF_10 * 4}
            scale={0.75}
            style={styles.writeCommentIconStaticStyle}
            backgroundColor="#3F71F2"
            color="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  writeCommentIconStaticStyle: { marginLeft: SIZE_REF_8 },
  inputBoxContainerStaticStyle: {
    width: "100%",
    borderColor: "#D1CBCB",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: SIZE_REF_8,
  },
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
  contentContainerStaticStyle: {
    paddingVertical: SIZE_REF_16,
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
