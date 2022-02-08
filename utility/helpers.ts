import {
  AccountMediumResponse,
  AccountShortResponse,
  AccountWithTimestampResponse,
  CommentResponse,
  HashTagLongResponse,
  HashTagShortResponse,
  ImageConfig,
  ImagePostResponse,
  Link,
  MediaInfo,
  PageResponse,
  ReplyResponse,
  Size,
  VideoThumbnailResponse,
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
    containerHeight = minHeight;
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
    timeString = time + " min";
  } else if (elapsedTime >= 3600 && elapsedTime < 86400) {
    let time = Math.floor(elapsedTime / 3600);
    timeString = time + " hr";
  } else if (elapsedTime >= 86400 && elapsedTime < 604800) {
    let time = Math.floor(elapsedTime / 86400);
    timeString = time + " days";
  } else if (elapsedTime >= 604800 && elapsedTime < 2592000) {
    let time = Math.floor(elapsedTime / 604800);
    timeString = time + " weeks";
  } else if (elapsedTime >= 2592000 && elapsedTime < 31104000) {
    let time = Math.floor(elapsedTime / 2592000);
    timeString = time + " months";
  } else {
    let time = Math.floor(elapsedTime / 31104000);
    timeString = time + " years";
  }

  return timeString;
};

export const countAbbreviator = (count: number): string => {
  let abbreviation: string = "";
  if (count < 1000) {
    abbreviation = count + "";
  } else if (count >= 1000 && count < 1000000) {
    if (count < 10000) {
      let newCount = count / 100;
      if (newCount % 10 >= 1) {
        newCount = count / 1000;
        abbreviation = newCount.toFixed(1) + "k";
      } else {
        newCount = Math.floor(count / 1000000);
        abbreviation = newCount + "k";
      }
    } else {
      let newCount = Math.floor(count / 1000);
      abbreviation = newCount + "k";
    }
  } else if (count >= 1000000 && count < 100000000) {
    if (count < 10000000) {
      let newCount = count / 100000;
      if (newCount % 10 >= 1) {
        newCount = count / 1000000;
        abbreviation = newCount.toFixed(1) + "m";
      } else {
        newCount = Math.floor(count / 1000000);
        abbreviation = newCount + "m";
      }
    } else {
      let newCount = Math.floor(count / 1000000);
      abbreviation = newCount + "m";
    }
  } else {
    if (count < 1000000000) {
      let newCount = count / 10000000;
      if (newCount % 10 >= 1) {
        newCount = count / 100000000;
        abbreviation = newCount.toFixed(1) + "b";
      } else {
        newCount = Math.floor(count / 100000000);
        abbreviation = newCount + "b";
      }
    } else {
      let newCount = Math.floor(count / 100000000);
      abbreviation = newCount + "b";
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
  const hoursRemander = Math.floor(timestamp / 3600);
  timestamp = timestamp % 3600;
  const minsRemander = Math.floor(timestamp / 60);
  const secsRemander = timestamp % 60;

  let timeString = "";

  timeString =
    (secsRemander > 9 ? secsRemander : "0" + secsRemander) + timeString;

  timeString =
    (minsRemander > 9 ? minsRemander : "0" + minsRemander) + ":" + timeString;

  timeString =
    (hoursRemander > 0
      ? hoursRemander > 9
        ? hoursRemander + ":"
        : "0" + hoursRemander + ":"
      : "") + timeString;

  return timeString;
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
    return item.id + "-" + index;
  };
}

export async function delay(millis: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, 5000));
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

export function generateAccountShortResponse(): AccountShortResponse {
  return {
    id: "account" + faker.datatype.uuid(),
    profilePictureUri: faker.image.imageUrl(144, 144, undefined, true),
    socialId: faker.name.firstName() + "@" + faker.name.lastName(),
  };
}

export function generateAccountMediumResponse(): AccountMediumResponse {
  return {
    ...generateAccountShortResponse(),
    hasUnSeenStroy: faker.datatype.boolean(),
    isFollowing: faker.datatype.boolean(),
    username: faker.name.findName(),
    isFollower: faker.datatype.boolean(),
    noOfFollowers: faker.datatype.number({ min: 0, max: 10000000 }),
  };
}

export function generateAccountShortResponseList(
  length: number = faker.datatype.number({ min: 1, max: 10 })
): AccountShortResponse[] {
  const list: AccountShortResponse[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateAccountShortResponse());
  }

  return list;
}

export function generateAccountWithTimestampResponse(): AccountWithTimestampResponse {
  return {
    ...generateAccountMediumResponse(),
    timestamp: faker.date.past(2, Date()).getMilliseconds(),
  };
}

export function generateAccountWithTimestampResponseList(
  length: number = faker.datatype.number({ min: 1, max: 10 })
): AccountWithTimestampResponse[] {
  const list: AccountWithTimestampResponse[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateAccountWithTimestampResponse());
  }

  return list;
}

