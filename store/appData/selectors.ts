import { createDraftSafeSelector } from "@reduxjs/toolkit";
import {
  AccountCategory,
  AppError,
  DataCategory,
  HashTagCategory,
  PageResponse,
  PostType,
  TaskState,
} from "../../utility/types";
import { RootState } from "../appStore";
import { selectImagePostById } from "../imagePost/slice";
import { selectVideoPostById } from "../videoPost/slice";

export const selectVideoPostPageInfo = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: DataCategory,
      filter: string
    ) => PageResponse<any> | undefined
  ],
  PageResponse<any> | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "feed":
        let resultMap = state.appData.screenInfo.videoFeed.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].page;
      case "save":
        return state.appData.screenInfo.saved.videoPost.page;
      case "search":
        return state.appData.screenInfo.search.videoPost.page;
      case "tag":
        return state.user.metaDataMap[filter].tags?.videoPosts?.page;
      case "trend":
        resultMap = state.appData.screenInfo.trending.videoPost.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].page;
      case "user/uploads":
        return state.user.metaDataMap[filter].uploads?.videoPosts?.page;
      case "hashtag/uploads":
        return state.hashTag.metaDataMap[filter].uploads?.videoPosts?.page;
    }
  },
  (page) => page
);

export const selectVideoPostRequestRecentTimestamp = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: DataCategory,
      filter: string
    ) => number | undefined
  ],
  number | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "feed":
        return state.appData.screenInfo.videoFeed.recentTimestamp;
      case "save":
        return state.appData.screenInfo.saved.videoPost.recentTimestamp;
      case "search":
        return state.appData.screenInfo.search.videoPost.recentTimestamp;
      case "tag":
        return state.user.metaDataMap[filter].tags?.videoPosts?.recentTimestamp;
      case "trend":
        return state.appData.screenInfo.trending.videoPost.recentTimestamp;
      case "user/uploads":
        return state.user.metaDataMap[filter].uploads?.videoPosts
          ?.recentTimestamp;
      case "hashtag/uploads":
        return state.hashTag.metaDataMap[filter].uploads?.videoPosts
          ?.recentTimestamp;
    }
  },
  (timestamp) => timestamp
);

export const selectVideoPostRequestState = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: DataCategory,
      filter: string
    ) => TaskState | undefined
  ],
  TaskState | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "feed":
        let resultMap = state.appData.screenInfo.videoFeed.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].state;
      case "save":
        return state.appData.screenInfo.saved.videoPost.state;
      case "search":
        return state.appData.screenInfo.search.videoPost.state;
      case "tag":
        return state.appData.screenInfo.tagged.videoPost.state;
      case "trend":
        resultMap = state.appData.screenInfo.trending.videoPost.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].state;
      case "user/uploads":
        const userId = selectUserId(state);
        if (filter === userId) {
          return state.appData.screenInfo.profile.videoPost.state;
        }
        return state.appData.screenInfo.account.videoPost.state;
      case "hashtag/uploads":
        return state.appData.screenInfo.hashtag.videoPost.state;
    }
  },
  (state) => state
);

//-----------------------------

export const selectImagePostPageInfo = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: DataCategory,
      filter: string
    ) => PageResponse<any> | undefined
  ],
  PageResponse<any> | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "feed":
        let resultMap = state.appData.screenInfo.imageFeed.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].page;
      case "save":
        return state.appData.screenInfo.saved.imagePost.page;
      case "search":
        return state.appData.screenInfo.search.imagePost.page;
      case "tag":
        return state.user.metaDataMap[filter].tags?.imagePosts?.page;
      case "trend":
        resultMap = state.appData.screenInfo.trending.imagePost.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].page;
      case "user/uploads":
        return state.user.metaDataMap[filter].uploads?.imagePosts?.page;
      case "hashtag/uploads":
        return state.hashTag.metaDataMap[filter].uploads?.imagePosts?.page;
    }
  },
  (page) => page
);

