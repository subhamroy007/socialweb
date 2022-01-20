import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAccountDetails,
  getAccountInfo,
  getCommentInfo,
  getHashTagDetails,
  getHashTagInfo,
  getImagePostDetails,
  getImagePostFeed,
  getVideoPostDetails,
  getVideoPostFeed,
  getVideoPostInfo,
} from "../../utility/clients";
import {
  AppError,
  PageResponseParamList,
  PageDataThunkParamList,
  DataCategory,
  VideoPostInfo,
  HashTagCategory,
  HashTagInfo,
  AccountInfo,
  AccountCategory,
  VideoPostDetails,
  Id,
  HashTagDetails,
  AccountDetails,
  FeedResponseParamList,
  ImagePostDetails,
  PostType,
  CommentInfo,
  ThunkRequestConfig,
} from "../../utility/types";
import {
  selectAccountPageInfo,
  selectAccountRequestRecentTimestamp,
  selectAccountRequestState,
  selectCommentPageInfo,
  selectCommentRequestRecentTimestamp,
  selectCommentRequestState,
  selectHashTagPageInfo,
  selectHashTagRequestRecentTimestamp,
  selectHashTagRequestState,
  selectImagePostPageInfo,
  selectImagePostRequestRecentTimestamp,
  selectImagePostRequestState,
  selectUserId,
  selectVideoPostPageInfo,
  selectVideoPostRequestRecentTimestamp,
  selectVideoPostRequestState,
} from "./selectors";

export const getVideoPostFeedThunk = createAsyncThunk<
  FeedResponseParamList<VideoPostInfo, DataCategory>,
  undefined,
  ThunkRequestConfig
