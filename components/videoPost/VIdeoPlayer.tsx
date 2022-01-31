// import {
//   AVPlaybackStatus,
//   AVPlaybackStatusToSet,
//   Video,
//   VideoProps,
// } from "expo-av";
// import {
//   AVPlaybackSource,
//   PitchCorrectionQuality,
// } from "expo-av/build/AV.types";
// import React, {
//   RefObject,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import {
//   Animated,
//   Easing,
//   LayoutAnimation,
//   StatusBar,
//   StyleProp,
//   StyleSheet,
//   View,
// } from "react-native";
// import {
//   HandlerStateChangeEvent,
//   LongPressGestureHandler,
//   LongPressGestureHandlerEventPayload,
//   State,
//   Switch,
//   TapGestureHandler,
//   TapGestureHandlerEventPayload,
// } from "react-native-gesture-handler";
// import {
//   SIZE_REF_10,
//   SIZE_REF_12,
//   SIZE_REF_16,
//   SIZE_REF_8,
//   WINDOW_HEIGHT,
//   WINDOW_WIDTH,
// } from "../../utility/constants";
// import { timeStringGenerator } from "../../utility/helpers";
// import { MediaInfo } from "../../utility/types";
// import { RegularText } from "../../utility/ui";
// import Icon from "../global/Icon";
// import * as ScreenOrientation from "expo-screen-orientation";
// import ProgressBar from "./ProgressBar";
// // import * as VideoThumbnails from "expo-video-thumbnails";
// import FastImage, { ImageStyle, Source } from "react-native-fast-image";

// export interface VideoPlayerProps {
//   media: MediaInfo;
//   hasControls: boolean;
//   videoRef: RefObject<Video>;
//   onFinish?: () => void;
// }

// export interface VideoPlayerStatus {
//   durationInMillis: number;
//   loadedLengthInMillis: number;
//   bufferedLengthInMillis: number;
//   isControlsVisible: boolean;
//   isPlaying: boolean;
//   isCaptionOn: boolean;
//   isAutoPlayOn: boolean;
//   isMuted: boolean;
//   frameUrl?: string;
//   framePosition?: number;
//   orientation?: "landscape" | "portrait";
//   isFullScreen: boolean;
// }

// const initVideoPlayerStatus = (): VideoPlayerStatus => {
//   return {
//     durationInMillis: 0,
//     loadedLengthInMillis: 0,
//     bufferedLengthInMillis: 0,
//     isMuted: false,
//     isAutoPlayOn: false,
//     isCaptionOn: false,
//     isControlsVisible: false,
//     isPlaying: false,
//     isFullScreen: false,
//   };
// };

// const VideoPlayer = ({
//   hasControls,
//   media,
//   videoRef,
//   onFinish,
// }: VideoPlayerProps) => {
//   //keeps track of the video state data that may or may not change over time
//   const [videoPlayerState, setVideoPlayerState] = useState<VideoPlayerStatus>(
//     initVideoPlayerStatus
//   );

//   //single animated value controls all the component animations inside the video player (min value 0, max value 1)
//   const controlsAnimatedValue = useRef<Animated.Value>(
//     new Animated.Value(0)
//   ).current;

//   //callback function triggers regularly with updated video state values
//   const playbackStatusUpdateCallback = useCallback(
//     (state: AVPlaybackStatus) => {
//       if (state.isLoaded) {
//         setVideoPlayerState((prevState) => ({
//           ...prevState,
//           bufferedLengthInMillis:
//             state.playableDurationMillis && !isNaN(state.playableDurationMillis)
//               ? state.playableDurationMillis
//               : prevState.bufferedLengthInMillis,
//           durationInMillis:
//             state.durationMillis && !isNaN(state.durationMillis)
//               ? state.durationMillis
//               : prevState.durationInMillis,
//           isMuted: state.isMuted,
//           isPlaying: state.isPlaying,
//           loadedLengthInMillis: !isNaN(state.positionMillis)
//             ? state.positionMillis
//             : 0,
//         }));

//         if (state.didJustFinish && onFinish) {
//           onFinish();
//         }
//       }
//     },
//     [onFinish, setVideoPlayerState]
//   );

//   //main effect hook that loads the video file asynchrounously and sets nessessery video states
//   useEffect(() => {
//     const prepare = async () => {
//       if (videoRef.current) {
//         //intialize the media source
//         const source: AVPlaybackSource = {
//           uri: media.url,
//           overrideFileExtensionAndroid: "mp4",
//         };

