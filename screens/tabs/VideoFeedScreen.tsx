import React, { useCallback, useEffect, useState } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankScreenPlaceHolder from "../../components/global/BlankScreenPlaceHolder";
import HighlightedItem from "../../components/global/HighlightedItem";
import ItemSeparator from "../../components/global/ItemSeparator";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import RoundedIcon from "../../components/global/RoundedIcon";
import VideoCollection from "../../components/global/VideoCollection";
import { getVideoPostFeedThunk } from "../../store/appData/reducer";
import {
  selectVideoFeedIds,
  selectVideoFeedState,
} from "../../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import {
  SHUTTER_HEIGHT,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { globalColors, globalLayouts } from "../../utility/styles";

const keyExtractor = createKeyExtractor("suggested-keywords");

const renderItem = (item: ListRenderItemInfo<string>) => {
  return <HighlightedItem text={item.item} size={SIZE_REF_14} type="outline" />;
};

const itemSeparator = () => {
  return <ItemSeparator axis="vertical" length={SIZE_REF_8} />;
};

const VideoFeedScreen = () => {
  const [isInitialRequest, setInitialRequest] = useState<boolean>(false);

  const state = useAppSelector(selectVideoFeedState);

  const idList = useAppSelector(selectVideoFeedIds);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const prepare = async () => {
      setInitialRequest(true);
      await dispatch(getVideoPostFeedThunk({ initRequest: true }));
      setInitialRequest(false);
    };
    prepare();
  }, [dispatch]);

  const onEndReachCallback = useCallback(() => {
    dispatch(getVideoPostFeedThunk({ initRequest: false }));
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      {isInitialRequest ? (
        <LoadingIndicator color="black" size={SIZE_REF_10 * 4} />
      ) : !idList || idList.length === 0 ? (
        state === "failure" ? (
          <RoundedIcon
            name="chevron-down"
            backgroundColor="transparent"
            scale={0.7}
            size={SIZE_REF_10 * 4}
            style={{ borderWidth: StyleSheet.hairlineWidth }}
          />
        ) : (
          <BlankScreenPlaceHolder
            icon="video-outline"
            text="no videos availabel"
          />
        )
      ) : (
        <VideoCollection
          ids={idList}
          dataState={state}
          onEndReach={onEndReachCallback}
          headerComponent={
            <View style={styles.suggestionContainerStaticStyle}>
              <FlatList
                data={[
                  "music",
                  "comedy",
                  "arijit singh",
                  "funny",
                  "vines",
                  "arijit singh",
                  "funny",
                  "vines",
                  "arijit singh",
                  "funny",
                  "vines",
                  "arijit singh",
                  "funny",
                  "vines",
                ]}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.suggestionListStaticStyle}
                contentContainerStyle={
                  styles.suggestionListContentContainerStaticStyle
                }
                ItemSeparatorComponent={itemSeparator}
              />
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  suggestionListStaticStyle: {
    flex: 1,
    width: "100%",
  },
  suggestionListContentContainerStaticStyle: {
    paddingHorizontal: SIZE_REF_8,
    alignItems: "center",
  },
  suggestionContainerStaticStyle: {
    width: WINDOW_WIDTH,
    height: SIZE_REF_12 * 2 + SIZE_REF_14 + 2 * SIZE_REF_14 * 0.47 + 2,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SIZE_REF_16,
    paddingBottom: SIZE_REF_8,
  },
});

export default VideoFeedScreen;
