import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import RootStackNavigator from "./navigations/RootStackNavigator";
import { createServer } from "miragejs";
import {
  AccountWithTimestampResponse,
  ApiResponse,
  CommentResponse,
  FeedData,
  FeedMeta,
  ImagePostResponse,
  ListResponseMetaData,
  PostType,
  VideoThumbnailResponse,
} from "./utility/types";
import {
  generateAccountWithTimestampResponseList,
  generateCommentResponseList,
  generateImagePostResponseList,
  generateKeyWords,
  generateVideoThumbnailResponseList,
} from "./utility/helpers";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

enableScreens(true);

const server = createServer({
  routes() {
    this.timing = 2000;
    this.get("/images/feed", (_, request) => {
      const userId = request.queryParams["userid"];
      const pageId = request.queryParams["pageid"];
      const keyword = request.queryParams["keyword"];

      const response: ApiResponse<FeedMeta, FeedData<ImagePostResponse>> = {
        meta: {
          category: "feed",
          filter: { id: userId },
          type: "image",
          page: {
            id: !pageId || pageId === "" ? 0 : parseInt(pageId),
            length: 12,
            noOfPages: 1000,
            size: 12,
          },
          keywords: !keyword || keyword === "" ? generateKeyWords() : undefined,
        },
        data: { list: generateImagePostResponseList(12) },
      };

      return response;
    });
    this.get("/videos/feed", (_, request) => {
      const userId = request.queryParams["userid"];
      const pageId = request.queryParams["pageid"];
      const keyword = request.queryParams["keyword"];

      const response: ApiResponse<
        FeedMeta,
        FeedData<VideoThumbnailResponse>
      > = {
        meta: {
          category: "feed",
          filter: { id: userId },
          type: "image",
          page: {
            id: !pageId || pageId === "" ? 0 : parseInt(pageId),
            length: 12,
            noOfPages: 1000,
            size: 12,
          },
          keywords: !keyword || keyword === "" ? generateKeyWords() : undefined,
        },
        data: { list: generateVideoThumbnailResponseList(6) },
      };

      return response;
    });
    this.get("/comments/:type", (_, request) => {
      const postType = request.params["type"];
      const id = request.queryParams["id"];
      const pageId = request.queryParams["pageid"];
      const userId = request.queryParams["userid"];
      const respose: ApiResponse<
        ListResponseMetaData<PostType>,
        { list: CommentResponse[]; count: number }
      > = {
        meta: {
          category: postType === "imagepost" ? "image-post" : "video-post",
          page: {
            id: parseInt(pageId),
            length: 16,
            noOfPages: 1000,
            size: 16,
          },
          type: "comment",
          params: {
            id: id,
            pageId: pageId,
            userId: userId,
          },
        },
        data: {
          list: generateCommentResponseList(16),
          count: 2500,
        },
      };

      return respose;
    });
    this.get("/likes/:type", (_, request) => {
      const postType = request.params["type"];
      const id = request.queryParams["id"];
      const pageId = request.queryParams["pageid"];
      const userId = request.queryParams["userid"];
      const query = request.queryParams["query"];

      const response: ApiResponse<
        ListResponseMetaData<PostType>,
        { list: AccountWithTimestampResponse[]; count: number }
      > = {
        meta: {
          category: "image-post",
          page: {
            id: parseInt(pageId),
            length: 16,
            noOfPages: 1000,
            size: 16,
          },
          type: "account",
          params: {
            id: id,
            pageId: pageId,
            userId: userId,
            query: query,
          },
        },
        data: {
          count: 2500,
          list: generateAccountWithTimestampResponseList(16),
        },
      };

      return response;
    });
    this.get("/shares/:type", (_, request) => {
      const postType = request.params["type"];
      const id = request.queryParams["id"];
      const pageId = request.queryParams["pageid"];
      const userId = request.queryParams["userid"];
      const query = request.queryParams["query"];

      const response: ApiResponse<
        ListResponseMetaData<PostType>,
        { list: AccountWithTimestampResponse[]; count: number }
      > = {
        meta: {
          category: "image-post",
          page: {
            id: parseInt(pageId),
            length: 16,
            noOfPages: 1000,
            size: 16,
          },
          type: "account",
          params: {
            id: id,
            pageId: pageId,
            userId: userId,
            query: query,
          },
        },
        data: {
          count: 2500,
          list: generateAccountWithTimestampResponseList(16),
        },
      };

      return response;
    });
  },
});

//takes a list of font family records and loads them all asynchronously
const loadFontsAsync = (fontList: Record<string, Font.FontSource>[]) => {
  return fontList.map((font) => Font.loadAsync(font));
};

const App = () => {
  // boolean state that decides whether the app has loaded all of its assests and ready to render the screens
  const [isAppReady, setAppReady] = useState(false);

  // this effect runs at the startup of the app and asynchronously loads all the static resources of the app
  // like fonts for now
  useEffect(() => {
    const prepareApp = async () => {
      try {
        //preparing all the font family needed to render the app
        const appTextFonts: Record<string, Font.FontSource> = {
          "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
          "roboto-black-italic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
          "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
          "roboto-bold-italic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
          "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
          "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
          "roboto-light-italic": require("./assets/fonts/Roboto-LightItalic.ttf"),
          "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "roboto-medium-italic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
          "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "roboto-thin": require("./assets/fonts/Roboto-Thin.ttf"),
          "roboto-thin-italic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
          icons: require("./assets/fonts/icons.ttf"),
        };

        //enable the splash screen to render while assets are loading
        await SplashScreen.preventAutoHideAsync();
        //calling the function that loads the fonts asin
        await Promise.all(loadFontsAsync([appTextFonts]));
      } catch (error) {
        console.warn("something went wrong while loading the app assest");
        console.warn(error);
      } finally {
        setAppReady(true);
      }
    };

    //call the function to prepare the load the app assests
    prepareApp();
  }, []);

  // callback that will be invoked when the app is mounted for the first time
  const appReadyCallback = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  // if the app is not ready return null the splash screen will take care of every thing else
  if (!isAppReady) {
    return null;
  }

  return (
    <Provider store={appStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer onReady={appReadyCallback}>
          <RootStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
