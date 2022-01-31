import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { ListRenderItemInfo, StatusBar, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Account from "../../components/global/Account";
import ItemSeparator from "../../components/global/ItemSeparator";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import { useGetImagePostLikesQuery } from "../../store/imagePost/endpoint";
import {
  SIZE_REF_10,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";
import {
  AccountWithTimestampResponse,
  PostEngagementNavigatorParamList,
  RootStackNavigatorParamList,
} from "../../utility/types";

type LikeScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<PostEngagementNavigatorParamList, "LikeScreen">,
  StackScreenProps<RootStackNavigatorParamList>
>;

const keyExtractor = createKeyExtractor("comment");

const itemSeparatorCallback = () => (
  <ItemSeparator axis="horizontal" length={SIZE_REF_16} />
);

const LikeScreen = ({
  navigation,
  route: {
    params: { id, type },
  },
}: LikeScreenProps) => {
  const [screenInfo, setScreenInfo] = useState<{
    currentPageId?: number;
    skipRequest: boolean;
    data: AccountWithTimestampResponse[];
    currentPageLength?: number;
    noOfLikes?: number;
    query?: string;
  }>({ skipRequest: false, data: [] });

  const {
    likes,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    noOfLikes,
    currentPageId,
    currentPageLength,
    error,
  } = useGetImagePostLikesQuery(
    {
      userId: "roybond007",
      id,
      type,
      pageId: screenInfo.currentPageId ? screenInfo.currentPageId + 1 : 0,
      query: screenInfo.query,
    },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      skip: screenInfo.skipRequest,
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
          isError,
          isFetching,
          isLoading,
          isSuccess,
          isUninitialized,
          likes: currentData?.data.list,
          noOfLikes: currentData?.data.count,
          currentPageId: currentData?.meta.page.id,
          currentPageLength: currentData?.meta.page.length,
          error,
        };
      },
    }
  );

  useEffect(() => {
    if (likes) {
      setScreenInfo((info) => {
        return {
          ...info,
          data: [...info.data, ...likes],
          currentPageId: currentPageId,
          currentPageLength: currentPageLength,
          skipRequest: true,
          noOfComments: noOfLikes,
        };
      });
    }
  }, [likes, currentPageId, currentPageLength, noOfLikes]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<AccountWithTimestampResponse>) => {
      return <Account {...item} />;
    },
    []
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
      <FlatList
        data={screenInfo.data}
        renderItem={renderItem}
        style={styles.listStaticStyle}
        contentContainerStyle={styles.listContentContainerStaticStyle}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparatorCallback}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyComponentContainerStaticStyle}>
            <LoadingIndicator size={SIZE_REF_10 * 5} />
          </View>
        }
        ListFooterComponent={
          !screenInfo.skipRequest && screenInfo.data.length > 0 ? (
            <View style={styles.listFooterContainerStaticStyle}>
              <LoadingIndicator size={SIZE_REF_10 * 5} />
            </View>
          ) : undefined
        }
        extraData={screenInfo}
        removeClippedSubviews={true}
        maxToRenderPerBatch={16}
        updateCellsBatchingPeriod={32}
        initialNumToRender={16}
        windowSize={21}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listStaticStyle: {
    flex: 1,
    width: "100%",
  },
  listContentContainerStaticStyle: {
    alignItems: "center",
    paddingVertical: SIZE_REF_8,
  },
  emptyComponentContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: WINDOW_WIDTH,
    marginTop: WINDOW_WIDTH * 0.5,
  },
  listFooterContainerStaticStyle: {
    width: WINDOW_WIDTH,
    height: SIZE_REF_10 * 7,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LikeScreen;
