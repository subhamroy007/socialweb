import React from "react";
import { ListRenderItemInfo, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import HighlightedItem from "../components/global/HighlightedItem";
import ImageList from "../components/global/ImageList";
import ItemSeparator from "../components/global/ItemSeparator";
import LoadingIndicator from "../components/global/LoadingIndicator";
import RoundedIcon from "../components/global/RoundedIcon";
import { useGetImagePostFeedDataQuery } from "../store/imagePost/endpoint";

import {
  SIZE_REF_10,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../utility/constants";
import { createKeyExtractor } from "../utility/helpers";

import { globalColors, globalLayouts } from "../utility/styles";

const keyExtractor = createKeyExtractor("image-post");

const renderItem = (item: ListRenderItemInfo<string>) => {
  return <HighlightedItem text={item.item} type="outline" />;
};

const itemSeparatorCallback = () => (
  <ItemSeparator axis="vertical" length={SIZE_REF_8} />
);

const NewImageFeedScreen = () => {
  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    error,
    currentData,
  } = useGetImagePostFeedDataQuery(
    { userId: "" },
    {
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
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
          currentData: currentData?.meta.keywords,
          error,
        };
      },
    }
  );

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalColors.screenColor, globalLayouts.screenLayout]}
    >
      {(isUninitialized || isLoading) && (
        <LoadingIndicator size={SIZE_REF_10 * 5} color="#1F1F1F" />
      )}
      {isError && (
        <RoundedIcon
          name="chevron-down"
          backgroundColor="transparent"
          scale={0.7}
          size={SIZE_REF_10 * 4}
          style={styles.retryIconStaticStyle}
        />
      )}
      {isSuccess && (
        <ImageList
          headerComponent={
            <FlatList
              data={currentData}
              style={styles.suggestionListStaticStyle}
              contentContainerStyle={
                styles.suggestionListContentContainerStaticStyle
              }
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={itemSeparatorCallback}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  suggestionListStaticStyle: {
    width: WINDOW_WIDTH,
    height: SIZE_REF_14 + 2 * 0.47 * SIZE_REF_14,
    marginTop: SIZE_REF_16,
    marginBottom: SIZE_REF_8,
  },
  suggestionListContentContainerStaticStyle: {
    paddingHorizontal: SIZE_REF_8,
    alignItems: "center",
  },
  retryIconStaticStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
  },
});

export default NewImageFeedScreen;

// const dispatch = useAppDispatch();

// const {
//   error,
//   ids,
//   keywords,
//   selectedKeyWord,
//   state,
//   selectedKeyWordDataState,
// } = useAppSelector(selectImageFeedScreenData, shallowEqual);
// useEffect(() => {
//   dispatch(getImagePostFeedThunk());
// }, [dispatch]);

// const endReachCallback = useCallback(() => {
//   dispatch(
//     getImagePostDetailsThunk({
//       category: "feed",
//       filter: selectedKeyWord as string,
//       initialRequest: false,
//     })
//   );
// }, [selectedKeyWord]);

// const renderItem = useCallback(
//   (item: ListRenderItemInfo<string>) => {
//     return (
//       <KeyWord
//         focused={item.item === selectedKeyWord}
//         postType="imagePost"
//         keyword={item.item}
//       />
//     );
//   },
//   [selectedKeyWord]
// );

// useEffect(() => {
//   if (!selectedKeyWordDataState && selectedKeyWord !== "all") {
//     dispatch(
//       getImagePostDetailsThunk({
//         category: "feed",
//         filter: selectedKeyWord as string,
//         initialRequest: true,
//       })
//     );
//   }
// }, [selectedKeyWord, selectedKeyWordDataState]);

// return (
//   <SafeAreaView
//     edges={["left", "right"]}
//     style={[globalLayouts.screenLayout, globalColors.screenColor]}
//   >
//     {(!state || state === "loading") && (
//       <LoadingIndicator color="black" size={SIZE_REF_10 * 4} />
//     )}
//     {state === "failure" && (!ids || ids.length === 0) && (
//       <RoundedIcon
//         name="chevron-down"
//         backgroundColor="transparent"
//         scale={0.7}
//         size={SIZE_REF_10 * 4}
//         style={styles.retryIconStaticStyle}
//       />
//     )}
//     {state === "success" && (
//       <ImageList
//         ids={ids}
//         dataState={selectedKeyWordDataState}
//         extraData={{ selectedKeyWord }}
//         onEndReach={endReachCallback}
//         headerComponent={
//           <FlatList
//             data={keywords}
//             renderItem={renderItem}
//             keyExtractor={keyExtractor}
//             style={styles.suggestionListStaticStyle}
//             contentContainerStyle={
//               styles.suggestionListContentContainerStaticStyle
//             }
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             ItemSeparatorComponent={itemSeparatorCallback}
//             extraData={selectedKeyWord}
//           />
//         }
//       />
//     )}
//   </SafeAreaView>
// );