export const selectImagePostRequestRecentTimestamp = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: DataCategory,
      filter: string
    ) => number | undefined
  ],
  number | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "feed":
        return state.appData.screenInfo.imageFeed.recentTimestamp;
      case "save":
        return state.appData.screenInfo.saved.imagePost.recentTimestamp;
      case "search":
        return state.appData.screenInfo.search.imagePost.recentTimestamp;
      case "tag":
        return state.user.metaDataMap[filter].tags?.imagePosts?.recentTimestamp;
      case "trend":
        return state.appData.screenInfo.trending.imagePost.recentTimestamp;
      case "user/uploads":
        return state.user.metaDataMap[filter].uploads?.imagePosts
          ?.recentTimestamp;
      case "hashtag/uploads":
        return state.hashTag.metaDataMap[filter].uploads?.imagePosts
          ?.recentTimestamp;
    }
  },
  (timestamp) => timestamp
);

export const selectImagePostRequestState = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: DataCategory,
      filter: string
    ) => TaskState | undefined
  ],
  TaskState | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "feed":
        let resultMap = state.appData.screenInfo.imageFeed.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].state;
      case "save":
        return state.appData.screenInfo.saved.imagePost.state;
      case "search":
        return state.appData.screenInfo.search.imagePost.state;
      case "tag":
        return state.appData.screenInfo.tagged.imagePost.state;
      case "trend":
        resultMap = state.appData.screenInfo.trending.imagePost.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].state;
      case "user/uploads":
        const userId = selectUserId(state);
        if (filter === userId) {
          return state.appData.screenInfo.profile.imagePost.state;
        }
        return state.appData.screenInfo.account.imagePost.state;
      case "hashtag/uploads":
        return state.appData.screenInfo.hashtag.imagePost.state;
    }
  },
  (state) => state
);

//-------------------------------

export const selectHashTagPageInfo = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: HashTagCategory,
      filter: string
    ) => PageResponse<any> | undefined
  ],
  PageResponse<any> | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "save":
        return state.appData.screenInfo.saved.hashTag.page;
      case "search":
        return state.appData.screenInfo.search.hashTag.page;
      case "trend":
        let resultMap = state.appData.screenInfo.trending.hashTag.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].page;
    }
  },
  (page) => page
);

export const selectHashTagRequestRecentTimestamp = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: HashTagCategory,
      filter: string
    ) => number | undefined
  ],
  number | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "save":
        return state.appData.screenInfo.saved.hashTag.recentTimestamp;
      case "search":
        return state.appData.screenInfo.search.hashTag.recentTimestamp;
      case "trend":
        return state.appData.screenInfo.trending.hashTag.recentTimestamp;
    }
  },
  (timestamp) => timestamp
);

export const selectHashTagRequestState = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: DataCategory,
      filter: string
    ) => TaskState | undefined
  ],
  TaskState | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "save":
        return state.appData.screenInfo.saved.hashTag.state;
      case "search":
        return state.appData.screenInfo.search.hashTag.state;
      case "trend":
        let resultMap = state.appData.screenInfo.trending.hashTag.resultMap;
        if (!resultMap || !resultMap[filter]) return undefined;
        return resultMap[filter].state;
    }
  },
  (state) => state
);

//------------------------------

export const selectAccountPageInfo = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: AccountCategory,
      filter: string
    ) => PageResponse<any> | undefined
  ],
  PageResponse<any> | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "search":
        return state.appData.screenInfo.search.account.page;
      case "hashtag/saves":
        return state.hashTag.metaDataMap[filter].saveInfo?.page;
      case "user/followers":
        return state.user.metaDataMap[filter].followers?.page;
      case "user/followings":
        return state.user.metaDataMap[filter].followings?.page;
    }
  },
  (page) => page
);

export const selectAccountRequestRecentTimestamp = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: AccountCategory,
      filter: string
    ) => number | undefined
  ],
  number | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "search":
        return state.appData.screenInfo.search.account.recentTimestamp;
      case "hashtag/saves":
        return state.hashTag.metaDataMap[filter].saveInfo?.recentTimestamp;
      case "user/followers":
        return state.user.metaDataMap[filter].followers?.recentTimestamp;
      case "user/followings":
        return state.user.metaDataMap[filter].followings?.recentTimestamp;
    }
  },
  (timestamp) => timestamp
);

