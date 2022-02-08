import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { selectProfilePictureUri } from "../../store/appData/selectors";
import { useAppSelector } from "../../store/appStore";
import {
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_6,
  SIZE_REF_8,
} from "../../utility/constants";
import Avatar from "./Avatar";
import Info from "./Info";
import NewIcon from "./NewIcon";
import TextBox from "./TextBox";

const CommentBox = () => {
  const profilePictureUri = useAppSelector(selectProfilePictureUri);

  return (
    <View style={styles.containerStaticStyle}>
      <Info
        pictureGapSize={SIZE_REF_8}
        picture={
          <Avatar
            profilePictureUri={profilePictureUri}
            hasUnSeenStroy={false}
            showOutline={false}
            size={SIZE_REF_6 * 6}
          />
        }
      >
        {() => (
          <TextBox
            placeholder="write comment..."
            type="solid"
            backgroundColor="transparent"
            returnType="send"
            multiline={true}
            noOfLines={1}
          />
        )}
      </Info>
      <NewIcon
        name="send-solid"
        size={SIZE_REF_12 * 2}
        style={styles.sendIconStaticStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStaticStyle: {
    width: "100%",
    borderColor: "#D1CBCB",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: SIZE_REF_8,
  },
  sendIconStaticStyle: {
    marginHorizontal: SIZE_REF_16,
  },
});

export default CommentBox;
