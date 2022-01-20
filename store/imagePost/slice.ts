import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { convertImagePostDetailsToImagePost } from "../../utility/helpers";
import { ImagePost, ImagePostStoreMetaData } from "../../utility/types";
import {
  getAccountDetailsThunk,
  getCommentInfoThunk,
  getHashTagDetailsThunk,
  getImagePostDetailsThunk,
  getImagePostFeedThunk,
} from "../appData/reducer";
import { RootState } from "../appStore";

const imagePostEntity = createEntityAdapter<ImagePost>({
  selectId: (imagePost) => imagePost.id as string,
  sortComparer: (imagePost1, imagePost2) =>
    (imagePost1.timestamp as number) - (imagePost2.timestamp as number),
});

const imagePostSlice = createSlice({
  initialState: imagePostEntity.getInitialState<ImagePostStoreMetaData>({
    postMetaDataMap: {},
  }),
  name: "imagePost",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getImagePostFeedThunk.fulfilled,
        (
          state,
          {
            payload: {
              feed: { list },
            },
          }
        ) => {
          const imagePosts: ImagePost[] = [];

          list?.forEach((imagePost) => {
            imagePosts.push(convertImagePostDetailsToImagePost(imagePost));
          });

          imagePostEntity.upsertMany(state, imagePosts);
        }
      )
      .addCase(
        getImagePostDetailsThunk.fulfilled,
        (state, { payload: { list } }) => {
          const imagePosts: ImagePost[] = [];

          list?.forEach((imagePost) => {
            imagePosts.push(convertImagePostDetailsToImagePost(imagePost));
          });

          imagePostEntity.upsertMany(state, imagePosts);
        }
      )
      .addCase(
        getHashTagDetailsThunk.fulfilled,
        (
          state,
          {
            payload: {
              uploads: { imagePosts },
            },
          }
        ) => {
          const imagePostList: ImagePost[] = [];

          imagePosts?.list?.forEach((imagePost) => {
            imagePostList.push(convertImagePostDetailsToImagePost(imagePost));
          });

          imagePostEntity.upsertMany(state, imagePostList);
        }
      )
      .addCase(
        getAccountDetailsThunk.fulfilled,
        (
          state,
          {
            payload: {
              uploads: { imagePosts },
            },
          }
        ) => {
          const imagePostList: ImagePost[] = [];

          imagePosts?.list?.forEach((imagePost) => {
            imagePostList.push(convertImagePostDetailsToImagePost(imagePost));
          });

          imagePostEntity.upsertMany(state, imagePostList);
        }
      )
      .addCase(
        getCommentInfoThunk.fulfilled,
        (
          state,
          {
            payload: { list, category, filter, recentTimestamp, ...page },
            meta: {
              arg: { initialRequest },
            },
          }
        ) => {
          const commentIdList: string[] = [];
          list?.forEach((comment) => {
            commentIdList.push(comment.id);
          });
          const imagePost = state.entities[filter];
          const metadata = state.postMetaDataMap[filter];
          if (imagePost) {
            if (imagePost.comments.ids && !initialRequest) {
              imagePost.comments.ids.push(...commentIdList);
            } else {
              imagePost.comments.ids = commentIdList;
            }
            metadata.commentInfo = { page, recentTimestamp };
          }
        }
      );
    // .addCase(
    //   getImagePostFeedThunk.fulfilled,
    //   (
    //     state,
    //     {
    //       payload: {
    //         feed: { list },
    //       },
    //     }
    //   ) => {
    //     const imagePostList: ImagePost[] = [];

    //     list?.forEach((item) => {
    //       imagePostList.push(convertImagePostDetailsToImagePost(item));
    //     });

    //     imagePostEntity.upsertMany(state, imagePostList);
    //   }
    // )
    // .addCase(
    //   getImagePostDetailsThunk.fulfilled,
    //   (state, { payload: { list } }) => {
    //     const imagePostList: ImagePost[] = [];

    //     list?.forEach((item) => {
    //       imagePostList.push(convertImagePostDetailsToImagePost(item));
    //     });

    //     imagePostEntity.upsertMany(state, imagePostList);
    //   }
    // )
    // .addCase(
    //   getCommentInfoThunk.fulfilled,
    //   (
    //     state,
    //     {
    //       payload: { category, filter, recentTimestamp, list, ...page },
    //       meta: {
    //         arg: { initialRequest },
    //       },
    //     }
    //   ) => {
    //     const commentIdList: string[] = [];

    //     list?.forEach((comment) => commentIdList.push(comment.id));

    //     if (category === "imagePost") {
    //       const imagePost = state.entities[filter];
    //       if (imagePost && imagePost.comments) {
    //         if (imagePost.comments.ids && !initialRequest) {
    //           imagePost.comments.ids.push(...commentIdList);
    //         } else {
    //           imagePost.comments.ids = commentIdList;
    //         }
    //       }

    //       state.postMetaDataMap[filter].commentInfo = {
    //         page: page,
    //         recentTimestamp,
    //       };
    //     }
    //   }
    // );
  },
});

export const imagePostReducer = imagePostSlice.reducer;

export const {
  selectAll: selectAllImagePosts,
  selectById: selectImagePostById,
  selectEntities: selectImagePosts,
  selectIds: selectImagePostIds,
  selectTotal: selectTotalImagePosts,
} = imagePostEntity.getSelectors<RootState>((state) => state.imagePost);
