import React from "react";
import { useCallback, useState } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import Animated, {
  combineTransition,
  CurvedTransition,
  FadeIn,
  FadeOut,
  FadingTransition,
  JumpingTransition,
  Layout,
} from "react-native-reanimated";
import {
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_2,
  SIZE_REF_8,
} from "../../utility/constants";
import { RegularText } from "../../utility/ui";

const CollapsableText = ({
  text,
  maxNoOfCharecters,
  textColor,
  textLineHeight,
  textSize,
  style,
}: {
  text: string;
  maxNoOfCharecters: number;
  textSize?: number;
  textLineHeight?: number;
  textColor?: string;
  style?: StyleProp<TextStyle>;
}) => {
  const [isTapped, setTapped] = useState<boolean>(false);

  const calculatedTextSize = textSize ? textSize : SIZE_REF_12;
  const calculatedTextLineHeight = textLineHeight
    ? textLineHeight
    : calculatedTextSize + SIZE_REF_2;
  const calculatedTextColor = textColor ? textColor : "black";
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
    <Animated.Text
      layout={FadingTransition.duration(300)}
      onPress={pressHandler}
      style={[
        style,
        {
          fontSize: calculatedTextSize,
          lineHeight: calculatedTextLineHeight,
          color: calculatedTextColor,
          fontFamily: "roboto-regular",
        },
      ]}
    >
      {outputText}
    </Animated.Text>
  );
};

export default CollapsableText;
