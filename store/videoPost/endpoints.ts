import {
  ApiResponse,
  FeedData,
  FeedMeta,
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
  }),
  overrideExisting: true,
});

export const { useGetVideoPostFeedDataQuery } = videoPostEndPoint;