//         //initialize the video states
//         const intialStatus: AVPlaybackStatusToSet = {
//           isMuted: false,
//           pitchCorrectionQuality: PitchCorrectionQuality["High"],
//           progressUpdateIntervalMillis: 100,
//           isLooping: false,
//           rate: 1,
//           shouldCorrectPitch: true,
//           volume: 1,
//           shouldPlay: true,
//         };

//         //load media file asynchrounously and set the orientation of the video
//         await videoRef.current.loadAsync(source, intialStatus, false);
//         setVideoPlayerState((prevState) => ({
//           ...prevState,
//           orientation: media.width > media.height ? "landscape" : "portrait",
//         }));

//         //set the callback function that will be triggered regularly
//         videoRef.current.setOnPlaybackStatusUpdate(
//           playbackStatusUpdateCallback
//         );
//       }
//     };

//     prepare();

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.unloadAsync();
//       }
//     };
//   }, [media.url, media.height, media.width]);

//   //callback to initiate the hode and show animation
//   const animationStartCallback = useCallback((target: "hide" | "show") => {
//     Animated.timing(controlsAnimatedValue, {
//       toValue: target === "hide" ? 0 : 1,
//       useNativeDriver: true,
//       duration: 150,
//       easing: Easing.linear,
//     }).start(({ finished }) => {
//       if (finished) {
//         setVideoPlayerState((prevState) => ({
//           ...prevState,
//           isControlsVisible: !prevState.isControlsVisible,
//         }));
//         if (target === "show") {
//           Animated.timing(controlsAnimatedValue, {
//             toValue: 0,
//             useNativeDriver: true,
//             duration: 150,
//             delay: 2000,
//             easing: Easing.linear,
//           }).start(({ finished }) => {
//             if (finished) {
//               setVideoPlayerState((prevState) => ({
//                 ...prevState,
//                 isControlsVisible: !prevState.isControlsVisible,
//               }));
//             }
//           });
//         }
//       }
//     });
//   }, []);

//   const longPressCallbackCallback = useCallback(
//     ({
//       nativeEvent: { state },
//     }: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
//       if (videoRef.current) {
//         if (state === State.ACTIVE) {
//           videoRef.current.pauseAsync();
//         } else {
//           videoRef.current.playAsync();
//         }
//       }
//     },
//     [videoRef.current]
//   );

//   //callback that controls waht to do when the screen is tapped based on controls is enabled or not
//   const tapHandlerCallback = useCallback(
//     ({
//       nativeEvent: { state },
//     }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
//       if (videoRef.current && state === State.ACTIVE) {
//         if (!hasControls) {
//           videoRef.current.setIsMutedAsync(
//             videoPlayerState.isMuted ? false : true
//           );
//         } else {
//           if (videoPlayerState.isControlsVisible) {
//             animationStartCallback("hide");
//           } else {
//             animationStartCallback("show");
//           }
//         }
//       }
//     },
//     [hasControls, videoPlayerState.isControlsVisible, videoPlayerState.isMuted]
//   );

//   //style associated to the video component based on the orientation, fullscreen mode, width and height
//   const videoStyleList = useMemo<VideoProps["style"]>(() => {
//     return [
//       styles.video,
//       {
//         width: videoPlayerState.isFullScreen
//           ? videoPlayerState.orientation === "portrait"
//             ? WINDOW_WIDTH
//             : WINDOW_HEIGHT
//           : media.width,
//         height: videoPlayerState.isFullScreen
//           ? videoPlayerState.orientation === "portrait"
//             ? WINDOW_HEIGHT
//             : WINDOW_WIDTH
//           : media.height,
//       },
//     ];
//   }, [
//     media.height,
//     media.width,
//     videoPlayerState.isFullScreen,
//     videoPlayerState.orientation,
//   ]);

//   const videoFrameMap = useRef<{ [key: number]: string }>({}).current;

//   //function called when the progress bar is dragged
//   const progressBarValueChangeCallback = useCallback(
//     async (timestamp: number, position: number) => {
//       const filteredTimestamp = Math.min(
//         videoPlayerState.durationInMillis,
//         Math.max(timestamp, 0)
//       );
//       const filteredPostion = Math.min(WINDOW_WIDTH, Math.max(position, 0));

//       if (!videoFrameMap[filteredTimestamp]) {
//         const frame = await VideoThumbnails.getThumbnailAsync(media.url, {
//           quality: 0.2,
//           time: filteredTimestamp,
//         });
//         videoFrameMap[filteredTimestamp] = frame.uri;
//       }

