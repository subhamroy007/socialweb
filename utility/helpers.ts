import {
  Account,
  AccountDetails,
  AccountInfo,
  Comment,
  CommentInfo,
  HashTag,
  HashTagDetails,
  HashTagInfo,
  ImageConfig,
  ImagePost,
  ImagePostDetails,
  ImagePostInfo,
  Link,
  MediaInfo,
  PageResponse,
  ReplyInfo,
  Size,
  VideoPost,
  VideoPostDetails,
  VideoPostInfo,
  VideoPostPreviewInfo,
} from "./types";
import { ResizeMode } from "react-native-fast-image";
import faker from "faker";

export const HASHTAG_PAGE_SIZE = 12;
export const ACCOUNT_PAGE_SIZE = 12;
export const IMAGE_POST_INFO_PAGE_SIZE = 15;
export const IMAGE_POST_DETAILS_PAGE_SIZE = 8;
export const VIDEO_POST_INFO_PAGE_SIZE = 8;

//--------------------------------------------------utilities--------------------------------------------------
export const getImageConfig = (
  { max: maxWidth, min: minWidth, original: originalWidth }: Size,
  { max: maxHeight, min: minHeight, original: originalHeigth }: Size
): ImageConfig => {
  const aspectRatio = originalHeigth / originalWidth;
  let containerWidth = originalWidth;
  if (containerWidth > maxWidth) {
    containerWidth = maxWidth;
  } else if (containerWidth < minWidth) {
    containerWidth = minWidth;
  }

  let containerHeight = containerWidth * aspectRatio;

  if (containerHeight > maxHeight) {
    containerHeight = maxHeight;
  } else if (containerHeight < minHeight) {
    containerHeight = minWidth;
  }

  let resizeMode: ResizeMode = "center";

  if (originalWidth >= containerWidth && originalHeigth >= containerHeight) {
    resizeMode = "cover";
  } else if (
    originalWidth < containerWidth &&
    originalHeigth < containerHeight
  ) {
    resizeMode = "center";
  } else {
    resizeMode = "contain";
  }

  return { height: containerHeight, width: containerWidth, resizeMode };
};

export const timeElapsed = (timestamp: number): string => {
  const currentTime: number = Date.now();
  let elapsedTime = Math.floor((currentTime - timestamp) / 1000);
  let timeString: string = "";
  if (elapsedTime < 60) {
    timeString = "Just now";
  } else if (elapsedTime >= 60 && elapsedTime < 3600) {
    let time = Math.floor(elapsedTime / 60);
    timeString = time + "min";
  } else if (elapsedTime >= 3600 && elapsedTime < 86400) {
    let time = Math.floor(elapsedTime / 3600);
    timeString = time + "hr";
  } else if (elapsedTime >= 86400 && elapsedTime < 604800) {
    let time = Math.floor(elapsedTime / 86400);
    timeString = time + "days";
  } else if (elapsedTime >= 604800 && elapsedTime < 2592000) {
    let time = Math.floor(elapsedTime / 604800);
    timeString = time + "weeks";
  } else if (elapsedTime >= 2592000 && elapsedTime < 31104000) {
    let time = Math.floor(elapsedTime / 2592000);
    timeString = time + "months";
  } else {
    let time = Math.floor(elapsedTime / 31104000);
    timeString = time + "years";
  }

  return timeString;
};

