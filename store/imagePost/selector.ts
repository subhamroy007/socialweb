import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { MediaInfo, ImagePost, User } from "../../utility/types";
import { RootState } from "../appStore";
import { selectUserById } from "../user/slice";
import { selectImagePostById } from "./slice";

export const selectImagePostTimestamp = createDraftSafeSelector<
  [typeof selectImagePostById],
  number | undefined
>(selectImagePostById, (imagePost) => imagePost?.timestamp);

export const selectImagePostImageList = createDraftSafeSelector<
  [typeof selectImagePostById],
  MediaInfo[] | undefined
>(selectImagePostById, (imagePost) => imagePost?.images);

export const selectIsLiked = createDraftSafeSelector<
  [typeof selectImagePostById],
  boolean | undefined
>(selectImagePostById, (imagePost) => imagePost?.likes?.isLiked);

export const selectIsSaved = createDraftSafeSelector<
  [typeof selectImagePostById],
  boolean | undefined
>(selectImagePostById, (imagePost) => imagePost?.isSaved);

export const selectCaptionText = createDraftSafeSelector<
  [typeof selectImagePostById],
  string | undefined
>(selectImagePostById, (imagePost) => imagePost?.caption);

export const selectLikeCount = createDraftSafeSelector<
  [typeof selectImagePostById],
  number | undefined
>(selectImagePostById, (imagePost) => imagePost?.likes?.count);

export const selectFliteredLikeIds = createDraftSafeSelector<
  [typeof selectImagePostById],
  string[] | undefined
>(selectImagePostById, (imagePost) => imagePost?.likes?.filteredLikes);

export const selectCommentCount = createDraftSafeSelector<
  [typeof selectImagePostById],
  number | undefined
>(selectImagePostById, (imagePost) => imagePost?.comments?.count);

export const selectShareCount = createDraftSafeSelector<
  [typeof selectImagePostById],
  number | undefined
>(selectImagePostById, (imagePost) => imagePost?.shares?.count);

// export const selectTagList = createDraftSafeSelector<
//   [typeof selectImagePostById],
//   string[] | undefined
// >(selectImagePostById, (imagePost) => imagePost?.tagInfo?.list);

export const selectImagePostAuhor = createDraftSafeSelector<
  [typeof selectImagePostById],
  string | undefined
>(selectImagePostById, (imagePost) => imagePost?.author);

export const selectImage = createDraftSafeSelector<
  [(state: RootState, id: string, index: number) => MediaInfo | undefined],
  MediaInfo | undefined
>(
  (state, id, index) => {
    const imagePost = selectImagePostById(state, id);
    return imagePost?.images?.[index];
  },
  (imageInfo) => imageInfo
);