//       setVideoPlayerState((prevState) => ({
//         ...prevState,
//         framePosition: position,
//         frameUrl: videoFrameMap[filteredTimestamp],
//       }));
//     },
//     [videoPlayerState.durationInMillis, media.url]
//   );

//   const progressBarDragEndCallback = useCallback(() => {
//     setVideoPlayerState((prevState) => ({
//       ...prevState,
//       framePosition: undefined,
//       frameUrl: undefined,
//     }));
//   }, []);

//   //play or pause the video based on video state
//   const playPauseTapCallback = useCallback(() => {
//     if (videoRef.current) {
//       if (videoPlayerState.isPlaying) {
//         videoRef.current.pauseAsync();
//       } else {
//         videoRef.current.playAsync();
//       }
//       animationStartCallback("show");
//     }
//   }, [videoPlayerState.isPlaying]);

//   //callback that shows or hides inline caption
//   const captionTapCallback = useCallback(() => {
//     setVideoPlayerState((prevState) => ({
//       ...prevState,
//       isCaptionOn: !prevState.isCaptionOn,
//     }));
//     animationStartCallback("show");
//   }, []);

//   //callback that enables or disables autoplay
//   const autoPlayTapCallback = useCallback(
//     (value) => {
//       setVideoPlayerState((prevState) => ({
//         ...prevState,
//         isAutoPlayOn: value,
//       }));
//       animationStartCallback("show");
//     },
//     [setVideoPlayerState]
//   );

//   //callback that triggers fullscreen activation or deactivation
//   const fullScreenTapCallback = useCallback(() => {
//     setVideoPlayerState((prevState) => ({
//       ...prevState,
//       isFullScreen: !prevState.isFullScreen,
//     }));
//   }, []);

//   //callback that chages the orientation of the screen temporarily based
//   // on the video orientation and fullscreen state
//   useEffect(() => {
//     const changeOrientation = async () => {
//       if (videoPlayerState.isFullScreen) {
//         controlsAnimatedValue.setValue(0);
//         StatusBar.setHidden(true, "slide");
//         if (videoPlayerState.orientation === "landscape") {
//           const isOrienatationSupported =
//             await ScreenOrientation.supportsOrientationLockAsync(
//               ScreenOrientation.OrientationLock.LANDSCAPE
//             );
//           if (isOrienatationSupported) {
//             await ScreenOrientation.lockAsync(
//               ScreenOrientation.OrientationLock.LANDSCAPE
//             );
//           }
//         } else {
//           LayoutAnimation.configureNext(
//             LayoutAnimation.create(150, "linear", "scaleY")
//           );
//         }
//         animationStartCallback("show");
//       } else {
//         controlsAnimatedValue.setValue(0);
//         StatusBar.setHidden(false, "slide");
//         await ScreenOrientation.unlockAsync();
//         animationStartCallback("show");
//       }
//     };
//     changeOrientation();
//   }, [videoPlayerState.isFullScreen, videoPlayerState.orientation]);

//   const frameConfig = useMemo<[Source, StyleProp<ImageStyle>]>(
//     () => [
//       {
//         cache: "immutable",
//         priority: "high",
//         uri: videoPlayerState.frameUrl,
//       },
//       {
//         width: (media.width as number) * 0.2,
//         height: (media.height as number) * 0.2,
//         left: videoPlayerState.framePosition,
//         top: -60,
//         position: "absolute",
//         backgroundColor: "black",
//       },
//     ],
//     [
//       videoPlayerState.frameUrl,
//       videoPlayerState.framePosition,
//       media.height,
//       media.width,
//     ]
//   );