>(
  "videoPostFeed",
  async (_, thunkApi) => {
    try {
      const videoPostFeed = await getVideoPostFeed();

      return thunkApi.fulfillWithValue(videoPostFeed, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    idGenerator: () => "VideoPostFeed@" + Date.now(),
    dispatchConditionRejection: false,
    condition: (_, api) => {
      const state = api.getState().appData.screenInfo.videoFeed.state;
      if (state === "loading") false;
      return true;
    },
  }
);

export const getImagePostFeedThunk = createAsyncThunk<
  FeedResponseParamList<ImagePostDetails, DataCategory>,
  undefined,
  ThunkRequestConfig
>(
  "imagePostFeed",
  async (_, thunkApi) => {
    try {
      const imagePostFeed = await getImagePostFeed();
      return thunkApi.fulfillWithValue(imagePostFeed, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    idGenerator: () => "ImagePostFeed@" + Date.now(),
    dispatchConditionRejection: false,
    condition: (_, api) => {
      const state = api.getState().appData.screenInfo.imageFeed.state;
      if (state === "loading") false;
      return true;
    },
  }
);

export const getVideoPostInfoThunk = createAsyncThunk<
  PageResponseParamList<VideoPostInfo, DataCategory>,
  PageDataThunkParamList<DataCategory>,
  ThunkRequestConfig
>(
  "videoPost/info",
  async ({ category, filter, initialRequest }, thunkApi) => {
    try {
      let pageId = 0;
      let recentTimestamp = Date.now();
      if (!initialRequest) {
        pageId = selectVideoPostPageInfo(thunkApi.getState(), category, filter)
          ?.id as number;
        recentTimestamp = selectVideoPostRequestRecentTimestamp(
          thunkApi.getState(),
          category,
          filter
        ) as number;
      }

      const videoPostInfo = await getVideoPostInfo({
        category,
        filter,
        pageId,
        recentTimestamp,
      });

      return thunkApi.fulfillWithValue(videoPostInfo, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    idGenerator: () => "videoPostInfo@" + Date.now(),
    dispatchConditionRejection: false,
    condition: ({ category, filter, initialRequest }, api) => {
      const pageInfo = selectVideoPostPageInfo(
        api.getState(),
        category,
        filter
      );
      const state = selectVideoPostRequestState(
        api.getState(),
        category,
        filter
      );
      if (
        state === "loading" ||
        (!initialRequest &&
          pageInfo?.id === (pageInfo?.noOfPages as number) - 1)
      ) {
        return false;
      }
      return true;
    },
  }
);

// export const getImagePostInfoThunk = createAsyncThunk<
//   PageResponseParamList<ImagePostInfo, DataCategory>,
//   PageDataThunkParamList<DataCategory>,
//   RequestConfig
// >(
//   "imagePost/info",
//   ({ category, filter, initialRequest }, thunkApi) => {
//     let pageId = 0;
//     let recentTimestamp = Date.now();
//     if (!initialRequest) {
//       pageId = selectImagePostPageInfo(thunkApi.getState(), category, filter)
//         ?.id as number;
//       recentTimestamp = selectImagePostRequestRecentTimestamp(
//         thunkApi.getState(),
//         category,
//         filter
//       ) as number;
//     }

//     const imagePostShortInfo = getImagePostInfo({
//       category,
//       filter,
//       pageId,
//       recentTimestamp,
//     });

//     return imagePostShortInfo;
//   },
//   {
//     idGenerator: () => "imagePostInfo@" + Date.now(),
//     dispatchConditionRejection: false,
//     condition: ({ category, filter, initialRequest }, api) => {
//       const pageInfo = selectImagePostPageInfo(
//         api.getState(),
//         category,
//         filter
//       );
//       const state = selectImagePostRequestState(
//         api.getState(),
//         category,
//         filter
//       );
//       if (
//         state === "loading" ||
//         (!initialRequest &&
//           pageInfo?.id === (pageInfo?.noOfPages as number) - 1)
//       ) {
//         return false;
//       }
//       return true;
//     },
//   }
// );

export const getImagePostDetailsThunk = createAsyncThunk<
  PageResponseParamList<ImagePostDetails, DataCategory>,
  PageDataThunkParamList<DataCategory>,
  ThunkRequestConfig
>(
  "imagePost/details",
  async ({ category, filter, initialRequest }, thunkApi) => {
    try {
      let pageId = 0;
      let recentTimestamp = Date.now();
      if (!initialRequest) {
        pageId = selectImagePostPageInfo(thunkApi.getState(), category, filter)
          ?.id as number;
        recentTimestamp = selectImagePostRequestRecentTimestamp(
          thunkApi.getState(),
          category,
          filter
        ) as number;
      }

      const imagePostDetails = await getImagePostDetails({
        category,
        filter,
        pageId,
        recentTimestamp,
      });

      return thunkApi.fulfillWithValue(imagePostDetails, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    idGenerator: () => "imagePostDetails@" + Date.now(),
    dispatchConditionRejection: false,
    condition: ({ category, filter, initialRequest }, api) => {
      const pageInfo = selectImagePostPageInfo(
        api.getState(),
        category,
        filter
      );
      const state = selectImagePostRequestState(
        api.getState(),
        category,
        filter
      );
      if (
        state === "loading" ||
        (!initialRequest &&
          pageInfo?.id === (pageInfo?.noOfPages as number) - 1)
      ) {
        return false;
      }
      return true;
    },
  }
);

export const getHashTagInfoThunk = createAsyncThunk<
  PageResponseParamList<HashTagInfo, HashTagCategory>,
  PageDataThunkParamList<HashTagCategory>,
  ThunkRequestConfig
>(
  "hashTag/info",
  async ({ category, filter, initialRequest }, thunkApi) => {
    try {
      let pageId = 0;
      let recentTimestamp = Date.now();
      if (!initialRequest) {
        pageId = selectHashTagPageInfo(thunkApi.getState(), category, filter)
          ?.id as number;
        recentTimestamp = selectHashTagRequestRecentTimestamp(
          thunkApi.getState(),
          category,
          filter
        ) as number;
      }

      const hashtags = await getHashTagInfo({
        category,
        filter,
        pageId,
        recentTimestamp,
      });

      return thunkApi.fulfillWithValue(hashtags, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    idGenerator: () => "hashTagInfo@" + Date.now(),
    dispatchConditionRejection: false,
    condition: ({ category, filter, initialRequest }, api) => {
      const pageInfo = selectHashTagPageInfo(api.getState(), category, filter);
      const state = selectHashTagRequestState(api.getState(), category, filter);
      if (
        state === "loading" ||
        (!initialRequest &&
          pageInfo?.id === (pageInfo?.noOfPages as number) - 1)
      ) {
        return false;
      }
      return true;
    },
  }
);

export const getAccountInfoThunk = createAsyncThunk<
  PageResponseParamList<AccountInfo, AccountCategory>,
  PageDataThunkParamList<AccountCategory>,
  ThunkRequestConfig
>(
  "account/info",
  async ({ category, filter, initialRequest }, thunkApi) => {
    try {
      let pageId = 0;
      let recentTimestamp = Date.now();
      if (!initialRequest) {
        pageId = selectAccountPageInfo(thunkApi.getState(), category, filter)
          ?.id as number;
        recentTimestamp = selectAccountRequestRecentTimestamp(
          thunkApi.getState(),
          category,
          filter
        ) as number;
      }

      const accounts = await getAccountInfo({
        category,
        filter,
        pageId,
        recentTimestamp,
      });

      return thunkApi.fulfillWithValue(accounts, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    idGenerator: () => "accountInfo@" + Date.now(),
    dispatchConditionRejection: false,
    condition: ({ category, filter, initialRequest }, api) => {
      const pageInfo = selectAccountPageInfo(api.getState(), category, filter);
      const state = selectAccountRequestState(api.getState(), category, filter);
      if (
        state === "loading" ||
        (!initialRequest &&
          pageInfo?.id === (pageInfo?.noOfPages as number) - 1)
      ) {
        return false;
      }
      return true;
    },
  }
);

export const getVideoPostDetailsThunk = createAsyncThunk<
  VideoPostDetails,
  Id,
  ThunkRequestConfig
>(
  "videoPost/details",
  async ({ id }, thunkApi) => {
    try {
      const videoPost = await getVideoPostDetails({ id });

      return thunkApi.fulfillWithValue(videoPost, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    condition: (_, api) => {
      return api.getState().appData.screenInfo.videoPost.state !== "loading";
    },
    dispatchConditionRejection: false,
    idGenerator: () => "videoPostDetails@" + Date.now(),
  }
);

export const getHashTagDetailsThunk = createAsyncThunk<
  HashTagDetails,
  Id,
  ThunkRequestConfig
>(
  "hashtag/details",
  async ({ id }, thunkApi) => {
    try {
      const hashtag = await getHashTagDetails({ id });

      return thunkApi.fulfillWithValue(hashtag, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    condition: (_, api) => {
      return api.getState().appData.screenInfo.hashtag.state !== "loading";
    },
    dispatchConditionRejection: false,
    idGenerator: () => "HashTagDetails@" + Date.now(),
  }
);

export const getAccountDetailsThunk = createAsyncThunk<
  AccountDetails,
  Id,
  ThunkRequestConfig
>(
  "account/details",
  async ({ id }, thunkApi) => {
    try {
      const account = await getAccountDetails({ id });

      return thunkApi.fulfillWithValue(account, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    condition: ({ id }, api) => {
      const userId = selectUserId(api.getState());
      if (id === userId) {
        return api.getState().appData.screenInfo.profile.state !== "loading";
      }
      return api.getState().appData.screenInfo.account.state !== "loading";
    },
    dispatchConditionRejection: false,
    idGenerator: () => "AccountDetails@" + Date.now(),
  }
);

// export const getTrendingResponseThunk = createAsyncThunk<
//   AllDataResponseParamList,
//   undefined,
//   RequestConfig
// >(
//   "trending",
//   async (_, thunkApi) => {
//     try {
//       const trending = await getTrendingResponse();

//       return thunkApi.fulfillWithValue(trending, undefined);
//     } catch (e: any) {
//       return thunkApi.rejectWithValue(e as AppError, undefined);
//     }
//   },
//   {
//     condition: (_, api) => {
//       return api.getState().appData.screenInfo.trending.state !== "loading";
//     },
//     dispatchConditionRejection: false,
//     idGenerator: () => "trending@" + Date.now(),
//   }
// );

// export const getSavedResponseThunk = createAsyncThunk<
//   AllDataResponseParamList,
//   undefined,
//   RequestConfig
// >(
//   "saved",
//   async (_, thunkApi) => {
//     try {
//       const saved = await getSavedResponse();

//       return thunkApi.fulfillWithValue(saved, undefined);
//     } catch (e: any) {
//       return thunkApi.rejectWithValue(e as AppError, undefined);
//     }
//   },
//   {
//     condition: (_, api) => {
//       return api.getState().appData.screenInfo.saved.state !== "loading";
//     },
//     dispatchConditionRejection: false,
//     idGenerator: () => "saved@" + Date.now(),
//   }
// );

// export const getTaggedPostResponseThunk = createAsyncThunk<
//   AllPostResponseParamList,
//   Id,
//   RequestConfig
// >(
//   "tagged",
//   async ({ id }, thunkApi) => {
//     try {
//       const tagged = await getTaggedPostResponse({ id });

//       return thunkApi.fulfillWithValue(tagged, undefined);
//     } catch (e: any) {
//       return thunkApi.rejectWithValue(e as AppError, undefined);
//     }
//   },
//   {
//     condition: (_, api) => {
//       return api.getState().appData.screenInfo.tagged.state !== "loading";
//     },
//     dispatchConditionRejection: false,
//     idGenerator: () => "tagged@" + Date.now(),
//   }
// );

export const getCommentInfoThunk = createAsyncThunk<
  PageResponseParamList<CommentInfo, PostType>,
  PageDataThunkParamList<PostType>,
  ThunkRequestConfig
>(
  "commentInfo",
  async ({ category, filter, initialRequest }, thunkApi) => {
    try {
      let pageId = 0;
      let recentTimestamp = Date.now();
      if (!initialRequest) {
        pageId = selectCommentPageInfo(thunkApi.getState(), category, filter)
          ?.id as number;
        recentTimestamp = selectCommentRequestRecentTimestamp(
          thunkApi.getState(),
          category,
          filter
        ) as number;
      }

      const comments = await getCommentInfo({
        category,
        filter,
        pageId,
        recentTimestamp,
      });

      return thunkApi.fulfillWithValue(comments, {});
    } catch (e: any) {
      return thunkApi.rejectWithValue(e as AppError, undefined);
    }
  },
  {
    dispatchConditionRejection: false,
    idGenerator: () => "commentInfo@" + Date.now(),
    condition: ({ category, filter, initialRequest }, api) => {
      const pageInfo = selectCommentPageInfo(api.getState(), category, filter);
      const state = selectCommentRequestState(api.getState(), category, filter);
      if (
        state === "loading" ||
        (!initialRequest &&
          pageInfo?.id === (pageInfo?.noOfPages as number) - 1)
      ) {
        return false;
      }
      return true;
    },
  }
);
