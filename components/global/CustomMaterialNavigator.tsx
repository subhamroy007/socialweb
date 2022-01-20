import React, { useCallback, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SHUTTER_HEIGHT,
  SIZE_REF_2,
  SIZE_REF_8,
  TAB_INDICATOR_HEIGHT,
} from "../../utility/constants";
import {
  CustomMaterialNavigatorProps,
  CustomMaterialScreenProps,
  TabItemProps,
} from "../../utility/types";
import Icon from "./Icon";

const TabItem = ({
  activeIcon,
  inActiveIcon,
  size,
  index,
  animationControlData,
}: TabItemProps) => {
  const activeTabIconDynamicStyle = useMemo(
    () => [
      styles.activeTabIconStaticStyle,
      {
        opacity: animationControlData.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    []
  );

  const inActiveTabItemDynamicStyle = useMemo(
    () => ({
      opacity: animationControlData.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 0, 1],
        extrapolate: "clamp",
      }),
    }),
    []
  );

  return (
    <View style={styles.tabItemStaticStyle}>
      <Animated.View style={activeTabIconDynamicStyle}>
        <Icon name={activeIcon} size={size} />
      </Animated.View>
      <Animated.View style={inActiveTabItemDynamicStyle}>
        <Icon name={inActiveIcon} size={size} />
      </Animated.View>
    </View>
  );
};

export const CustomMaterialScreen = ({ target }: CustomMaterialScreenProps) => {
  return target;
};

// custom naivagator which is embiddable in any screen component
const SwippableTabNavigator = ({
  width,
  height,
  children,
  style,
}: CustomMaterialNavigatorProps) => {
  //specify the absolute width and height of the navigator
  const rootContainerDynamicStyle: StyleProp<ViewStyle> = useMemo(
    () => ({ width: width }),
    [width]
  );

  //an atomic data that produces the transition of the navigator based on its value
  //default to 0 as scroll content offset starts at 0
  const animationControlData = useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;

  //a reference to the target scrollbar that renders the screens
  const scrollbarRef = useRef<ScrollView>(null);

  //a callback that is fired whenever the scroll event is emitted
  //sets the 'animationControlData' to the current scroll content offset
  const swipeHandler = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      animationControlData.setValue(
        nativeEvent.contentOffset.x / children.length
      );
    },
    [animationControlData, children.length]
  );

  const { inputRange, outputRange } = useMemo<{
    inputRange: number[];
    outputRange: number[];
  }>(() => {
    const inputRange: number[] = [];
    const outputRange: number[] = [];

    for (let i = 0; i < children.length; i++) {
      outputRange.push(i);
      inputRange.push((i * width) / children.length);
    }

    return {
      inputRange,
      outputRange,
    };
  }, [children.length, width]);

  //calculates the width of the tab bar
  const tabBarDynamicStyle: StyleProp<ViewStyle> = useMemo(
    () => [
      styles.tabBarStaticStyle,
      {
        width,
      },
    ],
    [width]
  );

  //calculates the width of the active tab indicator
  const tabIndicatorDynamicStyle = useMemo(
    () => [
      styles.tabIndicatorStaticStyle,
      {
        width: width / children.length,
        left: animationControlData,
      },
    ],
    [width, children.length]
  );

  const listDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({ width, height }),
    [width, height]
  );

  const screenContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.screenContainerStaticStyle, { width, height }],
    [width, height]
  );

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[style, rootContainerDynamicStyle]}
    >
      <View style={tabBarDynamicStyle}>
        {children.map((item, index) => (
          <TabItem
            key={"itemm" + index}
            index={index}
            activeIcon={item.props.activeIcon}
            inActiveIcon={item.props.inActiveIcon}
            size={item.props.size}
            animationControlData={animationControlData.interpolate({
              inputRange,
              outputRange,
              extrapolate: "clamp",
            })}
          />
        ))}
        <Animated.View style={tabIndicatorDynamicStyle}></Animated.View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        scrollEventThrottle={8}
        pagingEnabled={true}
        onScroll={swipeHandler}
        ref={scrollbarRef}
        style={listDynamicStyle}
        nestedScrollEnabled={true}
      >
        {children.map((tab) => {
          return (
            <SafeAreaView
              edges={["left", "right"]}
              style={screenContainerDynamicStyle}
            >
              {tab}
            </SafeAreaView>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainerStaticStyle: {
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  tabIndicatorStaticStyle: {
    backgroundColor: "black",
    height: 2,
    position: "absolute",
    bottom: 0,
  },
  tabBarStaticStyle: {
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  tabItemStaticStyle: {
    padding: SIZE_REF_8,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabIconStaticStyle: {
    position: "absolute",
  },
});

export default SwippableTabNavigator;
