import {
  AccountMediumResponse,
  ApiResponse,
  ListResponseMetaData,
  PostType,
} from "../../utility/types";
import { appEndPoint } from "../appEndPoint";

const accountEndPoint = appEndPoint.injectEndpoints({
  endpoints: (build) => ({
    getLikes: build.query<
      ApiResponse<
        ListResponseMetaData<PostType | "comment" | "reply">,
        { list: AccountMediumResponse[]; count?: number }
      >,
      {
        userId: string;
        pageId: number;
        id: string;
        type: PostType | "comment" | "reply";
        query?: string;
      }
    >({
      query: ({ userId, pageId, id, type, query }) => ({
        url:
          "likes/" +
          type +
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
    getShares: build.query<
      ApiResponse<
        ListResponseMetaData<PostType>,
        { list: AccountMediumResponse[]; count?: number }
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
          type +
          "?userid=" +
          userId +
          "&id=" +
          id +
          "&pageid=" +
          pageId +
          (query ? "&query=" + query : ""),
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "account", id: "LIST/SHARES" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetLikesQuery, useGetSharesQuery } = accountEndPoint;
