import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  convertVideoPostDetailsToVideoPost,
  convertVideoPostInfoToVideoPost,
} from "../../utility/helpers";
import {
  VideoPost,
  VideoPostDetails,
  VideoPostInfo,
  VideoPostStoreMetaData,
} from "../../utility/types";
import {
  getAccountDetailsThunk,
  getCommentInfoThunk,
  getHashTagDetailsThunk,
  getVideoPostDetailsThunk,
  getVideoPostFeedThunk,
  getVideoPostInfoThunk,
} from "../appData/reducer";
import { RootState } from "../appStore";

const videoPostEntity = createEntityAdapter<VideoPost>({
  selectId: (videoPost) => videoPost.id as string,
  sortComparer: (videoPost1, videoPost2) =>
    (videoPost1.timestamp as number) - (videoPost2.timestamp as number),
});

const videoPostSlice = createSlice({
  initialState: videoPostEntity.getInitialState<VideoPostStoreMetaData>({
    postMetaDataMap: {},
  }),
  name: "videoPost",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getVideoPostFeedThunk.fulfilled,
        (
          state,
          {
            payload: {
              feed: { list },
            },
          }
        ) => {
          const videoPosts: VideoPost[] = [];

          list?.forEach((videoPost) => {
            videoPosts.push(convertVideoPostInfoToVideoPost(videoPost));
          });

          videoPostEntity.upsertMany(state, videoPosts);
        }
      )
      .addCase(
        getVideoPostInfoThunk.fulfilled,
        (state, { payload: { list } }) => {
          const videoPosts: VideoPost[] = [];

          list?.forEach((videoPost) => {
            videoPosts.push(convertVideoPostInfoToVideoPost(videoPost));
          });

          videoPostEntity.upsertMany(state, videoPosts);
        }
      )
      .addCase(getVideoPostDetailsThunk.fulfilled, (state, { payload }) => {
        const videoPosts: VideoPost[] = [];

        videoPosts.push(convertVideoPostDetailsToVideoPost(payload));

        videoPostEntity.upsertMany(state, videoPosts);
      })
      .addCase(
        getHashTagDetailsThunk.fulfilled,
        (
          state,
          {
            payload: {
              uploads: { videoPosts },
            },
          }
        ) => {
          const videoPostList: VideoPost[] = [];

          videoPosts?.list?.forEach((videoPost) => {
            videoPostList.push(convertVideoPostInfoToVideoPost(videoPost));
          });

          videoPostEntity.upsertMany(state, videoPostList);
        }
      )
      .addCase(
        getAccountDetailsThunk.fulfilled,
        (
          state,
          {
            payload: {
              uploads: { videoPosts },
            },
          }
        ) => {
          const videoPostList: VideoPost[] = [];

          videoPosts?.list?.forEach((videoPost) => {
            videoPostList.push(convertVideoPostInfoToVideoPost(videoPost));
          });

          videoPostEntity.upsertMany(state, videoPostList);
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
          const videoPost = state.entities[filter];
          const metadata = state.postMetaDataMap[filter];
          if (videoPost) {
            if (videoPost.comments) {
              if (videoPost.comments.ids) {
                videoPost.comments.ids.push(...commentIdList);
              } else {
                videoPost.comments.ids = commentIdList;
              }
            } else {
              videoPost.comments = { ids: commentIdList };
            }
            metadata.commentInfo = { page, recentTimestamp };
          }
        }
      );
  },
});

export const videoPostReducer = videoPostSlice.reducer;

export const {
  selectAll: selectAllVideoPosts,
  selectById: selectVideoPostById,
  selectEntities: selectVideoPosts,
  selectIds: selectVideoPostIds,
  selectTotal: selectTotalVideoPosts,
} = videoPostEntity.getSelectors<RootState>((state) => state.videoPost);
