import {
  delay,
  generateAccountDetails,
  generateHashTagDetails,
  generateKeyWords,
  generatePaginatedAccountInfo,
  generatePaginatedCommentInfo,
  generatePaginatedHashTagInfo,
  generatePaginatedImagePostDetails,
  generatePaginatedImagePostInfo,
  generatePaginatedReplyInfo,
  generatePaginatedVideoPostInfo,
  genererateVideoPostDetails,
} from "./helpers";
import {
  AccountCategory,
  AccountDetails,
  AccountInfo,
  AllDataResponseParamList,
  AllPostResponseParamList,
  AppError,
  CommentInfo,
  DataCategory,
  FeedResponseParamList,
  HashTagCategory,
  HashTagDetails,
  HashTagInfo,
  Id,
  ImagePostDetails,
  ImagePostInfo,
  PageRequestParamList,
  PageResponseParamList,
  PostType,
  ReplyInfo,
  VideoPostDetails,
  VideoPostInfo,
} from "./types";

export const getHashTagInfo = async ({
  category,
  filter,
  pageId,
  recentTimestamp,
}: PageRequestParamList<HashTagCategory>): Promise<
  PageResponseParamList<HashTagInfo, HashTagCategory>
> => {
  try {
    const hashtags = generatePaginatedHashTagInfo(pageId);
    await delay(3000);
    return {
      category,
      filter,
      recentTimestamp,
      ...hashtags,
    };
  } catch (e: any) {
    console.log("something went wrong while fectching hashtags " + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getImagePostInfo = async ({
  category,
  filter,
  pageId,
  recentTimestamp,
}: PageRequestParamList<DataCategory>): Promise<
  PageResponseParamList<ImagePostInfo, DataCategory>
> => {
  try {
    const imagePosts = generatePaginatedImagePostInfo(pageId);
    await delay(3000);
    return {
      category,
      filter,
      recentTimestamp,
      ...imagePosts,
    };
  } catch (e: any) {
    console.log("something went wrong while fectching image posts" + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getAccountInfo = async ({
  category,
  filter,
  pageId,
  recentTimestamp,
}: PageRequestParamList<AccountCategory>): Promise<
  PageResponseParamList<AccountInfo, AccountCategory>
> => {
  try {
    const accounts = generatePaginatedAccountInfo(pageId);
    await delay(3000);
    return {
      category,
      filter,
      recentTimestamp,
      ...accounts,
    };
  } catch (e: any) {
    console.log("something went wrong while fectching accounts " + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getImagePostDetails = async ({
  category,
  filter,
  pageId,
  recentTimestamp,
}: PageRequestParamList<DataCategory>): Promise<
  PageResponseParamList<ImagePostDetails, DataCategory>
> => {
  try {
    const imagePosts = generatePaginatedImagePostDetails(pageId);
    await delay(3000);
    return {
      category,
      filter,
      recentTimestamp,
      ...imagePosts,
    };
  } catch (e: any) {
    console.log("something went wrong while fectching image posts" + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getVideoPostInfo = async ({
  category,
  filter,
  pageId,
  recentTimestamp,
}: PageRequestParamList<DataCategory>): Promise<
  PageResponseParamList<VideoPostInfo, DataCategory>
> => {
  try {
    const videoPosts = generatePaginatedVideoPostInfo(pageId);
    await delay(3000);
    return {
      category,
      filter,
      recentTimestamp,
      ...videoPosts,
    };
  } catch (e: any) {
    console.log("something went wrong while fectching video posts" + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getVideoPostDetails = async ({
  id,
}: Id): Promise<VideoPostDetails> => {
  try {
    const videoPost = genererateVideoPostDetails();
    videoPost.id = id;
    await delay(3000);
    return videoPost;
  } catch (e: any) {
    console.log("something went wrong while fectching video post" + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getHashTagDetails = async ({
  id,
}: Id): Promise<HashTagDetails> => {
  try {
    const hashtag = generateHashTagDetails();
    hashtag.id = id;
    await delay(3000);
    return hashtag;
  } catch (e: any) {
    console.log("something went wrong while fetching hashtag details" + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getAccountDetails = async ({
  id,
}: Id): Promise<AccountDetails> => {
  try {
    const account = generateAccountDetails();
    account.id = id;
    await delay(3000);
    return account;
  } catch (e: any) {
    console.log("something went wrong while fetching account details" + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getImagePostFeed = async (): Promise<
  FeedResponseParamList<ImagePostDetails, DataCategory>
> => {
  try {
    const imagePosts = generatePaginatedImagePostDetails();
    await delay(3000);
    return {
      feed: {
        category: "feed",
        filter: "all",
        recentTimestamp: Date.now(),
        ...imagePosts,
      },
      keywords: generateKeyWords(),
    };
  } catch (e: any) {
    console.log("something went wrong while fetching image feed " + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getVideoPostFeed = async (): Promise<
  FeedResponseParamList<VideoPostInfo, DataCategory>
> => {
  try {
    const videoPosts = generatePaginatedVideoPostInfo();

    return {
      feed: {
        category: "feed",
        filter: "all",
        recentTimestamp: Date.now(),
        ...videoPosts,
      },
      keywords: generateKeyWords(),
    };
  } catch (e: any) {
    console.log("something went wrong while fetching video feed " + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getTrendingResponse =
  async (): Promise<AllDataResponseParamList> => {
    try {
      const videoPosts = generatePaginatedVideoPostInfo();
      const imagePosts = generatePaginatedImagePostDetails();
      const hashTags = generatePaginatedHashTagInfo();
      return {
        hashTags: {
          category: "trend",
          filter: "all",
          recentTimestamp: Date.now(),
          ...hashTags,
        },
        imagePosts: {
          category: "trend",
          filter: "all",
          recentTimestamp: Date.now(),
          ...imagePosts,
        },
        videoPosts: {
          category: "trend",
          filter: "all",
          recentTimestamp: Date.now(),
          ...videoPosts,
        },
      };
    } catch (e: any) {
      console.log("something went wrong while fetching trending response " + e);
      const error: AppError = {
        code: 1000,
        message: "network error",
      };
      throw error;
    }
  };

export const getTaggedPostResponse = async ({
  id,
}: Id): Promise<AllPostResponseParamList> => {
  try {
    const videoPosts = generatePaginatedVideoPostInfo();
    const imagePosts = generatePaginatedImagePostDetails();
    return {
      imagePosts: {
        category: "tag",
        filter: id,
        recentTimestamp: Date.now(),
        ...imagePosts,
      },
      videoPosts: {
        category: "tag",
        filter: id,
        recentTimestamp: Date.now(),
        ...videoPosts,
      },
    };
  } catch (e: any) {
    console.log(
      "something went wrong while fetching tagged post response " + e
    );
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getSavedResponse = async (): Promise<AllDataResponseParamList> => {
  try {
    const videoPosts = generatePaginatedVideoPostInfo();
    const imagePosts = generatePaginatedImagePostDetails();
    const hashTags = generatePaginatedHashTagInfo();
    return {
      hashTags: {
        category: "save",
        filter: "",
        recentTimestamp: Date.now(),
        ...hashTags,
      },
      imagePosts: {
        category: "save",
        filter: "",
        recentTimestamp: Date.now(),
        ...imagePosts,
      },
      videoPosts: {
        category: "save",
        filter: "",
        recentTimestamp: Date.now(),
        ...videoPosts,
      },
    };
  } catch (e: any) {
    console.log("something went wrong while fetching saved response " + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getCommentInfo = async ({
  category,
  filter,
  pageId,
  recentTimestamp,
}: PageRequestParamList<PostType>): Promise<
  PageResponseParamList<CommentInfo, PostType>
> => {
  try {
    const comments = generatePaginatedCommentInfo(pageId);

    return {
      category,
      filter,
      recentTimestamp,
      ...comments,
    };
  } catch (e: any) {
    console.log("something went wrong while fetching comments " + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};

export const getReplyInfo = async ({
  category,
  filter,
  pageId,
  recentTimestamp,
}: PageRequestParamList<PostType>): Promise<
  PageResponseParamList<ReplyInfo, PostType>
> => {
  try {
    const replies = generatePaginatedReplyInfo(pageId);

    return {
      category,
      filter,
      recentTimestamp,
      ...replies,
    };
  } catch (e: any) {
    console.log("something went wrong while fetching replies " + e);
    const error: AppError = {
      code: 1000,
      message: "network error",
    };
    throw error;
  }
};
