import React, { useCallback, useEffect, useReducer } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import HighlightedItem from "../../components/global/HighlightedItem";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import RoundedIcon from "../../components/global/RoundedIcon";
import VideoThumbnail from "../../components/videoPost/VideoThumbnail";
import { selectUserId } from "../../store/appData/selectors";
import { useAppSelector } from "../../store/appStore";
import { useGetTrendingVideosQuery } from "../../store/videoPost/endpoints";
import { SIZE_REF_10 } from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import APP_STYLE, { globalColors, globalLayouts } from "../../utility/styles";
import { VideoGenre, VideoThumbnailResponse } from "../../utility/types";

const genreList: VideoGenre[] = [
  "all",
  "action",
  "comedy",
  "educational",
  "sports",
  "thriller",
];

export const VIDEO_BATCH_SIZE = 8;

export interface TrendingVideoScreenReducerState {
  data: {
    genres: VideoGenre[];
    videoMap: { [key: number]: VideoThumbnailResponse[] | undefined };
  };
  meta: {
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    isSuccess: boolean;
    activeGenreIndex: number;
    pageMap: {
      [key: number]: { id: number; length: number } | undefined;
    };
    nextPageId: number;
  };
}

function stateInitializer(): TrendingVideoScreenReducerState {
  return {
    data: {
      genres: genreList,
      videoMap: {},
    },
    meta: {
      activeGenreIndex: 0,
      isError: false,
      isFetching: false,
      isLoading: false,
      isSuccess: false,
      nextPageId: 0,
      pageMap: {},
    },
  };
}

export type TrendingVideoScreenReducerActionType =
  | {
      type: "update/active-genre-index";
      payload: {
        activeGenreIndex: number;
      };
    }
  | {
      type: "request/success";
      payload: {
        videos: VideoThumbnailResponse[];
        activeGenre: VideoGenre;
        pageId: number;
        pageLength: number;
      };
    }
  | {
      type: "request/failure";
      payload: undefined;
    }
  | {
      type: "request/loading";
      payload: undefined;
    }
  | {
      type: "request/fetching";
      payload: undefined;
    }
  | {
      type: "request/next-page";
      payload: undefined;
    };

function reducer(
  state: TrendingVideoScreenReducerState,
  action: TrendingVideoScreenReducerActionType
): TrendingVideoScreenReducerState {
  switch (action.type) {
    case "update/active-genre-index":
      const currentPage = state.meta.pageMap[state.meta.activeGenreIndex];
      return {
        ...state,
        meta: {
          ...state.meta,
          activeGenreIndex: action.payload.activeGenreIndex,
          nextPageId: currentPage ? currentPage.id : 0,
        },
      };
    case "request/success":
      const activeGenreIndex = state.data.genres.indexOf(
        action.payload.activeGenre
      );
      let videos = state.data.videoMap[activeGenreIndex];
      if (videos) {
        videos = [...videos, ...action.payload.videos];
      } else {
        videos = action.payload.videos;
      }
      return {
        ...state,
        data: {
          ...state.data,
          videoMap: {
            ...state.data.videoMap,
            [activeGenreIndex]: videos,
          },
        },
        meta: {
          ...state.meta,
          isSuccess: true,
          isLoading: false,
          isFetching: false,
          isError: false,
          pageMap: {
            ...state.meta.pageMap,
            [activeGenreIndex]: {
              id: action.payload.pageId,
              length: action.payload.pageLength,
            },
          },
        },
      };
    case "request/failure":
      return {
        ...state,
        meta: {
          ...state.meta,
          isError: true,
          isFetching: false,
          isLoading: false,
          isSuccess: false,
        },
      };
    case "request/loading":
      return {
        ...state,
        meta: {
          ...state.meta,
          isError: false,
          isFetching: false,
          isLoading: true,
          isSuccess: false,
        },
      };
    case "request/fetching":
      return {
        ...state,
        meta: {
          ...state.meta,
          isError: false,
          isFetching: true,
          isLoading: false,
          isSuccess: false,
        },
      };
    case "request/next-page":
      return {
        ...state,
        meta: {
          ...state.meta,
          nextPageId: state.meta.nextPageId + 1,
        },
      };
    default:
      return stateInitializer();
  }
}

const renderVideos = ({ item }: ListRenderItemInfo<VideoThumbnailResponse>) => {
  return <VideoThumbnail {...item} />;
};

const keyExtractor = createKeyExtractor("video");

