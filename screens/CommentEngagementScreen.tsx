import { StackScreenProps } from "@react-navigation/stack";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AccountList from "../components/global/AccountList";
import { StackScreenHeader } from "../components/global/Header";
import Info from "../components/global/Info";
import NewIcon from "../components/global/NewIcon";
import ReplyList from "../components/global/ReplyList";
import TabList from "../components/global/TabList";
import { useGetLikesQuery } from "../store/account/endpoints";
import { useGetReplysQuery } from "../store/reply/endpoints";
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
  CommentResponse,
  ReplyResponse,
  RootStackNavigatorParamList,
  TabListProps,
} from "../utility/types";
import { MediumText } from "../utility/ui";

type CommentEngagementScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "CommentEngagementScreen"
>;

export interface CommentEngagementScreenState {
  replysTab: {
    skipRequest: boolean;
    currentPageId?: number;
    currentPageLength?: number;
    data: ReplyResponse[];
    noOfReplys?: number;
    targetComment?: CommentResponse;
  };
  likesTab: {
    skipRequest: boolean;
    currentPageId?: number;
    currentPageLength?: number;
    data: AccountMediumResponse[];
    noOfLikes?: number;
  };
}

export const postEngagementScreenStateGenerator =
  (): CommentEngagementScreenState => {
    return {
      replysTab: { data: [], skipRequest: true },
      likesTab: { data: [], skipRequest: true },
    };
  };

const CommentEngagementScreen = ({
  navigation,
  route: {
    params: { id, initialTabIndex },
  },
}: CommentEngagementScreenProps) => {
  const [screenInfo, setScreenInfo] = useState<CommentEngagementScreenState>(
    postEngagementScreenStateGenerator
  );

  const { top: safeAreaTop } = useSafeAreaInsets();
  const metricsTop = initialWindowMetrics?.insets.top
    ? initialWindowMetrics.insets.top
    : 0;
  const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

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
                        {"Replys"}
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

  const tabListChildrenCallback = useCallback<TabListProps["children"]>(
    (tab, index, width, height) => {
      switch (tab) {
        case "likes-list":
          return <AccountList likes={screenInfo.likesTab.data} />;
        case "replys-list":
          return (
            <ReplyList
              replys={screenInfo.replysTab.data}
              noOfReplys={screenInfo.replysTab.noOfReplys}
              targetComment={screenInfo.replysTab.targetComment}
            />
          );
      }
    },
    [screenInfo]
  );

  const onIndexChange = useCallback(
    (index: number) => {
      setScreenInfo((info) => ({
        ...info,
        likesTab: {
          ...info.likesTab,
          skipRequest:
            (index && info.likesTab.currentPageId === undefined) === 0
              ? false
              : info.likesTab.skipRequest,
        },
        replysTab: {
          ...info.replysTab,
          skipRequest:
            (index && info.replysTab.currentPageId === undefined) === 0
              ? false
              : info.replysTab.skipRequest,
        },
      }));
      headerChangeCallback(index);
    },
    [screenInfo, setScreenInfo]
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
    currentReplyPageId,
    currentReplyPageLength,
    isReplyError,
    isReplyFetching,
    isReplyLoading,
    isReplySuccess,
    isReplyUninitialized,
    noOfReplys,
    replys,
    targetComment,
  } = useGetReplysQuery(
    {
      id,
      userId: "roybond007",
      pageId: screenInfo.replysTab.currentPageId
        ? screenInfo.replysTab.currentPageId + 1
        : 0,
    },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      skip: screenInfo.replysTab.skipRequest,
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
          isReplyError: isError,
          isReplyFetching: isFetching,
          isReplyLoading: isLoading,
          isReplySuccess: isSuccess,
          isReplyUninitialized: isUninitialized,
          replys: currentData?.data.list,
          noOfReplys: currentData?.data.count,
          currentReplyPageId: currentData?.meta.page.id,
          currentReplyPageLength: currentData?.meta.page.length,
          targetComment: currentData?.data.comment,
        };
      },
    }
  );

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
    if (replys) {
      setScreenInfo((info) => {
        return {
          ...info,
          replysTab: {
            data: [...info.replysTab.data, ...replys],
            skipRequest: false,
            noOfReplys: noOfReplys ? noOfReplys : info.replysTab.noOfReplys,
            currentPageId: currentReplyPageId,
            currentPageLength: currentReplyPageLength,
            targetComment: targetComment
              ? targetComment
              : info.replysTab.targetComment,
          },
        };
      });
    }
  }, [
    replys,
    currentReplyPageId,
    currentReplyPageLength,
    noOfReplys,
    targetComment,
  ]);

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
        tabNames={["likes-list", "replys-list"]}
        focusedIndex={initialTabIndex}
        onIndexChange={onIndexChange}
      >
        {tabListChildrenCallback}
      </TabList>
    </SafeAreaView>
  );
};

export default CommentEngagementScreen;
