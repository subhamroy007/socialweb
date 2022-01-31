import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./appStore";

export const appEndPoint = createApi({
  reducerPath: "endpoint",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "omit",
    cache: "no-store",
    keepalive: true,
    prepareHeaders: (headers, { getState }) => {
      const userInfo = (getState() as RootState).appData.userDetails;
      headers.set("user-id", userInfo.id);
      headers.set("auth-token", userInfo.authToken);
      headers.set("refresh-token", userInfo.refreshToken);
      return headers;
    },
  }),
  endpoints: (build) => ({}),
  tagTypes: ["image", "video", "account", "reply", "comment", "hashtag"],
});
