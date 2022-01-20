import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  convertAccountDetailsToAccount,
  convertAccountInfoToAccount,
} from "../../utility/helpers";
import {
  Account,
  AccountDetails,
  AccountInfo,
  AccountStoreMetaData,
  PageResponse,
} from "../../utility/types";
import {
  getAccountDetailsThunk,
  getAccountInfoThunk,
  getCommentInfoThunk,
  getHashTagDetailsThunk,
  getImagePostDetailsThunk,
  getImagePostFeedThunk,
  getVideoPostDetailsThunk,
  getVideoPostFeedThunk,
  getVideoPostInfoThunk,
} from "../appData/reducer";
import { RootState } from "../appStore";

const userEntity = createEntityAdapter<Account>({
  selectId: (user) => user.id as string,
});

const userSlice = createSlice({
  initialState: userEntity.getInitialState<AccountStoreMetaData>({
    metaDataMap: {},
  }),
  name: "user",
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
          const accountList: Account[] = [];

          list?.forEach((videoPost) =>
            accountList.push(convertAccountInfoToAccount(videoPost.author))
          );

          userEntity.upsertMany(state, accountList);
        }
      )
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
          const accountList: Account[] = [];
          list?.forEach((imagePost) => {
            accountList.push(convertAccountInfoToAccount(imagePost.author));
            imagePost.likes.filteredLikes?.forEach((account) =>
              accountList.push(convertAccountInfoToAccount(account))
            );
            imagePost.tags?.forEach((account) =>
              accountList.push(convertAccountInfoToAccount(account))
            );
          });
          userEntity.upsertMany(state, accountList);
        }
      )
      .addCase(
        getVideoPostInfoThunk.fulfilled,
        (
          state,
          {
            payload: { list, category, filter, recentTimestamp, ...page },
            meta: {
              arg: { initialRequest },
            },
          }
        ) => {
          const accountList: Account[] = [];
          const videoPostIdList: string[] = [];

          list?.forEach((videoPost) => {
            accountList.push(convertAccountInfoToAccount(videoPost.author));
            videoPostIdList.push(videoPost.id);
          });

          userEntity.upsertMany(state, accountList);

          const account = state.entities[filter];
          const metadata = state.metaDataMap[filter];

          if (account) {
            switch (category) {
              case "user/uploads":
                if (account.uploads) {
                  if (account.uploads.videoPosts && !initialRequest) {
                    account.uploads.videoPosts.push(...videoPostIdList);
                  } else {
                    account.uploads.videoPosts = videoPostIdList;
                  }
                } else {
                  account.uploads = { videoPosts: videoPostIdList };
                }
                if (metadata.uploads) {
                  metadata.uploads.videoPosts = { page, recentTimestamp };
                } else {
                  metadata.uploads = {
                    videoPosts: {
                      page,
                      recentTimestamp,
                    },
                  };
                }
                break;
              case "tag":
                if (account.tags) {
                  if (account.tags.videoPosts && !initialRequest) {
                    account.tags.videoPosts.push(...videoPostIdList);
                  } else {
                    account.tags.videoPosts = videoPostIdList;
                  }
                } else {
                  account.tags = { videoPosts: videoPostIdList };
                }
                if (metadata.tags) {
                  metadata.tags.videoPosts = { page, recentTimestamp };
                } else {
                  metadata.tags = {
                    videoPosts: {
                      page,
                      recentTimestamp,
                    },
                  };
                }
                break;
            }
          }
        }
      )
      .addCase(
        getImagePostDetailsThunk.fulfilled,
        (
          state,
          {
            payload: { list, category, filter, recentTimestamp, ...page },
            meta: {
              arg: { initialRequest },
            },
          }
        ) => {
          const accountList: Account[] = [];
          const imagePostIdList: string[] = [];

          list?.forEach((imagePost) => {
            accountList.push(convertAccountInfoToAccount(imagePost.author));
            imagePost.likes.filteredLikes?.forEach((account) =>
              accountList.push(convertAccountInfoToAccount(account))
            );
            imagePost.tags?.forEach((account) =>
              accountList.push(convertAccountInfoToAccount(account))
            );
            imagePostIdList.push(imagePost.id);
          });

          userEntity.upsertMany(state, accountList);

          const account = state.entities[filter];
          const metadata = state.metaDataMap[filter];

          if (account) {
            switch (category) {
              case "user/uploads":
                if (account.uploads) {
                  if (account.uploads.imagePosts && !initialRequest) {
                    account.uploads.imagePosts.push(...imagePostIdList);
                  } else {
                    account.uploads.imagePosts = imagePostIdList;
                  }
                } else {
                  account.uploads = { imagePosts: imagePostIdList };
                }
                if (metadata.uploads) {
                  metadata.uploads.imagePosts = { page, recentTimestamp };
                } else {
                  metadata.uploads = {
                    imagePosts: {
                      page,
                      recentTimestamp,
                    },
                  };
                }
                break;
              case "tag":
                if (account.tags) {
                  if (account.tags.imagePosts && !initialRequest) {
                    account.tags.imagePosts.push(...imagePostIdList);
                  } else {
                    account.tags.imagePosts = imagePostIdList;
                  }
                } else {
                  account.tags = { imagePosts: imagePostIdList };
                }
                if (metadata.tags) {
                  metadata.tags.imagePosts = { page, recentTimestamp };
                } else {
                  metadata.tags = {
                    imagePosts: {
                      page,
                      recentTimestamp,
                    },
                  };
                }
                break;
            }
          }
        }
      )
      .addCase(
        getAccountInfoThunk.fulfilled,
        (
          state,
          {
            payload: { list, category, filter, recentTimestamp, ...page },
            meta: {
              arg: { initialRequest },
            },
          }
        ) => {
          const accountList: Account[] = [];
          const accountIdList: string[] = [];

          list?.forEach((account) => {
            accountList.push(convertAccountInfoToAccount(account));
            accountIdList.push(account.id);
          });

          userEntity.upsertMany(state, accountList);

          const account = state.entities[filter];
          const metadata = state.metaDataMap[filter];
          if (account) {
            switch (category) {
              case "user/followers":
                if (account.followers.ids && !initialRequest) {
                  account.followers.ids.push(...accountIdList);
                } else {
                  account.followers.ids = accountIdList;
                }
                metadata.followers = { page, recentTimestamp };
                break;
              case "user/followings":
                if (account.followings.ids && !initialRequest) {
                  account.followings.ids.push(...accountIdList);
                } else {
                  account.followings.ids = accountIdList;
                }
                metadata.followings = { page, recentTimestamp };
                break;
            }
          }
        }
      )
      .addCase(getVideoPostDetailsThunk.fulfilled, (state, { payload }) => {
        const accountList: Account[] = [];
        accountList.push(convertAccountInfoToAccount(payload.author));
        payload.likes.filteredLikes?.forEach((account) =>
          accountList.push(convertAccountInfoToAccount(account))
        );
        payload.tags?.forEach((account) =>
          accountList.push(convertAccountInfoToAccount(account))
        );
        userEntity.upsertMany(state, accountList);
      })
      .addCase(
        getHashTagDetailsThunk.fulfilled,
        (
          state,
          {
            payload: {
              uploads: { imagePosts, videoPosts },
            },
          }
        ) => {
          const accountList: Account[] = [];
          if (imagePosts) {
            imagePosts.list?.forEach((imagePost) => {
              accountList.push(convertAccountInfoToAccount(imagePost.author));
              imagePost.likes.filteredLikes?.forEach((account) =>
                accountList.push(convertAccountInfoToAccount(account))
              );
            });
          }
          if (videoPosts) {
            videoPosts.list?.forEach((videoPost) => {
              accountList.push(convertAccountInfoToAccount(videoPost.author));
            });
          }
          userEntity.upsertMany(state, accountList);
        }
      )
      .addCase(getAccountDetailsThunk.fulfilled, (state, { payload }) => {
        const accountList: Account[] = [];
        const imagePostIdList: string[] = [];
        const videoPostIdList: string[] = [];
        const imagePostRecentTimestamp =
          payload.uploads.imagePosts?.recentTimestamp;
        const videoPostRecentTimestamp =
          payload.uploads.videoPosts?.recentTimestamp;
        let imagePostPage = {} as PageResponse<any>;
        let videoPostPage = {} as PageResponse<any>;
        accountList.push(convertAccountDetailsToAccount(payload));
        payload.followers.filteredFollowers?.forEach((account) =>
          accountList.push(convertAccountInfoToAccount(account))
        );
        if (payload.uploads.imagePosts) {
          payload.uploads.imagePosts.list?.forEach((imagePost) => {
            imagePostIdList.push(imagePost.id);
            accountList.push(convertAccountInfoToAccount(imagePost.author));
            imagePost.likes.filteredLikes?.forEach((account) =>
              accountList.push(convertAccountInfoToAccount(account))
            );
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
            accountList.push(convertAccountInfoToAccount(videoPost.author));
          });
          videoPostPage = {
            id: payload.uploads.videoPosts.id,
            length: payload.uploads.videoPosts.length,
            noOfPages: payload.uploads.videoPosts.noOfPages,
            size: payload.uploads.videoPosts.size,
          };
        }
        userEntity.upsertMany(state, accountList);
        const account = accountList[0];
        if (account.uploads) {
          account.uploads.imagePosts = imagePostIdList;
          account.uploads.videoPosts = videoPostIdList;
        }
        const metadata = state.metaDataMap[account.id];
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
        getCommentInfoThunk.fulfilled,
        (
          state,
          {
            meta: {
              arg: { initialRequest },
            },
            payload: { list },
          }
        ) => {
          const accountList: Account[] = [];
          list?.forEach((comment) => {
            accountList.push(convertAccountInfoToAccount(comment.author));
            userEntity.upsertMany(state, accountList);
          });
        }
      );
  },
});

export const userReducer = userSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectEntities: selectUsers,
  selectIds: selectUserIds,
  selectTotal: selectTotalUsers,
} = userEntity.getSelectors<RootState>((state) => state.user);
