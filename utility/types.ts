import { NavigatorScreenParams } from "@react-navigation/native";
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
export interface AvatarProps {
  id: string;
  showStoryIndicator?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
}
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
  type: "outline" | "solid";
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
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
export interface PlaceHolderProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  size?: number;
  gapLeft?: number | string;
  gapRight?: number | string;
  gapTop?: number | string;
  gapBottom?: number | string;
  gapHorizontal?: number | string;
  gapVertical?: number | string;
  gap?: number | string;
  alignment?: "flex-start" | "flex-end" | "center" | "stretch";
}
export interface ListProps {
  ids?: string[];
  dataState?: TaskState;
  headerComponent?: ReactElement<any>;
  onEndReach?: () => void;
  extraData?: {};
}
export interface SearchResultHeaderProps {
  searchPhase: string;
  type: "accounts" | "hashtags" | "images" | "videos";
}
export interface GalleryItemProps {
  url: string;
  resizeMode: ResizeMode;
  width: number;
  height: number;
}
export interface CarosolProps {
  noOfItems: number;
  normalDotSize: number;
  activeDotSize: number;
  scrollReference: Animated.Value;
}
export interface HeaderProps {
  leftSideComponent?: ReactNode;
  rightSideComponent?: ReactNode;
}
export interface ItemSeparatorProps {
  axis: "horizontal" | "vertical";
  length: number;
  style?: StyleProp<ViewStyle>;
}
//--------------------------------------------------------------------------------------------------------------

//----------------------------------------------response-types--------------------------------------------------
export interface HashTagInfo {
  id: string;
  name: string;
  isSaved: boolean;
  uploadsCount: number;
}
export interface AccountInfo {
  id: string;
  socialId: string;
  username: string;
  profilePictureUri: string;
  isFollower: boolean;
  isFollowing: boolean;
  followersCount: number;
}
export interface ImagePostInfo {
  id: string;
  timestamp: number;
  author: AccountInfo;
  images: MediaInfo[];
  isLiked: boolean;
  isSaved: boolean;
}
export interface VideoPostInfo {
  id: string;
  timestamp: number;
  author: AccountInfo;
  thumbnail: MediaInfo;
  viewsCount: number;
  likesCount: number;
  duration: number;
  watchTime?: number | null;
  title: string;
}
export interface HashTagDetails {
  id: string;
  name: string;
  saves: {
    savesCount: number;
    isSaved: boolean;
  };
  uploads: {
    uploadsCount: number;
    imagePosts?: PageResponseParamList<ImagePostDetails, DataCategory> | null;
    videoPosts?: PageResponseParamList<VideoPostInfo, DataCategory> | null;
  };
}
export interface AccountDetails {
  id: string;
  socialId: string;
  username: string;
  profilePictureUri: string;
  links?: Link[] | null;
  bio?: string | null;
  followers: {
    followersCount: number;
    isFollower: boolean;
    filteredFollowers?: AccountInfo[] | null;
  };
  followings: {
    followingsCount: number;
    isFollowing: boolean;
  };
  uploads: {
    uploadsCount: number;
    imagePosts?: PageResponseParamList<ImagePostDetails, DataCategory> | null;
    videoPosts?: PageResponseParamList<VideoPostInfo, DataCategory> | null;
  };
}
export interface ImagePostDetails {
  id: string;
  timestamp: number;
  author: AccountInfo;
  images: MediaInfo[];
  caption?: string | null;
  hashtags?: HashTagInfo[] | null;
  tags?: AccountInfo[] | null;
  isSaved: boolean;
  likes: {
    likesCount: number;
    isLiked: boolean;
    filteredLikes?: AccountInfo[] | null;
  };
  commentsCount: number;
  sharesCount: number;
  genre: ImageGenre;
}
export interface VideoPostDetails {
  id: string;
  timestamp: number;
  author: AccountInfo;
  thumbnail: MediaInfo;
  video: {
    media: MediaInfo;
    credit?: number | null;
    recap?: [number, number] | null;
    intro?: [number, number] | null;
  };
  viewsCount: number;
  duration: number;
  watchTime?: number | null;
  title: string;
  hashtags?: HashTagInfo[] | null;
  tags?: AccountInfo[] | null;
  isSaved: boolean;
  likes: {
    likesCount: number;
    isLiked: boolean;
    filteredLikes?: AccountInfo[] | null;
  };
  commentsCount: number;
  sharesCount: number;
  description?: string | null;
  genre: VideoGenre;
}
export interface VideoPostPreviewInfo {
  id: string;
  timestamp: number;
  author: AccountInfo;
  thumbnail: MediaInfo;
  preview: {
    media: MediaInfo;
    slice?: [number, number] | null;
  };
  viewsCount: number;
  title: string;
  isSaved: boolean;
  likesCount: number;
  description?: string | null;
  genre: VideoGenre;
}

