import {
  ApiResponse,
  DataCategory,
  FeedData,
  FeedMeta,
  ListResponseMetaData,
  VideoThumbnailResponse,
} from "../../utility/types";
import { appEndPoint } from "../appEndPoint";

const videoPostEndPoint = appEndPoint.injectEndpoints({
  endpoints: (build) => ({
    getVideoPostFeedData: build.query<
      ApiResponse<FeedMeta, FeedData<VideoThumbnailResponse>>,
      { userId: string; pageId?: number; keyword?: string }
    >({
      query: ({ userId, keyword, pageId }) => ({
        url:
          "videos/feed?userid=" +
          userId +
          (keyword ? "&keyword=" + keyword : "") +
          (pageId ? "&pageid=" + pageId : ""),
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "video", id: "LIST/FEED" }],
    }),
    getTrendingVideos: build.query<
      ApiResponse<
        ListResponseMetaData<DataCategory>,
        { list: VideoThumbnailResponse[] }
      >,
      { userId: string; pageId?: number; genre?: string }
    >({
      query: ({ userId, genre, pageId }) => ({
        url:
          "videos/trending?userid=" +
          userId +
          (genre ? "&genre=" + genre : "") +
          (pageId ? "&pageid=" + pageId : ""),
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "video", id: "LIST/TREND" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetVideoPostFeedDataQuery, useGetTrendingVideosQuery } =
  videoPostEndPoint;
