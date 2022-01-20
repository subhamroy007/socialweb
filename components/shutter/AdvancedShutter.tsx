import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import {
  GestureEvent,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import useShutterAnimation from "../../hooks/useShutterAnimation";
import {
  SHUTTER_ABSOLUTE_BOTTOM_POSITION,
  SHUTTER_HEIGHT,
  SHUTTER_OVERLAY_MAX_OPACITY,
  SHUTTER_TRANSLATION_ANIMATION_DURATION,
  SHUTTER_TRANSLATION_ANIMATION_VELOCITY_THRESHOLD,
  SHUTTER_TRANSLATION_Y_MAX,
  SHUTTER_TRANSLATION_Y_MIN,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { globalColors } from "../../utility/styles";
import { AnimatedSafeAreaView } from "../../utility/ui";
import MainTabNavigationBar from "./MainTabNavigationBar";
import ShutterBody from "./ShutterBody";
import ShutterFooter from "./ShutterFooter";

const AdvancedShutter = ({ navigation, state }: BottomTabBarProps) => {
  //generic navigation icon press handler that navigates to a specific screen depending on the
  //icon pressed and currently active screen
  const tabIconPressHandler = useCallback(
    (routeName: string) => {
      //manually emitting the 'tabPress' navigation event that can be handled by the target screen
      const tabPressEvent = navigation.emit({
        type: "tabPress",
        target: routeName,
        canPreventDefault: true,
      });

      //if the current screen is not the target screen and the default behavior of the 'tabPress' event is not
      //prevented then navigate to the target screen
      if (
        routeName !== state.routeNames[state.index] &&
        !tabPressEvent.defaultPrevented
      ) {
        navigation.navigate(routeName);
      }
    },
    [navigation.navigate, navigation.emit, state.routeNames, state.index]
  );

  //atomic integer that controls all the  shutter transition (i.e border-top-radius, overlay-opacity)
  const animationControlData = useRef<Animated.Value>(
    new Animated.Value(0) //default value starts with 0
  ).current;

  //dynamic style that calculates the transition properties (i.e transform, border-top-radius) of the shutter
  //based on the atomic value 'animationControlData'
  const { shutterBorderDynamicStyle, shutterTranslationDynamicStyle } =
    useShutterAnimation(animationControlData);

  //atomic integer that holds the y-translation of the shutter since the last drag event
  //(i.e two value possible either 'SHUTTER_TRANSLATION_Y_MIN' or 'SHUTTER_TRANSLATION_Y_MAX')
  const shutterPositionOffset = useRef<number>(0); //value statrts with 0 which is 'SHUTTER_TRANSLATION_Y_MAX'

  //an object that holds the current y velocity and translation of the ongoing drag of the shutter
  const dragEventData = useRef<{ transitionY: number; velocityY: number }>({
    //both value start with 0 cause no drag event is triggered by default
    transitionY: 0,
    velocityY: 0,
  });

  //a boolean state controls whether the overlay should be mounted or not
  const [isOverlayVisible, setVisible] = useState<boolean>(false);

  //a callback that is fired when the shutter is about to drag
  //it initializes the 'animationControlData' with the 'shutterPositionOffset' so that shutter translation
  //transition can continue from the last translation position;
  //it also zero fills the 'dragEventData' for the fresh start of the new transition
  const shutterDragActiveHandler = useCallback(() => {
    animationControlData.setOffset(shutterPositionOffset.current);
    setVisible(true);
    dragEventData.current = { transitionY: 0, velocityY: 0 };
  }, [animationControlData, shutterPositionOffset, setVisible]);

  //callback that is fired continously between the drag start and end
  //it takes the drag event data and sets the value of the 'animationControlData'
  //and also updates the drag event data
  const shutterDragHandler = useCallback(
    ({ nativeEvent }: GestureEvent<PanGestureHandlerEventPayload>) => {
      const result = Math.max(
        Math.min(
          SHUTTER_TRANSLATION_Y_MAX - shutterPositionOffset.current,
          nativeEvent.translationY
        ),
        SHUTTER_TRANSLATION_Y_MIN - shutterPositionOffset.current
      );

      dragEventData.current.transitionY = nativeEvent.translationY;
      dragEventData.current.velocityY = nativeEvent.velocityY;
      animationControlData.setValue(result);
    },
    [shutterPositionOffset, dragEventData, animationControlData]
  );

  //a callback that is fired when the drag finger is released from the
  //shutter and calculates whether the shutter should go up or down based on the last velocity, translation position
  //and last translation position
  const shutterReleaseHandler = useCallback(
    ({ nativeEvent }: HandlerStateChangeEvent<Record<string, unknown>>) => {
      animationControlData.flattenOffset();

      if (
        dragEventData.current.transitionY < 0 &&
        shutterPositionOffset.current === SHUTTER_TRANSLATION_Y_MIN
      ) {
        return;
      }
      if (
        dragEventData.current.transitionY > 0 &&
        shutterPositionOffset.current === SHUTTER_TRANSLATION_Y_MAX
      ) {
        setVisible(false);
        return;
      }

      if (dragEventData.current.transitionY < 0) {
        if (
          (dragEventData.current.velocityY <
            -SHUTTER_TRANSLATION_ANIMATION_VELOCITY_THRESHOLD ||
            Math.abs(dragEventData.current.transitionY) >
              Math.round(SHUTTER_HEIGHT * 0.5)) &&
          shutterPositionOffset.current === SHUTTER_TRANSLATION_Y_MAX
        ) {
          Animated.timing(animationControlData, {
            toValue: SHUTTER_TRANSLATION_Y_MIN,
            useNativeDriver: false,
            duration: SHUTTER_TRANSLATION_ANIMATION_DURATION,
            easing: Easing.linear,
          }).start(({ finished }) => {
            if (finished) {
              shutterPositionOffset.current = SHUTTER_TRANSLATION_Y_MIN;
            }
          });
        } else if (
          Math.abs(dragEventData.current.transitionY) <=
          Math.round(SHUTTER_HEIGHT * 0.5)
        ) {
          Animated.timing(animationControlData, {
            toValue: SHUTTER_TRANSLATION_Y_MAX,
            useNativeDriver: false,
            duration: SHUTTER_TRANSLATION_ANIMATION_DURATION,
            easing: Easing.linear,
          }).start(({ finished }) => {
            if (finished) {
              shutterPositionOffset.current = SHUTTER_TRANSLATION_Y_MAX;
              setVisible(false);
            }
          });
        }
      } else if (
        dragEventData.current.transitionY > 0 &&
        shutterPositionOffset.current === SHUTTER_TRANSLATION_Y_MIN
      ) {
        Animated.timing(animationControlData, {
          toValue: SHUTTER_TRANSLATION_Y_MAX,
          useNativeDriver: false,
          duration: SHUTTER_TRANSLATION_ANIMATION_DURATION,
          easing: Easing.linear,
        }).start(({ finished }) => {
          if (finished) {
            shutterPositionOffset.current = SHUTTER_TRANSLATION_Y_MAX;
            setVisible(false);
          }
        });
      }
    },
    [animationControlData, setVisible, shutterPositionOffset, dragEventData]
  );

  //dynamic style that controls the verlay opacity transition
  const shutterOverlayDynamicStyle = useMemo(
    () => ({
      opacity: animationControlData.interpolate({
        inputRange: [SHUTTER_TRANSLATION_Y_MIN, SHUTTER_TRANSLATION_Y_MAX],
        outputRange: [SHUTTER_OVERLAY_MAX_OPACITY, 0],
      }),
    }),
    [animationControlData]
  );

  return (
    <>
      {/* conditionally render the overlay with transparent background when shutter drag is active */}
      {isOverlayVisible && (
        <AnimatedSafeAreaView
          edges={[]}
          style={[
            globalColors.shutterOverlayColor,
            styles.shutterOverlay,
            shutterOverlayDynamicStyle,
          ]}
        ></AnimatedSafeAreaView>
      )}
      {/* the root view rendering the entire shutter component with animated transitionY, borderTopRadius and custom 
            pan responder system*/}
      <PanGestureHandler
        onActivated={shutterDragActiveHandler}
        onCancelled={shutterReleaseHandler}
        onFailed={shutterReleaseHandler}
        onEnded={shutterReleaseHandler}
        onGestureEvent={shutterDragHandler}
        minPointers={1}
        maxPointers={1}
        avgTouches={true}
        enableTrackpadTwoFingerGesture={true}
      >
        <AnimatedSafeAreaView
          style={[
            globalColors.shutterColor,
            styles.shutter,
            shutterBorderDynamicStyle,
            shutterTranslationDynamicStyle,
          ]}
          edges={["left", "right", "bottom"]}
        >
          {/* shutter header component that works as the main tab naivagtor of the app */}
          <MainTabNavigationBar
            animationControlData={animationControlData}
            onTabPress={tabIconPressHandler}
            routes={state.routeNames}
            activeIndex={state.index}
          />
          {/* this is the body of the shutter contains the secondary navigation icons */}
          <ShutterBody
            animationControlData={animationControlData}
            onTabPress={tabIconPressHandler}
            routes={state.routeNames}
            activeIndex={state.index}
          />
          {/* this is the footer section of the shutter contains the additional
           control icons of a specific screen */}
          <ShutterFooter />
        </AnimatedSafeAreaView>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  shutter: {
    position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    zIndex: 4,
    height: SHUTTER_HEIGHT,
    bottom: SHUTTER_ABSOLUTE_BOTTOM_POSITION,
  },
  shutterOverlay: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
});

export default AdvancedShutter;