export const countAbbreviator = (count: number): string => {
  let abbreviation: string = "";
  if (count < 1000) {
    abbreviation = count + " ";
  } else if (count >= 1000 && count < 1000000) {
    if (count < 10000) {
      let newCount = count / 100;
      if (newCount % 10 >= 1) {
        newCount = count / 1000;
        abbreviation = newCount.toFixed(1) + "K";
      } else {
        newCount = Math.floor(count / 1000000);
        abbreviation = newCount + "K";
      }
    } else {
      let newCount = Math.floor(count / 1000);
      abbreviation = newCount + "K";
    }
  } else if (count >= 1000000 && count < 100000000) {
    if (count < 10000000) {
      let newCount = count / 100000;
      if (newCount % 10 >= 1) {
        newCount = count / 1000000;
        abbreviation = newCount.toFixed(1) + "M";
      } else {
        newCount = Math.floor(count / 1000000);
        abbreviation = newCount + "M";
      }
    } else {
      let newCount = Math.floor(count / 1000000);
      abbreviation = newCount + "M";
    }
  } else {
    if (count < 1000000000) {
      let newCount = count / 10000000;
      if (newCount % 10 >= 1) {
        newCount = count / 100000000;
        abbreviation = newCount.toFixed(1) + "B";
      } else {
        newCount = Math.floor(count / 100000000);
        abbreviation = newCount + "B";
      }
    } else {
      let newCount = Math.floor(count / 100000000);
      abbreviation = newCount + "B";
    }
  }
  return abbreviation;
};

export const timeFormatter = (timestamp: number): string => {
  let time = new Date(timestamp);
  let timeString: string = "";
  if (time.getHours() > 12) {
    timeString = time.getHours() - 12 + ":" + time.getMinutes() + "pm";
  } else {
    timeString = time.getHours() + ":" + time.getMinutes() + "am";
  }
  return timeString;
};

export const timeStringGenerator = (timestamp: number): string => {
  let timeInSeconds = Math.floor(timestamp / 1000);

  let resultString = "";

  if (timeInSeconds / 3600 >= 1) {
    const totalHours = Math.floor(timeInSeconds / 3600);

    resultString =
      resultString + (totalHours > 9 ? totalHours : "0" + totalHours) + ":";
  }
  timeInSeconds = timeInSeconds % 3600;
  if (timeInSeconds / 60 >= 1) {
    const totalMins = Math.floor(timeInSeconds / 60);
    resultString =
      resultString + (totalMins > 9 ? totalMins : "0" + totalMins) + ":";
  } else if (resultString !== "") {
    resultString = resultString + "00:";
  }

  timeInSeconds = timeInSeconds % 60;
  resultString =
    resultString + (timeInSeconds > 9 ? timeInSeconds : "0" + timeInSeconds);

  return resultString;
};

export const dateString = (timestamp: number) => {
  let timestring: string = "";
  let monthString: string = "";
  let time = new Date(timestamp);
  let month: number = time.getMonth();
  let year: number = time.getFullYear();
  let date: number = time.getDate();
  switch (month) {
    case 0:
      monthString = "Jan";
      break;
    case 1:
      monthString = "Feb";
      break;
    case 2:
      monthString = "Mar";
      break;
    case 3:
      monthString = "Apr";
      break;
    case 4:
      monthString = "May";
      break;
    case 5:
      monthString = "Jun";
      break;
    case 6:
      monthString = "Jul";
      break;
    case 7:
      monthString = "Aug";
      break;
    case 8:
      monthString = "Sept";
      break;
    case 9:
      monthString = "Oct";
      break;
    case 10:
      monthString = "Nov";
      break;
    case 11:
      monthString = "Dec";
      break;
    default:
      break;
  }
  timestring = monthString + " " + date + " " + year;
  return timestring;
};

export function extractId<T extends { id: string }>(entity: T): string {
  return entity.id;
}

export function createKeyExtractor(type: string) {
  return function <T extends { id: string }>(item: T, index?: number): string {
    return item.id;
  };
}

export async function delay(millis: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, 5000));
}
//----------------------------------------------------------------------------------------------------

//----------------------------------------------generators-------------------------------------------------
export function generateHashTagInfo(): HashTagInfo {
  return {
    id: "hashtag@" + faker.datatype.uuid(),
    isSaved: faker.datatype.boolean(),
    name: faker.lorem.word(faker.datatype.number({ min: 4, max: 10 })),
    uploadsCount: faker.datatype.number({ min: 0, max: 1000000 }),
  };
}

