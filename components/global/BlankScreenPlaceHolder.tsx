import React from "react";
import { StyleSheet, View } from "react-native";
import { SIZE_REF_12, SIZE_REF_14, SIZE_REF_16 } from "../../utility/constants";
import { MediumText } from "../../utility/ui";
import RoundedIcon from "./RoundedIcon";

const BlankScreenPlaceHolder = ({
  icon,
  text,
}: {
  text: string;
  icon: string;
}) => {
  return (
    <View style={styles.rootContainerStaticStyle}>
      <RoundedIcon
        name={icon}
        backgroundColor="transparent"
        scale={0.7}
        size={SIZE_REF_12 * 4}
        style={styles.iconStaticStyle}
        color="black"
      />
      <MediumText style={styles.textStaticStyle}>{text}</MediumText>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStaticStyle: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStaticStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
  },
  textStaticStyle: {
    fontSize: SIZE_REF_14,
    lineHeight: SIZE_REF_14,
    marginTop: SIZE_REF_16,
    color: "grey",
  },
});

export default BlankScreenPlaceHolder;
