import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { VideoPost } from "../../utility/types";
import { RootState } from "../appStore";
import { selectHashTagName } from "../hashTag/selector";
import { selectVideoPostById } from "./slice";

export const selectVideoPostTitle = createDraftSafeSelector<
  [typeof selectVideoPostById],
  string | undefined
>(selectVideoPostById, (videoPost) => videoPost?.title);

export const selectVideoPostLikeCount = createDraftSafeSelector<
  [typeof selectVideoPostById],
  number | undefined
>(selectVideoPostById, (videoPost) => videoPost?.likes?.count);

export const selectVideoPostViewCount = createDraftSafeSelector<
  [typeof selectVideoPostById],
  number | undefined
>(selectVideoPostById, (videoPost) => videoPost?.noOfViews);

export const selectVideoPostDuration = createDraftSafeSelector<
  [typeof selectVideoPostById],
  number | undefined
>(selectVideoPostById, (videoPost) => videoPost?.duration);

export const selectVideoPostWatchTime = createDraftSafeSelector<
  [typeof selectVideoPostById],
  number | undefined
>(selectVideoPostById, (videoPost) => videoPost?.watchTime);

export const selectVideoPostTimestamp = createDraftSafeSelector<
  [typeof selectVideoPostById],
  number | undefined
>(selectVideoPostById, (videoPost) => videoPost?.timestamp);

export const selectVideoPostAuhor = createDraftSafeSelector<
  [typeof selectVideoPostById],
  string | undefined
>(selectVideoPostById, (videoPost) => videoPost?.author);

export const selectVideoPostIsSaved = createDraftSafeSelector<
  [typeof selectVideoPostById],
  boolean | undefined
>(selectVideoPostById, (videoPost) => videoPost?.isSaved);

export const selectVideoPostDescription = createDraftSafeSelector<
  [typeof selectVideoPostById],
  string | undefined
>(selectVideoPostById, (videoPost) => videoPost?.description);

export const selectVideoPostThumbnail = createDraftSafeSelector<
  [typeof selectVideoPostById],
  VideoPost["thumbnail"] | undefined
>(selectVideoPostById, (videoPost) => videoPost?.thumbnail);

export const selectVideoPostPreview = createDraftSafeSelector<
  [typeof selectVideoPostById],
  VideoPost["preview"] | undefined
>(selectVideoPostById, (videoPost) => videoPost?.preview);

export const selectVideoPostMedia = createDraftSafeSelector<
  [typeof selectVideoPostById],
  VideoPost["video"] | undefined
>(selectVideoPostById, (videoPost) => videoPost?.video);

export const selectVideoPostCommentCount = createDraftSafeSelector<
  [typeof selectVideoPostById],
  number | undefined
>(selectVideoPostById, (videoPost) => videoPost?.comments?.count);

export const selectVideoPostShareCount = createDraftSafeSelector<
  [typeof selectVideoPostById],
  number | undefined
>(selectVideoPostById, (videoPost) => videoPost?.shares?.count);

export const selectVideoPostIsLiked = createDraftSafeSelector<
  [typeof selectVideoPostById],
  boolean | undefined
>(selectVideoPostById, (videoPost) => videoPost?.likes?.isLiked);

export const selectVideoPostHashTags = createDraftSafeSelector<
  [(state: RootState, id: string) => string[] | undefined],
  string[] | undefined
>(
  (state, id) => {
    const videoPost = selectVideoPostById(state, id);
    const hashTagNames = videoPost?.hashTags?.map(
      (hashTagId) => selectHashTagName(state, hashTagId) as string
    );
    return hashTagNames;
  },
  (names) => names
);