export function generateHashTagInfoList(
  length: number = faker.datatype.number({ min: 4, max: 25 })
): HashTagInfo[] {
  const list: HashTagInfo[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateHashTagInfo());
  }

  return list;
}

export function generatePaginatedHashTagInfo(
  id: number = 0
): PageResponse<HashTagInfo> {
  return {
    id,
    length: HASHTAG_PAGE_SIZE,
    noOfPages: 1000,
    size: HASHTAG_PAGE_SIZE,
    list: generateHashTagInfoList(HASHTAG_PAGE_SIZE),
  };
}

export function generateAccountInfo(): AccountInfo {
  return {
    id: "account@" + faker.datatype.uuid(),
    followersCount: faker.datatype.number({ min: 0, max: 10000000 }),
    isFollower: faker.datatype.boolean(),
    isFollowing: faker.datatype.boolean(),
    profilePictureUri: faker.image.imageUrl(),
    socialId: faker.name.firstName(),
    username: faker.name.findName(),
  };
}

export function generateAccountInfoList(
  length: number = faker.datatype.number({ min: 4, max: 25 })
): AccountInfo[] {
  const list: AccountInfo[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateAccountInfo());
  }

  return list;
}

export function generatePaginatedAccountInfo(
  id: number = 0
): PageResponse<AccountInfo> {
  return {
    id,
    length: ACCOUNT_PAGE_SIZE,
    noOfPages: 1000,
    size: ACCOUNT_PAGE_SIZE,
    list: generateAccountInfoList(ACCOUNT_PAGE_SIZE),
  };
}

export function generateMediaInfo(): MediaInfo {
  const height = faker.datatype.number({ max: 480, min: 144 });
  const width = faker.datatype.number({ max: 480, min: 144 });

  return {
    height,
    width,
    uri: faker.image.imageUrl(width, height, undefined, true),
  };
}

export function generateMediaInfoList(length: number = 1): MediaInfo[] {
  const list: MediaInfo[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateMediaInfo());
  }

  return list;
}

export function generateImagePostInfo(): ImagePostInfo {
  return {
    author: generateAccountInfo(),
    id: "imagePost@" + faker.datatype.uuid(),
    images: generateMediaInfoList(faker.datatype.number({ min: 1, max: 12 })),
    isLiked: faker.datatype.boolean(),
    isSaved: faker.datatype.boolean(),
    timestamp: faker.date.past(5, Date()).getMilliseconds(),
  };
}

export function generateImagePostInfoList(
  length: number = faker.datatype.number({ min: 4, max: 25 })
): ImagePostInfo[] {
  const list: ImagePostInfo[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateImagePostInfo());
  }

  return list;
}

export function generatePaginatedImagePostInfo(
  id: number = 0
): PageResponse<ImagePostInfo> {
  return {
    id,
    length: IMAGE_POST_INFO_PAGE_SIZE,
    noOfPages: 1000,
    size: IMAGE_POST_INFO_PAGE_SIZE,
    list: generateImagePostInfoList(IMAGE_POST_INFO_PAGE_SIZE),
  };
}

export function generateImagePostDetails(): ImagePostDetails {
  return {
    author: generateAccountInfo(),
    commentsCount: faker.datatype.number({ max: 100000, min: 0 }),
    genre: "food",
    id: "imagePost@" + faker.datatype.uuid(),
    images: generateMediaInfoList(faker.datatype.number({ min: 1, max: 12 })),
    isSaved: faker.datatype.boolean(),
    likes: {
      isLiked: faker.datatype.boolean(),
      likesCount: faker.datatype.number({ max: 1000000, min: 0 }),
      filteredLikes: faker.datatype.boolean()
        ? generateAccountInfoList(faker.datatype.number({ min: 0, max: 2 }))
        : null,
    },
    sharesCount: faker.datatype.number({ max: 10000, min: 0 }),
    timestamp: faker.date.past(5, Date()).getMilliseconds(),
    caption: faker.datatype.boolean()
      ? faker.lorem.words(faker.datatype.number({ min: 1, max: 15 }))
      : null,
    hashtags: faker.datatype.boolean() ? generateHashTagInfoList() : null,
    tags: faker.datatype.boolean() ? generateAccountInfoList() : null,
  };
}

