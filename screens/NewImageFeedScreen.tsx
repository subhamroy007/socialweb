import React from "react";
import { ListRenderItemInfo, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HighlightedItem from "../components/global/HighlightedItem";
import ImageList from "../components/global/ImageList";
import ItemSeparator from "../components/global/ItemSeparator";
import LoadingIndicator from "../components/global/LoadingIndicator";
import RoundedIcon from "../components/global/RoundedIcon";
import ImagePost from "../components/imagePost/ImagePost";
import { useGetImagePostFeedDataQuery } from "../store/imagePost/endpoint";

import {
  SIZE_REF_10,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../utility/constants";
import { createKeyExtractor } from "../utility/helpers";

import { globalColors, globalLayouts } from "../utility/styles";
import { ImagePostResponse } from "../utility/types";

const imagePostListkeyExtractor = createKeyExtractor("image-post");

const keyWordListKeyExtractor = (item: string, index?: number) =>
  item + "-" + index;

const keywordsRenderItem = (item: ListRenderItemInfo<string>) => {
  return <HighlightedItem text={item.item} type="outline" />;
};

const keywordsItemSeparatorCallback = () => (
  <ItemSeparator axis="vertical" length={SIZE_REF_8} />
);

const imagePostsRenderItem = (item: ListRenderItemInfo<ImagePostResponse>) => {
  return <ImagePost {...item.item} />;
};

const imagePostsItemSeparatorCallback = () => (
  <ItemSeparator axis="horizontal" length={SIZE_REF_16} />
);

const NewImageFeedScreen = () => {
  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    error,
    keywords,
    posts,
  } = useGetImagePostFeedDataQuery(
    { userId: "" },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      selectFromResult: ({
        isError,
        isFetching,
        isLoading,
        isSuccess,
        isUninitialized,
        currentData,
        error,
      }) => {
        return {
          isError,
          isFetching,
          isLoading,
          isSuccess,
          isUninitialized,
          keywords: currentData?.meta.keywords,
          posts: currentData?.data.list,
          error,
        };
      },
    }
  );

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {/* {(isUninitialized || isLoading) && (
        <LoadingIndicator size={SIZE_REF_10 * 5} color="#1F1F1F" />
      )} */}
      {isError && (
        <RoundedIcon
          name="chevron-down"
          backgroundColor="transparent"
          scale={0.7}
          size={SIZE_REF_10 * 4}
          style={styles.retryIconStaticStyle}
        />
      )}
      {isSuccess && (
        <FlatList
          data={posts}
          renderItem={imagePostsRenderItem}
          keyExtractor={imagePostListkeyExtractor}
          ItemSeparatorComponent={imagePostsItemSeparatorCallback}
          ListHeaderComponent={
            <FlatList
              data={keywords}
              style={styles.suggestionListStaticStyle}
              contentContainerStyle={
                styles.suggestionListContentContainerStaticStyle
              }
              renderItem={keywordsRenderItem}
              keyExtractor={keyWordListKeyExtractor}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={keywordsItemSeparatorCallback}
            />
          }
          style={styles.listStaticStyle}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  suggestionListStaticStyle: {
    width: WINDOW_WIDTH,
    height: SIZE_REF_14 + 2 * 0.47 * SIZE_REF_14,
    marginTop: SIZE_REF_16,
    marginBottom: SIZE_REF_8,
  },
  suggestionListContentContainerStaticStyle: {
    paddingHorizontal: SIZE_REF_8,
    alignItems: "center",
  },
  retryIconStaticStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
  },
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
});

export default NewImageFeedScreen;
