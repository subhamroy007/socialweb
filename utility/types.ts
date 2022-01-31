import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
import { ReactElement, ReactNode } from "react";
import { Animated, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ImageStyle, ResizeMode, Source } from "react-native-fast-image";
import {
  GestureEvent,
  HandlerStateChangeEvent,
  PanGestureHandlerEventPayload,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { AppDispatch, RootState } from "../store/appStore";

//-------------------------------------------component-prop-types-----------------------------------------------
export interface IconProps {
  //optional action associated to the icon
  onTap?: (
    event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
  //name of the icon
  name: string;
  //size of the icon in pixels
  size?: number;
  //color of the icon
  color?: string;
  //optional style prop
  style?: StyleProp<ViewStyle>;
}
export interface PostHeaderProps {
  id: string;
  postType: "image" | "video";
}

export interface TabListProps {
  width: number;
  height: number;
  tabNames: string[];
  children: (
    tab: string,
    index: number,
    width: number,
    height: number
  ) => ReactNode;
  focusedIndex?: number;
  onIndexChange?: (index: number) => void;
}

export interface LazyLoadingContainerProps {
  children: ReactNode;
  preload?: boolean;
  width: number;
  height: number;
}

export interface InfoProps {
  pictureSize?: number;
  gapSize?: number;
  textSize?: number;
  name: string;
  children: (style: StyleProp<TextStyle>) => ReactElement<any>;
  style?: StyleProp<ViewStyle>;
  secondaryText?: string;
  type: "user" | "other";
}
export interface HighlightedItemProps {
  text: string;
  size?: number;
  onTap?: () => void;
  style?: StyleProp<TextStyle>;
  type?: "outline" | "solid";
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  color?: string;
  borderRadius?: number;
}
export interface TabBarProps {
  children: ReactElement<any>[];
  animatedValue: Animated.AnimatedInterpolation;
  style?: StyleProp<ViewStyle>;
}
export interface ImageGalleryItemProps {
  width: number;
  height: number;
  id: string;
  style?: StyleProp<ViewStyle>;
}
export interface RoundedIconProps extends IconProps {
  //drag handler
  onDrag?: (event: GestureEvent<PanGestureHandlerEventPayload>) => void;
  //optinal scale prop for the icon
  scale?: number;
  backgroundColor?: string;
  type?: "solid" | "outline";
  borderColor?: string;
  borderWidth?: number;
}
export interface TabBarItemProps {
  index: number;
  activeIconName: string;
  activeIconColor: string;
  activeIconSize: number;
  inActiveIconName: string;
  inActiveIconColor: string;
  inActiveIconSize: number;
  animatedValue: Animated.AnimatedInterpolation;
}

export interface ListProps {
  ids?: string[];
  dataState?: TaskState;
  headerComponent?: ReactElement<any>;
  onEndReach?: () => void;
  extraData?: {};
}

export interface GalleryItemProps {
  url: string;
  resizeMode: ResizeMode;
  width: number;
  height: number;
}

export interface HeaderProps {
  leftSideComponent?: ReactNode;
  rightSideComponent?: ReactNode;
  hasSeparator?: boolean;
  style?: StyleProp<ViewStyle>;
}
export interface ItemSeparatorProps {
  axis: "horizontal" | "vertical";
  length: number;
  style?: StyleProp<ViewStyle>;
}

export interface BottomTabScreenHeaderProps extends HeaderProps {
  headerProps: BottomTabHeaderProps;
}

export interface StackScreenHeaderProps extends HeaderProps {
  headerProps: StackHeaderProps;
}

//-------------------------------------------------------------------------------------------------------------

//------------------------------------------------store-types-----------------------------------------------
export type TaskState = "success" | "loading" | "failure";

export type VideoGenre =
  | "all"
  | "sports"
  | "educational"
  | "comedy"
  | "action"
  | "thriller";
export type ImageGenre =
  | "all"
  | "selfie"
  | "travel"
  | "food"
  | "nature"
  | "animals";
export type HashTagGenre = ImageGenre | VideoGenre;

export interface AppError {
  code: number;
  message: string;
  reasons?: {
    [key: string]: string;
  };
}

export type PostType = "image-post" | "video-post";

export interface AppData {
  userDetails: {
    id: string;
    authToken: string;
    refreshToken: string;
    profilePictureDataUri: string;
  };
  appConfig: {
    shutterConfig: (keyof RootTabNavigatorParamList)[];
  };
}

export type ThunkRequestConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: unknown;
  rejectValue: AppError;
  serializedErrorType: unknown;
  pendingMeta: unknown;
  fulfilledMeta: {};
  rejectedMeta: undefined;
};

export interface BoxUtil {
  width: number;
  height: number;
}

export interface ImageConfig extends BoxUtil {
  resizeMode: ResizeMode;
}

export interface Size {
  original: number;
  min: number;
  max: number;
}
export interface PageResponse<T> {
  id: number;
  size: number;
  length: number;
  noOfPages: number;
  list?: T[];
}
export interface Id {
  id: string;
}

export interface Link {
  title: string;
  uri: string;
  icon: string;
}
export interface MediaInfo extends BoxUtil {
  uri: string;
}

//---------------------------------------------navigation-types-------------------------------------------
export type UtilityStackNavigatorParamList = {
  OthersProfileScreen: Id;
  SearchResultScreen: NavigatorScreenParams<SearchScreenNavigationParamList>;
};

export type TrendingScreenNavigatorParamList = {
  TrendingHashTagScreen: undefined;
  TrendingImageScreen: undefined;
  TrendingVideoScreen: undefined;
};

export type SavedScreenNavigatorParamList = {
  SavedHashTagScreen: undefined;
  SavedImagePostScreen: undefined;
  SavedVideoPostScreen: undefined;
};

export type RootTabNavigatorParamList = {
  ImageFeedScreen: undefined;
  VideoFeedScreen: undefined;
  ProfileScreen: undefined;
  TrendingScreen: undefined;
  NotificationScreen: undefined;
  SavedScreen: undefined;
  SettingsScreen: undefined;
  Stacks: NavigatorScreenParams<UtilityStackNavigatorParamList>;
};

export type FollowerFollowingNavigatorParamList = {
  FollowerScreen: Id;
  FollowingScreen: Id;
};

export type RootStackNavigatorParamList = {
  Tabs: NavigatorScreenParams<RootTabNavigatorParamList>;
  LiveScreen: undefined;
  StoryFeedScreen: undefined;
  PostEngagementScreen: {
    id: string;
    type: PostType;
    initialTabIndex: number;
  };
  OverlayScreen: undefined;
  VideoPreviewScreen: { id: string };
  VideoPostScreen: { id: string };
  FollowerFollowingStack: NavigatorScreenParams<FollowerFollowingNavigatorParamList>;
};

export type SearchScreenNavigationParamList = {
  SearchedImagePost: undefined;
  SearchedVideoPost: undefined;
  SearchedHashTag: undefined;
  SearchedAccount: undefined;
};

export type DataCategory =
  | "feed"
  | "trend"
  | "search"
  | "save"
  | "tag"
  | "user/uploads"
  | "hashtag/uploads"
  | "imagePost/comment"
  | "videoPost/comment"
  | "comment/reply";

export type HashTagCategory = "trend" | "search" | "save";

export type AccountCategory =
  | "search"
  | "hashtag/saves"
  | "user/followings"
  | "user/followers";

export interface PageRequestParamList<T> {
  category: T;
  pageId: number;
  filter: string;
  recentTimestamp: number;
}

export interface PageResponseParamList<T, U> extends PageResponse<T> {
  category: U;
  filter: string;
  recentTimestamp: number;
}

export interface PageDataThunkParamList<T> {
  initialRequest: boolean;
  filter: string;
  category: T;
}

export type PostEngagementNavigatorParamList = {
  CommentScreen: { type: PostType } & Id;
  LikeScreen: { type: PostType } & Id;
  ShareScreen: { type: PostType } & Id;
};

//---------------------------------------------api-types----------------------------------------

export interface ApiResponse<T, U> {
  meta: T;
  data: U;
}

export type ResponseType =
  | "image-post"
  | "video-post"
  | "hashtag"
  | "account"
  | "comment"
  | "reply";

export type PostCategory =
  | "feed"
  | "account/tags"
  | "account/uploads"
  | "trending"
  | "account/saved"
  | "searched"
  | "hashtag/uploads";

export interface ListResponseMetaData<T> {
  page: PageResponse<any>;
  type: ResponseType;
  category: T;
  params: { [key: string]: string };
}

export type DataType =
  | "image"
  | "video"
  | "hashtag"
  | "account"
  | "comment"
  | "reply";

export interface FeedMeta {
  keywords?: string[];
  page: PageResponse<any>;
  type: DataType;
  category: DataCategory;
  filter: {
    [key: string]: string;
  };
}

export interface FeedData<T> {
  list: T[];
}

export interface AccountShortResponse {
  id: string;
  socialId: string;
  profilePictureUri: string;
}

export interface AccountMediumResponse extends AccountShortResponse {
  username: string;
  isFollowing: boolean;
  isFollower: boolean;
  noOfFollowers: number;
  hasUnSeenStroy: boolean;
}

export interface AccountWithTimestampResponse extends AccountMediumResponse {
  timestamp: number;
}

export interface HashTagShortResponse {
  id: string;
  name: string;
}

export interface ImagePostResponse {
  id: string;
  timestamp: number;
  author: AccountMediumResponse;
  images: MediaInfo[];
  caption: string | null;
  genre: ImageGenre;
  hasSaved: boolean;
  likes: {
    noOfLikes: number;
    hasLiked: boolean;
    filteredLikes: AccountShortResponse[] | null;
  };
  noOfComments: number;
  noOfShares: number;
  hashtags: HashTagShortResponse[] | null;
  tags: AccountShortResponse[] | null;
}

export interface VideoThumbnailResponse {
  id: string;
  timestamp: number;
  author: AccountMediumResponse;
  thumbnail: MediaInfo;
  duration: number;
  watchtime: number;
  noOfViews: number;
  noOfLikes: number;
  title: string;
}

export interface ReplyResponse {
  id: string;
  timestamp: number;
  author: AccountShortResponse;
  content: string;
  noOfLikes: number;
  hasLiked: boolean;
}

export interface CommentResponse extends ReplyResponse {
  noOfReplies: number;
}

export interface ImagePostOverlayProps extends BoxUtil {
  noOfLikes: number;
  noOfComments: number;
  noOfShares: number;
  filteredLikes: AccountShortResponse[] | null;
  genre: ImageGenre;
  tags: AccountShortResponse[] | null;
}

export interface ImagePostControlsProps extends Id {
  hasLiked: boolean;
  hasSaved: boolean;
}

export interface ImagePostBodyProps {
  images: MediaInfo[];
  noOfLikes: number;
  noOfComments: number;
  noOfShares: number;
  filteredLikes: AccountShortResponse[] | null;
  genre: ImageGenre;
  tags: AccountShortResponse[] | null;
}

export interface AvatarProps {
  profilePictureUri: string;
  size?: number;
  hasUnSeenStroy?: boolean;
  style?: StyleProp<ViewStyle>;
  showOutline?: boolean;
}
