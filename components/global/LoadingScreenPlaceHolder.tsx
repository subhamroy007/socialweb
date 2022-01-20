import React from "react";
import { StyleSheet, View } from "react-native";
import { SIZE_REF_10, SIZE_REF_14, SIZE_REF_16 } from "../../utility/constants";
import { MediumText } from "../../utility/ui";
import LoadingIndicator from "./LoadingIndicator";

const LoadingScreenPlaceHolder = ({ text }: { text: string }) => {
  return (
    <View style={styles.rootContainerStaticStyle}>
      <LoadingIndicator color="grey" size={SIZE_REF_10 * 4} />
      <MediumText style={styles.textStaticStyle}>{text}</MediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    maxWidth: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  textStaticStyle: {
    fontSize: SIZE_REF_14,
    lineHeight: SIZE_REF_14,
    marginTop: SIZE_REF_16,
    color: "grey",
  },
});

export default LoadingScreenPlaceHolder;
