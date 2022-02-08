import { Component, createRef, ReactNode, RefObject } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { SIZE_REF_14, SIZE_REF_4, SIZE_REF_8 } from "../../utility/constants";

export interface TextBoxProps {
  style?: StyleProp<ViewStyle>;
  inlineImage?: string;
  multiline?: boolean;
  noOfLines?: number;
  returnType?: "send" | "search" | "next" | "done" | "go";
  placeholder?: string;
  type?: "outline" | "solid";
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  backgroundColor?: string;
  textSize?: number;
}

export default class TextBox extends Component<TextBoxProps> {
  inputRef: RefObject<TextInput> = createRef<TextInput>();
  constructor(props: TextBoxProps) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render(): ReactNode {
    const {
      style,
      inlineImage,
      multiline,
      noOfLines,
      returnType,
      placeholder,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      textSize,
      type,
    } = this.props;

    const calculatedType = type ? type : "outline";

    const calculatedBackGroundColor =
      calculatedType === "solid"
        ? backgroundColor
          ? backgroundColor
          : "#d3d3d3"
        : "transparent";
    const calculatedBorderColor =
      calculatedType === "outline"
        ? borderColor
          ? borderColor
          : "#D1CBCB"
        : undefined;

    const calculatedBorderRadius = borderRadius ? borderRadius : SIZE_REF_4;

    const calculatedBorderWidth =
      calculatedType === "outline"
        ? borderWidth
          ? borderWidth
          : StyleSheet.hairlineWidth
        : 0;

    const calculatedTextSize = textSize ? textSize : SIZE_REF_14;

    return (
      <View style={[style, styles.containerStaticStyle]}>
        <TextInput
          onPressOut={this.focus}
          ref={this.inputRef}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          autoFocus={false}
          blurOnSubmit={true}
          caretHidden={false}
          clearButtonMode="always"
          clearTextOnFocus={false}
          dataDetectorTypes="none"
          enablesReturnKeyAutomatically={true}
          inlineImageLeft={inlineImage}
          inlineImagePadding={SIZE_REF_8}
          keyboardAppearance="light"
          keyboardType="default"
          multiline={multiline}
          numberOfLines={noOfLines}
          returnKeyType={returnType}
          placeholder={placeholder}
          showSoftInputOnFocus={true}
          spellCheck={false}
          textAlign="left"
          textAlignVertical="center"
          style={[
            styles.inputBoxStaticStyle,
            {
              backgroundColor: calculatedBackGroundColor,
              borderWidth: calculatedBorderWidth,
              borderColor: calculatedBorderColor,
              borderRadius: calculatedBorderRadius,
              fontSize: calculatedTextSize,
              lineHeight: calculatedTextSize,
              padding: (calculatedTextSize * 2) / 7,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStaticStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1,
    alignSelf: "stretch",
  },
  inputBoxStaticStyle: {
    fontFamily: "roboto-regular",
    flex: 1,
  },
});
