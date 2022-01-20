import React, { ReactElement, useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { shallowEqual } from "react-redux";
import { RootState, useAppSelector } from "../../store/appStore";
import {
  selectHashTagName,
  selectHashTagUploadsCount,
} from "../../store/hashTag/selector";
import {
  selectUserFollowersCount,
  selectUserIsFollower,
  selectUserIsFollowing,
  selectUserSocialId,
  selectUserUsername,
} from "../../store/user/selector";
import {
  SIZE_REF_10,
  SIZE_REF_14,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { countAbbreviator } from "../../utility/helpers";
import { Id, InfoProps } from "../../utility/types";
import { MediumText, RegularText } from "../../utility/ui";
import Avatar from "./Avatar";
import HighlightedItem from "./HighlightedItem";
import HighlightedContent from "./HighlightedItem";
import RoundedIcon from "./RoundedIcon";

const Info = ({
  children,
  name,
  gapSize,
  pictureSize,
  secondaryText,
  style,
  textSize,
  type,
}: InfoProps) => {
  const calculatedTextSize = textSize ? textSize : 14;

  const calculatedGapSize = gapSize ? gapSize : 8;

  const rootContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.rootContainerStaticStyle, style],
    [style]
  );

  const pictureComponent = useMemo(() => {
    if (type === "user") {
      return <Avatar showStoryIndicator={true} id={name} size={pictureSize} />;
    }
    return <RoundedIcon name={name} size={pictureSize} />;
  }, [name, pictureSize]);

  const textContainerDynamicStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.textContainerStaticStyle, { marginLeft: calculatedGapSize }],
    [calculatedGapSize]
  );

  const textDynamicStyle = useMemo<StyleProp<TextStyle>[]>(
    () => [
      { fontSize: calculatedTextSize, lineHeight: calculatedTextSize },
      {
        fontSize: calculatedTextSize * 0.9,
        lineHeight: calculatedTextSize * 0.9,
        marginTop: calculatedGapSize / 2,
      },
    ],
    [calculatedTextSize, calculatedGapSize]
  );

  return (
    <View style={rootContainerDynamicStyle}>
      {pictureComponent}
      <View style={textContainerDynamicStyle}>
        {children(textDynamicStyle[0])}
        {secondaryText && (
          <RegularText style={textDynamicStyle[1]} numberOfLines={1}>
            {secondaryText}
          </RegularText>
        )}
      </View>
    </View>
  );
};

export const HashTagInfo = React.memo<Id>(({ id }) => {
  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const name = selectHashTagName(state, id);
      const uploadsCount = selectHashTagUploadsCount(state, id);

      return { name, uploadsCount };
    },
    [id]
  );

  const { name, uploadsCount } = useAppSelector(immutableDataSelectorCallback);

  return (
    <Info
      name="hashtag-solid"
      type="other"
      pictureSize={SIZE_REF_8 * 7}
      gapSize={SIZE_REF_6}
      textSize={SIZE_REF_14}
      secondaryText={`${countAbbreviator(uploadsCount as number)} uploads`}
      style={styles.hashTagInfoStaticStyle}
    >
      {(style) => <MediumText style={style}>{"#" + name}</MediumText>}
    </Info>
  );
}, shallowEqual);

export const AccountInfo = React.memo<Id>(({ id }) => {
  const immutableDataSelectorCallback = useCallback(
    (state: RootState) => {
      const socialId = selectUserSocialId(state, id);
      const followersCount = selectUserFollowersCount(state, id);
      const username = selectUserUsername(state, id);
      const isFollower = selectUserIsFollower(state, id);
      const isFollowing = selectUserIsFollowing(state, id);

      return { socialId, followersCount, username, isFollower, isFollowing };
    },
    [id]
  );

  const { followersCount, isFollower, isFollowing, socialId, username } =
    useAppSelector(immutableDataSelectorCallback);

  return (
    <View style={styles.accountInfoRootContainerStaticStyle}>
      <Info
        name={id}
        type="user"
        pictureSize={SIZE_REF_8 * 7}
        gapSize={SIZE_REF_6}
        textSize={SIZE_REF_14}
        secondaryText={username}
      >
        {(style) => (
          <MediumText style={style} numberOfLines={1} ellipsizeMode="tail">
            {socialId}
          </MediumText>
        )}
      </Info>
      <RoundedIcon
        name={isFollowing ? "followed" : "follow"}
        backgroundColor="#3F71F2"
        color="white"
        size={SIZE_REF_10 * 4}
        scale={0.7}
        style={styles.followerFollowingIconStaticStyle}
      />
    </View>
  );
}, shallowEqual);

const styles = StyleSheet.create({
  accountInfoRootContainerStaticStyle: {
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: WINDOW_WIDTH,
    paddingHorizontal: SIZE_REF_8,
  },
  rootContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  textContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  followerFollowingIconStaticStyle: {
    marginLeft: SIZE_REF_8,
  },
  hashTagInfoStaticStyle: {
    marginLeft: SIZE_REF_8,
  },
});

export default Info;
