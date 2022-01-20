import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { StackHeaderProps } from "@react-navigation/stack";
import React, { useCallback, useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectTrendingScreenFocus } from "../../store/appData/selector";
import { changeSearchPhase } from "../../store/appData/slice";
import { useAppDispatch, useAppSelector } from "../../store/appStore";
import {
  HEADER_HEIGHT,
  SIZE_REF_10,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_2,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { globalColors } from "../../utility/styles";
import { HeaderProps, SearchResultHeaderProps } from "../../utility/types";
import { MediumText } from "../../utility/ui";
import Icon from "./Icon";
import InputBox from "./InputBox";
import RoundedIcon from "./RoundedIcon";

const Header = ({ leftSideComponent, rightSideComponent }: HeaderProps) => {
  return (
    <SafeAreaView
      edges={["left", "right", "top"]}
      style={[globalColors.headerColor, styles.rootContainerStaticStyle]}
    >
      {leftSideComponent && (
        <View
          style={[
            styles.childContainerStaticStyle,
            styles.leftSideContainerStaticStyle,
          ]}
        >
          {leftSideComponent}
        </View>
      )}
      {rightSideComponent && (
        <View style={styles.childContainerStaticStyle}>
          {rightSideComponent}
        </View>
      )}
    </SafeAreaView>
  );
};

export const TrendingScreenHeader = ({ navigation }: BottomTabHeaderProps) => {
  const focus = useAppSelector(selectTrendingScreenFocus);
  const searchIconTapCallback = useCallback(() => {
    switch (focus) {
      case "hashtag":
        navigation.navigate("Stacks", {
          screen: "SearchResultScreen",
          params: { screen: "SearchedHashTag" },
        });
        break;
      case "imagePost":
        navigation.navigate("Stacks", {
          screen: "SearchResultScreen",
          params: { screen: "SearchedImagePost" },
        });
        break;
      case "videoPost":
        navigation.navigate("Stacks", {
          screen: "SearchResultScreen",
          params: { screen: "SearchedVideoPost" },
        });
        break;
      default:
        navigation.navigate("Stacks", {
          screen: "SearchResultScreen",
          params: { screen: "SearchedAccount" },
        });
    }
  }, [focus]);
  return (
    <Header
      leftSideComponent={
        <>
          <Icon
            name="trending-outline"
            size={SIZE_REF_10 * 3}
            style={styles.leftIconStaticStyle}
          />
          <MediumText style={styles.textStaticStyle}>Trending</MediumText>
        </>
      }
      rightSideComponent={
        <Icon
          name="search-regular"
          size={SIZE_REF_10 * 3}
          style={styles.rightIconStaticStyle}
          onTap={searchIconTapCallback}
        />
      }
    />
  );
};

export const SearchScreenHeader = ({ navigation }: StackHeaderProps) => {
  const dispatch = useAppDispatch();

  const inputBoxRef = useRef<TextInput>(null);

  const leftArrowIconTapCallback = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, []);

  const textChangeCallback = useCallback((text: string) => {
    dispatch(changeSearchPhase(text));
  }, []);

  return (
    <Header
      leftSideComponent={
        <>
          <Icon
            name="arrow-left"
            size={SIZE_REF_10 * 3}
            onTap={leftArrowIconTapCallback}
            style={styles.leftIconStaticStyle}
          />
          <InputBox
            placeholder="Search..."
            inputRef={inputBoxRef}
            onTextChange={textChangeCallback}
          />
        </>
      }
    />
  );
};

export const SearchResultHeader = ({
  searchPhase,
  type,
}: SearchResultHeaderProps) => {
  return (
    <View style={styles.searchResultRootContainerStaticStyle}>
      <MediumText
        style={styles.searchResultTextStaticStyle}
      >{`${type} for "${searchPhase}"`}</MediumText>
      {(type === "images" || type === "videos") && (
        <RoundedIcon
          name="chevron-down"
          size={SIZE_REF_10 * 3}
          backgroundColor="transparent"
          style={styles.filterIconStaticStyle}
        />
      )}
    </View>
  );
};

export const VideoFeedScreenHeader = ({ navigation }: BottomTabHeaderProps) => {
  const searchIconTapCallback = useCallback(() => {
    navigation.navigate("Stacks", {
      screen: "SearchResultScreen",
      params: { screen: "SearchedVideoPost" },
    });
  }, [navigation]);

  return (
    <Header
      leftSideComponent={
        <>
          <Icon
            name="video-outline"
            size={SIZE_REF_10 * 3}
            style={styles.leftIconStaticStyle}
          />
          <MediumText style={styles.textStaticStyle}>Videos</MediumText>
        </>
      }
      rightSideComponent={
        <>
          <Icon
            name="plus-outline"
            size={SIZE_REF_10 * 3}
            style={styles.rightIconStaticStyle}
          />
          <Icon
            name="search-regular"
            size={SIZE_REF_10 * 3}
            style={styles.rightIconStaticStyle}
            onTap={searchIconTapCallback}
          />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    width: WINDOW_WIDTH,
    height: HEADER_HEIGHT,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZE_REF_8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textStaticStyle: {
    fontSize: SIZE_REF_6 * 3,
    flex: 1,
  },
  leftSideContainerStaticStyle: {
    flex: 1,
  },
  childContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  leftIconStaticStyle: {
    marginRight: SIZE_REF_2,
  },
  rightIconStaticStyle: {
    marginLeft: SIZE_REF_16,
  },
  searchResultRootContainerStaticStyle: {
    width: WINDOW_WIDTH,
    paddingVertical: SIZE_REF_16,
    paddingHorizontal: SIZE_REF_8,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchResultTextStaticStyle: {
    fontSize: SIZE_REF_14,
    lineHeight: SIZE_REF_14,
    color: "grey",
    flex: 1,
  },
  filterIconStaticStyle: {
    marginHorizontal: SIZE_REF_8,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
