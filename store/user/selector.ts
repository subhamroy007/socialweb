import { selectUserById } from "./slice";
import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const selectUserSocialId = createDraftSafeSelector<
  [typeof selectUserById],
  string | undefined
>(selectUserById, (user) => user?.socialId);

export const selectUserUsername = createDraftSafeSelector<
  [typeof selectUserById],
  string | undefined
>(selectUserById, (user) => user?.username);

export const selectUserProfilePictureUrl = createDraftSafeSelector<
  [typeof selectUserById],
  string | undefined
>(selectUserById, (user) => user?.profilePictureUri);