const TrendingVideoScreen = () => {
  const [state, dispatch] = useReducer(reducer, undefined, stateInitializer);

  const currentPage = state.meta.pageMap[state.meta.activeGenreIndex];

  const userId = useAppSelector(selectUserId);
  const {
    videos,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    pageId,
    pageLength,
    genre,
  } = useGetTrendingVideosQuery(
    {
      userId,
      genre: state.data.genres[state.meta.activeGenreIndex],
      pageId: state.meta.nextPageId,
    },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      skip:
        currentPage !== undefined && currentPage.id === state.meta.nextPageId,
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
          videos: currentData?.data.list,
          pageId: currentData?.meta.page.id,
          pageLength: currentData?.meta.page.length,
          genre: currentData?.meta.params["genre"],
        };
      },
    }
  );

  useEffect(() => {
    if (
      isSuccess &&
      pageId !== undefined &&
      pageLength !== undefined &&
      videos &&
      genre
    ) {
      dispatch({
        type: "request/success",
        payload: {
          activeGenre: genre as VideoGenre,
          videos,
          pageId,
          pageLength,
        },
      });
    }
    if (isError) {
      dispatch({ type: "request/failure", payload: undefined });
    }
    if (isFetching) {
      dispatch({ type: "request/fetching", payload: undefined });
    }

    if (isLoading) {
      dispatch({ type: "request/loading", payload: undefined });
    }
  }, [
    pageId,
    pageLength,
    videos,
    genre,
    isSuccess,
    isError,
    isFetching,
    isLoading,
  ]);

  const onEndReach = useCallback(() => {
    if (currentPage !== undefined && currentPage.length > 0) {
      dispatch({
        type: "request/next-page",
        payload: undefined,
      });
    }
  }, [currentPage]);

  const genreItemTapCallback = useCallback((genreIndex: number) => {
    dispatch({
      type: "update/active-genre-index",
      payload: { activeGenreIndex: genreIndex },
    });
  }, []);

  let listFooterComponent = null;

  if (state.meta.isLoading || state.meta.isFetching) {
    if (!currentPage) {
      listFooterComponent = (
        <LoadingIndicator
          size={SIZE_REF_10 * 4}
          style={APP_STYLE.MARGIN_TOP_8}
        />
      );
    } else {
      listFooterComponent = (
        <LoadingIndicator
          size={SIZE_REF_10 * 4}
          style={[APP_STYLE.MARGIN_TOP_4, APP_STYLE.MARGIN_BOTTOM_4]}
        />
      );
    }
  }

  if (state.meta.isError) {
    if (!currentPage) {
      listFooterComponent = (
        <RoundedIcon name="chevron-down" style={APP_STYLE.MARGIN_TOP_8} />
      );
    } else {
      listFooterComponent = (
        <RoundedIcon
          name="chevron-down"
          style={[APP_STYLE.MARGIN_TOP_4, APP_STYLE.MARGIN_BOTTOM_4]}
        />
      );
    }
  }

  let listHeaderComponent =
    state.meta.pageMap[0] && state.meta.pageMap[0].length > 0 ? (
      <View style={styles.headerContainerStaticStyle}>
        <ScrollView
          style={styles.genreListStaticStyle}
          contentContainerStyle={styles.genreListContentContainerStaticStyle}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {state.data.genres.map((genre, index) => {
            return index === state.meta.activeGenreIndex ? (
              <HighlightedItem
                text={genre}
                type="solid"
                key={genre + "-" + index}
                style={index === 0 ? undefined : styles.genreItemGap}
                onTap={() => genreItemTapCallback(index)}
              />
            ) : (
              <HighlightedItem
                text={genre}
                key={genre + "-" + index}
                style={index === 0 ? undefined : styles.genreItemGap}
                onTap={() => genreItemTapCallback(index)}
              />
            );
          })}
        </ScrollView>
      </View>
    ) : undefined;

  return (
    <View style={[globalColors.screenColor, globalLayouts.screenLayout]}>
      <FlatList
        style={styles.listStaticStyle}
        showsVerticalScrollIndicator={false}
        data={state.data.videoMap[state.meta.activeGenreIndex]}
        renderItem={renderVideos}
        keyExtractor={keyExtractor}
        initialNumToRender={VIDEO_BATCH_SIZE}
        maxToRenderPerBatch={VIDEO_BATCH_SIZE}
        scrollEventThrottle={20}
        contentContainerStyle={styles.contentContainerStaticStyle}
        ListFooterComponent={listFooterComponent}
        ListHeaderComponent={listHeaderComponent}
        onEndReachedThreshold={0.3}
        onEndReached={onEndReach}
        extraData={state}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStaticStyle: {
    ...APP_STYLE.WIDTH_ABSOLUTE_100,
    ...APP_STYLE.HEIGHT_ABSOLUTE_9,
    ...APP_STYLE.FLEX_NOWRAP,
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
    ...APP_STYLE.FLEX_JUSTIFY_CENTER,
  },
  genreListStaticStyle: {
    ...APP_STYLE.FLEX_1,
  },
  genreListContentContainerStaticStyle: {
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
    ...APP_STYLE.PADDING_LEFT_2,
    ...APP_STYLE.PADDING_RIGHT_2,
  },
  genreItemGap: {
    ...APP_STYLE.MARGIN_LEFT_2,
  },
  listStaticStyle: {
    ...APP_STYLE.WIDTH_RELATIVE_100,
    ...APP_STYLE.FLEX_1,
  },
  contentContainerStaticStyle: {
    ...APP_STYLE.FLEX_ALIGN_ITEM_CENTER,
  },
});

export default TrendingVideoScreen;