export function generateImagePostDetailsList(
  length: number = faker.datatype.number({ min: 4, max: 25 })
): ImagePostDetails[] {
  const list: ImagePostDetails[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateImagePostDetails());
  }

  return list;
}

export function generatePaginatedImagePostDetails(
  id: number = 0
): PageResponse<ImagePostDetails> {
  return {
    id,
    length: IMAGE_POST_DETAILS_PAGE_SIZE,
    noOfPages: 1000,
    size: IMAGE_POST_DETAILS_PAGE_SIZE,
    list: generateImagePostDetailsList(IMAGE_POST_DETAILS_PAGE_SIZE),
  };
}

export function generateVideoPostInfo(): VideoPostInfo {
  const duration = faker.datatype.number({
    min: 30000,
    max: 120 * 60 * 1000,
  });

  return {
    author: generateAccountInfo(),
    duration,
    id: "videoPost@" + faker.datatype.uuid(),
    likesCount: faker.datatype.number({ min: 0, max: 100000 }),
    thumbnail: generateMediaInfo(),
    timestamp: faker.date.past(5, Date()).getMilliseconds(),
    title: faker.lorem.words(faker.datatype.number({ max: 16, min: 1 })),
    viewsCount: faker.datatype.number({ min: 0, max: 10000000 }),
    watchTime: faker.datatype.boolean()
      ? Math.floor(duration * Math.random())
      : null,
  };
}

export function generateVideoPostInfoList(
  length: number = faker.datatype.number({ min: 4, max: 25 })
): VideoPostInfo[] {
  const list: VideoPostInfo[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateVideoPostInfo());
  }

  return list;
}

export function generatePaginatedVideoPostInfo(
  id: number = 0
): PageResponse<VideoPostInfo> {
  return {
    id,
    length: VIDEO_POST_INFO_PAGE_SIZE,
    noOfPages: 1000,
    size: VIDEO_POST_INFO_PAGE_SIZE,
    list: generateVideoPostInfoList(VIDEO_POST_INFO_PAGE_SIZE),
  };
}

export function genererateVideoPostDetails(): VideoPostDetails {
  const duration = faker.datatype.number({
    min: 30000,
    max: 120 * 60 * 1000,
  });
  const media = generateMediaInfo();
  media.uri = "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
  return {
    author: generateAccountInfo(),
    duration,
    id: "videoPost@" + faker.datatype.uuid(),
    thumbnail: generateMediaInfo(),
    timestamp: faker.date.past(5, Date()).getMilliseconds(),
    title: faker.lorem.words(faker.datatype.number({ max: 16, min: 1 })),
    viewsCount: faker.datatype.number({ min: 0, max: 10000000 }),
    watchTime: faker.datatype.boolean()
      ? Math.floor(duration * Math.random())
      : null,
    commentsCount: faker.datatype.number({ max: 10000, min: 0 }),
    genre: "comedy",
    isSaved: faker.datatype.boolean(),
    likes: {
      isLiked: faker.datatype.boolean(),
      likesCount: faker.datatype.number({ max: 100000, min: 0 }),
      filteredLikes: faker.datatype.boolean()
        ? generateAccountInfoList(faker.datatype.number({ min: 0, max: 2 }))
        : null,
    },
    sharesCount: faker.datatype.number({ max: 10000, min: 0 }),
    description: faker.datatype.boolean()
      ? faker.lorem.words(faker.datatype.number({ min: 1, max: 100 }))
      : null,
    hashtags: faker.datatype.boolean() ? generateHashTagInfoList() : null,
    tags: faker.datatype.boolean() ? generateAccountInfoList() : null,
    video: {
      media,
      credit: faker.datatype.boolean() ? 24000 : null,
      intro: faker.datatype.boolean() ? [10000, 16000] : null,
      recap: faker.datatype.boolean() ? [0, 9000] : null,
    },
  };
}

