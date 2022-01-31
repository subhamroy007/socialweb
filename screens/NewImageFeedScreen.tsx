import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ListRenderItemInfo,
  StyleSheet,
  View,
  ViewabilityConfig,
  ViewToken,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HighlightedItem from "../components/global/HighlightedItem";
import Icon from "../components/global/Icon";
import ItemSeparator from "../components/global/ItemSeparator";
import ListItem from "../components/global/ListItem";
import RoundedIcon from "../components/global/RoundedIcon";
import ImagePost from "../components/imagePost/ImagePost";
import { useGetImagePostFeedDataQuery } from "../store/imagePost/endpoint";

import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../utility/constants";
import { createKeyExtractor } from "../utility/helpers";

import { globalColors, globalLayouts } from "../utility/styles";
import { ImagePostResponse } from "../utility/types";

const imagePostListkeyExtractor = createKeyExtractor("image-post");

const imagePostsItemSeparatorCallback = () => (
  <ItemSeparator axis="horizontal" length={SIZE_REF_16} />
);

const viewConfig: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 0,
  minimumViewTime: 0,
};

const NewImageFeedScreen = () => {
  const [screenInfo, setScreenInfo] = useState<{
    currentPageId?: number;
    currentPageLength?: number;
    data: ImagePostResponse[];
    keywords?: string[];
    selectedKeyword?: string;
    sendRequest: boolean;
  }>({
    data: [],
    sendRequest: true,
  });

  const {
    currentPageId,
    currentPageLength,
    error,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    keywords,
    posts,
  } = useGetImagePostFeedDataQuery(
    {
      userId: "roybond007",
      pageId: screenInfo.currentPageId
        ? screenInfo.currentPageId + 1
        : undefined,
      keyword: screenInfo.selectedKeyword,
    },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      skip: !screenInfo.sendRequest,
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
          currentPageId: currentData?.meta.page.id,
          currentPageLength: currentData?.meta.page.length,
          error,
        };
      },
    }
  );

  const itemRefs = useRef<(ListItem | null)[]>([]);

  useEffect(() => {
    if (posts) {
      setScreenInfo((info) => {
        return {
          data: [...info.data, ...posts],
          currentPageId: currentPageId,
          currentPageLength: currentPageLength,
          keywords: keywords ? keywords : info.keywords,
          selectedKeyword: "all",
          sendRequest: false,
        };
      });
    }
  }, [posts, currentPageId, currentPageLength, keywords]);

  const endReachCallback = useCallback(() => {
    setScreenInfo((info) => {
      return {
        ...info,
        sendRequest: true,
      };
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ImagePostResponse>) => {
      return (
        <ListItem
          node={<ImagePost {...item} />}
          ref={(item) => {
            itemRefs.current.push(item);
          }}
        />
      );
    },
    []
  );

  const onViewChange = useCallback(
    ({ changed }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      changed.map((item) => {
        if (item.index) {
          const node = itemRefs.current[item.index];
          if (node) {
            node.setVisibility(item.isViewable);
          }
        }
      });
    },
    []
  );

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {isLoading && screenInfo.currentPageId === undefined && (
        <Icon name="loading" size={SIZE_REF_10 * 4} />
      )}

      {isError && screenInfo.currentPageId === undefined && (
        <RoundedIcon
          name="chevron-down"
          scale={0.7}
          size={SIZE_REF_10 * 4}
          type="outline"
          borderColor="black"
        />
      )}
      {screenInfo.currentPageId !== undefined && (
        <FlatList
          data={screenInfo.data}
          renderItem={renderItem}
          keyExtractor={imagePostListkeyExtractor}
          ItemSeparatorComponent={imagePostsItemSeparatorCallback}
          ListHeaderComponent={
            <ScrollView
              style={styles.suggestionListStaticStyle}
              contentContainerStyle={
                styles.suggestionListContentContainerStaticStyle
              }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            >
              {screenInfo.keywords?.map((item, index) => {
                const isLastItem = screenInfo.keywords
                  ? screenInfo.keywords.length === index + 1
                  : false;
                return (
                  <HighlightedItem
                    key={item + "-" + index}
                    text={item}
                    type={
                      item === screenInfo.selectedKeyword ? "solid" : "outline"
                    }
                    onTap={() => {
                      setScreenInfo((info) => {
                        return {
                          ...info,
                          selectedKeyword: item,
                        };
                      });
                    }}
                    style={{ marginRight: isLastItem ? undefined : SIZE_REF_8 }}
                  />
                );
              })}
            </ScrollView>
          }
          extraData={screenInfo}
          style={styles.listStaticStyle}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.3}
          onEndReached={endReachCallback}
          windowSize={11}
          scrollEventThrottle={32}
          nestedScrollEnabled={true}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={onViewChange}
          ListFooterComponent={
            <View
              style={{
                width: WINDOW_WIDTH,
                height: SIZE_REF_8 * 7,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="loading" size={SIZE_REF_10 * 4} />
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  suggestionListStaticStyle: {
    width: WINDOW_WIDTH,
    height: SIZE_REF_12 + 2 * SIZE_REF_12 * 0.47 + 2 * SIZE_REF_8,
  },
  suggestionListContentContainerStaticStyle: {
    padding: SIZE_REF_8,
    alignItems: "center",
  },
  listStaticStyle: { flex: 1, width: "100%" },
});

export default NewImageFeedScreen;
