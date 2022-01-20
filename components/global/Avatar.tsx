import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useMemo, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import FastImage, { ImageStyle, Source } from "react-native-fast-image";
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import {
  selectUserId,
  selectUserProfilePictureDataUrl,
} from "../../store/appData/selector";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectUserProfilePictureUrl } from "../../store/user/selector";
import { SIZE_REF_16 } from "../../utility/constants";
import { RootStackNavigatorParamList } from "../../utility/types";
import { AvatarProps, AvatarTestProps } from "../../utility/types";

export const AvatarTest = ({
  showStoryIndicator,
  size,
  style,
}: AvatarTestProps) => {
  const [hasUnSeenStory, setUnseenStory] = useState<boolean>(false);

  const calculatedSize = size ? size : SIZE_REF_16 * 4;

  const rootContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      style,
      styles.rootContainerStaticStyle,
      {
        width: calculatedSize,
        height: calculatedSize,
        borderColor: showStoryIndicator
          ? hasUnSeenStory
            ? "#3F71F2"
            : "#D1CBCB"
          : undefined,
        borderWidth: showStoryIndicator ? (hasUnSeenStory ? 2 : 1) : undefined,
        borderRadius: calculatedSize * 0.5,
      },
    ];
  }, [calculatedSize, showStoryIndicator, hasUnSeenStory]);

  const tapStateChangeCallback = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (state === State.ACTIVE) {
        setUnseenStory((prevState) => !prevState);
      }
    },
    []
  );

  const imageSource = useMemo<Source>(
    () => ({
      cache: "immutable",
      priority: "high",
      uri: "https://static.toiimg.com/thumb/msid-81617838,width-900,height-1200,resizemode-6.cms",
    }),
    []
  );

  const imageDynamicStyle = useMemo<StyleProp<ImageStyle>>(
    () => [
      styles.imageStaticStyle,
      {
        width: showStoryIndicator
          ? hasUnSeenStory
            ? calculatedSize - 2 * 2 - 2 * 3
            : calculatedSize - 2 * 2 - 2 * 2
          : calculatedSize,
        height: showStoryIndicator
          ? hasUnSeenStory
            ? calculatedSize - 2 * 2 - 2 * 3
            : calculatedSize - 2 * 2 - 2 * 2
          : calculatedSize,
        borderRadius: showStoryIndicator
          ? hasUnSeenStory
            ? (calculatedSize - 2 * 2 - 2 * 3) * 0.5
            : (calculatedSize - 2 * 2 - 2 * 2) * 0.5
          : calculatedSize * 0.5,
      },
    ],
    [calculatedSize, hasUnSeenStory, showStoryIndicator]
  );

  return (
    <TapGestureHandler
      numberOfTaps={1}
      shouldCancelWhenOutside={true}
      onHandlerStateChange={tapStateChangeCallback}
    >
      <View style={rootContainerDynamicStyle}>
        <FastImage
          source={imageSource}
          style={imageDynamicStyle}
          resizeMode="cover"
        />
      </View>
    </TapGestureHandler>
  );
};

//not completely type safe
type AvatarNavigatorProps = StackNavigationProp<
  RootStackNavigatorParamList,
  "Tabs"
>;

const Avatar = ({ showStoryIndicator, size, style, id }: AvatarProps) => {
  const navigation = useNavigation<AvatarNavigatorProps>();

  const userId = useAppSelector(selectUserId);

  const userProfilePictureUrlSelectorCallback = useCallback(
    (state: RootState) => {
      return id === userId
        ? selectUserProfilePictureDataUrl(state)
        : selectUserProfilePictureUrl(state, id);
    },
    [id, userId]
  );

  const userProfilePictureUrl = useAppSelector(
    userProfilePictureUrlSelectorCallback,
    (left, right) => {
      if (id === userId && left !== right) {
        return false;
      }
      if (!left && right) return false;
      return true;
    }
  );

  const [hasUnSeenStory, setUnseenStory] = useState<boolean>(true);

  const calculatedSize = size ? size : SIZE_REF_16 * 3;

  const rootContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      style,
      styles.rootContainerStaticStyle,
      {
        width: calculatedSize,
        height: calculatedSize,
        borderColor: showStoryIndicator
          ? hasUnSeenStory
            ? "#3F71F2"
            : "#D1CBCB"
          : undefined,
        borderWidth: showStoryIndicator ? (hasUnSeenStory ? 2 : 1) : undefined,
        borderRadius: calculatedSize * 0.5,
      },
    ];
  }, [calculatedSize, showStoryIndicator, hasUnSeenStory]);

  const tapStateChangeCallback = useCallback(
    ({
      nativeEvent: { state },
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (state === State.ACTIVE) {
        if (showStoryIndicator && hasUnSeenStory) {
          setUnseenStory(false);
        } else {
          if (id === userId) {
            navigation.navigate("Tabs", { screen: "ProfileScreen" });
          } else {
            navigation.navigate("Tabs", {
              screen: "Stacks",
              params: { screen: "OthersProfileScreen", params: { id } },
            });
          }
        }
      }
    },
    [showStoryIndicator, hasUnSeenStory, id, userId]
  );

  const imageSource = useMemo<Source>(
    () => ({
      cache: "immutable",
      priority: "high",
      uri: userProfilePictureUrl,
    }),
    []
  );

  const imageDynamicStyle = useMemo<StyleProp<ImageStyle>>(
    () => [
      styles.imageStaticStyle,
      {
        width: showStoryIndicator
          ? hasUnSeenStory
            ? calculatedSize - 2 * 2 - 2 * 3
            : calculatedSize - 2 * 2 - 2 * 2
          : calculatedSize,
        height: showStoryIndicator
          ? hasUnSeenStory
            ? calculatedSize - 2 * 2 - 2 * 3
            : calculatedSize - 2 * 2 - 2 * 2
          : calculatedSize,
        borderRadius: showStoryIndicator
          ? hasUnSeenStory
            ? (calculatedSize - 2 * 2 - 2 * 3) * 0.5
            : (calculatedSize - 2 * 2 - 2 * 2) * 0.5
          : calculatedSize * 0.5,
      },
    ],
    [calculatedSize, hasUnSeenStory, showStoryIndicator]
  );

  return (
    <TapGestureHandler
      numberOfTaps={1}
      shouldCancelWhenOutside={true}
      onHandlerStateChange={tapStateChangeCallback}
    >
      <View style={rootContainerDynamicStyle}>
        <FastImage
          source={imageSource}
          style={imageDynamicStyle}
          resizeMode="cover"
        />
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStaticStyle: {
    backgroundColor: "#FDFDFD",
  },
});

export default Avatar;
