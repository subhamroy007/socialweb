import { StackScreenProps } from "@react-navigation/stack";
import { Video } from "expo-av";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  HandlerStateChangeEvent,
  ScrollView,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { shallowEqual } from "react-redux";
import Info from "../components/global/EntityInfo";
import Icon from "../components/global/Icon";
import LoadingIndicator from "../components/global/LoadingIndicator";
import RoundedIcon from "../components/global/RoundedIcon";
import VideoOverlay from "../components/videoPost/VideoOverlay";
import VideoPlayer from "../components/videoPost/VIdeoPlayer";
import { getVideoPreviewThunk } from "../store/appData/reducer";
import { selectVideoPreviewState } from "../store/appData/selector";
import { restoreVideoPreview } from "../store/appData/slice";
import { RootState, useAppDispatch, useAppSelector } from "../store/appStore";
import {
  selectUserNoOfFollowers,
  selectUserSocialId,
} from "../store/user/selector";
import {
  selectVideoPostAuhor,
  selectVideoPostDescription,
  selectVideoPostIsSaved,
  selectVideoPostLikeCount,
  selectVideoPostPreview,
  selectVideoPostTimestamp,
  selectVideoPostTitle,
  selectVideoPostViewCount,
} from "../store/videoPost/selectors";
import {
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants";
import { countAbbreviator, timeElapsed } from "../utility/helpers";
import { globalLayouts } from "../utility/styles";
import { RootStackNavigatorParamList } from "../utility/types";
import { InfoProps, MediaInfo } from "../utility/types";
import { MediumText, RegularText } from "../utility/ui";

type VideoPreviewScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "VideoPreviewScreen"
>;

const VideoPreviewScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: VideoPreviewScreenProps) => {
  const dispatch = useAppDispatch();

  const state = useAppSelector(selectVideoPreviewState);

  useEffect(() => {
    const promise = dispatch(getVideoPreviewThunk({ id }));

    return () => {
      promise.abort("screen unmounted");
      dispatch(restoreVideoPreview());
    };
  }, [id]);

  // const videoPreviewInfoSelectorCallback = useCallback(
  //   (state: RootState) => {
  //     const preview = selectVideoPostPreview(state, id);
  //     const title = selectVideoPostTitle(state, id);
  //     const viewCount = selectVideoPostViewCount(state, id);
  //     const likeCount = selectVideoPostLikeCount(state, id);
  //     const timestamp = selectVideoPostTimestamp(state, id);
  //     const isSaved = selectVideoPostIsSaved(state, id);
  //     const description = selectVideoPostDescription(state, id);
  //     return {
  //       preview,
  //       title,
  //       viewCount,
  //       likeCount,
  //       timestamp,
  //       isSaved,
  //       description,
  //     };
  //   },
  //   [id]
  // );

  // const userInfoSelectorCallback = useCallback(
  //   (state: RootState) => {
  //     const authorId = selectVideoPostAuhor(state, id);
  //     const socialId = selectUserSocialId(state, authorId!);
  //     const noOfFollowers = selectUserNoOfFollowers(state, authorId!);
  //     return { authorId, socialId, noOfFollowers };
  //   },
  //   [id]
  // );

  // const {
  //   description,
  //   isSaved,
  //   likeCount,
  //   preview,
  //   timestamp,
  //   title,
  //   viewCount,
  // } = useAppSelector(videoPreviewInfoSelectorCallback, previewComparator);

  // const { authorId, noOfFollowers, socialId } = useAppSelector(
  //   userInfoSelectorCallback,
  //   shallowEqual
  // );

  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const preview = selectVideoPostPreview(state, id);
      const title = selectVideoPostTitle(state, id);
      const viewCount = selectVideoPostViewCount(state, id);
      const likeCount = selectVideoPostLikeCount(state, id);
      const timestamp = selectVideoPostTimestamp(state, id);
      const description = selectVideoPostDescription(state, id);
      const authorId = selectVideoPostAuhor(state, id);
      const socialId = selectUserSocialId(state, authorId as string);
      const noOfFollowers = selectUserNoOfFollowers(state, authorId as string);

      return {
        preview,
        title,
        viewCount,
        likeCount,
        timestamp,
        description,
        authorId,
        socialId,
        noOfFollowers,
      };
    },
    [id]
  );

  const mutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const isSaved = selectVideoPostIsSaved(state, id);
      return { isSaved };
    },
    [id]
  );

  const {
    authorId,
    description,
    likeCount,
    noOfFollowers,
    preview,
    socialId,
    timestamp,
    title,
    viewCount,
  } = useAppSelector(immutableDataSelectorCallback, (left, right) => {
    if (!left.description && right.description) {
      return false;
    }
    return true;
  });

  const { isSaved } = useAppSelector(mutableDataSelectorCallback, shallowEqual);

  const tapHandlerCalback = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (state === State.ACTIVE) {
        if (navigation.canGoBack() && navigation.isFocused()) {
          navigation.goBack();
        }
      }
    },
    []
  );

  const videoRef = useRef<Video>(null);

  const [isFinished, setFinished] = useState<boolean>(false);

  const finishHandlerCallback = useCallback(() => {
    setFinished(true);
  }, []);

  const videoPlayerMedia = useMemo<MediaInfo>(() => {
    return {
      url: preview?.media.url as string,
      width: WINDOW_WIDTH * 0.96,
      height: Math.min(
        WINDOW_HEIGHT * 0.5,
        Math.max(
          WINDOW_HEIGHT * 0.35,
          (WINDOW_WIDTH * 0.96 * (preview?.media.height as number)) /
            (preview?.media.width as number)
        )
      ),
    };
  }, [preview]);

  const primaryTextRenderCallback = useCallback<InfoProps["children"]>(
    (style) => <MediumText style={style}>{socialId}</MediumText>,
    [socialId]
  );

  return (
    <SafeAreaView style={globalLayouts.screenLayout}>
      <TapGestureHandler
        numberOfTaps={1}
        shouldCancelWhenOutside={true}
        onHandlerStateChange={tapHandlerCalback}
      >
        <View style={styles.rootContainerStaticStyle}>
          {state !== "idle/success" && <LoadingIndicator />}
          {state == "idle/success" && (
            <ScrollView
              style={styles.listStaticStyle}
              contentContainerStyle={styles.listContentContainerStaticStyle}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.videoContainerStaticStyle}>
                {/* view where the preview video will be rendered */}
                <VideoPlayer
                  videoRef={videoRef}
                  hasControls={false}
                  media={videoPlayerMedia}
                  onFinish={finishHandlerCallback}
                />
                {isFinished && (
                  <VideoOverlay>
                    <View style={styles.overlayContentContainerStaticStyle}>
                      <RoundedIcon
                        color="white"
                        name="chevron-left"
                        size={SIZE_REF_16 * 2}
                        scale={0.7}
                        style={styles.overlayIconStaticStyle}
                        backgroundColor="transparent"
                      />
                      <RegularText style={styles.overlayTextStaticStyle}>
                        replay preview
                      </RegularText>
                    </View>
                    <View
                      style={[
                        styles.overlayContentContainerStaticStyle,
                        styles.horizontalGap,
                      ]}
                    >
                      <RoundedIcon
                        color="white"
                        name="play"
                        size={SIZE_REF_16 * 2}
                        scale={0.7}
                        style={styles.overlayIconStaticStyle}
                        backgroundColor="transparent"
                      />
                      <RegularText style={styles.overlayTextStaticStyle}>
                        watch video
                      </RegularText>
                    </View>
                  </VideoOverlay>
                )}
              </View>

              <View style={styles.metaDataContainerStaticStyle}>
                <MediumText style={styles.titleTextStaticStyle}>
                  {title}
                </MediumText>
                <View
                  style={[
                    styles.countAndControlsContainerStaticStyle,
                    styles.verticalGap,
                  ]}
                >
                  <View style={styles.rowContainerStaticStyle}>
                    <MediumText style={styles.primaryTextStaticStyle}>
                      {countAbbreviator(viewCount as number)} Views
                    </MediumText>
                    <View
                      style={[
                        styles.rowContainerStaticStyle,
                        styles.horizontalGap,
                      ]}
                    >
                      <Icon
                        color="#EE3434"
                        name="heart-solid"
                        size={SIZE_REF_10 * 2}
                      />
                      <MediumText style={styles.primaryTextStaticStyle}>
                        {countAbbreviator(likeCount as number)}
                      </MediumText>
                    </View>
                    <MediumText
                      style={[
                        styles.horizontalGap,
                        styles.primaryTextStaticStyle,
                      ]}
                    >
                      {timeElapsed(timestamp as number)} ago
                    </MediumText>
                  </View>
                  <View style={styles.rowContainerStaticStyle}>
                    <RoundedIcon
                      color="black"
                      name={isSaved ? "bookmark-solid" : "bookmark-outline"}
                      size={SIZE_REF_16 * 2}
                      scale={0.7}
                    />
                    <RoundedIcon
                      color="black"
                      name="play"
                      size={SIZE_REF_16 * 2}
                      scale={0.7}
                      style={styles.horizontalGap}
                    />
                  </View>
                </View>
                <Info
                  secondaryText={`${countAbbreviator(
                    noOfFollowers as number
                  )} followers`}
                  pictureSize={SIZE_REF_10 * 4}
                  textSize={SIZE_REF_12}
                  gapSize={SIZE_REF_4}
                  name={authorId as string}
                  type="user"
                  style={styles.verticalGap}
                >
                  {primaryTextRenderCallback}
                </Info>
                <RegularText style={[styles.secondaryTextStaticStyle]}>
                  {description}
                </RegularText>
              </View>
            </ScrollView>
          )}
        </View>
      </TapGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  metaDataContainerStaticStyle: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#FDFDFD",
    padding: SIZE_REF_8,
  },
  countAndControlsContainerStaticStyle: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalGap: {
    marginLeft: SIZE_REF_12,
  },
  verticalGap: {
    marginTop: SIZE_REF_16,
  },
  titleTextStaticStyle: {
    fontSize: SIZE_REF_12 + SIZE_REF_1,
    lineHeight: SIZE_REF_14 + SIZE_REF_1,
  },
  primaryTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_12,
  },
  secondaryTextStaticStyle: {
    fontSize: SIZE_REF_10 + 1,
    lineHeight: SIZE_REF_6 * 3,
    marginTop: SIZE_REF_16,
  },
  listStaticStyle: {
    width: 0.96 * WINDOW_WIDTH,
    maxHeight: 0.7 * WINDOW_HEIGHT,
  },
  listContentContainerStaticStyle: {
    width: "100%",
  },
  videoContainerStaticStyle: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayContentContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayTextStaticStyle: {
    fontSize: SIZE_REF_10,
    lineHeight: SIZE_REF_10,
    color: "white",
  },
  overlayIconStaticStyle: {
    borderColor: "white",
    borderWidth: 1,
  },
});

export default VideoPreviewScreen;
