import { convertImagePostDetailsToImagePost } from "../../utility/helpers";
import {
  ApiResponse,
  FeedData,
  FeedMeta,
  ImagePost,
  ImagePostDetails,
} from "../../utility/types";
import { appEndPoint } from "../appEndPoint";

const imagePostEndPoint = appEndPoint.injectEndpoints({
  endpoints: (build) => ({
    getImagePostFeedData: build.query<
      ApiResponse<FeedMeta, FeedData<ImagePost>>,
      { userId: string }
    >({
      query: ({ userId }) => ({ url: "images/feed?userid=" + userId }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "image", id: "LIST/FEED" }],
      transformResponse: (
        result: ApiResponse<FeedMeta, FeedData<ImagePostDetails>>
      ) => {
        const list: ImagePost[] = [];

        result.data.list.forEach((item) =>
          list.push(convertImagePostDetailsToImagePost(item))
        );

        return {
          meta: result.meta,
          data: {
            list,
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetImagePostFeedDataQuery } = imagePostEndPoint;