export function generateLink(): Link {
  return {
    icon: "heart-solid",
    title: faker.lorem.words(faker.datatype.number({ min: 1, max: 4 })),
    uri: "",
  };
}

export function generateLinkList(
  length: number = faker.datatype.number({ min: 1, max: 10 })
): Link[] {
  const list: Link[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateLink());
  }

  return list;
}

export function generateAccountDetails(): AccountDetails {
  return {
    followers: {
      followersCount: faker.datatype.number({ min: 0, max: 10000000 }),
      isFollower: faker.datatype.boolean(),
      filteredFollowers: faker.datatype.boolean()
        ? generateAccountInfoList(faker.datatype.number({ min: 0, max: 2 }))
        : null,
    },
    followings: {
      followingsCount: faker.datatype.number({ min: 0, max: 1000 }),
      isFollowing: faker.datatype.boolean(),
    },
    id: "account@" + faker.datatype.uuid(),
    profilePictureUri: faker.image.imageUrl(),
    socialId: faker.name.firstName(),
    uploads: {
      uploadsCount: faker.datatype.number({ min: 0, max: 1000 }),
      imagePosts: faker.datatype.boolean()
        ? {
            category: "user/uploads",
            filter: "",
            recentTimestamp: 0,
            ...generatePaginatedImagePostDetails(),
          }
        : null,
      videoPosts: faker.datatype.boolean()
        ? {
            category: "user/uploads",
            filter: "",
            recentTimestamp: 0,
            ...generatePaginatedVideoPostInfo(),
          }
        : null,
    },
    username: faker.name.findName(),
    bio: faker.datatype.boolean()
      ? faker.lorem.words(faker.datatype.number({ min: 1, max: 30 }))
      : null,
    links: faker.datatype.boolean() ? generateLinkList() : null,
  };
}

export function generateHashTagDetails(): HashTagDetails {
  return {
    id: "hashtag@" + faker.datatype.uuid(),
    name: faker.lorem.word(faker.datatype.number({ max: 10, min: 3 })),
    saves: {
      isSaved: faker.datatype.boolean(),
      savesCount: faker.datatype.number({ min: 1, max: 10000000 }),
    },
    uploads: {
      uploadsCount: faker.datatype.number({ min: 1, max: 10000 }),
      imagePosts: faker.datatype.boolean()
        ? {
            category: "hashtag/uploads",
            filter: "",
            recentTimestamp: 0,
            ...generatePaginatedImagePostDetails(),
          }
        : null,
      videoPosts: faker.datatype.boolean()
        ? {
            category: "hashtag/uploads",
            filter: "",
            recentTimestamp: 0,
            ...generatePaginatedVideoPostInfo(),
          }
        : null,
    },
  };
}

export function generateVideoPostPreviewInfo(): VideoPostPreviewInfo {
  const media = generateMediaInfo();
  media.uri = "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

  return {
    author: generateAccountInfo(),
    id: "videoPost@" + faker.datatype.uuid(),
    thumbnail: generateMediaInfo(),
    timestamp: faker.date.past(5, Date()).getMilliseconds(),
    title: faker.lorem.words(faker.datatype.number({ max: 16, min: 1 })),
    viewsCount: faker.datatype.number({ min: 0, max: 10000000 }),
    genre: "comedy",
    isSaved: faker.datatype.boolean(),
    description: faker.datatype.boolean()
      ? faker.lorem.words(faker.datatype.number({ min: 1, max: 100 }))
      : null,
    likesCount: faker.datatype.number({ min: 0, max: 10000 }),
    preview: {
      media,
      slice: faker.datatype.boolean() ? [0, 10] : null,
    },
  };
}

