import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Reply, ReplyStoreMetaData } from "../../utility/types";
import { RootState } from "../appStore";

const replyEntity = createEntityAdapter<Reply>({
  selectId: (reply) => reply.id,
  sortComparer: (reply1, reply2) => reply1.timestamp - reply2.timestamp,
});

const replySlice = createSlice({
  initialState: replyEntity.getInitialState<ReplyStoreMetaData>({
    metaDataMap: {},
  }),
  name: "reply",
  reducers: {},
  extraReducers: {},
});

export const replyReducer = replySlice.reducer;

export const {
  selectAll: selectAllReplies,
  selectById: selectReplyById,
  selectEntities: selectReplies,
  selectIds: selectReplyIds,
  selectTotal: selectTotalReplies,
} = replyEntity.getSelectors<RootState>((state) => state.reply);
