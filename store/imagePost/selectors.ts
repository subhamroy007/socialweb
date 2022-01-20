import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { ImageGenre, MediaInfo } from "../../utility/types";
import { RootState } from "../appStore";
import { selectHashTagName } from "../hashTag/selector";
import {
  selectUserProfilePictureUrl,
  selectUserSocialId,
} from "../user/selector";
import { selectImagePostById } from "./slice";

export const selectImagePostLikeAndBookmarkStatus = createDraftSafeSelector<
  [
    (state: RootState, id: string) => boolean | undefined,
    (state: RootState, id: string) => boolean | undefined
  ],
  { isLiked: boolean; isSaved: boolean } | undefined
>(
  (state, id) => {
    return selectImagePostById(state, id)?.likes.isLiked;
  },
  (state, id) => {
    return selectImagePostById(state, id)?.isSaved;
  },
  (isLiked, isSaved) => {
    return isLiked && isSaved
      ? {
          isLiked,
          isSaved,
        }
      : undefined;
  }
);

export const selectImagePostImageList = createDraftSafeSelector<
  [(state: RootState, id: string) => MediaInfo[] | undefined],
  MediaInfo[] | undefined
>(
  (state, id) => {
    return selectImagePostById(state, id)?.images;
  },
  (list) => list
);

export const selectImagePostLikesCommentShareCount = createDraftSafeSelector<
  [
    (state: RootState, id: string) => number | undefined,
    (state: RootState, id: string) => number | undefined | null,
    (state: RootState, id: string) => number | undefined | null
  ],
  { likesCount: number; commentsCount: number; sharesCount: number } | undefined
>(
  (state, id) => {
    return selectImagePostById(state, id)?.likes.likesCount;
  },
  (state, id) => {
    return selectImagePostById(state, id)?.comments?.commentsCount;
  },
  (state, id) => {
    return selectImagePostById(state, id)?.shares?.sharesCount;
  },
  (likesCount, commentsCount, sharesCount) => {
    return likesCount && commentsCount && sharesCount
      ? { commentsCount, likesCount, sharesCount }
      : undefined;
  }
);

export const selectImagePostOverlayData = createDraftSafeSelector<
  [
    typeof selectImagePostLikesCommentShareCount,
    (
      state: RootState,
      id: string
    ) => { id: string; socialId: string }[] | undefined | null,
    (state: RootState, id: string) => ImageGenre | undefined | null,
    (state: RootState, id: string) => string[] | undefined | null
  ],
  | {
      counts: {
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
      };
      likedBy?: { id: string; socialId: string }[] | null;
      genre: ImageGenre;
      tags: string[] | undefined | null;
    }
  | undefined
>(
  selectImagePostLikesCommentShareCount,
  (state, id) => {
    return selectImagePostById(state, id)?.likes.filteredLikes?.map((id) => ({
      id,
      socialId: selectUserSocialId(state, id) as string,
    }));
  },
  (state, id) => {
    return selectImagePostById(state, id)?.genre;
  },
  (state, id) => {
    return selectImagePostById(state, id)?.tags;
  },
  (counts, likedBy, genre, tags) => {
    return counts && genre ? { counts, genre, likedBy, tags } : undefined;
  }
);

export const selectImagePostCaption = createDraftSafeSelector<
  [(state: RootState, id: string) => string | null | undefined],
  string | undefined | null
>(
  (state, id) => {
    return selectImagePostById(state, id)?.caption;
  },
  (caption) => caption
);

export const selectImagePostHashTagList = createDraftSafeSelector<
  [(state: RootState, id: string) => string[] | null | undefined],
  string[] | null | undefined
>(
  (state, id) => {
    return selectImagePostById(state, id)?.hashtags;
  },
  (list) => list
);
