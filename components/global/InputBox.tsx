import React, { RefObject, useCallback, useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
} from "react-native";
import { SIZE_REF_14, SIZE_REF_4 } from "../../utility/constants";

export interface InputBoxProps {
  placeholder?: string;
  onFocus?: (text: string) => void;
  onBlur?: (text: string) => void;
  onSubmit?: (text: string) => void;
  onTextChange?: (text: string) => void;
  inputRef?: RefObject<TextInput>;
}

const InputBox = ({
  placeholder,
  onBlur,
  onFocus,
  onSubmit,
  onTextChange,
  inputRef,
}: InputBoxProps) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (onTextChange) {
      onTextChange(text);
    }
  }, [text, onTextChange]);

  const onFocusCallback = useCallback(() => {
    if (onFocus) {
      onFocus(text);
    }
  }, [text, onFocus]);

  const onBlurCallback = useCallback(() => {
    if (onBlur) {
      onBlur(text);
    }
  }, [text, onBlur]);

  const onSubmitCallback = useCallback(() => {
    if (onSubmit) {
      onSubmit(text);
    }
  }, [text, onSubmit]);

  const textChangeCallback = useCallback(
    ({
      nativeEvent: { text },
    }: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setText(text);
    },
    []
  );

  return (
    <TextInput
      ref={inputRef}
      value={text}
      style={styles.inputBoxStaticStyle}
      placeholder={placeholder}
      placeholderTextColor="grey"
      selectionColor="black"
      returnKeyType="search"
      textAlignVertical="center"
      onFocus={onFocusCallback}
      onBlur={onBlurCallback}
      onChange={textChangeCallback}
      onSubmitEditing={onSubmitCallback}
    />
  );
};

const styles = StyleSheet.create({
  inputBoxStaticStyle: {
    backgroundColor: "#FDFDFD",
    fontSize: SIZE_REF_14,
    lineHeight: SIZE_REF_14,
    borderColor: "#D1CBCB",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: SIZE_REF_4,
    borderRadius: SIZE_REF_4,
  },
});

export default InputBox;
