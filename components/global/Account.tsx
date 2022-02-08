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
import {
  AccountMediumResponse,
  AccountWithTimestampResponse,
} from "../../utility/types";
import { MediumText } from "../../utility/ui";
import Avatar from "./Avatar";
import Info from "./Info";
import RoundedIcon from "./RoundedIcon";

const Account = React.memo<AccountMediumResponse>(
  ({
    hasUnSeenStroy,
    id,
    isFollower,
    isFollowing,
    noOfFollowers,
    profilePictureUri,
    socialId,
    username,
  }) => {
    return (
      <View style={styles.rootContainerStaticStyle}>
        <Info
          secondaryText={username}
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
            name="following"
            color="white"
            size={SIZE_REF_10 * 4}
            scale={0.7}
            type="outline"
            borderColor="#D1CBCB"
          />
        ) : (
          <RoundedIcon
            name="follow"
            size={SIZE_REF_10 * 4}
            scale={0.7}
            backgroundColor="#3F71F2"
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
