import React, {
  createRef,
  LegacyRef,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ListRenderItemInfo,
  StyleSheet,
  View,
  ViewabilityConfig,
  ViewToken,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn, TransitioningView } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import HighlightedItem from "../../components/global/HighlightedItem";
import Icon from "../../components/global/Icon";
import ItemSeparator from "../../components/global/ItemSeparator";
import ListItem from "../../components/global/ListItem";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import RoundedIcon from "../../components/global/RoundedIcon";
import VideoThumbnail from "../../components/videoPost/VideoThumbnail";
import { useGetVideoPostFeedDataQuery } from "../../store/videoPost/endpoints";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";
import { VideoThumbnailResponse } from "../../utility/types";

const itemSeparatorCallback = () => (
  <ItemSeparator axis="horizontal" length={SIZE_REF_8} />
);

const keyExtractor = createKeyExtractor("video");

const viewConfig: ViewabilityConfig = {
  viewAreaCoveragePercentThreshold: 0,
  minimumViewTime: 0,
};

const VideoFeedScreen = () => {
  const [screenInfo, setScreenInfo] = useState<{
    currentPageId?: number;
    currentPageLength?: number;
    data: VideoThumbnailResponse[];
    keywords?: string[];
    selectedKeyword?: string;
    sendRequest: boolean;
  }>({
    data: [],
    sendRequest: true,
  });

  const itemRefs = useRef<(ListItem | null)[]>([]);
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
    thumbnails,
  } = useGetVideoPostFeedDataQuery(
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
          thumbnails: currentData?.data.list,
          currentPageId: currentData?.meta.page.id,
          currentPageLength: currentData?.meta.page.length,
          error,
        };
      },
    }
  );

  useEffect(() => {
    if (thumbnails) {
      setScreenInfo((info) => {
        return {
          data: [...info.data, ...thumbnails],
          currentPageId: currentPageId,
          currentPageLength: currentPageLength,
          keywords: keywords ? keywords : info.keywords,
          selectedKeyword: "all",
          sendRequest: false,
        };
      });
    }
  }, [thumbnails, currentPageId, currentPageLength, keywords]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<VideoThumbnailResponse>) => {
      return (
        <ListItem
          node={<VideoThumbnail {...item} />}
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

  const onEndReach = useCallback(() => {
    setScreenInfo((state) => ({
      ...state,
      sendRequest: true,
    }));
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
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
          nestedScrollEnabled={true}
          data={screenInfo.data}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparatorCallback}
          keyExtractor={keyExtractor}
          style={styles.listStaticStyle}
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
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={onViewChange}
          onEndReachedThreshold={0.2}
          onEndReached={onEndReach}
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
          extraData={screenInfo}
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

export default VideoFeedScreen;