export function generateKeyWords(): string[] {
  const list: string[] = [];
  list.push("all");
  for (let i = 0; i < faker.datatype.number({ min: 8, max: 16 }); i++) {
    list.push(faker.lorem.word(faker.datatype.number({ min: 4, max: 12 })));
  }

  return list;
}

export function generateCommentInfo(): CommentInfo {
  return {
    author: generateAccountInfo(),
    content: faker.lorem.words(faker.datatype.number({ min: 3, max: 100 })),
    id: "comment@" + faker.datatype.uuid(),
    isLiked: faker.datatype.boolean(),
    likesCount: faker.datatype.number({ min: 0, max: 10000 }),
    repliesCount: faker.datatype.number({ min: 0, max: 10000 }),
    timestamp: faker.date.past(2, Date()).getMilliseconds(),
  };
}

export function generateCommentInfoList(length: number = 10): CommentInfo[] {
  const list: CommentInfo[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateCommentInfo());
  }

  return list;
}

export function generatePaginatedCommentInfo(
  pageId: number = 0
): PageResponse<CommentInfo> {
  return {
    id: pageId,
    length: 10,
    size: 10,
    noOfPages: 1000,
    list: generateCommentInfoList(),
  };
}

export function generateReplyInfo(): ReplyInfo {
  return {
    author: generateAccountInfo(),
    content: faker.lorem.words(faker.datatype.number({ min: 3, max: 100 })),
    id: "comment@" + faker.datatype.uuid(),
    isLiked: faker.datatype.boolean(),
    likesCount: faker.datatype.number({ min: 0, max: 10000 }),
    timestamp: faker.date.past(2, Date()).getMilliseconds(),
  };
}

export function generateReplyInfoList(length: number = 10): ReplyInfo[] {
  const list: ReplyInfo[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateReplyInfo());
  }

  return list;
}

export function generatePaginatedReplyInfo(
  pageId: number = 0
): PageResponse<ReplyInfo> {
  return {
    id: pageId,
    length: 10,
    size: 10,
    noOfPages: 1000,
    list: generateReplyInfoList(),
  };
}

//------------------------------------------------------------------------------------------------------------

//-------------------------------------------converters------------------------------------------------------

export function convertCommentinfoToComment(source: CommentInfo): Comment {
  return {
    author: source.author.id,
    content: source.content,
    id: source.id,
    likes: {
      isLiked: source.isLiked,
      likesCount: source.likesCount,
    },
    replies: {
      repliesCount: source.repliesCount,
    },
    timestamp: source.timestamp,
  };
}

export function convertHashTagInfoToHashTag(source: HashTagInfo): HashTag {
  return {
    id: source.id,
    name: source.name,
    saves: {
      isSaved: source.isSaved,
    },
    uploads: {
      uploadsCount: source.uploadsCount,
    },
  };
}

export function convertHashTagDetailsToHashTag(
  source: HashTagDetails
): HashTag {
  return {
    id: source.id,
    name: source.name,
    saves: {
      isSaved: source.saves.isSaved,
      savesCount: source.saves.savesCount,
    },
    uploads: {
      uploadsCount: source.uploads.uploadsCount,
      imagePosts: source.uploads.imagePosts?.list?.map(
        (imagePost) => imagePost.id
      ),
      videoPosts: source.uploads.videoPosts?.list?.map(
        (videoPost) => videoPost.id
      ),
    },
  };
}

export function convertAccountInfoToAccount(source: AccountInfo): Account {
  return {
    followers: {
      followersCount: source.followersCount,
      isFollower: source.isFollower,
    },
    followings: {
      isFollowing: source.isFollowing,
    },
    id: source.id,
    profilePictureUri: source.profilePictureUri,
    socialId: source.socialId,
    username: source.username,
  };
}

