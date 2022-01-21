import { convertImagePostDetailsToImagePost } from "../../utility/helpers";
import {
  ApiResponse,
  FeedData,
  FeedMeta,
  ImagePost,
  ImagePostDetails,
  ImagePostResponse,
} from "../../utility/types";
import { appEndPoint } from "../appEndPoint";

const imagePostEndPoint = appEndPoint.injectEndpoints({
  endpoints: (build) => ({
    getImagePostFeedData: build.query<
      ApiResponse<FeedMeta, FeedData<ImagePostResponse>>,
      { userId: string }
    >({
      query: ({ userId }) => ({ url: "images/feed?userid=" + userId }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "image", id: "LIST/FEED" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetImagePostFeedDataQuery } = imagePostEndPoint;