export function generateHashTagShortResponse(): HashTagShortResponse {
  return {
    id: "hashtag" + faker.datatype.uuid(),
    name: faker.lorem.word(faker.datatype.number({ min: 3, max: 16 })),
  };
}

export function generateHashTagShortResponseList(
  length: number = faker.datatype.number({ min: 1, max: 10 })
): HashTagShortResponse[] {
  const list: HashTagShortResponse[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateHashTagShortResponse());
  }

  return list;
}

export function generateImagePostResponse(): ImagePostResponse {
  return {
    author: generateAccountMediumResponse(),
    noOfComments: faker.datatype.number({ max: 100000, min: 0 }),
    genre: "food",
    id: "imagePost@" + faker.datatype.uuid(),
    images: generateMediaInfoList(faker.datatype.number({ min: 1, max: 12 })),
    hasSaved: faker.datatype.boolean(),
    likes: {
      hasLiked: faker.datatype.boolean(),
      noOfLikes: faker.datatype.number({ max: 1000000, min: 0 }),
      filteredLikes:
        Math.random() > 0.3
          ? generateAccountShortResponseList(
              faker.datatype.number({ min: 1, max: 2 })
            )
          : null,
    },
    noOfShares: faker.datatype.number({ max: 10000, min: 0 }),
    timestamp: faker.date.past(5, Date()).getMilliseconds(),
    caption: faker.datatype.boolean()
      ? faker.lorem.words(faker.datatype.number({ min: 1, max: 15 }))
      : null,
    hashtags: Math.random() > 0.3 ? generateHashTagShortResponseList() : null,
    tags: Math.random() > 0.3 ? generateAccountShortResponseList() : null,
  };
}

export function generateImagePostResponseList(
  length: number = faker.datatype.number({ min: 4, max: 25 })
): ImagePostResponse[] {
  const list: ImagePostResponse[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateImagePostResponse());
  }

  return list;
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

export function generateKeyWords(): string[] {
  const list: string[] = [];
  list.push("all");
  for (let i = 0; i < faker.datatype.number({ min: 8, max: 16 }); i++) {
    list.push(faker.lorem.word(faker.datatype.number({ min: 4, max: 12 })));
  }

  return list;
}

export function generateVideoThumbnailResponse(): VideoThumbnailResponse {
  return {
    author: generateAccountMediumResponse(),
    duration: 30,
    noOfLikes: faker.datatype.number({ min: 0, max: 100000 }),
    noOfViews: faker.datatype.number({ min: 0, max: 1000000 }),
    thumbnail: generateMediaInfo(),
    title: faker.lorem.words(faker.datatype.number({ min: 3, max: 12 })),
    watchtime: Math.floor(30 * Math.random()),
    id: "video@" + faker.datatype.uuid(),
    timestamp: faker.date.past(1, Date()).getMilliseconds(),
  };
}

export function generateVideoThumbnailResponseList(
  length: number = faker.datatype.number({ min: 1, max: 8 })
): VideoThumbnailResponse[] {
  const list: VideoThumbnailResponse[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateVideoThumbnailResponse());
  }

  return list;
}

export function generateReplyResponse(): ReplyResponse {
  return {
    author: generateAccountShortResponse(),
    content: faker.lorem.words(faker.datatype.number({ min: 3, max: 50 })),
    hasLiked: faker.datatype.boolean(),
    id: "content@" + faker.datatype.uuid(),
    noOfLikes: faker.datatype.number({ min: 0, max: 2000 }),
    timestamp: faker.date.past(1, Date()).getMilliseconds(),
  };
}

export function generateReplyResponseList(
  length: number = faker.datatype.number({ min: 1, max: 16 })
): ReplyResponse[] {
  const list: ReplyResponse[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateReplyResponse());
  }

  return list;
}

export function generateCommentResponse(): CommentResponse {
  return {
    ...generateReplyResponse(),
    noOfReplies: faker.datatype.number({ min: 0, max: 2000 }),
  };
}

export function generateCommentResponseList(
  length: number = faker.datatype.number({ min: 1, max: 16 })
): CommentResponse[] {
  const list: CommentResponse[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateCommentResponse());
  }

  return list;
}

export function generateHashTagLongResponse(): HashTagLongResponse {
  return {
    id: "hashtag@" + faker.datatype.uuid(),
    isFollowing: faker.datatype.boolean(),
    name: "#" + faker.lorem.word(faker.datatype.number({ min: 5, max: 20 })),
    noOfUploads: faker.datatype.number({ min: 100, max: 1000000 }),
  };
}

export function generateHashTagLongResponseList(
  length: number = 16
): HashTagLongResponse[] {
  const list: HashTagLongResponse[] = [];

  for (let i = 0; i < length; i++) {
    list.push(generateHashTagLongResponse());
  }

  return list;
}