export const selectAccountRequestState = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: AccountCategory,
      filter: string
    ) => TaskState | undefined
  ],
  TaskState | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "search":
        return state.appData.screenInfo.search.account.state;
      case "hashtag/saves":
        return state.appData.screenInfo.hashtagSaves.state;
      case "user/followers":
        return state.appData.screenInfo.followerFollowing.follower.state;
      case "user/followings":
        return state.appData.screenInfo.followerFollowing.following.state;
    }
  },
  (state) => state
);

export const selectImageFeedScreenData = createDraftSafeSelector<
  [
    (state: RootState) => TaskState | undefined,
    (state: RootState) => AppError | undefined,
    (state: RootState) => string[] | undefined,
    (state: RootState) => string | undefined,
    (state: RootState) => string[] | undefined,
    (state: RootState) => TaskState | undefined
  ],
  {
    state: TaskState | undefined;
    error: AppError | undefined;
    keywords: string[] | undefined;
    selectedKeyWord: string | undefined;
    ids: string[] | undefined;
    selectedKeyWordDataState: TaskState | undefined;
  }
>(
  (state) => state.appData.screenInfo.imageFeed.state,
  (state) => state.appData.screenInfo.imageFeed.error,
  (state) => state.appData.screenInfo.imageFeed.keywords,
  (state) => state.appData.screenInfo.imageFeed.selectedKeyword,
  (state) => {
    const selectedKeyword = state.appData.screenInfo.imageFeed.selectedKeyword;

    if (selectedKeyword) {
      const result =
        state.appData.screenInfo.imageFeed.resultMap[selectedKeyword];
      if (result) {
        return result.ids;
      }
    }
    return undefined;
  },
  (state) => {
    const selectedKeyword = state.appData.screenInfo.imageFeed.selectedKeyword;

    if (selectedKeyword) {
      const result =
        state.appData.screenInfo.imageFeed.resultMap[selectedKeyword];
      if (result) {
        return result.state;
      }
    }
  },
  (state, error, keywords, selectedKeyWord, ids, selectedKeyWordDataState) => {
    return {
      error,
      ids,
      keywords,
      selectedKeyWord,
      state,
      selectedKeyWordDataState,
    };
  }
);

export const selectCommentPageInfo = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: PostType,
      filter: string
    ) => PageResponse<any> | undefined
  ],
  PageResponse<any> | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "imagePost":
        return state.imagePost.postMetaDataMap[filter].commentInfo?.page;
      case "videoPost":
        return state.videoPost.postMetaDataMap[filter].commentInfo?.page;
    }
  },
  (page) => page
);

export const selectCommentRequestRecentTimestamp = createDraftSafeSelector<
  [
    (state: RootState, category: PostType, filter: string) => number | undefined
  ],
  number | undefined
>(
  (state, category, filter) => {
    switch (category) {
      case "imagePost":
        return state.imagePost.postMetaDataMap[filter].commentInfo
          ?.recentTimestamp;
      case "videoPost":
        return state.videoPost.postMetaDataMap[filter].commentInfo
          ?.recentTimestamp;
    }
  },
  (timestamp) => timestamp
);

export const selectCommentRequestState = createDraftSafeSelector<
  [
    (
      state: RootState,
      category: PostType,
      filter: string
    ) => TaskState | undefined
  ],
  TaskState | undefined
>(
  (state, category, filter) => {
    return state.appData.screenInfo.postEngagement.comments.state;
  },
  (state) => state
);

export const selectCommentScreenData = createDraftSafeSelector<
  [
    (state: RootState) => AppError | undefined,
    (state: RootState) => TaskState | undefined,
    (
      state: RootState,
      type: PostType,
      id: string
    ) => string[] | undefined | null
  ],
  { error?: AppError; state?: TaskState; ids?: string[] | null }
>(
  (state) => state.appData.screenInfo.postEngagement.error,
  (state) => state.appData.screenInfo.postEngagement.comments.state,
  (state, type, id) => {
    if (type === "imagePost") {
      return selectImagePostById(state, id)?.comments?.ids;
    }
    return selectVideoPostById(state, id)?.comments?.ids;
  },
  (error, state, ids) => {
    return {
      error,
      ids,
      state,
    };
  }
);

//----------------------------------

export const selectUserId = createDraftSafeSelector<
  [(state: RootState) => string],
  string
>(
  (state) => state.appData.userInfo.id,
  (id) => id
);
