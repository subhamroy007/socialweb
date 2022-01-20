import { StackScreenProps } from "@react-navigation/stack";
import { Video } from "expo-av";
import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Info from "../components/global/EntityInfo";
import HighlightedContent from "../components/global/HighlightedItem";
import ItemSeparator from "../components/global/ItemSeparator";
import {
  PlaceHolder,
  VideoPostScreenPlaceHolder,
} from "../components/global/placeholders";
import RoundedIcon from "../components/global/RoundedIcon";
import VideoPlayer from "../components/videoPost/VIdeoPlayer";
import useVideoResizer from "../hooks/useVideoResizer";
import { getVideoPostThunk } from "../store/appData/reducer";
import { selectVideoPostState } from "../store/appData/selector";
import { restoreVideoPost } from "../store/appData/slice";
import { RootState, useAppDispatch, useAppSelector } from "../store/appStore";
import {
  selectUserNoOfFollowers,
  selectUserSocialId,
} from "../store/user/selector";
import {
  selectVideoPostAuhor,
  selectVideoPostCommentCount,
  selectVideoPostDescription,
  selectVideoPostHashTags,
  selectVideoPostIsLiked,
  selectVideoPostIsSaved,
  selectVideoPostLikeCount,
  selectVideoPostMedia,
  selectVideoPostShareCount,
  selectVideoPostThumbnail,
  selectVideoPostTimestamp,
  selectVideoPostTitle,
  selectVideoPostViewCount,
  selectVideoPostWatchTime,
} from "../store/videoPost/selectors";
import {
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_2,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";
import {
  countAbbreviator,
  createKeyExtractor,
  dateString,
  timeFormatter,
} from "../utility/helpers";
import { globalColors, globalLayouts } from "../utility/styles";
import { RootStackNavigatorParamList } from "../utility/types";
import { InfoProps, MediaInfo, VideoPost } from "../utility/types";
import { ConfiguredFlatList, MediumText, RegularText } from "../utility/ui";
import * as ScreenOrientation from "expo-screen-orientation";
import { shallowEqual } from "react-redux";

const renderItem = (item: ListRenderItemInfo<string>) => {
  return (
    <HighlightedContent style={styles.hashTagStaticStyle}>
      {item.item}
    </HighlightedContent>
  );
};

const keyExtractor = createKeyExtractor("hashtag");

type VideoPostScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "VideoPostScreen"
>;

const VideoPostScreen = ({
  route: {
    params: { id },
  },
}: VideoPostScreenProps) => {
  //extract the state of the screen to conditionally render the place holder UI
  const state = useAppSelector(selectVideoPostState);

  //dispatcher to dispatch thunk and acton
  const dispatch = useAppDispatch();

  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const videoPostViewCount = selectVideoPostViewCount(state, id);
      const videoPostTimeStamp = selectVideoPostTimestamp(state, id);
      const videoPostThumbnail = selectVideoPostThumbnail(state, id);
      const videoPostHashTags = selectVideoPostHashTags(state, id);

      const videoPostDescription = selectVideoPostDescription(state, id);
      const authorId = selectVideoPostAuhor(state, id);
      const authorSocialId = selectUserSocialId(state, authorId as string);
      const authorFollowerCount = selectUserNoOfFollowers(
        state,
        authorId as string
      );

      return {
        videoPostViewCount,
        videoPostTimeStamp,
        videoPostThumbnail,
        videoPostHashTags,
        videoPostDescription,
        authorId,
        authorSocialId,
        authorFollowerCount,
      };
    },
    [id]
  );

  const mutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const videoPostLikeCount = selectVideoPostLikeCount(state, id);
      const videoPostCommentCount = selectVideoPostCommentCount(state, id);
      const videoPostShareCount = selectVideoPostShareCount(state, id);
      const videoPostIsSaved = selectVideoPostIsSaved(state, id);
      const videoPostIsLiked = selectVideoPostIsLiked(state, id);

      return {
        videoPostLikeCount,
        videoPostCommentCount,
        videoPostShareCount,
        videoPostIsSaved,
        videoPostIsLiked,
      };
    },
    [id]
  );

  const thumbnailDataSelectorCallback = useCallback(
    (state: RootState) => {
      const videoPostWatchTime = selectVideoPostWatchTime(state, id);
      const videoPostTitle = selectVideoPostTitle(state, id);
      const media = selectVideoPostMedia(state, id);
      let videoPostMedia: undefined | VideoPost["video"];
      if (media) {
        const mediaInfo: MediaInfo = {
          url: media.info.url as string,
          ...useVideoResizer(
            {
              max: WINDOW_WIDTH,
              min: WINDOW_WIDTH,
              original: media.info.width as number,
            },
            {
              max: WINDOW_HEIGHT * 0.65,
              min: WINDOW_HEIGHT * 0.35,
              original: media.info.height as number,
            }
          ),
        };
        videoPostMedia = {
          ...media,
          info: mediaInfo,
        };
      }

      return { videoPostMedia, videoPostTitle, videoPostWatchTime };
    },
    [id]
  );

  const {
    authorFollowerCount,
    authorId,
    authorSocialId,
    videoPostDescription,
    videoPostHashTags,
    videoPostThumbnail,
    videoPostTimeStamp,
    videoPostViewCount,
  } = useAppSelector(immutableDataSelectorCallback, (left, right) => {
    if (!left.videoPostDescription && right.videoPostDescription) {
      return false;
    }
    return true;
  });

  const {
    videoPostCommentCount,
    videoPostIsLiked,
    videoPostIsSaved,
    videoPostLikeCount,
    videoPostShareCount,
  } = useAppSelector(mutableDataSelectorCallback, shallowEqual);

  const { videoPostMedia, videoPostTitle, videoPostWatchTime } = useAppSelector(
    thumbnailDataSelectorCallback,
    (left, right) => {
      if (!left.videoPostWatchTime && right.videoPostWatchTime) {
        return false;
      }
      return true;
    }
  );

  //each time the screen is rendered or the id value changes dynamically run the function that
  //dispatches a request to server for new data and when the screen unmounts or id changes
  //sscreen state is restored so thst it can be used in consecutive re-renders
  useEffect(() => {
    const promise = dispatch(getVideoPostThunk({ id }));
    return () => {
      promise.abort();
      dispatch(restoreVideoPost());
    };
  }, [id]);

  //reference to be used in the video player
  const videoRef = useRef<Video>(null);

  const primaryTextRenderCallback = useCallback<InfoProps["children"]>(
    (style) => <MediumText style={style}>{authorSocialId}</MediumText>,
    [authorSocialId]
  );

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.defaultViewColor]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.listStaticStyle}
        contentContainerStyle={styles.listContentContainerStaticStyle}
      >
        <View style={styles.videoPlayerContaierStaticStyle}>
          {/*the placeholder ui for video player does not depend on the fullscreen mode because
          there is no chance that a video can be accessed directly in fullscreen mode*/}

          {videoPostMedia ? (
            <VideoPlayer
              hasControls={true}
              media={videoPostMedia.info}
              videoRef={videoRef}
            />
          ) : (
            <PlaceHolder
              width={WINDOW_WIDTH}
              height={0.35 * WINDOW_HEIGHT}
              color="black"
            />
          )}
        </View>

        {/*the followin gsection is dedicated to render the metadata associated with the video post
        it will render only when the fullscreen mode is not active*/}
        <View style={styles.metaDataContainerStaticStyle}>
          {!videoPostTitle && (
            <PlaceHolder
              width={WINDOW_WIDTH - 2 * SIZE_REF_8}
              height={0.04 * WINDOW_HEIGHT}
            />
          )}
          {state === "idle/success" &&
            videoPostHashTags &&
            videoPostHashTags.length > 0 && (
              <ConfiguredFlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={videoPostHashTags}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={
                  styles.hashTagListContentContainerStaticStyle
                }
                style={styles.hashTagListStaticStyle}
              />
            )}
          {videoPostTitle && (
            <MediumText style={styles.titleTextStaticStyle}>
              {videoPostTitle}
            </MediumText>
          )}

          {state === "idle/success" && (
            <>
              <View style={styles.viewTimestampPairContainerStaticStyle}>
                <RegularText style={styles.primaryTextStaticStyle}>
                  {countAbbreviator(videoPostViewCount as number)} Views
                </RegularText>
                <RegularText
                  style={[styles.primaryTextStaticStyle, styles.horizontalGap]}
                >
                  {dateString(videoPostTimeStamp as number) +
                    ", " +
                    timeFormatter(videoPostTimeStamp as number)}
                </RegularText>
              </View>

              <ItemSeparator
                axis="horizontal"
                length={1}
                style={styles.separatorStaticStyle}
              />
              <View style={styles.iconContainerStaticStyle}>
                <View style={styles.iconTextPairStaticStyle}>
                  <RoundedIcon
                    color={videoPostIsLiked ? "#EE3434" : "black"}
                    name={videoPostIsLiked ? "heart-solid" : "heart-outline"}
                    size={0.12 * WINDOW_WIDTH}
                    scale={0.7}
                  />
                  <RegularText style={styles.secondaryTextStaticStyle}>
                    {countAbbreviator(videoPostLikeCount as number)}
                  </RegularText>
                </View>
                <View style={styles.iconTextPairStaticStyle}>
                  <RoundedIcon
                    color="black"
                    name="comment-outline"
                    size={0.12 * WINDOW_WIDTH}
                    scale={0.7}
                  />
                  <RegularText style={styles.secondaryTextStaticStyle}>
                    {countAbbreviator(videoPostCommentCount as number)}
                  </RegularText>
                </View>
                <View style={styles.iconTextPairStaticStyle}>
                  <RoundedIcon
                    color="black"
                    name="send"
                    size={0.12 * WINDOW_WIDTH}
                    scale={0.7}
                  />
                  <RegularText style={styles.secondaryTextStaticStyle}>
                    {countAbbreviator(videoPostShareCount as number)}
                  </RegularText>
                </View>
                <RoundedIcon
                  color="black"
                  name={
                    videoPostIsSaved ? "bookmark-solid" : "bookmark-outline"
                  }
                  size={0.12 * WINDOW_WIDTH}
                  scale={0.7}
                />
              </View>

              <Info
                secondaryText={
                  countAbbreviator(authorFollowerCount as number) + " followers"
                }
                pictureSize={4 * SIZE_REF_10}
                name={authorId as string}
                textSize={SIZE_REF_12}
                gapSize={SIZE_REF_4}
                type="user"
                style={styles.authorInfoContainerStaticStyle}
              >
                {primaryTextRenderCallback}
              </Info>

              {videoPostDescription && (
                <>
                  <ItemSeparator
                    axis="horizontal"
                    length={1}
                    style={styles.separatorStaticStyle}
                  />
                  <RegularText style={styles.descriptionTextStaticStyle}>
                    {videoPostDescription}
                  </RegularText>
                </>
              )}
            </>
          )}
          {state !== "idle/success" && <VideoPostScreenPlaceHolder />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoPlayerContaierStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  separatorStaticStyle: {
    width: WINDOW_WIDTH - 2 * SIZE_REF_8,
    backgroundColor: "#EBE8FB",
    marginBottom: SIZE_REF_8,
    alignSelf: "center",
  },
  authorInfoContainerStaticStyle: {
    marginBottom: SIZE_REF_8,
    marginLeft: 0.1004 * WINDOW_WIDTH,
  },
  viewTimestampPairContainerStaticStyle: {
    marginBottom: SIZE_REF_8,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZE_REF_8,
  },
  primaryTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_12,
  },
  descriptionTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_6 * 3,
    marginHorizontal: SIZE_REF_8,
  },
  secondaryTextStaticStyle: {
    fontSize: SIZE_REF_10 + SIZE_REF_1,
    lineHeight: SIZE_REF_10 + SIZE_REF_1,
    marginTop: SIZE_REF_4,
  },
  horizontalGap: {
    marginLeft: SIZE_REF_16 * 2,
  },
  titleTextStaticStyle: {
    fontSize: SIZE_REF_14 + SIZE_REF_1,
    lineHeight: SIZE_REF_16 + 1,
    marginHorizontal: SIZE_REF_8,
    marginBottom: SIZE_REF_16,
  },
  hashTagListStaticStyle: {
    marginBottom: SIZE_REF_6,
  },
  hashTagListContentContainerStaticStyle: {
    paddingVertical: 0,
  },
  listStaticStyle: {
    width: "100%",
    flex: 1,
  },
  listContentContainerStaticStyle: {
    width: "100%",
  },
  metaDataContainerStaticStyle: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: SIZE_REF_8,
  },

  hashTagStaticStyle: { marginRight: SIZE_REF_8 },
  iconContainerStaticStyle: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginBottom: SIZE_REF_16,
  },
  iconTextPairStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VideoPostScreen;