export interface FeedResponseParamList<T, U> {
  keywords: string[];
  feed: PageResponseParamList<T, U>;
}

export interface AllDataResponseParamList extends AllPostResponseParamList {
  hashTags: PageResponseParamList<HashTagInfo, HashTagCategory>;
}

export interface AllPostResponseParamList {
  imagePosts: PageResponseParamList<ImagePostDetails, DataCategory>;
  videoPosts: PageResponseParamList<VideoPostInfo, DataCategory>;
}

export interface CommentInfo extends ReplyInfo {
  repliesCount: number;
}

export interface ReplyInfo {
  id: string;
  timestamp: number;
  author: AccountInfo;
  content: string;
  likesCount: number;
  isLiked: boolean;
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

export type PostType = "imagePost" | "videoPost";

export interface AppData {
  screenInfo: {
    imageFeed: {
      recentTimestamp?: number;
      selectedKeyword?: string;
      keywords?: string[];
      error?: AppError;
      state?: TaskState;
      resultMap: {
        [key: string]: {
          ids?: string[];
          page?: PageResponse<any>;
          state?: TaskState;
        };
      };
    };
    videoFeed: {
      recentTimestamp?: number;
      selectedKeyword?: string;
      keywords?: string[];
      error?: AppError;
      state?: TaskState;
      resultMap: {
        [key: string]: {
          ids?: string[];
          page?: PageResponse<any>;
          state?: TaskState;
        };
      };
    };
    videoPreview: {
      error?: AppError;
      state?: TaskState;
    };
    videoPost: {
      error?: AppError;
      state?: TaskState;
    };
    profile: {
      error?: AppError;
      state?: TaskState;
      videoPost: {
        state?: TaskState;
      };
      imagePost: {
        state?: TaskState;
      };
    };
    account: {
      error?: AppError;
      state?: TaskState;
      videoPost: {
        state?: TaskState;
      };
      imagePost: {
        state?: TaskState;
      };
    };
    trending: {
      error?: AppError;
      state?: TaskState;
      hashTag: {
        recentTimestamp?: number;
        selectedGenre?: HashTagGenre;
        resultMap: {
          [key: string]: {
            ids?: string[];
            page?: PageResponse<any>;
            state?: TaskState;
          };
        };
      };
      imagePost: {
        recentTimestamp?: number;
        selectedGenre?: ImageGenre;
        resultMap: {
          [key: string]: {
            ids?: string[];
            page?: PageResponse<any>;
            state?: TaskState;
          };
        };
      };
      videoPost: {
        recentTimestamp?: number;
        selectedGenre?: VideoGenre;
        resultMap: {
          [key: string]: {
            ids?: string[];
            page?: PageResponse<any>;
            state?: TaskState;
          };
        };
      };
    };
    saved: {
      state?: TaskState;
      error?: AppError;
      hashTag: {
        recentTimestamp?: number;
        page?: PageResponse<any>;
        state?: TaskState;
        ids?: string[];
      };
      imagePost: {
        recentTimestamp?: number;
        page?: PageResponse<any>;
        state?: TaskState;
        ids?: string[];
      };
      videoPost: {
        recentTimestamp?: number;
        page?: PageResponse<any>;
        state?: TaskState;
        ids?: string[];
      };
    };
    search: {
      error?: AppError;
      searchPhase?: string;
      hashTag: {
        recentTimestamp?: number;
        hasNewSearchPhase?: boolean;
        page?: PageResponse<any>;
        state?: TaskState;
        ids?: string[];
      };
      imagePost: {
        recentTimestamp?: number;
        hasNewSearchPhase?: boolean;
        page?: PageResponse<any>;
        state?: TaskState;
        ids?: string[];
      };
      videoPost: {
        recentTimestamp?: number;
        hasNewSearchPhase?: boolean;
        page?: PageResponse<any>;
        state?: TaskState;
        ids?: string[];
      };
      account: {
        recentTimestamp?: number;
        hasNewSearchPhase?: boolean;
        page?: PageResponse<any>;
        state?: TaskState;
        ids?: string[];
      };
    };
    tagged: {
      error?: AppError;
      state?: TaskState;
      videoPost: {
        state?: TaskState;
      };
      imagePost: {
        state?: TaskState;
      };
    };
    followerFollowing: {
      error?: AppError;
      state?: TaskState;
      follower: {
        state?: TaskState;
      };
      following: {
        state?: TaskState;
      };
    };
    hashtag: {
      error?: AppError;
      state?: TaskState;
      videoPost: {
        state?: TaskState;
      };
      imagePost: {
        state?: TaskState;
      };
    };
    hashtagSaves: {
      error?: AppError;
      state?: TaskState;
    };
    postEngagement: {
      error?: AppError;
      likes: {
        state?: TaskState;
      };
      comments: {
        state?: TaskState;
      };
      shares: {
        state?: TaskState;
      };
    };
  };
  userInfo: {
    id: string;
    authToken: string;
    refreshToken: string;
    profilePictureDataUrl: string;
    shutterConfiguration: (keyof RootTabNavigatorParamList)[];
  };
}
export type RequestConfig = {
  /** return type for `thunkApi.getState` */
  state: RootState;
  /** type for `thunkApi.dispatch` */
  dispatch: AppDispatch;

  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue: AppError;
  /** return type of the `serializeError` option callback */
  serializedErrorType: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta: undefined;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta: undefined;
};

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

export interface IdTimeStampPair {
  id?: string; //generic id
  timestamp?: number; //generic timestamp
}
export interface GeneralInfo extends IdTimeStampPair {
  author?: string;
}
export interface CountListPair<T> {
  count?: number;
  list?: T[];
}

export interface ImageConfig {
  width: number;
  height: number;
  resizeMode: ResizeMode;
}
export interface ImagePostOverlayProps extends Id {
  width: number;
  height: number;
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
export interface PostInfo {
  isSaved?: boolean;
  likes?: CountListPair<IdTimeStampPair> & {
    isLiked?: boolean;
    filteredLikes?: string[];
  };
  comments?: CountListPair<string>;

