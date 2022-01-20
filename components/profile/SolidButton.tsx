import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZE_REF_14, SIZE_REF_16, SIZE_REF_4 } from "../../utility/constants";
import { MediumText } from "../../utility/ui";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const SolidButton = ({ onPress, title, style }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[style]}>
      <SafeAreaView edges={[]} style={[styles.button]}>
        <MediumText style={[styles.buttonTitle]}>{title}</MediumText>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: SIZE_REF_14,
    color: "white",
  },
  button: {
    paddingVertical: SIZE_REF_4,
    paddingHorizontal: SIZE_REF_16,
    backgroundColor: "#3F71F2",
    borderRadius: SIZE_REF_4,
  },
});

export default SolidButton;
