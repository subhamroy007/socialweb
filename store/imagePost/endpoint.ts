import {
  AccountWithTimestampResponse,
  ApiResponse,
  DataCategory,
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
    getTrendingImages: build.query<
      ApiResponse<
        ListResponseMetaData<DataCategory>,
        { list: ImagePostResponse[] }
      >,
      { userId: string; pageId?: number; genre?: string }
    >({
      query: ({ userId, genre, pageId }) => ({
        url:
          "images/trending?userid=" +
          userId +
          (genre ? "&genre=" + genre : "") +
          (pageId ? "&pageid=" + pageId : ""),
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "image", id: "LIST/TREND" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetImagePostFeedDataQuery, useGetTrendingImagesQuery } =
  imagePostEndPoint;
