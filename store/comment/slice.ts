import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { convertCommentinfoToComment } from "../../utility/helpers";
import { Comment, CommentStoreMetaData } from "../../utility/types";
import { getCommentInfoThunk } from "../appData/reducer";
import { RootState } from "../appStore";

const commentEntity = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
  sortComparer: (comment1, comment2) => comment1.timestamp - comment2.timestamp,
});

const commentSlice = createSlice({
  initialState: commentEntity.getInitialState<CommentStoreMetaData>({
    metaDataMap: {},
  }),
  name: "comment",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCommentInfoThunk.fulfilled,
      (state, { payload: { list } }) => {
        const comments: Comment[] = [];

        list?.forEach((comment) =>
          comments.push(convertCommentinfoToComment(comment))
        );

        commentEntity.upsertMany(state, comments);
      }
    );
  },
});

export const commentReducer = commentSlice.reducer;

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectEntities: selectComments,
  selectIds: selectCommentIds,
  selectTotal: selectTotalComments,
} = commentEntity.getSelectors<RootState>((state) => state.comment);
