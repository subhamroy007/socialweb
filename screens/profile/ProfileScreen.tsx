import { Animated, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useRef } from "react";
import { ScrollView, TapGestureHandler } from "react-native-gesture-handler";
import { globalColors, globalLayouts } from "../../utility/styles";
import {
  SHUTTER_HEIGHT,
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/appStore";
import {
  selectUserId,
  selectUserProfileState,
} from "../../store/appData/selector";
import {
  selectUserBio,
  selectUserFollowersCount,
  selectUserFollowingsCount,
  selectUserLinkList,
  selectUserSocialId,
  selectUserUploadsCount,
  selectUserUsername,
} from "../../store/user/selector";
import { shallowEqual } from "react-redux";
import LoadingIndicator from "../../components/global/LoadingIndicator";
import Avatar from "../../components/global/Avatar";
import RoundedIcon from "../../components/global/RoundedIcon";
import { ConfiguredFlatList, MediumText, RegularText } from "../../utility/ui";
import { countAbbreviator, createKeyExtractor } from "../../utility/helpers";
import { Link } from "../../utility/types";
import HighlightedContent from "../../components/global/HighlightedItem";
import Icon from "../../components/global/Icon";
import ItemSeparator from "../../components/global/ItemSeparator";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  RootStackNavigatorParamList,
  RootTabNavigatorParamList,
} from "../../utility/types";
import { StackScreenProps } from "@react-navigation/stack";
import ImageGallery from "../../components/profile/ImageGallery";
import TabBarItem from "../../components/profile/TabBarItem";
import TabBar from "../../components/profile/TabBar";
import VideoCollection from "../../components/profile/VideoCollection";
import TabList from "../../components/profile/TabList";
import { getUserProfileResponseThunk } from "../../store/appData/reducer";

const renderItem = (item: ListRenderItemInfo<Link>) => {
  return (
    <HighlightedContent>
      <MediumText style={styles.primaryTextStaticStyle}>
        <Icon name={item.item.icon} size={SIZE_REF_12} />
        {" " + item.item.title}
      </MediumText>
    </HighlightedContent>
  );
};

const keyExtractor = createKeyExtractor("link");

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabNavigatorParamList, "ProfileScreen">,
  StackScreenProps<RootStackNavigatorParamList>
