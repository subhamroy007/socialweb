import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { selectHashTagById } from "./slice";

export const selectHashTagName = createDraftSafeSelector<
  [typeof selectHashTagById],
  string | undefined
>(selectHashTagById, (hashTag) => hashTag?.name);

export const selectHashTagUploadsCount = createDraftSafeSelector<
  [typeof selectHashTagById],
  number | undefined
>(selectHashTagById, (hashTag) => hashTag?.uploads?.count);
