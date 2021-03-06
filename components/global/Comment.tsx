import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { countAbbreviator, timeElapsed } from "../../utility/helpers";
import {
  CommentResponse,
  RootStackNavigatorParamList,
} from "../../utility/types";
import { MediumText, RegularText } from "../../utility/ui";
import Avatar from "./Avatar";
import CollapsableText from "./CollapsableText";
import Icon from "./Icon";
import Info from "./Info";

type PostEngagementScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "PostEngagementScreen"
>;

const Comment = React.memo<CommentResponse>(
  ({
    author: { id: userId, profilePictureUri, socialId },
    content,
    hasLiked,
    id,
    noOfLikes,
    noOfReplies,
    timestamp,
    isMetaHidden,
  }) => {
    const navigation = useNavigation<PostEngagementScreenProps["navigation"]>();

    const onReplyTap = useCallback(() => {
      if (navigation.isFocused()) {
        navigation.navigate("CommentEngagementScreen", {
          id,
          initialTabIndex: 1,
        });
      }
    }, [navigation, id]);

    const onLikeCountTap = useCallback(() => {
      if (navigation.isFocused()) {
        navigation.navigate("CommentEngagementScreen", {
          id,
          initialTabIndex: 0,
        });
      }
    }, [navigation, id]);

    return (
      <View style={styles.rootContainerStaticStyle}>
        <Info
          picture={
            <Avatar
              showOutline={false}
              profilePictureUri={profilePictureUri}
              size={SIZE_REF_16 * 2}
            />
          }
          pictureGapSize={SIZE_REF_6}
          textSize={SIZE_REF_12}
        >
          {(size, color) => (
            <MediumText style={{ fontSize: size, lineHeight: size, color }}>
              {socialId}
            </MediumText>
          )}
        </Info>
        <CollapsableText
          maxNoOfCharecters={120}
          text={content}
          style={styles.topSideGap}
        />
        {!isMetaHidden && (
          <View style={[styles.footerContainerStaticStyle, styles.topSideGap]}>
            <MediumText style={styles.textStaticStyle} onPress={onReplyTap}>
              {countAbbreviator(noOfReplies) + " Reply"}
            </MediumText>
            <View style={[styles.likeContainer, styles.leftSideGap]}>
              <RegularText
                style={styles.textStaticStyle}
                onPress={onLikeCountTap}
              >
                {countAbbreviator(noOfLikes) + " "}
              </RegularText>
              {hasLiked ? (
                <Icon name="heart-solid" color="#EE3434" size={SIZE_REF_16} />
              ) : (
                <Icon name="heart-outline" color="grey" size={SIZE_REF_16} />
              )}
            </View>
            <RegularText style={[styles.textStaticStyle, styles.leftSideGap]}>
              {timeElapsed(timestamp) + " ago"}
            </RegularText>
          </View>
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    const { author: prevAuthor, ...prevRestProps } = prevProps;
    const { author: nextAuthor, ...nextRestProps } = nextProps;

    return (
      shallowEqual(prevAuthor, nextAuthor) &&
      shallowEqual(prevRestProps, nextRestProps)
    );
  }
);

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    width: WINDOW_WIDTH,
    paddingHorizontal: SIZE_REF_8 * 2,
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  footerContainerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  likeContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  textStaticStyle: {
    fontSize: SIZE_REF_10 + SIZE_REF_1,
    color: "grey",
  },
  leftSideGap: {
    marginLeft: SIZE_REF_8,
  },
  topSideGap: {
    marginTop: SIZE_REF_4,
  },
});

export default Comment;
