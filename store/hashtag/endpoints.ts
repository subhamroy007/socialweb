import {
  ApiResponse,
  DataCategory,
  HashTagLongResponse,
  ListResponseMetaData,
} from "../../utility/types";
import { appEndPoint } from "../appEndPoint";

const hashTagEndPoint = appEndPoint.injectEndpoints({
  endpoints: (build) => ({
    getTrendingHashTags: build.query<
      ApiResponse<
        ListResponseMetaData<DataCategory>,
        { list: HashTagLongResponse[] }
      >,
      { userId: string; pageId?: number; genre?: string }
    >({
      query: ({ userId, genre, pageId }) => ({
        url:
          "hashtags/trending?userid=" +
          userId +
          (genre ? "&genre=" + genre : "") +
          (pageId ? "&pageid=" + pageId : ""),
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "hashtag", id: "LIST/FEED" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetTrendingHashTagsQuery } = hashTagEndPoint;
