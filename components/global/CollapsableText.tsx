import React from "react";
import { useCallback, useState } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { SIZE_REF_12, SIZE_REF_14, SIZE_REF_8 } from "../../utility/constants";
import { RegularText } from "../../utility/ui";

const CollapsableText = ({
  text,
  maxNoOfCharecters,
  style,
}: {
  text: string;
  maxNoOfCharecters: number;
  style?: StyleProp<TextStyle>;
}) => {
  const [isTapped, setTapped] = useState<boolean>(false);

  const newLineIndex = text.indexOf("\n");

  let outputText = text;

  if (!isTapped) {
    if (maxNoOfCharecters < outputText.length) {
      outputText = outputText.substring(0, maxNoOfCharecters);
      outputText = outputText + "...";
    }
    if (newLineIndex > 0 && newLineIndex < maxNoOfCharecters) {
      outputText = outputText.substring(0, newLineIndex + 1);
      outputText = outputText + "...";
    }
  }
  const pressHandler = useCallback(() => {
    setTapped(true);
  }, []);

  return (
    <RegularText
      onPress={pressHandler}
      style={[style, styles.captionTextStaticStyle]}
    >
      {outputText}
    </RegularText>
  );
};

const styles = StyleSheet.create({
  captionTextStaticStyle: {
    fontSize: SIZE_REF_12,
    lineHeight: SIZE_REF_14,
  },
});

export default CollapsableText;