export function convertAccountDetailsToAccount(
  source: AccountDetails
): Account {
  return {
    followers: {
      followersCount: source.followers.followersCount,
      isFollower: source.followers.isFollower,
      filteredFollowers: source.followers.filteredFollowers?.map(
        (account) => account.id
      ),
    },
    followings: {
      isFollowing: source.followings.isFollowing,
      followingsCount: source.followings.followingsCount,
    },
    id: source.id,
    profilePictureUri: source.profilePictureUri,
    socialId: source.socialId,
    username: source.username,
    uploads: {
      uploadsCount: source.uploads.uploadsCount,
      imagePosts: source.uploads.imagePosts?.list?.map(
        (imagePost) => imagePost.id
      ),
      videoPosts: source.uploads.videoPosts?.list?.map(
        (videoPost) => videoPost.id
      ),
    },
    bio: source.bio,
    links: source.links,
  };
}

// export function convertImagePostInfoToImagePost(
//   source: ImagePostInfo
// ): ImagePost {
//   return {
//     author: source.author.id,
//     id: source.id,
//     images: source.images,
//     isSaved: source.isSaved,
//     likes: {
//       isLiked: source.isLiked,
//     },
//     timestamp: source.timestamp,
//   };
// }

export function convertImagePostDetailsToImagePost(
  source: ImagePostDetails
): ImagePost {
  return {
    author: source.author.id,
    id: source.id,
    images: source.images,
    isSaved: source.isSaved,
    likes: {
      isLiked: source.likes.isLiked,
      filteredLikes: source.likes.filteredLikes?.map((account) => account.id),
      likesCount: source.likes.likesCount,
    },
    timestamp: source.timestamp,
    caption: source.caption,
    comments: {
      commentsCount: source.commentsCount,
    },
    genre: source.genre,
    shares: {
      sharesCount: source.sharesCount,
    },
    hashtags: source.hashtags?.map((hashtag) => hashtag.id),
    tags: source.tags?.map((account) => account.id),
  };
}

export function convertVideoPostInfoToVideoPost(
  source: VideoPostInfo
): VideoPost {
  return {
    author: source.author.id,
    duration: source.duration,
    id: source.id,
    likes: {
      likesCount: source.likesCount,
    },
    thumbnail: source.thumbnail,
    timestamp: source.timestamp,
    title: source.title,
    watchTime: source.watchTime,
    viewsCount: source.viewsCount,
  };
}

export function convertVideoPostDetailsToVideoPost(
  source: VideoPostDetails
): VideoPost {
  return {
    author: source.author.id,
    duration: source.duration,
    id: source.id,
    likes: {
      likesCount: source.likes.likesCount,
      filteredLikes: source.likes.filteredLikes?.map((account) => account.id),
      isLiked: source.likes.isLiked,
    },
    thumbnail: source.thumbnail,
    timestamp: source.timestamp,
    title: source.title,
    watchTime: source.watchTime,
    viewsCount: source.viewsCount,
    comments: {
      commentsCount: source.commentsCount,
    },
    description: source.description,
    genre: source.genre,
    hashtags: source.hashtags?.map((hashtag) => hashtag.id),
    isSaved: source.isSaved,
    shares: {
      sharesCount: source.sharesCount,
    },
    video: source.video,
    tags: source.tags?.map((account) => account.id),
  };
}

export function convertVideoPostPreviewInfoToVideoPost(
  source: VideoPostPreviewInfo
): VideoPost {
  return {
    author: source.author.id,
    timestamp: source.timestamp,
    id: source.id,
    thumbnail: source.thumbnail,
    preview: source.preview,
    viewsCount: source.viewsCount,
    title: source.title,
    isSaved: source.isSaved,
    likes: {
      likesCount: source.likesCount,
    },
    description: source.description,
    genre: source.genre,
  };
}
//-----------------------------------------------------------------------------------------------------------