  shares?: CountListPair<IdTimeStampPair>;

  tags?: string[];

  hashTags?: string[];
}
export interface PostStoreMetaData {
  commentInfo?: {
    page?: PageResponse<any>;
    recentTimestamp?: number;
  };
  likeInfo?: {
    page?: PageResponse<any>;
    recentTimestamp?: number;
  };
  shareInfo?: {
    page?: PageResponse<any>;
    recentTimestamp?: number;
  };
}
export type PostStoreMetaDataMap = {
  [key: string]: PostStoreMetaData;
};
export interface Link {
  title: string;
  uri: string;
  icon: string;
}
export interface MediaInfo {
  width: number;
  height: number;
  uri: string;
}
//--------------------------------------------------------------------------------------------------------

//-------------------------------------------------USER-ENTITY----------------------------------------------------
export interface Account {
  id: string;
  socialId: string;
  username: string;
  profilePictureUri: string;
  bio?: string | null;
  links?: Link[] | null;
  followers: {
    isFollower?: boolean;
    filteredFollowers?: string[] | null;
    followersCount: number;
    ids?: string[] | null;
  };
  followings: {
    isFollowing?: boolean;
    followingsCount?: number;
    ids?: string[] | null;
  };
  uploads?: {
    uploadsCount?: number;
    imagePosts?: string[] | null;
    videoPosts?: string[] | null;
  };
  tags?: {
    imagePosts?: string[] | null;
    videoPosts?: string[] | null;
  };
}
export interface AccountMetaData {
  followers?: {
    page?: PageResponse<any>;
    recentTimestamp?: number;
  };
  followings?: {
    page?: PageResponse<any>;
    recentTimestamp?: number;
  };
  uploads?: {
    imagePosts?: {
      page?: PageResponse<any>;
      recentTimestamp?: number;
    };
    videoPosts?: {
      page?: PageResponse<any>;
      recentTimestamp?: number;
    };
  };
  tags?: {
    imagePosts?: {
      page?: PageResponse<any>;
      recentTimestamp?: number;
    };
    videoPosts?: {
      page?: PageResponse<any>;
      recentTimestamp?: number;
    };
  };
}
export type AccountMetaDataMap = {
  [key: string]: AccountMetaData;
};
export interface AccountStoreMetaData {
  metaDataMap: AccountMetaDataMap;
}
//----------------------------------------------------------------------------------------------------------------

//------------------------------------------HASHTAG-ENTITY-TYPE-------------------------------------------------
export interface HashTag {
  id: string;
  name: string;
  saves: {
    savesCount?: number;
    isSaved: boolean;
    ids?: string[] | null;
  };
  uploads: {
    uploadsCount: number;
    imagePosts?: string[] | null;
    videoPosts?: string[] | null;
  };
}

export interface HashTagMetaData {
  saveInfo?: {
    page?: PageResponse<any>;
    recentTimestamp?: number;
  };
  uploads?: {
    imagePosts?: {
      page?: PageResponse<any>;
      recentTimestamp?: number;
    };
    videoPosts?: {
      page?: PageResponse<any>;
      recentTimestamp?: number;
    };
  };
}
export type HashTagMetaDataMap = {
  [key: string]: HashTagMetaData;
};
export interface HashTagStoreMetaData {
  metaDataMap: HashTagMetaDataMap;
}
//--------------------------------------------------------------------------------------------------------------

//------------------------------------------IMAGEPOST-ENTITY-TYPE-------------------------------------------------
export interface ImagePost {
  id: string;
  timestamp: number;
  author: string;
  images: MediaInfo[];
  caption?: string | null;
  genre: ImageGenre;
  isSaved: boolean;
  likes: {
    likesCount: number;
    isLiked: boolean;
    ids?: string[] | null;
    filteredLikes?: string[] | null;
  };
  comments: {
    commentsCount: number;
    ids?: string[] | null;
  };
  shares: {
    sharesCount: number;
    ids?: string[] | null;
  };
  hashtags?: string[] | null;
  tags?: string[] | null;
}

export interface ImagePostStoreMetaData {
  postMetaDataMap: PostStoreMetaDataMap;
}
//----------------------------------------------------------------------------------------------------------------

//-------------------------------------------------VIDEOPOST-ENTITY-----------------------------------------------
export interface VideoPost {
  id: string;
  timestamp: number;
  author: string;
  title: string;
  description?: string | null;
  genre?: VideoGenre | null;
  video?: {
    media: MediaInfo; //media information of the video (i.e width, height, url)
    recap?: [number, number] | null; //starting and ending timestamp of video recap
    intro?: [number, number] | null; //starting and ending timestamp of video intro
    credits?: number | null; //starting timestamp of video end credits
  };
  thumbnail: MediaInfo;
  preview?: {
    media: MediaInfo;
    slice?: [number, number] | null;
  };
  viewsCount: number;
  watchTime?: number | null;
  duration?: number | null;
  isSaved?: boolean | null;
  likes: {
    likesCount: number;
    isLiked?: boolean | null;
    ids?: string[] | null;
    filteredLikes?: string[] | null;
  };
  comments?: {
    commentsCount?: number | null;
    ids?: string[] | null;
  };
  shares?: {
    sharesCount?: number | null;
    ids?: string[] | null;
  };
  hashtags?: string[] | null;
  tags?: string[] | null;
}

export interface VideoPostStoreMetaData {
  postMetaDataMap: PostStoreMetaDataMap;
}
//----------------------------------------------------------------------------------------------------------------

//--------------------------------------------------REPLY-ENTITY-----------------------------------------------
export interface Reply {
  id: string;
  timestamp: number;
  author: string;
  content: string;
  likes: {
    likesCount: number;
    isLiked: boolean;
    list?: string[] | null;
  };
}
export interface ReplyMetaData {
  likeInfo?: {
    recentTimestamp?: number;
    page?: PageResponse<any>;
  };
}
export interface ReplyMetaDataMap {
  [key: string]: ReplyMetaData;
}
export interface ReplyStoreMetaData {
  metaDataMap: ReplyMetaDataMap;
}
//---------------------------------------------------------------------------------------------------------------

//------------------------------------------------COMMENT-ENTITY------------------------------------------
export interface Comment extends Reply {
  replies: {
    repliesCount: number;
    list?: string[] | null;
  };
}

export interface CommentMetaData extends ReplyMetaData {
  replyInfo: PageResponse<any>;
}
export interface CommentMetaDataMap {
  [key: string]: CommentMetaData;
}
export interface CommentStoreMetaData {
  metaDataMap: CommentMetaDataMap;
}
//--------------------------------------------------------------------------------------------------------

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
  PostEngagementStack: NavigatorScreenParams<PostEngagementNavigatorParamList>;
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

export type VideoFeedScreenResponse = {
  keywords: string[];
  videoThumbnails: PageResponse<VideoPostInfo>;
  recentTimestamp: number;
};

export type DataCategory =
  | "feed"
  | "trend"
  | "search"
  | "save"
  | "tag"
  | "user/uploads"
  | "hashtag/uploads";

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
export type ApiModel = {
  // account: ModelDefinition;
  // imagePost: ModelDefinition;
  // videoPost: ModelDefinition;
  // comment: ModelDefinition;
  // hashtag: ModelDefinition;
};

export type ApiFactory = {
  // account: FactoryDefinition;
  // comment: FactoryDefinition;
  // imagePost: FactoryDefinition;
  // videoPost: FactoryDefinition;
  // hashtag: FactoryDefinition;
};

export type entities = keyof ApiModel;

export interface ApiResponse<T, U> {
  meta: T;
  data: U;
}

export type DataType =
  | "image"
  | "video"
  | "hashtag"
  | "account"
  | "comment"
  | "reply";

export interface FeedMeta {
  keywords: string[];
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

// export interface AccountEntity {
//   id: string;
//   userame: string;
//   socialId: string;
//   profilePictureUri: string;
//   bio?: string | null;
//   links?: Link[] | null;
//   followers: {
//     noOfFollowers: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
//   followings: {
//     noOfFollowings: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
//   uploads: {
//     noOfUploads: number;
//     imagePosts?: HasMany<entities> | null;
//     videoPosts?: HasMany<entities> | null;
//   };
//   saved: {
//     imagePosts?: HasMany<entities> | null;
//     videoPosts?: HasMany<entities> | null;
//     hashtags?: HasMany<entities> | null;
//   };
//   tagged: {
//     imagePosts?: HasMany<entities> | null;
//     videoPosts?: HasMany<entities> | null;
//   };
// }

// export interface HashTagEntity {
//   id: string;
//   name: string;
//   uploads: {
//     noOfUploads: number;
//     imagePosts?: HasMany<entities> | null;
//     videoPosts?: HasMany<entities> | null;
//   };
//   saved: {
//     noOfSaves: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
// }

// export interface ImagePostEntity {
//   id: string;
//   timestamp: number;
//   author: BelongsTo<entities>;
//   caption?: string | null;
//   images: MediaInfo[];
//   hashtags?: HasMany<entities> | null;
//   contentType: ImageGenre;
//   tags?: HasMany<entities> | null;
//   likes: {
//     noOfLikes: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
//   comment: {
//     noOfComments: number;
//     list?: HasMany<entities> | null;
//   };
//   shares: {
//     noOfShares: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
// }

// export interface VideoPostEntity {
//   id: string;
//   timestamp: number;
//   author: BelongsTo<entities>;
//   title: string;
//   description?: string | null;
//   video: {
//     media: MediaInfo;
//     labels?: { title: string; timestamp: number }[] | null;
//     duration: number;
//     watchTime?: number | null;
//   };
//   thumbnail: MediaInfo;
//   preview?: {
//     media: MediaInfo;
//     slice?: [number, number] | null;
//   } | null;
//   hashtags?: HasMany<entities> | null;
//   contentType: VideoGenre;
//   tags?: HasMany<entities> | null;
//   likes: {
//     noOfLikes: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
//   comment: {
//     noOfComments: number;
//     list?: HasMany<entities> | null;
//   };
//   shares: {
//     noOfShares: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
// }

// export interface CommentEntity {
//   id: string;
//   timestamp: number;
//   author: BelongsTo<entities>;
//   content: string;
//   likes: {
//     noOfLikes: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
//   replies: {
//     noOfReplies: number;
//     list?: EmbbededReply[] | null;
//   };
// }

// export interface EmbbededReply {
//   id: string;
//   timestamp: number;
//   author: BelongsTo<entities>;
//   content: string;
//   likes: {
//     noOfLikes: number;
//     list?: { id: BelongsTo<entities>; timestamp: number }[] | null;
//   };
// }
