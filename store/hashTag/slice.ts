import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  convertHashTagDetailsToHashTag,
  convertHashTagInfoToHashTag,
} from "../../utility/helpers";
import {
  HashTag,
  HashTagDetails,
  HashTagInfo,
  HashTagStoreMetaData,
  PageResponse,
} from "../../utility/types";
import {
  getAccountDetailsThunk,
  getHashTagDetailsThunk,
  getHashTagInfoThunk,
  getImagePostDetailsThunk,
  getImagePostFeedThunk,
  getVideoPostDetailsThunk,
  getVideoPostInfoThunk,
} from "../appData/reducer";
import { RootState } from "../appStore";

const hashTagEntity = createEntityAdapter<HashTag>({
  selectId: (hashTag) => hashTag.id as string,
  sortComparer: (hashTag1, hashTag2) =>
    hashTag1.name?.localeCompare(hashTag2.name as string) as number,
});

const hashTagSlice = createSlice({
  initialState: hashTagEntity.getInitialState<HashTagStoreMetaData>({
    metaDataMap: {},
  }),
  name: "hashTag",
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
          const hashTagList: HashTag[] = [];
          list?.forEach((imagePost) => {
            imagePost.hashtags?.forEach((hashTag) =>
              hashTagList.push(convertHashTagInfoToHashTag(hashTag))
            );
          });
          hashTagEntity.upsertMany(state, hashTagList);
        }
      )
      .addCase(
        getVideoPostInfoThunk.fulfilled,
        (
          state,
          {
            meta: {
              arg: { initialRequest },
            },
            payload: { category, filter, recentTimestamp, list, ...page },
          }
        ) => {
          const videoPostIdList: string[] = [];
          list?.forEach((videoPost) => {
            videoPostIdList.push(videoPost.id);
          });
          const hashTag = state.entities[filter];
          const metadata = state.metaDataMap[filter];

          if (category === "hashtag/uploads" && hashTag) {
            if (hashTag.uploads.videoPosts && !initialRequest) {
              hashTag.uploads.videoPosts.push(...videoPostIdList);
            } else {
              hashTag.uploads.videoPosts = videoPostIdList;
            }
            if (metadata.uploads) {
              metadata.uploads.videoPosts = { page, recentTimestamp };
            } else {
              metadata.uploads = { videoPosts: { page, recentTimestamp } };
            }
          }
        }
      )
      .addCase(
        getImagePostDetailsThunk.fulfilled,
        (
          state,
          {
            meta: {
              arg: { initialRequest },
            },
            payload: { category, filter, recentTimestamp, list, ...page },
          }
        ) => {
          const hashTagList: HashTag[] = [];
          const imagePostIdList: string[] = [];
          list?.forEach((imagePost) => {
            imagePost.hashtags?.forEach((hashTag) =>
              hashTagList.push(convertHashTagInfoToHashTag(hashTag))
            );
            imagePostIdList.push(imagePost.id);
          });
          hashTagEntity.upsertMany(state, hashTagList);
          const hashTag = state.entities[filter];
          const metadata = state.metaDataMap[filter];

          if (category === "hashtag/uploads" && hashTag) {
            if (hashTag.uploads.imagePosts && !initialRequest) {
              hashTag.uploads.imagePosts.push(...imagePostIdList);
            } else {
              hashTag.uploads.imagePosts = imagePostIdList;
            }
            if (metadata.uploads) {
              metadata.uploads.imagePosts = { page, recentTimestamp };
            } else {
              metadata.uploads = { imagePosts: { page, recentTimestamp } };
            }
          }
        }
      )
      .addCase(
        getHashTagInfoThunk.fulfilled,
        (state, { payload: { list } }) => {
          const hashTagList: HashTag[] = [];
          list?.forEach((hashTag) => {
            hashTagList.push(convertHashTagInfoToHashTag(hashTag));
          });
          hashTagEntity.upsertMany(state, hashTagList);
        }
      )
      .addCase(getVideoPostDetailsThunk.fulfilled, (state, { payload }) => {
        const hashTagList: HashTag[] = [];

        payload.hashtags?.forEach((hashTag) => {
          hashTagList.push(convertHashTagInfoToHashTag(hashTag));
        });

        hashTagEntity.upsertMany(state, hashTagList);
      })
      .addCase(getHashTagDetailsThunk.fulfilled, (state, { payload }) => {
        const hasTagList: HashTag[] = [];
        const imagePostIdList: string[] = [];
        const videoPostIdList: string[] = [];
        const imagePostRecentTimestamp =
          payload.uploads.imagePosts?.recentTimestamp;
        const videoPostRecentTimestamp =
          payload.uploads.videoPosts?.recentTimestamp;
        let imagePostPage = {} as PageResponse<any>;
        let videoPostPage = {} as PageResponse<any>;
        hasTagList.push(convertHashTagDetailsToHashTag(payload));
        if (payload.uploads.imagePosts) {
          payload.uploads.imagePosts.list?.forEach((imagePost) => {
            imagePost.hashtags?.forEach((hashTag) => {
              hasTagList.push(convertHashTagInfoToHashTag(hashTag));
            });
            imagePostIdList.push(imagePost.id);
          });
          imagePostPage = {
            id: payload.uploads.imagePosts.id,
            length: payload.uploads.imagePosts.length,
            noOfPages: payload.uploads.imagePosts.noOfPages,
            size: payload.uploads.imagePosts.size,
          };
        }
        if (payload.uploads.videoPosts) {
          payload.uploads.videoPosts.list?.forEach((videoPost) => {
            videoPostIdList.push(videoPost.id);
          });
          videoPostPage = {
            id: payload.uploads.videoPosts.id,
            length: payload.uploads.videoPosts.length,
            noOfPages: payload.uploads.videoPosts.noOfPages,
            size: payload.uploads.videoPosts.size,
          };
        }
        hashTagEntity.upsertMany(state, hasTagList);
        const hashTag = hasTagList[0];
        const metadata = state.metaDataMap[hashTag.id];
        hashTag.uploads.imagePosts = imagePostIdList;
        hashTag.uploads.videoPosts = videoPostIdList;
        metadata.uploads = {
          imagePosts: {
            page: imagePostPage,
            recentTimestamp: imagePostRecentTimestamp,
          },
          videoPosts: {
            page: videoPostPage,
            recentTimestamp: videoPostRecentTimestamp,
          },
        };
      })
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
          const hasTagList: HashTag[] = [];
          imagePosts?.list?.forEach((imagePost) => {
            imagePost.hashtags?.forEach((hashTag) => {
              hasTagList.push(convertHashTagInfoToHashTag(hashTag));
            });
          });
          hashTagEntity.upsertMany(state, hasTagList);
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
    //     const hashTagList: HashTag[] = [];

    //     list?.forEach((item) => {
    //       item.hashtags?.forEach((hashtag) => {
    //         hashTagList.push(convertHashTagInfoToHashTag(hashtag));
    //       });
    //     });

    //     hashTagEntity.upsertMany(state, hashTagList);
    //   }
    // )
    // .addCase(
    //   getImagePostDetailsThunk.fulfilled,
    //   (
    //     state,
    //     { payload: { list, category, filter, recentTimestamp, ...page } }
    //   ) => {
    //     const hashTagList: HashTag[] = [];
    //     const imagePostIdList: string[] = [];
    //     list?.forEach((item) => {
    //       item.hashtags?.forEach((hashtag) => {
    //         hashTagList.push(convertHashTagInfoToHashTag(hashtag));
    //       });
    //       imagePostIdList.push(item.id);
    //     });

    //     hashTagEntity.upsertMany(state, hashTagList);

    //     if (category === "hashtag/uploads") {
    //       const hashTag = state.entities[filter];
    //       if (hashTag) {
    //         const list = hashTag.uploads.imagePosts;
    //         list
    //           ? list.push(...imagePostIdList)
    //           : (hashTag.uploads.imagePosts = imagePostIdList);
    //       }
    //       const uploads = state.metaDataMap[filter].uploads;
    //       if (uploads) {
    //         uploads.imagePosts = {
    //           page,
    //           recentTimestamp: recentTimestamp,
    //         };
    //       } else {
    //         state.metaDataMap[filter].uploads = {
    //           imagePosts: {
    //             page,
    //             recentTimestamp: recentTimestamp,
    //           },
    //         };
    //       }
    //     }
    //   }
    // );
  },
});

export const hashTagReducer = hashTagSlice.reducer;

export const {
  selectAll: selectAllHashTags,
  selectById: selectHashTagById,
  selectEntities: selectHashTags,
  selectIds: selectHashTagIds,
  selectTotal: selectTotalHashTag,
} = hashTagEntity.getSelectors<RootState>((state) => state.hashTag);
