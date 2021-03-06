import React from "react";
import { StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_6,
  SIZE_REF_8,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { countAbbreviator, timeElapsed } from "../../utility/helpers";
import { ReplyResponse } from "../../utility/types";
import { MediumText, RegularText } from "../../utility/ui";
import Avatar from "./Avatar";
import CollapsableText from "./CollapsableText";
import Info from "./Info";
import NewIcon from "./NewIcon";

const Reply = React.memo<ReplyResponse>(
  ({
    author: { id: userId, profilePictureUri, socialId },
    content,
    hasLiked,
    id,
    noOfLikes,
    timestamp,
  }) => {
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
        <View style={[styles.footerContainerStaticStyle, styles.topSideGap]}>
          <View style={[styles.likeContainer]}>
            <RegularText style={styles.textStaticStyle}>
              {countAbbreviator(noOfLikes) + " "}
            </RegularText>
            {hasLiked ? (
              <NewIcon name="heart-solid" color="#EE3434" size={SIZE_REF_12} />
            ) : (
              <NewIcon
                name="heart-outline-bold"
                color="grey"
                size={SIZE_REF_12}
              />
            )}
          </View>
          <RegularText style={[styles.textStaticStyle, styles.leftSideGap]}>
            {timeElapsed(timestamp) + " ago"}
          </RegularText>
        </View>
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

export default Reply;
