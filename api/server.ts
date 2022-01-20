import { createServer } from "miragejs";
import {
  ApiFactory,
  ApiModel,
  ApiResponse,
  FeedData,
  FeedMeta,
  ImagePostDetails,
} from "../utility/types";
import {
  generateImagePostDetailsList,
  generateKeyWords,
} from "../utility/helpers";

export let server = createServer<ApiModel, ApiFactory>({
  routes() {
    // this.urlPrefix = "http://www.socialweb.in";
    this.timing = 2000;
    this.get("/images/feed", (_, request) => {
      const userId = request.queryParams["userid"];
      console.log(userId + " is requesting the image feed inital data");

      const response: ApiResponse<FeedMeta, FeedData<ImagePostDetails>> = {
        meta: {
          category: "feed",
          filter: { id: userId },
          type: "image",
          page: { id: 0, length: 12, noOfPages: 1000, size: 12 },
          keywords: generateKeyWords(),
        },
        data: { list: generateImagePostDetailsList(12) },
      };

      return response;
    });
  },
});
/*
    models: {
      // account: Model.extend<Partial<AccountEntity>>({
      //   uploads: {
      //     imagePosts: hasMany<entities>("imagePost"),
      //     videoPosts: hasMany<entities>("videoPost"),
      //     noOfUploads: 0,
      //   },
      //   saved: {
      //     imagePosts: hasMany<entities>("imagePost"),
      //     videoPosts: hasMany<entities>("videoPost"),
      //     hashtags: hasMany<entities>("hashtag"),
      //   },
      //   tagged: {
      //     imagePosts: hasMany<entities>("imagePost"),
      //     videoPosts: hasMany<entities>("videoPost"),
      //   },
      //   followers: {
      //     noOfFollowers: 0,
      //     list: [{ id: belongsTo<entities>("account"), timestamp: 0 }],
      //   },
      //   followings: {
      //     noOfFollowings: 0,
      //     list: [{ id: belongsTo<entities>("account"), timestamp: 0 }],
      //   },
      // }),
      // comment: Model.extend<Partial<CommentEntity>>({
      //   author: belongsTo<entities>("account"),
      //   likes: {
      //     noOfLikes: 0,
      //     list: [{ id: belongsTo<entities>("account"), timestamp: 0 }],
      //   },
      //   replies: {
      //     noOfReplies: 0,
      //     list: [
      //       {
      //         author: belongsTo<entities>("account"),
      //         likes: {
      //           noOfLikes: 0,
      //           list: [{ id: belongsTo<entities>("account"), timestamp: 0 }],
      //         },
      //         content: "",
      //         id: "",
      //         timestamp: 0,
      //       },
      //     ],
      //   },
      // }),
      // imagePost: Model.extend<Partial<ImagePostEntity>>({
      //   author: belongsTo<entities>("account"),
      //   comment: { noOfComments: 0, list: hasMany<entities>("comment") },
      //   hashtags: hasMany<entities>("hashtag"),
      //   likes: {
      //     noOfLikes: 0,
      //     list: [{ id: belongsTo<entities>("account"), timestamp: 0 }],
      //   },
      //   shares: {
      //     noOfShares: 0,
      //     list: [{ id: belongsTo<entities>("account"), timestamp: 0 }],
      //   },
      //   tags: hasMany<entities>("hashtag"),
      // }),
      // videoPost: Model.extend<Partial<VideoPostEntity>>({
      //   author: belongsTo<entities>("account"),
      //   comment: { noOfComments: 0, list: hasMany<entities>("comment") },
      //   hashtags: hasMany<entities>("hashtag"),
      //   likes: {
      //     noOfLikes: 0,
      //     list: [{ id: belongsTo<entities>("account"), timestamp: 0 }],
      //   },
      //   shares: {
      //     noOfShares: 0,
      //     list: [{ id: belongsTo<entities>("account"), timestamp: 0 }],
      //   },
      //   tags: hasMany<entities>("hashtag"),
      // }),
      // hashtag: Model.extend<Partial<HashTagEntity>>({
      //   saved: {
      //     noOfSaves: 0,
      //     list: [{ timestamp: 0, id: belongsTo<entities>("account") }],
      //   },
      //   uploads: {
      //     noOfUploads: 0,
      //     imagePosts: hasMany<entities>("imagePost"),
      //     videoPosts: hasMany<entities>("videoPost"),
      //   },
      // }),
    },
    factories: {
      //   account: Factory.extend<Partial<AccountEntity>>({
      //     bio() {
      //       const prob = Math.random();
      //       return prob > 0.3
      //         ? faker.lorem.words(faker.datatype.number({ min: 1, max: 200 }))
      //         : null;
      //     },
      //     id() {
      //       return "account@" + faker.datatype.uuid();
      //     },
      //     links() {
      //       const prob = Math.random();
      //       return prob > 0.3
      //         ? generateLinkList(faker.datatype.number({ min: 2, max: 16 }))
      //         : null;
      //     },
      //     profilePictureUri() {
      //       return faker.image.imageUrl(144, 144, undefined, true);
      //     },
      //     socialId() {
      //       return faker.name.firstName() + "@" + faker.name.lastName();
      //     },
      //     userame() {
      //       return faker.name.findName();
      //     },
      //     followers() {
      //       return {
      //         noOfFollowers: faker.datatype.number({ max: 100000, min: 0 }),
      //       };
      //     },
      //     followings() {
      //       return {
      //         noOfFollowings: faker.datatype.number({ max: 100000, min: 0 }),
      //       };
      //     },
      //     uploads() {
      //       return {
      //         noOfUploads: faker.datatype.number({ max: 1000, min: 0 }),
      //       };
      //     },
      //   }),
      //   comment: Factory.extend<Partial<CommentEntity>>({
      //     content() {
      //       return faker.lorem.words(faker.datatype.number({ min: 1, max: 100 }));
      //     },
      //     id() {
      //       return "comment@" + faker.datatype.uuid();
      //     },
      //     timestamp() {
      //       return faker.date.past(2, Date()).getMilliseconds();
      //     },
      //     likes() {
      //       return {
      //         noOfLikes: faker.datatype.number({ min: 0, max: 1000 }),
      //       };
      //     },
      //     replies() {
      //       return {
      //         noOfReplies: faker.datatype.number({ min: 0, max: 1000 }),
      //       };
      //     },
      //   }),
      //   imagePost: Factory.extend<Partial<ImagePostEntity>>({
      //     caption() {
      //       const prob = Math.random();
      //       return prob > 0.3
      //         ? faker.lorem.words(faker.datatype.number({ max: 100, min: 5 }))
      //         : null;
      //     },
      //     comment() {
      //       return {
      //         noOfComments: faker.datatype.number({ max: 10000, min: 1 }),
      //       };
      //     },
      //     contentType() {
      //       return "travel";
      //     },
      //     id() {
      //       return "imagePost@" + faker.datatype.uuid();
      //     },
      //     images() {
      //       return generateMediaInfoList(
      //         faker.datatype.number({ max: 12, min: 1 })
      //       );
      //     },
      //     timestamp() {
      //       return faker.date.past(2, Date()).getMilliseconds();
      //     },
      //     likes() {
      //       return {
      //         noOfLikes: faker.datatype.number({ max: 120000, min: 10 }),
      //       };
      //     },
      //     shares() {
      //       return {
      //         noOfShares: faker.datatype.number({ max: 10000, min: 3 }),
      //       };
      //     },
      //   }),
      //   videoPost: Factory.extend<Partial<VideoPostEntity>>({
      //     comment() {
      //       return {
      //         noOfComments: faker.datatype.number({ max: 10000, min: 1 }),
      //       };
      //     },
      //     contentType() {
      //       return "comedy";
      //     },
      //     id() {
      //       return "imagePost@" + faker.datatype.uuid();
      //     },
      //     timestamp() {
      //       return faker.date.past(2, Date()).getMilliseconds();
      //     },
      //     likes() {
      //       return {
      //         noOfLikes: faker.datatype.number({ max: 120000, min: 10 }),
      //       };
      //     },
      //     shares() {
      //       return {
      //         noOfShares: faker.datatype.number({ max: 10000, min: 3 }),
      //       };
      //     },
      //     description() {
      //       return faker.lorem.words(faker.datatype.number({ min: 10, max: 200 }));
      //     },
      //     thumbnail() {
      //       return generateMediaInfo();
      //     },
      //     title() {
      //       return faker.lorem.words(faker.datatype.number({ min: 3, max: 16 }));
      //     },
      //     preview() {
      //       const prob = Math.random();
      //       const prob2 = Math.random();
      //       return prob > 0.3
      //         ? { media: generateMediaInfo(), slice: prob2 > 0.5 ? [0, 10] : null }
      //         : null;
      //     },
      //     video() {
      //       const duration = faker.datatype.number(
      //         faker.datatype.number({ min: 30, max: 7200 })
      //       );
      //       return {
      //         duration,
      //         watchTime: duration * Math.random(),
      //         media: generateMediaInfo(),
      //       };
      //     },
      //   }),
      //   hashtag: Factory.extend<Partial<HashTagEntity>>({
      //     id() {
      //       return "hashtag@" + faker.datatype.uuid();
      //     },
      //     name() {
      //       return faker.lorem.word(faker.datatype.number({ min: 3, max: 20 }));
      //     },
      //     saved() {
      //       return { noOfSaves: faker.datatype.number({ min: 3, max: 200000 }) };
      //     },
      //     uploads() {
      //       return { noOfUploads: faker.datatype.number({ min: 3, max: 200000 }) };
      //     },
      //   }),
    },
    seeds: (server) => {},
*/
