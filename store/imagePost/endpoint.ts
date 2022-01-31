import {
  AccountWithTimestampResponse,
  ApiResponse,
  FeedData,
  FeedMeta,
  ImagePostResponse,
  ListResponseMetaData,
  PostType,
} from "../../utility/types";
import { appEndPoint } from "../appEndPoint";

const imagePostEndPoint = appEndPoint.injectEndpoints({
  endpoints: (build) => ({
    getImagePostFeedData: build.query<
      ApiResponse<FeedMeta, FeedData<ImagePostResponse>>,
      { userId: string; pageId?: number; keyword?: string }
    >({
      query: ({ userId, keyword, pageId }) => ({
        url:
          "images/feed?userid=" +
          userId +
          (keyword ? "&keyword=" + keyword : "") +
          (pageId ? "&pageid=" + pageId : ""),
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "image", id: "LIST/FEED" }],
    }),
    getImagePostLikes: build.query<
      ApiResponse<
        ListResponseMetaData<PostType>,
        { list: AccountWithTimestampResponse[]; count: number }
      >,
      {
        userId: string;
        pageId: number;
        id: string;
        type: PostType;
        query?: string;
      }
    >({
      query: ({ userId, pageId, id, type, query }) => ({
        url:
          "likes/" +
          (type === "image-post" ? "imagepost" : "videopost") +
          "?userid=" +
          userId +
          "&id=" +
          id +
          "&pageid=" +
          pageId +
          (query ? "&query=" + query : ""),
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "account", id: "LIST/LIKES" }],
    }),
    getImagePostShares: build.query<
      ApiResponse<
        ListResponseMetaData<PostType>,
        { list: AccountWithTimestampResponse[]; count: number }
      >,
      {
        userId: string;
        pageId: number;
        id: string;
        type: PostType;
        query?: string;
      }
    >({
      query: ({ userId, pageId, id, type, query }) => ({
        url:
          "shares/" +
          (type === "image-post" ? "imagepost" : "videopost") +
          "?userid=" +
          userId +
          "&id=" +
          id +
          "&pageid=" +
          pageId +
          (query ? "&query=" + query : ""),
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "account", id: "LIST/LIKES" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetImagePostFeedDataQuery,
  useGetImagePostLikesQuery,
  useGetImagePostSharesQuery,
} = imagePostEndPoint;
