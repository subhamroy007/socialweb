import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppError, TaskState } from "../../utility/types";
import { RootState } from "../appStore";

export const selectImageFeedState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.imageFeed.state,
  (state) => state
);

export const selectImageFeedIds = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.imageFeed.ids,
  (state) => state
);

export const selectVideoFeedState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.videoFeed.state,
  (state) => state
);

export const selectVideoFeedIds = createDraftSafeSelector<
  [(state: RootState, keyword: string) => string[] | undefined],
  string[] | undefined
>(
  (state, keyword) => {
    const suggestions = state.appData.screenInfo.videoFeed?.suggestions;

    return suggestions ? suggestions[keyword].ids : undefined;
  },
  (state) => state
);

export const selectVideoFeedSelectedSuggestion = createDraftSafeSelector<
  [(state: RootState) => string | undefined],
  string | undefined
>(
  (state) => state.appData.screenInfo.videoFeed.selectedSuggestion,
  (keyword) => keyword
);

export const selectVideoPreviewState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.videoPreview.state,
  (state) => state
);

export const selectVideoPostState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.videoPost.state,
  (state) => state
);

export const selectUserId = createDraftSafeSelector<
  [(state: RootState) => string],
  string
>(
  (state) => state.appData.userInfo.id,
  (id) => id
);

export const selectUserProfilePictureDataUrl = createDraftSafeSelector<
  [(state: RootState) => string],
  string
>(
  (state) => state.appData.userInfo.profilePictureDataUrl,
  (profilePictureDataUrl) => profilePictureDataUrl
);

export const selectUserProfileState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.profile.state,
  (state) => state
);

export const selectTrendingHashTagState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.trending.hashTag.state,
  (state) => state
);

export const selectTrendingHashTagIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.trending.hashTag.ids,
  (state) => state
);

export const selectTrendingImageState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.trending.imagePost.state,
  (state) => state
);

export const selectTrendingImageIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.trending.imagePost.ids,
  (ids) => ids
);

export const selectTrendingVideoState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.trending.videoPost.state,
  (state) => state
);

export const selectTrendingScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.trending.state,
  (state) => state
);

export const selectTrendingScreenError = createDraftSafeSelector<
  [(state: RootState) => AppError | undefined],
  AppError | undefined
>(
  (state) => state.appData.screenInfo.trending.error,
  (error) => error
);

export const selectTrendingScreenLastRefreshTimestamp = createDraftSafeSelector<
  [(state: RootState) => number | undefined],
  number | undefined
>(
  (state) => state.appData.screenInfo.trending.lastRefreshTimestamp,
  (timestamp) => timestamp
);

export const selectTrendingVideoIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.trending.videoPost.ids,
  (ids) => ids
);

export const selectSavedScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.saved.state,
  (state) => state
);

export const selectSavedScreenError = createDraftSafeSelector<
  [(state: RootState) => AppError | undefined],
  AppError | undefined
>(
  (state) => state.appData.screenInfo.saved.error,
  (error) => error
);

export const selectSavedHashTagScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.saved.hashTag.state,
  (state) => state
);

export const selectSavedImagePostScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.saved.imagePost.state,
  (state) => state
);

export const selectSavedVideoPostScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.saved.videoPost.state,
  (state) => state
);

export const selectSavedHashTagIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.saved.hashTag.ids,
  (ids) => ids
);

export const selectSavedImagePostIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.saved.imagePost.ids,
  (ids) => ids
);

export const selectSavedVideoPostIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.saved.videoPost.ids,
  (ids) => ids
);

export const selectTrendingScreenFocus = createDraftSafeSelector<
  [(state: RootState) => string | undefined],
  string | undefined
>(
  (state) => state.appData.screenInfo.trending.focus,
  (focus) => focus
);

export const selectSearchPhase = createDraftSafeSelector<
  [(state: RootState) => string | undefined],
  string | undefined
>(
  (state) => state.appData.screenInfo.search.searchPhase,
  (phase) => phase
);

export const selectSearchScreenError = createDraftSafeSelector<
  [(state: RootState) => AppError | undefined],
  AppError | undefined
>(
  (state) => state.appData.screenInfo.search.error,
  (error) => error
);

export const selectSearchedHashTagScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.search.hashTag.state,
  (state) => state
);

export const selectSearchedImagePostScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.search.imagePost.state,
  (state) => state
);

export const selectSearchedVideoPostScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.search.videoPost.state,
  (state) => state
);

export const selectSearchedAccountScreenState = createDraftSafeSelector<
  [(state: RootState) => TaskState | undefined],
  TaskState | undefined
>(
  (state) => state.appData.screenInfo.search.account.state,
  (state) => state
);

export const selectSearchedHashTagIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.search.hashTag.ids,
  (ids) => ids
);

export const selectSearchedImagePostIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.search.imagePost.ids,
  (ids) => ids
);

export const selectSearchedVideoPostIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.search.videoPost.ids,
  (ids) => ids
);

export const selectSearchedAccountIdList = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.search.account.ids,
  (ids) => ids
);

export const selectAccountHasNewSearchPhase = createDraftSafeSelector<
  [(state: RootState) => boolean | undefined],
  boolean | undefined
>(
  (state) => state.appData.screenInfo.search.account.hasNewSearchPhase,
  (hasNewSearchPhase) => hasNewSearchPhase
);

export const selectHashTagHasNewSearchPhase = createDraftSafeSelector<
  [(state: RootState) => boolean | undefined],
  boolean | undefined
>(
  (state) => state.appData.screenInfo.search.hashTag.hasNewSearchPhase,
  (hasNewSearchPhase) => hasNewSearchPhase
);

export const selectImagePostHasNewSearchPhase = createDraftSafeSelector<
  [(state: RootState) => boolean | undefined],
  boolean | undefined
>(
  (state) => state.appData.screenInfo.search.imagePost.hasNewSearchPhase,
  (hasNewSearchPhase) => hasNewSearchPhase
);

export const selectVideoPostHasNewSearchPhase = createDraftSafeSelector<
  [(state: RootState) => boolean | undefined],
  boolean | undefined
>(
  (state) => state.appData.screenInfo.search.videoPost.hasNewSearchPhase,
  (hasNewSearchPhase) => hasNewSearchPhase
);

export const selectShutterConfiguration = createDraftSafeSelector<
  [
    (
      state: RootState
    ) => RootState["appData"]["userInfo"]["shutterConfiguration"]
  ],
  RootState["appData"]["userInfo"]["shutterConfiguration"]
>(
  (state) => state.appData.userInfo.shutterConfiguration,
  (config) => config
);
