import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../appStore";

export const selectShutterConfig = createDraftSafeSelector<
  [(state: RootState) => RootState["appData"]["appConfig"]["shutterConfig"]],
  RootState["appData"]["appConfig"]["shutterConfig"]
>(
  (state) => state.appData.appConfig.shutterConfig,
  (config) => config
);

export const selectProfilePictureUri = createDraftSafeSelector<
  [(state: RootState) => string],
  string
>(
  (state) => state.appData.userDetails.profilePictureDataUri,
  (uri) => uri
);

export const selectUserId = createDraftSafeSelector<
  [(state: RootState) => string],
  string
>(
  (state) => state.appData.userDetails.id,
  (id) => id
);
