import { StackScreenProps } from "@react-navigation/stack";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { StatusBar, View } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CommentList from "../components/global/CommentList";
import { StackScreenHeader } from "../components/global/Header";
import Icon from "../components/global/Icon";
import Info from "../components/global/Info";
import AccountList from "../components/global/AccountList";
import TabList from "../components/global/TabList";
import { useGetCommentsQuery } from "../store/comment/endpoints";
import {
  useGetImagePostLikesQuery,
  useGetImagePostSharesQuery,
} from "../store/imagePost/endpoint";
import {
  HEADER_HEIGHT,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_6,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";
import { globalColors, globalLayouts } from "../utility/styles";
import {
  AccountMediumResponse,
  AccountWithTimestampResponse,
  CommentResponse,
  RootStackNavigatorParamList,
  TabListProps,
} from "../utility/types";
import { MediumText } from "../utility/ui";
import {
  useGetLikesQuery,
  useGetSharesQuery,
} from "../store/account/endpoints";
import NewIcon from "../components/global/NewIcon";

type PostEngagementScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "PostEngagementScreen"
>;

export interface PostEngagementScreenState {
  commentsTab: {
    skipRequest: boolean;
    currentPageId?: number;
    currentPageLength?: number;
    data: CommentResponse[];
    noOfComments?: number;
  };
  likesTab: {
    skipRequest: boolean;
    currentPageId?: number;
    currentPageLength?: number;
    data: AccountMediumResponse[];
    noOfLikes?: number;
  };
  sharesTab: {
    skipRequest: boolean;
    currentPageId?: number;
    currentPageLength?: number;
    data: AccountMediumResponse[];
    noOfShares?: number;
  };
}

export const postEngagementScreenStateGenerator =
  (): PostEngagementScreenState => {
    return {
      commentsTab: { data: [], skipRequest: true },
      likesTab: { data: [], skipRequest: true },
      sharesTab: { data: [], skipRequest: true },
    };
  };

const PostEngagementScreen = ({
  route: {
    params: { id, initialTabIndex, type },
  },
  navigation,
}: PostEngagementScreenProps) => {
  const [screenInfo, setScreenInfo] = useState<PostEngagementScreenState>(
    postEngagementScreenStateGenerator
  );

  const {
    comments,
    currentCommentPageId,
    currentCommentPageLength,
    isCommentError,
    isCommentFetching,
    isCommentLoading,
    isCommentSuccess,
    isCommentUninitialized,
    noOfComments,
  } = useGetCommentsQuery(
    {
      userId: "roybond007",
      id,
      type,
      pageId: screenInfo.commentsTab.currentPageId
        ? screenInfo.commentsTab.currentPageId + 1
        : 0,
    },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      skip: screenInfo.commentsTab.skipRequest,
      selectFromResult: ({
        isError,
        isFetching,
        isLoading,
        isSuccess,
        isUninitialized,
        currentData,
        error,
      }) => {
        return {
          isCommentError: isError,
          isCommentFetching: isFetching,
          isCommentLoading: isLoading,
          isCommentSuccess: isSuccess,
          isCommentUninitialized: isUninitialized,
          comments: currentData?.data.list,
          noOfComments: currentData?.data.count,
          currentCommentPageId: currentData?.meta.page.id,
          currentCommentPageLength: currentData?.meta.page.length,
        };
      },
    }
  );

  const {
    currentLikePageId,
    currentLikePageLength,
    isLikeError,
    isLikeFetching,
    isLikeLoading,
    isLikeSuccess,
    isLikeUninitialized,
    likes,
    noOfLikes,
  } = useGetLikesQuery(
    {
      id,
      type: "comment",
      userId: "roybond007",
      pageId: screenInfo.likesTab.currentPageId
        ? screenInfo.likesTab.currentPageId + 1
        : 0,
    },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      skip: screenInfo.likesTab.skipRequest,
      selectFromResult: ({
        isError,
        isFetching,
        isLoading,
        isSuccess,
        isUninitialized,
        currentData,
        error,
      }) => {
        return {
          isLikeError: isError,
          isLikeFetching: isFetching,
          isLikeLoading: isLoading,
          isLikeSuccess: isSuccess,
          isLikeUninitialized: isUninitialized,
          likes: currentData?.data.list,
          noOfLikes: currentData?.data.count,
          currentLikePageId: currentData?.meta.page.id,
          currentLikePageLength: currentData?.meta.page.length,
        };
      },
    }
  );

  const {
    currentSharePageId,
    currentSharePageLength,
    isShareError,
    isShareFetching,
    isShareLoading,
    isShareSuccess,
    isShareUninitialized,
    shares,
    noOfShares,
  } = useGetSharesQuery(
    {
      id,
      type: type,
      userId: "roybond007",
      pageId: screenInfo.likesTab.currentPageId
        ? screenInfo.likesTab.currentPageId + 1
        : 0,
    },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      skip: screenInfo.likesTab.skipRequest,
      selectFromResult: ({
        isError,
        isFetching,
        isLoading,
        isSuccess,
        isUninitialized,
        currentData,
        error,
      }) => {
        return {
          isShareError: isError,
          isShareFetching: isFetching,
          isShareLoading: isLoading,
          isShareSuccess: isSuccess,
          isShareUninitialized: isUninitialized,
          shares: currentData?.data.list,
          noOfShares: currentData?.data.count,
          currentSharePageId: currentData?.meta.page.id,
          currentSharePageLength: currentData?.meta.page.length,
        };
      },
    }
  );

  useEffect(() => {
    if (comments) {
      setScreenInfo((info) => {
        return {
          ...info,
          commentsTab: {
            data: [...info.commentsTab.data, ...comments],
            currentPageId: currentCommentPageId,
            currentPageLength: currentCommentPageLength,
            skipRequest: true,
            noOfComments: noOfComments
              ? noOfComments
              : info.commentsTab.noOfComments,
          },
        };
      });
    }
  }, [comments, currentCommentPageId, currentCommentPageLength, noOfComments]);

  useEffect(() => {
    if (likes) {
      setScreenInfo((info) => {
        return {
          ...info,
          likesTab: {
            data: [...info.likesTab.data, ...likes],
            skipRequest: false,
            noOfLikes: noOfLikes ? noOfLikes : info.likesTab.noOfLikes,
            currentPageId: currentLikePageId,
            currentPageLength: currentLikePageLength,
          },
        };
      });
    }
  }, [likes, currentLikePageId, currentLikePageLength, noOfLikes]);

  useEffect(() => {
    if (shares) {
      setScreenInfo((info) => {
        return {
          ...info,
          sharesTab: {
            data: [...info.sharesTab.data, ...shares],
            skipRequest: false,
            noOfShares: noOfShares ? noOfShares : info.sharesTab.noOfShares,
            currentPageId: currentSharePageId,
            currentPageLength: currentSharePageLength,
          },
        };
      });
    }
  }, [shares, currentSharePageId, currentSharePageLength, noOfShares]);

  const onGoBack = useCallback(() => {
    if (navigation.isFocused() && navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const headerChangeCallback = useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          navigation.setOptions({
            header: (props) => (
              <StackScreenHeader
                headerProps={props}
                hasSeparator={true}
                leftSideComponent={
                  <Info
                    picture={
                      <NewIcon
                        name="arrow-left"
                        size={SIZE_REF_12 * 2}
                        onTap={onGoBack}
                      />
                    }
                    textSize={SIZE_REF_6 * 3}
                    pictureGapSize={SIZE_REF_16}
                  >
                    {(size, color) => (
                      <MediumText
                        style={{ fontSize: size, lineHeight: size, color }}
                      >
                        {"Likes"}
                      </MediumText>
                    )}
                  </Info>
                }
              />
            ),
          });
          break;
        case 1:
          navigation.setOptions({
            header: (props) => (
              <StackScreenHeader
                headerProps={props}
                hasSeparator={true}
                leftSideComponent={
                  <Info
                    picture={
                      <NewIcon
                        name="arrow-left"
                        size={SIZE_REF_12 * 2}
                        onTap={onGoBack}
                      />
                    }
                    textSize={SIZE_REF_6 * 3}
                    pictureGapSize={SIZE_REF_16}
                  >
                    {(size, color) => (
                      <MediumText
                        style={{ fontSize: size, lineHeight: size, color }}
                      >
                        {"Comments"}
                      </MediumText>
                    )}
                  </Info>
                }
              />
            ),
          });
          break;
        case 2:
          navigation.setOptions({
            header: (props) => (
              <StackScreenHeader
                headerProps={props}
                hasSeparator={true}
                leftSideComponent={
                  <Info
                    picture={
                      <NewIcon
                        name="arrow-left"
                        size={SIZE_REF_12 * 2}
                        onTap={onGoBack}
                      />
                    }
                    textSize={SIZE_REF_6 * 3}
                    pictureGapSize={SIZE_REF_16}
                  >
                    {(size, color) => (
                      <MediumText
                        style={{ fontSize: size, lineHeight: size, color }}
                      >
                        {"Shares"}
                      </MediumText>
                    )}
                  </Info>
                }
              />
            ),
          });
          break;
      }
    },
    [navigation]
  );

  useLayoutEffect(() => {
    headerChangeCallback(initialTabIndex);
  }, [initialTabIndex]);

  const { top: safeAreaTop } = useSafeAreaInsets();
  const metricsTop = initialWindowMetrics?.insets.top
    ? initialWindowMetrics.insets.top
    : 0;
  const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

  const tabListChildrenCallback = useCallback<TabListProps["children"]>(
    (tab, index, width, height) => {
      switch (tab) {
        case "comments-list":
          return (
            <CommentList
              comments={screenInfo.commentsTab.data}
              noOfComments={screenInfo.commentsTab.noOfComments}
            />
          );

        case "likes-list":
          return <AccountList likes={screenInfo.likesTab.data} />;

        case "shares-list":
          return <AccountList likes={screenInfo.sharesTab.data} />;
      }
    },
    [screenInfo]
  );

  const onIndexChange = useCallback(
    (index: number) => {
      setScreenInfo((info) => ({
        ...info,
        commentsTab: {
          ...info.commentsTab,
          skipRequest:
            index === 1 && info.commentsTab.currentPageId === undefined
              ? false
              : info.commentsTab.skipRequest,
        },
        likesTab: {
          ...info.likesTab,
          skipRequest:
            (index && info.likesTab.currentPageId === undefined) === 0
              ? false
              : info.likesTab.skipRequest,
        },
        sharesTab: {
          ...info.sharesTab,
          skipRequest:
            (index && info.sharesTab.currentPageId === undefined) === 0
              ? false
              : info.sharesTab.skipRequest,
        },
      }));
      headerChangeCallback(index);
    },
    [setScreenInfo, screenInfo]
  );

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      <StatusBar
        animated={true}
        backgroundColor={"#FDFDFD"}
        barStyle={"dark-content"}
      />
      <TabList
        width={WINDOW_WIDTH}
        height={
          WINDOW_HEIGHT -
          (HEADER_HEIGHT + Math.max(safeAreaTop, metricsTop, statusBarHeight))
        }
        tabNames={["likes-list", "comments-list", "shares-list"]}
        focusedIndex={initialTabIndex}
        onIndexChange={onIndexChange}
      >
        {tabListChildrenCallback}
      </TabList>
    </SafeAreaView>
  );
};

export default PostEngagementScreen;