>;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const dispatch = useAppDispatch();

  const state = useAppSelector(selectUserProfileState);

  const userId = useAppSelector(selectUserId);

  const mutableDataSelectorCallback = useCallback((state: RootState) => {
    const socialId = selectUserSocialId(state, userId);
    const username = selectUserUsername(state, userId);
    const uploadsCount = selectUserUploadsCount(state, userId);
    const followersCount = selectUserFollowersCount(state, userId);
    const followingsCount = selectUserFollowingsCount(state, userId);
    const bio = selectUserBio(state, userId);
    const links = selectUserLinkList(state, userId);

    return {
      socialId,
      username,
      uploadsCount,
      followersCount,
      followingsCount,
      bio,
      links,
    };
  }, []);

  const {
    bio,
    followersCount,
    followingsCount,
    links,
    socialId,
    uploadsCount,
    username,
  } = useAppSelector(mutableDataSelectorCallback, shallowEqual);

  useEffect(() => {
    dispatch(getUserProfileResponseThunk({ id: userId }));
  }, []);

  const linkItemSeparatorCallback = useCallback(
    () => <ItemSeparator axis="vertical" length={SIZE_REF_8} />,
    []
  );

  const animatedValue = useRef<Animated.Value>(new Animated.Value(0)).current;

  const animatedInterpolated = animatedValue.interpolate({
    inputRange: [0, 0.5 * WINDOW_WIDTH],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const scrollHandlerCallback = useCallback((x: number) => {
    animatedValue.setValue(x / 2);
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      {uploadsCount && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.listStaticStyle}
          stickyHeaderIndices={[4]}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.listContentContainerStaticStyle}
        >
          <View style={styles.topLevelContainerStaticStyle}>
            <Avatar id={userId} showStoryIndicator={true} size={72} />
            <View style={styles.iconAndCountContainerStaticStyle}>
              <TapGestureHandler
                enabled={(uploadsCount as number) > 0}
                numberOfTaps={1}
                shouldCancelWhenOutside={true}
              >
                <View style={styles.countContainerStaticStyle}>
                  <RegularText style={styles.countValueTextStaticStyle}>
                    {countAbbreviator(uploadsCount as number)}
                  </RegularText>
                  <RegularText style={styles.countNameTextStaticStyle}>
                    uploads
                  </RegularText>
                </View>
              </TapGestureHandler>
              <TapGestureHandler
                enabled={(followersCount as number) > 0}
                numberOfTaps={1}
                shouldCancelWhenOutside={true}
                onActivated={() => {
                  navigation.navigate("FollowerFollowingStack", {
                    screen: "FollowerScreen",
                    params: { id: userId },
                  });
                }}
              >
                <View
                  style={[
                    styles.countContainerStaticStyle,
                    styles.horizontalGap,
                  ]}
                >
                  <RegularText style={styles.countValueTextStaticStyle}>
                    {countAbbreviator(followersCount as number)}
                  </RegularText>
                  <RegularText style={styles.countNameTextStaticStyle}>
                    followers
                  </RegularText>
                </View>
              </TapGestureHandler>
              <TapGestureHandler
                enabled={(followingsCount as number) > 0}
                numberOfTaps={1}
                shouldCancelWhenOutside={true}
              >
                <View
                  style={[
                    styles.countContainerStaticStyle,
                    styles.horizontalGap,
                  ]}
                >
                  <RegularText style={styles.countValueTextStaticStyle}>
                    {countAbbreviator(followingsCount as number)}
                  </RegularText>
                  <RegularText style={styles.countNameTextStaticStyle}>
                    followings
                  </RegularText>
                </View>
              </TapGestureHandler>
            </View>
          </View>
          <View
            style={[
              styles.iconAndCountContainerStaticStyle,
              styles.verticalGap,
            ]}
          >
            <RoundedIcon
              name="mention-regular"
              scale={0.7}
              size={SIZE_REF_10 * 4}
            />
            <RoundedIcon
              name="bookmark-outline"
              scale={0.7}
              size={SIZE_REF_10 * 4}
              style={styles.iconGap}
            />
            <RoundedIcon
              name="edit-outline"
              scale={0.7}
              size={SIZE_REF_10 * 4}
              style={styles.iconGap}
            />
          </View>
          <View style={styles.textContainerStaticStyle}>
            <MediumText style={styles.primaryTextStaticStyle}>
              {socialId}
            </MediumText>
            <RegularText style={styles.secondaryTextStaticStyle}>
              {username}
            </RegularText>
            <RegularText
              style={[styles.bioTextStaticStyle, styles.verticalGap]}
            >
              {bio}
            </RegularText>
          </View>
          <ConfiguredFlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={links}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.linkListContentContainerStaticStyle}
            style={styles.linkListStaticStyle}
            ItemSeparatorComponent={linkItemSeparatorCallback}
          />
          <TabBar
            animatedValue={animatedInterpolated}
            style={styles.verticalGap}
          >
            <TabBarItem
              index={0}
              animatedValue={animatedInterpolated}
              activeIconName="camera-solid"
              activeIconColor="black"
              activeIconSize={SIZE_REF_12 * 2}
              inActiveIconColor="grey"
              inActiveIconName="camera-outline"
              inActiveIconSize={SIZE_REF_12 * 2}
            />
            <TabBarItem
              index={1}
              animatedValue={animatedInterpolated}
              activeIconName="video-solid"
              activeIconColor="black"
              activeIconSize={SIZE_REF_12 * 2}
              inActiveIconColor="grey"
              inActiveIconName="video-outline"
              inActiveIconSize={SIZE_REF_12 * 2}
            />
          </TabBar>
          <TabList onScroll={scrollHandlerCallback} width={WINDOW_WIDTH}>
            <ImageGallery id={userId} />
            <VideoCollection id={userId} />
          </TabList>
        </ScrollView>
      )}
      {state === "loading" && <LoadingIndicator size={SIZE_REF_10 * 4} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconGap: {
    marginLeft: SIZE_REF_16 * 2,
  },
  tabItemListStaticStyle: {
    width: "100%",
    flex: 1,
  },
  linkListStaticStyle: {
    marginTop: SIZE_REF_16,
  },
  linkListContentContainerStaticStyle: {
    paddingVertical: 0,
  },
  textContainerStaticStyle: {
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: SIZE_REF_8,
    marginTop: SIZE_REF_16,
  },
  primaryTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_12,
  },
  secondaryTextStaticStyle: {
    fontSize: SIZE_REF_10 + SIZE_REF_1,
    lineHeight: SIZE_REF_10 + SIZE_REF_1,
  },
  bioTextStaticStyle: {
    fontSize: SIZE_REF_10 + SIZE_REF_1,
    lineHeight: SIZE_REF_12 + SIZE_REF_1,
  },
  listStaticStyle: {
    flex: 1,
    width: "100%",
  },
  listContentContainerStaticStyle: {
    width: "100%",
    paddingTop: SIZE_REF_16,
    paddingBottom: Math.floor((SHUTTER_HEIGHT * 4) / 25),
  },
  topLevelContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: SIZE_REF_8,
  },
  iconAndCountContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  countContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  countValueTextStaticStyle: {
    fontSize: SIZE_REF_14 + SIZE_REF_1,
    lineHeight: SIZE_REF_14 + SIZE_REF_1,
  },
  countNameTextStaticStyle: {
    fontSize: SIZE_REF_12 + SIZE_REF_1,
    lineHeight: SIZE_REF_12 + SIZE_REF_1,
    marginTop: 2,
  },
  horizontalGap: {
    marginLeft: SIZE_REF_16,
  },
  verticalGap: {
    marginTop: SIZE_REF_8,
  },
});

export default ProfileScreen;