//   return (
//     <TapGestureHandler
//       onHandlerStateChange={tapHandlerCallback}
//       numberOfTaps={1}
//       shouldCancelWhenOutside={true}
//     >
//       <LongPressGestureHandler
//         enabled={!hasControls}
//         onHandlerStateChange={longPressCallbackCallback}
//         minDurationMs={100}
//         shouldCancelWhenOutside={true}
//       >
//         <View style={styles.container}>
//           <Video
//             ref={videoRef}
//             style={videoStyleList}
//             resizeMode={
//               videoPlayerState.orientation === "landscape" ? "contain" : "cover"
//             }
//             onReadyForDisplay={() => {
//               animationStartCallback("show");
//             }}
//           />
//           <Animated.View
//             style={[
//               styles.middleControlsContainer,
//               { opacity: controlsAnimatedValue },
//             ]}
//           >
//             <Icon
//               color="white"
//               name="previous"
//               size={SIZE_REF_12 * 2}
//               style={styles.controlIcon}
//             />
//             <Icon
//               color="white"
//               name={videoPlayerState.isPlaying ? "pause" : "play"}
//               size={SIZE_REF_12 * 2}
//               style={styles.controlIcon}
//               onTap={playPauseTapCallback}
//             />
//             <Icon color="white" name="next" size={SIZE_REF_12 * 2} />
//           </Animated.View>
//           <View
//             style={[
//               styles.progressBarContainer,
//               videoPlayerState.isFullScreen
//                 ? styles.progressBarContainer_fullscreen
//                 : styles.progressBarContainer_normal,
//             ]}
//           >
//             <Animated.View
//               style={[
//                 styles.durationIconPairContainer,
//                 { opacity: controlsAnimatedValue },
//               ]}
//             >
//               <RegularText style={styles.durationText}>
//                 {timeStringGenerator(
//                   videoPlayerState.loadedLengthInMillis
//                     ? videoPlayerState.loadedLengthInMillis
//                     : 0
//                 )}
//                 /{timeStringGenerator(videoPlayerState.durationInMillis)}
//               </RegularText>
//               <Icon
//                 color="white"
//                 size={SIZE_REF_10 * 2}
//                 name={
//                   videoPlayerState.isFullScreen ? "minimize" : "full-screen"
//                 }
//                 onTap={fullScreenTapCallback}
//               />
//             </Animated.View>

//             <ProgressBar
//               min={0}
//               max={videoPlayerState.durationInMillis}
//               step={3000}
//               value={videoPlayerState.loadedLengthInMillis}
//               extraValue={videoPlayerState.bufferedLengthInMillis}
//               onValueChange={progressBarValueChangeCallback}
//               onEnd={progressBarDragEndCallback}
//             />
//             {videoPlayerState.framePosition && (
//               <FastImage
//                 source={frameConfig[0]}
//                 resizeMode="contain"
//                 style={frameConfig[1]}
//               />
//             )}
//           </View>
//           <Animated.View
//             style={[
//               styles.topControlsContainer,
//               { opacity: controlsAnimatedValue },
//             ]}
//           >
//             <Icon
//               color="white"
//               name={videoPlayerState.isCaptionOn ? "caption-on" : "caption-off"}
//               size={SIZE_REF_12 * 2}
//               style={styles.topControlsIcon}
//               onTap={captionTapCallback}
//             />
//             <Switch
//               trackColor={{ false: "white", true: "white" }}
//               thumbColor={"white"}
//               style={[styles.topControlsIcon, { transform: [{ scale: 0.7 }] }]}
//               shouldCancelWhenOutside={true}
//               value={videoPlayerState.isAutoPlayOn}
//               onValueChange={autoPlayTapCallback}
//             />
//             <Icon color="white" name="more-solid" size={SIZE_REF_16} />
//           </Animated.View>
//         </View>
//       </LongPressGestureHandler>
//     </TapGestureHandler>
//   );
// };

// const styles = StyleSheet.create({
//   topControlsIcon: {
//     marginRight: SIZE_REF_16,
//   },
//   topControlsContainer: {
//     position: "absolute",
//     top: SIZE_REF_8,
//     right: SIZE_REF_8,
//     flexDirection: "row",
//     flexWrap: "nowrap",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   durationIconPairContainer: {
//     flexDirection: "row",
//     flexWrap: "nowrap",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: SIZE_REF_8,
//     paddingHorizontal: SIZE_REF_8,
//   },
//   durationText: { fontSize: SIZE_REF_10, color: "white" },
//   progressBarContainer: {
//     position: "absolute",
//     flexWrap: "nowrap",
//     alignItems: "stretch",
//     justifyContent: "center",
//     width: "100%",
//   },
//   progressBarContainer_normal: {
//     bottom: 0,
//   },
//   progressBarContainer_fullscreen: {
//     bottom: SIZE_REF_8 * 3,
//   },
//   middleControlsContainer: {
//     position: "absolute",
//     flexDirection: "row",
//     flexWrap: "nowrap",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   controlIcon: {
//     marginRight: SIZE_REF_8 * 5,
//   },
//   container: {
//     width: "100%",
//     flexWrap: "nowrap",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   video: {
//     backgroundColor: "black",
//   },
//   basicProgressBar: {
//     backgroundColor: "red",
//     width: "100%",
//   },
// });

// export default VideoPlayer;
