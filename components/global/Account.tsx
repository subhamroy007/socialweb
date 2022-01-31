import React from "react";
import { StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_6,
  WINDOW_WIDTH,
} from "../../utility/constants";
import { timeElapsed } from "../../utility/helpers";
import { AccountWithTimestampResponse } from "../../utility/types";
import { MediumText } from "../../utility/ui";
import Avatar from "./Avatar";
import Info from "./Info";
import RoundedIcon from "./RoundedIcon";

const Account = React.memo<AccountWithTimestampResponse>(
  ({
    hasUnSeenStroy,
    id,
    isFollower,
    isFollowing,
    noOfFollowers,
    profilePictureUri,
    socialId,
    timestamp,
    username,
  }) => {
    return (
      <View style={styles.rootContainerStaticStyle}>
        <Info
          secondaryText={timestamp === 0 ? username : timeElapsed(timestamp)}
          picture={
            <Avatar
              hasUnSeenStroy={hasUnSeenStroy}
              profilePictureUri={profilePictureUri}
              showOutline={false}
              size={SIZE_REF_10 * 5}
            />
          }
        >
          {(size, color) => (
            <MediumText style={{ fontSize: size, lineHeight: size, color }}>
              {socialId}
            </MediumText>
          )}
        </Info>
        {isFollowing ? (
          <RoundedIcon
            name="followed"
            size={SIZE_REF_10 * 4}
            scale={0.7}
            backgroundColor="#3F71F2"
            color="white"
          />
        ) : (
          <RoundedIcon
            name="follow"
            size={SIZE_REF_10 * 4}
            scale={0.7}
            backgroundColor="#3F71F2"
            color="white"
          />
        )}
      </View>
    );
  },
  (prevProps, nextProps) => {
    const { children: ch1, ...prevRestProps } = prevProps;
    const { children: ch2, ...nextRestProps } = nextProps;
    return shallowEqual(prevRestProps, nextRestProps);
  }
);

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    width: WINDOW_WIDTH,
    paddingHorizontal: SIZE_REF_16,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Account;
