import {
  ApiResponse,
  CommentResponse,
  ListResponseMetaData,
  PostType,
} from "../../utility/types";
import { appEndPoint } from "../appEndPoint";

const commentEndPoint = appEndPoint.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<
      ApiResponse<
        ListResponseMetaData<PostType>,
        { list: CommentResponse[]; count: number }
      >,
      { userId: string; pageId: number; id: string; type: PostType }
    >({
      query: ({ userId, pageId, id, type }) => ({
        url:
          "comments/" +
          (type === "image-post" ? "imagepost" : "videopost") +
          "?userid=" +
          userId +
          "&id=" +
          id +
          "&pageid=" +
          pageId,
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "video", id: "LIST/FEED" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCommentsQuery } = commentEndPoint;
