import {
  ApiResponse,
  CommentResponse,
  ListResponseMetaData,
  ReplyResponse,
} from "../../utility/types";
import { appEndPoint } from "../appEndPoint";

const replyEndPoint = appEndPoint.injectEndpoints({
  endpoints: (build) => ({
    getReplys: build.query<
      ApiResponse<
        ListResponseMetaData<"comment">,
        { list: ReplyResponse[]; count?: number; comment?: CommentResponse }
      >,
      { userId: string; pageId: number; id: string }
    >({
      query: ({ userId, pageId, id }) => ({
        url:
          "replys/" + "?userid=" + userId + "&id=" + id + "&pageid=" + pageId,
      }),
      keepUnusedDataFor: 30,
      providesTags: [{ type: "reply", id: "LIST/REPLY" }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetReplysQuery } = replyEndPoint;
